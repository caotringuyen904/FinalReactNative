const User = require("../model/UserModel");
const jwt = require("jsonwebtoken");
const sharp = require('sharp');
const {API_Controller} = require('./googleDriveAPI');
const { Readable } = require('stream');

//create a token
const createUserToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: "1d" });
};


const getUser = async (req, res) => {
  try {
    const _id = req.user;
    const user = await User.findById(_id);
    
    res
      .status(200)
      .json({ email: user.email, name: user.name, avatar: user.avatar.contentLink });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getInfo = async (req, res) =>{
  
  try {
    
    const _id = req.params.id
    const user = await User.findById({_id : _id})
    
    res
      .status(200)
      .json({ email: user.email, name: user.name, avatar: user.avatar });

  } catch (error){
    res.status(400).json({ error: error.message });
  }
}
const updateName = async (req, res) => {
  try {
    const _id = req.user;
    const { name } = req.body;
    user = await User.findByIdAndUpdate(_id, { name: name });
    res.status(200).json({ message: "Update name sucessfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const updateAvatar = async (req, res) => {
  try {
    const _id = req.user;

    const id = JSON.parse(JSON.stringify(_id))._id
    
    const mimeType = req.file.mimetype;
    
    const name = id + '.' + req.file.mimetype.split('/')[1];
  
    
    const {upload, remove, generatePublicUrl} = API_Controller();

    const temp = await User.findById(_id)
    const oldAvatar = temp.avatar.storeId

    console.log(oldAvatar)
    await remove(oldAvatar);
    console.log('Delete old avatar sucessful')

    
    const profileImgBuffer = req.file.buffer;
    
    const {width, height} = await sharp(profileImgBuffer).metadata();
    
    const profileImg = Readable.from(await sharp(profileImgBuffer).resize( width*150/width, height*150/height ).toBuffer());
    
    const storeId = await upload(name, profileImg, mimeType);
    
    const {viewLink , contentLink} = await generatePublicUrl(storeId);
    
    const avatar = {storeId, viewLink, contentLink}
    
    user = await User.findByIdAndUpdate(_id, { avatar: avatar });

    res.status(200).json({ message: "Update avatar sucessfully" });
    console.log("avatar", avatar);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const updateEmail = async (req, res) => {
  try {
    const _id = req.user;
    const { email } = req.body;

    user = await User.updateEmail(_id, email);
    res.status(200).json({ message: `Your new email is ${email}` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const updatePassword = async (req, res) => {
  try {
    const _id = req.user;

    const { oldPassword, newPassword } = req.body;

    user = await User.updatePassword(_id, oldPassword, newPassword);
    res.status(200).json({ message: "Update password sucessfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//login: when user login secessful server response with a token that client can save to localstorage
const loginUser = async (req, res) => {
  //destructure the email and password from http req body
  const { email, password } = req.body;
  try {
    //sign up the user with the signup function adding to schema.stactic in model
    const user = await User.login(email, password);
    //assign user token
    const userToken = createUserToken(user._id);
    //if everythings ok response to client with status 200 and the token
    res.status(200).json({ email, id: user._id, token: userToken });
  } catch (error) {
    //if there 's an error return with response status 400
    res.status(400).json({ error: error.message });
  }
};
//signup: when user signup secessful server response with a token that client can save to localstorage
const signupUser = async (req, res) => {
  //destructure name, email & password from the body of http request
  const { name, email, password } = req.body;

  try {
    //sign up the user with the signup function adding to schema.stactic in model
    const user = await User.signup(name, email, password);
    //assign user token
    const userToken = createUserToken(user._id);
    //if everythings ok response to client with status 200 and the token
    res.status(200).json({ email, id: user._id, token: userToken });
  } catch (error) {
    //if there 's an error return with response status 400
    res.status(400).json({ error: error.message });
  }
};
const deleteUser = async (req, res) => {
  try {
    const _id = req.user;
    const { password } = req.body;
    const user = await User.delete(_id, password);
    res.status(200).json({ message: "Delete sucessfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const verifyToken = async (req, res) =>{
  try {
    res.status(200).json({message: 'Token available!!'})
  } catch (error){
    res.status(401).json({error: 'Token expired'})
  }
}

module.exports = {
  deleteUser,
  loginUser,
  signupUser,
  updatePassword,
  getUser,
  updateEmail,
  updateName,
  updateAvatar,
  getInfo,
  verifyToken
};
