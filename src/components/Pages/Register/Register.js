import React, { useState } from 'react';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import Loading from '../../../Shared/Loading';
import { useForm } from 'react-hook-form';
import './Register.css';

const Register = () => {
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false); // Added state for loading

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const onSubmit = async data => {
        setIsLoading(true); // Start loading state
        try {
            await createUserWithEmailAndPassword(data.email, data.password);
            navigate('/'); // Navigate after successful registration
        } catch (error) {
            console.error('Registration error:', error);
            // Handle registration error if needed
        }
        setIsLoading(false); // End loading state
    };

    return (
        <div class="login-section mt-115 register-section">
            <div class="container register-form">
                <div>
                    <div class="login-wrapper">
                        <div class="section-content">
                            <h1 class="title">Sign Up</h1>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <ul class="default-form-list">
                                <li class="single-form-item">
                                    <label for="email" class="visually-hidden">Email</label>
                                    <input
                                        type="email"
                                        placeholder="Your Email"
                                        {...register('email', {
                                            required: {
                                                value: true,
                                                message: 'Email is Required',
                                            },
                                            pattern: {
                                                value: /[A-Za-z]{3}/,
                                                message: 'Provide a Valid Email',
                                            },
                                        })}
                                    />
                                    <span class="icon">
                                        <i class="icon icon-carce-mail"></i>
                                    </span>
                                </li>
                                <li class="single-form-item">
                                    <label for="password" class="visually-hidden">Password</label>
                                    <input
                                        type="password"
                                        placeholder="Your Password"
                                        {...register('password', {
                                            required: {
                                                value: true,
                                                message: 'Password is Required',
                                            },
                                            minLength: {
                                                value: 6,
                                                message: 'Minimum 6 Characters',
                                            },
                                        })}
                                    />
                                    <span class="icon">
                                        <i class="icon icon-carce-eye"></i>
                                    </span>
                                </li>
                                <li class="single-form-item">
                                    <input
                                        className='btn btn--block btn--radius btn--size-xlarge btn--color-white btn--bg-maya-blue text-center register-space-top'
                                        type="submit"
                                        value={isLoading ? 'Signing up...' : 'Signup Now'}
                                        disabled={isLoading}
                                    />
                                </li>
                            </ul>
                        </form>
                    </div>

                    <div class="sign-account-text text-center">
                        Already have an account? <Link to='/login' class="btn--color-radical-red">Login Now</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
