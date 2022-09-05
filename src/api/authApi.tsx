import axiosClient from "./axiosclient"

type AuthApi = any

const authApi:AuthApi = {
  register: (params:any) => axiosClient.post("auth/register", params)// eslint-disable-line
}

export default authApi
