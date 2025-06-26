"use client";

import { useState } from "react";
import {
  CarIcon,
  Check,
  ChevronRight,
  ImageIcon,
  SendIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(9, { message: "Please enter a valid phone number" }),
  vehicleType: z.string().min(1, { message: "Please select a vehicle type" }),
  make: z.string().min(1, { message: "Please select a make" }),
  model: z.string().min(1, { message: "Please enter a model" }),
  year: z.string().min(4, { message: "Please enter a valid year" }),
  price: z.string().min(1, { message: "Please enter an asking price" }),
  description: z
    .string()
    .min(20, { message: "Description must be at least 20 characters" })
});

export default function SellPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      vehicleType: "",
      make: "",
      model: "",
      year: "",
      price: "",
      description: ""
    }
  });

  // Form submission handler
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log(values);
      toast.success("Your listing request has been submitted successfully!");
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
              Sell Your Vehicle on Rathagala.lk
            </h1>
            <p className="text-xl text-teal-100 mb-8">
              Reach thousands of potential buyers with our easy listing process
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
              <Button
                onClick={() => router.push('/sell/new')}
                size="lg"
                className="relative w-full sm:w-auto bg-yellow-400 hover:bg-yellow-300 text-teal-900 font-bold text-lg px-8 py-6 shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 border-b-4 border-yellow-500 hover:border-yellow-400 rounded-xl animate-pulse"
              >
                <div className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full rotate-6 animate-bounce shadow-md">
                  FREE
                </div>
                <span className="flex items-center justify-center">
                  Post Free Ad
                  <CarIcon className="ml-2 h-5 w-5" />
                </span>
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-white border-white hover:bg-teal-800/20 bg-transparent transition-all duration-200"
              >
                Learn More
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Why Sell with Rathagala.lk?
            </h2>
            <p className="text-lg text-slate-600">
              The fastest and most reliable way to sell your vehicle in Sri
              Lanka
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <Card className="p-6 border-slate-100 hover:shadow-md transition-shadow">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                <ImageIcon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                Free Photo Uploads
              </h3>
              <p className="text-slate-600">
                Upload up to 10 high-quality photos of your vehicle to showcase
                its best features
              </p>
            </Card>

            {/* Benefit 2 */}
            <Card className="p-6 border-slate-100 hover:shadow-md transition-shadow">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                <Check className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                Verified Buyers
              </h3>
              <p className="text-slate-600">
                Connect with serious, verified buyers looking for quality
                vehicles like yours
              </p>
            </Card>

            {/* Benefit 3 */}
            <Card className="p-6 border-slate-100 hover:shadow-md transition-shadow">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                <CarIcon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                Maximum Exposure
              </h3>
              <p className="text-slate-600">
                Your ad will be seen by thousands of daily visitors across Sri
                Lanka
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-600">
              Three simple steps to sell your vehicle fast
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center max-w-4xl mx-auto">
            {/* Step 1 */}
            <div className="text-center mb-8 md:mb-0">
              <div className="bg-teal-700 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                Create Your Ad
              </h3>
              <p className="text-slate-600 max-w-[250px] mx-auto">
                Fill out the form with your vehicle details and photos
              </p>
            </div>

            <div className="hidden md:block text-teal-300">
              <ChevronRight className="h-8 w-8" />
            </div>

            {/* Step 2 */}
            <div className="text-center mb-8 md:mb-0">
              <div className="bg-teal-700 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                Receive Inquiries
              </h3>
              <p className="text-slate-600 max-w-[250px] mx-auto">
                Get contacted by interested buyers through email or phone
              </p>
            </div>

            <div className="hidden md:block text-teal-300">
              <ChevronRight className="h-8 w-8" />
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="bg-teal-700 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                Complete the Sale
              </h3>
              <p className="text-slate-600 max-w-[250px] mx-auto">
                Meet with the buyer and complete your transaction
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="flex justify-center w-full my-8">
        <Button
          onClick={() => router.push('/sell/new')}
          size="lg"
          className="relative w-full sm:w-auto bg-yellow-400 hover:bg-yellow-300 text-teal-900 font-bold text-lg px-8 py-6 shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 border-b-4 border-yellow-500 hover:border-yellow-400 rounded-xl animate-pulse"
        >
          <div className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full rotate-6 animate-bounce shadow-md">
            FREE
          </div>
          <span className="flex items-center justify-center">
            Post Free Ad
            <CarIcon className="ml-2 h-5 w-5" />
          </span>
        </Button>
      </div>

      {/* Listing Form Section */}
      {/* <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-6 md:p-8 border-slate-100 shadow-lg">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
                  Submit Your Vehicle Details
                </h2>
                <p className="text-slate-600">
                  Fill out the form below and our team will create your listing
                </p>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Contact Information */}
                    {/* <div className="space-y-4 md:col-span-2">
                      <h3 className="text-lg font-semibold text-slate-800 border-b pb-2">
                        Contact Information
                      </h3>

                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="077 123 4567" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div> */}

                    {/* Vehicle Information */}
                    {/* <div className="space-y-4 md:col-span-2">
                      <h3 className="text-lg font-semibold text-slate-800 border-b pb-2">
                        Vehicle Information
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="vehicleType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Vehicle Type</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="CAR">Car</SelectItem>
                                  <SelectItem value="SUV_JEEP">
                                    SUV / Jeep
                                  </SelectItem>
                                  <SelectItem value="VAN">Van</SelectItem>
                                  <SelectItem value="MOTORCYCLE">
                                    Motorcycle
                                  </SelectItem>
                                  <SelectItem value="LORRY">Lorry</SelectItem>
                                  <SelectItem value="THREE_WHEEL">
                                    Three Wheel
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="make"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Make</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select make" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="toyota">Toyota</SelectItem>
                                  <SelectItem value="honda">Honda</SelectItem>
                                  <SelectItem value="nissan">Nissan</SelectItem>
                                  <SelectItem value="suzuki">Suzuki</SelectItem>
                                  <SelectItem value="bmw">BMW</SelectItem>
                                  <SelectItem value="mercedes">
                                    Mercedes
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="model"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Model</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. Prius" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="year"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Year</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. 2018" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Asking Price (Rs.)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. 5500000" {...field} />
                            </FormControl>
                            <FormDescription>
                              Enter the price in Sri Lankan Rupees without
                              commas
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Vehicle Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Provide details about the condition, features, modifications, etc."
                                className="h-32"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Detailed descriptions attract more serious buyers
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div> */}

                    {/* Photo Upload (Dummy) */}
                    {/* <div className="md:col-span-2">
                      <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 text-center">
                        <ImageIcon className="h-10 w-10 mx-auto mb-4 text-slate-400" />
                        <p className="text-slate-600 mb-2">
                          Upload photos of your vehicle (minimum 3 required)
                        </p>
                        <Button
                          type="button"
                          variant="outline"
                          className="mt-2"
                        >
                          Select Photos
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6 mt-6 flex justify-end">
                    <Button
                      type="submit"
                      size="lg"
                      className="bg-teal-700 hover:bg-teal-600 text-white px-8"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>Processing...</>
                      ) : (
                        <>
                          <SendIcon className="mr-2 h-4 w-4" />
                          Submit Listing
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </Card>
          </div>
        </div>
      </section> */}

      {/* Testimonials Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Success Stories
            </h2>
            <p className="text-lg text-slate-600">
              Join thousands of satisfied sellers who found buyers on
              Rathagala.lk
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Kumara Perera",
                vehicle: "Toyota Aqua",
                quote:
                  "I listed my car in the morning and had 5 serious inquiries by evening. Sold within 3 days at my asking price!"
              },
              {
                name: "Dilshan Fernando",
                vehicle: "Honda Vezel",
                quote:
                  "The detailed listing form helped me showcase all the features of my SUV. Found a buyer who appreciated the vehicle's condition."
              },
              {
                name: "Samanthi Jayawardena",
                vehicle: "Suzuki Swift",
                quote:
                  "As a first-time seller, Rathagala.lk made the process simple and straightforward. Great experience and quick sale."
              }
            ].map((testimonial, index) => (
              <Card key={index} className="p-6 border-slate-100">
                <div className="flex flex-col h-full">
                  <div className="flex-1">
                    <p className="italic text-slate-600 mb-4">
                      {`"${testimonial.quote}"`}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-slate-500">
                      Sold: {testimonial.vehicle}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-slate-600">
                Everything you need to know about selling your vehicle on
                Rathagala.lk
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  q: "How much does it cost to list my vehicle?",
                  a: "Basic listings are completely free. Premium listing options with better visibility are available starting at Rs. 1,500."
                },
                {
                  q: "How long will my ad stay active?",
                  a: "Free listings remain active for 30 days. Premium listings can stay active for up to 60 days."
                },
                {
                  q: "Can I edit my listing after publishing?",
                  a: "Yes, you can edit your listing details, update photos, and adjust the price at any time while your ad is active."
                },
                {
                  q: "How do I know if my ad is performing well?",
                  a: "You'll receive statistics about views and inquiries in your seller dashboard. This helps you gauge interest in your vehicle."
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

            <div className="mt-10 text-center">
              <p className="text-slate-600 mb-4">
                Have more questions about selling your vehicle?
              </p>
              <Button className="bg-teal-700 hover:bg-teal-600 text-white">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
