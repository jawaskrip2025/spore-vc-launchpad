import { useQuery } from "@tanstack/react-query";
import tokenService from "./token.service";

export const useMyToken = () => {
  const queryChain = useQuery({
    queryKey: ["get_token"],
    queryFn: () => tokenService.GET(),
    enabled: true
  });
  return queryChain
}