import React, { useEffect } from 'react'
import loader from '../../assets/loader.svg'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import CommentSection from './CommentSection'
import { getPost, getPostsBySearch } from '../../actions/posts';
import { useParams, useNavigate } from 'react-router-dom'


const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(typeof(id));
  console.log(post);
  console.log(posts);
  
  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    console.log('call recommanted')
    if(post){
    dispatch(getPostsBySearch({search: 'none', tags: post.tags.join(',')}));
    }
  },[post])

  if(!post) return null;

  const recommendedPosts = posts.filter(({_id}) => _id !== post._id);

  console.log(recommendedPosts);
  const openPost = (_id) => {
    navigate(`/posts/${_id}`);
  }

  return (
    isLoading ? (
    <div className='flex justify-center h-[80vh] items-center text-secondary text-[30px] fond-medium'>
      <img src={loader} alt="loding" className='h-[100px] w-[100px]' />
    </div>
    ) : (
    <div className='top-[134px] xs:top-[80px] px-2 sm:px-6 py-2 sm:py-6 mx-4 my-4 relative flex gap-4 flex-col overflow-hidden bg-black-100 rounded-[30px]'>
      <div className='flex flex-col-reverse xl:flex-row justify-center items-start p-5 gap-4'>
        <div className='flex flex-[0.5] flex-col gap-4'>
          <div className='flex flex-col gap-2'>
           <h3 className='text-white font-bold text-[40px]'>{post.title}</h3>
           <div className=' flex flex-wrap gap-2'>
              {post.tags.map((tag,i) => (
                <p key={i} className={` text-[20px] ${i%2==0 ? 'green-text-gradient':'orange-text-gradient'}`}>
                  #{tag}
                </p>
              ))}
           </div>
           <div className=' text-secondary'>{post.message}</div>
           <div className=' text-white text-[20px]'>Created by: {post.name}</div>
           <div className='text-white'>{moment(post.createdAt).fromNow()}</div>
          </div>
          <hr className='border-secondary'/>
          <CommentSection post={post} />
        
          <hr className='border-secondary'/>
        </div>
        <div className='flex flex-[0.5] rounded-[30px]'>
          <img src={post?.selectedFile?.url} alt="logo" className='w-full h-full object-cover rounded-[30px]'/>
        </div>
      </div>
      {recommendedPosts?.length ? (
        <div className='flex flex-col p-5 justify-center '>
          <h1 className='text-white font-medium mb-4 text-[28px]'>You might also like:</h1>
          <hr className='border-secondary'/>
          <div className='flex flex-row mt-4 flex-wrap gap-8'>
            {recommendedPosts.map((recommendedPost) => (
              <div className='flex flex-col gap-2 w-[250px] justify-between cursor-pointer' onClick={()=>openPost(recommendedPost._id)} key={recommendedPost._id}>
                <h3 className='text-white font-medium text-[20px]'>{recommendedPost.title}</h3>
                <p className='text-white text-[14px]'>{recommendedPost.name}</p>
                <p className='text-secondary text-[14px]'>{recommendedPost.message.length > 100 ? recommendedPost.message.substring(0, 100) + "..." : recommendedPost.message }</p>
                <p className='text-white text-[14px]'>Likes: {recommendedPost.likes.length}</p>
                <img src={recommendedPost.selectedFile.url} alt="img" className='w-[200px]   object-cover rounded-2xl' />
              </div>

            ))}

          </div>
        </div>
      ) : (<div></div>)} 
      
      
    </div>
    )
  )
}

export default PostDetails