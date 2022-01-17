use('tp2');
db.products.updateMany({ product_number: { $mod: [2, 1] } }, { $set: { even: false } });
