// import { IConstants } from '../interfaces/IConstants';
import { TableClient } from '@azure/data-tables';

import { constants } from '../constants';

// interfaces
import { IRegisterUser } from '../interfaces/IRegisterUser';
import { IBasicResult } from '../interfaces/IBasicResult';
import { ITwitchStatus } from '../interfaces/ITwitchStatus';

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

      console.log(body)
      console.log(response)

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

export const getUsers = async (): Promise<any[]> => {

   try {
      const account = "cordatabase";
      const sas = "?sv=2020-02-10&ss=t&srt=sco&sp=rl&se=2021-10-09T20:18:24Z&st=2021-03-21T13:18:24Z&spr=https,http&sig=zBGf8TfipcVZVlhAdQjBO7p6YjFHyjGwvGGSLjC2Fzo%3D";
      const tableName = "user"
      
      const clientWithSAS = new TableClient(
         `https://${account}.table.core.windows.net${sas}`,
         tableName
      );

      const entitiesIter = clientWithSAS.listEntities();
      const result = [];
      for await (const entity of entitiesIter) {
         result.push(entity)
         //console.log(entity);
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


