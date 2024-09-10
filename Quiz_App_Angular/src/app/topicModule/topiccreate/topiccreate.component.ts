import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { UserServiceService } from '../../user-service.service';
import { MatDialog } from '@angular/material/dialog';
import { TopicserviceService } from '../../topicservice.service';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-topiccreate',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './topiccreate.component.html',
  styleUrls: ['./topiccreate.component.css'] 
})
export class TopiccreateComponent{
  constructor(private service: UserServiceService,private dialog: MatDialog,
    private formBuilder: FormBuilder,private topicservice:TopicserviceService) {}
  
 
        
  topic={
    topicName:'',
    id:0,
    createdOn:new Date(),
    createdBy:0,
    modifiedBy:0,
    modifiedOn:new Date()

  }
   
  async onSubmit(form: any) {
    if (form.valid) {
      console.log('User entered topic name:', this.topic.topicName);
      try{
        const currentUser= sessionStorage.getItem('userId');
        if(currentUser)
        {
          const userDetails=JSON.parse(currentUser);
          this.topic.createdBy=userDetails.id;
        }
        const response=await this.topicservice.GetTopic(this.topic.topicName);
        if(!response){
          (await this.topicservice.registerTopic(this.topic)).subscribe({
            next :(response)=>{
              window.location.reload();
             this.dialog.closeAll(); 
           },
           error : (error)=>{
             console.log("registeration failed", error);
           }
     });
}
    else 
    {
       alert("already this topic name exist try another name");
    }
  }
  catch(Exeption){

  }
}
  }
}
