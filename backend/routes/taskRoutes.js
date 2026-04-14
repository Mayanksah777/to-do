const express = require("express");
const { body, param } = require("express-validator");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);

router
  .route("/")
  .post(
    [
      body("title")
        .trim()
        .notEmpty()
        .withMessage("Task title is required")
        .isLength({ max: 200 })
        .withMessage("Task title must be 200 characters or less"),
    ],
    createTask
  )
  .get(getTasks);

router
  .route("/:id")
  .put(
    [
      param("id").isMongoId().withMessage("Invalid task id"),
      body("title")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Task title cannot be empty")
        .isLength({ max: 200 })
        .withMessage("Task title must be 200 characters or less"),
      body("completed")
        .optional()
        .isBoolean()
        .withMessage("Completed must be true or false"),
    ],
    updateTask
  )
  .delete([param("id").isMongoId().withMessage("Invalid task id")], deleteTask);

module.exports = router;
