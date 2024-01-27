import React, { useState } from 'react'
import { APP_NAME } from '../../../utils/env'
import styles from '../styles/landingPage.module.scss'
//import test from 'src/App/Main/components/diet.jpg'
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
      <div className = {styles.imgBoxes}>
        <div className= {styles.imgBox} id = {styles.box1}></div>
        <div className= {styles.imgBox} id = {styles.box2}></div>
        <div className= {styles.imgBox} id = {styles.box3}></div>
      </div>
      <div className={styles.underIntro}>
          <div className={styles.box}>Follow your diet</div> 
          <div className={styles.box}>Eat with friends</div> 
          <div className={styles.box}>Safe from allergens</div> 
      </div>
    </>
  )
}

export default LandingPage
