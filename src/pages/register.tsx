import { LoadingButton } from "@mui/lab"
import { Box, Button, TextField } from "@mui/material"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import authApi from "../api/authApi"
import { style } from "./login"

const Register = () => {
  const navigate = useNavigate()
  const [usernameErrText, setUsernameErrText] = useState("")
  const [passwordErrText, setPasswordErrText] = useState("")
  const [confirmErrText, setConfirmErrText] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setUsernameErrText("")
    setPasswordErrText("")
    setConfirmErrText("")

    //入力欄の文字列を取得
    const data = new FormData(e.target)
    const username = data.get("username")?.toString().replace(/\s/g, "")
    const password = data.get("password")?.toString().replace(/\s/g, "")
    const confirmPassword = data
      .get("confirmPassword")
      ?.toString()
      .replace(/\s/g, "")
    // console.log(username)
    // console.log(password)
    // console.log(confirmPassword)
    let error = false

    if (username === "") {
      error = true
      setUsernameErrText("名前を入力してください")
    }
    if (password === "") {
      error = true
      setPasswordErrText("パスワードを入力してください")
    }
    if (confirmPassword === "") {
      error = true
      setConfirmErrText("確認用パスワードを入力してください")
    }
    if (password !== confirmPassword) {
      error = true
      setConfirmErrText("パスワードと確認用パスワードが異なります")
    }

    if (error) return

    //新規登録APIを叩く
    try {
      const res = await authApi.register({
        username,
        password,
        confirmPassword,
      })
      setLoading(false)
      localStorage.setItem("token", res.token)
      console.log("新規登録に成功しました")
      navigate("/")
    } catch (err:any) {
      const errors = err.data.errors
      console.log(err)
      errors.forEach((err:any) => {
        if (err.param === "username") {
          setUsernameErrText(err.msg)
        }
        if (err.param === "password") {
          setPasswordErrText(err.msg)
        }
        if (err.param === "confirmPassword") {
          setConfirmErrText(err.msg)
        }
      })
      setLoading(true)
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
        <TextField
          fullWidth
          id="confirmPassword"
          label="確認用パスワード"
          margin="normal"
          name="confirmPassword"
          required
          type="password"
          className={style.c}
          helperText={confirmErrText}
          error={confirmErrText !== ""}
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
          アカウント作成
        </LoadingButton>
      </Box>
      <Button component={Link} to="/login">
        すでにアカウントを持っていますか？ ログイン
      </Button>
    </>
  )
}

export default Register
