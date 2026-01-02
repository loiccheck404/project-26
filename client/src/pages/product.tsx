import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import {
  ChevronLeft,
  Package,
  Truck,
  Shield,
  FlaskConical,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ProductCard, ProductCardSkeleton } from "@/components/product-card";
import type { Product } from "@shared/schema";

interface ProductPageProps {
  slug: string;
}

export default function ProductPage({ slug }: ProductPageProps) {
  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ["/api/products", slug],
  });

  const { data: relatedProducts } = useQuery<Product[]>({
    queryKey: ["/api/products", "related", product?.categoryId],
    enabled: !!product?.categoryId,
  });

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="aspect-square animate-pulse rounded-lg bg-muted" />
          <div className="space-y-4">
            <div className="h-8 w-3/4 animate-pulse rounded bg-muted" />
            <div className="h-6 w-1/4 animate-pulse rounded bg-muted" />
            <div className="h-24 w-full animate-pulse rounded bg-muted" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center lg:px-8">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <p className="mt-2 text-muted-foreground">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Button className="mt-4 bg-gold text-black" asChild data-testid="button-back-to-shop">
          <Link href="/shop">Back to Shop</Link>
        </Button>
      </div>
    );
  }

  const isInStock = product.stock > 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const hasPrice = product.price !== null;
  const currentPrice = hasPrice ? parseFloat(product.price!) : null;

  const handleContactClick = () => {
    window.location.href = `/contact?product=${encodeURIComponent(product.name)}`;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <Button
        variant="ghost"
        className="mb-6"
        asChild
        data-testid="button-back"
      >
        <Link href="/shop">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Shop
        </Link>
      </Button>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-card border border-border">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-card to-muted">
                <Package className="h-32 w-32 text-muted-foreground/30" />
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground">{product.name}</h1>
            <p className="mt-2 text-lg text-muted-foreground">{product.shortDescription}</p>
          </div>

          <div className="flex items-baseline gap-3">
            {hasPrice ? (
              <span className="font-heading text-4xl font-bold text-gold">
                ${currentPrice!.toFixed(2)}
              </span>
            ) : (
              <span className="text-lg font-medium text-muted-foreground">
                Price: Inquire via DM
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {isInStock ? (
              <>
                <Badge className="bg-green-900/30 text-green-400 border-green-700">
                  In Stock
                </Badge>
                {isLowStock && (
                  <span className="text-sm text-muted-foreground">
                    Only {product.stock} left
                  </span>
                )}
              </>
            ) : (
              <Badge variant="secondary">Out of Stock</Badge>
            )}
          </div>

          <Separator />

          <div className="space-y-4">
            <Button
              size="lg"
              className="w-full bg-gold text-black font-semibold"
              disabled={!isInStock}
              onClick={handleContactClick}
              data-testid="button-contact-order"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Contact for Order
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              Click above to inquire about this product
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col items-center text-center rounded-lg border border-border bg-card/50 p-3">
              <FlaskConical className="h-5 w-5 text-gold mb-1" />
              <p className="text-xs font-medium">Lab Tested</p>
            </div>
            <div className="flex flex-col items-center text-center rounded-lg border border-border bg-card/50 p-3">
              <Truck className="h-5 w-5 text-gold mb-1" />
              <p className="text-xs font-medium">Discrete Ship</p>
            </div>
            <div className="flex flex-col items-center text-center rounded-lg border border-border bg-card/50 p-3">
              <Shield className="h-5 w-5 text-gold mb-1" />
              <p className="text-xs font-medium">Quality</p>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="description" className="mt-12">
        <TabsList data-testid="product-tabs">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="usage">Usage Info</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="mt-6">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <p className="text-muted-foreground">
              {product.description || "No detailed description available for this product."}
            </p>
          </div>
        </TabsContent>
        <TabsContent value="usage" className="mt-6">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <p className="text-muted-foreground">
              Please consult with a healthcare professional for proper usage instructions and dosage recommendations. 
              Follow all product guidelines and safety precautions. This information is for educational purposes only.
            </p>
          </div>
        </TabsContent>
      </Tabs>

      {relatedProducts && relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="font-heading text-2xl font-bold mb-6">
            Related Products
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts
              .filter((p) => p.id !== product.id)
              .slice(0, 4)
              .map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
          </div>
        </section>
      )}
    </div>
  );
}
