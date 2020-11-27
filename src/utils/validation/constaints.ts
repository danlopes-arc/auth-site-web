import { DataConstraints, UserLoginData, UserRegisterData } from '../../types'

const noLeadingOrTrailingSpace = {
  pattern: /(^\S.*\S$)|(^\S$)/,
  message: "can't start or end with a space",
}

export const registerConstraints: DataConstraints<UserRegisterData> = {
  name: {
    presence: true,
    length: { minimum: 3 },
  },
  password: {
    presence: true,
    length: {
      minimum: 3,
    },
    format: noLeadingOrTrailingSpace,
  },
  email: {
    presence: true,
    email: true,
  },
}

export const loginConstraints: DataConstraints<UserLoginData> = {
  password: {
    presence: true,
    format: noLeadingOrTrailingSpace,
  },
  email: {
    presence: true,
    email: true,
  },
}
