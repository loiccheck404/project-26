import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import {
  Minus,
  Plus,
  ShoppingCart,
  ChevronLeft,
  Star,
  Package,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ProductCard, ProductCardSkeleton } from "@/components/product-card";
import { useCartStore } from "@/lib/cart-store";
import type { Product, Review } from "@shared/schema";

interface ProductPageProps {
  slug: string;
}

export default function ProductPage({ slug }: ProductPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem } = useCartStore();

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ["/api/products", slug],
  });

  const { data: relatedProducts } = useQuery<Product[]>({
    queryKey: ["/api/products", "related", product?.categoryId],
    enabled: !!product?.categoryId,
  });

  const { data: reviews } = useQuery<Review[]>({
    queryKey: ["/api/reviews", product?.id],
    enabled: !!product?.id,
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
        <Button className="mt-4" asChild data-testid="button-back-to-shop">
          <Link href="/shop">Back to Shop</Link>
        </Button>
      </div>
    );
  }

  const images = product.images?.length ? product.images : [product.imageUrl];
  const isInStock = product.stock > 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const currentPrice = parseFloat(product.price);
  const comparePrice = product.compareAtPrice
    ? parseFloat(product.compareAtPrice)
    : null;
  const hasDiscount = comparePrice && comparePrice > currentPrice;
  const discountPercent = hasDiscount
    ? Math.round(((comparePrice - currentPrice) / comparePrice) * 100)
    : 0;

  const averageRating = reviews?.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  const handleAddToCart = () => {
    addItem(product, quantity);
    setQuantity(1);
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
          <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
            {images[selectedImage] ? (
              <img
                src={images[selectedImage] as string}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <Package className="h-24 w-24 text-muted-foreground" />
              </div>
            )}
            {hasDiscount && (
              <Badge className="absolute left-4 top-4 bg-destructive text-destructive-foreground">
                -{discountPercent}% OFF
              </Badge>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border-2 transition-colors ${
                    selectedImage === index
                      ? "border-primary"
                      : "border-transparent"
                  }`}
                  data-testid={`button-thumbnail-${index}`}
                >
                  <img
                    src={image as string}
                    alt={`${product.name} ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <Badge
              variant="outline"
              className={
                product.brand === "forge"
                  ? "border-forge/30 text-forge mb-2"
                  : "border-formula/30 text-formula mb-2"
              }
            >
              {product.brand === "forge" ? "Forge" : "Formula"}
            </Badge>
            <h1 className="font-heading text-3xl font-bold">{product.name}</h1>
            {reviews && reviews.length > 0 && (
              <div className="mt-2 flex items-center gap-2">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.round(averageRating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({reviews.length} review{reviews.length !== 1 ? "s" : ""})
                </span>
              </div>
            )}
          </div>

          <div className="flex items-baseline gap-3">
            <span className="font-heading text-3xl font-bold">
              ${currentPrice.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-lg text-muted-foreground line-through">
                ${comparePrice.toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-muted-foreground">{product.shortDescription}</p>

          <div className="flex items-center gap-2">
            {isInStock ? (
              <>
                <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
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
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={!isInStock}
                  data-testid="button-decrease-quantity"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={!isInStock || quantity >= product.stock}
                  data-testid="button-increase-quantity"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full"
              disabled={!isInStock}
              onClick={handleAddToCart}
              data-testid="button-add-to-cart"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart - ${(currentPrice * quantity).toFixed(2)}
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 rounded-lg border border-border p-3">
              <Truck className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Free Shipping</p>
                <p className="text-xs text-muted-foreground">Orders $150+</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-border p-3">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Quality Guaranteed</p>
                <p className="text-xs text-muted-foreground">Lab Tested</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="description" className="mt-12">
        <TabsList data-testid="product-tabs">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="usage">How to Use</TabsTrigger>
          <TabsTrigger value="reviews">
            Reviews {reviews?.length ? `(${reviews.length})` : ""}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="mt-6">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            {product.description || (
              <p className="text-muted-foreground">
                No detailed description available for this product.
              </p>
            )}
          </div>
        </TabsContent>
        <TabsContent value="usage" className="mt-6">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <p className="text-muted-foreground">
              Please consult with a healthcare professional for proper usage instructions and dosage recommendations. Follow all product guidelines and safety precautions.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="mt-6">
          {reviews && reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                      {review.verified && (
                        <Badge variant="secondary" size="sm">
                          Verified
                        </Badge>
                      )}
                    </div>
                    {review.title && (
                      <h4 className="font-medium">{review.title}</h4>
                    )}
                    <p className="text-sm text-muted-foreground mt-1">
                      {review.content}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">
              No reviews yet. Be the first to review this product!
            </p>
          )}
        </TabsContent>
      </Tabs>

      {relatedProducts && relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="font-heading text-2xl font-bold mb-6">
            Related Products
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
