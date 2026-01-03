import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowLeft,
  CreditCard,
  Smartphone,
  Bitcoin,
  DollarSign,
  CheckCircle,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCartStore } from "@/lib/cart-store";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const checkoutSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  address1: z.string().min(1, "Address is required"),
  address2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().min(1, "ZIP code is required"),
  country: z.string().min(1, "Country is required"),
  paymentMethod: z.string().min(1, "Please select a payment method"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const paymentMethods = [
  {
    id: "card",
    name: "Credit/Debit Card",
    description: "Pay securely with Stripe",
    icon: CreditCard,
  },
  {
    id: "cashapp",
    name: "Cash App",
    description: "Send payment to $ForgeFormula",
    icon: DollarSign,
  },
  {
    id: "zelle",
    name: "Zelle",
    description: "Send to payments@forgeformula.com",
    icon: Smartphone,
  },
  {
    id: "applepay",
    name: "Apple Pay",
    description: "Quick checkout with Apple Pay",
    icon: Smartphone,
  },
  {
    id: "crypto",
    name: "Crypto (BTC/USDT)",
    description: "Pay with Bitcoin or USDT",
    icon: Bitcoin,
  },
];

export default function CheckoutPage() {
  const [, setLocation] = useLocation();
  const [orderComplete, setOrderComplete] = useState(false);
  const [completedPaymentMethod, setCompletedPaymentMethod] = useState("");
  const [completedTotal, setCompletedTotal] = useState(0);
  const { items, getTotal, clearCart } = useCartStore();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const total = getTotal();
  const shipping = 0;
  const grandTotal = total + shipping;

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      country: "US",
      paymentMethod: "",
    },
  });

  const selectedPayment = form.watch("paymentMethod");

  const stripeCheckoutMutation = useMutation({
    mutationFn: async (data: CheckoutFormData) => {
      const checkoutData = {
        items: items.map(item => ({
          productId: item.product.id,
          name: item.product.name,
          price: item.product.price ? parseFloat(item.product.price) : 0,
          quantity: item.quantity,
          imageUrl: item.product.imageUrl,
        })),
        shippingAddress: {
          firstName: data.firstName,
          lastName: data.lastName,
          address1: data.address1,
          address2: data.address2,
          city: data.city,
          state: data.state,
          zip: data.zip,
          country: data.country,
          phone: data.phone,
        },
        email: data.email,
      };
      const response = await apiRequest("POST", "/api/stripe/create-checkout-session", checkoutData);
      return response.json();
    },
    onSuccess: (data) => {
      if (data.url) {
        window.location.href = data.url;
      }
    },
    onError: () => {
      toast({
        title: "Failed to start checkout",
        description: "Please try again or use an alternative payment method.",
        variant: "destructive",
      });
    },
  });

  const createOrderMutation = useMutation({
    mutationFn: async (data: CheckoutFormData) => {
      const orderData = {
        shippingAddress: {
          firstName: data.firstName,
          lastName: data.lastName,
          address1: data.address1,
          address2: data.address2,
          city: data.city,
          state: data.state,
          zip: data.zip,
          country: data.country,
          phone: data.phone,
        },
        items: items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: item.product.price,
          name: item.product.name,
          imageUrl: item.product.imageUrl,
        })),
        subtotal: total.toFixed(2),
        shipping: shipping.toFixed(2),
        tax: "0.00",
        total: grandTotal.toFixed(2),
        paymentMethod: data.paymentMethod,
      };
      const response = await apiRequest("POST", "/api/orders", orderData);
      return response.json();
    },
    onSuccess: (order, variables) => {
      setCompletedPaymentMethod(variables.paymentMethod);
      setCompletedTotal(grandTotal);
      setOrderComplete(true);
      clearCart();
    },
    onError: () => {
      toast({
        title: "Failed to place order",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: CheckoutFormData) => {
    if (data.paymentMethod === "card") {
      stripeCheckoutMutation.mutate(data);
      return;
    }

    if (!isAuthenticated) {
      setCompletedPaymentMethod(data.paymentMethod);
      setCompletedTotal(grandTotal);
      setOrderComplete(true);
      clearCart();
      return;
    }

    createOrderMutation.mutate(data);
  };

  if (orderComplete) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center lg:px-8">
        <div className="flex h-20 w-20 mx-auto items-center justify-center rounded-full bg-green-900/30 mb-6">
          <CheckCircle className="h-10 w-10 text-green-400" />
        </div>
        <h1 className="font-heading text-3xl font-bold">Order Placed!</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Thank you for your order. Please complete your payment below.
        </p>

        <Card className="mt-8 text-left">
          <CardHeader>
            <CardTitle>Payment Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {completedPaymentMethod === "cashapp" && (
              <div>
                <p className="font-medium">Cash App</p>
                <p className="text-muted-foreground">Send ${completedTotal.toFixed(2)} to: <span className="text-gold font-mono">$ForgeFormula</span></p>
                <p className="text-sm text-muted-foreground mt-2">Include your email in the note for order verification.</p>
              </div>
            )}
            {completedPaymentMethod === "zelle" && (
              <div>
                <p className="font-medium">Zelle</p>
                <p className="text-muted-foreground">Send ${completedTotal.toFixed(2)} to: <span className="text-gold font-mono">payments@forgeformula.com</span></p>
                <p className="text-sm text-muted-foreground mt-2">Include your email in the memo for order verification.</p>
              </div>
            )}
            {completedPaymentMethod === "applepay" && (
              <div>
                <p className="font-medium">Apple Pay</p>
                <p className="text-muted-foreground">Send ${completedTotal.toFixed(2)} via Apple Pay.</p>
                <p className="text-sm text-muted-foreground mt-2">Contact us for Apple Pay transfer details.</p>
              </div>
            )}
            {completedPaymentMethod === "crypto" && (
              <div>
                <p className="font-medium">Crypto Payment</p>
                <p className="text-muted-foreground mb-2">Send ${completedTotal.toFixed(2)} equivalent in BTC or USDT:</p>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-muted-foreground">BTC Address:</p>
                    <p className="font-mono text-sm text-gold break-all">bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">USDT (TRC20):</p>
                    <p className="font-mono text-sm text-gold break-all">TN7xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Send transaction hash to our email for confirmation.</p>
              </div>
            )}
          </CardContent>
        </Card>

        <p className="mt-6 text-sm text-muted-foreground">
          Once payment is confirmed, your order will be processed within 24-48 hours.
        </p>

        <Button className="mt-8 bg-gold text-black" asChild>
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center lg:px-8">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">
          Add some products before checking out.
        </p>
        <Button className="mt-6 bg-gold text-black" asChild>
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <Button variant="ghost" className="mb-6" asChild data-testid="button-back-to-cart">
        <Link href="/cart">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Cart
        </Link>
      </Button>

      <h1 className="font-heading text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your@email.com"
                            {...field}
                            data-testid="input-email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel>Phone (optional)</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="(123) 456-7890"
                            {...field}
                            data-testid="input-phone"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Shipping Address</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input {...field} data-testid="input-first-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input {...field} data-testid="input-last-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address1"
                    render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input {...field} data-testid="input-address1" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address2"
                    render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel>Apartment, suite, etc. (optional)</FormLabel>
                        <FormControl>
                          <Input {...field} data-testid="input-address2" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input {...field} data-testid="input-city" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input {...field} data-testid="input-state" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="zip"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ZIP Code</FormLabel>
                        <FormControl>
                          <Input {...field} data-testid="input-zip" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger data-testid="select-country">
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="US">United States</SelectItem>
                            <SelectItem value="CA">Canada</SelectItem>
                            <SelectItem value="UK">United Kingdom</SelectItem>
                            <SelectItem value="AU">Australia</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="space-y-3"
                          >
                            {paymentMethods.map((method) => (
                              <div key={method.id}>
                                <Label
                                  htmlFor={method.id}
                                  className={`flex items-center gap-4 rounded-lg border p-4 cursor-pointer transition-colors ${
                                    field.value === method.id
                                      ? "border-gold bg-gold/5"
                                      : "border-border hover:bg-muted/50"
                                  }`}
                                >
                                  <RadioGroupItem value={method.id} id={method.id} className="sr-only" />
                                  <div className={`flex h-10 w-10 items-center justify-center rounded-md ${
                                    field.value === method.id ? "bg-gold/20" : "bg-muted"
                                  }`}>
                                    <method.icon className={`h-5 w-5 ${
                                      field.value === method.id ? "text-gold" : "text-muted-foreground"
                                    }`} />
                                  </div>
                                  <div className="flex-1">
                                    <p className="font-medium">{method.name}</p>
                                    <p className="text-sm text-muted-foreground">{method.description}</p>
                                  </div>
                                  {field.value === method.id && (
                                    <CheckCircle className="h-5 w-5 text-gold" />
                                  )}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-gold text-black font-semibold"
                disabled={createOrderMutation.isPending || stripeCheckoutMutation.isPending}
                data-testid="button-place-order"
              >
                {createOrderMutation.isPending || stripeCheckoutMutation.isPending ? (
                  "Processing..."
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Place Order - ${grandTotal.toFixed(2)}
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>

        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item) => {
                const price = item.product.price ? parseFloat(item.product.price) : 0;
                return (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <div className="h-12 w-12 flex-shrink-0 rounded-md bg-muted overflow-hidden border border-border">
                      {item.product.imageUrl ? (
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <Package className="h-5 w-5 text-muted-foreground/30" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-medium">
                      ${(price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                );
              })}

              <Separator />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-green-400">Free</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between font-medium text-lg">
                <span>Total</span>
                <span className="text-gold">${grandTotal.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
