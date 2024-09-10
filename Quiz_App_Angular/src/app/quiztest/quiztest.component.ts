import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserServiceService } from '../user-service.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { DialogModule } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { Router, Routes } from '@angular/router';

@Component({
  selector: 'app-quiztest',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,NavbarComponent,DialogModule,],
  templateUrl: './quiztest.component.html',
  styleUrl: './quiztest.component.css',
})
export class QuiztestComponent implements OnInit{
  constructor(private https:HttpClient,private service:UserServiceService,private dialog: MatDialog,
    private router:Router, ){}
  topics:any[]=[];
  
  async ngOnInit(){
    try
    {
      this.topics=await this.service.GetTopics();

    }
    catch(error)
    {
      console.error('error fetching topics:',error);
    }
  }
  Score(){
    
  }
  handleTopicClick(topicId:number,topicName:string){
    sessionStorage.setItem('topicName', JSON.stringify(topicName));
    this.router.navigate(['/testpage', topicId]);
  }
  
}
