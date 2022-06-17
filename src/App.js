import Navbar from './component/Navbar.js';
import Home from './component/Home.js';
import About from './component/About.js';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NoteState from './context/notes/NoteState.js';
import Alert from './component/Alert.js';
import Signup from './component/Signup.js';
import Login from './component/Login.js';
function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 1500);
  }
  return (

    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
            <Switch>
              
              <Route key={1} exact path="/"> <Home  showAlert={showAlert}/></Route>
              <Route key={2} exact path="/about"> <About /></Route>
              <Route key={3} exact path="/login"> <Login showAlert={showAlert}/></Route>
              <Route key={4} exact path="/signup"> <Signup showAlert={showAlert}/></Route>
            </Switch>
          </div>
        </Router>

      </NoteState>
    </>

  );
}

export default App;
