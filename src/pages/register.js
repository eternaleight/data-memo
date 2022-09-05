import { LoadingButton } from "@mui/lab"
import { Box, Button, TextField } from "@mui/material"
import React from "react"
import { Link } from "react-router-dom"

const Register = () => {
  const handleSubmit = async (e) => {
    e.preventDefault()
    //入力欄の文字列を取得
    const data = new FormData(e.target)
    const username = data.get("username")?.replace(/\s/g, "")
    const password = data.get("password")?.replace(/\s/g, "")
    const confirmPassword = data.get("confirmPassword")?.replace(/\s/g, "")
    console.log(username)
    console.log(password)
    console.log(confirmPassword)
  }
  return (
    <>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          id="username"
          label="お名前"
          margin="normal"
          name="username"
          required
        />
        <TextField
          fullWidth
          id="password"
          label="パスワード"
          margin="normal"
          name="password"
          required
          type="password"
          className=""
        />
        <TextField
          fullWidth
          id="confirmPassword"
          label="確認用パスワード"
          margin="normal"
          name="confirmPassword"
          required
          type="password"
          className=""
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          fullWidth
          type="submit"
          loading={false}
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
