import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const reviews = [
  {
    name: "Michael R.",
    rating: 5,
    date: "2 weeks ago",
    text: "Outstanding quality and fast shipping. The results speak for themselves. Been using Forge products for 3 months and the gains are incredible. Highly recommend to anyone serious about their performance.",
    verified: true,
    product: "ForgeTest E",
  },
  {
    name: "David T.",
    rating: 5,
    date: "1 month ago",
    text: "Been using their products for 6 months now. Consistent quality every time. Customer service is top-notch too - they answered all my questions before I placed my first order.",
    verified: true,
    product: "ForgeTren A",
  },
  {
    name: "James K.",
    rating: 5,
    date: "3 weeks ago",
    text: "Customer service is exceptional. They helped me choose the right products for my goals and followed up to make sure everything arrived safely. Will definitely be ordering again.",
    verified: true,
    product: "FormulaAnavar",
  },
  {
    name: "Robert M.",
    rating: 4,
    date: "1 month ago",
    text: "Great products overall. Shipping was a bit slower than expected but the quality made up for it. The PCT stack worked exactly as described.",
    verified: true,
    product: "FormulaRecover",
  },
  {
    name: "Chris P.",
    rating: 5,
    date: "2 months ago",
    text: "This is my go-to source now. Lab-tested products, discrete packaging, and competitive prices. What more could you ask for?",
    verified: true,
    product: "ForgeGrowth",
  },
  {
    name: "Steven L.",
    rating: 5,
    date: "3 weeks ago",
    text: "The quality difference is noticeable. I've tried other sources before and Forge/Formula products are on another level. You get what you pay for.",
    verified: true,
    product: "ForgeTest E",
  },
  {
    name: "Mark H.",
    rating: 5,
    date: "1 week ago",
    text: "Fast shipping, excellent communication, and premium products. The whole experience from order to delivery was seamless. Already planning my next order.",
    verified: true,
    product: "FormulaDbol",
  },
  {
    name: "Andrew W.",
    rating: 4,
    date: "2 months ago",
    text: "Solid products and good service. Would give 5 stars but the website could use some improvements. Product quality is definitely there though.",
    verified: true,
    product: "FormulaAnavar",
  },
];

const stats = [
  { label: "Happy Customers", value: "10,000+" },
  { label: "Average Rating", value: "4.9/5" },
  { label: "Reviews", value: "2,500+" },
  { label: "Repeat Customers", value: "85%" },
];

export default function ReviewsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Customer Reviews
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          See what our customers have to say about their experience with Forge & Formula
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
        {stats.map((stat) => (
          <Card key={stat.label} className="text-center overflow-visible">
            <CardContent className="p-6">
              <p className="font-heading text-3xl font-bold text-primary">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {reviews.map((review, index) => (
          <Card key={index} className="overflow-visible">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted flex-shrink-0">
                  <span className="font-medium">{review.name.charAt(0)}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{review.name}</span>
                      {review.verified && (
                        <Badge variant="secondary" size="sm">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">{review.date}</span>
                  </div>
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">
                    "{review.text}"
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Product: {review.product}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 rounded-lg bg-gradient-to-r from-forge to-formula p-8 text-center text-white">
        <Quote className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <blockquote className="text-xl font-medium max-w-3xl mx-auto">
          "Our customers' success is our greatest achievement. Every review motivates
          us to maintain the highest standards of quality and service."
        </blockquote>
        <p className="mt-4 text-white/80">— The Forge & Formula Team</p>
      </div>
    </div>
  );
}
