import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { Inter } from "next/font/google"
import { useRouter } from "next/router";
import UserLayout from "@/layout/UserLayout";

const inter = Inter({ subsets: ["latin"] });
export default function Home() {
  const router = useRouter();
  return (
    <>
      <UserLayout>

        <div className={styles.container}>
          <div className={styles.mainContainer}>
            <div className={styles.mainContainer_left}>
              <p className={styles.mainP}>Connect with Friends,Colleagues and More without Exaggeration</p>
              <p className={styles.secondaryP}>A social media platform , with stories with no bluffs!</p>
              <div className={styles.joinButton} onClick={() => {
                router.push("/login")
              }}>
                <p>Join Now</p>
              </div>
            </div>
            <div className={styles.mainContainer_right}>
              <img src="images/connections.jpg" alt="connections_iamge" />
            </div>
          </div>
        </div>
      </UserLayout>
    </>
  );
}
