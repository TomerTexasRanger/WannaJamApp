import { useEffect } from 'react';
import './App.css';
import Footer from './components/layout/Footer';
import NavBar from './components/layout/NavBar';
// import Landing from "./components/layout/Landing";
import Wanted from './components/Wanted';
import About from './components/About';
import { Switch, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './components/profiles/profile/Dashboard';
import ProtectedRoute from './components/common/ProtectedRoute';
import CreateProfile from './components/profiles/profile-forms/CreateProfile';
import EditProfile from './components/profiles/profile-forms/EditProfile';
import AddSkills from './components/profiles/profile-forms/AddSkills';
import Profiles from './components/profiles/profiles/Profiles';
import Posts from './components/posts/Posts';
import Post from './components/posts/post/Post';

//redux
import { Provider } from 'react-redux';
import store from './store';
import { getCurrentUser } from './actions/authActions';
import setAuthToken from './services/httpServices';
import AddEducation from './components/profiles/profile-forms/AddEducation';
import Profile from './components/profiles/profile/Profile';
import AddLink from './components/profiles/profile-forms/AddLink';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  //Get current user whenever app reloads
  useEffect(() => {
    store.dispatch(getCurrentUser());
  }, []);
  return (
    <>
      <Provider store={store}>
        <ToastContainer />
        <header>
          <NavBar />
        </header>
        <main style={{ minHeight: 900 }}>
          <Switch>
            <Route path="/signin" component={Signin} />
            <Route path="/about" component={About} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/" component={Wanted} />
            <ProtectedRoute path="/dashboard" component={Dashboard} />
            <ProtectedRoute path="/create-profile" component={CreateProfile} />
            <ProtectedRoute path="/edit-profile" component={EditProfile} />
            <ProtectedRoute path="/add-skills" component={AddSkills} />
            <ProtectedRoute path="/add-link" component={AddLink} />
            <ProtectedRoute path="/add-education" component={AddEducation} />
            <ProtectedRoute path="/profiles" component={Profiles} />
            <ProtectedRoute path="/profile/:id" component={Profile} />
            <ProtectedRoute path="/posts" component={Posts} />
            <ProtectedRoute path="/post/:id" component={Post} />
          </Switch>
        </main>
        <footer>
          <Footer />
        </footer>
      </Provider>
    </>
  );
}

export default App;
