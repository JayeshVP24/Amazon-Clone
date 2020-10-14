import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import "./Register.css"
import PriorityHighIcon from "@material-ui/icons/PriorityHigh"
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined"
import { auth } from "./firebase"

function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [nameMsg, setNameMsg] = useState(false)
  const [emailMsg, setEmailMsg] = useState(false)
  const [passwordMsg, setPasswordMsg] = useState(false)
  const history = useHistory()

  // const toggleName = setNameMsg((state) => !state)
  const register = (e) => {
    e.preventDefault()
    let nameErr = false
    let emailErr = false
    let passErr = false
    if (!name) {
      setNameMsg(true)
      nameErr = true
    } else {
      setNameMsg(false)
      nameErr = false
    }

    if (password.length < 6) {
      setPasswordMsg(true)
      passErr = true
    } else {
      setPasswordMsg(false)
      passErr = false
    }
    if (!validEmailRegex.test(email) || email.length < 1) {
      setEmailMsg(true)
      emailErr = true
    } else {
      setEmailMsg(false)
      emailErr = false
    }
    if (!nameErr && !passErr && !emailErr) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((auth) => {
          if (auth) {
            auth.user
              .updateProfile({
                displayName: name.trim(),
              })
              .then(() => history.push("/"))
          }
        })
        .catch((err) => {
          setErrorMsg(err.message)
        })
    }
  }

  const validEmailRegex = RegExp(
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
  )

  return (
    <div className="register">
      <Link to="/register">
        <img
          className="register__logo"
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

      <div className="register__container">
        <h1>Create Account</h1>

        <form>
          <h5>Your Name</h5>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div
            className="register__Exist"
            style={{ display: nameMsg ? "" : "none" }}
          >
            <PriorityHighIcon style={{ fontSize: 15, color: "red" }} />
            <span style={{ color: "red" }} className="register__alert">
              Enter Name
            </span>
          </div>
          <h5>Email</h5>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            type="password"
            required
            placeholder="At least 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="register__limitPass">
            <PriorityHighIcon
              style={{ fontSize: 15, color: passwordMsg ? "red" : "black" }}
            />
            <span
              style={{ color: passwordMsg ? "red" : "black" }}
              className="register__passwordMust register__alert"
            >
              Password must be at least 6 characters.
            </span>
          </div>
          <button type="submit" className="register__submit" onClick={register}>
            Continue
          </button>
        </form>
        <hr className="register__line" />
        <p>
          Already have an account? <Link to="/Login">Sign In {">"}</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
