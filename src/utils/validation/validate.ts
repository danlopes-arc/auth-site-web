import validate from 'validate.js'

type DataConstraints<Data> = {
  [key in keyof Data & string]: any
}

export const validateField = <Data>(
  field: (keyof Data & string) | undefined,
  value: string | undefined | null,
  constraints: DataConstraints<Data>
) => {
  if (!field) return
  return validate({ [field]: value }, { [field]: constraints[field] })?.[field]
}
