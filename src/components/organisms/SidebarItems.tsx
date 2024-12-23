import {
  Home,
  ShoppingBag,
  CreditCard,
  Settings,
  Shirt,
  PackageSearch,
  User,
} from "lucide-react";

const sidebarItems = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: ShoppingBag, label: "Pembelian", href: "/orders" },
  {
    icon: Settings,
    label: "Pengaturan",
    children: [
      { icon: CreditCard, label: "Transaksi", href: "/settings/transactions" },
      { icon: PackageSearch, label: "Produk", href: "/settings/products" },
      { icon: Shirt, label: "Kategori", href: "/settings/categories" },
      { icon: User, label: "Pengguna", href: "/settings/users" },
    ],
  },
];

export default sidebarItems;