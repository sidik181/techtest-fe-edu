"use client";

import { useCallback, useEffect, useState } from "react";
import { DataTable } from "@/components/organisms/tables/data-table";
import { AlertDialogDemo } from "@/components/organisms/alert/dialog-alert";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { deleteSelectedUser, getDataUsers, User } from "../services";
import { getColumns } from "./columns-user";
import { deleteUser } from "../services";
import SheetAddUser from "./add-user/sheet-add-user";
import SheetEdiitUser from "./edit-user/sheet-edit-user";

export default function DataTableUser() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isDeletingMultiple, setIsDeletingMultiple] = useState<boolean>(false);
  const [isAddingUser, setIsAddingUser] = useState<boolean>(false);
  const [loadingFetchUsers, setLoadingFetchUsers] = useState<boolean>(false);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);

  const { toast } = useToast();

  const handleDeleteUser = (user: User) => {
    setDeletingUser(user);
  };

  const handleOpenDeleteMultipleDialog = (ids: string[]) => {
    setSelectedIds(ids);
    setIsDeletingMultiple(true);
  };

  const columns = getColumns({
    setEditingUser,
    onDeleteUser: handleDeleteUser,
  });

  const handleDeleteSelectedUser = async (ids: string[]) => {
    if (ids.length === 0) return;

    setLoadingDelete(true);
    try {
      const data = await deleteSelectedUser(ids);
      if (data.success) {
        toast({
          description: `Berhasil menghapus ${ids.length} pengguna`,
        });
      } else {
        toast({
          title: "Gagal menghapus pengguna",
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
      setLoadingDelete(false);
      setIsDeletingMultiple(false);
      setSelectedIds([]);
    }
  };

  const confirmDelete = async () => {
    if (deletingUser) {
      setLoadingDelete(true);
      try {
        const data = await deleteUser(deletingUser?._id);
        if (data.success) {
          toast({
            description: `Pengguna ${deletingUser?.us_name} berhasil dihapus`,
          });
        } else {
          toast({
            title: `Pengguna ${deletingUser?.us_name} gagal dihapus`,
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
        setLoadingDelete(false);
        setDeletingUser(null);
      }
    }
  };

  const fetchDataUsers = async () => {
    setLoadingFetchUsers(true);
    try {
      const data = await getDataUsers();
      if (data.success) {
        setUsers(data.data);
      } else {
        toast({
          title: `Gagal mengambil data pengguna`,
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
      setLoadingFetchUsers(false);
    }
  };

  const fetchDataUsersCallback = useCallback(fetchDataUsers, [toast]);

  useEffect(() => {
    fetchDataUsersCallback();
  }, [fetchDataUsersCallback]);

  return (
    <div className="space-y-2">
      <Button
        onClick={() => setIsAddingUser(true)}
        className="text-base px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-800 text-white"
      >
        Tambah Pengguna
      </Button>
      <DataTable
        columns={columns}
        data={users}
        loading={loadingFetchUsers}
        onDelete={(ids) => handleOpenDeleteMultipleDialog(ids)}
        placeholder={"Cari nama user"}
        searchKey={"us_name"}
      />
      <AlertDialogDemo
        title={"Apakah anda yakin ingin menghapus beberapa pengguna?"}
        description={`Data ${selectedIds.length} pengguna akan dihapus dan tidak dapat dikembalikan.`}
        isOpen={isDeletingMultiple}
        loading={loadingDelete}
        onClose={() => setIsDeletingMultiple(false)}
        onConfirm={() => handleDeleteSelectedUser(selectedIds)}
      />
      {editingUser && (
        <SheetEdiitUser
          user={editingUser}
          onUserUpdated={fetchDataUsers}
          onClose={() => setEditingUser(null)}
        />
      )}
      <AlertDialogDemo
        title={"Apakah anda yakin ingin menghapus pengguna?"}
        description={`Data pengguna ${deletingUser?.us_name} akan dihapus dan tidak dapat dikembalikan.`}
        isOpen={!!deletingUser}
        loading={loadingDelete}
        onClose={() => setDeletingUser(null)}
        onConfirm={confirmDelete}
      />
      {isAddingUser && (
        <SheetAddUser
          onUserUpdated={fetchDataUsers}
          onClose={() => setIsAddingUser(false)}
        />
      )}
    </div>
  );
}
