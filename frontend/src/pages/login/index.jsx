import UserLayout from '@/layout/UserLayout'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from "./style.module.css";
import { loginUser, registerUser } from '@/config/action/authAction';
import { emptyMessage } from '@/config/reducer/authReducer';


export default function LoginComponent() {
  const authState = useSelector((state) => state.auth)
  const router = useRouter();
  const [userLoginMethod, setUserLoginMethod] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");


  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log('Token set in local storage:', localStorage.getItem('token'));
    if (token) {
      router.push("/dashboard");
    }
  }, [authState.loggedIn, router]);

  useEffect(() => {
    dispatch(emptyMessage());
  })

  const handleRegister = () => {
    dispatch(registerUser({ username, password, email, name  }))
  }

  const handleLogin = () => {
    dispatch(loginUser({email, password}));
  }
  return (
    <div>
      <UserLayout>


        <div className={styles.container}>

          <div className={styles.cardContainer}>

            <div className={styles.cardContainer_left}>

              <p className={styles.cardContainer_left_heading}>{userLoginMethod ? "Sign-In" : "Sign-Up"}</p>

              <p style={{ color: authState.isError ? "red" : "green" }}>{ authState.message ? authState.message.message: ""}</p>

              <div className={styles.inputContainer}>
                {!userLoginMethod && <div className={styles.inputRow}>
                  <input onChange={(e) => setName(e.target.value)} className={styles.inputField} type="text" placeholder='name' required />
                  <input onChange={(e) => setUsername(e.target.value)} className={styles.inputField} type="text" placeholder='username' required />
                </div>}
                <input onChange={(e) => setEmail(e.target.value)} className={styles.inputField} type="email" placeholder='email address' required />
                <input onChange={(e) => setPassword(e.target.value)} className={styles.inputField} type="password" placeholder='password' required />

                <div onClick={() => {
                  userLoginMethod ? handleLogin() : handleRegister()
                }} className={styles.buttonOutlined}>
                  <p>{userLoginMethod ? "Login" : "Register"}</p>
                </div>
              </div>
            </div>

            <div className={styles.cardContainer_right}>
              <div>
                {userLoginMethod ? <p>Don't have an account?</p> : <p>Already have an account ?</p>}
                <div onClick={() => {
                  setUserLoginMethod(!userLoginMethod)
                }} style={{ width: "60%", textAlign: "center" }} className={styles.buttonOutlined}>
                  <p>{userLoginMethod ? "Register" : "Login"}</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </UserLayout >
    </div >
  )
}
