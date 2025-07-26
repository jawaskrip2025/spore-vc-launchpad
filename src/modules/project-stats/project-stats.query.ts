"use client"
import { useQuery } from "@tanstack/react-query";
import projectStatsService from "./project-stats.service";


export const useCounterProject = () => {
  return useQuery({
    queryKey: ["get_counter_project"],
    queryFn: () => projectStatsService.COUNTER_PROJECT(),
    enabled: true
  });
}