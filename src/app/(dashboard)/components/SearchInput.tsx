"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";

interface SearchInputProps {
  searchValue: string;
  handleSearch: any;
}

export default function SearchInput({
  searchValue,
  handleSearch,
}: SearchInputProps) {
  return (
    <div className=" relative w-full">
      <Search className="absolute right-2.5 top-2.5" />
      <Input
        className=" border-2 border-black py-6 w-full"
        placeholder="Search Crypto..."
        value={searchValue}
        onChange={handleSearch}
      />
    </div>
  );
}
