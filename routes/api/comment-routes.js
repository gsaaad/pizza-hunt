const router = require("express").Router();

const {
  addComment,
  removeComment,
  addReply,
  removeReply,
} = require("../../controllers/comments-controller");

//  /api/comments/:pizzaID
router.route("/:pizzaId").post(addComment);

// /api/comments/:pizzaID/commentID, we need both pizza ID and comment ID to delete that specific comment
router.route("/:pizzaId/:commentId").delete(removeComment);

// add reply
router.route("/:pizzaId/:commentId").put(addReply).delete(removeComment);

// remove reply
router.route("/:pizzaId/:commentId/:replyId").delete(removeReply);

module.exports = router;
