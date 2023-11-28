import React from 'react'
import styles from './InputCart.module.css'
import PropTypes from 'prop-types'

/**
* @author
* @function 
**/

export const InputCart = (props) => {

    let wrapperClass = styles.container__input

    if( props.errors.length > 0 ){
        wrapperClass += " has-error"
    }

  return(
    <>

        {/* <div className={styles.container__input}> */}
        <div className={ wrapperClass }>
            <input type="text" 
                placeholder={props.placeholder} 
                value={props.creditCartValue}
                onChange={props.onChange}
                id={props.id}
                name={props.name}
                // error={props.errors}
                /
                
                >
            <label className={styles.lbl__nombre} >
                <span className={styles.txt__nombre} > {props.label} </span>
            </label>
        </div>
        { props.errors && <div className='alert alert-danger' > { props.errors} </div> }
    
    </>
   )
  }


  InputCart.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    errors: PropTypes.string
  };

InputCart.defaultProps = {
    errors: ""
}