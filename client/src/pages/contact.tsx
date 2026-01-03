import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, MessageCircle, Send, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "Contact via form",
    description: "We respond within 24 hours",
  },
  {
    icon: MessageCircle,
    title: "Direct Message",
    value: "Preferred method",
    description: "For product inquiries",
  },
  {
    icon: Clock,
    title: "Response Time",
    value: "24-48 hours",
    description: "Business days",
  },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const urlParams = new URLSearchParams(window.location.search);
  const productInquiry = urlParams.get("product");

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: productInquiry ? "product" : "",
      message: productInquiry ? `I have a question about: ${productInquiry}` : "",
    },
  });

  useEffect(() => {
    if (productInquiry) {
      form.setValue("subject", "product");
      form.setValue("message", `I have a question about: ${productInquiry}`);
    }
  }, [productInquiry, form]);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
    form.reset();
    window.history.replaceState({}, document.title, "/contact");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Contact Us
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Have questions? Fill out the form below and we'll get back to you promptly.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 mb-12">
        {contactInfo.map((info) => (
          <Card key={info.title} className="overflow-visible border-border">
            <CardContent className="p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 mx-auto mb-4">
                <info.icon className="h-6 w-6 text-gold" />
              </div>
              <h3 className="font-medium text-foreground">{info.title}</h3>
              <p className="mt-1 font-semibold text-gold">{info.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{info.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="border-border">
          <CardContent className="p-6 lg:p-8">
            <h2 className="font-heading text-2xl font-bold mb-6">
              Send us a message
            </h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} data-testid="input-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your@email.com"
                            {...field}
                            data-testid="input-email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-subject">
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="general">General Question</SelectItem>
                          <SelectItem value="product">Product Question</SelectItem>
                          <SelectItem value="order">Order Support</SelectItem>
                          <SelectItem value="shipping">Shipping Question</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="How can we help you?"
                          className="min-h-32 resize-none"
                          {...field}
                          data-testid="input-message"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gold text-black font-semibold"
                  disabled={isSubmitting}
                  data-testid="button-send-message"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
