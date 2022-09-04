import React from "react"
import "./App.css"
import Login from "./pages/login"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AuthLayout from "./components/layout/authLayout"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import Register from "./pages/register"
import { blue } from "@mui/material/colors"
import { CssBaseline } from "@mui/material"

function App() {
  const theme = createTheme({
    palette: { primary: blue },
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Router>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
