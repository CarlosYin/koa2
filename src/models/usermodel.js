import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  openId: {
    type: String
  },
  nickName: {
    type: String
  },
  gender: {
    type: String
  },
  city: {
    type: String
  },
  province: {
    type: String
  },
  country: {
    type: String
  },
  avatarUrl: {
    type: String
  },
  createdTime: {
    type: Date,
    default: Date.now
  }
})

UserSchema.statics = {
   async findByOpenId (openId) {
    return new Promise((resolve, reject) => {
      this.find({ 'openId': openId }).exec().then((user) => {
        resolve(user)
      })
    })
  }
}

// UserSchema.method({
// })
// UserSchema.statics = {
//   get(id) {
//     return this.findById(id)
//       .exec()
//       .then((user) => {
//         if (user) {
//           return user
//         }
//         // const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
//         // return Promise.reject(err);
//         return Promise.reject('err')
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//   },

//   list({ skip = 0, limit = 50 } = {}) {
//     return this.find()
//       .sort({ createdAt: -1 })
//       .skip(+skip)
//       .limit(+limit)
//       .exec()
//   }
// }
module.exports = mongoose.model('User', UserSchema)
