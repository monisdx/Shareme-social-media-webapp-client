import React,{useEffect} from 'react'
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector} from 'react-redux';
import { getPosts } from '../../actions/posts';
import {Link,useNavigate} from 'react-router-dom';

const Pagination = ({page}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { numberOfPages } = useSelector((state) => state.posts);
    console.log(numberOfPages)
  
    
    useEffect(() => {
        if (page) dispatch(getPosts(page));
         console.log('effect');
    },[dispatch,page]);
    
    
  const handlePageClick = (data) => {
    const pageNumber = data.selected + 1;
    console.log(pageNumber); 
    navigate(`/posts?page=${pageNumber}`)// React-paginate uses zero-based indexing
    
  };

    // const hrefBuilder = (pageNumber) => `/posts?page=${pageNumber}`;

  return (
    <div className='flex xl:w-1/2 w-full justify-center  mx-auto items-center px-8 py-6  bg-black-100 rounded-[30px]'>
        <ReactPaginate
        nextLabel=" >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={numberOfPages}
        // forcePage={Number(page) || 1}
        previousLabel="< "
        renderOnZeroPageCount={null}
        className='flex justify-center items-center gap-16'
        previousLinkClassName='font-medium text-[18px]'
        nextLinkClassName='font-medium text-[18px]'
        pageLinkClassName='font-medium px-2 text-[18px] '
        activeLinkClassName= 'btn-gradient text-[18px] font-medium text-primary px-2 rounded-full'
        // hrefBuilder={hrefBuilder}
      />
    </div>
  )
}

export default Pagination