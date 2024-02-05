// 
import { FETCH_POST, FETCH_ALL, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, START_LOADING, END_LOADING, COMMENT, START_LOADING_SUBMIT, END_LOADING_SUBMIT } from '../constants/actiontype.js'
import * as api from '../api/index.js';

export const getPost = (id) => async(dispatch) => {
    try{
        dispatch({type: START_LOADING});
    
        const { data } = await api.fetchpost(id);
        
        dispatch({type: FETCH_POST, payload: {post: data}})
        dispatch({type: END_LOADING});

    }
    catch(error){
        console.log(error.message);
        console.log(error.response);
    }
}

export const getPosts = (page) => async(dispatch) => {
    try{
        console.log('ff');
        dispatch({type: START_LOADING});
        const { data } = await api.fetchPosts(page);
        console.log(data);
        dispatch({type: FETCH_ALL, payload: data});
        dispatch({type: END_LOADING});

    }
    catch(error){
        console.log(error.message);
    }
}

export const getPostsBySearch = (searchQuery) => async(dispatch) =>{
    try{
        dispatch({type: START_LOADING});
        const {data: { data }} = await api.fetchPostsBySearch(searchQuery);
        console.log(data);
        dispatch({type: FETCH_BY_SEARCH, payload: data})
        dispatch({type: END_LOADING});
        
    }
    catch(error){
        console.log(error);

    }
}

export const createPost = (post,navigate) => async(dispatch) => {
    try{
        const { data } = await api.createPost(post);
        navigate(`/posts/${data._id}`);
        dispatch({type: CREATE, payload: data});

    }
    catch(error){
        console.log(error.message);
    }
}

export const updatePost = (id, post) => async(dispatch) => {
    try{
        dispatch({type: START_LOADING_SUBMIT})
        const { data } = await api.updatePost(id, post);

        dispatch({type: UPDATE, payload: data});
        dispatch({type: END_LOADING_SUBMIT})

    }
    catch(error){
        console.log(error.message);

    }
}

export const deletePost = (id) => async(dispatch) => {
    try{
        await api.deletePost(id);

        dispatch({type: DELETE, payload: id});
    }
    catch(error){
        console.log(error.message);
    }
}

export const likePost = (id) => async(dispatch) => {
    try{
        const { data } = await api.likePost(id);

        dispatch({type: UPDATE, payload: data});

    }
    catch(error){
        console.log(error.message);

    }
}


export const commentPost = (username,comment, id) => async(dispatch) => {
    try{
         const { data } = await api.comment(username, comment, id);
         
         dispatch({type: COMMENT, payload: data});
         console.log(data.comments);
         return data.comments;
    }
    catch(error) {
        console.log(error);

    }
}
