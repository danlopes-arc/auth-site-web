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
import { Link } from 'react-router-dom'
import validate from 'validate.js'
import { registerConstraints } from '../utils/constaints'
import { normalize, trimNormalize } from '../utils/validatejs'

interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
  const validateField = ({ field, value }: any) => {
    if (!field) return
    const constraints: any = registerConstraints
    const errors = validate({ [field]: value }, { [field]: constraints[field] })
    if (errors) return errors[field]
  }

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
      }}
      onSubmit={() => {
        return alert('done')
      }}
    >
      {(props) => (
        <Form>
          <Heading as="h1" mb={6}>
            Register
          </Heading>
          <Field
            name="name"
            validate={(value?: string) => {
              const normalized = trimNormalize(value)
              return validateField({ field: 'name', value: normalized })
            }}
          >
            {({ field, form }: any) => (
              <FormControl
                isInvalid={form.errors.name && form.touched.name}
                mb={6}
              >
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input {...field} id="name"></Input>
                {form.errors.name?.map((message: string, i: number) => {
                  return (
                    <FormErrorMessage key={i} mt={i > 0 ? 0 : 1}>
                      {message}
                    </FormErrorMessage>
                  )
                })}
              </FormControl>
            )}
          </Field>
          <Field
            name="email"
            validate={(value: string) => {
              const normalized = trimNormalize(value)
              return validateField({ field: 'email', value: normalized })
            }}
          >
            {({ field, form }: any) => (
              <FormControl
                mb={6}
                isInvalid={form.errors.email && form.touched.email}
              >
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input {...field} type="email" id="email"></Input>
                {form.errors.email?.map((message: string, i: number) => {
                  return (
                    <FormErrorMessage key={i} mt={i > 0 ? 0 : 1}>
                      {message}
                    </FormErrorMessage>
                  )
                })}
              </FormControl>
            )}
          </Field>
          <Field
            name="password"
            validate={(value: string) => {
              const normalized = normalize(value)
              return validateField({ field: 'password', value: normalized })
            }}
          >
            {({ field, form }: any) => (
              <FormControl
                mb={6}
                isInvalid={form.errors.password && form.touched.password}
              >
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input {...field} type="password" id="password"></Input>
                {form.errors.password?.map((message: string, i: number) => {
                  return (
                    <FormErrorMessage key={i} mt={i > 0 ? 0 : 1}>
                      {message}
                    </FormErrorMessage>
                  )
                })}
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
            as={Link}
            to="/login"
            w="100%"
            colorScheme="gray"
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
