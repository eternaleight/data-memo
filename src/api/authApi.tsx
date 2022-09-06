import axiosClient from "./axiosclient"

type AuthApi = any

const authApi:AuthApi = {
  register: (params:any) => axiosClient.post("/auth/register", params),
    login: (params:any) => axiosClient.post("auth/login",params),
    verifyToken: () => axiosClient.post("auth/verify-token")
}

export default authApi
