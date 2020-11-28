import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router-dom'
import { AppState } from '../../store'

interface LoggedOutRouteProps extends RouteProps {
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>
}

const LoggedOutRoute: React.FC<LoggedOutRouteProps> = ({
  component,
  ...rest
}) => {
  const loggedIn = useSelector<AppState, boolean>(
    (state) => state.system.loggedIn
  )
  return (
    <Route
      {...rest}
      render={(props) =>
        !loggedIn ? (
          React.createElement(component, props)
        ) : (
          <Redirect to="/me" />
        )
      }
    />
  )
}

export default LoggedOutRoute
