"use client";
import { useMutation } from "@tanstack/react-query";
import authService from "./auth.service";
import { TRequestNonce, TVerifySignature } from "@/types/auth";
import Cookies from 'js-cookie';
export const useRequestNonce = () => {
  return useMutation({
    mutationFn: (data: TRequestNonce) => authService.REQUEST_NONCE(data),
  });
};
export const useVerifySignature = () => {
  return useMutation({
    mutationFn: (data: TVerifySignature) => authService.VERIFY_SIGNATURE(data),
    onSuccess: (data) => {
      Cookies.set('token', data.accessToken)
      Cookies.set('refreshtoken', data.refreshToken)
      localStorage.setItem('permissions', JSON.stringify(data.permissions))
      localStorage.setItem('roles', JSON.stringify(data.roles))
      localStorage.setItem('user', JSON.stringify(data.user))
    }
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: () => authService.LOGOUT(),
    onSuccess: () => {
      Cookies.remove('token')
      Cookies.remove('refreshtoken')
      localStorage.removeItem('permissions')
      localStorage.removeItem('roles')
      localStorage.removeItem('sidemenus')
      localStorage.removeItem('user')
    }
  });
}