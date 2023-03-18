import CryptoJS from 'crypto-js';
import JWT from 'jsonwebtoken';

const passwordToHash = (password) => {
  const salt = CryptoJS.lib.WordArray.random(16); // Salt oluşturuluyor
  const hash = CryptoJS.PBKDF2(password, salt, {
    keySize: 64,
    iterations: 1000,
    hasher: CryptoJS.algo.SHA512,
  }); // Şifre hashleniyor

  const saltString = salt.toString(CryptoJS.enc.Base64);
  const hashString = hash.toString(CryptoJS.enc.Base64);

  return `${saltString}.${hashString}`; // Salt ve hash değerleri birleştirilerek döndürülüyor
};

// Access Token Oluşturma
const generateAccessToken = (user) => {
  const accessToken = JWT.sign({ name: user.email, ...user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1w' });
  console.log(accessToken);
  return accessToken;
};

// Refresh Token Oluşturma
const generateRefreshToken = (user) => {
  const refreshToken = JWT.sign({ name: user.email, ...user }, process.env.REFRESH_TOKEN_SECRET);
  return refreshToken;
};

export default {
  passwordToHash,
  generateAccessToken,
  generateRefreshToken,
};
