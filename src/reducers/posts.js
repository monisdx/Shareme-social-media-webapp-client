import { FETCH_ALL, CREATE, UPDATE, DELETE, FETCH_BY_SEARCH} from '../constants/actiontype'

export default ( state = [], action) => {
    switch(action.type){
        case DELETE:
            return posts.filter((post)=>post._id !== action.payload)
        case UPDATE:  
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);
        case FETCH_ALL:
            return {...state, posts: action.payload.data, currentPage: action.payload.currentPage, numberOfPages: action.payload.numberOfPages};
        case FETCH_BY_SEARCH:
            return {...state, posts: action.payload};  
        case CREATE:
            return { ...state, posts: [...state.posts, action.payload] };
        default:
            return state;    

    }
}