"use client"
import { toObjectQuery } from "@/lib/param";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import categoryService from "./category.service";


export const useCategory = () => {
  const searchString = useSearchParams();
  const query = toObjectQuery(searchString)
  const queryChain = useQuery({
    queryKey: ["get_category", query],
    queryFn: () => categoryService.GET(query),
    enabled: true
  });
  return queryChain
}

export const useCategoryList = () => {
  return useQuery({
    queryKey: ["get_category_list"],
    queryFn: () => categoryService.LISTS(),
    enabled: true
  });
}
