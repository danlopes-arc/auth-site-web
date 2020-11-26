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
import { IFieldErrors, IUserRegisterData } from '../types'
import { registerConstraints } from '../utils/constaints'
import { normalize, trimNormalize } from '../utils/validatejs'

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

type IFieldNomalizations<UserData> = {
  [key in keyof UserData]: (value?: string) => void
}

const normalizations: IFieldNomalizations<IUserRegisterData> = {
  name: trimNormalize,
  email: trimNormalize,
  password: normalize,
}

const userData: IUserRegisterData = {
  name: '',
  email: '',
  password: '',
}

const textFields: TextFieldProps<IUserRegisterData>[] = [
  {
    fieldName: 'name',
    fieldText: 'Name',
    inputType: 'text',
  },
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

const validateField = (field?: keyof IUserRegisterData, value?: string) => {
  if (!field) return
  const normalized = normalizations[field]!(value)
  const errors = validate(
    { [field]: normalized },
    { [field]: registerConstraints[field] }
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

const TextField: React.FC<TextFieldProps<IUserRegisterData>> = ({
  fieldName,
  inputType,
  fieldText,
}) => {
  return (
    <Field
      name={fieldName}
      validate={(value?: string) => validateField(fieldName, value)}
    >
      {({ field, form }: FieldProps<IUserRegisterData, IUserRegisterData>) => (
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
