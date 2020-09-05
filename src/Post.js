import React from 'react'
import './post.css';
import Avatar from '@material-ui/core/Avatar'
function Post({username ,caption,imageurl}) {
    return (
        <div className="post">
        <div className="post__header">
        <Avatar 
        className="post__avatar"
        src="/static/images/avatar/1.jpg" 
        alt="HAMMAD"
        />
        <h4>{username}</h4>
        </div>
        
       
        <img  className="post__image" alt="" src={imageurl} />
    <h4 className="post__text" ><strong>{username}</strong>{caption}</h4>
        </div>
    )
}

export default Post
