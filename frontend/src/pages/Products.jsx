import React, { useState, useEffect } from "react";
import { ProductData } from "@/context/ProductContext";
import ProductCard from "@/components/ProductCard";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Filter, X } from "lucide-react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const Products = () => {
  const [show, setShow] = useState(false);
  const {
    products,
    search,
    setSearch,
    categories,
    category,
    setCategory,
    totalPages,
    price,
    setPrice,
    page,
    setPage,
    loading,
  } = ProductData();

  const clearFilter = () => {
    setPrice("");
    setCategory("");
    setSearch("");
    setPage(1);
  };

  const nextPage = () => setPage(page + 1);
  const prevPage = () => setPage(page - 1);

  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      {/* 🌌 Interactive Particle Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 120,
          interactivity: {
            events: { onHover: { enable: true, mode: "grab" }, resize: true },
            modes: { grab: { distance: 180, links: { opacity: 0.5 } } },
          },
          particles: {
            color: { value: "#93c5fd" },
            links: { color: "#60a5fa", distance: 130, enable: true, opacity: 0.3 },
            move: { enable: true, speed: 0.6, outModes: { default: "bounce" } },
            number: { value: 70, density: { enable: true, area: 800 } },
            opacity: { value: 0.4 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 4 } },
          },
        }}
        className="absolute inset-0 -z-10"
      />

      <div className="flex flex-col md:flex-row h-full relative z-10">
        {/* 🧭 Animated Glass Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-72 bg-white/10 dark:bg-gray-900/40 backdrop-blur-2xl border-r border-white/20 shadow-2xl transform transition-all duration-700 ease-in-out md:relative md:translate-x-0 ${
            show ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
          }`}
        >
          <div className="p-6 relative">
            <button
              onClick={() => setShow(false)}
              className="absolute top-5 right-5 bg-white/20 text-white rounded-full p-2 md:hidden hover:scale-110 transition-transform"
            >
              <X />
            </button>

            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
              Filters
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">
                  Search Title
                </label>
                <Input
                  type="text"
                  placeholder="Search products..."
                  className="w-full bg-white/10 text-white border border-white/20 rounded-full focus:ring-2 focus:ring-cyan-400"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">
                  Category
                </label>
                <select
                  className="w-full bg-white/10 text-white border border-white/20 p-2 rounded-md focus:ring-2 focus:ring-violet-400"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">All</option>
                  {categories.map((e) => (
                    <option key={e} value={e}>
                      {e}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-300">
                  Price
                </label>
                <select
                  className="w-full bg-white/10 text-white border border-white/20 p-2 rounded-md focus:ring-2 focus:ring-cyan-400"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="lowToHigh">Low to High</option>
                  <option value="highToLow">High to Low</option>
                </select>
              </div>

              <Button
                className="mt-3 w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 text-white font-semibold hover:scale-105 transition-transform shadow-lg shadow-cyan-500/20"
                onClick={clearFilter}
              >
                Clear Filter
              </Button>
            </div>
          </div>
        </div>

        {/* 💫 Products Grid */}
        <div className="flex-1 p-6">
          <button
            onClick={() => setShow(true)}
            className="md:hidden bg-gradient-to-r from-blue-500 to-violet-600 text-white px-4 py-2 rounded-md mb-4 hover:opacity-90 transition-all"
          >
            <Filter className="inline-block mr-2" />
            Filters
          </button>

          {loading ? (
            <Loading />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-fadeIn">
              {products && products.length > 0 ? (
                products.map((e, i) => (
                  <div
                    key={e._id}
                    style={{ animationDelay: `${i * 0.1}s` }}
                    className="animate-slideUp"
                  >
                    <ProductCard product={e} latest={"no"} />
                  </div>
                ))
              ) : (
                <p className="text-center col-span-full text-gray-400 text-lg">
                  No Products Found 😢
                </p>
              )}
            </div>
          )}

          {/* 🔄 Pagination */}
          <div className="mt-10 flex justify-center">
            <Pagination>
              <PaginationContent>
                {page !== 1 && (
                  <PaginationItem
                    className="cursor-pointer hover:scale-105 transition-transform"
                    onClick={prevPage}
                  >
                    <PaginationPrevious />
                  </PaginationItem>
                )}
                {page !== totalPages && (
                  <PaginationItem
                    className="cursor-pointer hover:scale-105 transition-transform"
                    onClick={nextPage}
                  >
                    <PaginationNext />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
