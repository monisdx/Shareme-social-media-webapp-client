import React from 'react'
import PostCard from './PostCard/PostCard';
import { useSelector } from 'react-redux';


const Posts = ({setcurrentId}) => {
  const {posts} = useSelector((state) => state.posts);
  console.log(posts);
  

  return (

    !posts?.length ? (
      <div className='flex justify-center items-center text-secondary text-[30px] fond-medium'>
        <p>No Post Create your own Posts</p>
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