"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/organisms/tables/data-table";
import { useToast } from "@/hooks/use-toast";
// import { Button } from "@/components/ui/button";
import { getDataOrders, Order } from "../services";
import { getColumns } from "./columns-transaction";
import Link from "next/link";

export default function DataTableTransaction() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const columns = getColumns();

  useEffect(() => {
    const fetchDataOrders = async () => {
      setLoading(true);
      try {
        const data = await getDataOrders();
        if (data.success) {
          const rawData: Order[] = data.data;
          const transformedData = rawData.map((item) => ({
            ...item,
            searchKey: item.or_pd_id?.pd_name ?? "",
          }));
          setOrders(transformedData);
        } else {
          toast({
            title: `Gagal mengambil data transaksi`,
            description: `Error: ${data.message}`,
          });
        }
      } catch (error) {
        toast({
          title: "Terjadi kesalahan server",
          description: `Error: ${
            error instanceof Error ? error.message : "Unknown error"
          }`,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDataOrders();
  }, [toast]);

  return (
    <div className="space-y-2">
      <div className="my-4">
        <Link
          href="/orders"
          className="text-base px-3 py-3 rounded-lg bg-blue-600 hover:bg-blue-800 text-white"
        >
          Transaksi Baru
        </Link>
      </div>
      <DataTable
        columns={columns}
        data={orders}
        loading={loading}
        placeholder={"Cari nama produk pembelian"}
        searchKey={"searchKey"}
      />
    </div>
  );
}
