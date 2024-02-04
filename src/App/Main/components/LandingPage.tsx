import React, { useState, useEffect } from 'react'
import { APP_NAME } from '../../../utils/env'
import styles from '../styles/landingPage.module.scss'
//import test from 'src/App/Main/components/diet.jpg'
import { ReactTyped } from 'react-typed'

const LandingPage = () => {
  const [userInput, setUserInput] = useState('')

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value)
  }

  return (
    <>
      <div className={styles.intro}>
        <div className={styles.slogan}>
          {' '}
          <ReactTyped
            strings={[
              'Connect, Share, Savor',
              'Where health meets happiness',
              'Shared plates, shared stories',
              'Your healthful journey starts here!',
              'Eat well, live well',
              'Your diet, your way',
            ]}
            typeSpeed={60}
            loop
            backSpeed={20}
          />
        </div>
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
        <div className={styles.aboutNummleBoxContainer}>
          <div className={styles.aboutNummleTitle}>
            Where Culinary Delights Meet Social Connections!
          </div>
          <div className={styles.aboutNummleInfo}>
            Discover a world of culinary wonders and social connections like
            never before with Nummle - your ultimate food delivery app with a
            twist! We&apos;re not just about bringing delicious meals to your
            doorstep, we&apos;re here to revolutionize the way you experience
            and share your food journey.
          </div>
        </div>
        <div className={styles.aboutNummleBoxContainer}>
          <div className={styles.aboutNummleTitle}>
            Personalized for Your Palate
          </div>
          <div className={styles.aboutNummleInfo}>
            We understand that everyone&apos;s dietary journey is unique. Tailor
            your Nummle experience to match all of your preferences, including
            keto, vegan, gluten-free, allergy-friendly and more. Our app is your
            personalized food haven, making it easy for you to find meals that
            fit your lifestyle.
          </div>
        </div>
        <div className={styles.aboutNummleBoxContainer}>
          <div className={styles.aboutNummleTitle}>
            Connect with Local Foodies
          </div>
          <div className={styles.aboutNummleInfo}>
            Food is better when shared with friends! Connect with your foodie
            tribe on Nummle&apos;s social platform. Share your favorite dishes,
            exchange reviews, and stay in the loop with what your friends are
            devouring. From mouth-watering snapshots to insightful restaurant
            recommendations, your culinary circle just got a whole lot tastier.
          </div>
        </div>
        <div className={styles.aboutNummleBoxContainer}>
          <div className={styles.aboutNummleTitle}>
            Uncover Hidden Local Gems
          </div>
          <div className={styles.aboutNummleInfo}>
            From neighborhood favorites to exotic delicacies, Nummle brings the
            world to your table. Explore local food scenes, try trending dishes,
            and open your palate to a world of diverse tastes. The journey
            begins in your city and extends to every corner of the globe.
          </div>
        </div>
      </div>
      <div className={styles.footerContainer}>
        <div className={styles.footerSides} id={styles.footerLeft}>
          <div className={styles.footerNummle}>Nummle</div>
          <div className={styles.footerYear}>&#169; Nummle 2024</div>
        </div>
        <div className={styles.footerSides} id={styles.footerRight}>
          <li className={styles.footerList}>Contact Us</li>
          <li className={styles.footerList}>Sign Up</li>
          <li className={styles.footerList}>Locations</li>
          <li className={styles.footerList}>Restaurants</li>
        </div>
      </div>
    </>
  )
}

export default LandingPage
