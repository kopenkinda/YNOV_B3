use('tp2');
db.products.updateMany({ product_number: { $mod: [2, 0] } }, { $set: { even: true } });
