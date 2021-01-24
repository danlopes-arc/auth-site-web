import { Button, Heading } from '@chakra-ui/react'
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import TextField, { TextFieldProps } from '../components/TextField'
import { ErrorWithData, FieldErrors, UserRegisterData } from '../types'
import { registerConstraints } from '../utils/validation/constaints'
import { validateField } from '../utils/validation/validate'
import { normalize, trimNormalize } from '../utils/normalization'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store'
import { registerUser } from '../store/system/actions'
import { TITLE } from '../consts'
import ExternalAuthButtons from '../components/ExternalAuthButtons'

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
  const dispatch: AppDispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    document.title = `${TITLE} - Register`
  })

  const isSubmitDisabled = (props: FormikProps<UserRegisterData>) => {
    return (Object.getOwnPropertyNames(userData) as [
      keyof UserRegisterData
    ]).some((key) => !!props.touched[key] && props.errors[key])
  }

  const onSubmit = async (
    userData: UserRegisterData,
    { setErrors }: FormikHelpers<UserRegisterData>
  ) => {
    try {
      await dispatch(registerUser(userData))
      history.push('/login')
    } catch (err) {
      if (err instanceof ErrorWithData) {
        console.log(err.data)
        const errors = err.data as FieldErrors<UserRegisterData>
        setErrors(errors as any)
      }
    }
  }

  return (
    <Formik initialValues={userData} onSubmit={onSubmit}>
      {(props) => (
        <Form>
          <Heading as="h1" mb={6}>
            Register
          </Heading>

          <ExternalAuthButtons />

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
