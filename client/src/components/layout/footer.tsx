import { Link } from "wouter";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Shield, 
  Truck, 
  Headphones, 
  Lock,
  Mail
} from "lucide-react";
import { SiFacebook, SiInstagram, SiX } from "react-icons/si";

const shopLinks = [
  { name: "All Products", href: "/shop" },
  { name: "Injectables", href: "/shop/injectables" },
  { name: "Orals", href: "/shop/orals" },
  { name: "PCT", href: "/shop/pct" },
  { name: "HGH & Peptides", href: "/shop/hgh-peptides" },
  { name: "Sexual Health", href: "/shop/sexual-health" },
  { name: "Hair Growth", href: "/shop/hair-growth" },
  { name: "Weight Loss", href: "/shop/weight-loss" },
];

const supportLinks = [
  { name: "FAQ", href: "/faq" },
  { name: "Shipping Info", href: "/shipping" },
  { name: "How to Pay", href: "/how-to-pay" },
  { name: "Track Order", href: "/track-order" },
  { name: "Contact Us", href: "/contact" },
];

const companyLinks = [
  { name: "About Us", href: "/about" },
  { name: "Reviews", href: "/reviews" },
  { name: "Terms of Service", href: "/terms" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Refund Policy", href: "/refunds" },
];

export function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-heading text-xl font-bold tracking-tight text-foreground">
                FORGE
              </span>
              <span className="mx-1 text-muted-foreground">/</span>
              <span className="font-heading text-xl font-bold tracking-tight text-formula">
                FORMULA
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm">
              Premium performance and lifestyle products backed by science. 
              Quality you can trust, results you can see.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="flex gap-2 max-w-sm">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                data-testid="input-newsletter-email"
              />
              <Button type="submit" data-testid="button-newsletter-submit">
                <Mail className="h-4 w-4" />
              </Button>
            </form>

            <div className="flex gap-3 mt-6">
              <Button variant="ghost" size="icon" data-testid="link-social-facebook">
                <SiFacebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="link-social-instagram">
                <SiInstagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="link-social-twitter">
                <SiX className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold mb-4">Shop</h3>
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
            <h3 className="font-heading text-sm font-semibold mb-4">Support</h3>
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
            <h3 className="font-heading text-sm font-semibold mb-4">Company</h3>
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
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                <Truck className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">Free Shipping</p>
                <p className="text-xs text-muted-foreground">On orders over $150</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                <Shield className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">Quality Guaranteed</p>
                <p className="text-xs text-muted-foreground">Lab tested products</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                <Headphones className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">24/7 Support</p>
                <p className="text-xs text-muted-foreground">Expert assistance</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                <Lock className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">Secure Checkout</p>
                <p className="text-xs text-muted-foreground">Encrypted payments</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-muted-foreground">
              {new Date().getFullYear()} Forge / Formula. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <img
                src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/visa.svg"
                alt="Visa"
                className="h-6 opacity-50 dark:invert"
              />
              <img
                src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/mastercard.svg"
                alt="Mastercard"
                className="h-6 opacity-50 dark:invert"
              />
              <img
                src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/applepay.svg"
                alt="Apple Pay"
                className="h-6 opacity-50 dark:invert"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
