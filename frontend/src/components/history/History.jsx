import './History.css';
import { FaTrash } from 'react-icons/fa';

export default function History({history,handleClick,id}) {
     return(
          <>
               <div className="history">
                    <p>{history.activity}</p>
                    <span onClick={() => handleClick(id)}><FaTrash className='trash'/></span>
               </div>
          </>
     )
   
    }
