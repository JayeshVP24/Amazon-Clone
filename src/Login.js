import React from "react"
import { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import "./Login.css"
import PriorityHighIcon from "@material-ui/icons/PriorityHigh"
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined"
import { auth } from "./firebase"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailMsg, setEmailMsg] = useState(false)
  const [passwordMsg, setPasswordMsg] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const history = useHistory()

  const signIn = (e) => {
    let emailErr = false
    let passErr = false
    e.preventDefault()
    if (!password.length > 0) {
      setPasswordMsg(true)
      passErr = true
    } else {
      setPasswordMsg(false)
      passErr = false
    }
    if (!validEmailRegex.test(email) || !email.length > 0) {
      setEmailMsg(true)
      emailErr = true
    } else {
      setEmailMsg(false)
      emailErr = false
    }
    if (!passErr && !emailErr) {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((auth) => {
          history.push("/")
        })
        .catch((err) => setErrorMsg(err.message))
    }
  }

  const validEmailRegex = RegExp(
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
  )

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt="Amazon.com"
        />
      </Link>

      <div className="login__error" style={{ display: errorMsg ? "" : "none" }}>
        <ErrorOutlineOutlinedIcon
          style={{
            color: "red",
            marginRight: "20px",
            fontSize: "2.5rem",
          }}
        />
        <div className="login__errorMsg">
          <span>There was a Problem</span>
          <p>{errorMsg}</p>
        </div>
      </div>

      <div className="login__container">
        <h1>Login</h1>

        <form>
          <h5>E-mail</h5>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            required
          />
          <div
            className="register__Exist"
            style={{ display: emailMsg ? "" : "none" }}
          >
            <PriorityHighIcon style={{ fontSize: 15, color: "red" }} />
            <span style={{ color: "red" }} className=" register__alert">
              Enter Valid Email
            </span>
          </div>
          <h5>Password</h5>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
          <div
            className="register__limitPass"
            style={{ display: passwordMsg ? "" : "none" }}
          >
            <PriorityHighIcon
              style={{ fontSize: 15, color: passwordMsg ? "red" : "black" }}
            />
            <span
              style={{ color: passwordMsg ? "red" : "black" }}
              className="register__passwordMust register__alert"
            >
              Enter Password
            </span>
          </div>

          <button onClick={signIn} type="submit" className="login__submit">
            Continue
          </button>
        </form>

        <p>
          By signing-in you agree to the AMAZON CLONE Conditions of Use & Sale.
          Please see our Privacy Notice, our Cookies Notice and our Interest
          Based Ads Notice.
        </p>
      </div>
      <div className="login__register">
        <hr className="login__line" />
        <Link to="/register">
          <button className="login__registerButton">
            Create your Amazon Account
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Login
