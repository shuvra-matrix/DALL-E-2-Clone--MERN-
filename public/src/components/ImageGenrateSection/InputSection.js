import { useState, useEffect } from "react";
import FromSection from "./FromSection";
import styles from "./InputSection.module.css";
import ShareSection from "./ShareSection";

const InputSection = (props) => {
  const [isLoder, setLoder] = useState(false);

  const userDataHandler = async (data) => {
    setLoder(true);
    const url = "http://localhost:3030/api/v1/dalle";
    const options = {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "Dalle-Key":
          "aun74834hj3jh9930224554888ls55aa4574854rr4f5ffttrtr5dfd58452342havvvww",
        "Dalle-Host": "Dalle.shuvra.matrix",
      },

      body: JSON.stringify({
        query: data.query,
        name: data.name,
      }),
    };

    try {
      const response = await fetch(url, options);
      const result = await response.text();
      console.log(result);

      setLoder(false);
    } catch (error) {
      console.error(error);
    }
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