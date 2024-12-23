import {
  LayoutDashboard,
  PackageSearch,
  Settings,
  ShoppingBasket,
  User,
  Shirt,
  BaggageClaim,
} from "lucide-react";

export interface NavigationItem {
  label: string;
  href?: string;
  icon: React.ReactNode;
  children?: NavigationItem[];
}

export const navigation: NavigationItem[] = [
  {
    label: "Dashboard",
    href: "/",
    icon: <LayoutDashboard size={22} />,
  },
  {
    label: "Pembelian",
    href: "/orders",
    icon: <ShoppingBasket size={22} />,
  },
  {
    label: "Pengaturan",
    icon: <Settings size={22} />,
    children: [
      {
        label: "Transaksi",
        href: "/transactions",
        icon: <BaggageClaim size={22} />,
      },
      {
        label: "Produk",
        href: "/products",
        icon: <PackageSearch size={22} />,
      },
      {
        label: "Kategori",
        href: "/categories",
        icon: <Shirt size={22} />,
      },
      {
        label: "Pengguna",
        href: "/users",
        icon: <User size={22} />,
      },
    ],
  },
];
