import { Button, Heading } from '@chakra-ui/react'
import axios from 'axios'
import { Form, Formik, FormikProps } from 'formik'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import TextField, { TextFieldProps } from '../components/TextField'
import { IFieldErrors, IUserRegisterData } from '../types'
import { registerConstraints } from '../utils/validation/constaints'
import { validateField } from '../utils/validation/validate'
import { normalize, trimNormalize } from '../utils/normalization'

async function registerUser(userData: IUserRegisterData) {
  try {
    await axios.post('api/users/register', userData)
  } catch (err) {
    if (err.response?.data) {
      const fieldErrors: IFieldErrors = err.response.data.fields
      return fieldErrors
    }
  }
}

const textFields: TextFieldProps<IUserRegisterData>[] = [
  {
    fieldName: 'name',
    fieldText: 'Name',
    inputType: 'text',
    validate: (field, value) =>
      validateField<IUserRegisterData>(
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
      validateField<IUserRegisterData>(
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
      validateField<IUserRegisterData>(
        field,
        normalize(value),
        registerConstraints
      ),
  },
]

const userData: IUserRegisterData = {
  name: '',
  email: '',
  password: '',
}

interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
  const history = useHistory()

  const isSubmitDisabled = (props: FormikProps<IUserRegisterData>) => {
    return (Object.getOwnPropertyNames(userData) as [
      keyof IUserRegisterData
    ]).some((key) => !!props.touched[key] && props.errors[key])
  }

  return (
    <Formik
      initialValues={userData}
      onSubmit={async (userData, { setErrors }) => {
        const fieldErrors = await registerUser(userData)

        if (fieldErrors) {
          return setErrors(fieldErrors)
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
