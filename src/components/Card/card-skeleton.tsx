import { Loader } from '#@/components/Loader';
import typography from '#@/styles/fonts/typography.module.css';
import card from 'components/Card/card.module.css';
import { section } from '../form/form.module.css';

export const CardSkeleton = () => {
  return (
    <div className={card.container}>
      <div className={card.card}>
        <h1 className={`${ typography.displayMedium } ${ card.title }`}>
          {'Nombre'}
        </h1>
        <div className={section}>
          <sub className={`${ typography.labelSmall } ${ card.sub }`}>
            {'Numero'}
          </sub>

          <Loader />
          <p className={typography.bodySmall}>{'cargando'}</p>
        </div>

        <div className={card.links}>
          <button className={card.link} type="button">
            <span className={`${ card.icon }  material-symbols-outlined`}>
              {'autorenew'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
