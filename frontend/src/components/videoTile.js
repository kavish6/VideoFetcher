import React from 'react'
import './videoTile.css'
const VideoTile = (video) => {
  return (
    <a key={video._id} href={video.url} className='card-container' target="_blank"  rel="noopener noreferrer">
    <div className="card" >
      <img src={video.thumbnail} alt="Thumbnail" className="thumbnail" />
      <div className="content">
        <h2 className="title">{video.title}</h2>
        <p className="description">{video.description}</p>
      </div>
    </div>
    </a>
  )
}

export default VideoTile