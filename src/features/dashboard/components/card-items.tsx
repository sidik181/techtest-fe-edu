import { Activity, Users, PackageSearch, ShoppingBag } from "lucide-react";

export const CardItems = [
  {
    title: "Jumlah Pendapatan",
    iconCard: (
      <Activity
        size={160}
        className="text-gray-400"
      />
    ),
    linkDetail: "/settings/transactions",
  },
  {
    title: "Jumlah Transaksi",
    iconCard: (
      <ShoppingBag
        size={160}
        className="text-gray-400"
      />
    ),
    linkDetail: "/settings/transactions",
  },
  {
    title: "Jumlah Produk",
    iconCard: (
      <PackageSearch
        size={160}
        className="text-gray-400"
      />
    ),
    linkDetail: "/settings/products",
  },
  {
    title: "Jumlah Pengguna",
    iconCard: (
      <Users
        size={160}
        className="text-gray-400"
      />
    ),
    linkDetail: "/settings/users",
  },
];
