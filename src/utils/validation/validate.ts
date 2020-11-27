import validate from 'validate.js'
import { DataConstraints } from '../../types'

export const validateField = <Data>(
  field: (keyof Data & string) | undefined,
  value: string | undefined | null,
  constraints: DataConstraints<Data>
) => {
  if (!field) return
  return validate({ [field]: value }, { [field]: constraints[field] })?.[
    field
  ] as string[] | undefined
}
