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

// Access Token Oluşturma
const generateAccessToken = (user) => {
  const accessToken = JWT.sign({ name: user.email, ...user }, jwtConfig.jwtAccessSecret, { expiresIn: '1w' });
  console.log(accessToken);
  return accessToken;
};

// Refresh Token Oluşturma
const generateRefreshToken = (user) => {
  const refreshToken = JWT.sign({ name: user.email, ...user }, jwtConfig.jwtRefreshSecret);
  return refreshToken;
};

export default {
  passwordToHash,
  generateAccessToken,
  generateRefreshToken,
};
