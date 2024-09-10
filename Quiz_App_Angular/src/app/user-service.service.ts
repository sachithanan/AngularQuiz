import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { event } from 'jquery';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  username='';
  constructor(private http:HttpClient){}
private readonly apiLink='http://localhost:5182/api/User';
private readonly api='http://localhost:5182/api/Login';
// ByUserName/
  async GetUser(userName:string){
    try{
      const response=await fetch(this.apiLink+'/ByUserName/'+userName);
      
      
      if(response.ok){
        const userData=await response.json();
        
        console.log(userData);
        return userData;
      }
      else{
        return null;
      }
    }
    catch(error){
      return null;
    }
  }
  async GetUserRole(userName:string,password:string){
    try{
      const response=await fetch(this.api+'/ByUserName/'+userName+'/'+password);
      if(response.ok){
        const userData=await response.json();
        
        console.log(userData);
        return userData;
      }
      else{
        return null;
      }
    }
    catch(error){
      return null;
    }
  }
  async GetUserDetail(userId:number){
    try{
      const response=await fetch(this.apiLink+'/ByUserId/'+userId);
      if(response.ok){
        const userData=await response.json();
        return userData;
      }
      else{
        return null;
      }
    }
    catch(error){
      return null;
    }
  }
  userId :number=0;

 async register(value:any){
   value.roleId=2;
   const response=await this.http.post<any>(this.apiLink,value)
  this.GetUserlist();
  return response;
  }

setUserId(Id:number){
  this.userId=Id;
}
setDeleteUserId(Id:number){
  this.userId=Id;
}

getUserDeleteId(){
  return this.userId;
}
getUserId(){
return this.userId;
}
private readonly apiLinkTopic='http://localhost:5182/api/Topic';
private readonly apiroleLink='http://localhost:5182/api/Role';
async GetTopics(){
  const response=await fetch(this.apiLinkTopic);
  return response.json(); 
}

 async GetUserlist(){
  const response= await fetch(this.apiLink);
  
  return ( response).json();
}

 update(userDetail:any) {
  const url = "http://localhost:5182/api/User/";
  this.http.put(url + "userId/" + userDetail.id, userDetail).subscribe({
    next: (response) => {
      this.GetUserlist();
      return response;
      
    },
    error: () => {
      console.log("Error occured wile updating user detail");
    }
  });

}
deleteUser(){
  this.userId=this.getUserDeleteId();
  this.http.delete(this.apiLink+'/'+this.userId).subscribe({
    next: (response) => {
      this.GetUserlist();
      return response;
      
    },
    error: () => {
      console.log("Error occured wile deleting user detail");
    }
  });
}

GetAllUsers(page:number){
return this.http.get(this.apiLink+'?page='+page)
}
async GetRoles() {
  try {
    const response = await fetch(this.apiroleLink); 
    if (response.ok) {
      const roles = await response.json();
    //  console.log('Roles fetched:', roles); 
      return roles;
    } else {
      console.log('Failed to fetch roles:', response.statusText);
      return [];
    }
  } catch (error) {
    console.log("Error fetching roles:", error);
    return [];
  }
}
}
