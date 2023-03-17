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
} = require("../controllers/manageUsers.controller");

router.get("/", getUsers);
router.get("/roles/:role", getUsersByRole);
router.get("/:id", getUserById);
router.get("/email/:email", getUserByEmail);
router.post("/create", createUser);
router.patch("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);
router.patch("/update/email/:email", updateUserByEmail);
router.patch("/updatePassword/email/:email", updateUsersPasswordByEmail);

module.exports = router;
