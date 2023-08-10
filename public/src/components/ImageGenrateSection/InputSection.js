import { useState, useEffect } from "react";
import FromSection from "./FromSection";
import styles from "./InputSection.module.css";
import ShareSection from "./ShareSection";

const InputSection = (props) => {
  const [isLoder, setLoder] = useState(false);

  const userDataHandler = (data) => {
    setLoder(true);
  };

  return (
    <div className={styles["main-div"]}>
      <div>
        <h2>Create</h2>
        <p>
          Create imaginative and visually stunning through DALL-E AI and share
          them with the community
        </p>
      </div>
      <FromSection isLoder={isLoder} userDataHandler={userDataHandler} />
      <ShareSection />
    </div>
  );
};

export default InputSection;
