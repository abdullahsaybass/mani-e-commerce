// // const e = require('express');
// // const mongoose = require('mongoose');

// // const userSchema = new mongoose.Schema({
// //     name: {
// //         type: String,
// //         required: true,
// //     },
// //     email: {
// //         type: String,
// //         required: true,
// //         unique: true,
// //     },
// //     password: {
// //         type: String,
// //         required: true,
// //     },
// //     role: {
// //         type: String,
// //         // enum: ['user', 'admin'],
// //         default: 'user',
// //     }
// // }
// // , {
// //     timestamps: true,
// //   }
// // );

// // exports.User = mongoose.model('User', userSchema);


// // model/User.js
// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     role: {
//       type: String,
//       // enum: ['user', 'admin'],
//       default: 'user',
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const User = mongoose.model('User', userSchema);
// export default User;

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      // enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// Optional: Create an index on email to speed up lookups
userSchema.index({ email: 1 });

const User = mongoose.model('User', userSchema);
export default User;

