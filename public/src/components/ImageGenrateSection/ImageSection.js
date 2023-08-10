import styles from "./ImageSection.module.css";
import Peview from "../../assets/preview.png";

const ImageSection = (props) => {
  return (
    <div className={styles["image-section"]}>
      <img src={Peview} alt="result"></img>
    </div>
  );
};

export default ImageSection;
