import { Link } from "wouter";
import { MessageCircle, Package } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const isInStock = product.stock > 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const hasPrice = product.price !== null;
  const currentPrice = hasPrice ? parseFloat(product.price!) : null;

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = `/contact?product=${encodeURIComponent(product.name)}`;
  };

  return (
    <Card
      className="group overflow-visible card-hover-gold"
      data-testid={`product-card-${product.id}`}
    >
      <Link href={`/product/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden rounded-t-md bg-card border-b border-border">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-card to-muted">
              <Package className="h-16 w-16 text-muted-foreground/40" />
            </div>
          )}
          {!isInStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80">
              <Badge variant="secondary">Out of Stock</Badge>
            </div>
          )}
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-medium text-foreground line-clamp-1 group-hover:text-gold transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
          {product.shortDescription}
        </p>
        <div className="mt-3 flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-2">
            {hasPrice ? (
              <span className="font-heading text-lg font-semibold text-gold">
                ${currentPrice!.toFixed(2)}
              </span>
            ) : (
              <span className="text-sm font-medium text-muted-foreground">
                Inquire via DM
              </span>
            )}
            {isLowStock && (
              <Badge variant="secondary" size="sm" className="text-xs">
                Low Stock
              </Badge>
            )}
          </div>
        </div>
        <Button
          className="w-full mt-3 bg-gold text-black font-medium"
          size="sm"
          disabled={!isInStock}
          onClick={handleContactClick}
          data-testid={`button-contact-order-${product.id}`}
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          Contact for Order
        </Button>
      </CardContent>
    </Card>
  );
}

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-square animate-pulse bg-muted" />
      <CardContent className="p-4">
        <div className="h-5 w-full animate-pulse rounded bg-muted" />
        <div className="mt-1 h-4 w-3/4 animate-pulse rounded bg-muted" />
        <div className="mt-3 h-6 w-20 animate-pulse rounded bg-muted" />
        <div className="mt-3 h-8 w-full animate-pulse rounded bg-muted" />
      </CardContent>
    </Card>
  );
}
