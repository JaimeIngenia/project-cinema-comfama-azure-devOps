import React, { useEffect, useState } from "react";
import styles from "../styles/CardShoppingList.module.css";
import garbage from "../../../assets/garbage.svg";

export const CardShoppingList = ({ productsShopping, onDelete }) => {
  return (
    <>
      {productsShopping.map((x) => {
        return (
          <>
            <div key={x.id} className={styles.container}>
              <div className={styles.card__sale}>
                <div className={styles.card__sale__left}>
                  <img className={styles.image__product} src={x.image} alt="" />

                  <div className={styles.card__sale__left__text}>
                    <h1>{x.title}</h1>
                    <p>{x.descripcion}</p>

                    <div className={styles.card__sale__left__text__count}>
                      <p> {x.count} </p>
                      <br />
                    </div>
                  </div>
                </div>

                <div className={styles.card__sale__right}>
                  <button
                    onClick={(e) => {
                      onDelete(x);
                    }}
                  >
                    <img src={garbage} alt="" />
                  </button>

                  <p>{x.price}</p>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};
