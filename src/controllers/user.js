require("dotenv").config();

const { UpdateProfile } = require("../models/user");
const firebaseAdmin = require("../config/firebase");
exports.UpdateProfile = async (req, res) => {
  try {
    const bucket = firebaseAdmin.storage().bucket();
    const pathFile = `imageUser/${req.auth.id}.${
      req.file.mimetype.split("/")[1]
    }`;
    const data = bucket.file(pathFile);
    await data.save(req.file.buffer);
    const result = await UpdateProfile(req.auth.id, pathFile);
    res.status(200).send({
      data: {
        image: `${process.env.FIREBASE_STORAGE_URL}${encodeURIComponent(
          pathFile
        )}?alt=media`,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(202).send({
      error: {
        msg: error.message || "Something wrong",
      },
    });
  }
};
