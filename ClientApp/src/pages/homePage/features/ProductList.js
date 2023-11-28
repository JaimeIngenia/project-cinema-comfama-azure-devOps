import styles from "../styles/ProductList.module.css";
import stock__active from "../../../assets/stock__active.svg";
import add from "../../../assets/add.svg";

export const ProductList = ({ products, onAddCarProduct }) => {
  return (
    <>
      {products.map((x) => {
        return (
          <>
  

            <div key={x.id} className={styles.container}>


              <div className={styles.title}>
                <p>{x.titulo}</p>
                <img src={stock__active} alt="" />
              </div>



              <div className={styles.cuerpo} >

                <div className={styles.image_product}>
                  <img src={x.imagen} alt="" />
                </div>

                <div className={styles.cuerpo_izq}>
                  <p> {x.descripcion} </p>
                  
                  
                  <div className={styles.verAhora} >
                    <button
                      // className={styles.btn__add}
                      onClick={onAddCarProduct}
                      name={x.id}
                    >
                      <p>Ver ahora ➤</p>
                    </button>

                  </div>
                </div>
              
              </div>




              
              
            </div>
          </>
        );
      })}
    </>
  );
};
