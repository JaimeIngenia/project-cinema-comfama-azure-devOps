import React, { useEffect, useState } from "react";
import * as productAction__api from "../../actions/productAction__api";
import productStore__api from "../../stores/productStore__api";
import { ProductList } from "../../pages/homePage/features/ProductList";
import styles from "./PruebaApi.module.css";
import userStore from "../../stores/userStore";
import userStore__api from "../../stores/userStore__api";
import * as userAction from "../../actions/userActions";
import * as userAction__api from "../../actions/userAction__api";
import creditCardStore from "../../stores/cardStore";
import creditCardStore__api from "../../stores/creditCardStore__api";
import * as creditCardsActions from "../../actions/cardActions";
import * as creditCardsActions__api from "../../actions/creditCardActions__api";
import { InputCart } from "../InputCart/InputCart";
import storeProductShopping from "../../stores/productShoppingStore";
import * as actionProductShopping from "../../actions/productShoppingActions";
import * as actionProducts__api from "../../actions/productAction__api";
import { CardShoppingList } from "../../pages/ShoppingCard/features/CardShoppingList";
import * as creditCardActions_api from "../../actions/creditCardActions__api";
import { CreditCart } from "../../pages/ShoppingCard/features/CreditCart";
import storeTotalSumProducts from "../../stores/totalSumProductsStore__api";
import storeCount from "../../stores/countStores";
import * as actionTotalSumProducts from "../../actions/TotalSumProductsActions__api";
import * as actionPourchase__api from "../../actions/pourchaseAction__api";

//   -------------------------------------------------------------------------
//   -------------------- PRODUCTS -------------------------------------------
//   -------------------------------------------------------------------------

export const PruebaApi = (props) => {
  //**************************************************************************************************************** */

  const [countTotalPrice, setcountTotalPrice] = useState();
  const [countNav, setCountNav] = useState();
  useEffect(() => {
    storeProductShopping.addChangeListener(updateCountTotalPrice);
    storeProductShopping.addChangeListener(updateCount2);
  }, []);
  function updateCountTotalPrice() {
    setcountTotalPrice(storeProductShopping.getTotaSumProductsPrice());
  }
  function updateCount2() {
    setCountNav(storeProductShopping.getTotalCant());
  }

  //**************************************************************************************************************** */
  const [products, setProducts] = useState(productStore__api.getProducts());
  const [AddState, setAddState] = useState(false);

  useEffect(() => {
    if (AddState) {
      setProducts(productStore__api.getProducts());
      setAddState(false);
    }
  }, [AddState]);

  function handleAddCarProduct(e) {
    let productShopping = storeProductShopping.getProductShoppingById(
      Number(e.currentTarget.name)
    );

    if (productShopping === undefined) {
      let _product = productStore__api.getProductById(
        Number(e.currentTarget.name)
      );
      _product.count = _product.count + 1;
      actionProductShopping.saveProductShopping(_product); //SE GUARDA EL PRODUCTO EN EL CARRITO
      actionProducts__api.updateProducts(_product); //actualiza el home
    } else {
      // si el producto ya esta en el carrito
      productShopping.count = productShopping.count + 1;
      // let sumPrice = Number(productShopping.price); //********cambio */

      // sumPrice = sumPrice + Number(productShopping.price); //********cambio */

      // actionTotalSumProducts.saveTotalSumProducts__api(sumPrice); //********cambio */
      actionProductShopping.updateProductsShopping(productShopping); //actualiza carrito
      actionProducts__api.updateProducts(productShopping); //actualiza el home
    }
    setAddState(true);
  }
  //Para conectar los datos desde la api
  useEffect(() => {
    productStore__api.addChangeListener(onChange);
    if (products.length === 0) {
      productAction__api.loadProducts();
    }
  }, [products.length]);
  function onChange() {
    setProducts(productStore__api.getProducts());
  }

  //   -------------------------------------------------------------------------
  //   ----------------------- PRODUCTSSHOPPING --------------------------------
  //   -------------------------------------------------------------------------

  const [productsShopping, setProductsShopping] = useState(
    storeProductShopping.getProductsShopping()
  );

  const [deleteState, setDeleteState] = useState(false);

  useEffect(() => {
    if (deleteState) {
      setProductsShopping(storeProductShopping.getProductsShopping());
      setDeleteState(false);
    }
  }, [deleteState]);

  function handleDelete(x) {
    let productShopping = storeProductShopping.getProductShoppingById(x.id);
    if (productShopping === undefined) {
      //SI EL PRODUCTO NO EXISTE EN EL CARRITO
      alert("Hola no existe en el carro");
    } else {
      if (productShopping.count > 1) {
        productShopping.count -= 1;
        productShopping.price -= productShopping.price; //********cambio */
        actionProductShopping.updateProductsShopping(productShopping);
        actionProducts__api.updateProducts(productShopping);
      } else {
        actionProductShopping.deleteProductShopping(x.id);
        const newProduct = { ...productShopping, count: 0 };
        actionProducts__api.updateProducts(newProduct);
      }

      setDeleteState(true);
    }
  }

  //   -------------------------------------------------------------------------
  //   ----------------------- Users --------------------------------
  //   -------------------------------------------------------------------------

  // const [users, setUsers] = useState(userStore__api.getUser());

  // useEffect(() => {
  //   userStore__api.addChangeListener(onChangeUser);
  //   // debugger;
  //   if (users.length === 0) {
  //     userAction__api.loadUsers();
  //   }
  // }, [users.length]);

  // function onChangeUser() {
  //   setUsers(userStore__api.getUser());
  // }

  // console.log("users:" + users);

  //   -------------------------------------------------------------------------
  //   ----------------------- CreditCards --------------------------------
  //   -------------------------------------------------------------------------

  const [creditCards, setCreditCards] = useState(
    creditCardStore__api.getCards()
  );

  useEffect(() => {
    creditCardStore__api.addChangeListener(loadCards);

    if (creditCards.length === 0) {
      creditCardsActions__api.loadCards();
    }
  }, [creditCards.length]);

  function loadCards() {
    setCreditCards(creditCardStore__api.getCards());
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
    };
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

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;

    actionPourchase__api.savePourchase(creditCart); //********cambio */

    creditCardActions_api.saveCreditCard__api(creditCart);
    let objectJaime = { prueba: countTotalPrice };
    creditCardActions_api.saveCreditCard__api(objectJaime);
    creditCardActions_api.saveCreditCard__api(productsShopping);
  }

  //-------------------------------------------------------------------------------------------------------------------

  return (
    <div>
      {/* //   -------------------------------------------------------------------------
  //   -------------------- PRODUCTS y PRODUCTSHOPPING ------------------------------
  //   ------------------------------------------------------------------------- */}
      <div className={styles.container__cards}>
        <ProductList
          products={products}
          onAddCarProduct={handleAddCarProduct}
        />
      </div>

      <hr />

      <div>
        ----------------------------------------------------------------
      </div>

      <h1>ESTO ESTO ESTO ESTO</h1>

      <CardShoppingList
        productsShopping={productsShopping}
        onDelete={handleDelete}
      />

      <h1>
        La suma total es: {countTotalPrice} y {countNav}
      </h1>

      <h1>ESTO ESTO ESTO ESTO</h1>

      <div>
        ----------------------------------------------------------------
      </div>

      {/* //   -------------------------------------------------------------------------
  //   -------------------- USERS ------------------------------
  //   ------------------------------------------------------------------------- */}

      {/* {users.map((x) => {
        return (
          <>
            <img
              src={x.image}
              alt=""
              className={styles.container__car__circle__img}
            />
            <p>{x.name}</p>
          </>
        );
      })} */}

      <hr />

      <div>
        ----------------------------------------------------------------
      </div>

      {/* //   -------------------------------------------------------------------------
  //   -------------------- CreditCards ------------------------------
  //   ------------------------------------------------------------------------- */}

      <div className={styles.container__right}>
        <CreditCart
          className={styles.container__right__credit}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          creditCart={creditCart}
          cards={creditCards}
          errors={errors}
        />
      </div>
    </div>
  );
};
