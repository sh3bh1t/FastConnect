import DashboardLayout from '@/layout/DashboardLayout';
import UserLayout from '@/layout/UserLayout';
import React, { useEffect } from 'react';
import styles from "./style.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { getMyConnectionsRequest, acceptConnection } from '@/config/action/authAction';
import { BASE_URL } from '@/config';
import { useRouter } from 'next/router';

export default function MyConnections() {
  const dispatch = useDispatch();
  const router = useRouter();
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMyConnectionsRequest({ token: localStorage.getItem('token') }));
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(authState.connectionRequest) && authState.connectionRequest.length !== 0) {
      console.log(authState.connectionRequest);
    }
  }, [authState.connectionRequest]);

  return (
    <UserLayout>
      <DashboardLayout>
        <div>
          {/* Connection Requests Section */}
          <div className={styles.section}>
            <h4>Connection Requests</h4>
            {Array.isArray(authState.connectionRequest) && authState.connectionRequest.length === 0 && 
              <h1>No connections requests pending.</h1>}
            {Array.isArray(authState.connectionRequest) && authState.connectionRequest.length !== 0 &&
              authState.connectionRequest.filter((connection) => connection.status_accepted === null).map((user, idx) => (
                <div onClick={() => router.push(`/view_profile/${user.userId.username}`)} className={styles.userCard} key={idx}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div className={styles.profilePicture}>
                      <img src={`${BASE_URL}/${user.userId.profilePicture}`} alt="" />
                    </div>
                    <div className={styles.userInfo}>
                      <h3>{user.userId.name}</h3>
                      <p>@{user.userId.username}</p>
                    </div>
                  </div>
                  <button onClick={(e) => {
                    e.stopPropagation();
                    dispatch(acceptConnection({
                      connectionId: user._id,
                      token: localStorage.getItem('token'),
                      action: "accept"
                    }));
                  }} className={styles.connectedButton}>
                    Accept
                  </button>
                </div>
              ))}
          </div>

          {/* My Connections Section */}
          <div className={styles.section} style={{ marginTop: '2rem' }}> {/* Add margin to separate sections */}
            <h4>My Connections</h4>
            {Array.isArray(authState.connectionRequest) && authState.connectionRequest.length !== 0 && 
              authState.connectionRequest.filter((connection) => connection.status_accepted !== null).map((user, idx) => (
                <div onClick={() => router.push(`/view_profile/${user.userId.username}`)} className={styles.userCard} key={idx}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div className={styles.profilePicture}>
                      <img src={`${BASE_URL}/${user.userId.profilePicture}`} alt="" />
                    </div>
                    <div className={styles.userInfo}>
                      <h3>{user.userId.name}</h3>
                      <p>@{user.userId.username}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </DashboardLayout>
    </UserLayout>
  );
}
