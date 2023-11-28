import React from 'react'
import styles from './TitleCard.module.css'
import arrow from '../../assets/arrow.svg'



export const TitleCard = (props) => {
  return(
    <>

        <div className={styles.container}>
            <div className={styles.title}>
                        <div className={styles.text}>

                            <img src={props.image} alt="" />
                            <p>{props.title}</p>

                        </div>
                        <br />
                        <div className={styles.line__gray}>

                    </div>


            </div>
        </div>
    
    </>
   )
  }
