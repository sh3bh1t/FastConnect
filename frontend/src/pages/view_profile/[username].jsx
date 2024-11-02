
import { BASE_URL, clientServer } from '@/config';
import DashboardLayout from '@/layout/DashboardLayout';
import UserLayout from '@/layout/UserLayout';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styles from './style.module.css';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '@/config/action/postAction';
import { getMyConnectionsRequest, sendConnectionRequest } from '@/config/action/authAction';

export default function ViewProfileInDetail({ userProfile }) {
  const searchParamers = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const postReducer = useSelector((state) => state.postReducer);

  const [userPosts, setUserPosts] = useState([]);
  const [isCurrentUserInConnection, setIsCurrentUserInConnection] = useState(false);
  const [isConnectionNull, setIsConnectionNull] = useState(true);
  const authState = useSelector((state) => state.auth);

  const getUserPost = async () => {
    await dispatch(getAllPosts());
    await dispatch(getMyConnectionsRequest({ token: localStorage.getItem('token') }));
  };

  useEffect(() => {
    console.log("Post Reducer:", postReducer);

    if (postReducer.posts) {
      let post = postReducer.posts.filter((post) => {
        return post.userId.username === userProfile.userId.username; // Accessing username correctly
      });
      setUserPosts(post);
    }
  }, [postReducer.posts]);

  useEffect(() => {
    if (authState.connections.some(user => user.connectionId._id === userProfile.userId._id)) {
      setIsCurrentUserInConnection(true);
      if (authState.connections.find(user => user.connectionId._id === userProfile.userId._id).status_accepted) {
        setIsConnectionNull(false);
      }
    }

    if (authState.connectionRequest.some(user => user.userId._id === userProfile.userId._id)) {
      setIsCurrentUserInConnection(true);
      if (authState.connectionRequest.find(user => user.userId._id === userProfile.userId._id).status_accepted) {
        setIsConnectionNull(false);
      }
    }
  }, [authState.connections]);

  return (
    <UserLayout>
      <DashboardLayout>
        <div className={styles.container}>
          <div className={styles.backDropContainer}>
            <img src={`${BASE_URL}/${userProfile.userId.profilePicture}`} alt="backdrop" />
          </div>

          <div className={styles.profileContainer_details}>
            <div className={styles.profileContainer_flex}>
              <div style={{ flex: "0.8" }}>
                <div style={{ display: "flex", width: "fit-content", alignItems: "center", gap: "1.2rem" }}>
                  <h2>{userProfile.userId.name}</h2>
                  <p style={{ color: "grey" }}>@{userProfile.userId.username}</p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
                  {isCurrentUserInConnection ? (
                    <button className={styles.connectedButton}>{isConnectionNull ? "Pending" : "Connected"}</button>
                  ) : (
                    <button onClick={() => {
                      dispatch(sendConnectionRequest({ token: localStorage.getItem("token"), user_id: userProfile.userId._id }));
                      setIsCurrentUserInConnection(true);
                    }} className={styles.connectBtn}>Connect</button>
                  )}
                  <div onClick={async () => {
                    const response = await clientServer.get(`/user/download_resume?id=${userProfile.userId._id}`);
                    window.open(`${BASE_URL}/${response.data.message}`, "_blank");
                  }} style={{ cursor: "pointer" }}>
                    <svg style={{ width: "1.2em" }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p>{userProfile.bio}</p>
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
                  );
                })}
              </div>
            </div>
          </div>

          <div className={styles.workHistory}>
            <h4>Work History</h4>
            <div className={styles.workHistoryContainer}>
              {userProfile.pastWork.map((work, idx) => {
                return (
                  <div key={idx} className={styles.workHistoryCard}>
                    <p style={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: "0.8rem" }}>{work.company} - {work.position}</p>
                    <p>Work History</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </UserLayout>
  );
}

export async function getServerSideProps(context) {
  const request = await clientServer.get("/user/get_profile_based_on_username", {
    params: {
      username: context.query.username
    }
  });
  const response = await request.data;

  return { props: { userProfile: request.data.profile } };
}
