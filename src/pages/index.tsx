import {
  Badge,
  Box,
  Container,
  Heading,
  Link,
  List,
  ListItem,
  Text,
  useColorMode,
} from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { TITLE } from '../consts'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

interface IndexProps {}

const Index: React.FC<IndexProps> = () => {
  useEffect(() => {
    document.title = `${TITLE}`
  })

  const { colorMode } = useColorMode()
  const linkColor = colorMode === 'light' ? 'purple.500' : 'purple.200'
  const frontEnd = ['TypeScript', 'React', 'Redux', 'Chakra', 'Formik']
  const backEnd = [
    'TypeScript',
    'Node.js',
    'Express.js',
    'Json Web Token',
    'MongoDB',
    'Passport.js',
    'REST API',
    'GitHub Auth App',
    'bcryp Hashing'
  ]

  return (
    <Container maxWidth={1000} fontWeight="500">
      <Heading as="h1" mb={8} size="2xl">
        Welcome to Authsite!
      </Heading>
      <Text mb={5} fontSize="lg">
        Authsite is a simple authentication webapp built with the MERN Stack.
        Here, you can login locally, with email and password, or through
        external authentication services, GitHub in this case.
      </Text>
      <Text mb={5} fontSize="lg">
        The back-end is a REST API that uses Express.js, Passport.js and MongoDB
        to authenticate and store users.
      </Text>
      <Text mb={5} fontSize="lg">
        The front-end is a React App that uses Redux to persist the user
        information, and Chakra as the UI Framework which provides a modern look
        and a bult-in dark mode.
      </Text>
      <Heading as="h3" mb={4} size="xl">
        Thechnologies
      </Heading>
      <Box mb={5}>
        <Heading as="h5" mb={1} size="md">
          For the Back-End
        </Heading>
        {backEnd.map((text) => (
          <Badge
            variant="subtle"
            colorScheme="purple"
            mr={2}
            textTransform="none"
          >
            {text}
          </Badge>
        ))}
      </Box>
      <Box mb={5}>
        <Heading as="h5" mb={1} size="md">
          For the Front-End
        </Heading>
        {frontEnd.map((text) => (
          <Badge
            variant="subtle"
            colorScheme="purple"
            mr={2}
            textTransform="none"
          >
            {text}
          </Badge>
        ))}
      </Box>

      <Heading as="h3" mb={4} size="xl">
        Contact
      </Heading>
      <Heading as="h4" mb={1} size="md">
      Daniel Lopes Arcanjo
      </Heading>
      <List>
        <ListItem>
          <Link href="mailto:danlpsarcanjo@gmail.com" color={linkColor}>
            <FontAwesomeIcon icon={faEnvelope} />
            <Text as="span" ml={2}>
              danlpsarcanjo@gmail.com
            </Text>
          </Link>
        </ListItem>
        <ListItem>
          <Link href="https://github.com/danlopes-arc" color={linkColor}>
            <FontAwesomeIcon icon={faGithub} />
            <Text as="span" ml={2}>
              danlopes-arc
            </Text>
          </Link>
        </ListItem>
        <ListItem>
          <Link
            href="https://www.linkedin.com/in/danielarcanjo/"
            color={linkColor}
          >
            <FontAwesomeIcon icon={faLinkedin} />
            <Text as="span" ml={2}>
              danielarcanjo
            </Text>
          </Link>
        </ListItem>
      </List>
    </Container>
  )
}

export default Index
