import React from 'react';
// import { ITeam } from '../../interfaces/ITeam';
import { ITeamCompared } from '../../interfaces/ITeamCompared';
import logo from '../../logo_300.png';

import { 
    DetailsList,
    DetailsListLayoutMode,
    SelectionMode,
    IColumn,
    DefaultButton,

 } from '@fluentui/react/';

 import { v4 as uuidv4 } from 'uuid';

interface ITeamProps {
    tc: ITeamCompared;
}
function TeamCard({tc}: ITeamProps) {

    const listItems = [{
        rank: tc.rank,
        scores: tc.scores,
        wins: tc.wins,
        draws: tc.draws,
        looses: tc.looses,
        pointsSelf: tc.pointsSelf,
        pointsEnemy: tc.pointsEnemy
    }];

    const columns: IColumn[] = [
    {
        key: uuidv4(),
        name: 'Platz',
        // fieldName: 'rank',
        minWidth: 10,
        maxWidth: 40,
        isRowHeader: true,
        isResizable: false,
        headerClassName: "headerCenterClass",
        onRender: (item: ITeamCompared) => {
            return (
                <div className="text-center">
                    {item.rank.toString()}.
                </div>
            );
        },
    },
    {
        key: uuidv4(),
        name: 'Spiele',
        //fieldName: 'rank',
        minWidth: 10,
        maxWidth: 40,
        isRowHeader: true,
        isResizable: false,
        headerClassName: "headerCenterClass",
        onRender: (item: ITeamCompared) => {
            return (
                <div className="text-center">
                    {(item.wins + item.draws + item.looses)}
                </div>
            );
        },
    },
    
    {
        key: uuidv4(),
        name: 'Punkte',
        fieldName: 'scores',
        minWidth: 10,
        maxWidth: 50,
        isRowHeader: true,
        className: "text-center",
        headerClassName: "headerCenterClass",
        data: 'string',
     },
     {
        key: uuidv4(),
        name: 'Wins',
        fieldName: 'wins',
        minWidth: 10,
        maxWidth: 40,
        isRowHeader: true,
        className: "text-center",
        headerClassName: "headerCenterClass",
        data: 'number',
     },
     {
        key: uuidv4(),
        name: 'Draws',
        fieldName: 'draws',
        minWidth: 10,
        maxWidth: 40,
        isRowHeader: true,
        className: "text-center",
        headerClassName: "headerCenterClass",
        data: 'number',

     },
     {
        key: uuidv4(),
        name: 'Looses',
        fieldName: 'looses',
        minWidth: 10,
        maxWidth: 50,
        isRowHeader: true,
        className: "text-center",
        headerClassName: "headerCenterClass",
        data: 'number',

     },
     {
        key: uuidv4(),
        name: 'Ergebnis',
        minWidth: 60,
        isRowHeader: true,
        className: "text-center",
        headerClassName: "headerCenterClass",
        onRender: (item: ITeamCompared) => {
           return (
              <span>
                 {item.pointsSelf} : {item.pointsEnemy}
              </span>
           )
        }
     }
    ];

    return (
        <div>
            {/* <div className="d-flex justify-content-end">  */}

            <h3>{tc.name}</h3>

            <div className="text-center mt-3 mb-3">
                <img src={logo} alt="Logo" style={{width: "260px"}}/>
            </div>

            <h5>Spieler</h5>
            <div className="d-flex flex-wrap mt-2 mb-2">
                
                {tc.users.map((participant: any) => {
                return (
                    <DefaultButton key={uuidv4()} disabled className="mr-1 mb-1">
                        {participant.user}
                    </DefaultButton> 
                );
                })}
            </div>

            <br />
            
            <h5 className="mb-0">Tabelle</h5>
            <DetailsList
                items={listItems}
                compact={true}
                columns={columns}
                selectionMode={SelectionMode.none}
                layoutMode={DetailsListLayoutMode.fixedColumns}
                isHeaderVisible={true}
            />

            <br />

            <h5>Maps</h5>
            <div className="d-flex flex-wrap mt-2 mb-2">
                <DefaultButton key={uuidv4()} disabled className="mr-1 mb-1">
                        {tc.map1}
                </DefaultButton>

                <DefaultButton key={uuidv4()} disabled className="mr-1 mb-1">
                        {tc.map2}
                </DefaultButton>
            </div>

        </div>
        
    )

}

export default TeamCard