import './album.css';
import { Link } from 'react-router-dom';
import { BsFillFolderFill } from 'react-icons/bs';

export default function Album({text,id}) {
     return(
        <>
            <div  className='temperature header margin-left'>
            {localStorage.setItem("albumID", JSON.stringify(id))}
               <Link to="/images" state={id}> <span className='icon'><BsFillFolderFill/></span> <span>{text}</span></Link>
            </div>
        </>
    )
}