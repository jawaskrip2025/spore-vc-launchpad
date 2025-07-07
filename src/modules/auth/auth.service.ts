import axiosInstance from "@/lib/axios"
import { TRequestNonce, TVerifySignature } from "@/types/auth"

class AuthService {
  protected endpoint = 'auth'
  async REQUEST_NONCE(data: TRequestNonce) {
    const response = await axiosInstance({
      method: 'POST',
      url: `${this.endpoint}/request-nonce`,
      data: data
    })
    return response.data
  }
  async VERIFY_SIGNATURE(data: TVerifySignature) {
    const response = await axiosInstance({
      method: 'POST',
      url: `${this.endpoint}/verify-signature`,
      data: data
    })
    return response.data.data
  }
  async LOGOUT() {
    const response = await axiosInstance({
      method: 'GET',
      url: `${this.endpoint}/logout`,
    })
    return response
  }
}

const authService = new AuthService()
export default authService