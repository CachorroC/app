'use server';

export async function addNote(
  prevState: {value: string; submitted: boolean; success: boolean}, queryData: FormData
) {
      const itemID = queryData.get(
        'itemID'
      );

      if ( itemID === '1' ) {
        return {
          value    : 'Added to cart',
          submitted: true,
          success  : true
        };
      }

      return {
        value    : 'Couldn\'t add to cart: the item is sold out.',
        submitted: true,
        success  : false
      };

}
