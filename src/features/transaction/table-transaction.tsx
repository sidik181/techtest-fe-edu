import DataTableTransaction from "./components/data-table-transaction";

export default function TableTransaction() {
	return (
		<div className="w-full space-y-2">
			<h1 className="text-2xl font-semibold">Daftar Transaksi Pembelian</h1>
			<DataTableTransaction />
		</div>
	);
}
