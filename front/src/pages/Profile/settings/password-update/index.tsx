import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRow } from "mdb-react-ui-kit";
import { IPasswordUpdateForm } from "../../../../lib/types";
import { handlePasswordUpdate } from "../../../../lib/api";
import { toast, ToastContainer } from "react-toastify";

export const PasswordUpdate = () => {
    const {register, handleSubmit, formState:{errors}, setError} = useForm<IPasswordUpdateForm>();
    const [generalError, setGeneralError] = useState<string | null>(null);  // Corrected typo here
    const navigate = useNavigate();

    const onSubmit = (data:{oldPassword:string, newPassword:string}) => {
        handlePasswordUpdate(data.oldPassword, data.newPassword)
        .then(response => {
            if (response.status === 'ok') {
                toast.success('Password updated successfully!');
                navigate('/profile');
            } else {
                setGeneralError(response.message || 'Password update failed');  // Corrected typo here
                toast.error(response.message || 'Password update failed');
            }
        })
        .catch(() => {
            setGeneralError('Network error or server is down');  // Corrected typo here
            toast.error('Network error or server is down');
        });
    };

    return (
        <MDBContainer className="py-5" style={{ maxWidth: '600px' }}>
            <ToastContainer />
            <MDBRow className="d-flex justify-content-center">
                <MDBCol md="12">
                    <MDBCard className="my-5">
                        <MDBCardBody className="p-5">
                            <h3 className="mb-4">Change Password</h3>
                            {generalError && <p className="text-danger">{generalError}</p>}  {/* Corrected typo here */}

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-4">
                                    <MDBInput
                                        label="Old Password"
                                        type="password"
                                        {...register('oldPassword', { required: "Old password is required" })}
                                        className={`${errors.oldPassword ? 'is-invalid' : ''}`}
                                    />
                                    {errors.oldPassword && <div className="invalid-feedback">{errors.oldPassword.message}</div>}
                                </div>

                                <div className="mb-4">
                                    <MDBInput
                                        label="New Password"
                                        type="password"
                                        {...register('newPassword', {
                                            required: "New password is required",
                                            minLength: { value: 6, message: "Password must be at least 6 characters long" }
                                        })}
                                        className={`${errors.newPassword ? 'is-invalid' : ''}`}
                                    />
                                    {errors.newPassword && <div className="invalid-feedback">{errors.newPassword.message}</div>}
                                </div>

                                <button type="submit" className="button-styles">Update Password</button>

                            </form>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};
