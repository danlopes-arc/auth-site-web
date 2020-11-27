import validate from 'validate.js'

type DataConstraints<Data> = {
  [key in keyof Data & string]: any
}

// export const validateField = <Data>(
//   value: string | undefined,
//   field: keyof Data & string | undefined,
//   constraints: DataConstraints<Data>,
//   normalizations?: IFieldNomalizations<Data>
// ) => {
//   if (!field) return

//   let normalized: string | null

//   if (normalizations) {
//     normalized = normalizations[field]!(value)
//   } else if (typeof value !== 'string') {
//     normalized = null
//   } else {
//     normalized = value
//   }

//   const errors = validate(
//     { [field]: normalized },
//     { [field]: constraints[field] }
//   ) as { [key: string]: string[] } | undefined
//   if (errors) {
//     return errors[field]
//   }
// }

export const validateField = <Data>(
  field: (keyof Data & string) | undefined,
  value: string | undefined | null,
  constraints: DataConstraints<Data>
) => {
  if (!field) return
  return validate({ [field]: value }, { [field]: constraints[field] })?.[field]
}
