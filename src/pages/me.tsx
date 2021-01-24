import {
  Avatar,
  Button,
  Center,
  Heading,
  Spinner,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { TITLE } from '../consts'
import { AppDispatch, AppState } from '../store'
import { getUserInfo, logout } from '../store/system/actions'
import { UserInfo } from '../types'

interface MeProps {}

const Me: React.FC<MeProps> = () => {
  const dispatch: AppDispatch = useDispatch()
  const history = useHistory()

  const user = useSelector<AppState, UserInfo | null>(
    (state) => state.system.user
  )

  useEffect(() => {
    document.title = `${TITLE} - Me`
  })

  if (!user) {
    dispatch(getUserInfo())
  }

  const onLogoutClick = () => {
    dispatch(logout())
    history.push('/')
  }

  const content = (
    <VStack>
      <Avatar
        justifySelf="center"
        size="2xl"
        name={user?.name}
        src="/pictures/default-profile-pic.jpg"
        borderWidth="2px"
        borderColor="#AAA"
      />
      <Heading as="span">{user?.name}</Heading>
      <Text as="span" fontSize="lg">
        {user?.email}
      </Text>
      <StackDivider borderColor="red" />
      <Button colorScheme="purple" onClick={onLogoutClick}>
        Logout
      </Button>
    </VStack>
  )

  return (
    <>
      {!user ? (
        <Center>
          <Spinner size="xl" />
        </Center>
      ) : (
        content
      )}
    </>
  )
}

export default Me
