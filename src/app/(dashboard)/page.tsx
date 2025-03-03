"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCryptoStore } from "@/store/useCryptoStore";
import { RefreshCcw } from "lucide-react";
import { useState } from "react";
import { useCryptoPrices } from "../react-query/useCryptoPrices";
import Loading from "./components/LoadingIndictor";
import SearchInput from "./components/SearchInput";

export default function Home() {
  const [refreshing, setRefreshing] = useState(false);

  const { data, isLoading, refetch } = useCryptoPrices();

  const { searchQuery, setSearchQuery } = useCryptoStore();

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const filteredData = Object.entries(data || {}).filter(([key]) =>
    key.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className=" bg-slate-200 h-screen px-5 py-6">
      {isLoading || refreshing ? (
        <div className="flex items-center justify-center h-full">
          <Loading />
        </div>
      ) : (
        <>
          <h2 className="font-semibold text-2xl uppercase ">
            Crypto dashboard
          </h2>
          <div className="mt-4">
            <div className="flex flex-col gap-y-4 md:flex-row items-center gap-x-2 w-full">
              <SearchInput
                searchValue={searchQuery}
                handleSearch={(e: any) => setSearchQuery(e.target.value)}
              />
              <Button
                onClick={handleRefresh}
                className="flex items-center justify-center h-[50px] w-full md:w-max font-semibold text-md uppercase cursor-pointer"
              >
                Refresh <RefreshCcw className="relative top-[1px]" />
              </Button>
            </div>

            <Table className="mt-5">
              <TableHeader>
                <TableRow className="font-bold uppercase">
                  <TableHead className="text-black">Name</TableHead>
                  <TableHead className="text-black text-center">
                    Price (USD){" "}
                  </TableHead>
                  <TableHead className="text-black text-center">
                    24h Change
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map(([name, details]: any) => {
                    return (
                      <TableRow>
                        <TableCell>{name}</TableCell>
                        <TableCell className="text-center">
                          ${details.usd.toLocaleString()}
                        </TableCell>
                        <TableCell
                          className={`${
                            details.usd_24h_change > 0
                              ? "text-green-600"
                              : "text-red-600"
                          } text-center`}
                        >
                          {details.usd_24h_change.toFixed(2)}%
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>No data</TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </div>
  );
}
