import { APP_NAME } from '../../../utils/env'
import React, { useState } from 'react'
import styles from '../styles/landingPage.module.scss'
const LandingPage = () => {
  const [userInput, setUserInput] = useState('')

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value)
  }

  return (
    <>
      <div className={styles.intro}>
        <div
          className={styles.slogan}
        >{`See what your friends and locals are saying right now about restaurants near you`}</div>
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Enter delivery address"
          className={styles.addressBox}
        />
      </div>
    </>
  )
}

export default LandingPage
