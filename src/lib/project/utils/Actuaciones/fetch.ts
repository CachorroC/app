export default async function fetchActuaciones (
  idProceso: number
) {
      const res = await fetch(
        `https://consultaprocesos.ramajudicial.gov.co:448/api/v2/Proceso/Actuaciones/${ idProceso }`,
        {
          next: {
            revalidate: 43200
          }
        }

      );
      // The return value is *not* serialized
      // You can return Date, Map, Set, etc.

      if ( !res.ok ) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error(
          'Failed to fetch data'
        );
      }

      return res.json();
}