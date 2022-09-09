import {Box} from "@mui/material"
import {Container} from "@mui/system"
import {useEffect} from "react"
import { Outlet, useNavigate } from "react-router-dom"
import notionLogo from "../../assets/images/notion-logo.png"
import authUtils from "../../utils/authUtils"

const AuthLayout = () => {
  const navigate = useNavigate()
  useEffect(() => {
    //JWTを持っているか確認する
    const checkAuth = async () => {
      //認証チェック
      const isAuth = await authUtils.isAuthentiated()
      if(isAuth){
        navigate("/")
      }
    }
    checkAuth()
  },[navigate])
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Box sx={{
          margin: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
          }}>
          <img src="https://i.imgur.com/GMr4c7d.png" alt="" style={{ width: 100, height: 100, marginBottom: 8}}/>
          data Memo
        </Box>
        <Outlet />
      </Container>
    </div>
  )
}

export default AuthLayout
