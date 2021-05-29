import React from 'react';
// import parse from 'html-react-parser';

// styles
import './OverviewCard.scss'

type IOverviewCardProps = {
   title: string,
   content: React.ReactNode
}

function OverviewCard({ title, content }: IOverviewCardProps) {
  return (
      <div className="OverviewCard d-flex flex-column flex-fill">
         <div className="border-fix text-center border border-2 rounded-top border-primary p-3">
            <h2>{title}</h2>
         </div>  
         <div className="content border-fix border border-2 rounded-bottom border-secondary border-top-0 flex-fill">
            {content}
         </div>
      </div>
  );
}

export default OverviewCard;
