import { LoadingButton } from "@mui/lab"
import { Box, Button, TextField } from "@mui/material"
import React from "react"
import { Link } from "react-router-dom"

const Register = () => {
  return (
    <>
      <Box component="form">
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
