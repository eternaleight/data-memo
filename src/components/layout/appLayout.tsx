import { Box } from "@mui/material"
import { Container } from "@mui/system"
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import notionLogo from "../../assets/images/notion-logo.png"
import authUtils from "../../utils/authUtils"
import SideBar from "../common/sideBar"
import { useDispatch } from "react-redux"
import { setUser } from "../../redux/features/userSlice"

const AppLayout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    //JWTを持っているか確認する
    const checkAuth = async () => {
      //認証チェック
      const user = await authUtils.isAuthentiated()
      if (!user) {
        navigate("/login")
      } else {
        //ユーザーを保存する
        dispatch(setUser(user))
      }
    }
    checkAuth()
  }, [navigate])
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <SideBar />
        <Box sx={{ flexGrow: 1, p: 1, width: "max-content" }}>
          <Outlet />
        </Box>
      </Box>
    </div>
  )
}

export default AppLayout
