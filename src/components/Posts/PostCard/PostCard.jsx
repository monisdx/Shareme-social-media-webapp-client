import React,{useState} from 'react'
import edit from '../../../assets/edit.svg'
import deleteicon from '../../../assets/delete.svg'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deletePost, likePost, getPost } from '../../../actions/posts'

const PostCard = ({post, setcurrentId}) => {
  
 const user = JSON.parse(localStorage.getItem('profile'));
 const dispatch = useDispatch();
 const navigate = useNavigate();
 const [likes,setlikes] = useState(post?.likes);

 const haslikepost = post?.likes?.find((like) => like === (user?.result?._id));

 const handlelike = async()=>{
  dispatch(likePost(post._id));

  if(haslikepost){
    setlikes(post.likes.filter((id) => id !== (user?.result?._id)));
  }
  else{
    setlikes([...post.likes, user?.result?._id]);
  }
 }

 const openpost = () => {
  navigate(`/posts/${post._id}`);
 }



 const Likes = () => {
  if (likes.length > 0) {
    return likes.find((like) => like === (user?.result?._id))
      ? (
          <>
          <span className="material-icons">thumb_up</span>
          <p>{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }
          </p>
          </>
      ) : (
          <>
          <span className="material-icons-outlined">thumb_up</span>
          <p>{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
          </p>
          </> 
      );
  }

  return <>
         <span className="material-icons-outlined">thumb_up</span>
         <p>Like</p>
         </>
};

  return (
    <div className='bg-tertiary p-5 flex flex-col justify-between rounded-2xl sm:w-[380px] w-full shadow-card'>
    
      <div className='relative w-full h-[230px]'>
        <img src={post?.selectedFile?.url} alt="img" className=' w-full h-full object-cover rounded-2xl ' />
        <div className='absolute p-2 inset-0 w-full h-full flex justify-between items-start  bg-overlay opacity-0 hover:opacity-100 transition duration-300 rounded-2xl'>
          <div className='flex flex-col top-0'>
            <p className='text-[14px]'>{post.name}</p>
            <p className='text-[14px]'>{moment(post.createdAt).fromNow()}</p>
          </div>
          {(user?.result?._id === post?.creator) && (
            <img src={edit} alt="edit" className='cursor-pointer' onClick={()=>setcurrentId(post._id)}/>
          )}
        </div>
      </div>
      <div className='mt-5 cursor-pointer' onClick={openpost}>
        <h3 className='text-white font-bold text-[24px]'>{post.title.length  > 20 ?post.title.substring(0, 20) + "..." : post.title }</h3>
        <p className='mt-2 text-secondary '>{post.message.length > 35 ? post.message.substring(0, 35) + "..." : post.message }</p>
      </div>
      <div className='mt-4 flex flex-wrap gap-2'>
        {post.tags.map((tag,i) => (
          <p key={i} className={` text-[14px] ${i%2==0 ? 'green-text-gradient':'orange-text-gradient'}`}>
            #{tag}
          </p>
        ))}
      </div>
    
      <div className='flex  mt-4 justify-between items-center'>
        <button  className={`flex gap-1 justify-center items-center cursor-pointer ${user?.result ? 'blue-text-gradient':'text-secondary'}`} disabled={!user?.result} onClick={handlelike}>
         <Likes/>
        </button>
        {(user?.result?._id === post?.creator) && (
          <button className='flex gap-1 justify-center items-center cursor-pointer pink-text-gradient' onClick={()=>dispatch(deletePost(post._id))}>
            <img src={deleteicon} alt="delete" />
              <p>Delete</p>
          </button>
        )}
      </div>
    </div>
  )
}

export default PostCard