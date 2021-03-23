import React from 'react';
import { 
   TextField,
   PrimaryButton,
   MessageBar,
   MessageBarType,
   Stack,
   IStackProps
} from '@fluentui/react';
import { Spinner, SpinnerSize  } from '@fluentui/react';

// services
import { signUp } from '../../services/AzureService';

const columnProps: Partial<IStackProps> = {
   tokens: { childrenGap: 15 },
 };

function Register() {

   const [loading, setLoading] = React.useState(false);
   const [username, setUsername] = React.useState('');
   const [password, setPassword] = React.useState('');
   const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
   const [status, setStatus] = React.useState('');
   const [message, setMessage] = React.useState('');

   const onChangeUsername = React.useCallback(
      (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        setUsername(newValue || '');
      },
      [],
   );

   const onChangePassword = React.useCallback(
      (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
         setPassword(newValue || '');
            if(newValue === '' || newValue === null) {
               setPasswordErrorMessage('Bekommst Du von unseren Clan-Leader')
            }
            else {
               setPasswordErrorMessage('');
            }
      },
      [],
   );

   async function _send(): Promise<void> {
      setLoading(true);

      const result = await signUp({
         "user": username,
         "password": password
      });

      setStatus(result.status);
      setMessage(result.message);
      setLoading(false);

   }

   if(loading) {
      return (
         <div className="d-flex h-100 justify-content-center align-items-center">
            <Spinner label="Loading..." size={SpinnerSize.large} />
         </div>
      )
   }

   if(status === "ok") {
      return (
         <MessageBar messageBarType={MessageBarType.success}>
           Vielen Dank für deine Anmeldung "{username}".
         </MessageBar>
      );
   }

   return (
      <div>
         {message && 
            <MessageBar  messageBarType={MessageBarType.severeWarning}>
               {message}
            </MessageBar>
         }     
        
         <Stack {...columnProps}>
            <TextField 
               label="Spielername"
               value={username}
               onChange={onChangeUsername}
               required
            />
            <TextField label="Password"
               value={password}
               onChange={onChangePassword}
               type="password"
               canRevealPassword
               errorMessage={passwordErrorMessage}
               required
            />
            <PrimaryButton
               text="Anmelden"
               onClick={_send}
            />
         </Stack>  
      </div>         
   );

}

export default Register;
