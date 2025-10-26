//IMPORTACIÓN BOOKS JSON (libros)
const books = require("./data/books.json");

//CONFIGURACIÓN NODE-EXPRESS
const express = require('express')//importando express(coopiado de su pag)
const app = express()//creando servidor
const port = 3000//puerto de pruebas

//HABILITAR RECEPCIÓN DE OBJETOS JSON
//parsear el body entrante a json
app.use(express.json());


//HABILITANDO RUTAS: GET http://localhost:3000/

app.get('/', (req, res) => {//=(request,response)
  res.send('Hello World!');//datos a enviar
});

//1)Crea una ruta /all para obtener todos los libros
app.get('/all', (req, res) => {
  res.json(books); // Enviar el array de libros como respuesta
});


//2)Crea una ruta /first para obtener el primer libro
app.get('/first', (req, res) => {
  const firstBook = books[0];
  res.json(firstBook); // Enviar el array de libros como respuesta
});

//3)Crea una ruta /last para obtener el último libro
app.get('/last', (req, res) => {
  const lastBook = books[books.length-1];
  res.json(lastBook); // Enviar el array de libros como respuesta
});

//4)Crea una ruta /middle para obtener el libro en la mitad (número 50 en el array)
app.get('/middle',(req,res)=>{
  //calcular el índice del del medio(nº)
  const middleIndex = Math.floor(books.length / 2);
  // Obtener el libro correspondiente
  const middleBook = books[middleIndex];
  res.json(middleBook);
});

//5)Crea una ruta /author/dante-alighieri para obtener SÓLO EL TÍTULO del libro de Dante Alighieri

app.get('/author/dante-alighieri',(req,res)=>{
  const searchAuthor = "dante-alighieri".toLowerCase().replace(/-/g, ' ');
  const danteBook = books.find((book)=> book.author.toLowerCase() === searchAuthor)
  if(danteBook){

    res.status(200).json({title: danteBook.title});
  }else{
        res.status(404).json({msj: "Title book not found"});
  }
});

//6)Crea una ruta /country/charles-dickens para obtener SÓLO EL PAÍS del libro de Charles Dickens

app.get('/country/charles-dickens',(req,res)=>{
  const searchAuthor = "charles-dickens".toLowerCase().replace(/-/g, ' ');
  const charlesBook = books.find((book)=> book.author.toLowerCase() === searchAuthor)
  if(charlesBook){

    res.status(200).json({Country: charlesBook.country});
  }else{
        res.status(404).json({msj: "Title book not found"});
  }
});

//7)Crea una ruta /year&pages/cervantes para obtener LAS PÁGINAS Y EL AÑO del libro de Miguel de Cervantes, Ejemplo de respuesta: { pages: ..., year: ... }
app.get('/year&pages/cervantes',(req,res)=>{
  const cervantesBook = books.find((book)=> book.author.toLowerCase() === "miguel de cervantes");
  if(cervantesBook){
    res.status(200).json({pages: cervantesBook.pages, year:cervantesBook.year});
  }else{
        res.status(404).json({msj: "Title book not found"});
  }
});

//8)Crea una ruta /country/count/spain para obtener EL NÚMERO DE LIBROS de España
app.get('/country/count/spain',(req,res)=>{
  const spainBooks = books.filter((book)=> book.country.toLowerCase() === "spain");
  res.status(200).json(spainBooks.length);
});

//9)Crea una ruta /country/at-least/germany para obtener VERDADERO O FALSO dependiendo de si hay o no un libro de Alemania
app.get('/country/at-least/germany',(req,res)=>{
  const germanyBooks = books.filter((book)=> book.country.toLowerCase() === "germany");
  if(germanyBooks){
    res.status(200).json({success:true});
  }else{
     res.status(404).json({error:false});
  }
});

//10)Crea una ruta /pages/all-greater/200 para obtener VERDADERO O FALSO dependiendo de si todos los libros tienen más de 200 páginas

app.get('/pages/all-greater/200',(req,res)=>{
  const pagesBooks = books.every((book)=> book.pages > 200 );
  if(pagesBooks){
    res.status(200).json({success:true});
  }else{
     res.status(404).json({error:false});
  }
});


//INICIANDO SERVIDOR + INDICACIÓN DEL PUERTO A ESCUCHAR(siempre se pone tal cual)
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});