import { getAllUsers } from '@/config/action/authAction'
import DashboardLayout from '@/layout/DashboardLayout'
import UserLayout from '@/layout/UserLayout'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './style.module.css';
import { BASE_URL } from '@/config'
import { useRouter } from 'next/router'

export default function DiscoverPage() {

    const authState = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        if (!authState.all_profiles_fetched) {
            dispatch(getAllUsers());
        }
    })

    return (
        <UserLayout>
            <DashboardLayout>
                <div>
                    <h1>Discover</h1>

                    <div className={styles.allUserProile}>
                        {authState.all_profiles_fetched && Array.isArray(authState.all_users) && authState.all_users.map((user) => {
                            return (
                                <div onClick={()=>{
                                    router.push(`/view_profile/${user.userId.username}`)
                                }} key={user.userId._id} className={styles.userCard}>
                                    <img src={`${BASE_URL}/${user.userId.profilePicture}`} alt="" />
                                    <div>
                                        <h1>{user.userId.name}</h1>
                                        <h1>@{user.userId.username}</h1>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </DashboardLayout>
        </UserLayout>
    )
}
