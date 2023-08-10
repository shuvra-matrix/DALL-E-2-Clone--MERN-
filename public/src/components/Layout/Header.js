import Logo from "../../assets/logo.svg";
import styles from "./Header.module.css";
import Button from "../UI/Button";
import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <header className={styles.header}>
      <Link to="/">
        <img src={Logo} alt="opnai logo"></img>
      </Link>
      <Link to="/">
        <Button type="submit">Create</Button>
      </Link>
    </header>
  );
};

export default Header;
