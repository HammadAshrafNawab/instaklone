import React,{useState} from 'react'
import {Button } from '@material-ui/core'
import { db , storage ,firebase} from './firebase';


function ImageUpload({username}) {
    const [caption,setCaption] = useState('');
    const [progress,setProgress] = useState(0);
    const [image,setimage] = useState(null);


const handleChange = (e) =>
{
    if(e.target.files[0])
    {
        setimage(e.target.files[0])
    }
};

const handleUpload = () =>
{
const uploadTask = storage.ref(`images/${image.name}`).put(image);
uploadTask.on(
    "state_changed",
    (snapshot)=> {
        //progress
        const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes)  * 100
        )
        setProgress(progress);
    },
    (error)=> {
        //Error
        console.log(error);
        alert(error.message);
    },
    ()=> 
    {
        //complete
        storage
        .ref("images")
        .child(image.name)
        .getDownloadURL()
        .then(url => {
          
         //post img in db
         db.collection("posts").add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
           caption: caption,
           imageUrl : url,
           username:username

         });
         setProgress(0);
         setCaption("");
         setimage(null);
        });
    }
)
}



    return (
        <div>
            <progress value={progress} max="100" />
            <input type="text"  onChange={event => setCaption(event.target.value)} placeholder="Enter Caption" value={caption}  />

            
            <input type="file" onChange={handleChange} />
            
            
            <Button onClick={handleUpload}>Upload</Button>
        
        
        </div>
    )
}

export default ImageUpload
