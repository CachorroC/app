import { NavLink } from './NavLink';
import styles from '#@/styles/layout.module.css';

export const NavBar = () => {
  return (
    <div className={ styles.navBar }>
      <NavLink iconLabel={ 'home' } textLabel={ 'Inicio' } hrefLabel='/' />
      <NavLink iconLabel={ 'gavel' } textLabel={'Reciente'} hrefLabel= '/Carpetas/UltimasActuaciones' />
      <NavLink iconLabel={ 'note' } textLabel={ 'Notas' } hrefLabel='/Notas' />
      <NavLink iconLabel={ 'folder_open' } textLabel={ 'Carpetas' } hrefLabel='/Carpetas'   />
    </div>
  );
};
