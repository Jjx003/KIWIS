var express = require("express");
var router = express.Router();
var auth = require('../../auth/index');
var {authenticated} = require('../auth/index');
var db = require('../../db/index');