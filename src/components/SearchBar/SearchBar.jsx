import React,{useState} from 'react'
import { useDispatch , useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { getPostsBySearch } from '../../actions/posts'

function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

const SearchBar = () => {
    const query = useQuery();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [search, setsearch] = useState('');
    const [tags,settags] = useState([]);
    

    const handlekeydown = (e) =>{
        if(e.key!== 'Enter')
        return;

        const value = e.target.value;
        if(!value.trim()) return; 

        settags([...tags, value])

        e.target.value = ''

    }

    const handlekeypress = (e) => {
        if(e.keyCode === 13){
            searchpost();
        }
    }

    const removetag = (index) =>{
        
        settags(tags.filter((tag,i) => i !== index));
        console.log(tags);

    }

    const searchpost = () => {
        console.log('search call');
        if(search.trim() || tags) {
          dispatch(getPostsBySearch({ search, tags: tags.join(',')}));
          console.log("search");
          navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        }
        else{
          navigate('/')
        }
      }

      

  return (
    <div className='flex xl:flex-row flex-col justify-start items-center px-6 py-4 xl:gap-10 gap-4 bg-black-100 rounded-[30px]'>
      <label className='flex flex-[0.4] flex-col w-full relative'>
          <input
            type='text'
            name='title'
            placeholder='Search title'
            value={search}
            onKeyDown={handlekeypress}
            onChange={(e) => setsearch(e.target.value)}
            className='bg-tertiary placeholder:text-secondary xl:w-[400px] w-full py-3 px-6 text-white rounded-lg outline-none font-medium'/>
        </label>
        
        <div className={`flex flex-1 flex-wrap  relative items-center gap-2 bg-tertiary w-full py-2 px-6  rounded-lg  `}>
         {tags.map((tag,index) =>(
            <div key={index} className='flex gap-2 rounded-xl btn-gradient px-2 py-1'>
             <span className='text-primary font-medium'>{tag}</span>
             <span className="material-icons text-primary cursor-pointer" onClick={()=>removetag(index)}>cancel</span>
           </div>
         ))}
          <input onKeyDown={handlekeydown} type='text' name='title' placeholder='Search tags' className=' bg-transparent placeholder:text-secondary text-white  outline-none border-none font-medium py-1'/>
        </div>
        
        <div className="flex flex-[0.4] w-full justify-center items-center">
        <button type='submit' className=' flex items-center justify-center gap-2 w-full xl:w-[200px] text-[18px] px-6 py-[10px] font-medium rounded-[10px] text-primary btn-gradient duration-500 hover:bg-right outline-none border-none' onClick={searchpost}>
        <span className="material-icons-outlined text-[27px]">search</span>
        Search
        </button>
        </div>
    </div>    
  )
}

export default SearchBar