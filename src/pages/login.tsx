import { LoadingButton } from "@mui/lab"
import { Box, Button, TextField } from "@mui/material"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import authApi from "../api/authApi"

 export const style = {
    c: "bg-[#fdfdff] rounded-[4px]",
  }

const Login = () => {
  const navigate = useNavigate()
  const [usernameErrText, setUsernameErrText] = useState("")
  const [passwordErrText, setPasswordErrText] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setUsernameErrText("")
    setPasswordErrText("")

    //入力欄の文字列を取得
    const data = new FormData(e.target)
    const username = data.get("username")?.toString().replace(/\s/g, "")
    const password = data.get("password")?.toString().replace(/\s/g, "")
    // console.log(username)
    // console.log(password)
    let error = false

    if (username === "") {
      error = true
      setUsernameErrText("名前を入力してください")
    }
    if (password === "") {
      error = true
      setPasswordErrText("パスワードを入力してください")
    }

    if (error) return

      //ローディング開始
      setLoading(true)

    //ログイン用APIを叩く
    try {
      const res = await authApi.login({
        username,
        password,
      })
      setLoading(false)
      localStorage.setItem("token", res.token)
      // console.log("ログインに成功しました")
      navigate("/")
    } catch (err:any) {
      const errors = err.data.errors.msg
      // console.log(errors)
      errors.forEach((err:any) => {
        if (err.param === "username") {
          setUsernameErrText(err.msg)
        }
        if (err.param === "password") {
          setPasswordErrText(err.msg)
        }
      })
      setLoading(false)
    }
  }
  return (
    <>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          id="username"
          label="お名前"
          margin="normal"
          name="username"
          required
          className={style.c}
          helperText={usernameErrText}
          error={usernameErrText !== ""}
          disabled={loading}
        />
        <TextField
          fullWidth
          id="password"
          label="パスワード"
          margin="normal"
          name="password"
          required
          type="password"
          className={style.c}
          helperText={passwordErrText}
          error={passwordErrText !== ""}
          disabled={loading}
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          fullWidth
          type="submit"
          loading={loading}
          color="primary"
          variant="outlined"
        >
          ログイン
        </LoadingButton>
      </Box>
      <Button component={Link} to="/register">
        アカウントを持っていませんか? 新規登録
      </Button>
    </>
  )
}

export default Login
