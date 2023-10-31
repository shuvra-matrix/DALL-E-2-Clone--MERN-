import styles from "./Loder2.module.css";

import { useState } from "react";

const Loder2 = () => {
  return (
    <div className={styles["main-loader"]}>
      <div className={styles["loader"]}></div>
    </div>
  );
};

export default Loder2;
