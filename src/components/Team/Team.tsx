import React from 'react';
import { ITeam } from '../../interfaces/ITeam';
import { ITeamCompared } from '../../interfaces/ITeamCompared';

interface ITeamProps {
    tc: ITeamCompared;
}
function Team({tc}: ITeamProps) {

    return (
        <div>
            {tc.name}

            {tc.map1}
            {tc.map2}
        </div>
    )

}

export default Team