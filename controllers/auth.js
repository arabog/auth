const User = require("../models/User")


exports.register = async (req, res, next) => {
          const { username, email, password } = req.body

          try {
                    const user = await User.create(
                              {
                                        username,
                                        email,
                                        password
                              }
                    )

                    res.status(200).json(
                              {
                                        success: true,
                                        user
                              }
                    )


          } catch (err) {
                    res.status(500).json(
                              {
                                        success: false,
                                        err: err.message
                              }
                    )
          }

}


exports.login = async (req, res, next) => {
          const { email, password } = req.body

          if(!email || !password) {
                    res.status(400).json(
                              {
                                        success: false,
                                        err: "Please provide email and password"
                              }
                    )
          }

          try {
                    const user = await User.findOne({email} ).select("+password")

                    if(!user) {
                              res.status(404).json(
                                        {
                                                  success: false,
                                                  err: "Invalid credentials"
                                        }
                              )
                    }

                    const isMatch = await user.matchPasswords(password)

                    if(!isMatch) {
                              res.status(404).json(
                                        {
                                                  success: false,
                                                  err: "Invalid credentials"
                                        }
                              )
                    }

                    res.status(200).json(
                              {
                                        success: true,
                                        token: "modakeke"
                              }
                    )

          } catch (err) {
                    res.status(500).json(
                              {
                                        success: false,
                                        err: err.message
                              }
                    )
          }
}


exports.forgotpassword = (req, res, next) => {
          res.send("Forgot Password Route")
}


exports.resetpassword = (req, res, next) => {
          res.send("Reset Password Route")
}