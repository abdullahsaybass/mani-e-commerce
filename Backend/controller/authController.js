// import transporter from '../config/nodemailer.js'; // Ensure this path is correct

// export const register = async (req, res) => {
//   const { name, email, password } = req.body; // ✅ define name, email

//   if (!name || !email || !password) {
//     return res.json({
//       success: 'false',
//       message: 'Please fill all fields',
//     });
//   }

//   try {
//     // ... (user creation logic, token, cookie, etc.)

//     const mailOptions = {
//       from: process.env.SENDER_EMAIL,
//       to: email,
//       subject: 'Welcome to ManiTextile',
//       text: `Hi ${name},\n\nThanks for registering at ManiTextile!\n\n—The ManiTextile Team`,
//     };

//     try {
//       const info = await transporter.sendMail(mailOptions);
//       console.log('📧 Email sent:', info);
//     } catch (err) {
//       console.error('❌ Error sending mail:', err);
//     }

//     return res.json({
//       success: 'true',
//       message: 'Registration successful (email sent)',
//     });
//   } catch (err) {
//     return res.json({
//       success: 'false',
//       message: err.message,
//     });
//   }
// };

// controller/authController.js

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../model/user.js';
import transporter from '../config/nodemailer.js';

const JWT_SECRET = process.env.JWT_SECRET;
const CLIENT_URL = process.env.CLIENT_URL;

// POST /api/auth/register
export const register = async (req, res) => {
  console.log('📝 [register] req.body =', req.body);
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({ success: 'false', message: 'Please fill all fields' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: 'false', message: 'User already exists' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const savedUser = await new User({ name, email, password: hashedPassword }).save();
    console.log('✅ [register] savedUser =', savedUser);

    // Generate JWT token
    const token = jwt.sign({ id: savedUser._id }, JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Send welcome email
    try {
      console.log('📤 Sending welcome email...');
      const info = await transporter.sendMail({
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: 'Welcome to ManiTextile',
        text: `Hi ${name},\n\nThanks for registering at ManiTextile!\n\n—The ManiTextile Team`,
      });
      console.log('✅ Email sent:', info.messageId);
    } catch (err) {
      console.error('❌ Error sending email:', err.message);
    }

    return res.json({ success: 'true', message: 'Registration successful (email sent)' });
  } catch (error) {
    console.error('❌ [register] error:', error);
    return res.json({ success: 'false', message: error.message });
  }
};

// POST /api/auth/login
export const login = async (req, res) => {
  console.log('📝 [login] req.body =', req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: 'false', message: 'Email and Password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: 'false', message: 'User does not exist' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: 'false', message: 'Invalid password' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: 'true', message: 'Login successful' });
  } catch (error) {
    console.error('❌ [login] error:', error);
    return res.status(500).json({ success: 'false', message: error.message });
  }
};

// POST /api/auth/logout
export const logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Strict',
  });
  return res.json({ success: 'true', message: 'Logout successful' });
};

// GET /api/auth/isauth

export const isAuthenticated = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authenticated' });
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id).select('-password');
    if (!user) throw new Error('User not found');

    return res.json({ success: true, user });
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

// POST /api/auth/forgot-password
export const sendResetPasswordEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: 'false', message: 'Email is required' });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: 'false', message: 'No account with that email' });

    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600_000; // 1 hour
    await user.save();

    const resetUrl = `${CLIENT_URL}/reset-password/${token}`;
    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: 'ManiTextile Password Reset',
      text: `Hi ${user.name},\n\nYou requested a password reset. Click here:\n${resetUrl}\n\nThis link expires in one hour. If you didn't request it, ignore this email.`,
    });

    return res.json({ success: 'true', message: 'Password reset email sent.' });
  } catch (error) {
    console.error('❌ [sendReset] error:', error);
    return res.status(500).json({ success: 'false', message: 'Error sending reset email' });
  }
};

// PUT /api/auth/reset-password/:token
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  if (!password) return res.status(400).json({ success: 'false', message: 'New password is required' });

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) return res.status(400).json({ success: 'false', message: 'Invalid or expired token' });

    user.password = bcrypt.hashSync(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return res.json({ success: 'true', message: 'Password has been reset successfully.' });
  } catch (error) {
    console.error('❌ [resetPassword] error:', error);
    return res.status(500).json({ success: 'false', message: 'Error resetting password' });
  }
};
