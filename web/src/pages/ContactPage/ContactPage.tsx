import React, { useState } from 'react'

import { ThemeContext } from '@emotion/react'
import { TextField, Button, Box, useTheme, Typography } from '@mui/material'
import Fade from 'react-reveal/Fade'

import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

const CREATE_CONTACT_FORM_RESPONSE_MUTATION = gql`
  mutation CreateContactFormResponseMutation(
    $input: CreateContactFormResponseInput!
  ) {
    createContactFormResponse(input: $input) {
      id
    }
  }
`

const ContactPage = () => {
  const [createResponse, { error }] = useMutation(
    CREATE_CONTACT_FORM_RESPONSE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Thank you for your feedback!')
        setName('')
        setEmail('')
        setMessage('')
      },
      onError: () => {
        toast.error('Something went wrong!')
        toast.error(error.message)
      },
    }
  )

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const input = {
      name: name,
      email: email,
      message: message,
    }
    createResponse({ variables: { input } })
  }

  const theme = useTheme()
  const [clicked, setClicked] = useState([false, false, false])

  return (
    <>
      <MetaTags title="Contact Us" description="Contact page" />
      <Box
        sx={{
          height: '100vh',
          width: '97%',
          backgroundImage: `url(${`https://i.imgur.com/0eEbz4A.jpg`})`,
          p: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              p: 2,
              gap: 2,
              mt: 8,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Fade left>
              <Typography variant="h1" sx={{ color: '#ffffff' }}>
                {' '}
                Contact Us
              </Typography>
            </Fade>
            <TextField
              onBlur={() => {
                const copy = [...clicked]
                copy[0] = false
                setClicked(copy)
              }}
              onClick={() => {
                console.log(clicked)
                const copy = [...clicked]
                copy[0] = true
                setClicked(copy)
              }}
              label="Name"
              InputProps={{
                style: {
                  color: '#ffffff',
                  border: !clicked[0]
                    ? `1px solid #ffffff`
                    : `1px solid ${theme.palette.primary.main}`,
                },
              }}
              InputLabelProps={{
                style: {
                  color: '#ffffff',
                },
              }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
              required
              fullWidth
              margin="normal"
            />
            <TextField
              onBlur={() => {
                const copy = [...clicked]
                copy[1] = false
                setClicked(copy)
              }}
              onClick={() => {
                console.log(clicked)
                const copy = [...clicked]
                copy[1] = true
                setClicked(copy)
              }}
              label="Email"
              value={email}
              variant="outlined"
              InputLabelProps={{
                style: { color: '#ffffff' },
              }}
              InputProps={{
                style: {
                  color: '#ffffff',
                  border: !clicked[1]
                    ? `1px solid #ffffff`
                    : `1px solid ${theme.palette.primary.main}`,
                },
              }}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="Message"
              value={message}
              InputProps={{
                style: {
                  color: '#ffffff',
                  border: !clicked[2]
                    ? `1px solid #ffffff`
                    : `1px solid ${theme.palette.primary.main}`,
                },
              }}
              InputLabelProps={{
                style: { color: '#ffffff' },
              }}
              onBlur={() => {
                const copy = [...clicked]
                copy[2] = false
                setClicked(copy)
              }}
              onClick={() => {
                console.log(clicked)
                const copy = [...clicked]
                copy[2] = true
                setClicked(copy)
              }}
              variant="outlined"
              onChange={(e) => setMessage(e.target.value)}
              multiline
              rows={4}
              required
              fullWidth
              margin="normal"
            />
            <Fade collapse bottom>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Fade>
          </Box>
        </form>
      </Box>
    </>
  )
}

export default ContactPage
