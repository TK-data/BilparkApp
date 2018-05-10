module.exports = {

  save: async function(req, res) {
    // Only logged in users can connect to a company
    if (req.session.authenticated && req.session.UserID) {
      const update = {
        CompanyID: req.body.CompanyID,
      };

      const company = await Company.findOne(update);

      if (!company) {
        return res.notFound('Company not found');
      }

      User.update(parseInt(req.session.UserID), update).exec(function (err, user) {
        if (err) {
          return res.negotiate(err);
        }
        if (!user || user.length < 1) {
          return res.notFound('User not found');
        }
        return res.json(company);
      });
    } else {
      return res.forbidden('You are not logged in');
    }
  }
};
