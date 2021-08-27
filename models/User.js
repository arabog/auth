const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const UserSchema = new mongoose.Schema(
          {
                    username: {
                              type: String,
                              required: [true, "Please provide a username"],
                    },

                    email: {
                              type: String,
                              requied: [true, "Please provide an email"],
                              unique: true,
                              match: [
                                        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                        "Please provide a valid email"
                              ]
                    },

                    password: {
                              type: String,
                              required: [true, "Please provide a password"],
                              minLength: 6,
                    },

                    resetPasswordToken: String,

                    resetPasswordExpire: Date

          }
)


// password
UserSchema.pre("save", async function(next) {
          // is password not modified
          if(!this.isModified("password")){
                    next()
          }


          const salt = await bcrypt.genSalt(10)
          this.password = await bcrypt.hash(this.password, salt)

          next()
})


// this.password is d password from d db, password is password 
// from the req body i.e req.body.password
UserSchema.methods.matchPasswords = async function (password) {
          return await bcrypt.compare(password, this.password)
}


UserSchema.methods.getSignedToken = function() {
          return jwt.sign( 
                    { 
                              id: this._id 
                    }, 

                    process.env.JWT_SECRET, 
                    
                    {
                              expiresIn: process.env.JWT_EXPIRE
                    }
          )
}


const User = mongoose.model("User", UserSchema)

module.exports = User