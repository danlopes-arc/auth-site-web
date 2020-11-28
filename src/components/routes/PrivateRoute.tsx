import React from 'react'
import { useSelector } from 'react-redux'
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
} from 'react-router-dom'
import { AppState } from '../../store'

interface PrivateRouteProps extends RouteProps {
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component, ...rest }) => {
  const loggedIn = useSelector<AppState, boolean>(
    (state) => state.system.loggedIn
  )
  return (
    <Route
      {...rest}
      render={(props) =>
        loggedIn ? (
          React.createElement(component, props)
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  )
}

export default PrivateRoute
