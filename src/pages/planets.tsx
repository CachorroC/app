import { useState } from 'react';
import Layout from '../components/layout';
import styles from '../styles/css/layout.module.css';
import { intPlanet } from '../interfaces/planet.interface';
import clientPromise from '../lib/mongodb';
import Card from '../components/card';
type Props = {
  planets: [intPlanet];
  isConnected: boolean;
};

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  try {
    const client = await clientPromise;
    const db = client.db('sample_guides');
    const planets = await db
      .collection('planets')
      .find({})
      .limit(20)
      .toArray();

    // By returning { props: { posts } }, the Home component/*  */
    // will receive `posts` as a prop at build time
    return {
      props: {
        isConnected: true,
        planets: JSON.parse(JSON.stringify(planets)),
      },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
}

export default function Planets(props: Props) {
  const [planets, setPlanets] = useState(props.planets);

  return (
    <>
      <>
        <h1 className={styles.title}>
          Top 20 Added Planets
        </h1>
        {planets.length > 0 ? (
          <ul className={styles.links}>
            {planets.map((planet, index) => {
              return (
                <Card
                  key={planet.orderFromSun}

                  name={planet.name}
                  orderFromSun={planet.orderFromSun}
                  hasRings={planet.hasRings}
                  mainAtmosphere={planet.mainAtmosphere}
                  surfaceTemperatureC={
                    planet.surfaceTemperatureC
                  }
                  _id={planet._id}
                />
              );
            })}
          </ul>
        ) : (
          <h2 className='planets-body-heading'>
            Ooops! No planets added so far
          </h2>
        )}
      </>
    </>
  );
}
