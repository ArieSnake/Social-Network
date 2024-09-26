import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';

export const Settings = () => {
    return (
        <MDBContainer className="py-5">
            <MDBRow className="d-flex justify-content-center">
                <MDBCol md="12">
                    <MDBCard className="my-5">
                        <MDBCardBody className="p-5">
                            <h3 className="mb-4">Settings</h3>
                            <div className="mb-4">
                                <NavLink to="login-update" className="btn btn-primary me-2">
                                    Update Login
                                </NavLink>
                                <NavLink to="password-update" className="btn btn-secondary">
                                    Update Password
                                </NavLink>
                            </div>
                            <Outlet />
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};
