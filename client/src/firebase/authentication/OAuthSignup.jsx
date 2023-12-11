import { GoogleAuthProvider, FacebookAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import app from '../firebaseConfig';
import { server } from '../../server';

export default function OAuth() {
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);



      const { displayName, email, photoURL } = result.user;
      const [firstName, lastName] = displayName.split(" ");

      // Send a POST request using Axios
      await axios.post(
        `${server}/user/signup-google`,
        {
          fname: firstName,
          lname: lastName,
          email: email,
          photo: photoURL,
        },
        {
          withCredentials: true, // Include credentials in the request
        }
      );
      toast.success("User signed in successfully");
      navigate("/login");
    } catch (error) {
      console.error('Could not sign in with Google:', error);
      const errorMessage = error.response?.data?.message || "Error signing in with Google";
      toast.error(errorMessage);
    }
  };

  const handleFacebookClick = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      // Extract user details from the result
      const { displayName, email, photoURL } = result.user;
      const [firstName, lastName] = displayName.split(' ');

      // Send a POST request using Axios
      await axios.post(`${server}/user/signup-facebook`, {
        fname: firstName,
        lname: lastName,
        email: email,
        photo: photoURL,
      }, {
        withCredentials: true // Include credentials in the request
      });
      toast.success("User signed in with Facebook successfully");
      navigate('/login');
    } catch (error) {
      console.error('Could not sign in with Facebook:', error);
      toast.error("Error signing in with Facebook");
    }
  };

  return (
    <div>
      <button
        onClick={handleGoogleClick}
        className="px-4 py-2 w-full border flex justify-center gap-3 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-100 dark:hover:shadow-md"
      >
        <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
        <span>Sign up with Google</span>
      </button>

      <button
        type="button"
        onClick={handleFacebookClick}
        className="px-4 py-2.5 w-full justify-center mt-3 inline-flex items-center rounded text-white text-base tracking-wider font-semibold border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22px"
          fill="#fff"
          className="inline mr-2"
          viewBox="0 0 167.657 167.657"
        >
          <path
            d="M83.829.349C37.532.349 0 37.881 0 84.178c0 41.523 30.222 75.911 69.848 82.57v-65.081H49.626v-23.42h20.222V60.978c0-20.037 12.238-30.956 30.115-30.956 8.562 0 15.92.638 18.056.919v20.944l-12.399.006c-9.72 0-11.594 4.618-11.594 11.397v14.947h23.193l-3.025 23.42H94.026v65.653c41.476-5.048 73.631-40.312 73.631-83.154 0-46.273-37.532-83.805-83.828-83.805z"
            data-original="#010002"
          />
        </svg>
        Sign up with Facebook
      </button>
    </div>

  );
}