import React, { useEffect, useState } from "react";
import principalPhoto from "./../../assets/cover.jpg";
import styles from "./styles/HomePage.module.css";
import { ProductList } from "./features/ProductList";
import storeProduct from "./../../stores/productStore";
import storeProductShopping from "./../../stores/productShoppingStore";
import * as actionProductShopping from "./../../actions/productShoppingActions";
import * as actionProducts from "./../../actions/productActions";
import * as actionCount from "./../../actions/countActions";
import storeProduct__api from "../../stores/productStore__api";
import * as actionProducts__api from "../../actions/productAction__api";
import { useNavigate } from "react-router-dom";

export const HomePage = (props) => {
  let navigate = useNavigate();
  const [products, setProducts] = useState(storeProduct__api.getProducts());
  const [AddState, setAddState] = useState(false);

  useEffect(() => {
    if (AddState) {
      setProducts(storeProduct__api.getProducts());
      setAddState(false);
    }
  }, [AddState]);

  function handleAddCarProduct(e) {
    //Se está buscando el producto en el shopping
    let productShopping = storeProductShopping.getProductShoppingById(
      Number(e.currentTarget.name)
    );

    if (productShopping === undefined) {
      //SI EL PRODUCTO NO EXISTE EN EL CARRITO
      let _product = storeProduct__api.getProductById(
        Number(e.currentTarget.name)
      ); //SE BUSCA EL PRODUCTO EN LOS PRODUCTOS GENERALES
      _product.count = _product.count + 1; //SE LE AUMENTA LA CANTIDAD EXISTENTE
      actionProductShopping.saveProductShopping(_product); //SE GUARDA EL PRODUCTO EN EL CARRITO
      actionProducts__api.updateProducts(_product); //actualiza el home
    } else {
      // si el producto ya esta en el carrito
      productShopping.count = productShopping.count + 1;
      actionProductShopping.updateProductsShopping(productShopping); //actualiza carrito
      actionProducts__api.updateProducts(productShopping); //actualiza el home
    }
    setAddState(true);
  }
  //Para conectar los datos desde la api
  useEffect(() => {
    storeProduct__api.addChangeListener(onChange);
    if (products.length === 0) {
      actionProducts__api.loadProducts();
    }
  }, [products.length]);
  function onChange() {
    setProducts(storeProduct__api.getProducts());
  }

  return (
    <>
      <div className={styles.container}>
        {/* <img src={principalPhoto} className={styles.principalPhoto} alt="" /> */}
        <div className={styles.principalPhoto2} >

          <h1>Save any kind of movies</h1>
          <h3>Class</h3>

        </div>

        <div className={styles.container__cards}>
          <ProductList
            products={products}
            onAddCarProduct={handleAddCarProduct}
          />
        </div>
      </div>
    </>
  );
};
