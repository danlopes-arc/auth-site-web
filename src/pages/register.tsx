import { Button, Heading } from '@chakra-ui/react'
import axios from 'axios'
import { Form, Formik, FormikProps } from 'formik'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import TextField, { TextFieldProps } from '../components/TextField'
import { FieldErrors, UserRegisterData } from '../types'
import { registerConstraints } from '../utils/validation/constaints'
import { validateField } from '../utils/validation/validate'
import { normalize, trimNormalize } from '../utils/normalization'

async function registerUser(userData: UserRegisterData) {
  try {
    await axios.post('api/users/register', userData)
  } catch (err) {
    if (err.response?.data) {
      const fieldErrors: FieldErrors<UserRegisterData> =
        err.response.data.fields
      return fieldErrors
    }
  }
}

const textFields: TextFieldProps<UserRegisterData>[] = [
  {
    fieldName: 'name',
    fieldText: 'Name',
    inputType: 'text',
    validate: (field, value) =>
      validateField<UserRegisterData>(
        field,
        trimNormalize(value),
        registerConstraints
      ),
  },
  {
    fieldName: 'email',
    fieldText: 'Email',
    inputType: 'email',
    validate: (field, value) =>
      validateField<UserRegisterData>(
        field,
        trimNormalize(value),
        registerConstraints
      ),
  },
  {
    fieldName: 'password',
    fieldText: 'Password',
    inputType: 'password',
    validate: (field, value) =>
      validateField<UserRegisterData>(
        field,
        normalize(value),
        registerConstraints
      ),
  },
]

const userData: UserRegisterData = {
  name: '',
  email: '',
  password: '',
}

interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
  const history = useHistory()

  const isSubmitDisabled = (props: FormikProps<UserRegisterData>) => {
    return (Object.getOwnPropertyNames(userData) as [
      keyof UserRegisterData
    ]).some((key) => !!props.touched[key] && props.errors[key])
  }

  return (
    <Formik
      initialValues={userData}
      onSubmit={async (userData, { setErrors }) => {
        const fieldErrors = await registerUser(userData)

        if (fieldErrors) {
          return setErrors(fieldErrors as any)
        }

        return history.push('/login')
      }}
    >
      {(props) => (
        <Form>
          <Heading as="h1" mb={6}>
            Register
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
