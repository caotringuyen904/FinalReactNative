const express = require('express');
const { deleteUser, getInfo, loginUser, signupUser, updatePassword, getUser, updateEmail, updateName, updateAvatar, verifyToken } = require('../controller/userController.js');
const requireAuth = require('../middlewares/requireAuth.js');
const { uploads } = require('../middlewares/multerProfileImg.js');

const router = express.Router()


//Login Route
router.post('/login', loginUser)


//Signup Route
router.post('/signup', signupUser)


// //Blog Author Information
// router.get('/userinfo/:id', getInfo)


//Dashboard Route
//check if user has already log in 
router.use(requireAuth)
router.get('/verifyToken', verifyToken)
router.put('/dashboard/updateuser/changename', updateName)
router.put('/dashboard/updateuser/changeavatar',uploads.single('profileImg'), updateAvatar)
router.put('/dashboard/updateuser/changeemail', updateEmail)
router.put('/dashboard/updateuser/changepassword', updatePassword)

router.get('/dashboard', getUser)

router.delete("/dashboard/updateuser/deleteUser", deleteUser);



//Export module
module.exports = router
