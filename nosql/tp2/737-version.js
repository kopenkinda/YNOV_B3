use('tp2');
db.products.updateOne({ product_number: 737 }, { $set: { version: ['MAX-7', 'MAX-8', 'MAX-9', 'MAX-10'] } });
