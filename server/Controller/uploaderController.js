const conn = require("../db/conn");
const moment = require("moment");
const multer = require("multer");

// img storage confing
var imgconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(null, `image-${Date.now()}.${file.originalname}`);
  },
});

// img filter
const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(null, Error("only image is allowd"));
  }
};

var upload = multer({
  storage: imgconfig,
  fileFilter: isImage,
});

// register userdata
exports.Register = async (req, res) => {
  const { fname } = req.body;
  const { filename } = req.file;

  if (!fname || !filename) {
    res.status(422).json({ status: 422, message: "fill all the details" });
  }

  try {
    let date = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

    conn.query(
      "INSERT INTO usersdata SET ?",
      { username: fname, userimg: filename, date: date },
      (err, result) => {
        if (err) {
          console.log("error");
          return res.status(422).json({ status: 422, error: err });
        } else {
          console.log("data added");
          res.status(201).json({ status: 201, data: req.body });
        }
      }
    );
  } catch (error) {
    res.status(422).json({ status: 422, error });
  }
};

// get user data

exports.getData = async (req, res) => {
  try {
    conn.query("SELECT * FROM usersdata", (err, result) => {
      if (err) {
        console.log("error");
        return res.status(422).json({ status: 422, error: err });
      } else {
        console.log("data get");
        return res.status(201).json({ status: 201, data: result });
      }
    });
  } catch (error) {
    res.status(422).json({ status: 422, error });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    conn.query(`DELETE FROM usersdata WHERE id ='${id}'`, (err, result) => {
      if (err) {
        console.log("error");
        return res.status(422).json({ status: 422, error: err });
      } else {
        console.log("data delete");
        res.status(201).json({ status: 201, data: result });
      }
    });
  } catch (error) {
    res.status(422).json({ status: 422, error });
  }
};
