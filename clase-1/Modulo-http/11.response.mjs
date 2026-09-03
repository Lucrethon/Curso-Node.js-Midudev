import http from 'node:http';

// Creamos al "mozo" que atiende a quien llegue
const server = http.createServer((req, res) => {
  // Le devolvemos un mensaje y cerramos la entrega
  res.end('Hola, este es mi primer servidor!');
});

// Le decimos en qué ventanilla atender (puerto 3000)
server.listen(3000, () => {
  console.log('El restaurante está abierto en http://localhost:3000');
});