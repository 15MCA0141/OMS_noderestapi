const express = require("express");
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check_auth');

const ProductController = require('../controllers/products');


//Defining Storage
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

//Filtering File Types
const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};


//File Upload
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});



router.get("/", ProductController.products_get_all);

router.get("/:productId", ProductController.products_get_one);

router.patch("/:productId", checkAuth, ProductController.product_update);

router.delete("/:productId", checkAuth, ProductController.product_delete);

router.post("/", checkAuth, upload.single('productImage'), ProductController.product_create);


module.exports = router;