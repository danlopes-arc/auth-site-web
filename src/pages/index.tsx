import { Center, Heading } from '@chakra-ui/react'
import React from 'react'

interface IndexProps {}

const Index: React.FC<IndexProps> = () => {
  return (
    <Center>
      <Heading as="h1">Welcome!</Heading>
    </Center>
  )
}

export default Index
