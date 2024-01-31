import React ,{useState,useRef, useEffect}from 'react'
import { useDispatch } from 'react-redux' 
import { commentPost } from '../../actions/posts';

const CommentSection = ({post}) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const [comments, setcomments] = useState(post?.comments);
    const [comment, setcomment] = useState('');
    const dispatch = useDispatch();
    const commentsRef = useRef();
    console.log(comments);
    console.log(comments.length);
  
    const handleClick = async() => {

        const newcomment = await dispatch(commentPost(user.result.name,comment,post._id));

        setcomments(newcomment);
        setcomment('');

        commentsRef.current.scrollIntoView({behavior: 'smooth'})
    }


  return (
    <div className='flex flex-col-reverse xl:flex-row justify-center xl:items-start gap-4 '>
        <div className='flex flex-1 flex-col gap-4 justify-center items-start  '>
            <h3 className='text-white font-medium text-[20px]'>Comments</h3>
            <div className='flex flex-col gap-1 h-[150px] w-[320px] overflow-y-auto scrollbar_style'>
                {comments?.map((c,i) => (
                    <div key={i} className='flex items-center'>
                    <p className='font-medium text-secondary text-[16px]'>{c.username}&nbsp;:&nbsp;</p>
                    <p className='text-secondary text-[14px]'>{ c.comment}</p>
                    </div>
                ))}
               <div ref={commentsRef}/>
            </div>
        </div>
        {user?.result?.name && (
            <div className='flex flex-1 flex-col gap-2 justify-center items-start'>
                <h3 className='text-white font-medium text-[20px]'>Write a Comment</h3>
                    <textarea
                    rows={4}
                    name='comment'
                    value={comment}
                    onChange={(e) => {setcomment(e.target.value)}}
                    placeholder='Comment'
                    className='bg-tertiary w-full placeholder:text-secondary py-4 px-6 text-white rounded-lg outline-none 
                    focus:ring-1 focus:ring-[#fff] font-medium'/>
                    <div className="flex w-full justify-center items-center">
                        <button onClick={handleClick} className={`w-full px-4 py-2 font-medium text-[18px] rounded-[10px] text-primary ${comment ? 'btn-gradient' : 'bg-secondary'} duration-500 hover:bg-right outline-none border-none`} disabled={!comment.length}>
                        Comment... 
                        </button>
                    </div>
            </div>
        )}
    </div>
  )
}

export default CommentSection