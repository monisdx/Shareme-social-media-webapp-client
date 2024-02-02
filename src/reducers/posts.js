import { FETCH_POST, FETCH_ALL, CREATE, UPDATE, DELETE, FETCH_BY_SEARCH, START_LOADING, END_LOADING, COMMENT, START_LOADING_SUBMIT, END_LOADING_SUBMIT} from '../constants/actiontype'

export default ( state = { isLoading: true, isLoadingsubmit: false, posts: []}, action) => {
    switch(action.type){
        case START_LOADING:
            return {...state, isLoading: true};
        case END_LOADING:
            return {...state, isLoading: false};  
        case START_LOADING_SUBMIT:
            return {...state, isLoadingsubmit: true};
        case END_LOADING_SUBMIT:
             return {...state, isLoadingsubmit: false};       
        case DELETE:
            return {...state, posts: state.posts.filter((post)=>post._id !== action.payload)}
        case UPDATE:  
            return {...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post)};
        case COMMENT:
            return {
                ...state,
                posts: state.posts.map((post) => {
                    if(post._id === action.payload._id){
                        return action.payload;
                    }
                     
                    return post;
                }),
            };    
            // return all post normally but return post with comment
        case FETCH_ALL:
            return {...state, posts: action.payload.data, currentPage: action.payload.currentPage, numberOfPages: action.payload.numberOfPages};
        case FETCH_POST:
            
            return {...state, post: action.payload.post};      
        case FETCH_BY_SEARCH:
            return {...state, posts: action.payload};  
        case CREATE:
            return { ...state, posts: [...state.posts, action.payload] };
        default:
            return state;    

    }
}