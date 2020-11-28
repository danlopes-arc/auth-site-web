import { ChakraProvider, Container } from '@chakra-ui/react'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import NavBar from './components/NavBar'

import Index from './pages/index'
import Login from './pages/login'
import Me from './pages/me'
import Register from './pages/register'
import store from './store'

function App() {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <div className="App">
          <BrowserRouter>
            <NavBar></NavBar>
            <Container p={10}>
              <Switch>
                <Route path="/" exact component={Index} />
                <Route path="/register" exact component={Register} />
                <Route path="/login" exact component={Login} />
                <Route path="/me" exact component={Me} />
              </Switch>
            </Container>
          </BrowserRouter>
        </div>
      </ChakraProvider>
    </Provider>
  )
}

export default App
