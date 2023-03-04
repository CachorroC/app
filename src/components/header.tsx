import Navbar from '../components/navbar';
import Drawer from '../components/drawer';
import styles from '../styles/css/layout.module.css';
import DrawerAppBar from './appbar';

export default function Header() {
  return (
    <div className={styles.header}>
      <Navbar />
      <DrawerAppBar />
      <Drawer />
    </div>
  );
}
