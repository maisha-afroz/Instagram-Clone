import React, {useState,useEffect} from 'react';
import './App.css';
import Post from './Post';
import {db,auth} from './firebase' ;
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import{Button, Input} from '@material-ui/core';
import ImageUpload from './ImageUpload';
import InstagramEmbed from 'react-instagram-embed';

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
  const [posts, setPosts]= useState([]);
  const [open, setOpen]= useState(false);
  const [openSignIn, setOpenSignIn]= useState(false);  
  const [modalStyle] =useState(getModalStyle);
  const [userName, setUserName]= useState('');
  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('');
  const [user, setUser]= useState('null');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser){
        console.log(authUser);
        setUser(authUser);
       
  }else{
    setUser(null);
  }
 })

 return() => {
   unsubscribe();
 }
} ,[user,userName]);
  
 
  useEffect(() => {
    
    db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map (doc => ({
        id:doc.id,
        post:doc.data()
      })));
    })
  },[]);

  const signUp = (event) => {

    event.preventDefault();

    auth
    .createUserWithEmailAndPassword(email,password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: userName,
      })
    })
    .catch((error) => alert(error.message));

    setOpen(false);

  }

  const signIn = (event) => {
    event.preventDefault();

    auth
    .signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message))

    setOpenSignIn(false);

  }

  return (
    <div className="app">
       { }

       <Modal
        open={open}
        onClose={() => setOpen(false)}
       
      >
         <div style={modalStyle} className={classes.paper}>
        <form className="app_signup">
         <center>
         <img 
          className="app_headerImage"
          src="https://play-lh.googleusercontent.com/9ASiwrVdio0I2i2Sd1UzRczyL81piJoKfKKBoC8PUm2q6565NMQwUJCuNGwH-enhm00"
          alt=""
        />
         </center>
         <Input
            placeholder="username"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value) }
         />
         <Input
            placeholder="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value) }
         />

          <Input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value) }
         />

         <Button type="submit"onClick={signUp}>Sign Up</Button>
         </form>
         </div>
      </Modal>
       
      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
       
      >
         <div style={modalStyle} className={classes.paper}>
        <form className="app_signup">
         <center>
         <img 
          className="app_headerImage"
          src="https://play-lh.googleusercontent.com/9ASiwrVdio0I2i2Sd1UzRczyL81piJoKfKKBoC8PUm2q6565NMQwUJCuNGwH-enhm00"
          alt=""
        />
         </center>
         
         <Input
            placeholder="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value) }
         />

          <Input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value) }
         />

         <Button type="submit"onClick={signIn}>Log in</Button>
         </form>
         </div>
      </Modal>
    
      <div className="app_header">
        <img 
          className="app_headerImage"
          src="https://play-lh.googleusercontent.com/9ASiwrVdio0I2i2Sd1UzRczyL81piJoKfKKBoC8PUm2q6565NMQwUJCuNGwH-enhm00"
          alt=""
        />
        {user ? (
          <Button onClick={() => auth.signOut()}>Log out</Button>
      ): (
        <div className="app__loginContainer">
           <Button onClick={() => setOpenSignIn(true)}>Login</Button>
           <Button onClick={() => setOpen(true)}>Sign Up</Button>
        </div>
        
      )}
      </div>
     
     <div className="app_posts" >
     <div className="app_leftPosts">
      {
        posts.map(({id,post}) => (
          <Post key={id} postId={id} user={user} userAvatar={post.userAvatar} userName={post.userName} caption={post.caption} imageUrl={post.imageUrl}/>
        ))
      }
    </div>
   
 <div className="app_rightPosts">  
 <InstagramEmbed
   url='https://www.instagram.com/p/CKWtSzTBMRG/npm i react-instagram-embed'
   clientAccessToken='123|456'
   maxWidth={320}
   hideCaption={false}
   containerTagName='div'
   protocol=''
   injectScript
   onLoading={() => {}}
   onSuccess={() => {}}
   onAfterRender={() => {}}
   onFailure={() => {}}
 />
 </div> 
 </div>


     {user?.displayName ? (
        <ImageUpload userName={user.displayName}/>
      ) : (
        <h3>Sorry! You need to login to upload.</h3>
        
      )}
      <h6> © 2021 <strong> Maisha Afroz.</strong> All Rights Reserved </h6>
    </div>
    
   
   
     
  
  );
}

export default App;
