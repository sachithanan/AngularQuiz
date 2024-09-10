import { Component, Input, OnInit } from '@angular/core';
import { UserComponent } from '../user/user.component';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgClass } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { UserServiceService } from '../../user-service.service';
import { MatDialog,MatDialogModule } from '@angular/material/dialog'; 

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [UserComponent,FormsModule,CommonModule,MatCardModule,MatButtonModule,
    MatMenuModule,MatToolbarModule,MatIconModule,NgClass,RouterLink,ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})

export class EditComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserServiceService,private dialog: MatDialog
  ) {}
  roles: any[] = [];
  
  userId:number=this.userService.getUserId();
  userDetail = {
    userName: '',
    password: 'sample',
    roleId:0,
    id:0,
    role:{
      roleId:0,
      roleName:''
    }
  };
  isModalOpen = true;
  @Input() user: any;
 
  async ngOnInit() {
    try {
      this.roles = await this.userService.GetRoles();
      console.log(this.roles);
    } catch (error) {
      console.log("Error fetching roles:", error);
    }

    await this.userService.GetUserDetail(this.Id).then((userdetail) => {
      this.userDetail = userdetail;
    }).catch((error) => {
      console.log("Fetching error in userDetail");
    });
  }

  userName: string = "";
  roleId: number = 0;
  
  Id:number=this.userService.getUserId();
  clickTOCancel() {
    this.isModalOpen = false;
    this.router.navigate(['/user']);
  }

  async saveChanges()
  {

    if(this.Id!=null)
    {
      const res=await this.userService.update(this.userDetail)
      location.reload();
      
    }
    this.clickTOCancel();
  }
  cancel(){
    this.dialog.closeAll();
  }
}