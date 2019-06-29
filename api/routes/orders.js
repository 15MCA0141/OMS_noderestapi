const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const checkAuth = require('../middleware/check_auth');

const Order = require("../models/order");
const Product = require("../models/product");

const OrderController = require('../controllers/orders');

// Getting all orders
router.get("/", checkAuth, OrderController.orders_get_all);

// Getting 1 order by ID
router.get("/:orderId", checkAuth, OrderController.orders_get_one);

// Creating new order
router.post("/", checkAuth, OrderController.create_order);

//Deleting order
router.delete("/:orderId", checkAuth, OrderController.delete_order);

module.exports = router;