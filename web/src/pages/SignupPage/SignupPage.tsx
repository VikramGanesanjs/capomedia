import { useRef, useState } from 'react'
import { useEffect } from 'react'

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material'

import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

const SignupPage = () => {
  const { isAuthenticated, signUp } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  // focus on email box on page load
  const emailRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    emailRef.current?.focus()
  }, [])

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isStudent, setIsStudent] = useState(false)
  const [errors, setErrors] = useState({})

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const formErrors = {}

    if (fullName.trim() === '') {
      formErrors.fullName = 'Please enter your full name'
    }
    if (email.trim() === '') {
      formErrors.email = 'Please enter your email'
    } else if (!validateEmail(email)) {
      formErrors.email = 'Please enter a valid email address'
    }

    if (password.trim() === '') {
      formErrors.password = 'Please enter your password'
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
    } else {
      const response = await signUp({
        name: fullName,
        username: email,
        password: password,
        roles: isStudent ? 'student' : 'user',
      })
      if (response.message) {
        toast(response.message)
      } else if (response.error) {
        toast.error(response.error)
      } else {
        toast.success('Welcome!')
      }
    }
  }

  return (
    <>
      <MetaTags title="Signup" />

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
          <Typography variant="h1">Signup</Typography>

          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <TextField
              label="Full Name"
              variant="outlined"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              error={!!errors.fullName}
              helperText={errors.fullName}
              fullWidth
            />

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

            <FormControlLabel
              control={
                <Checkbox
                  checked={isStudent}
                  onChange={(e) => setIsStudent(e.target.checked)}
                />
              }
              label="Are you a student in CAPOmedia?"
            />
          </Box>

          <Button type="submit" variant="contained" color="primary">
            Sign Up
          </Button>
        </Box>
      </form>
    </>
  )
}

export default SignupPage
