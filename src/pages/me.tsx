import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react'
import axios, { AxiosRequestConfig } from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { MeResponseData, UserInfo } from '../types'

async function getUserInfo() {
  if (!localStorage.getItem('token')) return

  try {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
    const res = await axios.get<MeResponseData>('api/users/me', config)
    return res.data.user
  } catch (err) {}
}

interface MeProps {}

const Me: React.FC<MeProps> = () => {
  const [user, setUser] = useState<UserInfo>()
  const history = useHistory()

  if (!user) {
    getUserInfo()
      .then((user) => {
        setUser(user)
      })
      .catch(() => {
        history.push('/login')
      })
  }

  return (
    <>
      {!user ? (
        <Text>loading...</Text>
      ) : (
        <VStack>
          <Box>
            <Heading as="h1">{user.name}</Heading>
          </Box>
          <Heading as="h4" fontSize="lg" color="gray.800">
            {user.email}
          </Heading>
          <Button mt={4} colorScheme="purple">
            Logout
          </Button>
        </VStack>
      )}
    </>
  )
}

export default Me
