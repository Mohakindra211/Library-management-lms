const express = require("express");
const { login, register } = require("../controllers/authController");
const { validateRequest } = require("../validators/validationHandler");
const { loginSchema, registerSchema } = require("../validators/userValidator");

const router = express.Router();

/**
 * @api {post} /auth/register Register a new user
 * @apiName RegisterUser
 * @apiGroup Auth
 *
 * @apiParam {String} name User name
 * @apiParam {String} email User email
 * @apiParam {String} password User password
 *
 * @apiSuccess {String} message Success message
 * @apiSuccess {Object} data User object
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 201 Created
 *   {
 *     "message": "User registered successfully",
 *     "data": {
 *       "id": 1,
 *       "name": "John Doe",
 *       "email": "johndoe@example.com",
 *       "role": "user",
 *       "updatedAt": "2023-03-02T14:44:07.087Z",
 *       "createdAt": "2023-03-02T14:44:07.087Z"
 *     }
 *   }
 */
router.post("/register", validateRequest(registerSchema), register);

/** */
/**
 * @api {post} /auth/login Login a user
 * @apiName LoginUser
 * @apiGroup Auth
 *
 * @apiParam {String} email User email
 * @apiParam {String} password User password
 *
 * @apiSuccess {String} message Success message
 * @apiSuccess {Object} data User object
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "message": "User logged in successfully",
 *     "data": {
 *       "id": 1,
 *       "name": "John Doe",
 *       "email": "johndoe@example.com",
 *       "role": "user",
 *       "createdAt": "2023-03-02T14:44:07.087Z",
 *       "updatedAt": "2023-03-02T14:44:07.087Z",
 *       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     }
 *   }
 */
router.post("/login", validateRequest(loginSchema), login);

module.exports = router;
