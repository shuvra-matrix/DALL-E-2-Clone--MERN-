import Logo from "../../assets/logo.svg";
import styles from "./Header.module.css";

const Header = (props) => {
  return (
    <header className={styles.header}>
      <img src={Logo} alt="opnai logo"></img>
      <button type="submit">Create</button>
    </header>
  );
};

export default Header;
