import { Button } from '@mui/material'

import { navigate, routes } from '@redwoodjs/router'

const Logo = () => {
  return (
    <Button onClick={() => navigate(routes.home())}>
      <img
        src="/Logo.png"
        alt="Logo"
        style={{
          height: 100,
          width: 100,
        }}
      />
    </Button>
  )
}

export default Logo
