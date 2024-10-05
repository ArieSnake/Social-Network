import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { useEffect, useState } from 'react'
import { handleGetPostById } from '../lib/api'
import { IPost } from '../lib/types'
import { BASE_URL } from '../lib/constant'


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 'auto',
  maxHeight: '90%',
  bgcolor: 'rgba(0, 0, 0, 0.85)',
  border: 'none',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
  color: '#fff',
  overflowY: 'auto',
}

export interface IProps {
  postId: number
  handleClose: () => void
}

export function Post({ postId, handleClose }: IProps) {
  const [post, setPost] = useState<IPost | null>(null)

  useEffect(() => {
    handleGetPostById(postId).then(response => {
      if (response.status === 'ok') {
        setPost(response.payload as IPost)
      }
    })
  }, [postId])

  return (
    <div>
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {post ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <img
                  src={BASE_URL + post.picture}
                  alt={post.title}
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxWidth: '600px', 
                    borderRadius: '10px',
                    boxShadow: '0 4px 10px rgba(255, 255, 255, 0.2)',
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                <Typography
                  id="modal-modal-title"
                  variant="h4"
                  component="h2"
                  sx={{ fontWeight: 'bold' }}
                >
                  {post.title}
                </Typography>
                <Typography
                  id="modal-modal-description"
                  sx={{ marginTop: '10px', color: '#f8f8f8', fontSize: '1.2rem' }}
                >
                  {post.likes ? post.likes.length : 0} {post.likes.length === 1 ? 'Like' : 'Likes'}
                </Typography>
              </div>
              <div
                style={{
                  marginBottom: '20px',
                  maxHeight: '150px',
                  overflowY: 'auto',
                  padding: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '10px',
                }}
              >
                <Typography variant="h6" sx={{ marginBottom: '10px', textAlign: 'center' }}>
                  Liked by:
                </Typography>
                <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'center', fontSize: '1.1rem' }}>
                  {post.likes?.map(user => (
                    <li key={user.id} style={{ marginBottom: '8px' }}>
                      {user.name} {user.surname}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                style={{
                  marginTop: '20px',
                  padding: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '10px',
                }}
              >
                <Typography variant="h6" sx={{ marginBottom: '10px', textAlign: 'center' }}>
                  Comments
                </Typography>
                <Typography sx={{ color: '#f8f8f8' }}>
                  Comments section
                </Typography>
              </div>
            </>
          ) : (
            <Typography sx={{ color: '#f8f8f8' }}>Loading...</Typography>
          )}
        </Box>
      </Modal>
    </div>
  )
}
