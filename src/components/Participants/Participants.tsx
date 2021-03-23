import React from 'react';
import { 
   Stack,
   IStackProps,
   DetailsList,
   DetailsListLayoutMode,
   SelectionMode,
   IColumn,
} from '@fluentui/react';

// services
import { getUsers } from '../../services/AzureService';

const columnProps: Partial<IStackProps> = {
   tokens: { childrenGap: 15 },
 };

function Participants() {

   const columns: IColumn[] = [
      {
        key: 'column2',
        name: 'Spielername',
        fieldName: 'user',
        minWidth: 100,
        // maxWidth: 350,
        isRowHeader: true,
        isResizable: true,
        isSorted: true,
        isSortedDescending: false,
        sortAscendingAriaLabel: 'Sorted A to Z',
        sortDescendingAriaLabel: 'Sorted Z to A',
        // onColumnClick: this._onColumnClick,
        data: 'string',
        isPadded: true,
      },
      {
        key: 'column3',
        name: 'Team',
        fieldName: 'team',
        minWidth: 100,
        //   maxWidth: 90,
        isResizable: true,
        // onColumnClick: this._onColumnClick,
        data: 'string',
      //   onRender: (item: IDocument) => {
      //     return <span>{item.dateModified}</span>;
      //   },
        isPadded: true,
      },
    ];

    const [loading, setLoading] = React.useState(false);
    const [users, setUsers] = React.useState<any[]>([]);

   React.useEffect(() => {
      const fetchUsers = async () => {
         setLoading(true);
         const response = await getUsers();
         setUsers(response);
         setLoading(false);

      }
      fetchUsers();
   
      return () => {
      // returned function will be called on component unmount    
      }
   }, [])

   if(loading) {
      return (
         <div>
            Loading...
         </div>
      )
   }

   return (
      <div className="container">

        <h2>Teilnehmer</h2>
         <Stack {...columnProps}>
            <DetailsList
               items={users}
               compact={true}
               columns={columns}
               selectionMode={SelectionMode.none}
               //getKey={this._getKey}
               // setKey="multiple"
               layoutMode={DetailsListLayoutMode.justified}
               isHeaderVisible={true}
               //selection={this._selection}
               // selectionPreservedOnEmptyClick={true}
               // onItemInvoked={this._onItemInvoked}
               // enterModalSelectionOnTouch={true}
               //ariaLabelForSelectionColumn="Toggle selection"
               //ariaLabelForSelectAllCheckbox="Toggle selection for all items"
              // checkButtonAriaLabel="select row"
            />       
         </Stack>  
      </div>         
   );

}

export default Participants;
