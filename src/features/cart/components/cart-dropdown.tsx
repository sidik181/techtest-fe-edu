import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export function CartDropdown() {
  const cartItems = [
    { id: 1, name: "Product 1", price: 19.99 },
    { id: 2, name: "Product 2", price: 29.99 },
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
					className="lg:hidden"
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="sr-only">Keranjang belanja</span>
					<span>({cartItems.length})</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-64"
      >
        <DropdownMenuLabel>Keranjang anda</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {cartItems.length === 0 ? (
          <DropdownMenuItem>Tidak ada belanjaan</DropdownMenuItem>
        ) : (
          <>
            {cartItems.map((item) => (
              <DropdownMenuItem key={item.id}>
                <span className="flex-1">{item.name}</span>
                <span>${item.price.toFixed(2)}</span>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <span className="flex-1 font-bold">Total</span>
              <span className="font-bold">${total.toFixed(2)}</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
