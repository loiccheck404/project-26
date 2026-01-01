import { Link } from "wouter";
import { ShoppingCart, Package } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/lib/cart-store";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();
  const isInStock = product.stock > 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const comparePrice = product.compareAtPrice
    ? parseFloat(product.compareAtPrice)
    : null;
  const currentPrice = parseFloat(product.price);
  const hasDiscount = comparePrice && comparePrice > currentPrice;
  const discountPercent = hasDiscount
    ? Math.round(((comparePrice - currentPrice) / comparePrice) * 100)
    : 0;

  return (
    <Card
      className="group overflow-visible hover-elevate"
      data-testid={`product-card-${product.id}`}
    >
      <Link href={`/product/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden rounded-t-md bg-muted">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Package className="h-12 w-12 text-muted-foreground" />
            </div>
          )}
          {hasDiscount && (
            <Badge
              className="absolute left-2 top-2 bg-destructive text-destructive-foreground"
              data-testid={`badge-discount-${product.id}`}
            >
              -{discountPercent}%
            </Badge>
          )}
          {!isInStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80">
              <Badge variant="secondary">Out of Stock</Badge>
            </div>
          )}
        </div>
      </Link>
      <CardContent className="p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <Badge
            variant="outline"
            size="sm"
            className={
              product.brand === "forge"
                ? "border-forge/30 text-forge"
                : "border-formula/30 text-formula"
            }
          >
            {product.brand === "forge" ? "Forge" : "Formula"}
          </Badge>
          {isLowStock && (
            <Badge variant="secondary" size="sm">
              Only {product.stock} left
            </Badge>
          )}
        </div>
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-medium line-clamp-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
          {product.shortDescription}
        </p>
        <div className="mt-3 flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-lg font-semibold">
              ${currentPrice.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through">
                ${comparePrice.toFixed(2)}
              </span>
            )}
          </div>
          <Button
            size="icon"
            variant={isInStock ? "default" : "secondary"}
            disabled={!isInStock}
            onClick={(e) => {
              e.preventDefault();
              addItem(product);
            }}
            data-testid={`button-add-to-cart-${product.id}`}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-square animate-pulse bg-muted" />
      <CardContent className="p-4">
        <div className="mb-2 h-5 w-16 animate-pulse rounded bg-muted" />
        <div className="h-5 w-full animate-pulse rounded bg-muted" />
        <div className="mt-1 h-4 w-3/4 animate-pulse rounded bg-muted" />
        <div className="mt-3 flex items-center justify-between">
          <div className="h-6 w-16 animate-pulse rounded bg-muted" />
          <div className="h-9 w-9 animate-pulse rounded bg-muted" />
        </div>
      </CardContent>
    </Card>
  );
}
