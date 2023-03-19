import httpStatus from 'http-status';

const idChecker = (field) => (req, res, next) => {
  const idField = field || 'id';
  if (!req?.params[idField]?.match(/^[0-9a-fA-F]{24}$/)) {
    next(res.status(httpStatus.BAD_REQUEST).json({ success: false, message: 'Invalid id' }));
    return;
  }
  console.log('Passed idChecker middleware');
  next();
};

export default idChecker;
