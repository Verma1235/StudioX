import express from "express";
import { fetchUsers, cardData, tokenValidator, assignOptions, fetchAllOptions, generalSettings, updateSettings } from "../controllers/apiControllers.js"
const router = express.Router();

router.get("/users", fetchUsers);
router.get("/cardData", cardData)
// router.get("/token", tokenValidator);
router.get("/options", assignOptions)
router.get("/alloptions", fetchAllOptions);
router.get("/settings", generalSettings)
// router.get("/carddata",cardData);
router.put("/saveSettings", updateSettings);

export default router;