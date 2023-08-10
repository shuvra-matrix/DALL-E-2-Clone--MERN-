import FromSection from "./FromSection";
import styles from "./InputSection.module.css";
import ShareSection from "./ShareSection";

const InputSection = (props) => {
  return (
    <div className={styles["main-div"]}>
      <div>
        <h2>Create</h2>
        <p>
          Create imaginative and visually stunning through DALL-E AI and share
          them with the community
        </p>
      </div>
      <FromSection />
      <ShareSection />
    </div>
  );
};

export default InputSection;
