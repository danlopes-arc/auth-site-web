import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Flex, Heading, Box, Button, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Flex as="nav" align="center" justify="space-between" p={4} boxShadow="lg">
      <Link to="/">
        <Heading as="span">heyo</Heading>
      </Link>
      <Box>
        <Button onClick={toggleColorMode}>
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>
        <Button as="a" href="/login" ml={2}>
          Login
        </Button>
        <Link to="/register">
          <Button ml={2} colorScheme="purple">
            Register
          </Button>
        </Link>
      </Box>
    </Flex>
  )
}

export default NavBar
