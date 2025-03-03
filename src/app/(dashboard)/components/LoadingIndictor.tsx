"use client";
import React from "react";

export default function Loading({ text = "Loading..." }) {
  return (
    <div className="flex items-center justify-center py-6">
      <div className="animate-spin h-6 w-6 border-4 border-gray-300 border-t-blue-500 rounded-full mr-3"></div>
      <span className="text-lg font-medium">{text}</span>
    </div>
  );
}
