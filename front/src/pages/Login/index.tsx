import React, { useState } from 'react'
import {
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBInput,
} from 'mdb-react-ui-kit'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { handleLogin } from '../../lib/api'
import { LoginUser } from '../../lib/types'

export function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginUser>()
    const navigate = useNavigate()

    const [generalError, setGeneralError] = useState<string | null>(null)

    const onSubmit = (data: LoginUser) => {
        handleLogin(data)
            .then(response => {
                if (response.status === 'ok') {
                    navigate('/profile')
                } else {
                    setGeneralError(response.message || 'Login failed')
                }
            })
            .catch(() => {
                setGeneralError('Network error or server is down')
            })
    }
    

    return (
        <MDBContainer fluid>
            <MDBRow className='d-flex justify-content-center align-items-center'>
                <MDBCol lg='8'>
                    <MDBCard className='my-5 rounded-3' style={{ maxWidth: '600px' }}>
                        <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img3.webp' className='w-100 rounded-top' alt="Sample photo" />
                        <MDBCardBody className='px-5'>
                            <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Login Info</h3>
                            <p>Don't you have an account? <Link to={'/'}>Signup Now</Link></p>

                            {generalError && <p className="text-danger">{generalError}</p>}

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Login'
                                    type='text'
                                    {...register('login', { required: "Login is required" })}
                                />
                                {errors.login && <p className="text-danger">{errors.login.message}</p>}

                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Password'
                                    type='password'
                                    {...register('password', { required: "Password is required" })}
                                />
                                {errors.password && <p className="text-danger">{errors.password.message}</p>}

                                <button type='submit' className='btn btn-outline-info'>Submit</button>
                            </form>

                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}
