import { useState } from "react";
import Button from "../UI/Button";
import styles from "./ShareSection.module.css";
import { Redirect } from "react-router-dom";

const ShareSection = (props) => {
  const [isRedirect, setRedirect] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    const url = "http://localhost:3030/api/v1/dalle/community";
    const options = {
      method: "POST",

      headers: {
        "Content-Type": "application/json",

        "Dalle-Key": process.env.REACT_APP_API_KEY,
        "Dalle-Host": "Dalle.shuvra.matrix",
      },

      body: JSON.stringify(props),
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();

      console.log(result);
    } catch (error) {
      console.error(error);
    }

    console.log("hi");
  };

  console.log(props);

  return (
    <div className={styles.share}>
      <p>
        Once you have created the image you want, you can share it with others
        in the community
      </p>

      <form onSubmit={submitHandler}>
        <Button type="submit">Share with the community</Button>
      </form>
    </div>
  );
};

export default ShareSection;
