const { login, logout } = require("../src/testBase.js");
const { test, expect, browser } = require("@playwright/test");
const constants = require("../src/constants.js");
const { languageCheck,languageMenu } = require("../src/functions.js");
//Login
const username = constants.username;
const password = constants.password;
const baseURL = constants.baseURL;
const loggedOUTpageTitle = constants.loggedOUTpageTitle;

