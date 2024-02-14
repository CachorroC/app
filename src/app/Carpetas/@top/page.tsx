import ActiveLink from '../active-link';

const options: {
  name: string;
  value: 'type' | 'sortingKey' | 'dir';
  items: string[];
}[] = [
  {
    name : 'tipo de accion',
    value: 'type',
    items: [
      'sort',
      'update',
      'reset' 
    ],
  },
  {
    name : 'Campo para odenar',
    value: 'sortingKey',
    items: [
      'fecha',
      'numero',
      'nombre',
      'category',
      'id',
      'tipoProceso',
      'updatedAt',
    ],
  },
  {
    name : 'direccion del orden',
    value: 'dir',
    items: [ 'asc', 'dsc' ],
  },
];

export default function TopPage(
  {
    searchParams,
  }: {
    searchParams: {
      type?: string;
      sortingKey?: string;
      dir?: string;
    };
  } 
) {
      return (
        <>
          {' '}
          {options.map(
            (
              option 
            ) => {
                      return (
                        <div key={option.name}>
                          <div className="text-gray-400">{option.name}</div>

                          <div className="mt-1 flex gap-2">
                            {option.items.map(
                              (
                                item, i 
                              ) => {
                                        const isActive
                  // set the first item as active if no search param is set
                  = ( !searchParams[ option.value ] && i === 0 )
                  // otherwise check if the current item is the active one
                  || item === searchParams[ option.value ];

                                        // create new searchParams object for easier manipulation
                                        const params = new URLSearchParams(
                                          searchParams 
                                        );
                                        params.set(
                                          option.value, item 
                                        );
                                        return (
                                          <ActiveLink
                                            key={item}
                                            isActive={isActive}
                                            searchParams={params.toString()}
                                          >
                                            {item}
                                          </ActiveLink>
                                        );
                              } 
                            )}
                          </div>
                        </div>
                      );
            } 
          )}
        </>
      );
}
