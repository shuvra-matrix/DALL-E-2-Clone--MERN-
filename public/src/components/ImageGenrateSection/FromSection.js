import styles from "./FromSection.module.css";
import ImageSection from "./ImageSection";

const FromSection = (props) => {
  return (
    <div className={styles.from}>
      <form method="POST">
        <div className={styles["input-section"]}>
          <label htmlFor="name">Your Name</label>
          <input id="name" type="text" placeholder="Shuvra Chakrabarty"></input>
        </div>
        <div className={styles["input-section"]}>
          <div className={styles["lable"]}>
            <label htmlFor="">Prompt</label>
            <button type="submit">Surprise me</button>
          </div>
          <input id="query" type="text" placeholder="Enter you query"></input>
        </div>
        <ImageSection />
        <button className={styles.generate}>Generate</button>
      </form>
    </div>
  );
};

export default FromSection;
