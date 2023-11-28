import React, { useState, useEffect } from "react";
import styles from "./styles/ShoppingCard.module.css";
import arrow from "../../assets/arrow.svg";
import { CardShoppingList } from "./features/CardShoppingList";
import storeProductShopping from "../../stores/productShoppingStore";
import { TitleCard } from "../../components/titleCard/TitleCard";
import { CreditCart } from "./features/CreditCart";
import * as actionProductShopping from "../../actions/productShoppingActions";
import * as actionProduct__api from "../../actions/productAction__api";
import storeCreditCard__api from "../../stores/creditCardStore__api";
import { Navigate } from "react-router-dom";
import * as actionCreditCard from "../../actions/cardActions";
import * as actionsCreditCards__api from "../../actions/creditCardActions__api";
import * as actionPourchase__api from "../../actions/pourchaseAction__api";

export const ShoppingCar = (props) => {
  const [productsShopping, setProductsShopping] = useState(
    storeProductShopping.getProductsShopping()
  );

  const [deleteState, setDeleteState] = useState(false);

  // useEffect(() => {
  //   if (deleteState) {
  //     setProductsShopping(storeProductShopping.getProductsShopping());
  //     setDeleteState(false);
  //   }
  // }, [deleteState]);

  function handleDelete(x) {
    let _productShopping = storeProductShopping.getProductShoppingById(x.id);
    if (_productShopping === undefined) {
      //SI EL PRODUCTO NO EXISTE EN EL CARRITO
      alert("Hola no existe en el carro");
    } else {
      if (_productShopping.count > 1) {
        _productShopping.count -= 1;
        actionProductShopping.updateProductsShopping(_productShopping);
        actionProduct__api.updateProducts(_productShopping); //actualizo el numero del producto pero en el home
      } else {
        actionProductShopping.deleteProductShopping(x.id);
        const newProduct = { ..._productShopping, count: 0 }; // copiar elemento y modificar el atributo específico despues de la coma
        actionProduct__api.updateProducts(newProduct);
      }
      setDeleteState(true);
    }
  }

  //-------------------------------------------------------------------------------------------------------------------

  const [cards, setCards] = useState(storeCreditCard__api.getCards());

  // useEffect(() => {
  //   storeCreditCard__api.addChangeListener(loadCards);


  //   if (cards.length === 0) {
  //     actionsCreditCards__api.loadCards();
  //   }

  // }, [cards.length]);

  function loadCards() {
    setCards(storeCreditCard__api.getCards());
  }
  //PORQUE NO FUNCIONA?
  function savedCard() {
    alert("Hola estamos aquí!");

    Navigate("/", { replace: true });
  }

  //-------------------------------------------------------------------------------------------------------------------

  const [creditCart, setCreditCart] = useState({
    id: null,
    cardHolderName: "",
    cardNumber: "",
    expDate: "",
    cvc: "",
  });

  function handleChange(event) {
    const updateCourse = {
      ...creditCart,
      [event.target.name]: event.target.value,
    }; // Se establece una propiedad en este objeto en función del valor de la variable
    setCreditCart(updateCourse);
  }

  //-------------------------------------------------------------------------------------------------------------------

  const [errors, setErrors] = useState({});

  function formIsValid() {
    const _errors = {};
    if (!creditCart.cardHolderName)
      _errors.cardHolderName = "cardHolderName Is Required";
    if (!creditCart.cardNumber) _errors.cardNumber = "cardNumber Is Required";
    if (!creditCart.expDate) _errors.expDate = "expDate Is Required";
    if (!creditCart.cvc) _errors.cvc = "cvc Is Required";

    setErrors(_errors);

    return Object.keys(_errors).length === 0;
  }

  //*** */

  const [countTotalPrice, setcountTotalPrice] = useState(
    storeProductShopping.getTotaSumProductsPrice()
  );
  const [countNav, setCountNav] = useState();
  // useEffect(() => {
  //   storeProductShopping.addChangeListener(updateCountTotalPrice);
  //   storeProductShopping.addChangeListener(updateCount2);
  // }, []);
  function updateCountTotalPrice() {
    setcountTotalPrice(storeProductShopping.getTotaSumProductsPrice());
  }
  function updateCount2() {
    setCountNav(storeProductShopping.getTotalCant());
  }

  //*** */

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;

    // actionsCreditCards__api.saveCreditCard__api(creditCart);
    actionPourchase__api.savePourchase(creditCart);
    actionPourchase__api.savePourchase(productsShopping);
    let prueba = {
      TotalPrice: countTotalPrice,
    };
    actionPourchase__api.savePourchase(prueba);
  }

  return (
    <>
      <div className={styles.container2}>
        <div className={styles.container__titles}>
          <div className={styles.container__titles__part}>
            <TitleCard title={`Shopping Continue`} image={arrow} />
            <h1>
              {" "}
              Miralo aui:
              {countTotalPrice}
            </h1>
          </div>
          <div className={styles.container__titles__part}>
            <TitleCard title={`Shopping Cart`} image={``} />
          </div>
        </div>
        <br />
        <br />
        <br />
        <div className={styles.container}>
          <div className={styles.container__left}>
            <CardShoppingList
              productsShopping={productsShopping}
              onDelete={handleDelete}
            />
          </div>
          <div className={styles.container__right}>
            <CreditCart
              className={styles.container__right__credit}
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              creditCart={creditCart}
              cards={cards}
              errors={errors}
            />
          </div>
        </div>
        <br />
        <br />
      </div>
    </>
  );
};
