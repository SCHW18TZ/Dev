import React from 'react'
import { Link } from 'react-router-dom'
import {auth,provider,db,storage} from '../firebase'
import { signInWithPopup,createUserWithEmailAndPassword,updateProfile,sendEmailVerification } from 'firebase/auth'
import GoogleButton from 'react-google-button'
import { collection,addDoc } from 'firebase/firestore'
import {Toaster,toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {v4} from 'uuid'
import { useAuthState } from 'react-firebase-hooks/auth'

const Register = () => {


  let navigate = useNavigate()

  const userCollectionRef = collection(db,'users')
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const username = e.target[0].value
    const email = e.target[1].value
    const password = e.target[2].value
    const selectedImage = e.target[3].value
    const result = await createUserWithEmailAndPassword(auth, email, password);
    updateProfile(result.user, {
      displayName: username,
    });
    const emailSen = await sendEmailVerification(auth.currentUser)
    if (selectedImage == null) return;
    const ImageRef = ref(storage, `ProfilePics/${selectedImage.name + v4()}`);
    uploadBytes(ImageRef, selectedImage).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        updateProfile(result.user, {
          photoURL: url,
        });
        addDoc(userCollectionRef, {
          username: result.user.displayName,
          email: result.user.email,
          profilePhoto: url,
          uid: result.user.uid,
    })
      });
    });
    navigate("/");
    toast.success("Registed successfully ")
  }

  const signInWithGoogle = async ()=>{
    const result = await signInWithPopup(auth,provider)
    console.log(result.user?.displayName);
    await addDoc(userCollectionRef,{
      username:result.user.displayName,
      email:result.user.email,
      uid:result.user.uid,
      photoUrl:result.user.photoURL
    })
    navigate('/')
  }
  const [user] = useAuthState(auth);
  console.log(user)

  return (
    <div>
      <Toaster/>
      <form onSubmit={handleSubmit}>
        
        <input type="text" required placeholder='Username'/>
        <input required type="email"  placeholder='Email'/>
        <input required type="password" placeholder='Password'/>
        <input type="file" accept='image/*' name="" id="" />
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <Link to='/login'>Login</Link></p>

    <GoogleButton onClick={signInWithGoogle}/>
    </div>
  )
}

export default Register