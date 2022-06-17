import React,{useEffect} from 'react'
import {
  useLocation,Link
} from "react-router-dom";
import { useHistory } from 'react-router-dom';

export default function Navbar() {
  const history=useHistory();
const handlelogout=()=>
{
  localStorage.removeItem('token');
  history.push('/login');
}
  let location = useLocation();
  useEffect(() => {
   console.log(location);
  }, [location]);

  return (
  
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">iNotebook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"?"active":""}`} to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link  className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
        </li>
      </ul>
      {!localStorage.getItem('token') ? <form className="d-flex">
      <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
      <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
      </form> : <button className="btn btn-primary mx-1" onClick={handlelogout}>Logout</button>}
    </div>
  </div>
</nav>
  
  )
}
