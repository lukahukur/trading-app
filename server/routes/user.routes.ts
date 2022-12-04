import {Router} from "express";
import { Mailer } from "../controller/mailer.controller";
import Ucontroller from "../controller/user.controller";

const router = Router();

router.post('/login',Ucontroller.login);
router.post('/registration',Ucontroller.register);
router.post('/__auth',Ucontroller.verify,Ucontroller.authenticationWidthBody);


export default router;