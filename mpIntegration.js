const express = require('express');
const mercadopago = require('mercadopago');
const bodyParser = require('body-parser');

const mpIntegration = express.Router();
mpIntegration.use(bodyParser.urlencoded({ extended: true }));

mercadopago.configure({
    integrator_id: 'dev_24c65fb163bf11ea96500242ac130004',
    access_token: 'APP_USR-6317427424180639-042414-47e969706991d3a442922b0702a0da44-469485398'
});

module.exports.postPreferences = (req,res) => {
    console.log(JSON.stringify(req.body));
    const item = req.body;

    var preference = {
        items: [
          {
            id: '1234',
            title: item.title,
            description: '​Dispositivo móvil de Tienda e-commerce​',
            quantity: parseInt(item.unit),
            currency_id: 'ARS',
            unit_price: Number(item.price),
            picture_url: item.img
          }
        ],

        payer: {
            name: 'Lalo',
            surname: 'Landa',
            email: 'test_user_63274575@testuser.com',
            phone: {
                    area_code: '11',
                    number: 22223333
                },
            address: {
                zip_code: '1111',
                street_name: 'False',
                street_number: 123
                }
        },

        payment_methods: {
            excluded_payment_methods: [
                {
                    id: 'amex'
                }
            ],
            excluded_payment_types: [
                {
                    id: 'atm'
                }
            ],
            installments: 6
        },

        back_urls: {
            success: "https://rominamoreno9-mp-commerce-node.herokuapp.com/success",
            failure: "https://rominamoreno9-mp-commerce-node.herokuapp.com/failure",
            pending: "https://rominamoreno9-mp-commerce-node.herokuapp.com/pending"

        },
        auto_return: "approved",
        notification_url: "https://rominamoreno9-mp-commerce-node.herokuapp.com/mp/notification",
        external_reference: 'rvmoreno9@gmail.com',
      };


    mercadopago.preferences.create(preference).then(response => {
        if (response.ok || response.status === 201) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            console.log(error);
        }
    },
    error => {
        var errmess = new Error(error.message);
        console.log(errmess);
    })
    .then(response => {
        console.log('OK',response);
        res.redirect(response.body.init_point);
    })
    .catch(error => {
        console.log('Error', error.message);
    });

};   
