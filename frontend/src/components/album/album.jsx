import './album.css';
import { Link } from 'react-router-dom';
import { BsFillFolderFill } from 'react-icons/bs';

export default function Album({text,id}) {
    localStorage.setItem("albumID", JSON.stringify(id))
     return(
        <>
            <div  className='temperature header margin-left'>
               <Link  to={"/images"} onClick={()=>{localStorage.setItem("albumID", JSON.stringify(id))}}> <span className='icon'><BsFillFolderFill/>{text}</span></Link>
            </div>
        </>
    )
}