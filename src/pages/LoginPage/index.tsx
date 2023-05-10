import React from 'react'
import styles from './LoginPage.module.sass'
import { Formik } from 'formik';
import { Button } from '../../components/ui/Button';
import { OpenAPI, UserService } from '../../generated/api';
import { useAppDispatch } from '../../redux/store';
import { setCurrentUser, setSigninState } from '../../redux/user/slice';

import {useNavigate} from 'react-router-dom'

export const LoginPage = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    return (
    <div className={styles.layout}>
        <div className={styles.formWindow}>
            <div className={styles.caption}>Login</div>
            <Formik
            initialValues={{ email: '', password: '' }}
            validate={values => {
                const errors: Partial<typeof values> = {};;
                if (!values.email) {
                    errors.email = 'Email is Required!';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = 'Invalid Email address';
                };
                if (!values.password){
                    errors.password = 'Password is Required!'
                } else if (values.password.length < 8){
                    errors.password = 'Password is too short'
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                UserService.postApiUsersLogin({email: values.email, password: values.password})
                .then(response => {
                    console.log(response)
                    OpenAPI.TOKEN = response.access_token
                    dispatch(setSigninState(true))
                    window.localStorage.setItem("token", response.access_token)
                    UserService.getApiUsersMe().then(response => {
                        dispatch(setCurrentUser(response))
                        navigate("/profile")
                    })
                }).catch(err => {
                    console.log("Error. Maybe bad credentials?")
                })
            }}
            >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
            }) => (
                <form onSubmit={handleSubmit}>
                    <input
                        placeholder='Email'
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                    />
                    <div className={styles.errors}>{errors.email && touched.email && errors.email}</div>
                    <input
                        placeholder='Password'
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                    />
                    <div className={styles.errors}>{errors.password && touched.password && errors.password}</div>
                    <Button onClick={handleSubmit} text='Login!'/>
                </form>
            )}
            </Formik>
        </div>
        <div className={styles.formWindow}>
            <div className={styles.caption}>Register</div>
            <Formik
            initialValues={{ name: '', email: '', password: '', repeat: ''}}
            validate={values => {
                const errors: Partial<typeof values> = {}
                if(!values.name) {
                    errors.name = 'Name is Required!';
                } else if (values.name.length < 5){
                    errors.name = 'Name is too short'
                }
                if (!values.email) {
                    errors.email = 'Email is Required!';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = 'Invalid Email address';
                };
                if (!values.password){
                    errors.password = 'Password is Required!'
                } else if (values.password.length < 8){
                    errors.password = 'Password is too short'
                }
                if(values.password !== values.repeat){
                    errors.repeat = 'Passwords do not match'
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                UserService.postApiUsersRegister({name: values.name, email: values.email, password: values.password})
                .then(response => {
                    console.log(response)
                    alert('Successfully registered!')
                })
            }}
            >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
            }) => (
                <form onSubmit={handleSubmit}>
                    <input
                        placeholder='Name'
                        type="text"
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                    />
                    <div className={styles.errors}>{errors.name && touched.name && errors.name}</div>
                    <input
                        placeholder='Email'
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                    />
                    <div className={styles.errors}>{errors.email && touched.email && errors.email}</div>
                    <input
                        placeholder='Password'
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                    />
                    <div className={styles.errors}>{errors.password && touched.password && errors.password}</div>
                    <input
                        placeholder='Repeat'
                        type="password"
                        name="repeat"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.repeat}
                    />
                    <div className={styles.errors}>{errors.repeat && touched.repeat && errors.repeat}</div>
                    <Button onClick={handleSubmit} text='Register!'/>
                </form>
            )}
            </Formik>
        </div>
    </div>
  )
}
