import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated, registerAuthRoutes } from "./replit_integrations/auth";
import { z } from "zod";
import { getUncachableStripeClient, getStripePublishableKey } from "./stripeClient";
import { insertPaymentMethodSchema } from "@shared/schema";

// Admin middleware - checks if user is an admin
const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const adminUserIds = (process.env.ADMIN_USER_IDS || "").split(",").filter(Boolean);
  const userId = req.user?.id;
  
  if (!userId || (adminUserIds.length > 0 && !adminUserIds.includes(userId))) {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
};

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Setup authentication first
  await setupAuth(app);
  registerAuthRoutes(app);

  // Seed database with initial data
  const { seed } = await import("./seed");
  await seed();

  // Categories
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  // Products
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.get("/api/products/featured", async (req, res) => {
    try {
      const products = await storage.getFeaturedProducts();
      res.json(products);
    } catch (error) {
      console.error("Error fetching featured products:", error);
      res.status(500).json({ error: "Failed to fetch featured products" });
    }
  });

  app.get("/api/products/:slug", async (req, res) => {
    try {
      const product = await storage.getProductBySlug(req.params.slug);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  // Reviews
  app.get("/api/reviews/:productId", async (req, res) => {
    try {
      const reviews = await storage.getProductReviews(req.params.productId);
      res.json(reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ error: "Failed to fetch reviews" });
    }
  });

  // Orders (protected routes)
  app.get("/api/orders", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      const orders = await storage.getOrders(userId);
      res.json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  });

  app.get("/api/orders/:orderId", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user?.id;
      const order = await storage.getOrderById(req.params.orderId);
      if (!order || order.userId !== userId) {
        return res.status(404).json({ error: "Order not found" });
      }
      const items = await storage.getOrderItems(order.id);
      res.json({ ...order, items });
    } catch (error) {
      console.error("Error fetching order:", error);
      res.status(500).json({ error: "Failed to fetch order" });
    }
  });

  const createOrderSchema = z.object({
    shippingAddress: z.object({
      firstName: z.string(),
      lastName: z.string(),
      address1: z.string(),
      address2: z.string().optional(),
      city: z.string(),
      state: z.string(),
      zip: z.string(),
      country: z.string(),
      phone: z.string().optional(),
    }),
    items: z.array(
      z.object({
        productId: z.string(),
        quantity: z.number(),
        price: z.string(),
        name: z.string(),
        imageUrl: z.string().optional(),
      })
    ),
    subtotal: z.string(),
    shipping: z.string(),
    tax: z.string(),
    total: z.string(),
  });

  app.post("/api/orders", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const validation = createOrderSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ error: "Invalid order data", details: validation.error.errors });
      }

      const { shippingAddress, items, subtotal, shipping, tax, total } = validation.data;

      const order = await storage.createOrder({
        userId,
        status: "pending",
        subtotal,
        shipping,
        tax,
        total,
        shippingAddress,
      });

      for (const item of items) {
        await storage.createOrderItem({
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
          name: item.name,
          imageUrl: item.imageUrl || null,
        });
      }

      res.status(201).json(order);
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ error: "Failed to create order" });
    }
  });

  // Stripe publishable key endpoint
  app.get("/api/stripe/publishable-key", async (req, res) => {
    try {
      const publishableKey = await getStripePublishableKey();
      if (!publishableKey) {
        return res.json({ publishableKey: null, configured: false });
      }
      res.json({ publishableKey, configured: true });
    } catch (error) {
      console.error("Error getting Stripe publishable key:", error);
      res.json({ publishableKey: null, configured: false });
    }
  });

  // Create Stripe checkout session
  const checkoutSessionSchema = z.object({
    items: z.array(
      z.object({
        productId: z.string(),
        name: z.string(),
        price: z.number(),
        quantity: z.number(),
        imageUrl: z.string().optional(),
      })
    ),
    shippingAddress: z.object({
      firstName: z.string(),
      lastName: z.string(),
      address1: z.string(),
      address2: z.string().optional(),
      city: z.string(),
      state: z.string(),
      zip: z.string(),
      country: z.string(),
      phone: z.string().optional(),
    }),
    email: z.string().email(),
  });

  app.post("/api/stripe/create-checkout-session", async (req, res) => {
    try {
      const validation = checkoutSessionSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ error: "Invalid checkout data", details: validation.error.errors });
      }

      const { items, shippingAddress, email } = validation.data;
      const stripe = await getUncachableStripeClient();

      if (!stripe) {
        return res.status(503).json({ error: "Stripe is not configured. Please use an alternative payment method." });
      }

      const lineItems = items.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: item.imageUrl ? [item.imageUrl] : [],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      }));

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        customer_email: email,
        success_url: `${req.protocol}://${req.get('host')}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.protocol}://${req.get('host')}/checkout`,
        metadata: {
          shippingAddress: JSON.stringify(shippingAddress),
          customerEmail: email,
        },
      });

      res.json({ url: session.url });
    } catch (error) {
      console.error("Error creating checkout session:", error);
      res.status(500).json({ error: "Failed to create checkout session" });
    }
  });

  // Get Stripe session status for verification
  app.get("/api/stripe/session/:sessionId", async (req, res) => {
    try {
      const stripe = await getUncachableStripeClient();
      
      if (!stripe) {
        return res.status(503).json({ error: "Stripe is not configured" });
      }
      
      const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);
      
      res.json({
        status: session.payment_status,
        customerEmail: session.customer_email,
        amountTotal: session.amount_total ? session.amount_total / 100 : 0,
      });
    } catch (error) {
      console.error("Error retrieving checkout session:", error);
      res.status(500).json({ error: "Failed to retrieve session" });
    }
  });

  // Payment Methods - Public (enabled only)
  app.get("/api/payment-methods", async (req, res) => {
    try {
      const methods = await storage.getEnabledPaymentMethods();
      res.json(methods);
    } catch (error) {
      console.error("Error fetching payment methods:", error);
      res.status(500).json({ error: "Failed to fetch payment methods" });
    }
  });

  // Payment Methods - Admin (all methods)
  app.get("/api/admin/payment-methods", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const methods = await storage.getPaymentMethods();
      res.json(methods);
    } catch (error) {
      console.error("Error fetching payment methods:", error);
      res.status(500).json({ error: "Failed to fetch payment methods" });
    }
  });

  app.post("/api/admin/payment-methods", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const validation = insertPaymentMethodSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ error: "Invalid payment method data", details: validation.error.errors });
      }
      const method = await storage.createPaymentMethod(validation.data);
      res.status(201).json(method);
    } catch (error) {
      console.error("Error creating payment method:", error);
      res.status(500).json({ error: "Failed to create payment method" });
    }
  });

  app.patch("/api/admin/payment-methods/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const method = await storage.updatePaymentMethod(req.params.id, req.body);
      if (!method) {
        return res.status(404).json({ error: "Payment method not found" });
      }
      res.json(method);
    } catch (error) {
      console.error("Error updating payment method:", error);
      res.status(500).json({ error: "Failed to update payment method" });
    }
  });

  app.delete("/api/admin/payment-methods/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      await storage.deletePaymentMethod(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting payment method:", error);
      res.status(500).json({ error: "Failed to delete payment method" });
    }
  });

  // Admin check endpoint
  app.get("/api/admin/check", isAuthenticated, isAdmin, async (req, res) => {
    res.json({ isAdmin: true });
  });

  return httpServer;
}
