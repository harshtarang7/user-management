import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import type { InterfaceUser } from "../../../types/type";
import { Button } from "../../ui/button";

type UserTableInterface = {
  name: string;
  email: string;
  dob: string;
  active: boolean;
};

function Users() {
  const [users, setUsers] = useState<InterfaceUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState<number | null>(null);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [search, setSearch] = useState<string>('')
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  console.log(search)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const controller = new AbortController();
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:3000/api/users/get-users-list",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ page: currentPage, searchTerm: debouncedSearch }),
            signal: controller.signal,
          },
        );

        const data = await response.json();
        console.log('dataa', data.data);
        if (controller.signal.aborted) return;
        // console.log(data.users)
        setUsers(data.data?.users);
        setRowsPerPage(data?.data?.limit);
        setTotal(data?.data?.total)
        setTotalPages(data?.data?.totalPages)
        setLoading(false);
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error(error);
          setUsers([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };
    fetchPosts();

    return () => controller.abort();
  }, [currentPage, debouncedSearch]);

  return (
    <div className="border-gray-100 border-[2px] rounded-2xl p-3">
      <div className="flex justify-between items-center px-2">

        <h3 className="text-2xl font-medium p-3">USERS</h3>
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          className="p-2 bg-gray-200 rounded-2xl"
          placeholder="Search here"
        />
      </div>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead className="w-[100px]">NAME</TableHead>
            <TableHead>EMAIL</TableHead>
            <TableHead>MOBILE</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : users.length > 0 ? (
            users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.mobile}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                No users found
              </TableCell>
            </TableRow>
          )}
        </TableBody>

      </Table>

      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </p>
        <p className="text-sm text-muted-foreground">
          total users : {total}
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1 || loading}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </Button>

          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages || loading}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Users;
