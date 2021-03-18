import React from 'react';
import parse from 'html-react-parser';

// styles
import './OverviewCard.scss'

type CardProps = {
   title: string,
   content: string[]
}

function OverviewCard({ title, content }: CardProps) {
  return (
   <div className="col-sm">
      <div className="text-center headerCard">
         {title}
      </div>  
         {parse(content.join(' <br /> '))}


   </div>
   
  );
}

export default OverviewCard;
