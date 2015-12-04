var mongoose = require('mongoose');

var tableSchema = new mongoose.Schema({
    created: { type: Date, default: Date.now },
    table: mongoose.Schema.Types.Mixed,
});

var Table = mongoose.model('Table',tableSchema);

module.exports = Table;
