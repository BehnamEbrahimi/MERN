const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      unique: true,
      required: true
    },
    tokens: [
      {
        authToken: {
          type: String,
          required: true
        },
        googleToken: {
          type: String,
          required: true
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

userSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();

  delete userObject.tokens;

  return userObject;
};

userSchema.methods.generateAuthToken = async function(googleToken) {
  const user = this;

  const authToken = jwt.sign(
    { _id: user._id.toString() },
    process.env.JWT_SECRET
  );

  user.tokens.push({ authToken, googleToken });

  await user.save();

  return authToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
