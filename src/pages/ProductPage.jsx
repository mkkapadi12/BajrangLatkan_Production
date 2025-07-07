import React, { useEffect, useState } from "react";
import { Package, Star, Filter } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { api } from "../services/api";
import useDocumentTitle from "@/hooks/useDocumentTitle";

export default function ProductsPage() {
  useDocumentTitle(
    "Bajrang Latkan - Explore Our Collection of Handcrafted Latkans"
  );
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ name: "", sortBy: "" });

  const fetchProducts = async () => {
    try {
      const data = await api.getProducts(filters);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      {/* Hero Section */}
      <section className="py-20 text-white bg-gradient-to-r from-purple-600 to-purple-800">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">
              Our <span className="text-yellow-300">Latkan</span> Collection
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-purple-100">
              Discover our extensive range of handcrafted latkans for every
              occasion and celebration
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button
              variant="outline"
              className="bg-transparent border-purple-200"
            >
              <Filter className="w-4 h-4 mr-2" />
              All Categories
            </Button>
            <Button
              variant="outline"
              className="bg-transparent border-purple-200"
            >
              Traditional
            </Button>
            <Button
              variant="outline"
              className="bg-transparent border-purple-200"
            >
              Festival
            </Button>
            <Button
              variant="outline"
              className="bg-transparent border-purple-200"
            >
              Designer
            </Button>
            <Button
              variant="outline"
              className="bg-transparent border-purple-200"
            >
              Wedding
            </Button>
            <Button
              variant="outline"
              className="bg-transparent border-purple-200"
            >
              Kids
            </Button>
            <Button
              variant="outline"
              className="bg-transparent border-purple-200"
            >
              Corporate
            </Button>
          </div>

          {/* Products Grid */}
          <div className="grid gap-8 px-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:px-20">
            {products?.map((product) => (
              <Card
                key={product?._id}
                className="pt-0 transition-shadow border-purple-100 hover:shadow-lg"
              >
                <CardHeader className="p-0">
                  <div className="flex items-center justify-center bg-gray-100 rounded-t-lg aspect-square">
                    <Package className="w-16 h-16 text-gray-400" />
                  </div>
                </CardHeader>
                <CardContent className="px-3">
                  <div className="flex items-start justify-between mb-2">
                    <Badge
                      variant="secondary"
                      className="text-purple-800 bg-purple-100"
                    >
                      {product?.category || "Category"}
                    </Badge>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1 text-sm text-gray-600">
                        {product?.rating || "4.8"}
                      </span>
                    </div>
                  </div>
                  <CardTitle className="mb-2 text-xl">
                    {product?.name}
                  </CardTitle>
                  <CardDescription className="mb-4">
                    {product?.description}
                  </CardDescription>
                  {/* <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {product.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div> */}
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-purple-600">
                      ₹{product?.price}
                    </span>
                    <Button
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Orders Section */}
      <section className="py-20 bg-purple-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
              Need Something Custom?
            </h2>
            <p className="mb-8 text-xl text-gray-600">
              We specialize in creating custom latkans tailored to your specific
              requirements and designs
            </p>
            <div className="grid gap-8 mb-12 md:grid-cols-3">
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-white bg-purple-600 rounded-full">
                  1
                </div>
                <h3 className="mb-2 text-lg font-semibold">
                  Share Your Design
                </h3>
                <p className="text-gray-600">
                  Send us your design ideas or requirements
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-white bg-purple-600 rounded-full">
                  2
                </div>
                <h3 className="mb-2 text-lg font-semibold">Get Quote</h3>
                <p className="text-gray-600">
                  Receive detailed pricing and timeline
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-white bg-purple-600 rounded-full">
                  3
                </div>
                <h3 className="mb-2 text-lg font-semibold">Receive Product</h3>
                <p className="text-gray-600">
                  Get your custom latkans delivered
                </p>
              </div>
            </div>
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              Request Custom Order
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
