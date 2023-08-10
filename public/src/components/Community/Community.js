import styles from "./Community.module.css";
import { useState, useEffect } from "react";

const Community = () => {
  return (
    <div className={styles["main-div"]}>
      <div className={styles["heading"]}>
        <h2>The Community Showcase</h2>
        <p>
          Browse through a collection of imaginative and visually stunning
          images
        </p>
      </div>
      <div className={styles["search-section"]}>
        <label htmlFor="">Search posts</label>
        <input type="text" placeholder="Search somthing...."></input>
      </div>
      <div className={styles["image-section"]}></div>
    </div>
  );
};

export default Community;
