import styles from "./Community.module.css";
import { useState, useEffect } from "react";

const Community = () => {
  const [imageData, setImageData] = useState([]);

  const fetchData = async () => {
    const url = "http://localhost:3030/api/v1/get";
    const options = {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setImageData(result);

      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles["main-div"]}>
      <div className={styles["heading"]}>
        <h2>The Community Showcase</h2>
        <p>
          Browse through a collection of imaginative and visually stunning
          images
        </p>
      </div>
      <div className={styles["search-section"]}>
        <label htmlFor="">Search posts</label>
        <input type="text" placeholder="Search somthing...."></input>
      </div>
      <div className={styles["image-section"]}>
        {imageData.map((data) => (
          <img src={data.imageUrl} alt={data.query} key={data._id}></img>
        ))}
      </div>
    </div>
  );
};

export default Community;
