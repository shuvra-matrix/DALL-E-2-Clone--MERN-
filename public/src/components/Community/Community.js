import styles from "./Community.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loder2 from "../UI/Loder2";

const Community = () => {
  const [imageData, setImageData] = useState([]);
  const [enterQuery, setEnteredQuery] = useState("");
  const [imageSearchData, setImageSearchData] = useState([]);
  const [imageFound, setImageFound] = useState(true);
  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    setIsLoader(true);
    console.log("api");
    const imageData = async () => {
      const url = "http://localhost:3030/api/v1/get/community";
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      await new Promise((resolve) => setTimeout(resolve, 1000));

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setIsLoader(false);
        setImageData(result);
      } catch (error) {
        setIsLoader(false);
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
      const url = "https://dalle2-api.onrender.com/api/v1/post/community";

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
        setIsLoader(false);
        const response = await fetch(url, options);
        const result = await response.json();

        if (result.length > 0) {
          setImageSearchData(result);
        } else {
          setImageFound(false);
        }
      } catch (error) {
        setIsLoader(false);
        console.error(error);
      }
    };

    const interval = setTimeout(() => {
      if (enterQuery.length > 0) {
        setIsLoader(true);
        getQueryData();
      }
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
        <label htmlFor="">Search posts by creator name or any keyword </label>
        <input
          onChange={queryInputHandler}
          type="text"
          placeholder="Search somthing...."
        ></input>
      </div>

      {isLoader && <Loder2 />}

      {imageFound ? (
        enterQuery.length > 0 ? (
          <div className={styles["image-section"]}>
            {imageSearchData.map((data) => (
              <Link
                key={data["_id"]}
                to={data["communityData"]["imageUrl"]}
                target="_blank"
              >
                <div className={styles["main-images-div"]}>
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
              </Link>
            ))}
          </div>
        ) : (
          <div className={styles["image-section"]}>
            {imageData.map((data) => (
              <Link
                key={data["_id"]}
                to={data["communityData"]["imageUrl"]}
                target="_blank"
              >
                <div className={styles["main-images-div"]}>
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
              </Link>
            ))}
          </div>
        )
      ) : (
        <h2> No Images Found</h2>
      )}
    </div>
  );
};

export default Community;
