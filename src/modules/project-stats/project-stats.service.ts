import axiosInstance from "@/lib/axios"
import { BaseService } from "@/services/base.service"
import { TFormProject, TProject, TProjectCounter } from "@/types/project"

class ProjectStatsService extends BaseService<TProject, TFormProject> {
  protected endpoint = 'usr-client'
  async COUNTER_PROJECT(): Promise<TProjectCounter[]> {
    const response = await axiosInstance({
      method: 'GET',
      url: `${this.endpoint}/count-project`,
    })
    return response.data.data
  }
}

const projectStatsService = new ProjectStatsService()
export default projectStatsService
