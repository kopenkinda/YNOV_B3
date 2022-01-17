use('tp2');
for (let i = 0; i < 1002; i += 1) {
  db.products.deleteOne({ product_number: i, even: true });
}
