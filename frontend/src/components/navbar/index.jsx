import React from 'react'
import styles from './styles.module.css'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux';
import { reset } from '@/config/reducer/authReducer';

export default function NavbarComponent() {
    const router = useRouter();
    const dispatch = useDispatch();
    const authState = useSelector((state) => state.auth);
    return (
        <div>
            <div className={styles.container}>
                <nav className={styles.navBar}>
                    <img className={styles.mainLogo} onClick={() => { router.push("/") }} src="images/mainlogo.png" alt="main_logo" />
                    <h1 style={{ cursor: "pointer" }} onClick={() => { router.push("/") }}>FastConnect</h1>
                    <div className={styles.navBarOptionsContainer}>

                        {authState.profileFetched && <div>

                            <div style={{ display: "flex", gap: "1.2rem" }}>
                                <p onClick={()=>{
                                    router.push("/profile");
                                }} 
                                 style={{ fontWeight: "bold", cursor: "pointer" }}>Profile</p>
                                <p onClick={() => {
                                    localStorage.removeItem("token")
                                    dispatch(reset());
                                    router.push("/login")
                                }}
                                    style={{ fontWeight: "bold", cursor: "pointer" }}>Logout</p>
                            </div>


                        </div>}

                        {!authState.profileFetched && <div onClick={() => {
                            router.push("/login")
                        }} className={styles.joinButton}>
                            <p>Register</p>
                        </div>}

                    </div>
                </nav>
            </div >
        </div >
    )
}
