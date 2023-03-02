const express = require("express");
const {
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controllers/userController");
const { validateRequest } = require("../validators/validationHandler");
const { updateUserSchema } = require("../validators/userValidator");
const { protect, authorize } = require("../middlewares/auth");

const router = express.Router();

/**
 * @api {get} /users Get all users
 * @apiName GetUsers
 * @apiGroup Users
 *
 * @apiSuccess {Object[]} data Array of user objects
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": [
 *       {
 *         "id": 1,
 *         "name": "John Doe",
 *         "email": "johndoe@example.com",
 *         "role": "user",
 *         "createdAt": "2023-03-02T14:44:07.087Z",
 *         "updatedAt": "2023-03-02T14:44:07.087Z"
 *       },
 *       ...
 *     ]
 *   }
 */
router.get("/", protect, authorize("admin"), getUsers);

/**
 * @api {get} /users/:id Get a user by ID
 * @apiName GetUserById
 * @apiGroup Users
 *
 * @apiParam {Number} id User ID
 *
 * @apiSuccess {Object} data User object
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "data": {
 *       "id": 1,
 *       "name": "John Doe",
 *       "email": "johndoe@example.com",
 *       "role": "user",
 *       "createdAt": "2023-03-02T14:44:07.087Z",
 *       "updatedAt": "2023-03-02T14:44:07.087Z"
 *     }
 *   }
 */
router.get("/:id", protect, authorize("admin"), getUserById);

/**
 * @api {put} /users/:id Update a user by ID
 * @apiName UpdateUserById
 * @apiGroup Users
 *
 * @apiParam {Number} id User ID
/** */
