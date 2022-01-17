use('tp2');
const startTime = Date.now();
db.companies.find().sort({ founded_year: -1 });
const endTime = Date.now();
console.log(endTime - startTime + 'ms');
