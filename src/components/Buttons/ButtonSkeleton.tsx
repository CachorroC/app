import navbar from 'components/layout/navbar.module.css';

export const ButtonSkeleton = () => {
  return (
    <button
      className={navbar.button}
      type={'button'}
    >
      <span className="material-symbols-outlined">cached</span>
    </button>
  );
};
