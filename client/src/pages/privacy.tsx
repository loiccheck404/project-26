import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 lg:px-8">
      <Button variant="ghost" className="mb-6" asChild>
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </Button>

      <h1 className="font-heading text-3xl font-bold mb-8" data-testid="text-privacy-title">
        Privacy Policy
      </h1>

      <div className="prose prose-sm dark:prose-invert max-w-none space-y-6">
        <section>
          <h2 className="font-heading text-xl font-semibold mb-4">1. Information We Collect</h2>
          <p className="text-muted-foreground">
            We collect information you provide directly to us, such as when you create 
            an account, place an order, or contact us. This includes your name, email 
            address, shipping address, and payment information.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold mb-4">2. How We Use Your Information</h2>
          <p className="text-muted-foreground">
            We use your information to process orders, communicate with you about 
            your orders, and improve our services. We do not sell or share your 
            personal information with third parties for marketing purposes.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold mb-4">3. Data Security</h2>
          <p className="text-muted-foreground">
            We implement industry-standard security measures to protect your personal 
            information. All sensitive data is encrypted during transmission and stored 
            securely on our servers.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold mb-4">4. Cookies</h2>
          <p className="text-muted-foreground">
            We use cookies and similar technologies to enhance your browsing experience, 
            analyze site traffic, and personalize content. You can manage cookie 
            preferences through your browser settings.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold mb-4">5. Third-Party Services</h2>
          <p className="text-muted-foreground">
            We may use third-party services for payment processing, shipping, and 
            analytics. These services have their own privacy policies governing the 
            use of your information.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold mb-4">6. Your Rights</h2>
          <p className="text-muted-foreground">
            You have the right to access, update, or delete your personal information. 
            You may also opt out of marketing communications at any time. Contact us 
            to exercise these rights.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold mb-4">7. Contact Us</h2>
          <p className="text-muted-foreground">
            If you have questions about this Privacy Policy, please{" "}
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
