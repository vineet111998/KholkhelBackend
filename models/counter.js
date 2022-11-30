const mongoose =require('mongoose');
const Schema = mongoose.Schema;
// const counter 

var CounterSchema = Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});
const counter = mongoose.model('counter', CounterSchema);

const getSequenceNextValue =(sequence)=>{
console.log(sequence);
};

const indexCounter =(sequence) =>{
console.log(sequence);
};
module.exports ={counter, getSequenceNextValue, indexCounter};