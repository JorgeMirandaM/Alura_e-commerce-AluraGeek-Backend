const {signIn,signUp,logout,getProfile} = require('../controllers/auth.controller');

const express= require('express');
const router= express.Router();

const {verifyToken}= require('../middlewares/verificarToken');

const {checkExistingUser}= require('../middlewares/verificarRegistro');


router.post('/signup',[checkExistingUser],signUp);

router.post('/signin',signIn);

router.post('/logout',[verifyToken],logout);
 
router.get('/getCuenta',getProfile);

module.exports=router; 

