import express from "express";
import {fetchUsers,cardData,tokenValidator,assignOptions} from "../controllers/apiControllers.js"
const router = express.Router();

router.get("/users", fetchUsers);
router.get("/cardData",cardData)
router.get("/token",tokenValidator);
router.get("/options",assignOptions)


export default router;