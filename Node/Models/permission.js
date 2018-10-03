const mongoose = require('mongoose');
const _ = require('lodash');

const PermissionSchema = mongoose.Schema({
  role: {
    type: String,
    required: true
  },
  resource: {
    type: String,
    required: true
  },
  action:
  {
    type: String,
    required: true
  },
  attributes:
  {
    type: Array,
    required: true,
    default: ['*']
  }

})


PermissionSchema.statics.listWithoutDublicate = function (cb) {
  this.model('permission').find({}).exec((err, result) => {
    if (err) return cb(err);

    const sortArray = _.uniqBy(result, 'role');

    return cb(null, sortArray);
  })
};

PermissionSchema.statics.list = function (cb) {
  this.model('permission').find({}).exec(cb);
};

PermissionSchema.statics.addNew = function (org, cb) {
  const newOrg = new User(org);

  newOrg.save(cb);
};

PermissionSchema.statics.update = function (org, cb) {
  this.model('permission').findOneAndUpdate(
    { "_id": new mongoose.mongo.ObjectID(org._id) },
    { $set: org.input }, 
    { new: true },
    cb
  )
};

PermissionSchema.statics.remove = function (id, cb) {
  this.model('permission').findOneAndRemove({ "_id": new mongoose.mongo.ObjectID(id) }, cb)
};


const Permission = mongoose.model('permission', PermissionSchema);

module.exports = Permission;