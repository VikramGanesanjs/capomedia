import { useRef, useState } from 'react'
import { useEffect } from 'react'

import { Box, Typography, TextField, Button } from '@mui/material'

import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

const LoginPage = () => {
  const { isAuthenticated, logIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  const emailRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    emailRef.current?.focus()
  }, [])

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const formErrors = {}

    if (email.length < 0) {
      formErrors['email'] = 'Please enter an email address'
    } else if (!validateEmail(email)) {
      formErrors['email'] = 'Please enter a valid email address'
    }

    if (password.length < 0) {
      formErrors['password'] = 'Please enter a password'
    }

    // Add more validation rules for password, if needed

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      toast.error('There was an error in your form')
      console.log('errors')
    } else {
      console.log(email, password)
      const response = await logIn({
        username: email,
        password: password,
      })

      if (response.message) {
        toast(response.message)
      } else if (response.error) {
        toast.error(response.error)
      } else {
        toast.success('Welcome back!')
      }
    }
  }

  return (
    <>
      <MetaTags title="Login" />

      <form onSubmit={(e) => onSubmit(e)}>
        <Box
          sx={{
            height: '100vh',
            display: 'flex',
            p: 4,
            flexDirection: 'column',
            gap: 8,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
          <Typography variant="h1">Login</Typography>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <TextField
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
            />

            <TextField
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <Typography>Don't have an account yet?</Typography>
              <Button
                variant="outlined"
                onClick={() => navigate(routes.signup())}
              >
                Sign Up
              </Button>
            </Box>
          </Box>
        </Box>
      </form>
    </>
  )
}

export default LoginPage
