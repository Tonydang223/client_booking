import axios from "axios";
import React, { useState } from "react";
import ErrorMess from "../../components/ErrorMessage/ErrorMess";
import validate from "../../helper/validations";
import apiHandler from "../../services/api/auth";
import PhoneInput from 'react-phone-input-2'
import {toast} from 'react-toastify'
import 'react-phone-input-2/lib/style.css'
import 'react-toastify/dist/ReactToastify.css'
import '../style.css'
import { Link } from "react-router-dom";
const Register = () => {

  const initalValues ={
    name: "",
    email: "",
    password: "",
    confPass: "",
    address: "",
    phoneNumber: "",
  }
  const [values, setValues] = useState(initalValues);
  const [errs, setErrs] = useState({});
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    let objErr = {};
    console.log(values);
    console.log(validate.isEmpty(values));
    console.log(errs);
    console.log(objErr);
    console.log(errs.username)
    if (!validate.isEmpty(values.name)) {
      objErr.username = "UserName can not be empty";
    } else if (!validate.isLimitLenght(values.name,6,100)) {
      objErr.username = "Username can not smaller than 6 characters";
    }

    if (!validate.isEmpty(values.email)) {
      objErr.email = "Email can not be empty";
    } else if (!validate.isMailer(values.email)) {
      objErr.email = "Wrong format email";
    }

    if (!validate.isEmpty(values.password)) {
      objErr.password = "Password can not be empty";
    }else if(!validate.isLimitLenght(values.password,6,15)){
      objErr.password = "Password can not be bigger 15 and must smaller than 6";
    } 

    if (!validate.isEmpty(values.confPass)) {
      objErr.confPass = "confirm pass can not be empty";
    }else if (values.confPass !== values.password) {
        objErr.confPass = "You need confirm pass again";
    }

    if (Object.keys(objErr).length > 0) {
      setErrs(objErr);
    } else {
         try {
          const res =await apiHandler.signup(values)
          console.log(res)
          toast.success(res?.success?.message,{autoClose:4000,position:toast.POSITION.TOP_RIGHT,})
          setValues(initalValues);
        } catch (error) {
             if(error){
                toast.error(error.response.data.message,{autoClose:4000,position:toast.POSITION.TOP_RIGHT,})
             }
         }
      console.log("OK");
      setErrs({});
    }
  };
  return (
    <section>
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-sm-6 outside">
            <div className="box-inside shadow p-4 mb-5 bg-white rounded">
              <div className="content">
                <h2>Sign Up</h2>
              </div>
              <form onSubmit={onSubmit}>
                <div className="inputText">
                  <label className="form-label">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={values.name}
                    className = {`form-control ${errs.username?'redBorder':'originBorder'}`}
                    placeholder="name"
                    onChange={onChange}
                  />
                  {errs.username ? <ErrorMess mgs={errs.username} /> : null}
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={values.email}
                    className = {`form-control ${errs.email?'redBorder':'originBorder'}`}
                    placeholder="email"
                    onChange={onChange}
                  />
                  {errs.email ? <ErrorMess mgs={errs.email} /> : null}
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={values.password}
                    className = {`form-control ${errs.password?'redBorder':'originBorder'}`}
                    placeholder="password"
                    onChange={onChange}
                  />
                  {errs.password ? <ErrorMess mgs={errs.password} /> : null}
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="text"
                    name="confPass"
                    value={values.confPass}
                    className = {`form-control ${errs.confPass?'redBorder':'originBorder'}`}
                    placeholder="Confirm password"
                    onChange={onChange}
                  />
                  {errs.confPass ? <ErrorMess mgs={errs.confPass} /> : null}
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    name="address"
                    className="form-control"
                    placeholder="Address"
                    value={values.address}
                    onChange={onChange}
                  />
                  <label className="form-label">Phone Number</label>
                  <PhoneInput
                    placeholder="Phone Number"
                    value={values.phoneNumber}
                    country={'vn'}
                    inputStyle={{width:'100%',height:'38px'}}
                    onChange={(num)=>setValues({...values,phoneNumber:num})}
                  />
                  {errs.phoneNumber ? (
                    <ErrorMess mgs={errs.phoneNumber} />
                  ) : null}
                </div>
                <div className="checkbox">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label className="form-check-label" for="flexCheckDefault">
                    Verify for checking policy of penzy booking. Please check in
                    box!!
                  </label>
                </div>
                <div className="buto">
                  <button type="submit" className="btn btn-primary w">
                    Sign Up
                  </button>
                </div>
              </form>
              <ul className="barline">
                <li></li>
                <li>or with continue</li>
                <li></li>
              </ul>
              <div className="otherb">
                <button type="button" className="btn btn-outline-primary">
                  Google
                </button>
                <Link to={'/signIn'} style={{textDecoration:'none'}}>
                <button type="button" className="btn btn-outline-primary">
                Already have account? Sign In
                </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
