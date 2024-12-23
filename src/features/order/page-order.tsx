"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { orderSchema } from "./schemas";
import { getDataProducts, Product } from "../product/services";
import { ProductCard } from "./components/product-card";
import { CartSidebar } from "./components/cart-sidebar";
import { Pagination } from "@/components/organisms/Pagination";
import { useToast } from "@/hooks/use-toast";
import { addDataOrder, ProductItem } from "./services";
import { useRouter } from "next/navigation";

interface CartItem extends Product {
  quantity: number;
}

export default function PageOrder() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loadingSubmitOrder, setLoadingSubmitOrder] = useState<boolean>(false);
  const [loadingProducts, setLoadingProducts] = useState<boolean>(false);

  const productsPerPage = 6;
  const totalProducts = products.length;

  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const currentProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const router = useRouter();
  const { toast } = useToast();

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === product._id);
      if (existingItem) {
        return prevItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item._id !== productId)
    );
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === productId
          ? { ...item, quantity: Math.max(1, newQuantity) }
          : item
      )
    );
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSubmitOrder = async () => {
    setLoadingSubmitOrder(true);
    try {
      const productItems: ProductItem[] = cartItems.map((item) => ({
        product_id: item._id,
        qty: item.quantity,
      }));

      orderSchema.parse({ productItems });

      const data = await addDataOrder({ productItems });
      if (data.success) {
        toast({
          title: "Order berhasil",
          description: "Produk berhasil dibayar",
        });
        setCartItems([]);
        router.push("/settings/transactions");
      } else {
        toast({
          title: "Gagal order",
          description: `Error: ${data.message}`,
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validasi gagal",
          description: error.errors.map((e) => e.message).join(", "),
        });
      } else {
        toast({
          title: "Terjadi kesalahan",
          description: `Error: ${
            error instanceof Error ? error.message : "Unknown error"
          }`,
        });
      }
    } finally {
      setLoadingSubmitOrder(false);
    }
  };

  useEffect(() => {
    setLoadingProducts(true);
    getDataProducts().then(({ data }) => setProducts(data));
    setLoadingProducts(false);
  }, []);

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <div className="flex-1 overflow-y-visible transition-all duration-300 lg:pr-80 ">
        <h2 className="text-2xl font-bold mb-3">Produk</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
        <Pagination
          loading={loadingProducts}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      <CartSidebar
        items={cartItems}
        loading={loadingSubmitOrder}
        onSubmit={handleSubmitOrder}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />
    </div>
  );
}
