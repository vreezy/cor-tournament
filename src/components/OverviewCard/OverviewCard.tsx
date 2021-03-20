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
   <div className="p-2 d-flex flex-column flex-fill">
      <div className="header text-center border border-2 rounded-top border-primary">
         {title}
      </div>  
      <div className="content border border-2 rounded-bottom border-secondary border-top-0 flex-fill">
         {content}
      </div>


   </div>
   
  );
}

export default OverviewCard;
