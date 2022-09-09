import { Box } from "@mui/material"
import { IconButton } from "@mui/material"
import { DensityMedium } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import notionLogo from "../../assets/images/notion-logo.png"
import authUtils from "../../utils/authUtils"
import SideBar from "../common/sideBar"
import { useDispatch } from "react-redux"
import { setUser } from "../../redux/features/userSlice"
import { useSelector } from "react-redux"
import { setBar } from "../../redux/features/barSlice"

const AppLayout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const [barVisible, setBarVisible] = useState<boolean>(false)
  // const barVisibled = () => setBarVisible(!barVisible)
  const barBool = useSelector((state: any) => state.bar.value)
  const barVisible = () => dispatch(setBar(!barBool))

  useEffect(() => {
    setBar(!barBool)
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
        <div className="absolute top-2 right-2" onClick={barVisible}>
          <IconButton>
            <DensityMedium />
          </IconButton>
        </div>
        {barBool ? <SideBar /> : undefined}
        <Box sx={{ flexGrow: 1, p: 1, width: "max-content" }}>
          <Outlet />
        </Box>
      </Box>
    </div>
  )
}

export default AppLayout
