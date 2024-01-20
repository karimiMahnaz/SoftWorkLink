import http from ".";
import axios from 'axios';

export const saveTicket = async (email, attachedImage, projectId, ticket) => {
    console.log('http.url***',http.url)
    console.log('email***',email? email.replace(/"/g, ''): null)
    console.log('attachedImage000000', attachedImage)
    let media = "";
    try {
       
        const key = "myFile";
        const formData = new FormData();
      
        attachedImage?    media = {
            uri: attachedImage.uri,
            type: attachedImage.type,
            name: attachedImage.fileName,
            originalname: attachedImage.fileName,
        }: null;

        attachedImage?   attachedImage=attachedImage.fileName: attachedImage=null;
         
          //  name:attachedImage0.path.substring(attachedImage0.path.lastIndexOf('/') + 1, attachedImage0.path.length),
         
      if (attachedImage){
        formData.append(`${key}`, media);

           await  axios({
                method: "post",
                url:   `${http.url}/api/file`,
                data: formData,
                'headers': {
                       'content-type': 'multipart/form-data',
                       'category':  email.replace('"', '').trim().replace('"', '').trim() +'_ticket'
                }
            })
           
        
            console.log('imageName', attachedImage)
            console.log('http.url', `${http.url}/api/ticket/saveTicket`)
        }
            axios({
                method: "post",
                url:`${http.url}/api/ticket/saveTicket`,
                data: { email:email.replace(/"/g, ''), attachedImage , projectId, ticket}, 
            })
                .then( response => { console.log("Ticket update done."); return 200;})
                .catch(error =>{ console.log("Ticket update failed.", error); return 404;})

        

        //     const { status } =  http.post(
        //        `${http.url}/api/user/updateProfile`,
        //           {email, imageName: attachedImage.fileName}
        //      )
           console.log('status 200')
           return 200;
        }     
        
     catch (err) {
        console.log(err);
        return err;
    }
};

export const getProjects = async (email) => {
    try {

    
        const res = await http.get(
            `${http.url}/api/task/getProjects`,
            { params: {email}}
        );
   //     console.log('status', res.status);
   //     console.log('resdata0000', res);
        if (res.status === 200) {
            return  res.data;
        }
        return res.status;
    } catch (err) {
        console.log(err);
    }
};