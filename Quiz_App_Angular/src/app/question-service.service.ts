import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { Question, Option, UserAnswer } from './test-page/test-page.component';
@Injectable({
  providedIn: 'root'
})
export class QuestionServiceService {

  private apiUrl = 'http://localhost:5182/api/Question/';
  private httpLink = 'http://localhost:5182/api/Answer/';
  private answerLink='http://localhost:5182/api/Answer/ByQuestionId/';
  private scoreLink='http://localhost:5182/api/Score';
  private baseUrl='http://localhost:5182/api/UserAnswer/';
  constructor(private http: HttpClient ) {}
  TopicId:number=0;
  UserId:number=0;
   async postQuestion(question: any){
    const response=await this.http.post<any>(this.apiUrl,question)
   console.log(response)
   return response;
   }

  postAnswers(answers: any[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/answers`, answers);
  }

  addQuestion(question: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, question);
  }

  addOptions(options: any[]): Observable<any> {
    return this.http.post<any>(this.httpLink, options);
  }

  addOption(option: any): Observable<any> {
    return this.http.post<any>(this.httpLink, option);
  }
  getQuestionsByTopic(topicId: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+"BytopicId/"+topicId);
  }
  getQuestionsByQuestionId(questionId: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+"ByQuestionId/"+questionId);
  }
  getOptionsByQuestionId(questionId: number): Observable<Option[]> {
    return this.http.get<Option[]>(this.answerLink+questionId);
  }
  
  async updateQuestion(selectedQuestion: any){
   await this.http.put(this.apiUrl + selectedQuestion.id, selectedQuestion).subscribe({next: (response) => {
      return response;
    },
    error: () => {
      console.log("Error occured wile updating user detail");
    }
  });

}
deleteQuestion(questionId:number){
  this.http.delete(this.apiUrl+questionId).subscribe({next: (response) => {
    return response;
  },
  error: () => {
    console.log("Error occured wile updating user detail");
  }
});
}
deleteOption(optionId:number){
  this.http.delete(this.httpLink+optionId).subscribe({next: (response) => {
    return response;
  },
  error: () => {
    console.log("Error occured wile updating user detail");
  }
});
}
updateOptions(options: any[]): Observable<any> {
  return this.http.post<any>(this.httpLink, options);
}

async updateOption(option: any) {
    await this.http.put<any>(this.httpLink+option.id,option).subscribe({next: (response) => {
    return response;
  },
  error: () => {
    console.log("Error occured wile updating user detail");
  }
});
}
setTopicId(Id:number){
  this.TopicId=Id;
}
 setUserId(){
  const currentUser= sessionStorage.getItem('userId');
  if(currentUser)
  {
    const userDetails=JSON.parse(currentUser);
    this.UserId=userDetails;
  };
}

getUserId(){
  return this.UserId;
}
getTopicId(){
return this.TopicId;
}

 async postScore(value:any){
  value.topicId=this.getTopicId();
  value.userId=this.getUserId();
  const response= await this.http.post<any>(this.scoreLink,value).subscribe({
    next(response){
      return response;
    }
  })
 console.log(response)
 return response;
 }

 postUserAnswer(userAnswer: UserAnswer): Observable<any> {
  return this.http.post<any>(this.baseUrl,userAnswer);
}
}
