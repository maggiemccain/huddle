const memberships = require('./memberships.js');
const users = require('./users.js');
const churches = require('./churches.js');
const gatherings = require('./gatherings.js');

module.exports = {
  getAllUsers: users.getAllUsers,
  getSingleUser: users.getSingleUser,
  getUserByEmail: users.getUserByEmail,
  createUser: users.createUser,
  updateUser: users.updateUser,
  removeUser: users.removeUser,
  getAllGatherings: gatherings.getAllGatherings,
  createGathering: gatherings.createGathering,
  getAllChurches: churches.getAllChurches,
  getSingleChurch: churches.getSingleChurch,
  getGatheringsByChurch: gatherings.getGatheringsByChurch,
  createChurch: churches.createChurch,
  updateChurch: churches.updateChurch,
  removeChurch: churches.removeChurch,
  getMembershipByGathering: memberships.getMembershipByGathering,
  addMembership: memberships.addMembership,
  getMembershipByUser: memberships.getMembershipByUser
};