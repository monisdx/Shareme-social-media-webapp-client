import React,{useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useDispatch  } from 'react-redux';
import { getPosts } from '../../actions/posts'

const HomePage = () => {
  // const [user, setuser] = useState(true);
  const dispatch = useDispatch();
  const [currentId, setcurrentId] = useState(null);
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(()=>{
    dispatch(getPosts());
  },[currentId,dispatch]);
  
  return (
    <div className='top-[50px] padding  mx-auto z-0 relative flex xl:flex-row flex-col-reverse gap-8 overflow-hidden bg-primary '> 
      <div className={`${user?.result?.name ? 'flex-[0.6]' : 'flex-1'}`}>
        <Posts setcurrentId={setcurrentId}/>
      </div>
      {user?.result?.name && (
         <div className='flex-[0.4]'>
         <Form currentId={currentId} setcurrentId={setcurrentId}/>
       </div>
      )}
     
    </div>
  )
}

export default HomePage