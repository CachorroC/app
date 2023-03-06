import { isTemplateExpression } from 'typescript';
import styles from '../styles/css/layout.module.css';
import { intLink } from '../interfaces/link.interface';
import Link from 'next/link';
import Image from 'next/image';
import { intPlanet } from '../interfaces/planet.interface';
export default function Card(item: intPlanet) {
  return (
    <>
      <div
        className={styles.card}
        key={item.orderFromSun}
      >
        <h1 className={styles.title}>
          {item.orderFromSun}
        </h1>
        <div className={styles.coretext}>
          <h2 className={styles.name}>{item.name}</h2>
          <ul className={styles.links}>
            <li className={styles.mean}>
              {item.surfaceTemperatureC.mean}
            </li>
            <li className={styles.min}>
              {item.surfaceTemperatureC.min}
            </li>
            <li className={styles.max}>
              {item.surfaceTemperatureC.max}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
