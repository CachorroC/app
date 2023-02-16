import offline from '../styles/offline.module.scss';
export default function Offline() {
  return (
    <>
      <main className={offline.main}>
        <h1>Youre offline</h1>
        <p>
          Seems like your web connection is down, please
          reload the page whe youre up surfin
        </p>
      </main>
    </>
  );
}
