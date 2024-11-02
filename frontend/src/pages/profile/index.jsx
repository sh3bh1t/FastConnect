import DashboardLayout from '@/layout/DashboardLayout'
import UserLayout from '@/layout/UserLayout'
import React, { useEffect, useState } from 'react'
import styles from './style.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAboutUser } from '@/config/action/authAction'
import { BASE_URL, clientServer } from '@/config'
import { getAllPosts } from '@/config/action/postAction'

export default function ProfilePage() {
    const authState = useSelector((state) => state.auth);
    const postReducer = useSelector((state) => state.postReducer);
    const [userProfile, setUserProfile] = useState({});
    const [userPosts, setUserPosts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputData, setInputData] = useState({ company: '', position: '', years: '' });


    const handleWorkInputChange = (e) =>{
        const {name,value} = e.target;
        setInputData({...inputData,[name]:value});
    }

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            console.log("Dispatching getAboutUser");
            const result = await dispatch(getAboutUser({ token: localStorage.getItem('token') }));
            console.log("getAboutUser result:", result);
            await dispatch(getAllPosts());
            // console.log('Auth State after fetching:', authState);
        };
        fetchData();
    }, [dispatch])
    
    useEffect(() => {
         console.log('Auth State:', authState);
        // Check if userId exists in authState.user
        if (authState.user) {
            // Set userProfile to authState.user.userId to access nested fields
            setUserProfile(authState.user);
            // Filter posts based on the nested username
            let post = postReducer.posts.filter((post) => {
                return post.userId.username === authState.user.userId.username; // Accessing nested username
            });
            setUserPosts(post);
        }
    }, [authState.user, postReducer.posts])

    console.log('User Profile:', userProfile);
    console.log('Auth State status after useEffect :', authState);

    const updateProfileData = async () => {
        const request = await clientServer.post("/user_update", {
            token: localStorage.getItem("token"),
            name: userProfile.userId.name,
        });

        const response = await clientServer.post("/update_profile_data", {
            token: localStorage.getItem('token'),
            bio: userProfile.bio,
            currentPost: userProfile.currentPost,
            pastWork: userProfile.pastWork,
            education: userProfile.education,
        });
        // console.log(response.data);
        await dispatch(getAboutUser({ token: localStorage.getItem('token') }));
    }
    return (
        <UserLayout>
            <DashboardLayout>
                {authState.user && userProfile && userProfile.userId && userProfile.userId.profilePicture &&
                    <div className={styles.container}>
                        <div className={styles.backDropContainer}>
                            <img className={styles.backdrop} src={`${BASE_URL}/${userProfile.userId.profilePicture}`} alt="backdrop" />
                        </div>

                        <div className={styles.profileContainer_details}>
                            <div style={{ display: "flex", gap: "0.7rem" }}>
                                <div style={{ flex: "0.8" }}>
                                    <div style={{ display: "flex", width: "fit-content", alignItems: "center", gap: "1.2rem" }}>
                                        
                                        <input type="text" className={styles.nameEdit} value={userProfile.userId.name} onChange={(e) => {
                                            setUserProfile({ ...userProfile , userId : {...userProfile.userId , name: e.target.value } });
                                        }} />
                                        <p style={{ color: "grey" }}>@{userProfile.userId.username}</p>
                                    </div>
                                    <div>
                                        <p>
                                            <textarea value={userProfile.bio}
                                                onChange={(e) => {
                                                    setUserProfile({ ...userProfile, bio: e.target.value })
                                                }}
                                                rows={3} cols={40}
                                                style={{ maxWidth: "100%" }}
                                            />
                                        </p>
                                    </div>
                                </div>
                                <div style={{ flex: "0.2" }}>
                                    <h3>Recent Activity :</h3>
                                    {userPosts.map((post) => {
                                        return (
                                            <div key={post._id} className={styles.postCard}>
                                                <div className={styles.card_profileContainer}>
                                                    {post.media !== "" ? <img src={`${BASE_URL}/${post.media}`} alt="post media" /> : <div style={{ width: "3.4rem", height: "3.4rem" }}></div>}
                                                </div>
                                                <div className={styles.card_description}>
                                                    <p>{post.body || "POST TITLE"}</p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className={styles.workHistory}>
                            <h4>Work History</h4>
                            <div className={styles.workHistoryContainer}>
                                {Array.isArray(userProfile.pastWork) && userProfile.pastWork.map((work, idx) => {
                                    return (
                                        <div key={idx} className={styles.workHistoryCard}>
                                            <p style={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: "0.8rem" }}>{work.company} - {work.position}</p>
                                            <p>Work History</p>
                                        </div>
                                    )
                                })}
                                <button className={styles.addWorkButton}
                                    onClick={() => {
                                        setIsModalOpen(true);
                                    }}
                                >Add Work</button>
                            </div>
                        </div>
                        {userProfile !== authState.user.userId && // Updated to compare with nested userId
                            <div onClick={() => {
                                updateProfileData();
                            }}
                                className={styles.updateProfileBtn}>
                                Update Profile
                            </div>
                        }
                    </div >
                }


                {
                    isModalOpen &&
                    <div onClick={() => setIsModalOpen(false)}
                        className={styles.commentsContainer}>

                        <div onClick={(e) => e.stopPropagation()}
                            className={styles.allCommentsContainer}>
                            <input onChange={handleWorkInputChange} name='company'  className={styles.inputField} type="text" placeholder='Enter Company name' required />
                            <input onChange={handleWorkInputChange} name='position'  className={styles.inputField} type="text" placeholder='Enter Positon' required />
                            <input onChange={handleWorkInputChange}  name='years' className={styles.inputField} type="number" placeholder='Enter Years' required />
                            <button onClick={()=>{
                                setUserProfile({...userProfile, pastWork : [...userProfile.pastWork , inputData]})
                                setIsModalOpen(false);
                            }}
                             className={styles.updateProfileBtn}>ADD</button>
                        </div>
                    </div>
                }
            </DashboardLayout>
        </UserLayout>
    )
}
