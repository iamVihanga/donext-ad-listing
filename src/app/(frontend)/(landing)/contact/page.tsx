"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  SendIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z
    .string()
    .min(5, { message: "Subject must be at least 5 characters" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" })
});

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  // Form submission handler
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log(values);
      toast.success("Your message has been sent successfully!");
      form.reset();
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-r from-teal-900 via-teal-800 to-teal-700 text-white overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute -right-40 -top-40 w-80 h-80 bg-teal-400 rounded-full"></div>
          <div className="absolute -left-20 bottom-10 w-60 h-60 bg-teal-300 rounded-full"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading">
              Contact Us
            </h1>
            <p className="text-xl text-teal-100 mb-6">
              {`We're here to help with any questions about buying or selling on Rathagala.lk`}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Contact Information */}
              <div className="md:col-span-1 space-y-6">
                <Card className="p-6 border-slate-100">
                  <div className="flex gap-4 items-start">
                    <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-100 text-teal-700">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-800 mb-1">
                        Email Us
                      </h3>
                      <p className="text-slate-600 text-sm mb-1">
                        For general inquiries:
                      </p>
                      <a
                        href="mailto:info@rathagala.lk"
                        className="text-teal-600 hover:text-teal-700"
                      >
                        info@rathagala.lk
                      </a>
                      <p className="text-slate-600 text-sm mt-2 mb-1">
                        For support:
                      </p>
                      <a
                        href="mailto:support@rathagala.lk"
                        className="text-teal-600 hover:text-teal-700"
                      >
                        support@rathagala.lk
                      </a>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-slate-100">
                  <div className="flex gap-4 items-start">
                    <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-100 text-teal-700">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-800 mb-1">
                        Call Us
                      </h3>
                      <p className="text-slate-600 text-sm mb-1">
                        Customer Support:
                      </p>
                      <p className="text-teal-600 mb-2">+94 11 123 4567</p>
                      <p className="text-slate-600 text-sm mb-1">Sales Team:</p>
                      <p className="text-teal-600">+94 77 123 4567</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-slate-100">
                  <div className="flex gap-4 items-start">
                    <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-100 text-teal-700">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-800 mb-1">
                        Visit Us
                      </h3>
                      <p className="text-slate-600 text-sm">
                        123 Duplication Road
                        <br />
                        Colombo 04
                        <br />
                        Sri Lanka
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-slate-100">
                  <div className="flex gap-4 items-start">
                    <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-100 text-teal-700">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-800 mb-1">
                        Business Hours
                      </h3>
                      <p className="text-slate-600 text-sm mb-1">
                        Monday - Friday:
                      </p>
                      <p className="text-slate-700">9:00 AM - 6:00 PM</p>
                      <p className="text-slate-600 text-sm mt-2 mb-1">
                        Saturday:
                      </p>
                      <p className="text-slate-700">10:00 AM - 3:00 PM</p>
                      <p className="text-slate-600 text-sm mt-2 mb-1">
                        Sunday:
                      </p>
                      <p className="text-slate-700">Closed</p>
                    </div>
                  </div>
                </Card>

                {/* Social Media Links */}
                <div className="flex justify-start gap-4 py-4">
                  <a
                    href="#"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-teal-700 hover:bg-teal-200 transition-colors"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-teal-700 hover:bg-teal-200 transition-colors"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-teal-700 hover:bg-teal-200 transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <div className="md:col-span-2">
                <Card className="p-6 md:p-8 border-slate-100 shadow-md">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">
                      Send Us a Message
                    </h2>
                    <p className="text-slate-600">
                      {`Fill out the form below and we'll get back to you as soon as possible`}
                    </p>
                  </div>

                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-5"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Your Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} />
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
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="email@example.com"
                                  {...field}
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
                            <FormControl>
                              <Input
                                placeholder="How can we help you?"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Message</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Please provide details about your inquiry..."
                                className="h-40"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="pt-2">
                        <Button
                          type="submit"
                          className="w-full md:w-auto bg-teal-700 hover:bg-teal-600 text-white"
                          disabled={isSubmitting}
                          size="lg"
                        >
                          {isSubmitting ? (
                            <>Sending Message...</>
                          ) : (
                            <>
                              <SendIcon className="mr-2 h-4 w-4" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
              Find Us
            </h2>
            <div className="bg-slate-200 h-96 rounded-lg overflow-hidden shadow-md">
              {/* Replace with actual Google Maps embed */}
              <div className="w-full h-full flex items-center justify-center bg-slate-300">
                <MapPin className="h-12 w-12 text-slate-400" />
                <span className="ml-2 text-slate-500 text-lg">
                  Map Placeholder
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-slate-600">
                Quick answers to common questions
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  q: "What are your office hours?",
                  a: "Our office is open Monday to Friday from 9:00 AM to 6:00 PM, and Saturday from 10:00 AM to 3:00 PM. We are closed on Sundays and public holidays."
                },
                {
                  q: "How quickly do you respond to inquiries?",
                  a: "We aim to respond to all email inquiries within 24 hours during business days. For urgent matters, we recommend calling our customer support number."
                },
                {
                  q: "Do you offer vehicle inspections?",
                  a: "Yes, we partner with certified mechanics who can provide pre-purchase inspections. You can request this service through our contact form or by calling our office."
                },
                {
                  q: "Can I visit your office without an appointment?",
                  a: "While walk-ins are welcome, we recommend scheduling an appointment to ensure that the appropriate team member is available to assist you with your specific needs."
                }
              ].map((faq, index) => (
                <div key={index} className="border-b border-slate-100 pb-5">
                  <h3 className="font-semibold text-lg text-slate-800 mb-2">
                    {faq.q}
                  </h3>
                  <p className="text-slate-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-teal-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-teal-100 mb-6">
              Subscribe to our newsletter for the latest vehicle listings and
              automotive news
            </p>

            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-white text-slate-800 border-0 focus-visible:ring-teal-500"
              />
              <Button className="bg-white text-teal-800 hover:bg-teal-100">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
