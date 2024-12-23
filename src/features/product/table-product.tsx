// import Link from "next/link";
import DataTableProduct from "./components/data-table-product";

export default function TableProduct() {
  return (
    <div className="w-full space-y-2">
      <h1 className="text-2xl font-semibold">Daftar Produk</h1>
      <DataTableProduct />
    </div>
  );
}
