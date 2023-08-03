import React from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import { useForm } from 'react-hook-form';
import Loading from '../../../Shared/Loading';
import './Login.css';


const Login = () => {

    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);
  
    const {
      register,
      formState: { errors },
      handleSubmit,
    } = useForm();

const onSubmit = data => {
        signInWithEmailAndPassword(data.email, data.password);
        
    }
  
    if(loading){
      return <Loading></Loading>
    }
    if(user){
      navigate(from,{replace: true});
    }

    return (
        <div class="login-section">
            <div class="container login-form">
                <div>
                <div class="login-wrapper">
                    <div class="section-content">
                        <h1 class="title">Welcome Back</h1>
                        <p>Login with your account to continue.</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ul class="default-form-list">
                            <li class="single-form-item">
                                <label for="name" class="visually-hidden">Name</label>
                                <input {...register("email", { required: true })} aria-invalid={errors.email ? "true" : "false"} type="email" placeholder="Enter your email" /> 
                                <span class="icon"><i class="icon icon-carce-user"></i></span>
                            </li>
                            <li class="single-form-item">
                                <label for="password" class="visually-hidden">Password</label>
                                <input {...register("password", { required: true })} aria-invalid={errors.password ? "true" : "false"} type="password" placeholder="Enter your password"  />
                                <span class="icon"><i class="icon icon-carce-eye"></i></span>
                            </li>
                            <li class="single-form-item">
                                <input class="btn btn--block btn--radius btn--size-xlarge btn--color-white btn--bg-maya-blue text-center" type="submit" value="Login" />
                            </li>
                        </ul>
                    </form>                  
                </div>
                <div class="create-account-text btn--color-radical-white text-center">Don't have an account? <Link to='/register' class="btn--color-radical-red">Create now</Link></div>
                <div class="page-progress-wrapper">
                </div>
                </div>
            </div>
        </div>
    );
};

export default Login;