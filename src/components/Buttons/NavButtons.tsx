'use client';
import { useRouter } from 'next/navigation';
import navbar from 'components/layout/navbar.module.css';
import { useNavigationContext } from '#@/app/context/navigation-context';

export const ForwardButton = () => {
  const router = useRouter();

  return (
    <button
      type="button"
      className={navbar.buttonForward}
      onClick={() => {
        router.forward();
      }}
    >
      <span className={`material-symbols-outlined ${ navbar.icon }`}>
        chevron_right
      </span>
      <p className={navbar.ButtonTextHelper}>entrar</p>
    </button>
  );
};

export const BackwardsButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <button
      type="button"
      className={navbar.buttonBackwards}
      onClick={handleClick}
    >
      <span className={`material-symbols-outlined ${ navbar.icon }`}>
        chevron_left
      </span>
      <p className={navbar.ButtonTextHelper}>atras</p>
    </button>
  );
};

export const DrawerMenuButton = () => {
  const {
    isNavOpen, setIsNavOpen
  } = useNavigationContext();

  function handleDrawerMenuClick() {
    setIsNavOpen(
      !isNavOpen
    );
  }

  return (
    <button
      type="button"
      className={navbar.buttonDrawerMenu}
      onClick={handleDrawerMenuClick}
    >
      <span className={`material-symbols-outlined ${ navbar.icon }`}>
        {isNavOpen
          ? 'close'
          : 'menu'}
      </span>
      <p className={navbar.ButtonTextHelper}>
        {isNavOpen
          ? 'cerrar'
          : 'abrir'}
      </p>
    </button>
  );
};
