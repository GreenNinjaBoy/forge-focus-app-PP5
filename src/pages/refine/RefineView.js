import React from 'react'
import btnStyles from '../../styles/Button.module.css';
import styles from '../../styles/RefineView.module.css';

const RefineView = (props) => {
  const {
    name,
    why,
    image,
    setRefineState,
  } = props;

  const handleEdit = () => {
    setRefineState('edit');
  }

  const handleDelete = () => {
    setRefineState('delete');
  }

  return (
    <div className={styles.ViewContainer}>
      <img className={styles.Image} src={image} alt='refinement'/>
      <div className={styles.Details}>
        <h2 className={styles.Title}>{name}</h2>
        <p>{why}</p>
        <div className={styles.IconContainer}>
          <button className={btnStyles.Icon} aria-label="Click to edit refinement" onClick={handleEdit}>
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
          <button aria-label="Click to delete refinement" onClick={handleDelete}>
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default RefineView