const mongoose = require('mongoose');

const Schema = mongoose.Schema;


function validateAmount(amount) {
    
    return parseFloat(amount) > 0;
}

const promopackageSchema = new Schema({
    
    Package_Name: {
        type: String,
        required: true
    },
    Amount: {
        type: String,
        required: true,
        validate: [validateAmount, 'Amount must be a positive number'] // Using custom validator
    },
    Description: {
        type: String,
        required: true
    },
    images: [
        {
            filename: String, 
            path: String,     
        }
    ]
});


promopackageSchema.post('validate', function(error, doc, next) {
    if (error && error.name === 'ValidationError' && error.errors && error.errors['Amount'] && error.errors['Amount'].kind === 'user defined') {

        error.errors['Amount'].message = 'Price must be greater than 0';
    }
    next();
});

const promoPackage = mongoose.model("promoPackages", promopackageSchema);
module.exports = promoPackage;
