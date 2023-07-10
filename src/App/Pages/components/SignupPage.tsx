import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Select from 'react-select'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import { reduceFormSpecs } from '../../../utils/forms'
import { signup } from '../../../services/authService'
import styles from '../styles/formPage.module.scss'
import { nationalitiesOptions } from '../../../utils/optionValues'

// TODO: ADD FORM VALIDATION

// TODO: ADD AUTO LOGIN AFTER SIGNUP USING CONTEXT

// TODO: ADD LOADING BUTTON

const SIGNUP_SPECS: SignupFormSpecs = {
  fullName: {
    label: 'First Name',
    type: 'text',
    defaultValue: '',
    required: true,
    props: { placeholder: 'Joe Doe' },
  },
  birthdate: {
    label: 'Birth Date',
    type: 'date',
    defaultValue: '',
    required: true,
  },
  gender: {
    label: 'Gender',
    type: 'radio',
    defaultValue: '',
    required: true,
    options: [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' },
      { label: 'Transgender', value: 'transgender' },
      { label: 'Non-binary/non-conforming', value: 'nonBinary' },
      { label: 'I choose not to disclose', value: 'none' },
    ],
    props: { placeholder: 'Doe' },
  },
  nationalities: {
    label: 'Nationalities',
    type: 'select',
    defaultValue: [],
    options: nationalitiesOptions.map((e) => ({
      label: e,
      value: e.toLowerCase(),
    })),
    props: { multiple: true },
  },
  email: {
    label: 'Email',
    type: 'email',
    defaultValue: '',
    required: true,
    props: { placeholder: 'joedoe@domain.com' },
  },
  username: {
    label: 'Username',
    type: 'text',
    defaultValue: '',
    required: true,
    props: { placeholder: 'joedoe1234' },
  },
  password: {
    label: 'Password',
    type: 'password',
    defaultValue: '',
    required: true,
  },
  passwordConfirmation: {
    label: 'Confirm Password',
    type: 'password',
    defaultValue: '',
    required: true,
  },
}

const SIGNUP_KEYS = Object.keys(SIGNUP_SPECS) as (keyof SignupFormSpecs)[]

const DEFAULT_FORM_STATE = reduceFormSpecs(
  SIGNUP_KEYS,
  (c: keyof SignupFormSpecs) => [c, SIGNUP_SPECS[c].defaultValue]
)

const DEFAULT_ERROR_STATE = reduceFormSpecs(SIGNUP_KEYS, (c) => [c, false])

const SignupPage = () => {
  const [profileData, setProfileData] = useState(DEFAULT_FORM_STATE)
  const [formErrors, setFormErrors] = useState(DEFAULT_ERROR_STATE)
  const [signupError, setSignupError] = useState('')
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false)

  // update passwordConfirmation validation to use state
  // SIGNUP_SPECS.passwordConfirmation.validation = () => {
  //   if (profileData.password !== profileData.passwordConfirmation)
  //     throw 'Passwords must match.'
  // }

  const onInputChange = (key: keyof SignupFormSpecs, value: any) =>
    setProfileData((prev) => ({ ...prev, [key]: value }))

  const onFormSubmit = (ev: any) => {
    ev.preventDefault()
    setSubmitButtonDisabled(true)

    // error check
    setFormErrors(DEFAULT_ERROR_STATE)
    let formErrorPresent = false
    for (const key of SIGNUP_KEYS)
      try {
        // SIGNUP_SPECS[key].validation?.(profileData[key])
      } catch (err) {
        setFormErrors((prev) => ({ ...prev, [key]: String(err) }))
        formErrorPresent = true
      }

    ;(async () => {
      // let profilePhotoUrl = null

      // if (profileImage)
      //   try {
      //     profilePhotoUrl = await uploadFile(
      //       profileImage,
      //       'profile',
      //       profileImage.name
      //     )
      //   } catch (err) {
      //     formErrorPresent = true
      //     setSignupError('An error occurred uploading the photo. Try again!')
      //   }

      if (!formErrorPresent)
        try {
          await signup({
            ...profileData,
            // profilePhotoUrl,
            passwordConfirmation: undefined,
          } as any)
          window.location.reload()
        } catch (err: any) {
          if (err.response.status == 409) setSignupError(err.response.data)
          else console.error('signup error', err.response)
        }

      setSubmitButtonDisabled(false)
    })()
  }

  return (
    <div className={styles.formContainer}>
      <h1>Sign Up</h1>

      <Form id="signup-form" onSubmit={onFormSubmit}>
        {SIGNUP_KEYS.map((currKey) => {
          const currSpecs = SIGNUP_SPECS[currKey]
          const inputId = `user-${currKey}`
          const inputOptionId = (id: any) => `${inputId}-${id}`

          return (
            <Fragment key={inputId}>
              <Form.Group className="mb-4">
                {(() => {
                  if (currSpecs.type === 'select') {
                    return (
                      <div className={styles.selectContainer}>
                        <Select
                          options={currSpecs.options}
                          isMulti={currSpecs.props?.multiple}
                          onChange={(selectedOptions) =>
                            selectedOptions
                              ? onInputChange(
                                  currKey,
                                  (selectedOptions as []).map(
                                    (e: any) => e.value
                                  )
                                )
                              : []
                          }
                        />
                      </div>
                    )
                  }
                  if (currSpecs.type === 'radio')
                    return (
                      <>
                        <Form.Label>{currSpecs.label}</Form.Label>
                        {currSpecs.options?.map((f) => (
                          <Form.Check
                            id={inputOptionId(f.value)}
                            type="radio"
                            label={f.label}
                            value={f.value}
                            checked={profileData[currKey] === f.value}
                            onChange={(ev) =>
                              onInputChange(currKey, ev.target.value)
                            }
                            key={inputOptionId(f.value)}
                          />
                        ))}
                      </>
                    )
                  if (currSpecs.type === 'file')
                    return (
                      <div>
                        <Form.Label htmlFor={inputId}>
                          {currSpecs.label}
                        </Form.Label>
                        <Form.Control
                          id={inputId}
                          {...currSpecs.props}
                          type={currSpecs.type}
                          onChange={(ev) =>
                            setProfileImage((ev.target as any).files[0])
                          }
                        />
                      </div>
                    )

                  return (
                    <FloatingLabel label={currSpecs.label} controlId={inputId}>
                      <Form.Control
                        {...currSpecs.props}
                        type={currSpecs.type}
                        onChange={(ev) =>
                          onInputChange(currKey, ev.target.value)
                        }
                      />
                    </FloatingLabel>
                  )
                })()}

                {formErrors[currKey] && (
                  <span className="field-error">{formErrors[currKey]}</span>
                )}
              </Form.Group>
            </Fragment>
          )
        })}

        {signupError && (
          <Form.Group className="mb-3 form-error">{signupError}</Form.Group>
        )}

        <Button
          className="mb-5"
          variant={submitButtonDisabled ? 'dark' : 'primary'}
          disabled={submitButtonDisabled}
          type="submit"
          form="signup-form"
        >
          Submit
        </Button>
      </Form>

      <Link to="/login">{'Already have an account? Login here!'}</Link>
    </div>
  )
}

export default SignupPage
