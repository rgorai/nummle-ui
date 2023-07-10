type InputOption = {
  label: string
  value: string
}

type FormSpecs = {
  label: string
  type: string
  defaultValue: string | string[]
  validation?: (arg: any) => void
  required?: boolean
  options?: InputOption[]
  props?: any
}

type SignupFormSpecs = {
  readonly [_ in keyof (UserRegistrationInfo & {
    passwordConfirmation: string
  })]-?: FormSpecs
}

type LoginFormSpecs = {
  readonly [_ in keyof LoginSpecs]: FormSpecs
}

type AllFormSpecs = SignupFormSpecs & LoginSpecs
