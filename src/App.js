import NavBar from './components/NavBar'
import About from './pages/About'
import Footer from './components/Footer'
import SignIn from './pages/auth/Signin'
import { useEffect, useState } from 'react'
import './App.css';
import { Route } from 'react-router-dom/cjs/react-router-dom.min'

function App() {
  
  const currentUser = useCurrentUser();
  const [authenticatedUser, setAuthenticatedUser] = useState(false);
  const [tokensChecked, setTokensChecked] = useState(false);

  useEffect(() => {
    const checkTokens = () => {
      const refreshTokenTimeStamp = localStorage.getItem('refreshTokenTimestamp');
      if (refreshTokenTimeStamp) {
        setAuthenticatedUser(true);
      } else {
        setAuthenticatedUser(false);
      }
      setTokensChecked(true);
    };
    checkTokens();
  }, [currentUser])

  return (
    <div>
      <NavBar />
      <SuccessMessage />
        <div>
          {tokensChecked ? (
            <switch>
              <Route exact path="/" render={() => <Home />}
              <Route exact path="/signin" render={() => <SignIn />}
              <Route exact path="/organise" render={() => (
        authenticatedUser ? ( <Organise /> ) : ( <Redirect to={{pathname: "/signin"}} />)
              )} />
              <Route exact path="/miscellaneous" render={() => (
                authenticatedUser ? ( <Miscellaneous /> ) : ( <Redirect to={{pathname: "/signin"}} />)
              )} />
              <Route exact path="/focus/create" render={() => (
                authenticatedUser ? ( <Refinement /> ) : ( <Redirect to={{pathname: "/signin"}} />)
              )} />
              <Route exact path="/focus/:id" render={() => (
                authenticatedUser? ( <Refine /> ) : ( <Redirect to={{pathname: "/signin"}} />)
              )} />
              <Route exact path="/takeaction" render={() => (
                authenticatedUser ? ( <TakeAction /> ) : ( <Redirect to={{pathname: "/signin"}} />)
                )} />
              <Route render={() => <NotFound />} />
            </switch>
            ) : (
              <div>
                Just checking authentication status ....
              </div>
            )}
          </div>
        <Footer />
      </div>
    );
  }

export default App;