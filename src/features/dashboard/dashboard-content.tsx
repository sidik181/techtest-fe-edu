"use client";

import { useEffect, useState } from "react";
import { CardContentDashboard } from "./components/card-content-dashboard";
import { TableBarChart } from "./components/table-bar-chart";
import { TableLineChart } from "./components/table-line-chart";
import { CardItems } from "./components/card-items";
import { getDataOrders, Order } from "../transaction/services";
import { getDataUsers, User } from "../user/services";
import { getDataProducts, Product } from "../product/services";
import { getMonthName } from "@/utils";
import initialDataChart from "./components/initital-data";

export const DashboardContent = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const countUsers = users.length;
  const countProducts = products.length;
  const countOrders = orders.length;

  const countRevenue = orders.reduce((acc, order) => {
    return acc + order.or_amount;
  }, 0);

  const listCardWithData = CardItems.map((card) => ({
    ...card,
    contentCard:
      card.title === "Jumlah Pendapatan"
        ? countRevenue
        : card.title === "Jumlah Transaksi"
        ? countOrders
        : card.title === "Jumlah Produk"
        ? countProducts
        : card.title === "Jumlah Pengguna"
        ? countUsers
        : 0,
  }));

  const dataChartBar = initialDataChart.map((data) => {
    const ordersByMonth = orders.filter(
      (order) => getMonthName(order.or_created_at) === data.month
    );
    const totalQuantity = ordersByMonth.reduce((acc, order) => {
      const productItem = products.find(
        (product) => product._id === order.or_pd_id._id
      );
      const quantity = productItem ? order.or_amount / productItem.pd_price : 0;
      return acc + quantity;
    }, 0);
    return {
      ...data,
      totalQuantity,
    };
  });
  
  const dataChartLine = initialDataChart.map((data) => {
    const ordersByMonth = orders.filter(
      (order) => getMonthName(order.or_created_at) === data.month
    );
    const totalAmount = ordersByMonth.reduce(
      (acc, order) => acc + order.or_amount,
      0
    );
    return {
      ...data,
      totalAmount: totalAmount,
    };
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersData = await getDataOrders();
        setOrders(ordersData.data);
        const usersData = await getDataUsers();
        setUsers(usersData.data);
        const productsData = await getDataProducts();
        setProducts(productsData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {listCardWithData.map((card, index) => (
          <CardContentDashboard
            key={index}
            data={card}
          />
        ))}
      </div>
      <div className="flex flex-col lg:flex-row gap-5 w-auto my-4">
        <TableBarChart dataChartBar={dataChartBar} />
        <TableLineChart dataChartLine={dataChartLine} />
      </div>
    </div>
  );
};
