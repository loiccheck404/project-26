import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  Syringe,
  Pill,
  Heart,
  Beaker,
  Sparkles,
  Scale,
  Shield,
  Truck,
  Headphones,
  Lock,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProductCard, ProductCardSkeleton } from "@/components/product-card";
import type { Product } from "@shared/schema";

const categories = [
  {
    name: "Injectables",
    slug: "injectables",
    icon: Syringe,
    description: "Performance compounds",
    brand: "forge",
  },
  {
    name: "Orals",
    slug: "orals",
    icon: Pill,
    description: "Oral compounds",
    brand: "formula",
  },
  {
    name: "PCT",
    slug: "pct",
    icon: Heart,
    description: "Post cycle therapy",
    brand: "formula",
  },
  {
    name: "HGH & Peptides",
    slug: "hgh-peptides",
    icon: Beaker,
    description: "Growth & recovery",
    brand: "forge",
  },
  {
    name: "Sexual Health",
    slug: "sexual-health",
    icon: Sparkles,
    description: "Vitality products",
    brand: "formula",
  },
  {
    name: "Weight Loss",
    slug: "weight-loss",
    icon: Scale,
    description: "Body composition",
    brand: "formula",
  },
];

const trustBadges = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over $150",
  },
  {
    icon: Shield,
    title: "Quality Guaranteed",
    description: "Lab tested products",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Expert assistance",
  },
  {
    icon: Lock,
    title: "Secure Checkout",
    description: "Encrypted payments",
  },
];

const testimonials = [
  {
    name: "Michael R.",
    rating: 5,
    text: "Outstanding quality and fast shipping. The results speak for themselves. Highly recommend!",
    verified: true,
  },
  {
    name: "David T.",
    rating: 5,
    text: "Been using their products for 6 months. Consistent quality every time. Best in the business.",
    verified: true,
  },
  {
    name: "James K.",
    rating: 5,
    text: "Customer service is top-notch. They answered all my questions quickly and professionally.",
    verified: true,
  },
];

export default function HomePage() {
  const { data: featuredProducts, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products", "featured"],
  });

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 py-20 lg:py-32">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="text-center lg:text-left">
              <Badge className="mb-4 bg-white/10 text-white backdrop-blur-sm">
                Premium Quality Products
              </Badge>
              <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Premium Performance.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500">
                  Scientific Precision.
                </span>
              </h1>
              <p className="mt-6 text-lg text-zinc-300 max-w-xl mx-auto lg:mx-0">
                Experience the difference with our lab-tested, pharmaceutical-grade products.
                Trusted by athletes and professionals worldwide.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
                <Button
                  size="lg"
                  className="bg-forge hover:bg-forge/90 text-white"
                  asChild
                  data-testid="button-shop-forge"
                >
                  <Link href="/shop?brand=forge">
                    Shop Forge
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  className="bg-formula hover:bg-formula/90 text-white"
                  asChild
                  data-testid="button-shop-formula"
                >
                  <Link href="/shop?brand=formula">
                    Shop Formula
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-forge/20 to-formula/20 blur-3xl" />
                <div className="relative grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="h-48 rounded-lg bg-zinc-800/50 backdrop-blur flex items-center justify-center border border-zinc-700">
                      <div className="text-center">
                        <Syringe className="h-12 w-12 text-forge mx-auto mb-2" />
                        <span className="text-sm font-medium text-white">Forge Injectables</span>
                      </div>
                    </div>
                    <div className="h-32 rounded-lg bg-zinc-800/50 backdrop-blur flex items-center justify-center border border-zinc-700">
                      <div className="text-center">
                        <Beaker className="h-10 w-10 text-forge mx-auto mb-2" />
                        <span className="text-sm font-medium text-white">HGH</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4 pt-8">
                    <div className="h-32 rounded-lg bg-zinc-800/50 backdrop-blur flex items-center justify-center border border-zinc-700">
                      <div className="text-center">
                        <Pill className="h-10 w-10 text-formula mx-auto mb-2" />
                        <span className="text-sm font-medium text-white">Orals</span>
                      </div>
                    </div>
                    <div className="h-48 rounded-lg bg-zinc-800/50 backdrop-blur flex items-center justify-center border border-zinc-700">
                      <div className="text-center">
                        <Heart className="h-12 w-12 text-formula mx-auto mb-2" />
                        <span className="text-sm font-medium text-white">Formula PCT</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold tracking-tight">
              Shop by Category
            </h2>
            <p className="mt-2 text-muted-foreground">
              Browse our extensive collection of premium products
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/shop/${category.slug}`}
                data-testid={`link-category-${category.slug}`}
              >
                <Card className="group h-full overflow-visible hover-elevate transition-all">
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                    <div
                      className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full ${
                        category.brand === "forge"
                          ? "bg-forge/10 text-forge"
                          : "bg-formula/10 text-formula"
                      }`}
                    >
                      <category.icon className="h-7 w-7" />
                    </div>
                    <h3 className="font-medium">{category.name}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {category.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-heading text-3xl font-bold tracking-tight">
                Featured Products
              </h2>
              <p className="mt-2 text-muted-foreground">
                Our most popular items, hand-picked for you
              </p>
            </div>
            <Button variant="outline" asChild data-testid="link-view-all-products">
              <Link href="/shop">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))
              : featuredProducts?.slice(0, 8).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            {!isLoading && (!featuredProducts || featuredProducts.length === 0) && (
              <div className="col-span-full py-12 text-center">
                <p className="text-muted-foreground">
                  No featured products available yet. Check back soon!
                </p>
                <Button className="mt-4" asChild>
                  <Link href="/shop">Browse All Products</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trustBadges.map((badge) => (
              <div
                key={badge.title}
                className="flex items-center gap-4 rounded-lg border border-border bg-card p-4"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                  <badge.icon className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">{badge.title}</p>
                  <p className="text-sm text-muted-foreground">{badge.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold tracking-tight">
              What Our Customers Say
            </h2>
            <p className="mt-2 text-muted-foreground">
              Real reviews from verified customers
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="overflow-visible">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.text}"</p>
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-sm font-medium">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{testimonial.name}</p>
                      {testimonial.verified && (
                        <Badge variant="secondary" size="sm">
                          Verified Buyer
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" asChild data-testid="link-all-reviews">
              <Link href="/reviews">
                Read All Reviews
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-forge to-formula p-8 lg:p-12">
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative text-center text-white">
              <h2 className="font-heading text-3xl font-bold tracking-tight lg:text-4xl">
                Ready to Transform Your Results?
              </h2>
              <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
                Join thousands of satisfied customers who trust Forge and Formula
                for their performance and lifestyle needs.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-foreground hover:bg-white/90"
                  asChild
                  data-testid="button-start-shopping"
                >
                  <Link href="/shop">
                    Start Shopping
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                  asChild
                  data-testid="button-learn-more"
                >
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
