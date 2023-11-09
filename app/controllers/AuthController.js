const User = require('../models/user');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

let refreshTokenArr = []

class AuthController {
  // [POST] /register
   async register(req, res, next) {
      try {
         const formData = req.body;
         const salt = await bcrypt.genSalt(10);
         const hashed = await bcrypt.hash(formData.password, salt);

         // Tạo người dùng mới
         const newUser = new User({
            id:formData.id,
            username: formData.username,
            password: hashed,
            email: formData.email,
         });

         const doc = await newUser.save()
         return res.status(200).json(doc)
      } catch (error) {
         return res.status(500).json(error)
      }
   }
   // GENERATE ACCESS TOKEN 
   async generateAccessToken (user) {
      return jwt.sign({
        id: doc.id,
        admin: doc.admin, 
      },
      "secretKey",
      { expiresIn: "1d" } 
      );
   }
   
      async login(req, res, next) {
        try {
          const doc = await User.findOne({ username: req.body.username });
          if (!doc) {
            return res.status(404).json('Wrong username');
          }
          const validPassword = await bcrypt.compare(req.body.password, doc.password);
          if (!validPassword) {
            return res.status(404).json("Wrong password");
          }
          if (doc && validPassword) {
            const accessToken = jwt.sign({
              id: doc.id,
              admin: doc.admin, 
            },
            "secretKey",// JWT_ACCESS_KEY
            { expiresIn: "2d" } 
            );
            const refreshToken =  jwt.sign({
              id: doc.id,
              admin: doc.admin, 
            },
            "secretKey",
            { expiresIn: "365d" } 
            );
            res.cookie("refreshToken",refreshToken,{
              httpOnly:true,
              secure:false,
              path:"/",
              sameSite:"strict"
            })
            const {password,...others} = doc._doc // an password
            refreshTokenArr.push(refreshToken)
            return res.status(200).json({ ...others,accessToken });
          }
        } catch (error) {
          return res.status(500).json(error);
        }
    }

    async refresh(req, res, next){
      // Take refresh token form user
      const refreshToken = await req.cookies.refreshToken
      if(!refreshToken) return res.status(401).json("You're not authenticated")
      if(!refreshTokenArr.includes(refreshToken)) res.status(401).json("refresh token is not valid")
      jwt.verify(refreshToken,"secretKey",(err,user)=> {
        if(err) {
          console.log(err)
        }
        refreshTokenArr = refreshTokenArr.filter((token) => token !== refreshToken)
        //create new refresh token and access token
        const newAccessToken = jwt.sign({
          id: doc.id,
          admin: doc.admin, 
        },
        "secretKey",// JWT_ACCESS_KEY
        { expiresIn: "1d" } 
        );

        const newRefreshToken = jwt.sign({
          id: doc.id,
          admin: doc.admin, 
        },
        "secretKey",
        { expiresIn: "365d" } 
        );
        refreshToken.push()
        res.cookie("refreshToken",newRefreshToken,{
          httpOnly:true,
          secure:false,
          path:"/",
          sameSite:"strict"
        })

        return res.status(200).json({accessToken: newAccessToken})
      })
    }

    //Log out [POST] /logout
    async userLogout(req,res,next){
      res.clearCookie("refreshToken");
      refreshTokenArr = refreshTokenArr.filter(token => token !== req.cookies.refreshToken)
      res.status(200).json('Logged out successfully')
    }



    // //[POST] /forgot-password
    // async forgotPassword(req, res, next) {
    //   try {
    //     const { email } = req.body;
    //     const user = await User.findOne({ email });
    //     if (!user) {
    //       return res.status(404).json('User not found');
    //     }
    //     // Tạo mã đặt lại mật khẩu (ví dụ: mã xác nhận)
    //     const resetToken = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: '1h' });
    //     // Lưu mã đặt lại mật khẩu vào người dùng trong cơ sở dữ liệu hoặc trong bức thư gửi đi
    //     user.resetToken = resetToken;
    //     await user.save();
    //     // Gửi email chứa mã đặt lại mật khẩu đến người dùng
    //     // ...
    //     res.status(200).json('Reset password email sent');
    //   } catch (error) {
    //     res.status(500).json(error);
    //   }
    // }

    // //[POST] /reset-password
    // async resetPassword(req, res, next) {
    //   try {
    //     const { resetToken, password } = req.body;
    //     // Giải mã mã đặt lại mật khẩu và tìm người dùng tương ứng
    //     const decodedToken = jwt.verify(resetToken, 'secretKey');
    //     const user = await User.findById(decodedToken.id);
    //     if (!user) {
    //       return res.status(404).json('User not found');
    //     }
    //     // Cập nhật mật khẩu mới cho người dùng
    //     const salt = await bcrypt.genSalt(10);
    //     const hashedPassword = await bcrypt.hash(password, salt);
    //     user.password = hashedPassword;
    //     user.resetToken = null; // Xóa mã đặt lại mật khẩu sau khi đã sử dụng
    //     await user.save();
    //     res.status(200).json('Password reset successfully');
    //   } catch (error) {
    //     if (error.name === 'JsonWebTokenError') {
    //       return res.status(400).json('Invalid reset token');
    //     }
    //     res.status(500).json(error);
    //   }
    // }

    //STORE TOKEN 
    // 1) LOCAL STORAGE  
    // 2) HTTP ONLY COOKIES
    // 3) REDUX STORE -> ACCESS TOKEN
 
}

module.exports = new AuthController();