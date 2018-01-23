const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pick = require('lodash').pick;


const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

UserSchema.methods.toJSON = function() {
  let user = this;
  let userObject = user.toObject();

  return pick(userObject, ["_id", "email", "tokens"]);
}

UserSchema.methods.generateAuthToken = function() {
  let user = this;
  let access = "auth";
  let token = jwt.sign({
    _id: user._id.toHexString(),
    access
  }, process.env.JWT_SECRET).toString();
  user.tokens = [];
  user.tokens.push({access, token});

  return user.save().then(() => {   
    return token;
  });
};

UserSchema.pre('save', function(next) {
  let user = this;
  
  if(user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        console.log('pre save hash', user);        
        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.statics.findByToken = function(token) {
  let User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return Promise.reject(e);
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

UserSchema.methods.removeToken = function(token) {
  let user = this;

  return user.update({
    $pull: {
      tokens: { token }
    }
  });
}

UserSchema.statics.findByCredentials = function(email, password) {
  let User = this;
  return User.findOne({email}).then(user => {
    if(!user) {
      return Promise.reject({'msg': 'no user found'});
    }

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if(res) {
          resolve(user);
        } else {
          reject(err);
        }
      });
    });
  });
};


let User = mongoose.model('User', UserSchema);

module.exports = { User };