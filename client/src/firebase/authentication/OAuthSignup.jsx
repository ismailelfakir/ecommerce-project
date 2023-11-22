import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import  app  from '../firebaseConfig'; 
import { server } from '../../server';

export default function OAuth() {
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      // Extract user details from the result
      const { displayName, email, photoURL } = result.user;
      const [firstName, lastName] = displayName.split(' ');

      // Send a POST request using Axios
      await axios.post(`${server}/user/signup-google`, {
        fname: firstName,
        lname: lastName,
        email: email,
        photo: photoURL,
      }, {
        withCredentials: true // Include credentials in the request
      });
      toast.success("User signed in successfully");
      navigate('/login');
    } catch (error) {
      console.error('Could not sign in with Google:', error);
      toast.error("Error signing in with Google");
    }
  };

  return (
    <button 
    onClick={handleGoogleClick}
    className="px-4 py-2 w-full border flex justify-center gap-3 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
        <img class="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
        <span>Login with Google</span>
    </button>
  );
}