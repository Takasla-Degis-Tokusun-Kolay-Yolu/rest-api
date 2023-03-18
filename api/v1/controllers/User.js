import httpStatus from 'http-status';
import UserService from '../services/User.js';
import JwtHelper from '../scripts/utils/helper.js';

const create = async (req, res) => {
  req.body.password = JwtHelper.passwordToHash(req.body.password);
  UserService.insert(req.body)
    .then((response) => {
      res.status(httpStatus.CREATED).json(response);
    })
    .catch((error) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    });
};

const login = (req, res) => {
  req.body.password = JwtHelper.passwordToHash(req.body.password);

  UserService.findOne(req.body.email)
    .then((user) => {
      if (!user) {
        return res.status(httpStatus.NOT_FOUND).send({
          message: 'User not found',
        });
      }
      console.log(user);
      user = {
        ...user._doc,
        tokens: {
          access_token: JwtHelper.generateAccessToken(user),
          refresh_token: JwtHelper.generateRefreshToken(user),
        },
      };
      console.log('updated user', user);
      delete user.password;
      res.status(httpStatus.OK).send(user);
    })
    .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
};

const index = (req, res) => {
  UserService.list()
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    }).catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    });
};

// TODO: RESET PASSWORD

const update = (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  UserService.update({ _id: req.user?._id }, req.body)
    .then((updatedUser) => {
      res.status(httpStatus.OK).send(updatedUser);
    })
    .catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'Güncelleme işlemi sırasında bir problem oluştu !' }));
};

const deleteUser = (req, res) => {
  if (!req.params?.id) {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: 'ID bilgisi eksik !',
    });
  }
  UserService.delete(req.params?.id).then((deletedUser) => {
    if (!deletedUser) {
      return res.status(httpStatus.NOT_FOUND).send({
        message: 'Bu ID değerine sahip kullanıcı bulunmamaktadır. !',
      });
    }
    res.status(httpStatus.OK).send({ message: 'Belirtilen kullanıcı silinmiştir' });
  }).catch((error) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'Kullanıcı silinirken bir sorunla karşılaşıldı.', message: error }));
};

const changePassword = (req, res) => {
  req.body.password = JwtHelper.passwordToHash(req.body.password);
  //! UI geldikten sonra şifre karşılaştırmalarına ilişkin kurallar eklenebilir.
  // eslint-disable-next-line no-underscore-dangle
  UserService.update({ _id: req.user?._id }, req.body)
    .then((updatedUser) => {
      res.status(httpStatus.OK).send(updatedUser);
    })
    .catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'Güncelleme işlemi sırasında bir problem oluştu !' }));
};

export default {
  create,
  index,
  login,
  update,
  deleteUser,
  changePassword,
};
