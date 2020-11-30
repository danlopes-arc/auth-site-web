import { Center, Heading } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { TITLE } from '../consts'

interface IndexProps {}

const Index: React.FC<IndexProps> = () => {
  useEffect(() => {
    document.title = `${TITLE}`
  })

  return (
    <Center>
      <Heading as="h1">Welcome!</Heading>
    </Center>
  )
}

export default Index
