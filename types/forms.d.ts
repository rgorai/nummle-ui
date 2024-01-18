/**
 * @author rgorai
 * @description specifications for an input option
 * @param label user-facing label for this field
 * @param value developer-friendly key name for this field
 */
type InputOption = {
  label: string
  value: string
}

/**
 * @author rgorai
 * @description specifications for a form input field
 * @param label user-facing label for this field
 * @param type HTML type for this field, or custom in-app type - 'select' | 'radio' | 'file'
 * @param defaultValue the default form value for this field
 * @param validation the function to validate the data supplied for this field - will usually one of the error functions in the project utils, or can be a custom function, but should throw when invalid data is received
 * @param required whether or not this data field is required
 * @param options data for if this field requires an option from a set
 * @param props optional additional HTML input props for this field
 */
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
