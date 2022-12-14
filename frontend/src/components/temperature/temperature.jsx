import './temperature.css';
import { FaTemperatureLow } from 'react-icons/fa';

export default function Temperature({temperature,text}) {
     return(
        <>
            <div  className='temperature header margin-left'>
               <p>{text}</p>
                <p><span><FaTemperatureLow className='temperature-icon'/></span>{temperature}</p>
            </div>
        </>
     )
   
    }
