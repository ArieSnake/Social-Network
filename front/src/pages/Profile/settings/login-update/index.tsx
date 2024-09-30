import { useForm } from "react-hook-form"
import { ILoginUpdateForm } from "../../../../lib/types"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { handleLoginUpdate } from "../../../../lib/api"
import { MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRow } from "mdb-react-ui-kit"
import { toast, ToastContainer } from "react-toastify"

export const LoginUpdate = () => {
    const{register, handleSubmit, formState:{errors}} = useForm<ILoginUpdateForm>()
    const [generalError,setGeneralError] = useState<string |null>(null)
    const navigate = useNavigate()

    const onSubmit = (data:{password:string, login:string}) => {
        handleLoginUpdate(data.password, data.login)
        .then(response => {
            if(response.status === 'ok'){
                toast.success('Login updated successfully!')
                navigate('/profile')
            }else{
                setGeneralError(response.message || 'Login update fail')
                toast.error(response.message || 'Login update failed')
            }
        })
        .catch(() => {
            setGeneralError('Network error or server is down')
            toast.error('Network error or server is down')
        })
    }
    return(
        <MDBContainer className="py-5" style={{ maxWidth: '600px' }}>
            <ToastContainer/>
            <MDBRow className="d-flex justify-content-center">
                <MDBCol md="12">
                    <MDBCard className="my-5">
                        <MDBCardBody className="p-5">
                            <h3 className="mb-4">Change Login</h3>
                            {generalError && <p className="text-danger">{generalError}</p>}

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-4">
                                    <MDBInput
                                        label="Current Password"
                                        type="password"
                                        {...register('password', { required: "Password is required" })}
                                        className={`${errors.password ? 'is-invalid' : ''}`}
                                    />
                                    {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                                </div>

                                <div className="mb-4">
                                    <MDBInput
                                        label="New Login"
                                        type="text"
                                        {...register('login', { required: "Login is required" })}
                                        className={`${errors.login ? 'is-invalid' : ''}`}
                                    />
                                    {errors.login && <div className="invalid-feedback">{errors.login.message}</div>}
                                </div>

                                <button type="submit" className="button-styles">Update Login</button>

                            </form>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}