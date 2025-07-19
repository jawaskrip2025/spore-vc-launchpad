"use client"
import { TFormProject } from "@/types/project";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import projectService from "./project.service";
import { useSearchParams } from "next/navigation";
import { toObjectQuery } from "@/lib/param";


export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TFormProject) => projectService.CREATE(data),
    onSuccess: () => {
      toast.success('Success', {
        description: "Success submit project, waiting for review team!"
      })
      queryClient.invalidateQueries({
        queryKey: ["get_project"]
      });
    },
    onError: () => {
      toast.error('Error', {
        description: "Fail to submit data!"
      })
    }
  });
};

export const useProject = (filters?: { status?: string }) => {
  const searchString = useSearchParams();
  const query = {
    ...toObjectQuery(searchString),
    ...(filters?.status && { status: filters.status })
  }
  return useQuery({
    queryKey: ["get_project", query],
    queryFn: () => projectService.GET(query),
    enabled: true
  });
}

export const useProjectDetail = (id?: string) => {
  return useQuery({
    queryKey: ["get_project_by_id", id],
    queryFn: () => projectService.DETAIL(id!),
    enabled: !!id,
  });
};