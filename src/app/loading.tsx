import { Loader } from 'components/Loader';
import layout from '#@/styles/layout.module.css';

export default function MainLoading() {
  return (
    <>
      <div className={ layout.top }>
        <h1>Cargando</h1>
      </div>
      <div className={ layout.left }>
        <Loader key={'a'} />
        <Loader key={'b'} />
        <Loader key={'c'} />
        <Loader key={'d'} />
        <Loader key={'e'} />
        <Loader key={'f'} />
        <Loader key={'g'} />
        <Loader key={'h'} />
        <Loader key={'i'} />
        <Loader key={'j'} />
      </div>
    </>
  );
}
