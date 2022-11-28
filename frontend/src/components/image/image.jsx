import { useParams } from 'react-router-dom';
import './image.css';

export default function Img({text,path}) {
     return(
          <>
               <div className="image">
                    <img src={path} alt="image"/>
                    <p>{text}</p>
               </div>
          </>
     )
   
    }
