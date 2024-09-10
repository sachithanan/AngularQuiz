import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgClass, NgStyle } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { EditComponent } from "../edit/edit.component";
import { MatDialog,MatDialogModule } from '@angular/material/dialog'; 
import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../user-service.service';
@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule,FormsModule,MatDialogModule,NgClass,RouterLink,RouterModule,EditComponent,ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent{
  user = {
    userName: '',
    password: '',
    roleId:2,
    role:null
  };
  
  createUserForm: any;
  router: any;
  constructor(private service: UserServiceService,private dialog: MatDialog,private formBuilder: FormBuilder) {}

  async onSubmit() {
    console.log(this.user.userName);
    try{
      console.log(this.user.password);
      const response=await this.service.GetUser(this.user.userName);
      if(!response){
               (await this.service.register(this.user)).subscribe({
            next :(response)=>{
              this.dialog.closeAll();
            },
            error : (error)=>{
              return alert("already this topic name exist try another name");
            }
      });
      }
      else{
        console.log("userExist");
        return alert("already this User name exist try another name");
      }
    }
    catch(error){
      console.log("error");
    }
 }

}
