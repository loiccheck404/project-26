import { Link } from "wouter";
import { ArrowRight, Shield, Beaker, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const values = [
  {
    icon: Shield,
    title: "Quality First",
    description:
      "Every product undergoes rigorous third-party lab testing to ensure purity, potency, and safety standards.",
  },
  {
    icon: Beaker,
    title: "Science-Backed",
    description:
      "Our formulations are developed using the latest research and pharmaceutical-grade manufacturing processes.",
  },
  {
    icon: Users,
    title: "Customer Focus",
    description:
      "We provide 24/7 expert support to help you achieve your goals with personalized guidance.",
  },
  {
    icon: Award,
    title: "Proven Results",
    description:
      "Trusted by thousands of athletes and professionals worldwide for consistent, reliable results.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
              About Forge & Formula
            </h1>
            <p className="mt-6 text-lg text-zinc-300">
              We are dedicated to providing premium performance and lifestyle products
              that meet the highest standards of quality and efficacy. Our mission is
              to help you achieve your goals with scientifically formulated solutions.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-heading text-3xl font-bold tracking-tight">
                Our Story
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground">
                <p>
                  Founded with a vision to revolutionize the performance enhancement
                  industry, Forge & Formula has grown into a trusted name among
                  athletes, fitness enthusiasts, and health-conscious individuals.
                </p>
                <p>
                  Our dual-brand approach allows us to serve diverse needs:
                  <strong className="text-foreground"> Forge</strong> focuses on
                  performance compounds for those seeking peak physical performance,
                  while <strong className="text-foreground"> Formula</strong> offers
                  lifestyle products for overall wellness and vitality.
                </p>
                <p>
                  Every product in our catalog is manufactured in GMP-certified
                  facilities and tested by independent laboratories to guarantee
                  quality, purity, and accurate dosing.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="h-40 rounded-lg bg-forge/10 flex items-center justify-center">
                    <span className="font-heading text-2xl font-bold text-forge">
                      FORGE
                    </span>
                  </div>
                  <div className="h-28 rounded-lg bg-muted" />
                </div>
                <div className="space-y-4 pt-8">
                  <div className="h-28 rounded-lg bg-muted" />
                  <div className="h-40 rounded-lg bg-formula/10 flex items-center justify-center">
                    <span className="font-heading text-2xl font-bold text-formula">
                      FORMULA
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold tracking-tight">
              Our Values
            </h2>
            <p className="mt-2 text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <Card key={value.title} className="overflow-visible">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="text-center">
              <p className="font-heading text-4xl font-bold text-primary">10,000+</p>
              <p className="mt-2 text-muted-foreground">Satisfied Customers</p>
            </div>
            <div className="text-center">
              <p className="font-heading text-4xl font-bold text-primary">50+</p>
              <p className="mt-2 text-muted-foreground">Premium Products</p>
            </div>
            <div className="text-center">
              <p className="font-heading text-4xl font-bold text-primary">99.9%</p>
              <p className="mt-2 text-muted-foreground">Purity Guaranteed</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-forge to-formula py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white lg:text-4xl">
            Ready to Experience the Difference?
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            Browse our collection of premium products and start your journey today.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="mt-8 bg-white text-foreground hover:bg-white/90"
            asChild
            data-testid="button-shop-now"
          >
            <Link href="/shop">
              Shop Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
