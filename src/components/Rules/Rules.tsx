import React from 'react';
import IContentRules from '../../interfaces/IContentRules';

import { 
   PrimaryButton,
   Stack,
   IStackProps
} from '@fluentui/react';
 import { v4 as uuidv4 } from 'uuid';

 import content from '../../content';

const columnProps: Partial<IStackProps> = {
   tokens: { childrenGap: 15 },
};


function Rules() {
  return (
   <div>
      <Stack {...columnProps}>
         {content.rules.map((ele) =>{
            return (
               <PrimaryButton key={uuidv4()} text={ele.title} href={ele.href} target="_blank"/>
            );
         })}
      </Stack>
   </div>
  );
}

export default Rules;
