import httpStatus from 'http-status';
import UserService from '../services/User.js';
import Helper from '../scripts/utils/helper.js';

class User {
  index = (req, res) => {
    UserService.list()
      .then((response) => {
        res.status(httpStatus.OK).send(response);
      }).catch((e) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
      });
  };

  create(req, res) {
    req.body.password = Helper.passwordToHash(req.body.password);
    UserService.create(req.body)
      .then((response) => {
        res.status(httpStatus.CREATED).send(response);
      })
      .catch((e) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
      });
  }

  login(req, res) {
    req.body.password = Helper.passwordToHash(req.body.password);
    console.log(req.body);
    UserService.findOne(req.body)
      .then((user) => {
        if (!user) {
          return res.status(httpStatus.NOT_FOUND).send({
            message: 'Böyle bir kullanıcı bulunamadı.',
          });
        }
        user = {
          ...user.toObject(),
          tokens: {
            access_token: Helper.generateAccessToken(user),
            refresh_token: Helper.generateRefreshToken(user),
          },
        };
        delete user.password;
        res.status(httpStatus.OK).send(user);
      })
      .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
  }

  update(req, res) {
    UserService.update({ _id: req.user?._id }, req.body)
      .then((updatedUser) => {
        res.status(httpStatus.OK).send(updatedUser);
      })
      .catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'Güncelleme işlemi sırasında bir problem oluştu !' }));
  }

  deleteUser(req, res) {
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
    }).catch((error) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'Kullanıcı silinirken bir sorunla karşılaşıldı.', message: error.message }));
  }

  changePassword(req, res) {
    req.body.password = Helper.passwordToHash(req.body.password);
    //! UI geldikten sonra şifre karşılaştırmalarına ilişkin kurallar eklenebilir.
    UserService.update({ _id: req.user?._id }, req.body)
      .then((updatedUser) => {
        res.status(httpStatus.OK).send(updatedUser);
      })
      .catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'Güncelleme işlemi sırasında bir problem oluştu !' }));
  }

  updateProfileImage(req, res) {
    //! 1 - Resim kontrolü
    if (!req?.files?.profile_image) {
      return res.status(httpStatus.BAD_REQUEST).send({ error: 'Bu işlemi yapabilmek için yeterli veriye sahip değilsiniz!' });
    }
    //! 2 - Upload işlemi
    const extension = path.extname(req.files.profile_image.name);
    const fileName = `${req?.user._id}${extension}`;
    const folderPath = path.join(__dirname, '../', 'uploads/users', fileName);
    req.files.profile_image.mv(folderPath, (err) => {
      if (err) return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: err });
      UserService.update(req.user._id, { profile_image: fileName })
        .then((updatedUser) => {
          res.status(httpStatus.OK).send(updatedUser);
        })
        .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: 'Upload Başarılı, ancak kayıt sırasında sorun oluştu.' }));
    });
    //! 3 - DB save
    //! 4 - Response
  }
}

export default new User();
