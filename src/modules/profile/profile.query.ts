"use client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import profileService from "./profile.service";
import { TFormProfile } from "@/types/profile";

export const useMyProfile = () => {
  return useQuery({
    queryKey: ["get_my_profile"],
    queryFn: () => profileService.ME(),
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (
      {data }: {data: TFormProfile }
    ) => profileService.CHANGE_PROFILE(data),
    onSuccess: () => {
      toast.success('Success', {
        description: "Success submit data"
      })
      queryClient.invalidateQueries({
        queryKey: ["get_my_profile"]
      });
    },
    onError: () => {
      toast.error('Error', {
        description: "Fail to submit data!"
      })
    }
  });
};