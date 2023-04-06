const axios = require('axios')
const { Trade } = require('../models/trade-model')


exports.getData = (req, res) => {
    Trade.deleteMany().then(resp => {
        axios.get('https://public.fyers.in/sym_details/NSE_FO.csv')
            .then(response => {
                const array = response.data.split('None')
                let result = []
                for (let i = 0; i < array.length; i++) {
                    const single = array[i].split(',')
                    const object = {
                        trade_id: single[0].slice(2),
                        option_symbol: single[1],
                        transaction_code: single[2],
                        quantity: single[3],
                        price: single[4],
                        unknown_field0: single[5],
                        trading_hours: single[6],
                        trade_date: single[7],
                        broker_id: single[8],
                        exchange_symbol: single[9],
                        unknown_field1: single[10],
                        unknown_field2: single[11],
                        unknown_field3: single[12],
                        unknown_field4: single[13],
                        unknown_field5: single[14],
                        unknown_field6: single[15],
                        unknown_field7: single[16],
                        unknown_field8: single[17],
                        unknown_field9: single[18],
                    }
                    Trade.create(object)
                    result.push(object)
                    if (array.length - 1 === i) {
                        res.json({
                            status:true,
                            message:'data fetched and updated successfully'
                        })
                    }
                }
            })
            .catch(err => {
                console.log(err.message)
            })
    })
}
