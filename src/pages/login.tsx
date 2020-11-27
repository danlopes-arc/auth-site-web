import { Button, Heading } from '@chakra-ui/react'
import axios from 'axios'
import { Form, Formik, FormikProps } from 'formik'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import TextField, { TextFieldProps } from '../components/TextField'
import { FieldErrors, UserLoginData } from '../types'
import { loginConstraints } from '../utils/validation/constaints'
import { validateField } from '../utils/validation/validate'
import { normalize, trimNormalize } from '../utils/normalization'

async function login(userData: UserLoginData) {
  try {
    const token = await axios.post('api/users/login', userData)
    console.log('token:', token)
  } catch (err) {
    if (err.response?.data) {
      const fieldErrors: FieldErrors<UserLoginData> = err.response.data.fields
      return fieldErrors
    }
  }
}

const textFields: TextFieldProps<UserLoginData>[] = [
  {
    fieldName: 'email',
    fieldText: 'Email',
    inputType: 'email',
    validate: (field, value) =>
      validateField<UserLoginData>(
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
      validateField<UserLoginData>(field, normalize(value), loginConstraints),
  },
]

const userData: UserLoginData = {
  email: '',
  password: '',
}

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const history = useHistory()

  const isSubmitDisabled = (props: FormikProps<UserLoginData>) => {
    return (Object.getOwnPropertyNames(userData) as [keyof UserLoginData]).some(
      (key) => !!props.touched[key] && props.errors[key]
    )
  }

  return (
    <Formik
      initialValues={userData}
      onSubmit={async (userData, { setErrors }) => {
        const fieldErrors = await login(userData)

        if (fieldErrors) {
          return setErrors(fieldErrors as any)
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
