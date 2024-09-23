const { Router } = require("express");

const NotesController = require("../controllers/NotesController");

const ensureAthenticated = require("../middlewares/ensureAuthenticated");

const notesRoutes = Router();

const notesController = new NotesController();

notesRoutes.use(ensureAthenticated);

notesRoutes.post("/", notesController.create);
notesRoutes.get("/", notesController.index);
notesRoutes.get("/:id", notesController.show);
notesRoutes.delete("/:id", notesController.delete);

module.exports = notesRoutes;