import { Box, Button, Heading, Skeleton, VStack } from '@chakra-ui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from '../store'
import { getUserInfo, logout } from '../store/system/actions'
import { UserInfo } from '../types'

interface MeProps {}

const Me: React.FC<MeProps> = () => {
  const dispatch: AppDispatch = useDispatch()
  const user = useSelector<AppState, UserInfo | undefined>(
    (state) => state.system.user
  )

  if (!user) {
    dispatch(getUserInfo())
  }

  const onLogoutClick = () => {
    dispatch(logout())
  }

  const content = (
    <VStack>
      <Box>
        <Heading as="h1">{user?.name}</Heading>
      </Box>
      <Heading as="h4" fontSize="lg" color="gray.800">
        {user?.email}
      </Heading>
      <Button mt={4} colorScheme="purple" onClick={onLogoutClick}>
        Logout
      </Button>
    </VStack>
  )

  return <>{!user ? <Skeleton>{content}</Skeleton> : <>{content}</>}</>
}

export default Me
