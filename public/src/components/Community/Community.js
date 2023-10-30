import styles from "./Community.module.css";
import { useState, useEffect } from "react";

const Community = () => {
  const [imageData, setImageData] = useState([]);
  console.log("hi");

  useEffect(() => {
    console.log("api");
    const imageData = async () => {
      const url = "http://localhost:3030/api/v1/get/community";
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      await new Promise((resolve) => setTimeout(resolve, 2000));

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setImageData(result);
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    };

    imageData();
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
          <div key={data["_id"]} className={styles["main-images-div"]}>
            <div className={styles["images-div"]}>
              <img
                src={data["communityData"]["imageUrl"]}
                alt="imagedata"
              ></img>
            </div>
            <div className={styles["text-div"]}>
              <div className={styles["name-div"]}>
                <p>{data["communityData"]["name"].slice(0, 1)}</p>
              </div>
              <p className={styles["prompt"]}>
                {data["communityData"]["query"].slice(0, 30) + "....."}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
