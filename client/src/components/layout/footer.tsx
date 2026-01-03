import { Link } from "wouter";
import { 
  Shield, 
  Truck, 
  FlaskConical, 
  CheckCircle,
  Mail,
  MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

const shopLinks = [
  { name: "All Products", href: "/shop" },
  { name: "Injectables", href: "/shop/injectables" },
  { name: "Orals", href: "/shop/orals" },
  { name: "Post Cycle / Pharma", href: "/shop/pct-pharma" },
  { name: "Peptides", href: "/shop/peptides" },
  { name: "Growth Hormone", href: "/shop/growth-hormone" },
];

const supportLinks = [
  { name: "FAQ", href: "/faq" },
  { name: "Shipping Info", href: "/shipping" },
  { name: "Contact Us", href: "/contact" },
];

const companyLinks = [
  { name: "About Us", href: "/about" },
  { name: "Terms of Service", href: "/terms" },
  { name: "Privacy Policy", href: "/privacy" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-heading text-xl font-bold tracking-tight text-gold">
                FORGE & FORMULA
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm">
              Premium pharmaceutical-grade products. 
              Lab tested for quality and purity.
            </p>

            <Button className="bg-gold text-black font-medium" asChild>
              <Link href="/contact">
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact for Order
              </Link>
            </Button>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold mb-4 text-gold">Products</h3>
            <ul className="space-y-2">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`footer-link-${link.name.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold mb-4 text-gold">Support</h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`footer-link-${link.name.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold mb-4 text-gold">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`footer-link-${link.name.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gold/10">
                <FlaskConical className="h-5 w-5 text-gold" />
              </div>
              <div>
                <p className="text-sm font-medium">Lab Tested</p>
                <p className="text-xs text-muted-foreground">Verified purity</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gold/10">
                <Shield className="h-5 w-5 text-gold" />
              </div>
              <div>
                <p className="text-sm font-medium">Quality Assured</p>
                <p className="text-xs text-muted-foreground">Pharmaceutical grade</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gold/10">
                <Truck className="h-5 w-5 text-gold" />
              </div>
              <div>
                <p className="text-sm font-medium">Discrete Shipping</p>
                <p className="text-xs text-muted-foreground">Secure packaging</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gold/10">
                <CheckCircle className="h-5 w-5 text-gold" />
              </div>
              <div>
                <p className="text-sm font-medium">Guaranteed</p>
                <p className="text-xs text-muted-foreground">Satisfaction assured</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-muted-foreground">
              {new Date().getFullYear()} Forge & Formula. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
