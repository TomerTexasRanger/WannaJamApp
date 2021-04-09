import { useEffect } from "react";
import "./App.css";
import Footer from "./components/layout/Footer";
import NavBar from "./components/layout/NavBar";
// import Landing from "./components/layout/Landing";
import Wanted from "./components/Wanted";
import About from "./components/About";
import { Switch, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//redux
import { Provider } from "react-redux";
import store from "./store";
import { getCurrentUser } from "./actions/authActions";
import setAuthToken from "./services/httpServices";

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
