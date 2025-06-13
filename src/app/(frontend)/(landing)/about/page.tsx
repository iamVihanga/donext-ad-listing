"use client";

import { CarIcon, Award, Sparkles, Users, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function AboutPage() {
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
              About Rathagala.lk
            </h1>
            <p className="text-xl text-teal-100 mb-6">
              {`Sri Lanka's trusted vehicle marketplace since 2019`}
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl font-bold text-slate-800 mb-4">
                  Our Story
                </h2>
                <p className="text-slate-600 mb-4">
                  Rathagala.lk was founded in 2019 with a simple mission: to
                  create a trusted, easy-to-use platform where Sri Lankan
                  vehicle buyers and sellers could connect directly without
                  complicated processes or high fees.
                </p>
                <p className="text-slate-600 mb-4">
                  {`What started as a small platform with just a few hundred
                  listings has grown into Sri Lanka's most trusted vehicle
                  marketplace, with thousands of verified sellers and a
                  reputation for quality and transparency.`}
                </p>
                <p className="text-slate-600">
                  Our team combines deep automotive expertise with cutting-edge
                  technology to deliver a seamless experience for everyone
                  involved in buying or selling vehicles.
                </p>
              </div>
              <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
                <div className="absolute inset-0 bg-slate-200 flex items-center justify-center">
                  {/* Replace with actual company image */}
                  <div className="text-center p-8">
                    <CarIcon className="h-16 w-16 mx-auto mb-4 text-teal-700" />
                    <div className="text-2xl font-bold text-teal-900">
                      Rathagala.lk
                    </div>
                    <p className="text-slate-600 mt-2">
                      Image: Company headquarters
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission & Values */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Our Mission & Values
            </h2>
            <p className="text-lg text-slate-600">
              Connecting people with vehicles they love through trust and
              transparency
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-6 border-slate-100 hover:shadow-md transition-shadow">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                Trust
              </h3>
              <p className="text-slate-600">
                We verify sellers and provide honest information about vehicles
                to build a trusted marketplace
              </p>
            </Card>

            <Card className="p-6 border-slate-100 hover:shadow-md transition-shadow">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                Innovation
              </h3>
              <p className="text-slate-600">
                We continuously improve our platform with new features to
                enhance the buying and selling experience
              </p>
            </Card>

            <Card className="p-6 border-slate-100 hover:shadow-md transition-shadow">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                Community
              </h3>
              <p className="text-slate-600">
                We foster a supportive community of vehicle enthusiasts, buyers
                and sellers across Sri Lanka
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Meet Our Leadership Team
            </h2>
            <p className="text-lg text-slate-600">
              The passionate people behind Rathagala.lk
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Asanka Perera",
                role: "Founder & CEO",
                bio: "Automotive enthusiast with 15+ years in the Sri Lankan vehicle market"
              },
              {
                name: "Malini Fernando",
                role: "Head of Operations",
                bio: "Expert in digital marketplaces with experience at leading tech companies"
              },
              {
                name: "Nuwan Jayasinghe",
                role: "Chief Technology Officer",
                bio: "Software engineer passionate about creating intuitive user experiences"
              }
            ].map((member, index) => (
              <Card key={index} className="overflow-hidden border-slate-100">
                <div className="h-48 bg-slate-200 flex items-center justify-center">
                  {/* Replace with actual team photos */}
                  <Users className="h-16 w-16 text-slate-400" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-slate-800 text-lg">
                    {member.name}
                  </h3>
                  <p className="text-teal-600 font-medium mb-2">
                    {member.role}
                  </p>
                  <p className="text-slate-600 text-sm">{member.bio}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-teal-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-4">
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-teal-100">Monthly Listings</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold mb-2">300,000+</div>
              <div className="text-teal-100">Monthly Visitors</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-teal-100">Seller Satisfaction</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold mb-2">5,000+</div>
              <div className="text-teal-100">Successful Sales Monthly</div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              Our Partners & Supporters
            </h2>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center h-24 bg-slate-50 rounded-lg"
                >
                  <Building className="h-10 w-10 text-slate-300" />
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              {`Join Sri Lanka's Vehicle Revolution`}
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              {`Whether you're buying or selling, Rathagala.lk is here to make
              your vehicle journey smoother`}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sell">
                <Button
                  className="bg-teal-700 hover:bg-teal-600 text-white"
                  size="lg"
                >
                  List Your Vehicle
                </Button>
              </Link>
              <Link href="/">
                <Button
                  variant="outline"
                  className="border-teal-700 text-teal-700 hover:bg-teal-50"
                  size="lg"
                >
                  Browse Vehicles
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
