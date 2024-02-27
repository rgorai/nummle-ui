import cx from 'classnames'
import NummleImage from '../../Main/components/NummleImage'
import ReactionBox from '../../User/components/ReactionBox'
import styles from '../styles/menuItem.module.scss'
import { useAppSelector } from '../../../state/hooks'
import { selectSessionData } from '../../../state/sessionDataSlice'
import { useEffect } from 'react'
import { useAuthInfo } from '../../../state/authContext'
import { useState } from 'react'

type Props = {
  info: MenuListItem
  reactions: MenuItemReactions | null
}

const MenuListItem = ({ info, reactions }: Props) => {
  const { authInfo } = useAuthInfo();
  const { loadedProfiles } = useAppSelector(selectSessionData)
  let [hasAllergy, setHasAllergy] = useState(false);

  useEffect(() => {
    let allergens = [""];
    let contains = false;
    if(authInfo.authenticated === true){
      let user = Object.values(loadedProfiles)[0]
      allergens = user.allergens
    }
    console.log(allergens)
    console.log(info.allergens)

    if(info.allergens != undefined){
      let string = info.allergens[0];
      for(let i = 0; i < allergens.length; i++){
        let temp = allergens[i].charAt(0).toUpperCase() + allergens[i].slice(1);
        if(string.includes(temp)){
          contains = true;
          setHasAllergy(true)
          break;
        }
      }
    }
  }, [])
  if(hasAllergy){
    return (
      <div id={info.id} className={styles.containerAllergen}>
        <div className={styles.price}>{`$${info.price}`}</div>
    
        <NummleImage
          className={styles.image}
          src={info.imagePath}
          alt={info.name}
        />
    
        <div className={styles.infoContainer}>
          <div className={styles.details}>
            <div className={styles.name}>{info.name}</div>
    
            {info.description && (
              <div className={cx(styles.description, 'text-muted')}>
                {info.description}
              </div>
            )}
          </div>
    
          {reactions && (
            <div className={styles.reactions}>
              {Object.entries(reactions).map(([itemId, users]) => (
                <div className={styles.reactionBox} key={itemId}>
                  <ReactionBox
                    className={styles.reaction}
                    showCurrOnly
                    reactionRank={Number(itemId)}
                    tense="present"
                  />
                  <span className={styles.numUsers}>{users.length}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      )
  }else{
    return (
      <div id={info.id} className={styles.container}>
        <div className={styles.price}>{`$${info.price}`}</div>
    
        <NummleImage
          className={styles.image}
          src={info.imagePath}
          alt={info.name}
        />
    
        <div className={styles.infoContainer}>
          <div className={styles.details}>
            <div className={styles.name}>{info.name}</div>
    
            {info.description && (
              <div className={cx(styles.description, 'text-muted')}>
                {info.description}
              </div>
            )}
          </div>
    
          {reactions && (
            <div className={styles.reactions}>
              {Object.entries(reactions).map(([itemId, users]) => (
                <div className={styles.reactionBox} key={itemId}>
                  <ReactionBox
                    className={styles.reaction}
                    showCurrOnly
                    reactionRank={Number(itemId)}
                    tense="present"
                  />
                  <span className={styles.numUsers}>{users.length}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      )
  }
  
}

export default MenuListItem
