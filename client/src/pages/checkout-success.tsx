import { Link } from "wouter";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CheckoutSuccessPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center lg:px-8">
      <div className="flex h-20 w-20 mx-auto items-center justify-center rounded-full bg-green-900/30 mb-6">
        <CheckCircle className="h-10 w-10 text-green-400" />
      </div>
      
      <h1 className="font-heading text-3xl font-bold">Payment Successful!</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Thank you for your order. Your payment has been processed successfully.
      </p>

      <Card className="mt-8 text-left">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-gold" />
            What's Next?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="font-medium">Order Processing</p>
            <p className="text-muted-foreground">
              Your order is being prepared and will be shipped within 24-48 hours.
            </p>
          </div>
          <div>
            <p className="font-medium">Shipping Confirmation</p>
            <p className="text-muted-foreground">
              You'll receive an email with tracking information once your order ships.
            </p>
          </div>
          <div>
            <p className="font-medium">Questions?</p>
            <p className="text-muted-foreground">
              Contact us anytime at payments@forgeformula.com
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
        <Button className="bg-gold text-black" asChild>
          <Link href="/shop">
            Continue Shopping
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/orders">View My Orders</Link>
        </Button>
      </div>
    </div>
  );
}
