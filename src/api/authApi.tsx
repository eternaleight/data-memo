import axiosClient from "./axiosclient"

const authApi = () => {
  register: (params: any) => axiosClient.post("auth/register", params)
}

export default authApi
