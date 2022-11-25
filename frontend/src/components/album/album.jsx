import './album.css';
import { Link } from 'react-router-dom';
import { BsFillFolderFill } from 'react-icons/bs';
import Image from '../assets/img.png';

export default function Album({text,id}) {
     return(
        <>
            <div  className='album'>
                <div className='album-name'>
               <Link  to={`/images/${id}`} >{text}</Link>
               </div>
            </div>
        </>
    )
}