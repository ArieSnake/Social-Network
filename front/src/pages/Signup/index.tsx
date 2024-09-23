import React from 'react'
import {
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBInput,
} from 'mdb-react-ui-kit'
import { Link } from 'react-router-dom'
import { InputUser } from '../../lib/types'
import { handleSignup } from '../../lib/api'
import { useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function Signup() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<InputUser>()

    const onSubmit = (data: InputUser) => {
        handleSignup(data)
        .then(response => {
            console.log(response)
            reset()

            toast.success('Signup successful! ')
        })
        .catch(error => {
            console.error('Signup failed:', error)
            toast.error('Signup failed! Please try again.')
        })
    }

    return (
        <MDBContainer fluid>
            <ToastContainer /> 
            <MDBRow className='d-flex justify-content-center align-items-center'>
                <MDBCol lg='8'>
                    <MDBCard className='my-5 rounded-3' style={{ maxWidth: '600px' }}>
                        <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img3.webp' className='w-100 rounded-top' alt="Sample photo" />
                        <MDBCardBody className='px-5'>
                            <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Registration Info</h3>
                            <p>Already have an account? <Link to={'/login'}>Login Now</Link></p>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Name'
                                    type='text'
                                    {...register('name', { required: "Name is required" })}
                                />
                                <div>{errors.name && <p className='text-danger'>{errors.name.message}</p>}</div>
                                
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Surname'
                                    type='text'
                                    {...register('surname', { required: "Surname is required" })}
                                />
                                <div>{errors.surname && <p className='text-danger'>{errors.surname.message}</p>}</div>
                                
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Login'
                                    type='text'
                                    {...register('login', { required: "Login is required" })}
                                />
                                <div>{errors.login && <p className='text-danger'>{errors.login.message}</p>}</div>
                                
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Password'
                                    type='password'
                                    {...register('password', { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters long" } })}
                                />
                                <div>{errors.password && <p className='text-danger'>{errors.password.message}</p>}</div>
                                
                                <button type='submit' className='btn btn-outline-info'>Submit</button>
                            </form>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}
