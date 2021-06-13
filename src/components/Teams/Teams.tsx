import React from 'react';
import { 
   DetailsList,
   DetailsListLayoutMode,
   SelectionMode,
   IColumn,
   PrimaryButton,
   IconButton,
   Modal,
   IIconProps,
   mergeStyleSets,
   FontWeights,
   getTheme,
} from '@fluentui/react/';

// Components
import TeamCard from '../TeamCard/TeamCard';

// helper
import { v4 as uuidv4 } from 'uuid';
import { Spinner, SpinnerSize  } from '@fluentui/react';

// services
import { compareTeams } from '../../services/CompareService';

// constantes
// import { constants } from '../../constants';

// interfaces
// import { IParticipant } from '../../interfaces/IParticipant';
// import { ITeam } from '../../interfaces/ITeam';
// import { IGame } from '../../interfaces/IGame';
// import { IMap } from '../../interfaces/IMap';

import { ITeamCompared } from '../../interfaces/ITeamCompared';
// mock
// import { games as mockGames } from '../../mock/games';

import { globalStateContext } from '../../App';


function Teams() {
   const {loading, participants, teams, games, maps} = React.useContext(globalStateContext);
   const [teamsCompared, setTeamsCompared] = React.useState<ITeamCompared[]>([]);
   const [isOpen, setIsOpen] = React.useState<boolean>(false);
   const [modalTC, setModalTC] = React.useState<ITeamCompared>();

   const cancelIcon: IIconProps = { iconName: 'Cancel' };

   React.useEffect(() => {
      const teamsCompared: ITeamCompared[] = compareTeams(teams, participants, games, maps);
      setTeamsCompared(teamsCompared);
   
      return () => {
      // returned function will be called on component unmount    
      }
   }, [teams, participants, games, maps]);


   const theme = getTheme();
   const contentStyles = mergeStyleSets({
      container: {
      display: 'flex',
      flexFlow: 'column nowrap',
      alignItems: 'stretch',
      },
      header: [
         {
            flex: '1 1 auto',
            borderTop: `4px solid ${theme.palette.themePrimary}`,
            color: theme.palette.neutralPrimary,
            fontWeight: FontWeights.semibold,
            padding: '12px 12px 14px 24px',
         },
      ],
      body: {
         flex: '4 4 auto',
         padding: '0 24px 24px 24px',
         overflowY: 'hidden',
         selectors: {
            p: { margin: '14px 0' },
            'p:first-child': { marginTop: 0 },
            'p:last-child': { marginBottom: 0 },
         },
      },
   });

   
   const showTeam = (tc: ITeamCompared) => {
      setModalTC(tc);
      setIsOpen(true);
   }

   const columns: IColumn[] = [
      {
         key: uuidv4(),
         name: 'Platz',
         fieldName: 'rank',
         minWidth: 30,
         maxWidth: 40,
         isRowHeader: true,
         isResizable: false,
         onRender: (item: ITeamCompared) => {
            return <span>{item.rank.toString()}.</span>            
         },
         data: 'number',
      },
      {
         key: uuidv4(),
         name: 'Name',
         fieldName: 'name',
         minWidth: 200,
         // maxWidth: 10,
         isRowHeader: true,
         isResizable: true,
         isMultiline: true,
         onRender: (item: ITeamCompared) => {
            return (
               <PrimaryButton className="m-1" onClick={() => showTeam(item)}>{item.name}</PrimaryButton>
            )
         },

         data: 'string'
      },
      {
         key: uuidv4(),
         name: 'Spiele',
         //fieldName: 'rank',
         minWidth: 60,
         maxWidth: 60,
         isRowHeader: true,
         isResizable: false,
         headerClassName: "headerCenterClass",
         onRender: (item: ITeamCompared) => {
             return (
                 <div className="h-100 d-flex align-items-center justify-content-center">
                     {(item.wins + item.draws + item.looses)}
                 </div>
             );
         },
      },
      {
         key: uuidv4(),
         name: 'Punkte',
         fieldName: 'scores',
         minWidth: 50,
         maxWidth: 50,
         isRowHeader: true,
         className: "h-100 d-flex align-items-center justify-content-center",
         headerClassName: "headerCenterClass",
         data: 'string',
      },
      {
         key: uuidv4(),
         name: 'Wins',
         fieldName: 'wins',
         minWidth: 50,
         maxWidth: 50,
         isRowHeader: true,
         className: "h-100 d-flex align-items-center justify-content-center",
         headerClassName: "headerCenterClass",
         data: 'number',
      },
      {
         key: uuidv4(),
         name: 'Draws',
         fieldName: 'draws',
         minWidth: 50,
         maxWidth: 50,
         isRowHeader: true,
         className: "h-100 d-flex align-items-center justify-content-center",
         headerClassName: "headerCenterClass",
         data: 'number',

      },
      {
         key: uuidv4(),
         name: 'Looses',
         fieldName: 'looses',
         minWidth: 50,
         maxWidth: 50,
         isRowHeader: true,
         className: "h-100 d-flex align-items-center justify-content-center",
         headerClassName: "headerCenterClass",
         data: 'number',

      },
      {
         key: uuidv4(),
         name: 'Ergebnis',
         minWidth: 80,
         isRowHeader: true,
         className: "h-100 d-flex align-items-center justify-content-center",
         headerClassName: "headerCenterClass",
         onRender: (item: ITeamCompared) => {
            return (
               <span>
                  {item.pointsSelf} : {item.pointsEnemy}
               </span>
            )
         }
      },
   ];

   return (
      <div className="container mt-4">
         <div className="row">
            <div className="col">
               <h2>Tabelle</h2>
               {/* <h2>Teams ({teamsCompared.length})</h2> */}
            </div>
         </div>
         
         {loading && 
            <div className="row m-1 p-4 align-items-center justify-content-center border border-fix border-secondary rounded ">
               <div className="col col-auto p-5"><Spinner label="Loading..." size={SpinnerSize.large}/></div>
            </div> 
         }

         <DetailsList
            items={teamsCompared}
            compact={false}
            columns={columns}
            selectionMode={SelectionMode.none}
            layoutMode={DetailsListLayoutMode.justified}
            isHeaderVisible={true}
         />

         <Modal
            titleAriaId="Team"
            isOpen={isOpen}
            onDismiss={() => setIsOpen(false)}
            isBlocking={false}
            //isModeless={true}
            containerClassName={contentStyles.container}
         >
               
            <div className={contentStyles.header + " d-flex justify-content-between align-items-center" }>
                TEAM
                <IconButton
                    //styles={iconButtonStyles}
                    iconProps={cancelIcon}
                    ariaLabel="Close popup modal"
                    onClick={() => setIsOpen(false)}
                />
            </div>
            
            <div className={contentStyles.body + " text-white"}>
               {modalTC &&
                  <TeamCard tc={modalTC} />
               }
            </div>

         </Modal>
      </div>         
   );
}

export default Teams;