import { AUTH } from '../constants/actiontype'
import * as api from '../api';

export const signin = (form,navigate) => async(dispatch) =>{
    try{
        // console.log
       const { data } =  await api.signIn(form);
        // console.log(data);
       dispatch({ type: AUTH,  data});

        navigate('/');

    }
    catch(error){
        console.log(error);
    }
}

export const signup = (form,navigate) => async(dispatch) =>{
    try{
        // console.log(form);
       const { data } =  await api.signUp(form);
    //    console.log(data);

       dispatch({ type: AUTH,  data});

        navigate('/')

    }
    catch(error){
        console.log(error);
        
    }
}

export const googleoauth = (token,navigate) => async(dispatch) => {
    try{
        const { data } = await api.gooleOauth(token);
        
        dispatch({type: AUTH, data});

        navigate('/')
    }
    catch(error){
        console.log(error);
    }
}