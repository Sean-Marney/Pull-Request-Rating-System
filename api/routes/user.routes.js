const express = require("express");
const router = express.Router();
const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} = require("../controllers/manageUsers.controller");
const verifyJWTToken = require("../middleware/verifyJWT");


// router.get("/users", verifyJWTToken, getUsers);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/create", createUser);
router.patch("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;
