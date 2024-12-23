import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "@/features/product/services";
import { formatPriceToIdr } from "@/utils";
import { Plus } from "lucide-react";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="line-clamp-1">{product.pd_name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <Image
          src={
            "https://images.unsplash.com/photo-1730829807423-83b045bd6cfd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          className="w-full object-fill rounded-md"
          alt={product.pd_name}
          width={75}
          height={75}
        />
        <p className="mt-2 text-xl font-bold">
          {formatPriceToIdr(product.pd_price)}
        </p>
        <p className="text-sm text-muted-foreground">
          Kategori: {product.pd_ct_id.ct_name}
        </p>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => onAddToCart(product)}
          className="w-full"
        >
          <Plus className="mr-2 h-4 w-4" />Tambahkan ke Keranjang
        </Button>
      </CardFooter>
    </Card>
  );
}
