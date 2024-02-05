import React,{ useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import camera from '../../assets/camera.svg';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import * as actiontype from '../../constants/actiontype'


const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  

  const [user,setuser] = useState(JSON.parse(localStorage.getItem('profile')));
  
  const logout = () => {
    dispatch({ type: actiontype.LOGOUT});

    navigate('/');

    setuser(null);
  }

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = jwtDecode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }


    setuser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);
  return (
    <nav className='paddingx w-full flex items-center py-5 fixed top-0 z-20 bg-primary'>
    <div className='w-full flex flex-col xs:flex-row gap-4 xs:gap-0 justify-between items-center max-w-7xl mx-auto'>
      <Link to= "/" className='flex items-center gap-2'>
        <img src={camera} alt="logo" className='w-9 h-9 object-contain'/>
        <p className='text-gradient text-[18px] font-bold cursor-pointer flex'>
          ShareMe
       </p>
      </Link>
      <div className="flex justify-center gap-12 items-center">
        {user ? (
          <>
          {user?.result.picture ? (<img src={user?.result.picture} alt='logo' className='w-9 h-9 rounded-full object-contain'/>) 
          : (<div className='flex justify-center items-center font-bold text-[20px] h-9 w-9 rounded-full text-primary btn-gradient'>{user.result.name.charAt(0)}</div>)
          }
          <p className='text-gradient text-[18px] font-bold cursor-pointer'>
            {user.result.name}
          </p>
          <button type='button' className='px-6 py-2 font-medium text-[18px] rounded-[30px] text-primary btn-gradient duration-500 hover:bg-right outline-none border-none' onClick={logout}>
            Log Out
          </button>
          </>
        ):(
          <button type='button' className='px-6 py-2 font-medium text-[18px] rounded-[30px] text-primary btn-gradient duration-500 hover:bg-right outline-none border-none' onClick={()=> navigate('/auth')}>
            Sign In
          </button>
        )}
        
      </div>
    </div>
  </nav>
  )
}

export default Navbar