import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionTypes from "../actions/actionTypesProduct";

const CHANGE_EVENT = "change";

let _products = [
  {
    id: 1,
    stock: "in stock",
    image:
      "https://www.hockeymonkey.com/media/catalog/product/cache/0755353d24487896ff68f51449fa6807/b/a/bauer-hockey-gloves-x-int.jpg",
    title: "MSI MPG Trident 3 :",
    descripcion: "MSI MPG Trident 3 10SC-005AU Intel i7 10700F",
    previousPrice: "499.00",
    price: "499.00",
    codigoSeguridad: "ASTR01232",
    count: 0,
  },
  {
    id: 2,
    stock: "in stock",
    image:
      "https://www.hockeymonkey.com/media/catalog/category/Senior_Hockey_Skates.jpg",
    title: "Senior Ice Hockey Skates :",
    descripcion: "CCM Jetspeed FT475 Senior Ice Hockey Skates",
    previousPrice: "174.99",
    price: "174.99",
    codigoSeguridad: "ASTR012321",
    count: 0,
  },
  {
    id: 3,
    stock: "in stock",
    image:
      "https://www.hockeymonkey.com/media/catalog/product/cache/0755353d24487896ff68f51449fa6807/b/a/bauer-hockey-helmet-ims-5-ii-combo.jpg",
    title: "Senior Hockey Helmets :",
    descripcion: "Bauer IMS 5.0 II Hockey Helmet Combo",
    previousPrice: "64.99",
    price: "64.99",
    codigoSeguridad: "ASTR0411",
    count: 0,
  },
  {
    id: 4,
    stock: "in stock",
    image:
      "https://www.hockeymonkey.com/media/catalog/category/Hockey_Shoulder_Pads.jpg",
    title: "Hockey Shoulder Pads :",
    descripcion: "Warrior Alpha DX Junior Hockey Shoulder Pads",
    previousPrice: "69.98",
    price: "69.98",
    codigoSeguridad: "AR04114",
    count: 0,
  },
  {
    id: 5,
    stock: "in stock",
    image:
      "https://www.hockeymonkey.com/media/catalog/category/Ice_Hockey_Pants.jpg",
    title: "Ice Hockey Pants :",
    descripcion: "Bauer Supreme Mach Youth Ice Hockey Pants",
    previousPrice: "69.99",
    price: "69.99",
    codigoSeguridad: "A4114",
    count: 0,
  },
  {
    id: 6,
    stock: "in stock",
    image:
      "https://www.hockeymonkey.com/media/catalog/product/cache/0755353d24487896ff68f51449fa6807/h/o/homerun-shock-doctor-bioflex-cup.jpg",
    title: "Shock Doctor :",
    descripcion: "by Shock Doctor",
    previousPrice: "10.99",
    price: "10.99",
    codigoSeguridad: "A415414",
    count: 0,
  },
  {
    id: 7,
    stock: "in stock",
    image:
      "https://www.hockeymonkey.com/media/catalog/product/cache/0755353d24487896ff68f51449fa6807/b/a/bauer-hockey-gloves-x-int.jpg",
    title: "MSI MPG Trident 3 :",
    descripcion: "MSI MPG Trident 3 10SC-005AU Intel i7 10700F",
    previousPrice: "499.00",
    price: "499.00",
    codigoSeguridad: "ASTR01232",
    count: 0,
  },
  {
    id: 8,
    stock: "in stock",
    image:
      "https://www.hockeymonkey.com/media/catalog/category/Senior_Hockey_Skates.jpg",
    title: "Senior Ice Hockey Skates :",
    descripcion: "CCM Jetspeed FT475 Senior Ice Hockey Skates",
    previousPrice: "174.99",
    price: "174.99",
    codigoSeguridad: "ASTR012321",
    count: 0,
  },
  {
    id: 9,
    stock: "in stock",
    image:
      "https://www.hockeymonkey.com/media/catalog/product/cache/0755353d24487896ff68f51449fa6807/b/a/bauer-hockey-helmet-ims-5-ii-combo.jpg",
    title: "Senior Hockey Helmets :",
    descripcion: "Bauer IMS 5.0 II Hockey Helmet Combo",
    previousPrice: "64.99",
    price: "64.99",
    codigoSeguridad: "ASTR0411",
    count: 0,
  },
  {
    id: 10,
    stock: "in stock",
    image:
      "https://www.hockeymonkey.com/media/catalog/category/Hockey_Shoulder_Pads.jpg",
    title: "Hockey Shoulder Pads :",
    descripcion: "Warrior Alpha DX Junior Hockey Shoulder Pads",
    previousPrice: "69.98",
    price: "69.98",
    codigoSeguridad: "AR04114",
    count: 0,
  },
  {
    id: 11,
    stock: "in stock",
    image:
      "https://www.hockeymonkey.com/media/catalog/category/Ice_Hockey_Pants.jpg",
    title: "Ice Hockey Pants :",
    descripcion: "Bauer Supreme Mach Youth Ice Hockey Pants",
    previousPrice: "69.99",
    price: "69.99",
    codigoSeguridad: "A4114",
    count: 0,
  },
  {
    id: 12,
    stock: "in stock",
    image:
      "https://www.hockeymonkey.com/media/catalog/product/cache/0755353d24487896ff68f51449fa6807/h/o/homerun-shock-doctor-bioflex-cup.jpg",
    title: "Shock Doctor :",
    descripcion: "by Shock Doctor",
    previousPrice: "10.99",
    price: "10.99",
    codigoSeguridad: "A415414",
    count: 0,
  },
];

class productStore extends EventEmitter {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
  emitChange() {
    this.emit(CHANGE_EVENT);
  }
  getProducts() {
    return _products;
  }

  getProductById(id) {
    return _products.find((p) => p.id === id);
  }
}

const store = new productStore();

Dispatcher.register((action) => {
  switch (action.actionType) {
    case actionTypes.DELETE_PRODUCT:
      _products = _products.filter(
        (course) => course.id !== parseInt(action.id, 10)
      );
      store.emitChange();
      break;

    case actionTypes.CREATE_PRODUCT:
      _products.push(action.product);
      store.emitChange();
      break;

    case actionTypes.UPDATE_PRODUCT:
      _products = _products.map((p) =>
        p.id === action.product.id ? action.product : p
      ); // Se filtra el id del producto la acción con el id del elemento del product, entonces se guarda el producto de la accion
      store.emitChange();
      break;

    case actionTypes.LOAD_PRODUCT:
      _products = action.products;
      store.emitChange();
      break;
    default:
      break;
  }
});

export default store;
