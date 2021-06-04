import { 
   IColumn,
} from '@fluentui/react';

import { v4 as uuidv4 } from 'uuid';

import {IGameCompared } from './Games';

export const columns: IColumn[] = [
   {
      key: uuidv4(),
      name: 'Team1',
      fieldName: 'team1Name',
      minWidth: 140,
      maxWidth: 180,
      isRowHeader: true,
      isResizable: true,
      isMultiline: true,
      className: "text-right",
      headerClassName: "headerRightClass",
      
      data: 'string'
   },
   {
      key: uuidv4(),
      name: 'Ergebnis',
      minWidth: 70,
      maxWidth: 70,
      isRowHeader: true,
      className: "text-center",
      headerClassName: "headerCenterClass",
      onRender: (item: IGameCompared) => {
         return (
            <span>
               {item.punktet1}&nbsp;:&nbsp;{item.punktet2}
            </span>
         )
      }
   },
   {
      key: uuidv4(),
      name: 'Team2',
      fieldName: 'team2Name',
      minWidth: 140,
      maxWidth: 180,
      isRowHeader: true,
      isResizable: true,
      isMultiline: true,
      data: 'string'
   },
   {
      key: uuidv4(),
      name: 'Map1',
      fieldName: 'map1',
      minWidth: 100,
      maxWidth: 150,
      isRowHeader: true,
      isResizable: true,
      data: 'string',
   },
   {
      key: uuidv4(),
      name: 'Map2',
      fieldName: 'map2',
      minWidth: 100,
      maxWidth: 150,
      isRowHeader: true,
      isResizable: true,
      data: 'string',
   },
   {
      key: uuidv4(),
      name: 'Map3',
      fieldName: 'map3',
      minWidth: 100,
      maxWidth: 150,
      isRowHeader: true,
      isResizable: true,
      data: 'string',
   },
   {
      key: uuidv4(),
      name: 'Map4',
      fieldName: 'map4',
      minWidth: 100,
      maxWidth: 150,
      isRowHeader: true,
      isResizable: true,
      data: 'string',
   },
];
