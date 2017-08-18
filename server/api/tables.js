const router = require('express').Router();
const Sequelize = require('sequelize');
const {db} = require('../db');
module.exports = router;

// req.body : array of objects
// each object represents one table
// ex/ [{tableName : '1', 
//          fields : {name : {type: String, validations: ...}, 
//                    quantity : {type : integer, validations: ...}}}, 
//      {tableName : '2', 
//          fields : {name : {type: String, validations: ...}, ...}]
router.get('/',(req,res, next) => {
    res.send("hey").end()
})
router.post('/', (req, res, next) => {
    console.log("table")
    let table = req.body;
    console.log("table", table)
    let tableName = table.tableName.toString();
    console.log("tablename", tableName)
    let fields = formatFields(table.fields);
    console.log("fields", fields);
    console.log("name", tableName, "fields", fields)
    const createdTable = db.define(tableName, fields);
    db.sync()
    .then(()=>res.status(200).send(`OK. Table ${tableName} created.`));
});

function getSequelizeType(type){
    let d = {'string': Sequelize.STRING, 'text': Sequelize.TEXT, 'float': Sequelize.FLOAT, 'date': Sequelize.DATE, 'boolean': Sequelize.BOOLEAN, 'enum': Sequelize.ENUM, 'array': Sequelize.ARRAY};
    return d[type];
}

function formatFields(fields){
    let keys = Object.keys(fields);
    for (var field of keys){
        let attribute = fields[field]; 
        let seqType = attribute['type']
        fields[field] = Object.assign({}, attribute, {type: getSequelizeType(seqType)})
    }
    return fields;
}