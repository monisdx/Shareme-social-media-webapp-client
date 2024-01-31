import React,{useState, useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import SearchBar from '../SearchBar/SearchBar'
import Pagination from '../Pagination/Pagination'
import { useDispatch  } from 'react-redux';
import { getPosts } from '../../actions/posts'

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const HomePage = () => {
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  
  const [currentId, setcurrentId] = useState(null);
  const user = JSON.parse(localStorage.getItem('profile'));
  
  return (
    <div className=' top-[134px] xs:top-[80px] padding  mx-auto z-0 relative flex gap-10 flex-col overflow-hidden bg-primary '> 
      <SearchBar/>
      <div className='flex xl:flex-row flex-col-reverse gap-8 '>
        <div className={`${user?.result?.name ? 'flex-[0.6]' : 'flex-1'}`}>
           <Posts setcurrentId={setcurrentId}/>
        </div>
        {user?.result?.name && (
        <div className='flex-[0.4]'>
          <Form currentId={currentId} setcurrentId={setcurrentId}/>
        </div>
        )}
      </div>
      {!searchQuery && (
        <Pagination page={page}/>
      )}
    </div>
  )
}

export default HomePage