import { Link } from "wouter";
import { HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    category: "Orders & Shipping",
    questions: [
      {
        question: "How long does shipping take?",
        answer:
          "Standard shipping typically takes 5-7 business days within the continental US. Express shipping options are available at checkout for faster delivery. International orders may take 10-21 business days depending on the destination.",
      },
      {
        question: "Do you offer free shipping?",
        answer:
          "Yes! We offer free standard shipping on all orders over $150. Orders under $150 have a flat rate shipping fee of $15.",
      },
      {
        question: "How can I track my order?",
        answer:
          "Once your order ships, you'll receive an email with a tracking number. You can also track your order by logging into your account or visiting our Track Order page.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Yes, we ship to select countries worldwide. Shipping rates and delivery times vary by destination. Please check our shipping page for a full list of countries we ship to.",
      },
    ],
  },
  {
    category: "Products",
    questions: [
      {
        question: "Are your products lab tested?",
        answer:
          "Absolutely. All of our products undergo rigorous third-party laboratory testing for purity, potency, and safety. We publish Certificates of Analysis (COAs) for all products upon request.",
      },
      {
        question: "What's the difference between Forge and Formula products?",
        answer:
          "Forge products are our performance-focused line, including injectables and compounds designed for athletes and serious fitness enthusiasts. Formula products are our lifestyle line, featuring oral supplements for general wellness, sexual health, and weight management.",
      },
      {
        question: "How should I store my products?",
        answer:
          "Most products should be stored at room temperature, away from direct sunlight and moisture. Some products may require refrigeration - please check the product label for specific storage instructions.",
      },
    ],
  },
  {
    category: "Payment & Security",
    questions: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept major credit cards (Visa, Mastercard, American Express), as well as Apple Pay. All transactions are secured with industry-standard encryption.",
      },
      {
        question: "Is my personal information secure?",
        answer:
          "Yes. We use SSL encryption to protect all data transmissions. Your personal and payment information is never stored on our servers and is processed securely through our payment partners.",
      },
      {
        question: "Do you offer discrete packaging?",
        answer:
          "Yes, all orders are shipped in plain, unmarked packaging with no indication of the contents. Your privacy is our priority.",
      },
    ],
  },
  {
    category: "Returns & Refunds",
    questions: [
      {
        question: "What is your return policy?",
        answer:
          "We offer a 30-day return policy for unopened products in their original packaging. If you're not satisfied with your purchase, please contact our support team to initiate a return.",
      },
      {
        question: "How long do refunds take to process?",
        answer:
          "Once we receive your returned items, refunds are typically processed within 5-7 business days. The time it takes for the refund to appear in your account depends on your payment method and financial institution.",
      },
      {
        question: "Can I exchange a product?",
        answer:
          "Yes, we offer exchanges for different products or sizes. Please contact our support team within 30 days of receiving your order to arrange an exchange.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 lg:px-8">
      <div className="text-center mb-12">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
          <HelpCircle className="h-8 w-8 text-primary" />
        </div>
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Find answers to common questions about our products and services
        </p>
      </div>

      <div className="space-y-8">
        {faqs.map((section) => (
          <div key={section.category}>
            <h2 className="font-heading text-xl font-semibold mb-4">
              {section.category}
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {section.questions.map((faq, index) => (
                <AccordionItem key={index} value={`${section.category}-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-lg bg-muted/50 p-8 text-center">
        <h3 className="font-heading text-xl font-semibold">Still have questions?</h3>
        <p className="mt-2 text-muted-foreground">
          Can't find the answer you're looking for? Our support team is here to help.
        </p>
        <Button className="mt-4" asChild data-testid="button-contact-us">
          <Link href="/contact">Contact Us</Link>
        </Button>
      </div>
    </div>
  );
}
