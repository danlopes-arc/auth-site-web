import React, { useEffect, useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import qs from 'qs'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { SET_TOKEN } from '../store/system/types'
import { Center, Spinner } from '@chakra-ui/react'

interface GitHubAuthProps {}

const GitHubAuth: React.FC<GitHubAuthProps> = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const code = qs.parse(history.location.search, { ignoreQueryPrefix: true })
    .code

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const tryLogin = async () => {
      try {
        const res = await axios.get(`/api/auth/github/login?code=${code}`)

        dispatch({
          type: SET_TOKEN,
          token: res.data.token,
        })
        history.push('/me')
      } catch (err) {
        setIsLoading(false)
      }
    }

    if (!code) {
      setIsLoading(false)
    } else {
      tryLogin()
    }
  }, [code, history, dispatch])

  if (isLoading) {
    return (
      <Center>
        <Spinner size="xl" />
      </Center>
    )
  }
  return <Redirect to="/" />
}

export default GitHubAuth
