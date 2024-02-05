import React, { useState, useEffect } from 'react'
import camera from '../../assets/camera.svg'
import loader from '../../assets/loaderblack.svg';
import upload from '../../assets/file-upload.svg'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, updatePost} from '../../actions/posts'


const Form = ({currentId, setcurrentId}) => {
  const [form, setform] = useState({title: "", message:"", tags:"", file:""});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isLoadingsubmit} = useSelector((state) =>state.posts)
  const post = useSelector((state) => (currentId ? state.posts.posts.find((p) => p._id === currentId) : null));
  const user = JSON.parse(localStorage.getItem('profile'));
  
  console.log(post);

  useEffect(() => {
    if(post)
    setform({title: post?.title, message: post?.message, tags: post?.tags, file: ''});
  },[post]);

  const handleChange = (e) => {

    const { name, value } = e.target;
   
    if(name === 'tags'){
      setform({...form, tags: value.split(',')})
    }
    else{
      setform({...form, [name]: value});
    }
  }

  console.log(form);
  
  const handleimgChange = (e) => {

    const file = e.target.files[0];
    console.log(file);
    
    setform({...form, file: file});
  
  }
  console.log(form);

  const handleSubmit = (e) => {

    e.preventDefault();
    console.log(form.tags);
    const formData = new FormData();
    formData.append("title",form.title);
    formData.append("message",form.message);
    form.tags.forEach((tag, index) => {
      formData.append(`tags[${index}]`, tag);
    });
    formData.append("file",form.file);
    formData.append("name",user?.result?.name);

    if(currentId === null){
      dispatch(createPost(formData, navigate));
      
    }
    else{
      dispatch(updatePost(currentId, formData ))
    }
    clear();

  }
  const clear =() => {
    setcurrentId(null);
    setform({title: "", message:"", tags:"", file:""})
  }

  return (
    <div className='flex flex-col bg-black-100  p-8 gap-6 rounded-[30px]'>
      <div className='flex justify-center items-center mt-2 gap-2'> 
      <img src={camera} alt="logo" className='w-9 h-9 object-contain'/>
        <p className='text-white text-[18px] font-bold cursor-pointer flex'>
          {currentId ? 'Editing a Memory':'Creating a Memory'}
       </p>
       </div> 
      <form onSubmit={handleSubmit} className='flex p-2 flex-col mt-2 gap-8'>

        <label className='flex flex-col relative'>
          
          <input
            type='text'
            name='title'
            required='required'
            value={form.title}
            onChange={handleChange}
            className='bg-tertiary duration-500 peer py-4 px-6 text-white rounded-lg outline-none 
            focus:border  valid:border valid:border-[#fff] focus:border-[#fff] font-medium'/>
          <span className='text-secondary peer-valid:z-[1] duration-500 left-0 peer-valid:text-white
           peer-valid:translate-x-[13px] peer-valid:translate-y-[-9px] peer-valid:text-[13px] peer-valid:px-2
            peer-valid:bg-tertiary peer-valid:py-0 peer-focus:text-white peer-focus:translate-x-[13px]
             peer-focus:translate-y-[-9px] peer-focus:text-[13px] peer-focus:px-2 peer-focus:bg-tertiary
            peer-focus:py-0 px-6 py-4 absolute font-medium pointer-events-none'>Title</span>
        </label>
        <label className='flex flex-col relative'>
          <textarea
            rows={4}
            name='message'
            required='required'
            value={form.message}
            onChange={handleChange}
            className='bg-tertiary duration-500 peer py-4 px-6 text-white rounded-lg outline-none 
            focus:border  valid:border valid:border-[#fff] focus:border-[#fff] font-medium'/>
          <span className='text-secondary peer-valid:z-[1] duration-500 left-0 peer-valid:text-white
           peer-valid:translate-x-[13px] peer-valid:translate-y-[-9px] peer-valid:text-[13px] peer-valid:px-2
            peer-valid:bg-tertiary peer-valid:py-0 peer-focus:text-white peer-focus:translate-x-[13px]
             peer-focus:translate-y-[-9px] peer-focus:text-[13px] peer-focus:px-2 peer-focus:bg-tertiary
            peer-focus:py-0 px-6 py-4 absolute font-medium pointer-events-none'> Message</span>
        </label>
        <label className='flex flex-col relative'>
          
          <input
            type='text'
            name='tags'
            required='required'
            value={form.tags}
            onChange={handleChange}
            
            className='bg-tertiary duration-500 peer py-4 px-6 text-white rounded-lg outline-none 
            focus:border  valid:border valid:border-[#fff] focus:border-[#fff] font-medium'/>
          <span className='text-secondary peer-valid:z-[1] duration-500 left-0 peer-valid:text-white
           peer-valid:translate-x-[13px] peer-valid:translate-y-[-9px] peer-valid:text-[13px] peer-valid:px-2
            peer-valid:bg-tertiary peer-valid:py-0 peer-focus:text-white peer-focus:translate-x-[13px]
             peer-focus:translate-y-[-9px] peer-focus:text-[13px] peer-focus:px-2 peer-focus:bg-tertiary
            peer-focus:py-0 px-6 py-4 absolute font-medium pointer-events-none'>Tags</span>
        </label>
        <label className='flex justify-center gap-5 items-center w-full px-4 py-2 font-medium text-[18px] rounded-[10px] text-primary btn-gradient duration-500 hover:bg-right'>
          <input
            type='file'
            name='selectedFile'
            onChange={handleimgChange}
            className='hidden'
          >
          </input>
          <img src={upload} alt="cloud" className='h-[27px]' />
        
          <p>Upload Image</p>
        </label>
      
        <div className="flex justify-center items-center">
        <button type='submit' className='w-full flex justify-center px-4 py-2 font-medium text-[18px] rounded-[10px] text-primary btn-gradient duration-500 hover:bg-right outline-none border-none'>
        {isLoadingsubmit ? (
                  <img src={loader} alt="loding" className='h-[27px] w-[27px]' />
            ) : (
              <span>Submit</span>
            )}
        </button>
        </div>
      </form>
      </div>
  )
}

export default Form