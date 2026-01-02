import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, User, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const categories = [
  { name: "Injectables", href: "/shop/injectables" },
  { name: "Orals", href: "/shop/orals" },
  { name: "Post Cycle / Pharma", href: "/shop/pct-pharma" },
  { name: "Peptides", href: "/shop/peptides" },
  { name: "Growth Hormone", href: "/shop/growth-hormone" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { user, isAuthenticated, isLoading } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" data-testid="link-home">
            <div className="flex items-center">
              <span className="font-heading text-xl font-bold tracking-tight text-gold">
                FORGE & FORMULA
              </span>
            </div>
          </Link>
        </div>

        <div className="hidden lg:flex lg:items-center lg:gap-1">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">
                  Products
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[300px] p-4">
                    <div className="space-y-1">
                      {categories.map((category) => (
                        <NavigationMenuLink key={category.href} asChild>
                          <Link
                            href={category.href}
                            className="block select-none rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors hover-elevate"
                            data-testid={`link-category-${category.name.toLowerCase().replace(/\s+/g, "-")}`}
                          >
                            {category.name}
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                    <div className="border-t border-border mt-2 pt-2">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/shop"
                          className="block select-none rounded-md p-2 text-sm font-medium leading-none no-underline outline-none transition-colors hover-elevate text-gold"
                          data-testid="link-shop-all"
                        >
                          View All Products
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Link href="/about">
            <Button variant="ghost" data-testid="link-about">
              About
            </Button>
          </Link>
          <Link href="/faq">
            <Button variant="ghost" data-testid="link-faq">
              FAQ
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="ghost" data-testid="link-contact">
              Contact
            </Button>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Button
            className="hidden sm:inline-flex bg-gold text-black font-medium"
            size="sm"
            asChild
            data-testid="button-contact-order"
          >
            <Link href="/contact">
              <MessageCircle className="h-4 w-4 mr-2" />
              Contact for Order
            </Link>
          </Button>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" data-testid="button-user-menu">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">
                    {user?.firstName || "Account"}
                  </p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/account" data-testid="link-account">
                    My Account
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/orders" data-testid="link-orders">
                    My Orders
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <a href="/api/logout" data-testid="button-logout">
                    Sign Out
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" size="icon" asChild data-testid="button-login">
              <a href="/api/login">
                <User className="h-5 w-5" />
              </a>
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="space-y-1 border-t border-border px-4 py-4">
            <Link href="/shop">
              <Button
                variant="ghost"
                className="w-full justify-start font-medium text-gold"
                onClick={() => setMobileMenuOpen(false)}
                data-testid="mobile-link-shop"
              >
                View All Products
              </Button>
            </Link>
            {categories.map((category) => (
              <Link key={category.href} href={category.href}>
                <Button
                  variant="ghost"
                  className="w-full justify-start pl-4"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`mobile-link-${category.name.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {category.name}
                </Button>
              </Link>
            ))}
            <div className="border-t border-border pt-2 mt-2">
              <Link href="/about">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid="mobile-link-about"
                >
                  About
                </Button>
              </Link>
              <Link href="/faq">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid="mobile-link-faq"
                >
                  FAQ
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid="mobile-link-contact"
                >
                  Contact
                </Button>
              </Link>
            </div>
            <div className="pt-2">
              <Button
                className="w-full bg-gold text-black font-medium"
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.location.href = "/contact";
                }}
                data-testid="mobile-button-contact-order"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact for Order
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
