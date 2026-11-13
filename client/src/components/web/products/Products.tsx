import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import type { InterfaceProduct, InterfaceUser } from "../../../types/type";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../../ui/pagination";
import { Button } from "../../ui/button";

type ProductsTableInterface = {
  name: string;
  description: string;
  sku: string;
  price: number;
  is_deleted: boolean;
};

function Products() {
  const [products, setProducts] = useState<InterfaceProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState<number | null>(null);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [search, setSearch] = useState<string>('')
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const controller = new AbortController();
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:3000/api/products/get-products",
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
        setProducts(data.data?.products);
        setRowsPerPage(data?.data?.limit);
        setTotal(data?.data?.total)
        setTotalPages(data?.data?.totalPages)
        setLoading(false);
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error(error);
          setProducts([]);
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
            <TableHead>DESCRIPTION</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>PRICE</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : products?.length > 0 ? (
            products.map((product, index) => (
              <TableRow key={index}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.sku}</TableCell>
                <TableCell>{product.price}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                No product found
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
          total products : {total}
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

export default Products;
