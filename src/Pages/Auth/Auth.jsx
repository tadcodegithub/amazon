import React, { useState, useContext } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import style from "./SignUp.module.css"
import { auth } from "../../Utility/firebase"
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth"
import { DataContext } from "../../Components/DataProvider/DataProvide"
import { ClipLoader } from "react-spinners"

function Auth() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  //
  const [loading, setLoading] = useState({ signIn: false, signUp: false })
  console.log(email, password);

  const [{ user }, dispatch] = useContext(DataContext)
  // console.log(user)
  const navigate = useNavigate()

  const navestateData = useLocation()
  // console.log(navestateData)
  const authHandler = (e) => {
    e.preventDefault()
    // console.log(e.target.name)
    if (e.target.name === "signin") {
      setLoading({ ...loading, signIn: true })
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential)
          dispatch({
            type: "SET_USER",
            user: userCredential.user,
          })
          setLoading({ ...loading, signIn: false })
          navigate(navestateData?.state?.redirect || "/")
        })
        .catch((err) => {
          // console.log(err.message)
          setError(err.message)
          setLoading({ ...loading, signIn: false })
        })
    } else {
      setLoading({ ...loading, signUp: true })
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // console.log(userCredential)
          dispatch({
            type: "SET_USER",
            user: userCredential.user,
          })
          setLoading({ ...loading, signUp: false })
          navigate("/")
        })
        .catch((err) => {
          setError(err.message)
          setLoading({ ...loading, signUp: false })
        })
    }
  }
  return (
    <section className={style.login}>
      <Link to="/" className={style.link}>
        {" "}
        <img src="/amazon_logo_black.png" alt="" />
      </Link>

      <div className={style.loginContainer}>
        <h1>Sign In</h1>
        {navestateData?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navestateData.state.msg}
          </small>
        )}
        <form action="">
          <div className="">
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>
          <div className="">
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          <button
            type="submit"
            onClick={authHandler}
            name="signin"
            className={style.login_signInBtn}
          >
            {loading.signIn && <ClipLoader color="white" size={20} />}
            Sign In
          </button>
        </form>
        {/* aggrement */}
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        {/* creat account btn */}
        <button
          type="submit"
          onClick={authHandler}
          name="signup"
          className={style.login_registerBtn}
        >
          {loading.signUp ? (
            <ClipLoader color="white" size={20} />
          ) : (
            "Create your Amazon Account"
          )}
        </button>
        {error && <small>{error}</small>}
      </div>
    </section>
  )
}

export default Auth
