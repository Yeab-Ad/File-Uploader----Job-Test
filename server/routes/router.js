const express = require("express");
const router = new express.Router();
const {
  Register,
  getData,
  deleteUser,
} = require("../Controller/uploaderController");

// register userdata
router.post("/register", Register);

// get user data
router.get("/getdata", getData);

// delete user
router.delete("/:id", deleteUser);

module.exports = router;
