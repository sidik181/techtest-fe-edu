import DataTableUser from "./components/data-table-user";

export default function TableUser() {
  return (
    <div className="w-full space-y-2">
      <h1 className="text-2xl font-semibold">Daftar Pengguna</h1>
      <DataTableUser />
    </div>
  );
}
