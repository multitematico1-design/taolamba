/* Taolamba Gastrobar — CARTA
   Edita este archivo para cambiar platos, precios y descripciones (ver README.md). */
/* CARTA REAL — edita aquí. Plato: [nombre, precio, descripción, foto opcional (URL), esExtra]. esExtra=1 → fila sin número (adición / variante) */
const X=1;
const CATS=[
 {id:'pan',name:'Sándwiches y Perros',plaque:'Sándwiches y Perros',short:'Sándwiches',hi:'#a8743a',lo:'#3f2810',sections:[
  {title:'Sándwiches',note:'Todos los sándwiches se sirven acompañados de papas francesas.',items:[
   ['Desmechado','$22.500','Pan baguette, salsa real, lechuga, carne de res desmechada.'],
   ['Pollo Suizo','$24.700','Pan baguette, salsa de la casa, lechuga, pollo desmechado, salchicha suiza, queso mozzarella.'],
   ['Maicito','$20.400','Pan baguette, trozos de pechuga, maicito tierno, crema de leche, aliños de la casa, queso mozzarella.'],
   ['Pechuga','$18.500','Pan baguette, salsa real, lechuga, pechuga a la plancha, queso mozzarella.'],
   ['El Chinchal Cubano','$15.200','Pan baguette, salsa de la casa, lechuga, jamón, tocineta, pepinillo, queso mozzarella.'],
   ['Mi Viejo San Juan','$27.800','Pan baguette, lechuga, lomos de atún Van Camp’s, salsa real.']]},
  {title:'Perros',items:[
   ['El Relicario','$11.200','Pan brioche, salsas de la casa, salchicha zenú, ripio, queso mozzarella'],
   ['Adiciones','$2.500','Tocineta o pepperoni',null,X],
   ['Relicario Ranchero','$19.500','Pan brioche, salsas de la casa, salchicha ranchera, ripio, queso mozzarella.']]}]},
 {id:'pizza',name:'Pizzas y Hamburguesas',plaque:'Pizzas y Hamburguesas',short:'Pizzas',hi:'#8a1c36',lo:'#33091a',sections:[
  {title:'Pizzas',items:[
   ['Rayuela (Il gioco del mondo)','$25.000','Masa madurada, salsa napolitana, queso mozzarella, pepperoni, stracciatella, tomate caramelizado, albahaca fresca.'],
   ['Pepperoni','$20.000','Masa madurada, salsa napolitana, queso mozzarella, pepperoni.'],
   ['Tocineta','$20.000','Masa madurada, salsa napolitana, queso mozzarella, tocineta.'],
   ['Hawaiana','$20.000','Masa madurada, salsa napolitana, queso mozzarella, jamón, piña caramelizada de la casa.'],
   ['Jamón y queso','$20.000','Masa madurada, salsa napolitana, queso mozzarella, jamón.'],
   ['Pollo','$20.000','Masa madurada, salsa napolitana, queso mozzarella, pollo desmechado.'],
   ['Pollo Suiza','$20.000','Masa madurada, salsa napolitana, queso mozzarella, pollo desmechado, salchicha suiza.']]},
  {title:'Hamburguesas',items:[
   ['La Tabernaria','$19.200','Pan brioche, salsa, tomate, 160 g de carne, queso chédar, tocineta, cebolla crocante, pepinillo, lechuga.'],
   ['Con papas','$23.200','',null,X]]}]},
 {id:'suizos',name:'Suizos, Apanados y Ensalada',plaque:'Suizos y Apanados',short:'Suizos',hi:'#557a3c',lo:'#17250f',sections:[
  {title:'Suizos',items:[
   ['Suizo','$25.000','Papas francesas, lechuga, suiza, papa ripio y queso costeño, salsas de la casa'],
   ['Suizo especial (con pollo y jamón)','$29.200',''],
   ['Desgranado','$29.800','Papas francesas, lechuga, cerdo, butifarra, chorizo, maicito, papa ripio, queso costeño, salsas de la casa.'],
   ['Salchipapa','$18.000','Papas francesas, lechuga, salchicha, pollo, papa ripio, queso, salsas de la casa.']]},
  {title:'Apanados',items:[
   ['Tiras de pechuga','$20.000','5 tiras de pollo apanado, papas francesas y salsa real.'],
   ['Filete de pechuga','$23.800','Filete de pechuga apanado, papas francesas y salsa real.']]},
  {title:'Ensalada',items:[
   ['La Veranera','$25.600','Lechuga crespa, pechuga de pollo, manzana, crutones, maicito, fresa, queso parmesano, salsa real.']]}]},
 {id:'bebidas',name:'Bebidas',plaque:'Bebidas',short:'Bebidas',hi:'#1f6a66',lo:'#082725',sections:[
  {title:'Jugos en agua',items:[['Maracuyá','$13.000',''],['Limonada de hierbabuena','$15.000','']]},
  {title:'Jugos en leche',items:[['Milo','$12.000',''],['Fresa','$15.000',''],['Frutos rojos','$15.000','']]},
  {title:'Bebidas gaseosas',items:[['Coca-Cola 250 mL','$3.000',''],['Coca-Cola 400 mL','$5.000',''],['Coca-Cola 1 litro','$6.500',''],['Kola Román 400 mL','$4.000',''],['Postobón 1,5 L','$6.500',''],['Colombiana 1,5 L','$6.500','']]},
  {title:'Bebidas alcohólicas',items:[['Corona 269 mL','$6.500',''],['Club Colombia 330 mL','$5.500','']]}]}
];
const dishes=c=>c.sections.reduce((n,s)=>n+s.items.filter(it=>!it[4]).length,0);
