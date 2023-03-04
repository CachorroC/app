import styles from "../styles/css/layout.module.css";

type Props = {
  children?: React.ReactNode;
};

const Container = ({ children }: Props) => {
  return <div className={styles.main}>{children}</div>;
};

export default Container;
