import AsyncStorage from "@react-native-async-storage/async-storage";

import http from "./";
import axios from 'axios';

export const avatorUpload = async (email, uploadImage) => {
  
    console.log('http.url***',http.url)
    console.log('email***',email.replace(/"/g, ''))
    console.log('uploadImage000000', uploadImage)
    let media = "";
    try {
        
        const key = "myFile";
        const formData = new FormData();
      
          media = {
            uri: uploadImage.uri,
            type: uploadImage.type,
            name: uploadImage.fileName,
            originalname: uploadImage.fileName,
          }
    
         
          //  name:uploadImage0.path.substring(uploadImage0.path.lastIndexOf('/') + 1, uploadImage0.path.length),
         
      
        formData.append(`${key}`, media);

           await  axios({
                method: "post",
                url:   `${http.url}/api/file`,
                data: formData,
                'headers': {
                       'content-type': 'multipart/form-data',
                       'category':  email.replace('"', '').trim().replace('"', '').trim() +'_profile'
                }
            })
           

            console.log('imageName', uploadImage.fileName)
            console.log('http.url', `${http.url}/api/user/updateProfile`)

            axios({
                method: "post",
                url:`${http.url}/api/user/updateProfile`,
                data: {email:email.replace(/"/g, ''), imageName:uploadImage.fileName} 
            })
                .then( response => { console.log("profile update done.", response); return 200;})
                .catch(error =>{ console.log("profile update failed.", error); return 404;})

         
        //     const { status } =  http.post(
        //        `${http.url}/api/user/updateProfile`,
        //           {email, imageName: uploadImage.fileName}
        //      )
           console.log('status 200')
           return 200;
                
        }
     catch (err) {
        console.log(err);
        return err;
    }
};

export const deleteUser = async (email) => {
    console.log('http.url***',http.url)
    console.log('email***',email)
    try {
        const { status } = await http.post(
            `${http.url}/api/user/deleteUser`,
               {email}
        );
   //     console.log('status', status);
        
        return status;
    } catch (err) {
        console.log(err);
    }
};

export const registerUser = async(user) =>{

    try {
        const { data, status } = await http.post(
            `${http.url}/api/user/signUp`,
            JSON.stringify(user)
        );
   //     console.log('status', status);
    //    console.log('data', data.email);
        if (status === 200) {
     //     await AsyncStorage.setItem("token", JSON.stringify(data.token));
     //     await AsyncStorage.setItem("userId", JSON.stringify(data.userId));
     //       await AsyncStorage.setItem("email", JSON.stringify(user.email.toLowerCase()));
     await AsyncStorage.removeItem('token');
     await AsyncStorage.removeItem('userId');
     await AsyncStorage.removeItem('email');
        }
        return status;
    } catch (err) {
        console.log(err);
    }
}

export const loginUser = async (user) => {
    console.log('http.url***',http.url)
    console.log('user***',user)
    try {
        const { data, status } = await http.post(
            `${http.url}/api/user/login`,
            JSON.stringify(user)
        );
   //     console.log('status', status);
    //    console.log('data', data);
        if (status === 200) {
          await AsyncStorage.setItem("token", JSON.stringify(data.token));
          await AsyncStorage.setItem("userId", JSON.stringify(data.userId));
          await AsyncStorage.setItem("email", JSON.stringify(data.email.toLowerCase()));
         
        }
        return status;
    } catch (err) {
        console.log(err);
    }
};


export const getProfile = async (email) => {
    try {

    
        const res = await http.get(
            `${http.url}/api/user/getProfile`,
            { params: {email}}
        );
        console.log('status', res.status);
        console.log('resdata', res.data);
        if (res.status === 200) {
            return  res;
        }
        return res.status;
    } catch (err) {
        console.log(err);
    }
};

export const getContracts = async (email) => {
    try {

    
        const res = await http.get(
            `${http.url}/api/contract/getContracts`,
            { params: {email}}
        );
   //     console.log('status', res.status);
   //     console.log('resdata', res.data);
        if (res.status === 200) {
            return  res;
        }
        return res.status;
    } catch (err) {
        console.log(err);
    }
};
