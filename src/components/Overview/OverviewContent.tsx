import React from 'react';
import {
   getTheme,
   mergeStyleSets,
   FontWeights,
   Modal,
   IconButton,
   IIconProps,
   PrimaryButton,
   Stack,
   IStackProps
} from '@fluentui/react';
 



// helper
import { v4 as uuidv4 } from 'uuid';

// content
import content from '../../content';

function Overview() {
   const columnProps: Partial<IStackProps> = {
      tokens: { childrenGap: 15 },
   };

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
         display: 'flex',
         alignItems: 'right',
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

   const cancelIcon: IIconProps = { iconName: 'Cancel' };
   const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);

   return (
      <div>
         <Stack {...columnProps}>
            {content.overview.map((ele) => <div key={uuidv4()}>{ele} <br /></div> )}

            <PrimaryButton text="Turnierplan" onClick={() => setIsOpenModal(true)} />
         </Stack>
         <Modal
               titleAriaId="titleId"
               isOpen={isOpenModal}
               //onDismiss={hideModal}
               isBlocking={false}
               containerClassName={contentStyles.container}
               // dragOptions={false}
            >

               <div className={contentStyles.header}>
                  <IconButton
                     styles={iconButtonStyles}
                     iconProps={cancelIcon}
                     ariaLabel="Close popup modal"
                     onClick={() => setIsOpenModal(false)}
                  />
               </div>
               <div className={contentStyles.body}>
                  <iframe className="tournamentIframe" title="turnier" src="https://display.turnier.live/R1se/cor-test/0"></iframe>
               </div>
            </Modal>
      </div>
      
   );
}

export default Overview;
