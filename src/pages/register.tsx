import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import React from 'react'

interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
  const validateField = (...rest: any[]) => {}
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
      }}
      onSubmit={() => {}}
    >
      {(props) => (
        <Form>
          <Heading as="h1" mb={6}>
            Register
          </Heading>
          <Field name="name" validate={validateField}>
            {({ field, form }: any) => (
              <FormControl
                isInvalid={form.errors.name && form.touched.name}
                mb={6}
              >
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input {...field} id="name"></Input>
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="email" validate={validateField}>
            {({ field, form }: any) => (
              <FormControl
                mb={6}
                isInvalid={form.errors.email && form.touched.email}
              >
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input {...field} type="email" id="email"></Input>
                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="password" validate={validateField}>
            {({ field, form }: any) => (
              <FormControl
                mb={6}
                isInvalid={form.errors.password && form.touched.password}
              >
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input {...field} type="password" id="password"></Input>
                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button
            w="100%"
            colorScheme="purple"
            isLoading={props.isSubmitting}
            type="submit"
            mb={6}
          >
            Register
          </Button>
          <Button
            w="100%"
            colorScheme="gray"
            isLoading={props.isSubmitting}
            type="submit"
            size="sm"
          >
            Alredy have an account? Login
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default Register
