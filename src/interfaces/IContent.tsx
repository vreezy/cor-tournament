import IContentRules from './IContentRules';

interface IContent {
   title: string;
   subTitle: string;
   overview: string[];
   rules: IContentRules[];
}

export default IContent;