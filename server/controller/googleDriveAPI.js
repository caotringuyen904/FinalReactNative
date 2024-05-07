
const {google} = require('googleapis');
const { Module } = require('module');
require('dotenv').config()

const API_CLIENT_ID = process.env.API_CLIENT_ID;
const API_CLIENT_SECRET = process.env.API_CLIENT_SECRET;
const AUTH_URI_REDIRECT = process.env.AUTH_URI_REDIRECT;
const API_TOKEN = process.env.API_TOKEN;


const OAuth2Client = new google.auth.OAuth2(API_CLIENT_ID,API_CLIENT_SECRET,AUTH_URI_REDIRECT);
OAuth2Client.setCredentials({refresh_token:API_TOKEN})

const drive = google.drive({
    version: 'v3',
    auth: OAuth2Client
})



const API_Controller = () =>{

    const upload = async(name, data, mimeType) =>{
        try{
            const response = await drive.files.create({
                requestBody:{
                    name: name,
                    mimeType: mimeType
                },
                media:{
                    mimeType: mimeType,
                    body: data
                }
            })
            return response.data.id
            
        }
        catch(err){
            console.log(err.message)
        }
    }
    
    const remove = async (imageID) =>{
        try{
            const response = await drive.files.delete({
                fileId:imageID
            })
            return true;
        }
        catch(err){
            console.log(err.message)
            return false;
        }
    }
    
    const generatePublicUrl = async (imageID) =>{
        try{
            const fileId = imageID;
    
            const response = await drive.permissions.create({
                fileId: fileId,
                requestBody:{
                    role:'reader',
                    type:'anyone'
                }
            })
    
            const url = await drive.files.get({
                fileId: fileId,
                fields:'webViewLink, webContentLink'
            });
            
            const viewLink = url.data.webViewLink;
            const contentLink = url.data.webContentLink;

            return {viewLink, contentLink}
    
        }
        catch(err){
            console.log(err)
        }
    }

    return {upload, remove, generatePublicUrl}
}

module.exports = {API_Controller}


