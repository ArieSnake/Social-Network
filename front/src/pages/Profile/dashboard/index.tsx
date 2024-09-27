import { useOutletContext } from "react-router-dom"
import { IContextType } from "../../../lib/types"
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBInput } from 'mdb-react-ui-kit'
import { BASE_URL, DEFAULT_COVER_PIC, DEFAULT_PIC } from "../../../lib/constant"
import { useRef } from "react"
import { handleCoverPictureUpload, handlePictureUpload } from "../../../lib/api"

export function Dashboard() {
  const { account, setAccount } = useOutletContext<IContextType>()
  const photo = useRef<HTMLInputElement | null>(null)
  const coverPhoto = useRef<HTMLInputElement | null>(null)

  const handlePic = () => {
    if (photo.current) {
      const file = photo.current.files?.[0]
      if (file) {
        const form = new FormData()
        form.append('picture', file)

        handlePictureUpload(form).then(response => {
          if (response.payload) {
            setAccount({ ...account, picture: response.payload as string })
          }
        })
      }
    }
  }

  const handleCoverPic = () => {
    if (coverPhoto.current) {
      const file = coverPhoto.current.files?.[0]
      if (file) {
        const form = new FormData()
        form.append('cover', file)

        handleCoverPictureUpload(form).then(response => {
          if (response.payload) {
            setAccount({ ...account, cover: response.payload as string })
          }
        })
      }
    }
  }

  return (
    <div className="gradient-custom-2" style={{ backgroundColor: '#9DE2FF' }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="9" xl="7">
            <MDBCard>
              <MDBInput
                type="file"
                ref={photo}
                onChange={handlePic}
                style={{ display: 'none' }}
              />
              <MDBInput
                type="file"
                ref={coverPhoto}
                onChange={handleCoverPic}
                style={{ display: 'none' }}
              />
              <div style={{ position: 'relative' }}>
                <MDBCardImage
                  src={!account.cover ? DEFAULT_COVER_PIC : BASE_URL + account.cover}
                  alt="Cover"
                  fluid
                  style={{ 
                    width: '100%', 
                    height: '300px', 
                    objectFit: 'cover' 
                  }}
                  onClick={() => coverPhoto.current?.click()}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-40px',
                    left: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    zIndex: 1,
                  }}
                >
                  <MDBCardImage
                    src={!account.picture ? DEFAULT_PIC : BASE_URL + account.picture}
                    alt="Profile"
                    className="img-thumbnail"
                    fluid
                    style={{
                      width: '150px',
                      height: '150px',
                      borderRadius: '50%',
                      border: '5px solid white',
                      objectFit: 'cover',
                      zIndex: 1,
                    }}
                    onClick={() => photo.current?.click()}
                  />
                  <div
                    style={{
                      marginLeft: '20px',
                      color: 'white',
                      textShadow: '1px 1px 5px rgba(0, 0, 0, 0.6)',
                    }}
                  >
                    <MDBTypography tag="h5">
                      {account.name} {account.surname}
                    </MDBTypography>
                    <MDBCardText>New York</MDBCardText>
                  </div>
                </div>
              </div>
              <div className="p-4 text-black" style={{ backgroundColor: '#F8F9FA', marginTop: '60px' }}>
                <div className="d-flex justify-content-end text-center py-1">
                  <div>
                    <MDBCardText className="mb-1 h5">253</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Photos</MDBCardText>
                  </div>
                  <div className="px-3">
                    <MDBCardText className="mb-1 h5">{account.followers.length}</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Followers</MDBCardText>
                  </div>
                  <div>
                    <MDBCardText className="mb-1 h5">{account.following.length}</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Following</MDBCardText>
                  </div>
                </div>
              </div>
              <MDBCardBody className="text-black p-4">
                <div className="mb-5">
                  <p className="lead fw-normal mb-1">About</p>
                  <div className="p-4" style={{ backgroundColor: '#F8F9FA' }}>
                    <MDBCardText className="font-italic mb-1">Web Developer</MDBCardText>
                    <MDBCardText className="font-italic mb-1">Lives in New York</MDBCardText>
                    <MDBCardText className="font-italic mb-0">Photographer</MDBCardText>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <MDBCardText className="lead fw-normal mb-0">Recent photos</MDBCardText>
                  <MDBCardText className="mb-0">
                    <a href="#!" className="text-muted">Show all</a>
                  </MDBCardText>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  )
}
