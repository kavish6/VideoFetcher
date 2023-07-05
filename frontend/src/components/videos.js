import React, { useEffect, useState } from 'react'
import Page from './page';

const Videos = (props) => {
    const pageNumberList=5;
    const [videos,setVideos]=useState([]);
    const [loading,setLoading]=useState(true);
    const [currentPage,setCurrentPage]=useState(1);
    const [maxPageLimit,setMaxPageLimit]=useState(5);
    const [minPageLimit,setMinPageLimit]=useState(0);
    useEffect(()=>{
        if(props.resetPage)
        {
            setCurrentPage(1);
            props.handleClear(false);
        }
        setLoading(true);
        fetch(props.url+`page=${currentPage}`,{mode:'cors',method:'GET'})
        .then((response)=>response.json())
        .then((json)=>{
            console.log(json);
            setVideos(json);setLoading(false);});
    },[currentPage,props.url]);
    const onPageChange=(pageNumber)=>{
        setCurrentPage(pageNumber);
    };
    const onPrevClick=()=>{
        if((currentPage-1)%pageNumberList===0){
            setMaxPageLimit(maxPageLimit-pageNumberList);
            setMinPageLimit(minPageLimit-pageNumberList);
        }
        setCurrentPage(prev=>prev-1);
    }
    const onNextClick=()=>{
        if((currentPage+1)>maxPageLimit)
        {
            setMaxPageLimit(maxPageLimit+pageNumberList);
            setMinPageLimit(minPageLimit+pageNumberList);
        }
        setCurrentPage(prev=>prev+1);
    }
    const paginationParameters={
        currentPage,
        maxPageLimit,
        minPageLimit,
        videos:videos
    };

    return (
        <div style={{alignItems:'center'}}>
        {!loading?
        <Page {...paginationParameters} onPrevClick={onPrevClick} onNextClick={onNextClick} onPageChange={onPageChange}/>
        :<div>Loading ...</div>
        }
        </div>
  )
}

export default Videos