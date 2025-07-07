import React from "react";
import { Award, Target, Users, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useDocumentTitle from "@/hooks/useDocumentTitle";

export default function AboutPage() {
  useDocumentTitle("About Bajrang Latkan - Pioneering Latkan Manufacturing");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      {/* Hero Section */}
      <section className="py-20 text-white bg-gradient-to-r from-purple-600 to-purple-800">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">
              About <span className="text-yellow-300">Bajrang Latkan</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-purple-100">
              Pioneering the future of latkan manufacturing with innovative
              technology and traditional craftsmanship
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16 text-center">
              <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
                Our Story
              </h2>
              <p className="text-lg leading-relaxed text-gray-600">
                Founded with a vision to revolutionize the traditional latkan
                manufacturing industry, Bajrang Latkan has been at the forefront
                of combining time-honored craftsmanship with modern business
                management solutions.
              </p>
            </div>

            <div className="grid items-center gap-12 md:grid-cols-2">
              <div>
                <h3 className="mb-4 text-2xl font-bold text-gray-900">
                  Our Heritage
                </h3>
                <p className="mb-6 text-gray-600">
                  With decades of experience in latkan manufacturing, we
                  understand the intricate details of this traditional craft.
                  Our expertise spans across various types of latkans including
                  decorative pieces, festival ornaments, and custom designs.
                </p>
                <p className="text-gray-600">
                  We've built our reputation on quality craftsmanship, timely
                  delivery, and exceptional customer service, making us a
                  trusted name in the industry.
                </p>
              </div>
              <div className="p-8 rounded-lg bg-purple-50">
                <h3 className="mb-4 text-2xl font-bold text-purple-800">
                  Our Innovation
                </h3>
                <p className="mb-6 text-gray-600">
                  Recognizing the need for efficient business management in
                  traditional industries, we developed a comprehensive platform
                  that streamlines operations, manages workforce, and provides
                  valuable business insights.
                </p>
                <p className="text-gray-600">
                  Our technology-driven approach helps businesses optimize their
                  operations while preserving the artisanal quality that makes
                  latkans special.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-purple-50">
        <div className="container px-4 mx-auto sm:px-20">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Our Values
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="text-center border-purple-100">
              <CardHeader>
                <Award className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                <CardTitle className="text-xl">Quality Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We maintain the highest standards in both our products and
                  services, ensuring every latkan meets our quality benchmarks.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-purple-100">
              <CardHeader>
                <Target className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                <CardTitle className="text-xl">Customer Focus</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our customers are at the heart of everything we do. We listen,
                  understand, and deliver solutions that exceed expectations.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-purple-100">
              <CardHeader>
                <Users className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                <CardTitle className="text-xl">Team Empowerment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We believe in empowering our workers and partners with the
                  tools and knowledge they need to succeed and grow.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-purple-100">
              <CardHeader>
                <Zap className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                <CardTitle className="text-xl">Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We continuously innovate to improve our processes, products,
                  and services while respecting traditional craftsmanship.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto">
          <div className="grid max-w-6xl gap-12 mx-auto md:grid-cols-2">
            <div className="text-center md:text-left">
              <h2 className="mb-6 text-3xl font-bold text-gray-900">
                Our Mission
              </h2>
              <p className="text-lg leading-relaxed text-gray-600">
                To empower latkan manufacturers with innovative technology
                solutions that streamline operations, enhance productivity, and
                preserve the artisanal quality of traditional craftsmanship
                while driving business growth and profitability.
              </p>
            </div>
            <div className="text-center md:text-left">
              <h2 className="mb-6 text-3xl font-bold text-gray-900">
                Our Vision
              </h2>
              <p className="text-lg leading-relaxed text-gray-600">
                To become the leading platform for traditional craft businesses,
                bridging the gap between heritage craftsmanship and modern
                business management, creating sustainable growth opportunities
                for artisans and manufacturers worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-purple-50">
        <div className="container px-4 mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Why Choose Us?
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-600">
              Experience the difference of working with industry experts
            </p>
          </div>

          <div className="grid max-w-4xl gap-8 mx-auto md:grid-cols-3">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-2xl font-bold text-white bg-purple-600 rounded-full">
                15+
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                Years of Experience
              </h3>
              <p className="text-gray-600">
                Deep understanding of the latkan industry and its unique
                challenges
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-2xl font-bold text-white bg-purple-600 rounded-full">
                100+
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                Happy Clients
              </h3>
              <p className="text-gray-600">
                Trusted by businesses across the country for reliable solutions
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-2xl font-bold text-white bg-purple-600 rounded-full">
                24/7
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                Support Available
              </h3>
              <p className="text-gray-600">
                Round-the-clock assistance to keep your business running
                smoothly
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
