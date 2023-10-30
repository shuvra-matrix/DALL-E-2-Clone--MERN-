import { useState } from "react";
import Button from "../UI/Button";
import styles from "./ShareSection.module.css";
import { Navigate } from "react-router-dom";

const ShareSection = (props) => {
  const [isRedirect, setRedirect] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault();

    const url = "https://dalle2-api.onrender.com/api/v1/dalle/community";
    const options = {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(props),
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();

      setRedirect(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.share}>
      <p>
        Once you have created the image you want, you can share it with others
        in the community
      </p>

      <form onSubmit={submitHandler}>
        <Button type="submit">Share with the community</Button>
      </form>
      {isRedirect && <Navigate to="/community" />}
    </div>
  );
};

export default ShareSection;
