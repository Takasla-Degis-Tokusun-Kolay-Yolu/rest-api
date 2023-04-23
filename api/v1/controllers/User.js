import httpStatus from 'http-status';
import UserService from '../services/User.js';
import Helper from '../scripts/utils/helper.js';

class User {
  index = (req, res) => {
    UserService.list()
      .then((response) => {
        res.status(httpStatus.OK).send({
          success: true,
          data: response,
        });
      })
      .catch((e) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
      });
  };

  getOneById = (req, res) => {
    if (!req.params?.id) {
      return res.status(httpStatus.BAD_REQUEST).send({
        success: false,
        message: 'There is no ID value in the request!',
      });
    }
    UserService.findOneById(req.params?.id)
      .then((user) => {
        if (!user) {
          return res.status(httpStatus.NOT_FOUND).send({
            success: false,
            message: 'There is no user with the given ID!',
          });
        }

        res.status(httpStatus.OK).send({
          success: true,
          data: user,
        });
      })
      .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: 'An error occurred while retrieving the user.',
        error: e,
      }));
  };

  create(req, res) {
    req.body.password = Helper.passwordToHash(req.body.password);
    UserService.create(req.body)
      .then((user) => {
        user = {
          ...user.toObject(),
          tokens: {
            access_token: Helper.generateAccessToken(user),
            refresh_token: Helper.generateRefreshToken(user),
          },
        };
        delete user.password;
        res.status(httpStatus.CREATED).send({
          success: true,
          data: user,
        });
      })
      .catch((e) => {
        if (e.code === 11000) {
          return res.status(httpStatus.BAD_REQUEST).send({
            success: false,
            message: 'Bu e-posta adresi ile daha önce kayıt olunmuş.',
          });
        }
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
          success: false,
          message: 'An error occurred while creating the user.',
          error: e,
        });
      });
  }

  login(req, res) {
    req.body.password = Helper.passwordToHash(req.body.password);
    UserService.findOne(req.body)
      .then((user) => {
        if (!user) {
          return res.status(httpStatus.NOT_FOUND).send({
            success: false,
            message: 'No such user was found.',
          });
        }
        delete user.profileImage
        user = {
          ...user.toObject(),
          tokens: {
            access_token: Helper.generateAccessToken(user),
            refresh_token: Helper.generateRefreshToken(user),
          },
        };
        delete user.password;
        res.status(httpStatus.OK).send({
          success: true,
          data: user,
        });
      })
      .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
  }

  update(req, res) {
    console.log(req.user);
    UserService.update({ _id: req.user?._id }, req.body)
      .then((updatedUser) => {
        res.status(httpStatus.OK).send({
          success: true,
          data: updatedUser,
        });
      })
      .catch(() => res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: 'Güncelleme işlemi sırasında bir problem oluştu !' }));
  }

  deleteUser(req, res) {
    if (!req.params?.id) {
      return res.status(httpStatus.BAD_REQUEST).send({
        success: false,
        message: 'There is no ID value in the request!',
      });
    }
    UserService.delete(req.params?.id)
      .then((deletedUser) => {
        if (!deletedUser) {
          return res.status(httpStatus.NOT_FOUND).send({
            success: false,
            message: 'There is no user with the given ID!',
          });
        }
        res
          .status(httpStatus.OK)
          .send({
            success: true,
            message: 'The specified user has been deleted.',
          });
      })
      .catch((error) => res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({
          success: false,
          error: 'Something went wrong when deleting user.',
          message: error.message,
        }));
  }

  changePassword(req, res) {
    req.body.password = Helper.passwordToHash(req.body.newPassword);
    req.body.oldPassword = Helper.passwordToHash(req.body.oldPassword);
    UserService.findOne({ _id: req.user?._id, password: req.body.oldPassword });
    //! UI geldikten sonra şifre karşılaştırmalarına ilişkin kurallar eklenebilir.
    UserService.update({ _id: req.user?._id }, req.body)
      .then((updatedUser) => {
        res.status(httpStatus.OK).send(updatedUser);
      })
      .catch(() => res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: 'Güncelleme işlemi sırasında bir problem oluştu !' }));
  }

  getActiveUser(req, res) {
    const { user } = req;
    // userId: user._id,
    UserService.findOneById(user._id.toString())
      .then((user) => {
        if (!user) {
          return res.status(httpStatus.NOT_FOUND).send({
            success: false,
            message: 'There is no user with the given ID!',
          });
        }
        return res.status(httpStatus.OK).send({
          success: true,
          data: user,
        });
      })
      .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: 'An error occurred while retrieving the user.',
        error: e,
      }));
  }

  updateProfileImage(req, res) {
    //! 1 - Resim kontrolü
    if (!req?.files?.profile_image) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({
          error: 'Bu işlemi yapabilmek için yeterli veriye sahip değilsiniz!',
        });
    }
    //! 2 - Upload işlemi
    const extension = path.extname(req.files.profile_image.name);
    const fileName = `${req?.user._id}${extension}`;
    const folderPath = path.join(__dirname, '../', 'uploads/users', fileName);
    req.files.profile_image.mv(folderPath, (err) => {
      if (err) {
        return res
          .status(httpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: err });
      }
      UserService.update(req.user._id, { profile_image: fileName })
        .then((updatedUser) => {
          res.status(httpStatus.OK).send(updatedUser);
        })
        .catch((e) => res
          .status(httpStatus.INTERNAL_SERVER_ERROR)
          .send({
            error: 'Upload Başarılı, ancak kayıt sırasında sorun oluştu.',
          }));
    });
    //! 3 - DB save
    //! 4 - Response
  }
}

export default new User();
