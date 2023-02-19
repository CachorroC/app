import styles from "../styles/css/layout.module.css";

type Props = {
  children?: React.ReactNode;
};

const Container = ({ children }: Props) => {
  return <main className={styles.main}>{children}</main>;
};

export default Container;
