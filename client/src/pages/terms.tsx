import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 lg:px-8">
      <Button variant="ghost" className="mb-6" asChild>
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </Button>

      <h1 className="font-heading text-3xl font-bold mb-8" data-testid="text-terms-title">
        Terms of Service
      </h1>

      <div className="prose prose-sm dark:prose-invert max-w-none space-y-6">
        <section>
          <h2 className="font-heading text-xl font-semibold mb-4">1. Introduction</h2>
          <p className="text-muted-foreground">
            Welcome to Forge & Formula. By accessing and using our website and services, 
            you agree to be bound by these Terms of Service. Please read them carefully.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold mb-4">2. Products and Services</h2>
          <p className="text-muted-foreground">
            Our products are intended for research purposes only. All products are 
            pharmaceutical-grade and lab-tested for quality assurance. Customers are 
            responsible for ensuring compliance with local laws and regulations.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold mb-4">3. Orders and Payment</h2>
          <p className="text-muted-foreground">
            All orders are subject to availability and confirmation. Payment must be 
            received in full before orders are processed. We accept various payment 
            methods as indicated during checkout.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold mb-4">4. Shipping and Delivery</h2>
          <p className="text-muted-foreground">
            We ship discretely with unmarked packaging. Shipping times may vary based 
            on location and method selected. We are not responsible for delays caused 
            by customs or courier services.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold mb-4">5. Returns and Refunds</h2>
          <p className="text-muted-foreground">
            Due to the nature of our products, returns are only accepted for damaged 
            or incorrect items. Please contact us within 7 days of receiving your 
            order to report any issues.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold mb-4">6. Privacy</h2>
          <p className="text-muted-foreground">
            Your privacy is important to us. Please review our{" "}
            <Link href="/privacy" className="text-gold hover:underline">
              Privacy Policy
            </Link>{" "}
            for information on how we collect, use, and protect your data.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold mb-4">7. Contact</h2>
          <p className="text-muted-foreground">
            If you have any questions about these terms, please{" "}
            <Link href="/contact" className="text-gold hover:underline">
              contact us
            </Link>
            .
          </p>
        </section>

        <p className="text-xs text-muted-foreground pt-6 border-t border-border">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
