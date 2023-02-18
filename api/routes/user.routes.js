const express = require("express");
const router = express.Router();
const {
    getUsers,
    getUsersByRole,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} = require("../controllers/manageUsers.controller");

router.get("/", getUsers);
router.get("/roles/:role", getUsersByRole);
router.get("/:id", getUserById);
router.post("/create", createUser);
router.patch("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;
