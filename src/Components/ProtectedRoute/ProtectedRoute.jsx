import React, { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { DataContext } from "../DataProvider/DataProvide"

function ProtectedRoute({ children, msg, redirect }) {
  const navigate = useNavigate()
  const [{ user }, dispatch] = useContext(DataContext)
//   console.log(msg, redirect)
  useEffect(() => {
    if (!user) {
      navigate("/auth", { state: { msg, redirect } })
    }
  }, [user])
  return children
}

export default ProtectedRoute
