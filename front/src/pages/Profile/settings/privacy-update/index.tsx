import React, { useState, useEffect } from "react"
import { MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRow } from "mdb-react-ui-kit"
import { handlePrivacyUpdate, handleVerify } from "../../../../lib/api"
import { DEFAULT_PRIVATE_PIC, DEFAULT_PUBLIC_PIC } from "../../../../lib/constant"
import { toast } from "react-toastify"

export const PrivacyUpdate = () => {
    const [isPrivate, setIsPrivate] = useState<boolean | null>(null)

    useEffect(() => {
        handleVerify()
            .then((response) => {
                if (response.status === "ok" && response.user) {
                    setIsPrivate(response.user.isPrivate)
                }
            })
            .catch(() => {
                toast.error("Failed to load account data")
            })
    }, [])

    const togglePrivacy = () => {
        handlePrivacyUpdate()
            .then((response) => {
                if (response.status === "ok") {
                    setIsPrivate(!isPrivate)
                    toast.success(`Account is now ${!isPrivate ? "Private" : "Public"}`)
                } else {
                    toast.error(response.message || "Failed to update privacy")
                }
            })
            .catch(() => {
                toast.error("Network error or server issue")
            })
    }

    return (
        <MDBContainer className="py-5" style={{ maxWidth: '600px' }}>
            <MDBRow className="d-flex justify-content-center">
                <MDBCol md="12">
                    <MDBCard className="my-5">
                        <MDBCardBody className="p-5">
                            <h3 className="mb-4">Privacy Settings</h3>
                            <div className="mb-4">
                                <img
                                    src={isPrivate ? DEFAULT_PUBLIC_PIC : DEFAULT_PRIVATE_PIC}
                                    alt={isPrivate ? "Private Account" : "Public Account"}
                                    onClick={togglePrivacy}
                                    style={{ cursor: "pointer", width: "50px" }}
                                />
                                <p>
                                    Click the lock icon to make your account {isPrivate ? "Public" : "Private"}.
                                </p>
                            </div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}
