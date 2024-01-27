import React, { useState } from 'react'
import { APP_NAME } from '../../../utils/env'
import styles from '../styles/landingPage.module.scss'
//import dietImg from '../components/diet.jpg'
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
        >{`See what your friends and locals are saying about restaurants near you`}</div>
        <div className={styles.inputContainer}>
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            placeholder="Enter address here"
            className={styles.addressBox}
          />
          <button className={styles.addressButton}>Search</button>
        </div>
      </div>
      <div className={styles.underIntro}>
          <div className={styles.box}>
            <img src= {'../components/diet.jpg'} />
            Follow your diet
            </div> 
          <div className={styles.box}>Eat with friends</div> 
          <div className={styles.box}>Safe from allergens</div> 
      </div>
    </>
  )
}

export default LandingPage
