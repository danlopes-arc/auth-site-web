import React, { useEffect, useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import qs from 'qs'
import { useDispatch } from 'react-redux'
import { Center, Spinner } from '@chakra-ui/react'
import { githubLogin } from '../store/system/actions'
import { AppDispatch } from '../store'

interface GitHubAuthProps {}

const GitHubAuth: React.FC<GitHubAuthProps> = () => {
  const history = useHistory()
  const dispatch: AppDispatch = useDispatch()

  const code = qs.parse(history.location.search, { ignoreQueryPrefix: true })
    .code

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (typeof code !== 'string') {
      return setIsLoading(false)
    }

    const tryLogin = async () => {
      try {
        await dispatch(githubLogin(code))
        history.push('/me')
      } catch (err) {
        setIsLoading(false)
      }
    }

    tryLogin()
  }, [code, history, dispatch])

  if (isLoading) {
    return (
      <Center>
        <Spinner size="xl" />
      </Center>
    )
  }
  return <Redirect to="/login" />
}

export default GitHubAuth
