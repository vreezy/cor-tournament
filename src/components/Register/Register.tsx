import React from 'react';
import { TextField, PrimaryButton, Stack,IStackProps } from '@fluentui/react';

const columnProps: Partial<IStackProps> = {
   tokens: { childrenGap: 15 },
 };

function Register() {

   return (
      <div className="text-center">
         <Stack {...columnProps}>
            <TextField label="Spielername" />
            <PrimaryButton text="Anmelden" />
         </Stack>  
      </div>         
   );

}

export default Register;
