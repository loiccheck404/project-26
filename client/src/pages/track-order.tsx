import { useState } from "react";
import { Search, Package, Truck, CheckCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber || !email) {
      toast({
        title: "Missing information",
        description: "Please enter both order number and email address.",
        variant: "destructive",
      });
      return;
    }
    setIsSearching(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSearching(false);
    toast({
      title: "Order not found",
      description: "Please check your order number and email, or contact support.",
      variant: "destructive",
    });
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 lg:px-8">
      <div className="text-center mb-12">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
          <MapPin className="h-8 w-8 text-primary" />
        </div>
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Track Your Order
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Enter your order details to see the current status
        </p>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="orderNumber" className="block text-sm font-medium mb-2">
                Order Number
              </label>
              <Input
                id="orderNumber"
                placeholder="e.g., 12345678"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                data-testid="input-order-number"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="The email used for your order"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-testid="input-email"
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isSearching}
              data-testid="button-track-order"
            >
              {isSearching ? (
                "Searching..."
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Track Order
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Typical Order Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Package className="h-5 w-5" />
                </div>
                <div className="flex-1 w-0.5 bg-border mt-2" />
              </div>
              <div className="pb-6">
                <h4 className="font-medium">Order Placed</h4>
                <p className="text-sm text-muted-foreground">
                  Your order has been received and is being processed.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <Truck className="h-5 w-5" />
                </div>
                <div className="flex-1 w-0.5 bg-border mt-2" />
              </div>
              <div className="pb-6">
                <h4 className="font-medium">Shipped</h4>
                <p className="text-sm text-muted-foreground">
                  Your order is on its way! You'll receive a tracking number.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="flex-1 w-0.5 bg-border mt-2" />
              </div>
              <div className="pb-6">
                <h4 className="font-medium">Out for Delivery</h4>
                <p className="text-sm text-muted-foreground">
                  Your package is out for delivery today.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <CheckCircle className="h-5 w-5" />
                </div>
              </div>
              <div>
                <h4 className="font-medium">Delivered</h4>
                <p className="text-sm text-muted-foreground">
                  Your package has been delivered successfully.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
