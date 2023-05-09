import { ThemeProvider, createTheme } from '@mui/material'

import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import { AuthProvider, useAuth } from './auth'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './scaffold.css'
import './index.css'

const theme = createTheme({
  palette: {
    primary: {
      light: '#E1DCC8',
      main: '#D95448',
      dark: '#261B1A',
    },
    secondary: {
      main: '#8A8C46',
      dark: '#466B73',
    },
  },
})

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <AuthProvider>
        <RedwoodApolloProvider useAuth={useAuth}>
          <ThemeProvider theme={theme}>
            <Routes />
          </ThemeProvider>
        </RedwoodApolloProvider>
      </AuthProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
