import { Component, createComponent, OnInit } from '@angular/core';
import { UserServiceService } from '../../user-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgClass, NgStyle } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { EditComponent } from "../edit/edit.component";
import { MatDialog } from '@angular/material/dialog'; 
import { DeleteComponent } from '../delete/delete.component';
import { CreateComponent } from '../create/create.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NavbarComponent } from '../../navbar/navbar.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';
@Component({
    selector: 'app-user',
    standalone: true,
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css'],
    imports: [FormsModule, CommonModule, RouterModule, RouterLink, NgClass, 
      NgStyle, ReactiveFormsModule, EditComponent,NgxPaginationModule,NavbarComponent,SidebarComponent]
})
export class UserComponent implements OnInit {
  users: any[] = [];
  allUsersCount: number=0;
  paginationnumber:number=1;
  constructor(private service: UserServiceService,private dialog: MatDialog) {}

  async ngOnInit() {
    try {
     await this.allUsers();
      this.users = await this.service.GetUserlist();
     // console.log(this.users);
    } catch (error) {
      console.error('error fetching user:', error);
    }
  }
  async allUsers(){
      this.service.GetAllUsers(this.paginationnumber).subscribe((respon:any)=>{
        this.users=respon;
        this.allUsersCount=respon.length;
      });
  }
  createNew() {
    console.log('Creating new user');
    this.dialog.open(CreateComponent);
  }
  openModal(Id :number) {
    console.log(Id);
    this.service.setUserId(Id);
    this.dialog.open(EditComponent);
  }
  closeModel(Id:number){
    console.log("delete button clicked")
    this.service.setDeleteUserId(Id);
    this.dialog.open(DeleteComponent)
  }
  renderPage(event:number){
    this.paginationnumber=event;
    this.allUsers();
  }
  close(){
    this.dialog.closeAll();
  }
}
  

