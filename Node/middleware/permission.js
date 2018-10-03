const Permission = require('../models/permission');

const createPermission = (req, res, next) => {
  Permission.create(req.body, (err, result) => {
    if (err) next(err);

    res.json(result);
  })
}

const updatePermission = (req, res, next) => {
  Permission.update(req.body, (err, result) => {
    if (err) next(err);

    res.json(result);
  })
}

const removePermission = (req, res, next) => {
  Permission.remove(req.body.id, (err, result) => {
    if (err) next(err);

    res.json(result);
  })
}

const listPermission = (req, res, next) => {
  Permission.list((err, result) => {
    if (err) next(err);

    res.json(result);
  })
}

const ListWithoutDuplicatePermission = (req, res, next) => {
  Permission.listWithoutDublicate((err, result) => {
    if (err) next(err);

    res.json(result);
  })
}

module.exports = {
  createPermission,
  updatePermission,
  removePermission,
  listPermission,
  ListWithoutDuplicatePermission
}