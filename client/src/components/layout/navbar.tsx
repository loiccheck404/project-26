import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ShoppingCart, User, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { useCartStore } from "@/lib/cart-store";
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
  { name: "Injectables", href: "/shop/injectables", brand: "forge" },
  { name: "Orals", href: "/shop/orals", brand: "formula" },
  { name: "PCT", href: "/shop/pct", brand: "formula" },
  { name: "HGH & Peptides", href: "/shop/hgh-peptides", brand: "forge" },
  { name: "Sexual Health", href: "/shop/sexual-health", brand: "formula" },
  { name: "Hair Growth", href: "/shop/hair-growth", brand: "formula" },
  { name: "Weight Loss", href: "/shop/weight-loss", brand: "formula" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { openCart, getItemCount } = useCartStore();
  const { user, isAuthenticated, isLoading } = useAuth();
  const itemCount = getItemCount();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-8">
        <div className="flex items-center gap-4">
          <Link href="/" data-testid="link-home">
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <span className="font-heading text-xl font-bold tracking-tight text-foreground">
                  FORGE
                </span>
                <span className="mx-1.5 text-muted-foreground">/</span>
                <span className="font-heading text-xl font-bold tracking-tight text-formula">
                  FORMULA
                </span>
              </div>
            </div>
          </Link>
        </div>

        <div className="hidden lg:flex lg:items-center lg:gap-1">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">
                  Shop
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[500px] gap-3 p-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <h4 className="font-heading text-sm font-semibold text-forge">
                        Forge Products
                      </h4>
                      {categories
                        .filter((c) => c.brand === "forge")
                        .map((category) => (
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
                    <div className="space-y-2">
                      <h4 className="font-heading text-sm font-semibold text-formula">
                        Formula Products
                      </h4>
                      {categories
                        .filter((c) => c.brand === "formula")
                        .map((category) => (
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
                    <div className="col-span-2 border-t border-border pt-3">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/shop"
                          className="block select-none rounded-md p-2 text-sm font-medium leading-none no-underline outline-none transition-colors hover-elevate"
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
          <Link href="/contact">
            <Button variant="ghost" data-testid="link-contact">
              Contact
            </Button>
          </Link>
          <Link href="/faq">
            <Button variant="ghost" data-testid="link-faq">
              FAQ
            </Button>
          </Link>
          <Link href="/track-order">
            <Button variant="ghost" data-testid="link-track-order">
              Track Order
            </Button>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />

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
            className="relative"
            onClick={openCart}
            data-testid="button-cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <Badge
                variant="default"
                className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs"
              >
                {itemCount > 99 ? "99+" : itemCount}
              </Badge>
            )}
          </Button>

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
                className="w-full justify-start"
                onClick={() => setMobileMenuOpen(false)}
                data-testid="mobile-link-shop"
              >
                Shop All
              </Button>
            </Link>
            {categories.map((category) => (
              <Link key={category.href} href={category.href}>
                <Button
                  variant="ghost"
                  className="w-full justify-start pl-6"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`mobile-link-${category.name.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {category.name}
                </Button>
              </Link>
            ))}
            <div className="border-t border-border pt-2">
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
              <Link href="/track-order">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid="mobile-link-track-order"
                >
                  Track Order
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
