const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUsersByRole,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
  updateUserByEmail,
  updateUsersPasswordByEmail,
  deleteUserByEmail, 
} = require("../controllers/manageUsers.controller");

const {verifyJWTToken, verifyManger, verifyTokenAndAuth} = require('../middleware/verifyJWT')
router.use(verifyJWTToken)

router.get("/", verifyManger, getUsers);
router.get("/roles/:role", getUsersByRole);
router.get("/:id", getUserById);
router.get("/email/:email", getUserByEmail);
router.post("/create", verifyManger, createUser);
router.patch("/update/:id", verifyManger, updateUser);
router.delete("/delete/:id", verifyManger, deleteUser);
router.patch("/update/email/:email", updateUserByEmail);
router.patch("/updatePassword/email/:email", updateUsersPasswordByEmail);
router.delete("/deleteUser/email/:email", deleteUserByEmail);
module.exports = router;
