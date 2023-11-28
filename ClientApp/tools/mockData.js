const products =  [
  {
    "id": 1,
    "titulo": "Guardianes de la Galaxia ",
    "imagen": "https://chipichape.com.co/wp-content/uploads/2023/05/Guardianes-de-la-galaxia.jpg",
    "descripcion": "Un grupo de inadaptados intergalácticos se une para proteger la galaxia de amenazas cósmicas, mientras luchan contra villanos y descubren la importancia de la amistad.",
    "verRuta": false
  },
  {
    "id": 2,
    "titulo": "Caseria Venecia",
    "imagen": "https://archivos-cms.cinecolombia.com/images/6/4/2/4/44246-1-esl-CO/deb991efcca6-poster_480x670.png",
    "descripcion": " Un thriller que sigue a un agente del FBI que investiga una serie de asesinatos en Venecia, sumergiéndose en un oscuro mundo de intriga y misterio.",
    "verRuta": false
  },
  {
    "id": 3,
    "titulo": "Los asecinos de la luna",
    "imagen": "https://assets.cinemark-core.com/5db771be04daec00076df3f5/vista/movies/65240617756295000822df51/common/asesinos-de-la-luna-95351-1697651247385.jpg",
    "descripcion": " Un misterioso grupo de asesinos se enfrenta en una lucha por el control de un poderoso artefacto lunar que podría cambiar el destino de la humanidad.",
    "verRuta": false
  },
  {
    "id": 4,
    "titulo": "Venom",
    "imagen": "https://circusa.com/wp-content/uploads/2021/10/p-venomhabravenganza.jpg",
    "descripcion": "Un periodista se fusiona con un simbionte alienígena, lo que le otorga poderes sobrenaturales, pero también lo enfrenta a una entidad maligna dentro de sí mismo.",
    "verRuta": false
  },
  {
    "id": 5,
    "titulo": "Mama te ama a muerte",
    "imagen": "https://assets.cinemark-core.com/5db771be04daec00076df3f5/vista/movies/6439cfa2e39eb000082cc4ec/common/evil-dead-el-despertar-93242-1697133076519.jpg",
    "descripcion": "Una madre sobreprotectora se convierte en una figura terrorífica cuando su hija decide alejarse de su control, desatando una serie de eventos horripilantes.",
    "verRuta": false
  },
  {
    "id": 6,
    "titulo": "Mortal Kombat",
    "imagen": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqqPv6pO24CWGkDdKI0eJpdoh8UjFwQzexBg&usqp=CAU",
    "descripcion": "Basada en el famoso videojuego, esta película sigue a un grupo de luchadores que se enfrentan en un torneo de artes marciales para salvar la Tierra de fuerzas malignas.",
    "verRuta": false
  },
  {
    "id": 7,
    "titulo": "Al final del tunel",
    "imagen": "https://www.lacapitalmdp.com/wp-content/uploads/2016/04/295858-719x1024.jpg",
    "descripcion": "Un hombre parapléjico descubre un oscuro secreto en el sótano de su casa y se ve envuelto en un juego de supervivencia en un túnel subterráneo.",
    "verRuta": false
  },
  {
    "id": 8,
    "titulo": "Avatar",
    "imagen": "https://score.procinal.com.co/mobilecomjson/imagenes/624.jpg",
    "descripcion": "En un mundo alienígena, un ex-marine se une a una misión de extracción de minerales, pero su conexión con la cultura nativa y la naturaleza lo lleva a luchar por la supervivencia de la población autóctona.",
    "verRuta": false
  },
  {
    "id": 9,
    "titulo": "Éxodo",
    "imagen": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX9XL6cYm7fEZwhNGUgy-0Nh4jRenGWHgshw&usqp=CAU",
    "descripcion": "Una película épica que narra la historia del antiguo Éxodo hebreo desde Egipto, dirigida por Ridley Scott y protagonizada por Christian Bale como Moisés.",
    "verRuta": false
  },
  {
    "id": 10,
    "titulo": "Krakens y Sirenas",
    "imagen": "https://www.lanacion.com.ar/resizer/i-b3gi4vt8MeQlTsV956e1VLWsI=/210x300/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/UC64FQWD7BEIHCN4JDK65FWDBI.png",
    "descripcion": "En un mundo fantástico, marineros se enfrentan a peligrosas criaturas marinas, incluyendo krakens y sirenas, mientras buscan tesoros y aventuras en el océano.",
    "verRuta": false
  }
]

const users = [
  {
    id: 1,
    name: "Cory House",
    image: "https://cdn-icons-png.flaticon.com/512/146/146035.png",
  },
  {
    id: 2,
    name: "Scott Allen",
    image: "https://cdn-icons-png.flaticon.com/512/146/146035.png",
  },
  {
    id: 3,
    name: "Dan Wahlin",
    image: "https://cdn-icons-png.flaticon.com/512/146/146035.png",
  },
];

const debitCards = [
  {
    id: 1,
    authorId: 1,
    cardHolderName: "Rebecca Soto :",
    cardNumber: "9999 8888 9999 0909",
    expDate: "02/2022",
    cvc: "123",
  },
];

const newCourse = {
  id: null,
  title: "",
  authorId: null,
  category: "",
};

const pourchase = [];

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  newCourse,
  products,
  users,
  debitCards,
  pourchase,
};
