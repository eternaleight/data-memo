import axiosClient from "./axiosclient";

const memoApi = {
  create: () => axiosClient.post("memo"),
  getAll: () => axiosClient.get("memo"),
  getOne: (id:any) => axiosClient.get(`memo/${id}`)
}
export default memoApi
