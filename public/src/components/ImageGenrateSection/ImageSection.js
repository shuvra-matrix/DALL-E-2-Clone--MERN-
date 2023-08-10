import styles from "./ImageSection.module.css";
import Preview from "../../assets/preview.png";
import Loader from "../UI/Loder";

const ImageSection = (props) => {
  console.log(props.isLoad);
  return (
    <div className={styles["image-section"]}>
      {!props.isLoad && (
        <img
          src={props.imageUrl || Preview}
          className={props.imageUrl.length === 0 ? styles["img-opacity"] : ""}
          alt="result"
        ></img>
      )}
      {props.isLoad && <Loader />}
    </div>
  );
};

export default ImageSection;
