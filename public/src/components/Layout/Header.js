import Logo from "../../assets/logo.svg";
import styles from "./Header.module.css";
import Button from "../UI/Button";
const Header = (props) => {
  return (
    <header className={styles.header}>
      <img src={Logo} alt="opnai logo"></img>
      <Button type="submit">Create</Button>
    </header>
  );
};

export default Header;
