import Button from "../UI/Button";
import styles from "./ShareSection.module.css";

const ShareSection = (props) => {
  return (
    <div className={styles.share}>
      <p>
        Once you have created the image you want, you can share it with others
        in the community
      </p>
      <Button type="submit">Share with the community</Button>
    </div>
  );
};

export default ShareSection;
