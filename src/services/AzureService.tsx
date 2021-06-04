// import { IConstants } from '../interfaces/IConstants';
import { TableClient } from '@azure/data-tables';

import { constants } from '../constants';

// interfaces
import { IRegisterUser } from '../interfaces/IRegisterUser';
import { IBasicResult } from '../interfaces/IBasicResult';
import { ITwitchStatus } from '../interfaces/ITwitchStatus';
// import { IParticipant } from '../interfaces/IParticipant';
// import { ITwitchBroadcaster } from '../interfaces/ITwitchBroadcaster';

import { 
   ISetGame,
   // ISetGameEntity
} from '../interfaces/ISetGame'

import { ISetGameResponse } from '../interfaces/ISetGameResponse';

export const signUp = async (body: IRegisterUser): Promise<IBasicResult> => {
   try {
      const url = `${constants.registerAPIURL}`;
      const options: RequestInit = {
         method: 'POST',
         body: JSON.stringify(body),
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         },
      }

      const response = await fetch(url, options);

      if(response.status !== 200) {
         return {
            status: "failed",
            message: "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später noch einmal oder informaieren Sie eine Administrator."
         };
      }
      else {
         return await response.json();
      }
   }
   catch(e) {
      console.log(e)
      return {
         status: "exception",
         message: "Es ist ein Kritischer Fehler aufgetreten. Bitte informaieren Sie eine Administrator."
      }
   }
};


export const getAzureTableEntities = async (account: string, tableName: string): Promise<any[]> => {

   try {
      // const account = "cordatabase";
      const sas = constants.sasToken;
      //const tableName = "user"
      
      const clientWithSAS = new TableClient(
         `https://${account}.table.core.windows.net${sas}`,
         tableName
      );

      const entitiesIter = clientWithSAS.listEntities();
      const result: any[]  = [];
      for await (const entity of entitiesIter) {
         result.push(entity)
      }

      return result;
   }
   catch(e) {
      console.log(e)
      return [];
   }
};

export const getTwitchItems = async (): Promise<ITwitchStatus> => {
   try {
      const url = `${constants.twitchStatusAPIURL}`;
      const options: RequestInit = {
         method: 'POST',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
      }

      const response = await fetch(url, options);

      if(response.status === 200) {
         const json = await response.json();
         // console.log(json)
         return json;
      }
   }
   catch(e) {
      console.log(e)
      return {
         status: "exception",
         data: [],
         query: []
      };
   }

   return {
      status: "failed",
      data: [],
      query: []
   };
};


export const setGame = async (sg: ISetGame): Promise<ISetGameResponse> => {
   try {
      const url = `${constants.setGamesAPIURL}`;
      const options: RequestInit = {
         method: 'POST',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(sg)
      }

      const response = await fetch(url, options);

      if(response.status === 200) {
         const json = await response.json();
         // console.log(json)
         return json;
      }
   }
   catch(e) {
      console.log(e)
      return {
         status: "exception",
         rowKey: "0",
         message: "look in the Console"
      };
   }

   return {
      status: "failed",
      rowKey: "0",
      message: "look in the Console"

   };
};

