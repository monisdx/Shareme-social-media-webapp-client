import React from 'react'
import edit from '../../../assets/edit.svg'
import deleteicon from '../../../assets/delete.svg'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deletePost, likePost } from '../../../actions/posts'

const PostCard = ({post, setcurrentId}) => {
 const dispatch = useDispatch();
 const navigate = useNavigate();
 const user = JSON.parse(localStorage.getItem('profile'));

 const Likes = () => {
  if (post.likes.length > 0) {
    return post.likes.find((like) => like === (user?.result?._id))
      ? (
          <>
          <span className="material-icons">thumb_up</span>
          <p>{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }
          </p>
          </>
      ) : (
          <>
          <span className="material-icons-outlined">thumb_up</span>
          <p>{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}
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
    <div className='bg-tertiary p-5 flex flex-col rounded-2xl sm:w-[380px] w-full shadow-card'>
      {/* <div onClick={()=>navigate(`/posts/${post._id}`)}> */}
      <div className='relative w-full h-[230px]'>
        <img src={post.selectedFile} alt="img" className=' w-full h-full object-cover rounded-2xl ' />
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
      <div className='mt-5' onClick={()=>navigate(`/posts/${post._id}`)}>
        <h3 className='text-white font-bold text-[24px]'>{post.title}</h3>
        <p className='mt-2 text-secondary'>{post.message}</p>
      </div>
      <div className='mt-4 flex flex-wrap gap-2'>
        {post.tags.map((tag,i) => (
          <p key={i} className={` text-[14px] ${i%2==0 ? 'green-text-gradient':'orange-text-gradient'}`}>
            #{tag}
          </p>
        ))}
      </div>
      {/* </div> */}
      <div className='flex  mt-4 justify-between items-center'>
        <button  className={`flex gap-1 justify-center items-center cursor-pointer ${user?.result ? 'blue-text-gradient':'text-secondary'}`} disabled={!user?.result} onClick={()=>dispatch(likePost(post._id))}>
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