import cx from 'classnames'
import { useState, useEffect } from 'react'
import NummleImage from '../../Main/components/NummleImage'
import ReactionBox from '../../User/components/ReactionBox'
import styles from '../styles/menuItem.module.scss'
import Modal from 'react-bootstrap/esm/Modal'
import Button from 'react-bootstrap/esm/Button'

type Props = {
  info: MenuListItem
  reactions: MenuItemReactions | null
}
const MenuListItem = ({ info, reactions }: Props) => {
  const [showModal, setShowModal] = useState(false)
  const [needReload, setNeedReload] = useState(false)

  //when the modal should close, the component needs to reload so the modal doesn't rerender
  useEffect(() =>{
    setShowModal(false)
    setNeedReload(false)
  }, [needReload])

  return <div id={info.id} className={styles.container} onClick={() => {
    setShowModal(true)
  }}>
    <div className={styles.price}>{`$${info.price}`}</div>

    <NummleImage
      className={styles.image}
      src={info.imagePath}
      alt={info.name}
    />

    <div className={styles.infoContainer}>
      <div className={styles.details}>
        <div className={styles.name}>{info.name}</div>
        {info.ingredients && (
          <div className={cx(styles.description, 'text-muted')}> 
            Made with {info.ingredients.join(", ")}
          </div>
        )}
        {info.allergens && (
          <div className={cx(styles.description, 'text-muted')}> 
            Allergens: {info.allergens.join(", ")}
          </div>
        )}
        {info.description && (
          <div className={cx(styles.description, 'text-muted')}>
            {info.description}
          </div>
        )}
      </div>
      <div>
    {showModal &&
        <Modal
        className={styles.modalContainer}
        show={showModal}
        onHide={() => {
          setNeedReload(true)
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{info.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.listContainer}>
            {info.imagePath && <img src={info.imagePath} alt={info.name} width="200" height="200" className={styles.modalContainer} />}
            <br/>
            ${info.price}
            <br/>
            Ingredients: {info.ingredients}
            <br/>
            Allergens: {info.allergens}
            <br/>
            <br/>
            <Button onClick={()=>{
              alert("Added to cart")
              setNeedReload(true);
            }}>Add to Cart
            </Button>   
          </div>
        
        </Modal.Body>
      </Modal>
    }
    </div>
      {/* {(() => {
        console.log('THIS', reactions)
        return null
      })()} */}

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

          }

export default MenuListItem
