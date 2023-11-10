import { NavLink } from './NavLink';

export const NavBar = () => {
  return (
    <>
      <NavLink iconLabel={ 'home' } textLabel={ 'Inicio' } hrefLabel='/' />
      <NavLink iconLabel={ 'gavel' } textLabel={'Reciente'} hrefLabel= '/Carpetas/UltimasActuaciones' />
      <NavLink iconLabel={ 'note' } textLabel={ 'Notas' } hrefLabel='/Notas' />
      <NavLink iconLabel={ 'folder_open' } textLabel={ 'Carpetas' } hrefLabel='/Carpetas'   />
    </>
  );
};
