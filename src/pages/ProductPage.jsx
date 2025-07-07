import React, { useEffect, useState } from "react"
import { Package, Star, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { api } from '../services/api'
import useDocumentTitle from "@/hooks/useDocumentTitle"


export default function ProductsPage() {
  useDocumentTitle("Bajrang Latkan - Explore Our Collection of Handcrafted Latkans")
  const [products, setProducts] = useState([])
  const [filters, setFilters] = useState({ name: '', sortBy: '' })

  const fetchProducts = async () => {
    try {
      const data = await api.getProducts(filters)
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [filters])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="text-yellow-300">Latkan</span> Collection
            </h1>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Discover our extensive range of handcrafted latkans for every occasion and celebration
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-12 justify-center">
            <Button variant="outline" className="border-purple-200 bg-transparent">
              <Filter className="mr-2 h-4 w-4" />
              All Categories
            </Button>
            <Button variant="outline" className="border-purple-200 bg-transparent">
              Traditional
            </Button>
            <Button variant="outline" className="border-purple-200 bg-transparent">
              Festival
            </Button>
            <Button variant="outline" className="border-purple-200 bg-transparent">
              Designer
            </Button>
            <Button variant="outline" className="border-purple-200 bg-transparent">
              Wedding
            </Button>
            <Button variant="outline" className="border-purple-200 bg-transparent">
              Kids
            </Button>
            <Button variant="outline" className="border-purple-200 bg-transparent">
              Corporate
            </Button>
          </div>

          {/* Products Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-2 lg:px-20">
            {products?.map((product) => (
              <Card key={product?._id} className="hover:shadow-lg transition-shadow border-purple-100 pt-0">
                <CardHeader className="p-0">
                  <div className="aspect-square bg-gray-100 rounded-t-lg flex items-center justify-center">
                    <Package className="h-16 w-16 text-gray-400" />
                  </div>
                </CardHeader>
                <CardContent className="px-3">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                        {product?.category || 'Category'}
                    </Badge>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600 ml-1">{product?.rating || "4.8"}</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl mb-2">{product?.name}</CardTitle>
                  <CardDescription className="mb-4">{product?.description}</CardDescription>
                  {/* <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {product.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div> */}
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-purple-600">₹{product?.price}</span>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
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
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Need Something Custom?</h2>
            <p className="text-xl text-gray-600 mb-8">
              We specialize in creating custom latkans tailored to your specific requirements and designs
            </p>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="bg-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  1
                </div>
                <h3 className="text-lg font-semibold mb-2">Share Your Design</h3>
                <p className="text-gray-600">Send us your design ideas or requirements</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  2
                </div>
                <h3 className="text-lg font-semibold mb-2">Get Quote</h3>
                <p className="text-gray-600">Receive detailed pricing and timeline</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  3
                </div>
                <h3 className="text-lg font-semibold mb-2">Receive Product</h3>
                <p className="text-gray-600">Get your custom latkans delivered</p>
              </div>
            </div>
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              Request Custom Order
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
