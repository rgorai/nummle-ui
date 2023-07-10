import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
// import { isValidPassword, isValidUserName } from '../../utils/errors'
import cx from 'classnames'
import Spinner from 'react-bootstrap/esm/Spinner'
import { login } from '../../../services/authService'
import { reduceFormSpecs } from '../../../utils/forms'
import styles from '../styles/formPage.module.scss'
import { useAuthInfo } from '../../../state/authContext'

const LOGIN_SPECS: LoginFormSpecs = {
  username: {
    label: 'Username',
    type: 'text',
    defaultValue: '',
    validation: () => {},
    required: true,
    props: { placeholder: 'Enter username' },
  },
  password: {
    label: 'Password',
    type: 'password',
    defaultValue: '',
    validation: () => {},
    required: true,
    props: { placeholder: 'Enter password' },
  },
}

const LOGIN_KEYS = Object.keys(LOGIN_SPECS) as (keyof LoginFormSpecs)[]

const DEFAULT_FORM_STATE = reduceFormSpecs(
  LOGIN_KEYS,
  (c: keyof LoginFormSpecs) => [c, LOGIN_SPECS[c].defaultValue]
)

const LoginPage = () => {
  const [loginData, setLoginData] = useState(DEFAULT_FORM_STATE)
  const [loginError, setLoginError] = useState('')
  const [loading, setLoading] = useState(false)
  const { setAuthInfo } = useAuthInfo()

  const onInputChange = (key: keyof LoginFormSpecs, value: string | string[]) =>
    setLoginData((prev) => ({ ...prev, [key]: value }))

  const onFormSubmit = (ev: any) => {
    ev.preventDefault()
    let loginError = false

    // error check
    setLoginError('')
    setLoading(true)
    for (const key of LOGIN_KEYS)
      try {
        LOGIN_SPECS[key].validation?.(loginData[key])
      } catch (err) {
        setLoading(false)
        setLoginError('Invalid username or password')
        loginError = true
      }

    if (!loginError)
      login(loginData)
        .then((data) => setAuthInfo(data))
        .catch((err) => {
          if (err?.response?.status === 401)
            setLoginError('Invalid username or password')
          else {
            setLoginError('Unknown login error')
            console.error('login error', err)
          }
        })
        .then(() => setLoading(false))
  }

  return (
    <div className={styles.formContainer}>
      <h1>Login</h1>

      <Form id="login-form" onSubmit={onFormSubmit}>
        {LOGIN_KEYS.map((currKey) => {
          const currSpecs = LOGIN_SPECS[currKey]
          const inputId = `login-${currKey}`

          return (
            <Fragment key={inputId}>
              <FloatingLabel
                className="mb-4"
                label={currSpecs.label}
                controlId={inputId}
              >
                <Form.Control
                  {...currSpecs.props}
                  type={currSpecs.type}
                  onChange={(ev) => onInputChange(currKey, ev.target.value)}
                />
              </FloatingLabel>
            </Fragment>
          )
        })}

        {loginError && (
          <Form.Group
            className={cx('mb-4', styles.formError)}
            form-error="true"
          >
            {loginError}
          </Form.Group>
        )}

        <Button
          className="mb-5"
          variant="primary"
          type="submit"
          form="login-form"
          disabled={loading}
        >
          {loading ? <Spinner as="span" size="sm" /> : 'Enter'}
        </Button>
      </Form>

      <Link to="/signup">{`Don't have an account? Sign up here!`}</Link>
    </div>
  )
}

export default LoginPage
