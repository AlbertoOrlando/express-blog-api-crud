const express = require("express")
const router = express.Router();
const postController = require("../controllers/postController")

router.get("/", postController.index);

router.get("/:id", postController.show);

router.post("/", function(req, res) {
    res.send("creiamo un nuovo post")
});

router.put("/:id", function(req, res) {
    res.send("modifica integrale post " + req.params.id)
});

router.patch("/:id", function(req, res) {
    res.send("modifica parziale post " + req.params.id)
});

router.delete("/:id", function(req, res) {
    res.send("cancelliamo il post " + req.params.id)
});

module.exports = router;