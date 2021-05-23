
const UserModel  = require('../Models/User')
const bcrypt = require('bcryptjs')

const login = (req, res) => {
    return res.render('auth/login', {
        content: 'Welcome back',
        isAuthentificated: req.session.isAuth,
        error: req.flash('error')
    })
}
const register = (req, res) => {
    return res.render('auth/register',
    {
        content: 'Create an Account',
        isAuthentificated: req.session.isAuth,
        error: req.flash('error')
    })
}


const postRegister = async (req, res, next) => {
   
    const { email, passwd, nationalID, number, uname } = req.body

   try {
      const user = await UserModel.findOne({ email: email })

      if (user) {
         req.flash("error", "Account already Exists")
         return res.redirect("/register")
      }

      const hashedCode = await bcrypt.hash(passwd, 10)

       const userDoc = new UserModel(
           {
        username: uname,
               email,
               nationalID,
               number,
         password: hashedCode,
           }
       )
       await userDoc.save()
       
       req.session.user = user
        req.session.isAuth = true
       req.session.save((err) => console.log(err))
       console.log('user creation successfull')
    //    send them an email immediately
       
         //await mailAgent.sendMail({
      //         to: email,
      //         from: 'info.bryan-cook@gmail.com',
      //         subject: 'Confirm Email',
      //         html: `
      //     <h3>Hello, </h3>
      //     <p>Thanks for signing up with the kassCart  platform! I want to ensure that you have a great experience, so I thought I'd reach out and see if you had any questions or comments?
      //       Regards, Bryan Founder | <a href="http://localhost:2000/">kassCart</a> </p>
      //     `
      //     })

      //         return res.redirect('/')


       req.flash("success", "Account created successfully")

        return res.status(200).redirect("/")

   
   } catch (err) {
      const Err = new Error(err)
      Err.statusCode = 500
      next(Err)
   }
}

const postLogin = async(req, res, next) => {


        console.log(req.body)
        const { email, passwd } = req.body

        try {
            const user = await UserModel.findOne({ email: email })
            console.log(user)
            if (!user) {
                
                req.flash("error", "The Email is not Registered")
                
                return res.redirect("/sign-in")
            }

            const isEqual = await bcrypt.compare(passwd, user.password)
            
            if (!isEqual) {
                req.flash("error", "password mismatch")
                return res.redirect("/sign-in")
            }

            req.session.user = user
            req.session.isAuth = true
            req.session.save((err) => console.log(err))


            console.log('user login successfull ...')
            
            return res.status(200).redirect("/")

        } catch (err) {
            console.log(err.message)
            const Err = new Error(err)
            Err.statusCode = 500
            next(Err)
        }
}

const logout = (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/');
    });
}

const updateUser = async(req, res) => {
     const { oldpass, passwd } = req.body

   try {
      const user = await UserModel.findOne({ _id: req.user._id })
      if (!user) {
         return res.redirect("/sign-in")
      }
      const isSame = await bcrypt.compare(oldpass, user.pascode)

      if (!isSame) {
         req.flash("error", "Incorrect password")
         return res.redirect("/profile")
      }
      const updatedPass = await bcrypt.hash(passwd, 12)
      user.pascode = updatedPass

      await user.save()

      req.flash("success", "Password Update Successfull")
      return res.redirect("/profile")
   } catch (err) {
      const Err = new Error(err)
      Err.statusCode = 500
      next(Err)
   }
}

module.exports = {
    login,
    register,
    logout,
    postRegister,
    postLogin,
    updateUser
}


