const fs = require('fs');
const path = require('path');

function generateProducts(n) {
  const products = [];
  for (let i = 1; i <= n; i++) {
    const product = {
      id: i,
      name: `Product ${i}`,
      description: `Description for Product ${i}`,
      price: (Math.random() * 100).toFixed(2),
      quantity: Math.floor(Math.random() * 100) + 1
    };
    products.push(product);
  }
  return products;
}

const numberOfProducts = process.argv[2] || 10;
const products = generateProducts(numberOfProducts);
const filePath = path.join(__dirname, 'products.json');

fs.writeFile(filePath, JSON.stringify(products, null, 2), (err) => {
  if (err) {
    console.error('Error writing file:', err);
  } else {
    console.log(`File has been created at ${filePath}`);
  }
});
