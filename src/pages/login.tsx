import { Button, Heading } from '@chakra-ui/react'
import axios from 'axios'
import { Form, Formik, FormikProps } from 'formik'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import TextField, { TextFieldProps } from '../components/TextField'
import { IFieldErrors, IUserLoginData } from '../types'
import { loginConstraints } from '../utils/validation/constaints'
import { validateField } from '../utils/validation/validate'
import { normalize, trimNormalize } from '../utils/normalization'

async function login(userData: IUserLoginData) {
  try {
    const token = await axios.post('api/users/login', userData)
    console.log('token:', token)
  } catch (err) {
    if (err.response?.data) {
      const fieldErrors: IFieldErrors = err.response.data.fields
      return fieldErrors
    }
  }
}

const textFields: TextFieldProps<IUserLoginData>[] = [
  {
    fieldName: 'email',
    fieldText: 'Email',
    inputType: 'email',
    validate: (field, value) =>
      validateField<IUserLoginData>(
        field,
        trimNormalize(value),
        loginConstraints
      ),
  },
  {
    fieldName: 'password',
    fieldText: 'Password',
    inputType: 'password',
    validate: (field, value) =>
      validateField<IUserLoginData>(field, normalize(value), loginConstraints),
  },
]

const userData: IUserLoginData = {
  email: '',
  password: '',
}

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const history = useHistory()

  const isSubmitDisabled = (props: FormikProps<IUserLoginData>) => {
    return (Object.getOwnPropertyNames(userData) as [
      keyof IUserLoginData
    ]).some((key) => !!props.touched[key] && props.errors[key])
  }

  return (
    <Formik
      initialValues={userData}
      onSubmit={async (userData, { setErrors }) => {
        const fieldErrors = await login(userData)

        if (fieldErrors) {
          return setErrors(fieldErrors)
        }

        return history.push('/me')
      }}
    >
      {(props) => (
        <Form>
          <Heading as="h1" mb={6}>
            Login
          </Heading>
          {textFields.map((textField, i) => (
            <TextField
              key={i}
              fieldName={textField.fieldName}
              inputType={textField.inputType}
              fieldText={textField.fieldText}
              validate={textField.validate}
            />
          ))}
          <Button
            w="100%"
            colorScheme="purple"
            isLoading={props.isSubmitting}
            isDisabled={isSubmitDisabled(props)}
            type="submit"
            mb={6}
          >
            Register
          </Button>
          <Button
            as={Link}
            to="/register"
            w="100%"
            colorScheme="gray"
            type="submit"
            size="sm"
          >
            Doesn't have an account? Register
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default Login
