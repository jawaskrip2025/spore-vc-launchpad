import axiosInstance from "@/lib/axios"
import { BaseService } from "@/services/base.service"
import { TPagination } from "@/types/pagination"
import { TFormProject, TProject } from "@/types/project"
import { TQueryParam } from "@/types/query"

class ProjectService extends BaseService<TProject, TFormProject> {
  protected endpoint = 'projects'
  async GET_PUBLIC(params?: TQueryParam): Promise<TPagination<TProject>> {
    const response = await axiosInstance({
      method: 'GET',
      url: this.endpoint + '/upcoming',
      params
    })
    return response.data.data
  }
}

const projectService = new ProjectService()
export default projectService
