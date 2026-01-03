import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { Layout } from "@/components/layout";

import HomePage from "@/pages/home";
import ShopPage from "@/pages/shop";
import ProductPage from "@/pages/product";
import CartPage from "@/pages/cart";
import CheckoutPage from "@/pages/checkout";
import CheckoutSuccessPage from "@/pages/checkout-success";
import AccountPage from "@/pages/account";
import OrdersPage from "@/pages/orders";
import AboutPage from "@/pages/about";
import ContactPage from "@/pages/contact";
import FAQPage from "@/pages/faq";
import ShippingPage from "@/pages/shipping";
import TrackOrderPage from "@/pages/track-order";
import ReviewsPage from "@/pages/reviews";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/shop" component={ShopPage} />
      <Route path="/shop/:categorySlug">
        {(params) => <ShopPage categorySlug={params.categorySlug} />}
      </Route>
      <Route path="/product/:slug">
        {(params) => <ProductPage slug={params.slug} />}
      </Route>
      <Route path="/cart" component={CartPage} />
      <Route path="/checkout" component={CheckoutPage} />
      <Route path="/checkout/success" component={CheckoutSuccessPage} />
      <Route path="/account" component={AccountPage} />
      <Route path="/orders" component={OrdersPage} />
      <Route path="/orders/:orderId" component={OrdersPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/faq" component={FAQPage} />
      <Route path="/shipping" component={ShippingPage} />
      <Route path="/how-to-pay" component={FAQPage} />
      <Route path="/track-order" component={TrackOrderPage} />
      <Route path="/reviews" component={ReviewsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="forge-formula-theme">
        <TooltipProvider>
          <Layout>
            <Router />
          </Layout>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
