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
      <div className={styles.imgBoxes}>
        <div className={styles.imgBox} id={styles.box1}></div>
        <div className={styles.imgBox} id={styles.box2}></div>
        <div className={styles.imgBox} id={styles.box3}></div>
      </div>
      <div className={styles.underIntro}>
        <div className={styles.box}>
          Follow your diet{' '}
          <div className={styles.boxIn}>
            Enjoy foods that fall in line with your diet
          </div>
        </div>
        <div className={styles.box}>
          Eat with friends{' '}
          <div className={styles.boxIn}>See what your friends are enjoying</div>
        </div>
        <div className={styles.box}>
          Safe from allergens
          <div className={styles.boxIn}>
            Be sure that what you order is safe to enjoy
          </div>
        </div>
      </div>
      <div className={styles.aboutNummleContainer}>
        <div className={styles.aboutNummleTitle}>About Nummle</div>
        <div className={styles.aboutNummleInfo}>
          Here at Nummle, our goal is to Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Excepturi nihil magnam repellendus corrupti labore.
          Ipsum incidunt reprehenderit, dicta id rerum assumenda. Ratione quis
          sint eos? Nemo rerum dolorum et nostrum. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Fugiat error iste quasi, officia ipsa
          vel deleniti tempora molestias sed dignissimos illum excepturi saepe,
          numquam tenetur laudantium accusantium in maiores quidem! Lorem ipsum
          dolor sit amet, consectetur adipisicing elit. Voluptate modi esse
          architecto laudantium dolor, voluptas error ipsa iusto! Magni ipsam
          neque sequi ea, illum fugit unde aperiam quisquam vero beatae?
        </div>
      </div>
      <div className={styles.footerContainer}>
        <div className={styles.footerInfo}>FOOTER HERE</div>
      </div>
    </>
  )
}

export default LandingPage
