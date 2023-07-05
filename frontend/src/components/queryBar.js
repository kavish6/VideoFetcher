import React, { useEffect, useState } from 'react';
import './queryBar.css'
const QueryBar = (props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [query, setQuery] = useState('');
  const [currentQuery,setCurrentQuery]=useState('');
  const [getQuery,setGetQuery]=useState(true);
  const [paused,setPaused]=useState(false);
  const [isSearch,setIsSearch]=useState(false);
  useEffect(()=>{
    if(getQuery===true)
    {
        setGetQuery(false);
        fetch('http://localhost:3000/query',{method:'GET',mode:'cors'}).then((response)=>
            response.json() ).then((json)=>{setCurrentQuery(json.query);})
    }
  },[getQuery])
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleQueryChange = (event) => {
      setQuery(event.target.value);
    };
    
    const handleSearch = () => {
        if(!isSearch)
        {
            props.handleSearch("http://localhost:3000/search?limit=9&"+`title=${title}`+`&description=${description}&`);
            setIsSearch(true);
        }
        else
        {
            props.handleSearch("http://localhost:3000/all?limit=9&");
            setIsSearch(false);
            setDescription('');
            setTitle('');
        }
    };
    
    const handleNewQuery = () => {
        fetch('http://localhost:3000/query',
        {method:'POST',
        mode:'cors',
        headers:{
            "content-type":"application/json",
        },
        body:JSON.stringify({
            query:query,
        }),
        }).then((response)=>response.json()).then((json)=>{console.log(json.message);})
        setQuery('');
        setPaused(false);   
  };

  const handlePause = () => {

    if(!paused)
    {
        fetch('http://localhost:3000/pause',{method:'POST',mode:'cors'}).then((response)=>response.json()).then((json)=>{console.log(json.message)})
        setPaused(true);
    }
    else
    {
        fetch('http://localhost:3000/start',{method:'POST',mode:'cors'}).then((response)=>response.json()).then((json)=>{console.log(json.message)})
        setPaused(false);
    }
  };
   const handleGetQuery=()=>{
    setGetQuery(true);
   }

  return (
    <div classtitle='query-bar' style={{display:'flex',justifyContent:'space-around',padding:'20px'}}>
     <div classtitle="search-block">
      <div>
        <label>Title:</label>
        <input
          className='text-input'
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div>
        <label>Description:</label>
        <input
        className='text-input'
          type="text"
          id="description"
          value={description}
          onChange={handleDescriptionChange}
        />
        <button className='button' onClick={handleSearch}>{isSearch?"Clear":"Search"}</button>
      </div>
      </div>
      <div classtitle='query-block'>
      <div>
        <label >New Query:</label>
        <input
        className='text-input'
          type="text"
          id="query"
          value={query}
          onChange={handleQueryChange}
          />
        <button className='button' style={{marginLeft:'10px'}} onClick={handleNewQuery}>Go</button>
      </div>
      <div style={{display:'flex',justifyContent:'space-between'}}>
      <label>Current Query:</label>
      <span style={{fontWeight:'bold'}}>{currentQuery}</span>
      <div>
        <button className='button' onClick={handleGetQuery}>Get Query</button>
      </div>
      <div>
        <button className='button' onClick={handlePause}>{!paused?'Pause':'Start'}</button>
      </div>
      </div>
      </div>
          </div>
  );
};

export default QueryBar;
