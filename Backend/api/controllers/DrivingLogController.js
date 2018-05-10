module.exports = {

  save: async function(req, res) {
    // Only logged in users can log car activity
    if (req.session.authenticated && req.session.UserID) {
      const UserID = req.session.UserID;

      const user = await User.findOne({UserID: UserID});

      if (!user) {
        return res.notFound('User not found');
      }
      let log = null;

      try {
        log = JSON.parse(req.body.drivingLog);
      }
      catch (err) {
        log = req.body.drivingLog;
      }

      log.UserID = UserID;
      log.CarID = user.CarID;

      const logItem = await DrivingLog.create(log);

      if (!logItem) {
        return res.serverError('Could not create log item');
      }
      return res.ok(logItem);
    } else {
      return res.forbidden('You are not logged in');
    }
  },

  getAll: async function(req, res) {
    if (req.session.authenticated && req.session.UserID) {
      // find all user's travel log items
      const logs = await DrivingLog.find({ UserID: req.session.UserID });
      if (!logs) {
        return res.notFound('No logs found for user');
      }

      return res.json(logs);
    } else {
      return res.forbidden('You are not logged in');
    }
  },


  remove: async function(req, res) {
    if (req.session.authenticated && req.session.UserID) {
      if (req.body.LogID == undefined) {
        return res.badRequest('LogID must be included');
      }
      const deleted = await DrivingLog.destroy({LogID: req.body.LogID});
      return res.ok();
    } else {
      return res.forbidden('You are not logged in');
    }
  }
};
