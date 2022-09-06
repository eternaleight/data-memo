import axiosClient from "./axiosclient";

const memoApi = {
  create: () => axiosClient.post("memo")
}
export default memoApi
