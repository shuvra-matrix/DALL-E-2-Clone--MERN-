import { useState } from "react";
import FromSection from "./FromSection";
import styles from "./InputSection.module.css";
import ShareSection from "./ShareSection";

const InputSection = () => {
  const [queryResult, setQueryResult] = useState(null);
  const [imageUrls, setImageUrl] = useState("");
  const [isLoder, setLoder] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const userDataHandler = async (data) => {
    setLoder(true);
    setIsError(false);
    const url = "http://localhost:3030/api/v1/dalle";
    const options = {
      method: "POST",

      headers: {
        "Content-Type": "application/json",

        "Dalle-Key": process.env.REACT_APP_API_KEY,
        "Dalle-Host": "Dalle.shuvra.matrix",
      },

      body: JSON.stringify({
        query: data.query,
        name: data.name,
      }),
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setLoder(false);

      if (result.error === "error") {
        throw Error(result);
      } else {
        setIsError(false);
        setQueryResult(result);
        setImageUrl(result.imageUrl);
      }
    } catch (error) {
      setLoder(false);
      setErrorMessage("server error. Please wait a moment and try again.");
      setIsError(true);
      setQueryResult(null);
      setImageUrl("");
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
      {isError && <div className={styles["error"]}>{errorMessage}</div>}
      <FromSection
        isLoder={isLoder}
        userDataHandler={userDataHandler}
        imageUrl={imageUrls}
      />

      {queryResult && <ShareSection queryResult={queryResult} />}
    </div>
  );
};

export default InputSection;
