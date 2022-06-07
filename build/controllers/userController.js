"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startGithubLogin = exports.see = exports.postLogin = exports.postJoin = exports.postEdit = exports.postChangePassword = exports.logout = exports.getLogin = exports.getJoin = exports.getEdit = exports.getChangePassword = exports.finishGithubLogin = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _Video = _interopRequireDefault(require("../models/Video"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _expressSession = _interopRequireDefault(require("express-session"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getJoin = function getJoin(req, res) {
  return res.render("join", {
    pageTitle: "Join"
  });
};

exports.getJoin = getJoin;

var postJoin = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, name, username, email, password, password2, location, usernameExists;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, username = _req$body.username, email = _req$body.email, password = _req$body.password, password2 = _req$body.password2, location = _req$body.location;

            if (!(password !== password2)) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", res.status(400).render("join", {
              pageTitle: "Join",
              errorMessage: "Password does not match Confirmation."
            }));

          case 3:
            _context.next = 5;
            return _User["default"].exists({
              $or: [{
                username: username
              }, {
                email: email
              }]
            });

          case 5:
            usernameExists = _context.sent;

            if (!usernameExists) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", res.status(400).render("join", {
              pageTitle: "Join",
              errorMessage: "This username/email is already taken."
            }));

          case 8:
            _context.prev = 8;
            _context.next = 11;
            return _User["default"].create({
              name: name,
              username: username,
              email: email,
              password: password,
              location: location
            });

          case 11:
            return _context.abrupt("return", res.redirect("/login"));

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](8);
            return _context.abrupt("return", res.status(400).render("join", {
              pageTitle: "Join",
              errorMessage: _context.t0._Message
            }));

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[8, 14]]);
  }));

  return function postJoin(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.postJoin = postJoin;

var getEdit = function getEdit(req, res) {
  res.render("edit-profile", {
    pageTitle: "Edit Profile"
  });
};

exports.getEdit = getEdit;

var postEdit = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$session$user, _id, avatarUrl, _req$body2, name, email, username, location, file, findUsername, findEmail, updatedUser;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$session$user = req.session.user, _id = _req$session$user._id, avatarUrl = _req$session$user.avatarUrl, _req$body2 = req.body, name = _req$body2.name, email = _req$body2.email, username = _req$body2.username, location = _req$body2.location, file = req.file;
            console.log(file);
            _context2.next = 4;
            return _User["default"].findOne({
              username: username
            });

          case 4:
            findUsername = _context2.sent;
            _context2.next = 7;
            return _User["default"].findOne({
              email: email
            });

          case 7:
            findEmail = _context2.sent;

            if (!(findUsername != null && findUsername._id != _id || findEmail != null && findEmail._id != _id)) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", res.render("edit-profile", {
              pageTitle: "Edit  Profile",
              errorMessage: "Username/email is already taken"
            }));

          case 10:
            _context2.next = 12;
            return _User["default"].findByIdAndUpdate(_id, {
              avatarUrl: file ? file.path : avatarUrl,
              name: name,
              email: email,
              username: username,
              location: location
            }, {
              "new": true
            });

          case 12:
            updatedUser = _context2.sent;
            req.session.user = updatedUser;
            return _context2.abrupt("return", res.redirect("/user/edit"));

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function postEdit(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.postEdit = postEdit;

var getLogin = function getLogin(req, res) {
  res.render("Login", {
    pageTitle: "Login"
  });
};

exports.getLogin = getLogin;

var postLogin = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var _req$body3, username, password, pageTitle, user, compare;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body3 = req.body, username = _req$body3.username, password = _req$body3.password;
            pageTitle = "Login";
            _context3.next = 4;
            return _User["default"].findOne({
              username: username,
              socialOnly: false
            });

          case 4:
            user = _context3.sent;

            if (user) {
              _context3.next = 7;
              break;
            }

            return _context3.abrupt("return", res.status(400).render("login", {
              pageTitle: pageTitle,
              errorMessage: "Username does not exists"
            }));

          case 7:
            _context3.next = 9;
            return _bcrypt["default"].compare(password, user.password);

          case 9:
            compare = _context3.sent;

            if (compare) {
              _context3.next = 12;
              break;
            }

            return _context3.abrupt("return", res.status(400).render("login", {
              pageTitle: pageTitle,
              errorMessage: "Wrong password"
            }));

          case 12:
            req.session.loggedIn = true;
            req.session.user = user;
            res.redirect("/");

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function postLogin(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.postLogin = postLogin;

var logout = function logout(req, res) {
  req.session.destroy();
  req.flash("info", "Bye~");
  return res.redirect("/");
};

exports.logout = logout;

var see = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var id, user;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            _context4.next = 3;
            return _User["default"].findById(id).populate({
              path: "videos",
              populate: {
                path: "owner",
                model: "User"
              }
            });

          case 3:
            user = _context4.sent;

            if (user) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt("return", res.status(404).render("404", {
              pageTitle: "User not found."
            }));

          case 6:
            return _context4.abrupt("return", res.render("profile", {
              pageTitle: "".concat(user.name, "\uC758 Profile"),
              user: user
            }));

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function see(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.see = see;

var startGithubLogin = function startGithubLogin(req, res) {
  var baseUrl = "https://github.com/login/oauth/authorize";
  var config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: true,
    scope: "read:user user:email"
  };
  var params = new URLSearchParams(config).toString();
  var finalURL = "".concat(baseUrl, "?").concat(params);
  return res.redirect(finalURL);
};

exports.startGithubLogin = startGithubLogin;

var finishGithubLogin = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var baseUrl, config, params, finalUrl, tokenRequest, access_token, apiUrl, userData, emailData, emailObj, user;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            baseUrl = "https://github.com/login/oauth/access_token";
            config = {
              client_id: process.env.GH_CLIENT,
              client_secret: process.env.GH_SECRET,
              code: req.query.code
            };
            params = new URLSearchParams(config).toString();
            finalUrl = "".concat(baseUrl, "?").concat(params);
            _context5.next = 6;
            return (0, _nodeFetch["default"])(finalUrl, {
              method: "POST",
              headers: {
                Accept: "application/json"
              }
            });

          case 6:
            _context5.next = 8;
            return _context5.sent.json();

          case 8:
            tokenRequest = _context5.sent;

            if (!("access_token" in tokenRequest)) {
              _context5.next = 39;
              break;
            }

            access_token = tokenRequest.access_token;
            apiUrl = "https://api.github.com";
            _context5.next = 14;
            return (0, _nodeFetch["default"])("".concat(apiUrl, "/user"), {
              headers: {
                Authorization: "token ".concat(access_token)
              }
            });

          case 14:
            _context5.next = 16;
            return _context5.sent.json();

          case 16:
            userData = _context5.sent;
            _context5.next = 19;
            return (0, _nodeFetch["default"])("".concat(apiUrl, "/user/emails"), {
              headers: {
                Authorization: "token ".concat(access_token)
              }
            });

          case 19:
            _context5.next = 21;
            return _context5.sent.json();

          case 21:
            emailData = _context5.sent;
            emailObj = emailData.find(function (email) {
              return email.primary === true && email.verified === true;
            });

            if (emailObj) {
              _context5.next = 25;
              break;
            }

            return _context5.abrupt("return", res.redirect("/login"));

          case 25:
            _context5.next = 27;
            return _User["default"].findOne({
              email: emailObj.email
            });

          case 27:
            user = _context5.sent;
            console.log(user);

            if (user) {
              _context5.next = 33;
              break;
            }

            _context5.next = 32;
            return _User["default"].create({
              avatarUrl: userData.avatar_url,
              name: userData.name,
              username: userData.login,
              email: emailObj.email,
              password: "",
              socialOnly: "true",
              location: userData.location
            });

          case 32:
            user = _context5.sent;

          case 33:
            console.log(user);
            req.session.loggedIn = true;
            req.session.user = user;
            return _context5.abrupt("return", res.redirect("/"));

          case 39:
            return _context5.abrupt("return", res.redirect("/login"));

          case 40:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function finishGithubLogin(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.finishGithubLogin = finishGithubLogin;

var getChangePassword = function getChangePassword(req, res) {
  if (req.session.user.socialOnly === true) {
    req.flash("error", "Cannot change Github logged in password");
    return res.redirect("/");
  }

  return res.render("change-password", {
    pageTitle: "Change Password"
  });
};

exports.getChangePassword = getChangePassword;

var postChangePassword = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var _id, _req$body4, oldPassword, newPassword, newPassword2, user, ok;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _id = req.session.user._id, _req$body4 = req.body, oldPassword = _req$body4.oldPassword, newPassword = _req$body4.newPassword, newPassword2 = _req$body4.newPassword2;
            _context6.next = 3;
            return _User["default"].findById(_id);

          case 3:
            user = _context6.sent;
            _context6.next = 6;
            return _bcrypt["default"].compare(oldPassword, user.password);

          case 6:
            ok = _context6.sent;

            if (ok) {
              _context6.next = 9;
              break;
            }

            return _context6.abrupt("return", res.status(400).render("change-password", {
              pageTitle: "Change Password",
              errorMessage: "The current password does not match"
            }));

          case 9:
            if (!(newPassword !== newPassword2)) {
              _context6.next = 11;
              break;
            }

            return _context6.abrupt("return", res.status(400).render("change-password", {
              pageTitle: "Change Password",
              errorMessage: "New passwords does not match"
            }));

          case 11:
            user.password = newPassword;
            _context6.next = 14;
            return user.save();

          case 14:
            req.flash("info", "Password Updated");
            return _context6.abrupt("return", res.redirect("/user/logout"));

          case 16:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function postChangePassword(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.postChangePassword = postChangePassword;