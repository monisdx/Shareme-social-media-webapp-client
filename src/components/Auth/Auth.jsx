import React,{useState} from 'react'
import girl from '../../assets/girl.png';
import boy from '../..//assets/boy.png';
import camera from '../../assets/camera.svg'
import google from '../../assets/google.svg'
import loader from '../../assets/loaderblack.svg';
import { useNavigate} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { signin, signup, googleoauth} from '../../actions/auth'
import { useGoogleLogin } from '@react-oauth/google'


const Auth = () => {
  const [form, setform] = useState({name: "", email:"", password:"", confirmpassword:""});
  const [isSignup, setisSignup] = useState(false)
  const [showpassword, setshowpassword] = useState(false)
  const [showcpassword, setshowcpassword] = useState(false)
  const {isLoading} = useSelector((state)=> state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {

    const { name, value } = e.target;

    setform({...form, [name]: value});

  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(isSignup){
      dispatch(signup(form, navigate));
    }
    else{
      dispatch(signin(form, navigate));
    }

  }

  const googlelogin = useGoogleLogin({
    onSuccess: async res => {
      const token = res?.access_token;
      dispatch(googleoauth(token, navigate));
    },

    onError: () => {
      console.log('google login fail')
    }
  });

  const switchmode = () => {
    setisSignup((prev)=>!prev);
    setform({name: "", email:"", password:"", confirmpassword:""});

  }
  return (
    <div className='top-[80px] padding max-w-7xl  mx-auto z-0 relative flex xl:flex-row flex-col-reverse gap-20 overflow-hidden bg-primary '>
      <div className={`flex flex-[0.4] flex-col bg-black-100  p-8 gap-6 rounded-[30px] ${isSignup ? '' : 'max-h-[545px]'}`}>
      <div className='flex justify-center items-center mt-6 gap-2'> 
      <img src={camera} alt="logo" className='w-9 h-9 object-contain'/>
        <p className='text-gradient text-[18px] font-bold cursor-pointer flex'>
          ShareMe
       </p>
       </div> 
      <form onSubmit={handleSubmit} className='flex p-2 flex-col mt-5 gap-8'>
      {isSignup && (
        <label className='flex flex-col relative'>
        
        <input
          type='text'
          name='name'
          required='required'
          value={form.name}
          onChange={handleChange}
          className='bg-tertiary duration-500 peer py-4 px-6 text-white rounded-lg outline-none 
          focus:border valid:border valid:border-[#fff] focus:border-[#fff] font-medium'/>
        <span className='text-secondary duration-500 left-0 peer-valid:text-white 
        peer-valid:translate-x-[13px] peer-valid:translate-y-[-9px] peer-valid:text-[13px] peer-valid:px-2
         peer-valid:bg-tertiary peer-valid:py-0 peer-focus:text-white peer-focus:translate-x-[13px] 
         peer-focus:translate-y-[-9px] peer-focus:text-[13px] peer-focus:px-2 peer-focus:bg-tertiary 
         peer-focus:py-0 px-6 py-4 absolute font-medium pointer-events-none'>
          Name
        </span>
        <span className='material-icons-outlined peer-focus:text-[#fff] peer-active:text-[#fff] right-0 px-6 py-4 absolute cursor-pointer text-secondary'>account_circle</span>
      </label>
      )}  
        <label className='flex flex-col relative'>
          
          <input
            type='email'
            name='email'
            required='required'
            value={form.email}
            onChange={handleChange}
            className='bg-tertiary duration-500 peer py-4 px-6 text-white rounded-lg outline-none
             focus:border  valid:border valid:border-[#fff] focus:border-[#fff] font-medium'/>
          <span className='text-secondary peer-valid:z-[1] duration-500 left-0 peer-valid:text-white 
          peer-valid:translate-x-[13px] peer-valid:translate-y-[-9px] peer-valid:text-[13px] peer-valid:px-2
           peer-valid:bg-tertiary peer-valid:py-0 peer-focus:text-white peer-focus:translate-x-[13px] 
           peer-focus:translate-y-[-9px] peer-focus:text-[13px] peer-focus:px-2 peer-focus:bg-tertiary 
           peer-focus:py-0 px-6 py-4 absolute font-medium pointer-events-none'>
            Email
          </span>
          <span className='material-icons-outlined peer-focus:text-[#fff] peer-active:text-[#fff] right-0 px-6 py-4 absolute cursor-pointer text-secondary'>alternate_email</span>
        </label>
        <label className='flex flex-col relative'>
          
          <input
            type={showpassword ? 'text':'password'}
            name='password'
            required='required'
            value={form.password}
            onChange={handleChange}
            className='bg-tertiary duration-500 peer py-4 px-6 text-white rounded-lg outline-none focus:border  valid:border valid:border-[#fff] focus:border-[#fff] font-medium'
          />
          <span className='text-secondary peer-valid:z-[1] duration-500 left-0 peer-valid:text-white 
          peer-valid:translate-x-[13px] peer-valid:translate-y-[-9px] peer-valid:text-[13px] peer-valid:px-2
           peer-valid:bg-tertiary peer-valid:py-0 peer-focus:text-white peer-focus:translate-x-[13px] 
           peer-focus:translate-y-[-9px] peer-focus:text-[13px] peer-focus:px-2 peer-focus:bg-tertiary 
           peer-focus:py-0 px-6 py-4 absolute font-medium pointer-events-none'>
            Password
            </span>
            <span className='material-icons-outlined peer-focus:text-[#fff] peer-active:text-[#fff] right-0 px-6 py-4 absolute cursor-pointer text-secondary' onClick={()=>setshowpassword(!showpassword)}>{showpassword ? 'visibility':'visibility_off'}</span>
        </label>
        {isSignup && (
          <label className='flex flex-col relative'>
          
          <input
            type={showcpassword ? 'text' : 'password'}
            name='confirmpassword'
            required='required'
            value={form.confirmpassword}
            onChange={handleChange}
            className='bg-tertiary duration-500 peer py-4 px-6 text-white rounded-lg outline-none focus:border  valid:border valid:border-[#fff] focus:border-[#fff] font-medium'
          />
          <span className='text-secondary peer-valid:z-[1] duration-500 left-0 peer-valid:text-white 
          peer-valid:translate-x-[13px] peer-valid:translate-y-[-9px] peer-valid:text-[13px] peer-valid:px-2
           peer-valid:bg-tertiary peer-valid:py-0 peer-focus:text-white peer-focus:translate-x-[13px] 
           peer-focus:translate-y-[-9px] peer-focus:text-[13px] peer-focus:px-2 peer-focus:bg-tertiary 
           peer-focus:py-0 px-6 py-4 absolute font-medium pointer-events-none'>
            Confirm Password
            </span>
            <span className='material-icons-outlined peer-focus:text-[#fff] peer-active:text-[#fff] right-0 px-6 py-4 absolute cursor-pointer text-secondary' onClick={()=>setshowcpassword(!showcpassword)}>{showcpassword ? 'visibility':'visibility_off'}</span>
          </label>
        )}
        <div className="flex justify-center items-center">
        <button type='submit' className='w-full flex justify-center px-4 py-2 font-medium text-[18px] rounded-[10px] text-primary btn-gradient duration-500 hover:bg-right outline-none border-none' >
        {isLoading ? (
                  <img src={loader} alt="loding" className='h-[27px] w-[27px]' />
            ) : (
              <span>{isSignup ? "Sign Up" : "Sign In"}</span>
            )}
        </button>
        </div>
        
        <div className="flex justify-center items-center">
        <button type="button" onClick={googlelogin} className=' flex justify-center items-center gap-3 w-full px-4 py-2 font-medium text-[18px] rounded-[10px] text-primary btn-gradient duration-500 hover:bg-right outline-none border-none' >
          <img src={google} alt="google" className='h-[27px] ' />
          <p>Continue with Google</p>
        </button>
        </div>
      </form>
        
        <div className="flex justify-center items-center">
        <button  className=' px-4 py-2 font-medium text-[18px] rounded-[10px] text-gradient cursor-pointer  outline-none border-none' onClick={switchmode}>
          {isSignup ? `Already have an account? Sign In` : `Dont't have an account? Sign up`}
        </button>
        </div>
      </div>
      <div className='flex flex-[0.6] justify-center items-center p-8'>
        {isSignup ? (
          <img src={girl} alt="logo" className='w-full h-full object-contain' />
        ):(<img src={boy} alt="logo" className='w-full h-full object-contain' />)}
      </div>
      <div className='absolute z-[1] w-[10%] h-[50%] left-[500px] rounded-full bottom-[17rem] white__gradient'/>
    </div>
  
  )

}

export default Auth