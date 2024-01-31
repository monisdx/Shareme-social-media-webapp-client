import React from 'react'
import PostCard from './PostCard/PostCard';
import loader from '../../assets/loader.svg'
import { useSelector } from 'react-redux';


const Posts = ({setcurrentId}) => {
  const {posts, isLoading} = useSelector((state) => state.posts);
  console.log(posts);
  
  if(!posts.length && !isLoading){
    return (
      <div className='flex justify-center items-center text-secondary text-[30px] fond-medium'>
        <p>No Post Create your own Posts</p>
      </div>
    )
  }

  return (

    isLoading ? (
      <div className='flex justify-center h-[80vh] items-center text-secondary text-[30px] fond-medium'>
        <img src={loader} alt="loding" className='h-[100px] w-[100px]' />
      </div>
    ) :(
      <div className='flex justify-center flex-wrap gap-10'>
        {posts.map((post,index) => (
          <PostCard key={`post-${index}`} post={post} setcurrentId={setcurrentId}/>
      ))}
      </div>

    )
    
  )
}

export default Posts