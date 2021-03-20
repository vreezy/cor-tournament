import React from 'react';
import IContentRules from '../../interfaces/IContentRules';

import { PrimaryButton, Stack,IStackProps } from '@fluentui/react';

const columnProps: Partial<IStackProps> = {
   tokens: { childrenGap: 15 },
 };


type IOverviewCardProps = {
   content: IContentRules[]
}

function Rules({ content }: IOverviewCardProps) {
  return (
   <div className="">
      <Stack {...columnProps}>
         {content.map((ele) =>{
            return (
               <PrimaryButton text={ele.title} href={ele.href} target="_blank"/>
            );
         })}
      </Stack>
   </div>
  );
}

export default Rules;
