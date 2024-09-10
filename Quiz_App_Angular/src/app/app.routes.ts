import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { SignupComponent } from './signup/signup.component';
import { QuiztestComponent } from './quiztest/quiztest.component';
import { UserComponent } from './userModule/user/user.component';
import { TopicComponent } from './topicModule/topic/topic.component';
import { EditComponent } from './userModule/edit/edit.component';
import { CreateComponent } from './userModule/create/create.component';
import { TopicupdateComponent } from './topicModule/topicupdate/topicupdate.component';
import { TopicdeleteComponent } from './topicModule/topicdelete/topicdelete.component';
import { QuestionComponent } from './questionModule/questioncreate/question.component';
import { QuestiondashboardComponent } from './questionModule/questiondashboard/questiondashboard.component';
import { QuestionupdateComponent } from './questionModule/questionupdate/questionupdate.component';
import { QuestiondeleteComponent } from './questionModule/questiondelete/questiondelete.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TestPageComponent } from './test-page/test-page.component';
import { ScorePageComponent } from './score-page/score-page.component';
import { QuestionbytopicComponent } from './questionModule/questionbytopic/questionbytopic.component';
import { ViewScoreComponent } from './view-score/view-score.component';


export const routes: Routes = [
    {
        path:'',redirectTo:'login',pathMatch:'prefix'
    },
    {
        path:'login',component:LoginComponent
    },
    {
        path:'admindashboard',component:AdmindashboardComponent, children:[
            {
                path:'user',component:UserComponent
            },
            {
                path:'topic',component:TopicComponent
            },
            {
                path:'question',component:QuestiondashboardComponent
            },
            {
                path:'score',component:ScorePageComponent
            },
            {
                path:'questionupdate',component:QuestionupdateComponent
            },
            {
                path:'questiondelete',component:QuestiondeleteComponent
            },
            {
                path:'quiztest',component:QuiztestComponent
            }
        ]
    },
    {
        path:'userdashboard',component:UserdashboardComponent
    },
    {
        path:'quiztest',component:QuiztestComponent
    },
    {
        path:'signup',component:SignupComponent
    },
    {
        path:'edit',component:EditComponent
    },
    {
        path:'create',component:CreateComponent
    },
    {
        path:'creatextopic',component:TopicComponent
    },
    {
        path:'updatetopic',component:TopicupdateComponent
    },
    {
        path:'deletetopic',component:TopicdeleteComponent
    },
    {
        path:'questiondashboard',component:QuestiondashboardComponent 
    },
    {
        path:'questionupdate',component:QuestionupdateComponent
    },
    {
        path:'questiondelete',component:QuestiondeleteComponent
    },
    {
        path:'navi',component:NavbarComponent
    },
    {
        path:'sidebar',component:SidebarComponent
    },
    {
        path:'testpage',component:TestPageComponent
    },
    { path: 'testpage/:topicId', component: TestPageComponent
    },
    {
        path:'qusetionbytopic',component:QuestionbytopicComponent
    },
    {
        path:'userscore',component:ViewScoreComponent
    },
    {
        path:'score',component:ScorePageComponent
    },

];
