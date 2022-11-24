import React from "react";
import styles from "./Home.module.css";

export const Home = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.landingBg}>
        <div className={styles.introduction}>
          <div className={styles.introTitle}>J2J</div>
          <div className={styles.introBody}>JSON code transformer in Python</div>
        </div>
      </div>
      <div className={styles.aboutBg}>
        <div className={styles.about}>
        </div>
      </div>
    </div>
  );
};
