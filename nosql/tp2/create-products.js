use('tp2');
db.createCollection('products');
const products = [];
for (let i = 0; i < 1000; i++) {
  products.push({
    product_number: i,
    name: 'Product ' + i,
    price: Math.random() * 100,
    description: 'Description ' + i,
    category: 'Category ' + i,
    sub_category: 'SubCategory ' + i,
    tags: ['tag1', 'tag2', 'tag3'].slice(0, Math.floor(Math.random() * 3)),
    created_at: new Date(),
  });
}
db.products.insertMany(products);
