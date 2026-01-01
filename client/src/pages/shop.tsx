import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useSearch } from "wouter";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ProductCard, ProductCardSkeleton } from "@/components/product-card";
import type { Product, Category } from "@shared/schema";

interface ShopPageProps {
  categorySlug?: string;
}

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Name: A to Z" },
];

export default function ShopPage({ categorySlug }: ShopPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const searchParams = useSearch();

  const { data: products, isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ["/api/products", categorySlug],
  });

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const currentCategory = useMemo(() => {
    if (!categorySlug || !categories) return null;
    return categories.find((c) => c.slug === categorySlug);
  }, [categorySlug, categories]);

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    let filtered = [...products];

    if (categorySlug) {
      filtered = filtered.filter(
        (p) => p.categoryId && categories?.find((c) => c.id === p.categoryId)?.slug === categorySlug
      );
    }

    const urlParams = new URLSearchParams(searchParams);
    const brandParam = urlParams.get("brand");
    if (brandParam) {
      filtered = filtered.filter((p) => p.brand === brandParam);
    }

    if (selectedBrands.length > 0) {
      filtered = filtered.filter((p) => selectedBrands.includes(p.brand));
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query)
      );
    }

    if (inStockOnly) {
      filtered = filtered.filter((p) => p.stock > 0);
    }

    filtered = filtered.filter((p) => {
      const price = parseFloat(p.price);
      return price >= priceRange[0] && price <= priceRange[1];
    });

    switch (sortBy) {
      case "newest":
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime()
        );
        break;
      case "price-asc":
        filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case "price-desc":
        filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "featured":
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return filtered;
  }, [products, categories, categorySlug, searchQuery, selectedBrands, sortBy, inStockOnly, priceRange, searchParams]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedBrands([]);
    setPriceRange([0, 500]);
    setInStockOnly(false);
    setSortBy("featured");
  };

  const hasActiveFilters =
    searchQuery ||
    selectedBrands.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 500 ||
    inStockOnly;

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-3">Brand</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="brand-forge"
              checked={selectedBrands.includes("forge")}
              onCheckedChange={() => toggleBrand("forge")}
              data-testid="checkbox-brand-forge"
            />
            <Label htmlFor="brand-forge" className="text-sm cursor-pointer">
              Forge
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="brand-formula"
              checked={selectedBrands.includes("formula")}
              onCheckedChange={() => toggleBrand("formula")}
              data-testid="checkbox-brand-formula"
            />
            <Label htmlFor="brand-formula" className="text-sm cursor-pointer">
              Formula
            </Label>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium mb-3">Availability</h3>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="in-stock"
            checked={inStockOnly}
            onCheckedChange={(checked) => setInStockOnly(checked === true)}
            data-testid="checkbox-in-stock"
          />
          <Label htmlFor="in-stock" className="text-sm cursor-pointer">
            In Stock Only
          </Label>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium mb-3">Categories</h3>
        <div className="space-y-1">
          {categories?.map((category) => (
            <a
              key={category.id}
              href={`/shop/${category.slug}`}
              className={`block text-sm py-1 hover:text-foreground transition-colors ${
                categorySlug === category.slug
                  ? "text-foreground font-medium"
                  : "text-muted-foreground"
              }`}
              data-testid={`filter-category-${category.slug}`}
            >
              {category.name}
            </a>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <>
          <Separator />
          <Button
            variant="outline"
            className="w-full"
            onClick={clearFilters}
            data-testid="button-clear-filters"
          >
            Clear All Filters
          </Button>
        </>
      )}
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold tracking-tight">
          {currentCategory ? currentCategory.name : "All Products"}
        </h1>
        {currentCategory?.description && (
          <p className="mt-2 text-muted-foreground">{currentCategory.description}</p>
        )}
        {!currentCategory && (
          <p className="mt-2 text-muted-foreground">
            Browse our complete collection of premium products
          </p>
        )}
      </div>

      <div className="flex flex-col gap-4 mb-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-2">
          <div className="relative flex-1 lg:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
              data-testid="input-search-products"
            />
          </div>
          <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden" data-testid="button-open-filters">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
                {hasActiveFilters && (
                  <Badge variant="secondary" className="ml-2">
                    {selectedBrands.length + (inStockOnly ? 1 : 0)}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FilterSidebar />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex items-center gap-4">
          <p className="text-sm text-muted-foreground">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
          </p>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48" data-testid="select-sort">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {searchQuery && (
            <Badge variant="secondary" className="gap-1">
              "{searchQuery}"
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => setSearchQuery("")}
              />
            </Badge>
          )}
          {selectedBrands.map((brand) => (
            <Badge key={brand} variant="secondary" className="gap-1">
              {brand === "forge" ? "Forge" : "Formula"}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => toggleBrand(brand)}
              />
            </Badge>
          ))}
          {inStockOnly && (
            <Badge variant="secondary" className="gap-1">
              In Stock
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => setInStockOnly(false)}
              />
            </Badge>
          )}
        </div>
      )}

      <div className="flex gap-8">
        <aside className="hidden w-64 flex-shrink-0 lg:block">
          <FilterSidebar />
        </aside>

        <div className="flex-1">
          {productsLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="text-lg font-medium">No products found</p>
              <p className="mt-2 text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
              {hasActiveFilters && (
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={clearFilters}
                  data-testid="button-clear-filters-empty"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
