"use client"
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import { toObjectQuery } from "@/lib/param";
import chainService from "./chain.service";


export const useChain = () => {
  const searchString = useSearchParams();
  const query = toObjectQuery(searchString)
  const queryChain = useQuery({
    queryKey: ["get_chain", query],
    queryFn: () => chainService.GET(query),
    enabled: true
  });
  return queryChain
}
export const useChainList = () => {
  const queryChain = useQuery({
    queryKey: ["get_chain_list"],
    queryFn: () => chainService.LISTS(),
    enabled: true
  });
  return queryChain
}