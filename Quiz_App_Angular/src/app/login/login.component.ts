import { HttpClient } from '@angular/common/http';
import { Component, NgModule } from '@angular/core';
import { Router,RouterLink, RouterModule} from '@angular/router';
import { UserServiceService } from '../user-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdmindashboardComponent } from '../admindashboard/admindashboard.component';
import { UserdashboardComponent } from '../userdashboard/userdashboard.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,AdmindashboardComponent,UserdashboardComponent,FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user = {
    userName: '',
    password: '',
  };
userId=0;
constructor(private http: HttpClient, private router: Router, 
  private userService: UserServiceService,private SnakeBar:MatSnackBar) {}

  async submit(form: any) {
    try {
      const loginObj = await this.userService.GetUserRole(this.user.userName, this.user.password);
      sessionStorage.setItem('userName', JSON.stringify(this.user.userName));
      sessionStorage.setItem('userId', JSON.stringify(loginObj.userId));
      if (loginObj.roleId) {
        sessionStorage.setItem('user', JSON.stringify(loginObj.roleId));

        if (loginObj.roleId=== 1) {
          this.router.navigate(['/admindashboard']);
        } 
        else if(loginObj.roleId===2){
          this.router.navigate(['/userdashboard']);
        }
        else{
          this.openSnackBar("Error Occured on Login","Close",5000);
        }
      } 
      else 
      {
      
        this.openSnackBar("Enter Your Correct Details",'Close',5000)
      }
    } 
    catch{
      this.openSnackBar("Enter Your Correct Details",'Close',5000);
     
    }
  }
  openSnackBar(message: string, action: string, duration: number) {
    this.SnakeBar.open(message, action, {
      
      duration: duration,
      verticalPosition: 'top'
    });
  }
}
