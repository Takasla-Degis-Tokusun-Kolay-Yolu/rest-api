import CryptoJS from 'crypto-js';
import JWT from 'jsonwebtoken';
import { cryptoConfig, jwtConfig } from '../../config/index.js';

function passwordToHash(password) {
  const salt = cryptoConfig.cryptoSecret; // salt değerini burada belirtebilirsin
  const hash = CryptoJS.PBKDF2(password, salt, {
    keySize: 256 / 32,
    iterations: 1000,
  }).toString(CryptoJS.enc.Base64);
  return hash;
}

const filteredUser = (user) => {
  const { profileImage, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

// Access Token Oluşturma
const generateAccessToken = (user) => {
  const payload = filteredUser(user?._doc);
  const accessToken = JWT.sign({ name: payload.email, payload }, jwtConfig.jwtAccessSecret, { expiresIn: '1w' });
  return accessToken;
};

// Refresh Token Oluşturma
const generateRefreshToken = (user) => {
  const payload = filteredUser(user?._doc);
  const refreshToken = JWT.sign({ name: payload.email, payload }, jwtConfig.jwtRefreshSecret);
  return refreshToken;
};

export default {
  passwordToHash,
  generateAccessToken,
  generateRefreshToken,
};
