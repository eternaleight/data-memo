import "./App.css"
import Login from "./pages/login"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AuthLayout from "./components/layout/authLayout"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import Register from "./pages/register"
import { blue } from "@mui/material/colors"
import { CssBaseline } from "@mui/material"
import AppLayout from "./components/layout/appLayout"
import Home from "./pages/home"
import Memo from "./pages/memo"

function App() {
  const theme = createTheme({
    palette: { primary: blue },
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="memo" element={<Home />} />
            <Route path="memo/:memoId" element={<Memo />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
