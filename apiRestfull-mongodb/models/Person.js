const mongoose = require('mongoose')
// cria uma tabela chamada person no databse
const Person = mongoose.model('Person', { 
    name: String,
    salary: Number,
    approved: Boolean,
})

module.exports = Person