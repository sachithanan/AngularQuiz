import { Component, createComponent, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CommonModule, NgComponentOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { QuiztestComponent } from './quiztest/quiztest.component';
import { DataTablesModule } from 'angular-datatables';
import { UserComponent } from './userModule/user/user.component';
import { TopicComponent } from './topicModule/topic/topic.component';
import { EditComponent } from './userModule/edit/edit.component';
import { CreateComponent } from './userModule/create/create.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import { TopiccreateComponent } from './topicModule/topiccreate/topiccreate.component';
import { TopicdeleteComponent } from './topicModule/topicdelete/topicdelete.component';
import { TopicupdateComponent } from './topicModule/topicupdate/topicupdate.component';
import { HttpClientModule } from '@angular/common/http';
import { QuestiondashboardComponent } from './questionModule/questiondashboard/questiondashboard.component';
import { QuestionupdateComponent } from './questionModule/questionupdate/questionupdate.component';
import { QuestiondeleteComponent } from './questionModule/questiondelete/questiondelete.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {MatSidenavModule} from '@angular/material/sidenav';


@Component({
  selector: 'app-root',
  standalone: true,
imports: [RouterOutlet,LoginComponent,CommonModule,MatSidenavModule,FormsModule,
  NgComponentOutlet,AdmindashboardComponent,UserdashboardComponent,
  QuiztestComponent,DataTablesModule,UserComponent,TopicComponent,
  CommonModule,EditComponent,CreateComponent,NgxPaginationModule,
  TopiccreateComponent,TopicdeleteComponent,TopicupdateComponent,
  MatPaginatorModule,HttpClientModule,QuestiondashboardComponent,
  QuestionupdateComponent,QuestiondeleteComponent,NavbarComponent,
  SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
  
})
export class AppComponent {
  title = 'Quiz';
}
export interface Option {
  id: number;
  option: string;
  isCorrect: boolean;
}
