import { Box, Button, Center, Divider, Heading } from '@chakra-ui/react'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import QueryString from 'qs'
import React from 'react'

interface ExternalAuthButtonsProps {}

const ExternalAuthButtons: React.FC<ExternalAuthButtonsProps> = () => {
  const onGithubClick = () => {
    console.log("id:", process.env.REACT_APP_GITHUB_CLIENT_ID)
    const query = QueryString.stringify(
      {
        response_type: 'code',
        redirect_url: 'http://localhost:3000/auth/github/callback',
        scope: ['user:email'],
        client_id: process.env.REACT_APP_GITHUB_CLIENT_ID,
      },
      { addQueryPrefix: true, arrayFormat: 'repeat' }
    )
    const url = `https://github.com/login/oauth/authorize${query}`
    window.location.assign(url)
  }
  return (
    <>
      <Button w="100%" colorScheme="purple" mb={6} onClick={onGithubClick}>
        <Box as={FontAwesomeIcon} icon={faGithub} size="lg" mr={2} />
        Continue with GitHub
      </Button>
      <Divider mb={1} />
      <Center>
        <Heading size="md" mb={3}>
          or
        </Heading>
      </Center>
    </>
  )
}

export default ExternalAuthButtons
