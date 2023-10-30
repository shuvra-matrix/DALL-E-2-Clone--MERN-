import styles from "./Community.module.css";
import { useState, useEffect } from "react";

const Community = () => {
  const [imageData, setImageData] = useState([]);
  const [enterQuery, setEnteredQuery] = useState("");
  const [imageSearchData, setImageSearchData] = useState([]);
  const [imageFound, setImageFound] = useState(true);

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

  const queryInputHandler = (e) => {
    setEnteredQuery(e.target.value);
    setImageFound(true);
  };

  useEffect(() => {
    const getQueryData = async () => {
      const url = "http://localhost:3030/api/v1/post/community";

      const options = {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: enterQuery,
        }),
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();

        if (result.length > 0) {
          setImageSearchData(result);
        } else {
          setImageFound(false);
        }
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    };

    const interval = setTimeout(() => {
      if (enterQuery.length > 0) getQueryData();
    }, 500);

    return () => {
      clearTimeout(interval);
    };
  }, [enterQuery]);

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
        <input
          onChange={queryInputHandler}
          type="text"
          placeholder="Search somthing...."
        ></input>
      </div>
      {imageFound ? (
        enterQuery.length > 0 ? (
          <div className={styles["image-section"]}>
            {imageSearchData.map((data) => (
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
        ) : (
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
        )
      ) : (
        <h2> No images found</h2>
      )}
    </div>
  );
};

export default Community;
