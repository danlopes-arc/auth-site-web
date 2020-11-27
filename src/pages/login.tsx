import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react'
import axios from 'axios'
import { Field, FieldProps, Form, Formik, FormikProps } from 'formik'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import validate from 'validate.js'
import { IFieldErrors, IUserLoginData } from '../types'
import { loginConstraints } from '../utils/constaints'
import { normalize, trimNormalize } from '../utils/validatejs'

async function login(userData: IUserLoginData) {
  try {
    const token = await axios.post('api/users/login', userData)
    console.log('token:', token);
    
  } catch (err) {
    if (err.response?.data) {
      const fieldErrors: IFieldErrors = err.response.data.fields
      return fieldErrors
    }
  }
}

type IFieldNomalizations<UserData> = {
  [key in keyof UserData]: (value?: string) => string | null
}

const normalizations: IFieldNomalizations<IUserLoginData> = {
  email: trimNormalize,
  password: normalize,
}

const userData: IUserLoginData = {
  email: '',
  password: '',
}

const textFields: TextFieldProps<IUserLoginData>[] = [
  {
    fieldName: 'email',
    fieldText: 'Email',
    inputType: 'email',
  },
  {
    fieldName: 'password',
    fieldText: 'Password',
    inputType: 'password',
  },
]

const validateField = (field?: keyof IUserLoginData, value?: string) => {
  if (!field) return
  const normalized = normalizations[field]!(value)
  const errors = validate(
    { [field]: normalized },
    { [field]: loginConstraints[field] }
  ) as { [key: string]: string[] } | undefined
  if (errors) {
    return errors[field]
  }
}

// TextFieldComponent

interface TextFieldProps<Data> {
  fieldName: keyof Data
  inputType: string
  fieldText: string
}

const TextField: React.FC<TextFieldProps<IUserLoginData>> = ({
  fieldName,
  inputType,
  fieldText,
}) => {
  return (
    <Field
      name={fieldName}
      validate={(value?: string) => validateField(fieldName, value)}
    >
      {({ field, form }: FieldProps<IUserLoginData, IUserLoginData>) => (
        <FormControl
          isInvalid={!!form.errors[fieldName] && !!form.touched[fieldName]}
          mb={6}
        >
          <FormLabel htmlFor={fieldName}>{fieldText}</FormLabel>
          <Input {...(field as any)} id={fieldName} type={inputType}></Input>
          {((form.errors[fieldName] as unknown) as string[])?.map(
            (value, i) => (
              <FormErrorMessage key={i} mt={i ? 0 : 2}>
                {value}
              </FormErrorMessage>
            )
          )}
        </FormControl>
      )}
    </Field>
  )
}

// Register

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
