import axiosClient from "./axiosclient"

const memoApi = {
  create: () => axiosClient.post("memo"),
  getAll: () => axiosClient.get("memo"),
  getOne: (id: any) => axiosClient.get(`memo/${id}`),
  update: (id: any, params: any) => axiosClient.put(`memo/${id}`,params),
  delete: (id: any) => axiosClient.delete(`memo/${id}`),
}
export default memoApi
