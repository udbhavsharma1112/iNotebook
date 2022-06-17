import React, { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Signup = (props) => {
    const [cred,setCred]=useState({name:"",email:"",password:"",cpassword:""});
    const{ showAlert}=props;
    const {name,email,password,cpassword}=cred;
    let history=useHistory();
    const handlesubmit= async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
             
            },
            body: JSON.stringify({ name,email, password})
          });
          const json=await response.json();
        //   console.log(json);
          if(json.success) {
              //dfd
              localStorage.setItem('token',json.authdata);
              history.push("/");
              showAlert("Account created successfully","success");
          }
          else {
            showAlert("Invalid input or email already exist","danger");
          }
    }
    const onChange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value })
      }
  return (
    <div className='container my-3'>
      <form onSubmit={handlesubmit}>
      <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" aria-describedby="emailHelp" name='name' onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name='email' onChange={onChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name='password' onChange={onChange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Conform Password</label>
    <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} minLength={5} required/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup
