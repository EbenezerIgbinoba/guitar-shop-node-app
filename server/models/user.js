const mongoose = require('mongoose');
const  bcrypt = require('bcryptjs');
const SALT = 10;

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        required: true,
        minLength: 5
    },
    name: {
        type: String,
        required: true,
        maxLength: 100
    },
    lastName: {
        type: String,
        required: true,
        maxLength: 100
    },
    cart: {
        type: Array,
        default: []
    },
    history: {
        type: Array,
        default: []
    },
     role: {
         type: Number,
         default: 0
     },
     token: {
         type: String
     }
});
userSchema.pre('save', function(next){
    var user = this;

    if(user.isModified('password')){  // IF They are changing the passwords
        bcrypt.genSalt(SALT, function (err, salt) {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            })
        })
    }
    else{
        next();
    }
})

userSchema.methods.comparePassword = (candidatePassword, callback) => {
    
}

const User = mongoose.model('User', userSchema);

module.exports = {User}