use('tp2');
const startTime = Date.now();
db.companies.find();
const endTime = Date.now();
console.log(endTime - startTime + 'ms');
