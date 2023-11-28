import React, { useEffect, useState } from "react";
import styles from "../styles/CreditCart.module.css";
import credits from "../../../assets/credits.svg";
import { InputCart } from "../../../components/InputCart/InputCart";
import arrow_btn from "../../../assets/arrow__right.svg";
import creditCardStore from "../../../stores/cardStore";
import * as creditCardActions from "../../../actions/cardActions";
import { Navigate } from "react-router-dom";


export const CreditCart = ({
  handleSubmit,
  handleChange,
  creditCart,
  cards,
  errors,
}) => {
  return (
    <>
      <div className={styles.containers}>
        <div className={styles.containers__img}>
          <img src={credits} alt="" />
        </div>

        <form className={styles.form__cart} action="" onSubmit={handleSubmit}>
          {cards.map((x) => {
            return (
              <>
                <InputCart
                  errors={errors.cardHolderName}
                  label={`Cardholder name`}
                  placeholder={x.cardHolderName}
                  creditCartValue={creditCart.cardHolderName}
                  onChange={handleChange}
                  id={`cardHolderName`}
                  name={`cardHolderName`}
                />

                <InputCart
                  errors={errors.cardNumber}
                  label={`Card number`}
                  placeholder={x.cardNumber}
                  creditCartValue={creditCart.cardNumber}
                  onChange={handleChange}
                  id={`cardNumber`}
                  name={`cardNumber`}
                />

                <div className={styles.divide__inputs}>
                  <div className={styles.part}>
                    <InputCart
                      errors={errors.expDate}
                      className={styles.divide__inputs__part}
                      label={`Exp date`}
                      placeholder={x.expDate}
                      creditCartValue={creditCart.expDate}
                      onChange={handleChange}
                      id={`expDate`}
                      name={`expDate`}
                    />
                  </div>

                  <div className={styles.part}>
                    <InputCart
                      errors={errors.cvc}
                      className={styles.divide__inputs__part}
                      label={`CVC`}
                      placeholder={x.cvc}
                      creditCartValue={creditCart.cvc}
                      onChange={handleChange}
                      id={`cvc`}
                      name={`cvc`}
                    />
                  </div>
                </div>
              </>
            );
          })}
          <br />
          <br />
          <br />

          <div className={styles.container__btn}>
            <button className={styles.button}>
              <div className={styles.checkout}>
                <div className={styles.container__p}>
                  <p>$1,672</p>
                </div>

                <div className={styles.box__right}>
                  <p>Checkout</p>
                  <img src={arrow_btn} alt="" />
                </div>
              </div>
            </button>
          </div>

          <br />
          <br />
        </form>
      </div>
    </>
  );
};
