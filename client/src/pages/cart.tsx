import { Link } from "wouter";
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/lib/cart-store";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore();
  const total = getTotal();
  const isEmpty = items.length === 0;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 lg:px-8">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold tracking-tight">Shopping Cart</h1>
        <p className="mt-2 text-muted-foreground">
          {isEmpty ? "Your cart is empty" : `${items.length} item${items.length !== 1 ? "s" : ""} in your cart`}
        </p>
      </div>

      {isEmpty ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <ShoppingCart className="h-16 w-16 text-muted-foreground/30 mb-4" />
            <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Browse our products and add items to your cart
            </p>
            <Button className="bg-gold text-black" asChild>
              <Link href="/shop">
                Continue Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-4">
                <CardTitle>Cart Items</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground"
                  onClick={clearCart}
                  data-testid="button-clear-cart"
                >
                  Clear All
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => {
                  const price = item.product.price ? parseFloat(item.product.price) : 0;
                  return (
                    <div key={item.product.id} className="flex gap-4" data-testid={`cart-item-${item.product.id}`}>
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-border bg-card">
                        {item.product.imageUrl ? (
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-muted">
                            <Package className="h-8 w-8 text-muted-foreground/30" />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <Link href={`/product/${item.product.slug}`}>
                            <h3 className="font-medium hover:text-gold transition-colors">
                              {item.product.name}
                            </h3>
                          </Link>
                          <p className="text-sm text-muted-foreground">
                            ${price.toFixed(2)} each
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              data-testid={`button-decrease-${item.product.id}`}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              disabled={item.quantity >= item.product.stock}
                              data-testid={`button-increase-${item.product.id}`}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="font-medium text-gold">
                              ${(price * item.quantity).toFixed(2)}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-destructive"
                              onClick={() => removeItem(item.product.id)}
                              data-testid={`button-remove-${item.product.id}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-muted-foreground">Calculated at checkout</span>
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span className="text-gold text-lg">${total.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3">
                <Button
                  className="w-full bg-gold text-black font-semibold"
                  size="lg"
                  asChild
                  data-testid="button-checkout"
                >
                  <Link href="/checkout">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  asChild
                  data-testid="button-continue-shopping"
                >
                  <Link href="/shop">Continue Shopping</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
