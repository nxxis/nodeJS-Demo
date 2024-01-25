const express = require('express');
const Product = require('../models/product');
const mongoose = require('../db/mongoose');
const router = new express.Router();

router.post('/')
