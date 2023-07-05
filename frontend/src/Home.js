import React from 'react'
import { useState } from 'react';
import QueryBar from './components/queryBar';
import Videos from './components/videos';
const Home = () => {
    const [url,setUrl]=useState("http://localhost:3000/all?limit=9&");
    const [resetPage,setResetPage]=useState(false);
    const handleSearch=(url)=>{
      setResetPage(true);
        setUrl(url);
    };
    const handleClear=()=>{
      setResetPage(false);
    }
    return (
    <div style={{alignItems:'center'}}>
    <h1>Video Dashboard</h1>
    <QueryBar handleSearch={handleSearch}/>
    <Videos resetPage={resetPage} handleClear={handleClear} url={url}/>
    </div>
  )
}

export default Home