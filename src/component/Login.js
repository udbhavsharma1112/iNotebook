import React, { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Login = (props) => {
    const [cred,setCred]=useState({email:"",password:""});
    const {showAlert}=props;
    let history=useHistory();
    const handlesubmit= async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
             
            },
            body: JSON.stringify({ email:cred.email, password:cred.password})
          });
          const json=await response.json();
        //   console.log(json);
          if(json.success) {
              //dfd 
              localStorage.setItem('token',json.authdata);
              history.push("/");
              showAlert("Logged in successfully","success")
          }
          else {
              showAlert("Invalid email or password","danger");
          }
    }
    const onChange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value })
      }
  return (
    <div>
      <form onSubmit={handlesubmit}>
  <div className="mb-3 my-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control"value={cred.email} id="email" name='email' aria-describedby="emailHelp" onChange={onChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control"value={cred.password} id="Password" name='password' onChange={onChange}/>
  </div>
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>
  )
}

export default Login
