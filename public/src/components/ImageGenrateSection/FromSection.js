import { useState } from "react";
import styles from "./FromSection.module.css";
import ImageSection from "./ImageSection";
import { prompt } from "../../constant/constnant";
import { Link } from "react-router-dom";

const FromSection = (props) => {
  const [userInput, setUserInput] = useState({
    name: "",
    query: "",
  });

  const [nameIsValid, setNameIsValid] = useState(false);
  const [queryIsValid, setQueryIsValid] = useState(false);

  const userInputHandler = (value, type) => {
    setUserInput((previousData) => {
      return {
        ...previousData,
        [type]: value,
      };
    });
    setNameIsValid(false);
    setQueryIsValid(false);
  };

  const surpriseInputHandler = () => {
    if (userInput.name.trim().length === 0) {
      setNameIsValid(true);
      return;
    }

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
    if (userInput.name.trim().length === 0) {
      setNameIsValid(true);
      return;
    }

    if (userInput.query.trim().length === 0) {
      setQueryIsValid(true);
      return;
    }

    props.userDataHandler(userInput);
  };

  return (
    <div className={styles.from}>
      <form method="POST" onSubmit={submitHandler}>
        <div className={styles["input-section"]}>
          <label htmlFor="name">Your Name</label>
          <input
            id="name"
            type="text"
            placeholder={"Shuvra Chakrabarty"}
            onChange={(e) => {
              userInputHandler(e.target.value, "name");
            }}
            value={userInput.name}
            className={
              !nameIsValid ? styles["input-valid"] : styles["input-invalid"]
            }
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
            placeholder={"Enter you query"}
            onChange={(e) => {
              userInputHandler(e.target.value, "query");
            }}
            value={userInput.query}
            className={
              !queryIsValid ? styles["input-valid"] : styles["input-invalid"]
            }
          ></input>
        </div>
        <ImageSection isLoad={props.isLoder} imageUrl={props.imageUrl} />
        <button className={styles.generate}>Generate</button>
        {props.imageUrl.length > 0 && (
          <Link to={props.imageUrl} target="_blank">
            <button className={styles.generate} download type="button">
              Download
            </button>
          </Link>
        )}
      </form>
    </div>
  );
};

export default FromSection;
