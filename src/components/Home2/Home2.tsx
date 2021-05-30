import React from 'react';
import IContentRules from '../../interfaces/IContentRules';

import { 
   PrimaryButton,
   Stack,
   IStackProps
} from '@fluentui/react';
 import { v4 as uuidv4 } from 'uuid';

 // import content from '../../content';

const columnProps: Partial<IStackProps> = {
   tokens: { childrenGap: 15 },
};


function Home2() {
  return (
   <div>
      Willkommen...
   </div>
  );
}

export default Home2;
