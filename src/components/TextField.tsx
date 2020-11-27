import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react'
import { Field, FieldProps } from 'formik'
import React, { PropsWithChildren } from 'react'

export interface TextFieldProps<Data> {
  fieldName: keyof Data & string
  inputType: string
  fieldText: string
  validate: (field: keyof Data & string, value?: string) => string[] | undefined
}

const TextField = <Data,>({
  fieldName,
  inputType,
  fieldText,
  validate,
}: PropsWithChildren<TextFieldProps<Data>>) => {
  return (
    <Field
      name={fieldName}
      validate={(value?: string) => validate(fieldName, value)}
    >
      {({ field, form }: FieldProps<Data, Data>) => (
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

export default TextField
