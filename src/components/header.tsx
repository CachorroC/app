import Navbar from "../components/navbar";
import Drawer from "../components/drawer";
import styles from "../styles/css/layout.module.css"

export default function Header ()
{
  return (
    <div className={styles.header}>
      <Navbar/>
      <Drawer />
    </div>
  )
}