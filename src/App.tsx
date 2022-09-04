import React from "react"
import "./App.css"
import Login from "./pages/login"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AuthLayout from "./components/layout/authLayout"
import Register from "./pages/register"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
