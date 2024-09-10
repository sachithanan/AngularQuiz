import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdmindashboardComponent } from '../../admindashboard/admindashboard.component';
import { MatDialog } from '@angular/material/dialog';
import { UserServiceService } from '../../user-service.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { TopiccreateComponent } from '../topiccreate/topiccreate.component';
import { MatDialogModule } from '@angular/material/dialog'; 
import{MatTableModule}from '@angular/material/table'
import { TopicserviceService } from '../../topicservice.service';
import { TopicdeleteComponent } from '../topicdelete/topicdelete.component';
import { RouterLink } from '@angular/router';
import { TopicupdateComponent } from '../topicupdate/topicupdate.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-topic',
  standalone: true,
  imports: [FormsModule,CommonModule,AdmindashboardComponent,ReactiveFormsModule,
    MatDialogModule,RouterLink,MatTableModule,MatPaginator,MatPaginatorModule],
  templateUrl: './topic.component.html',
  styleUrl: './topic.component.css'
})
export class TopicComponent implements OnInit {
  topics: any[]=[];
  displayedColumns: string[] = ['topicName', 'options'];
   allTopics: number=0;
   paginationnumber:number=1;
   @ViewChild(MatPaginator) paginator!: MatPaginator;
dataSource=new MatTableDataSource<any>();
  constructor(private service: UserServiceService,private dialog: MatDialog,
    private topicservice:TopicserviceService,
    ) {}

  async ngOnInit(){
    try{
      await this.myTopic();
      this.topics= await this.topicservice.GetTopicList();
      this.dataSource.data=this.topics;
    }
   catch(error){
    console.error('error fetching user:', error);
   }
  }
  createNewTopic() {
    this.dialog.open(TopiccreateComponent);
    
  }

  async myTopic() {
    this.topicservice.GetAllTopic(this.paginationnumber).subscribe((res: any) => {
      this.topics = res;
      this.allTopics = res.length;

    });
  }

  renderPage(event:number){
    this.paginationnumber=event;
    this.myTopic();
  }
  
  openModal(id:number){
    this.topicservice.setEditTopicId(id);
    this.dialog.open(TopicupdateComponent);
  }
  closeModal(id:number){
    this.topicservice.setDeleteTopicId(id);
    this.dialog.open(TopicdeleteComponent);
  }
  ngAfterViewInit(): void {
    this.paginator.pageSize = 5;
    this.dataSource.paginator = this.paginator;
  }
}
