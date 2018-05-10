/**
 * DamageReportController
 *
 * @description :: Server-side logic for managing Damagereports
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  register: async function(req, res) {
    try {
      sails.log(req.body);
      if (!(req.session.authenticated && req.session.UserID)) {
        res.forbidden('not logged in');
        return;
      }
      let userObject = await User.findOne({UserID: req.session.UserID});
      let carObject = await Car.findOne({CarID: userObject.CarID});
      if (!carObject) {
        res.forbidden('you dont have a car registered on your account');
        return;
      }

      const damageItems = req.body.Items;

      if (typeof damageItems === 'undefined' || damageItems.length <= 0) {
        res.badRequest('items in body is undefined');
        return;
      }

      DamageReport.create({UserID: req.session.UserID, CarID: carObject.CarID}).exec(function (err, dr) {
        if (err) {
          res.negotiate('error creating damage repor' + err);
          return;
        }
        if (!dr) {
          res.badRequest('damage report not made');
          return;
        }
        itemsToCreate = [];
        for (i = 0; i < damageItems.length; i++) {
          const itemcreate = {
            DamageReportID: dr.DamageReportID,
            ItemType: damageItems[i].ItemType,
            Damaged: damageItems[i].Damaged,
            Description: damageItems[i].Description,
          };
          itemsToCreate.push(itemcreate);
        }

        DamageReportItem.create(itemsToCreate).exec(function (err, items) {
          if (err) {
            res.negotiate('error creating damage report item: ' + err);
            return;
          }
          if (!items || items.length <= 0) {
            res.badRequest('damage report item not made');
            return;
          }
          let response = {
            dr,
            items,
          };
          res.json(response);
        });
      });
    } catch (error) {
      res.forbidden(error);
    }},

  getAll: async function(req, res) {
    if (!(req.session.authenticated && req.session.UserID)) {
      res.forbidden('not logged in');
      return;
    }

    let damageReports = await DamageReport.find({UserID: req.session.UserID});
    if (typeof damageReports === undefined || damageReports.length <= 0) {
      res.notFound('no damage reports found for this user');
    }

    for (i = 0; i < damageReports.length; i++) {
      damageReports[i].Items = await DamageReportItem.find({DamageReportID: damageReports[i].DamageReportID});
    }
    res.json(damageReports);
  }

};
