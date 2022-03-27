import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ErrorMess from "../../components/ErrorMessage/ErrorMess";
import { AppContext } from "../../redux/context";
import apiHandler from "../../services/api/auth";
import { setLocalStorage } from "../../utils/func";
import validate from "./../../helper/validations";
import { authAction } from './../../redux/actions/auth';

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const {dispatch} = useContext(AppContext)
  
  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const [errs, setErrs] = useState({});
  const onSubmit = async (e) => {
    e.preventDefault();
    let objErr = {};
    console.log(objErr)
    console.log(validate.isEmpty(values.email))
    if (!validate.isEmpty(values.email)) {
      objErr.email = "Email can not be empty";
    } else if (!validate.isMailer(values.email)) {
      objErr.email = "Wrong format email";
    }

    if (!validate.isEmpty(values.password)) {
      objErr.password = "Password can not be empty";
    } else if (!validate.isLimitLenght(values.password, 6, 15)) {
      objErr.password = "Password can not be bigger 15 and must smaller than 6";
    }

    if(Object.keys(objErr).length>0){
      setErrs(objErr)
    }else{
      try {
        const res =await apiHandler.signin(values)
        console.log(res)
        const user = res?.user
        dispatch(authAction(user))
        toast.success(res?.message,{autoClose:4000,position:toast.POSITION.TOP_RIGHT,})
        dispatch(authAction(user));
        setLocalStorage('refToken',res.refreshToken);
        setLocalStorage('accessToken',res.accessToken)
        setLocalStorage('isRole',user?.role)
      } catch (error) {
           if(error){
              toast.error(error.response.data.message,{autoClose:4000,position:toast.POSITION.TOP_RIGHT,})
           }
       }
      setErrs({})
    }
  };
  return (
    <section>
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-sm-6 outside">
            <div className="box-inside shadow p-4 mb-5 bg-white rounded">
              <div className="content">
                <h2>Sign In</h2>
              </div>
              <form onSubmit={onSubmit}>
              <div className="inputText">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className = {`form-control ${errs.email?'redBorder':'originBorder'}`}
                  placeholder="Email"
                  name="email"
                  value={values.email}
                  onChange={onChange}
                />
                {errs.email ? <ErrorMess mgs={errs.email} /> : null}
                <label className="form-label">Password</label>
                <input
                  type="password"
                  value={values.password}
                  className = {`form-control ${errs.password?'redBorder':'originBorder'}`}
                  placeholder="Password"
                  name="password"
                  onChange={onChange}
                />
                {errs.password ? <ErrorMess mgs={errs.password} /> : null}
              </div>
              <div className="buto">
                <button type="submit" className="btn btn-primary w">
                  Sign In
                </button>
              </div>
              </form>
              <div className="textTransfer">
                <Link to={'/signUp'}>Create an account</Link>
                <Link to={'/forgotPass'}>Forgot Password</Link>
              </div>
              <ul className="barline">
                <li></li>
                <li>or with continue</li>
                <li></li>
              </ul>
              <div className="otherb">
                <button type="button" className="btn btn-outline-primary">
                  Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
