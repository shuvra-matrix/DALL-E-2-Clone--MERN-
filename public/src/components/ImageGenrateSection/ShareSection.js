import styles from "./ShareSection.module.css";

const ShareSection = (props) => {
  return (
    <div className={styles.share}>
      <p>
        Once you have created the image you want, you can share it with others
        in the community
      </p>
      <button type="submit">Share with the community</button>
    </div>
  );
};

export default ShareSection;
