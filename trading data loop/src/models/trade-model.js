const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');


/**
 * Trade schema
 */
const TradeSchema = new Schema({
    trade_id: {
        type: String,
    },
    option_symbol: {
        type: String,
    },
    transaction_code: {
        type: String,
    },
    price: {
        type: String,
    },
    trading_hours: {
        type: String,
    },
    trade_date: {
        type: String,
    },
    broker_id: {
        type: String,
    },
    exchange_symbol: {
        type: String,
    },
    unknown_field0: {
        type: String,
    },
    unknown_field1: {
        type: String,
    },
    unknown_field2: {
        type: String,
    },
    unknown_field3: {
        type: String,
    },
    unknown_field4: {
        type: String,
    },
    unknown_field5: {
        type: String,
    },
    unknown_field6: {
        type: String,
    },
    unknown_field7: {
        type: String,
    },
    unknown_field8: {
        type: String,
    },
    unknown_field9: {
        type: String,
    },
    status: {
        type: Number,
        default: 1
    },
    created_at: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false });

TradeSchema.plugin(mongoosePaginate);

exports.Trade = mongoose.model('Trade', TradeSchema);