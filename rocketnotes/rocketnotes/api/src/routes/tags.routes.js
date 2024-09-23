const { Router } = require("express");

const TagsController = require("../controllers/TagsController");

const ensureAthenticated = require("../middlewares/ensureAuthenticated");

const tagsRoutes = Router();

const tagsController = new TagsController();

tagsRoutes.get("/", ensureAthenticated, tagsController.index);

module.exports = tagsRoutes;