import axiosInstance from "@/lib/axios"
import { BaseService } from "@/services/base.service"
import { TFormProfile, TProfileDetail } from "@/types/profile"

class ProfileService extends BaseService<TProfileDetail> {
  protected endpoint = 'profile'
  async ME(): Promise<TProfileDetail> {
    const response = await axiosInstance({
      method: 'GET',
      url: this.endpoint,
    })
    return response.data.data
  }
  async CHANGE_PROFILE(data: TFormProfile) {
    const response = await axiosInstance({
      method: 'POST',
      url: `${this.endpoint}`,
      data
    })
    return response.data.data
  }
}

const profileService = new ProfileService()
export default profileService
