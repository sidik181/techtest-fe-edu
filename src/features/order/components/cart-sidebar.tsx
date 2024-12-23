import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Product } from "@/features/product/services";
import { formatPriceToIdr } from "@/utils";
import { ShoppingCart, X } from "lucide-react";

interface CartItem extends Product {
  quantity: number;
}

interface CartSidebarProps {
  items: CartItem[];
  loading: boolean;
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onSubmit: () => void;
}

export function CartSidebar({
  items,
  loading,
  onRemoveItem,
  onUpdateQuantity,
  onSubmit,
}: CartSidebarProps) {
  const total = items.reduce(
    (sum, item) => sum + item.pd_price * item.quantity,
    0
  );

  return (
    <div className="hidden w-80 h-[calc(100vh-4rem)] bg-background border-l lg:flex flex-col fixed top-16 right-0">
      <div className="p-4 border-b sticky top-0 bg-background z-10">
        <h2 className="text-2xl font-bold flex items-center">
          <ShoppingCart className="mr-2" />
          Keranjang
        </h2>
      </div>
      <ScrollArea className="flex-grow">
        <div className="p-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center mb-4"
            >
              <div className="flex flex-col">
                <p className="font-semibold">{item.pd_name}</p>
                <div className="flex items-center">
                  <p className="text-sm text-muted-foreground">
                    {formatPriceToIdr(item.pd_price)} x{" "}
                  </p>
                  <Input
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      onUpdateQuantity(item._id, parseInt(e.target.value, 10))
                    }
                    className="w-7 p-1 focus-visible:outline-none focus-visible:ring-0 items-center h-6 ml-1 border rounded"
                  />
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemoveItem(item._id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t mt-auto sticky bottom-0 bg-background">
        <p className="text-lg font-bold mb-4">
          Total: {formatPriceToIdr(total)}
        </p>
        <Button
          className="w-full"
          onClick={onSubmit}
          disabled={loading || items.length === 0}
        >
          {loading ? "Memproses..." : "Bayar"}
        </Button>
      </div>
    </div>
  );
}
