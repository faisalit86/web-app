"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,cardano,solana&vs_currencies=usd&include_24hr_change=true";

export const useCryptoPrices = () => {
  return useQuery({
    queryKey: ["cryptoPrices"],
    queryFn: async () => {
      const { data } = await axios.get(API_URL);
      return data;
    },
    staleTime: 1000 * 60, // Cache for 1 minute
    refetchInterval: 10000, // Auto-refresh every 10s
  });
};
