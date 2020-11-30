import { Button, Heading } from '@chakra-ui/react'
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import TextField, { TextFieldProps } from '../components/TextField'
import { ErrorWithData, FieldErrors, UserLoginData } from '../types'
import { loginConstraints } from '../utils/validation/constaints'
import { validateField } from '../utils/validation/validate'
import { normalize, trimNormalize } from '../utils/normalization'
import { login } from '../store/system/actions'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store'
import { TITLE } from '../consts'

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
  const dispatch: AppDispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    document.title = `${TITLE} - Login`
  })

  const isSubmitDisabled = (props: FormikProps<UserLoginData>) => {
    return (Object.getOwnPropertyNames(userData) as [keyof UserLoginData]).some(
      (key) => !!props.touched[key] && props.errors[key]
    )
  }

  const onSubmit = async (
    userData: UserLoginData,
    { setErrors }: FormikHelpers<UserLoginData>
  ) => {
    try {
      await dispatch(login(userData))
      history.push('/me')
    } catch (err) {
      if (err instanceof ErrorWithData) {
        console.log(err.data)
        const errors = err.data as FieldErrors<UserLoginData>
        setErrors(errors as any)
      }
    }
  }

  return (
    <Formik initialValues={userData} onSubmit={onSubmit}>
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
            Login
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
