import { useState } from 'react';
import Card from '../components/card';
import clientPromise from '../lib/mongodb';
import { intButton, intCard } from '../types/card';
import { title } from 'process';
import Button from '../components/button';
import { buttonBaseClasses } from '@mui/material';

type Props = {
  cards: [intCard];
  buttons: [intButton];
  isConnected: boolean;
};
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  try {
    const client = await clientPromise;
    const db = client.db('domain');
    const cards = await db
      .collection('cards')
      .find({})
      .limit(20)
      .toArray();

    // By returning { props: { posts } }, the Home component/*  */
    // will receive `posts` as a prop at build time
    return {
      props: {
        isConnected: true,
        cards: JSON.parse(JSON.stringify(cards)),
      },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
}

export default function Cards(props: Props) {
  const [cards, setCards] = useState(props.cards);
  return (
    <>
      {cards.length > 0 ? (
        <ul className='list'>
          {cards.map((card) => {
            return (
              <Card
                key={card._id}
                title={card.title}
                index={card.index}
                name={card.name}
                url={card.url}
                state={card.state}
                avatar={card.avatar}
                list={[]}
              >
            
              </Card>
            );
          })}
        </ul>
      ) : (
        <h1>wrong query</h1>
      )}
    </>
  );
}
