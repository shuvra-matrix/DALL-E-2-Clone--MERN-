import { useState } from "react";
import styles from "./FromSection.module.css";
import ImageSection from "./ImageSection";
import { prompt } from "../../constant/constnant";

const FromSection = (props) => {
  const [userInput, setUserInput] = useState({
    name: "",
    query: "",
  });

  const [userPlaceholder, setUserPlacehosder] = useState({
    name: "",
    query: "",
  });

  const userInputHandler = (value, type) => {
    setUserInput((previousData) => {
      return {
        ...previousData,
        [type]: value,
      };
    });
  };

  const surpriseInputHandler = () => {
    const randomPrompt =
      prompt[Math.floor(Math.random() * (prompt.length - 0) + 0)];

    setUserInput((previousData) => {
      return {
        ...previousData,
        query: randomPrompt,
      };
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.userDataHandler(userInput);
    setUserPlacehosder(userInput);
    setUserInput({
      name: "",
      query: "",
    });
  };

  return (
    <div className={styles.from}>
      <form method="POST" onSubmit={submitHandler}>
        <div className={styles["input-section"]}>
          <label htmlFor="name">Your Name</label>
          <input
            id="name"
            type="text"
            placeholder={userPlaceholder.name || "Shuvra Chakrabarty"}
            onChange={(e) => {
              userInputHandler(e.target.value, "name");
            }}
            value={userInput.name}
          ></input>
        </div>
        <div className={styles["input-section"]}>
          <div className={styles["lable"]}>
            <label htmlFor="query">Prompt</label>
            <button onClick={surpriseInputHandler} type="button">
              Surprise me
            </button>
          </div>
          <input
            id="query"
            type="text"
            placeholder={userPlaceholder.query || "Enter you query"}
            onChange={(e) => {
              userInputHandler(e.target.value, "query");
            }}
            value={userInput.query}
          ></input>
        </div>
        <ImageSection isLoad={props.isLoder} imageUrl={props.imageUrl} />
        <button className={styles.generate}>Generate</button>
      </form>
    </div>
  );
};

export default FromSection;
