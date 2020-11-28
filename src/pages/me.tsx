import {
  Avatar,
  Button,
  Heading,
  Skeleton,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
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
        src="https://1-moda.com/wp-content/uploads/2016/02/Cool_And_Stylish_Profile_Pictures_For_Facebook_For_Girls_2014_Funny_Picture.jpg"
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

  return <>{!user ? <Skeleton>{content}</Skeleton> : <>{content}</>}</>
}

export default Me
