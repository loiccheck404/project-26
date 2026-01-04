import { Truck, Clock, MapPin, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const shippingMethods = [
  {
    name: "Standard Shipping",
    price: "$15.00",
    time: "5-7 business days",
    description: "Reliable domestic delivery",
  },
  {
    name: "Express Shipping",
    price: "$25.00",
    time: "2-3 business days",
    description: "Priority handling and faster delivery",
  },
  {
    name: "Overnight Shipping",
    price: "$45.00",
    time: "1 business day",
    description: "Order by 2pm EST for next day delivery",
  },
];

const internationalZones = [
  { zone: "Canada", time: "7-14 business days", price: "From $25" },
  { zone: "Europe", time: "10-21 business days", price: "From $35" },
  { zone: "Australia/NZ", time: "14-28 business days", price: "From $40" },
  { zone: "Other", time: "14-35 business days", price: "From $45" },
];

export default function ShippingPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 lg:px-8">
      <div className="text-center mb-12">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
          <Truck className="h-8 w-8 text-primary" />
        </div>
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Shipping Information
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Fast, reliable shipping with discrete packaging
        </p>
      </div>

      <section className="mb-12">
        <h2 className="font-heading text-2xl font-semibold mb-6">
          Domestic Shipping (United States)
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {shippingMethods.map((method) => (
            <Card key={method.name} className="overflow-visible">
              <CardHeader>
                <CardTitle className="text-lg">{method.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-primary mb-2">{method.price}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Clock className="h-4 w-4" />
                  {method.time}
                </div>
                <p className="text-sm text-muted-foreground">{method.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="font-heading text-2xl font-semibold mb-6">
          International Shipping
        </h2>
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-medium">Region</th>
                    <th className="text-left p-4 font-medium">Delivery Time</th>
                    <th className="text-left p-4 font-medium">Starting Price</th>
                  </tr>
                </thead>
                <tbody>
                  {internationalZones.map((zone) => (
                    <tr key={zone.zone} className="border-b border-border last:border-0">
                      <td className="p-4">{zone.zone}</td>
                      <td className="p-4 text-muted-foreground">{zone.time}</td>
                      <td className="p-4 font-medium">{zone.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        <p className="mt-4 text-sm text-muted-foreground">
          * International customers may be responsible for import duties and taxes.
          Delivery times are estimates and may vary due to customs processing.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="font-heading text-2xl font-semibold mb-6">Shipping Policies</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">Processing Time</h3>
            <p className="text-muted-foreground">
              Orders are processed within 1-2 business days. Orders placed after 2pm EST
              or on weekends/holidays will be processed the next business day.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Discrete Packaging</h3>
            <p className="text-muted-foreground">
              All orders are shipped in plain, unmarked packaging. The sender name will
              appear as a generic business name to protect your privacy.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Signature Required</h3>
            <p className="text-muted-foreground">
              For orders over $200, a signature may be required upon delivery.
              Please ensure someone is available to receive the package.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Tracking</h3>
            <p className="text-muted-foreground">
              All orders include tracking. You'll receive an email with tracking
              information once your order ships. You can also track orders through
              your account dashboard.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-lg bg-muted/50 p-8">
        <div className="flex items-start gap-4">
          <Package className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-heading text-xl font-semibold mb-2">
              Minimum Order Value: $300
            </h3>
            <p className="text-muted-foreground">
              All orders require a minimum purchase of $300. This helps us maintain 
              our premium quality standards and efficient processing.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
