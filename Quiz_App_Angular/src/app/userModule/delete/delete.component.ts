import { Component, Inject, Input, OnInit } from '@angular/core';
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
import { MatDialog,MatDialogModule,MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [CommonModule,FormsModule,NgClass,MatCardModule,UserComponent,MatButtonModule,MatMenuModule,
    MatToolbarModule,MatIconModule,MatDialogModule],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})

export class DeleteComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserServiceService,private dialog: MatDialog ,
    public dialogRef: MatDialogRef<DeleteComponent>,
  ){}
Uname:string='';
onCancelClick(): void {
  this.dialogRef.close(false);
}
onDeleteClick(): void {
  this.userService.deleteUser()
   this.dialogRef.close(true);
}

  openDeleteDialog(userName:string): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '300px',
    });



}

}
