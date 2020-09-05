import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Post';
import { db , auth } from './firebase';
import Modal from '@material-ui/core/Modal';
import { makeStyles} from  '@material-ui/core/styles';
import {Button , Input } from '@material-ui/core'
import ImageUpload from './ImageUpload';

function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [post,setpost] = useState([]);
  const [open,setopen] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const [email,setemail] = useState("")
  const [username,setusername] = useState("")
  const [password,setpassword] = useState("")
  const [user,setuser] = useState(null)
  const [opernsignin,setopensignin] = useState(false)
  const [sign,setsignopen] =useState(false)

useEffect(()=>{
 const unsubscribe =  auth.onAuthStateChanged((authUser)=> {
if(authUser)
{
  console.log(authUser)
  setuser(authUser)
//login
}
else {
  setuser(null)
//logout
}


})
return () => {unsubscribe() }

},[user,username])


  const signup = (event) => 
  {
event.preventDefault();

auth
.createUserWithEmailAndPassword(email,password)
.then((authUser) => {

  return  authUser.user.updateProfile({
    displayName:username
  })
  
    })
.catch((error) => alert(error.message))
  }

  const signin = (event) =>
  {
event.preventDefault()

auth.signInWithEmailAndPassword(email,password)
.catch((error)=> alert(error.message))
setsignopen(false)

  }
 

  
  useEffect(()=> {

    db.collection('posts').onSnapshot(snapshot => {
    
      setpost(snapshot.docs.map(doc => ({id:doc.id , post:doc.data()}
      
      )))})
    } , [])


  return (

    <div className="app" >
      {
        user?.displayName ?
        (
          <ImageUpload username={user.displayName} />
        ):
        (
          <h3> SORRY PLZ LOGIN</h3>
        )
      }
     
      
      
  <div className="app__headers" >

<img  className="app__headerimage" alt="" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"/>
<h1>HAMMAD</h1>
<div>
  {user ? (

<Button onClick={()=> auth.signOut()}>Logout </Button>
  )
  : (
    <div className="app__LoginContainer"> 
    <Button type="button" onClick={()=> setsignopen(true)}>
    SIGNIN
  </Button>
    <Button type="button" onClick={()=> setopen(true)}>
    SIGNUP
    </Button>
    </div>
  )
  }
    
     
      <Modal
        open={open}
        onClose={()=> setopen(false)}
    >
      <div style={modalStyle} className={classes.paper}>

      <center>
      <div className="app__headers" >
 




</div>
      </center>
      <form className="app__signup">
          <center>
  <img  
className="app__headerimage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="insta"

/> 
</center>

<Input 
placeholder="username"
value={username}
type="text"
onChange={(e)=>setusername(e.target.value)}
/>
<Input 
placeholder="email"
value={email}
type="text"
onChange={(e)=>setemail(e.target.value)}
/>
<Input 
placeholder="password"
value={password}
type="text"
onChange={(e)=>setpassword(e.target.value)}
/>
<Button type="submit" onClick={signup} >Sign Up</Button>


      </form>


        </div>
      
        
      </Modal>
      <Modal
        open={sign}
        onClose={()=> setsignopen(false)}
    >
      <div style={modalStyle} className={classes.paper}>

      <center>
      <div className="app__headers" >
 




</div>
      </center>
      <form className="app__signup">
          <center>
  <img  
className="app__headerimage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="insta"

/> 
</center>


<Input 
placeholder="email"
value={email}
type="text"
onChange={(e)=>setemail(e.target.value)}
/>
<Input 
placeholder="password"
value={password}
type="text"
onChange={(e)=>setpassword(e.target.value)}
/>
<Button type="submit" onClick={signin} >Sign Up</Button>


      </form>


        </div>
      
        
      </Modal>
    </div>
      
  </div>

 
  {
        post.map(({post,id }) => 
          (<Post key={id} username={post.username} caption={post.caption} imageurl={post.imageurl} />))
      }



    </div>
  );
}

export default App;
