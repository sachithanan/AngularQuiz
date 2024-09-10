import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TopicserviceService {
  topicId: number=0;

  constructor(private http:HttpClient) { }
  private readonly apiLink='http://localhost:5182/api/Topic/';

  async GetTopic(topicName:string){
    try{
      const response=await fetch(this.apiLink+'ByTopicName/'+topicName);
      console.log(response);
      
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
//-------------------------------------------------------------------------------------
setDeleteTopicId(Id:number){
  this.topicId=Id;
}
//------------------------------------------------------------------------------------------
getTopicDeleteId(){
  return this.topicId;
}
  //----------------------------------------------------------------------------------//
  async registerTopic(value:any){
    const response=await this.http.post<any>(this.apiLink,value);
   console.log(response)
   this.GetTopicList();
   return response;
   }
   //----------------------------------------------------------------------------------//
   async GetTopicList(){
    const response = await fetch(this.apiLink);
    return response.json();
  }
  //----------------------------------------------------------------------------------------//
  GetAllTopic(page: number) {
    return this.http.get(this.apiLink+'?page='+page);
  }
  //------------------------------------------------------------------------------------------//
  deleteTopic(){
    this.topicId=this.getTopicDeleteId();
    this.http.delete(this.apiLink+this.topicId).subscribe({
      next: (response) => {
        this.GetTopicList();
        return response;
        
      },
      error: () => {
        console.log("Error occured wile deleting user detail");
      }
    });
  }
  setEditTopicId(Id:number){
    this.topicId=Id;
  }
  getEditTopicId(){
    return this.topicId;
  }
  update(topicDetail:any) {
    topicDetail.id=this.getEditTopicId();
     console.log(topicDetail)
     this.http.put(this.apiLink + "ByTopicId/" + topicDetail.id, topicDetail).subscribe({
       next: (response) => {
         this.GetTopicList();
         return response;
       },
       error: () => {
         alert("Error occured wile updating topic details");
       }
     });
   
   }
   async GetTopicDetail(topicId:number){
    try{
      const response=await fetch(this.apiLink+'BytopicId/'+topicId);
      if(response.ok){
        const topicData=await response.json();
        return topicData;
      }
      else{
        return null;
      }
    }
    catch(error){
      return null;
    }
  }
}
