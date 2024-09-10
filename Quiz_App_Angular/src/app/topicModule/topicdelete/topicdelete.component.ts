import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { UserServiceService } from '../../user-service.service';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DeleteComponent } from '../../userModule/delete/delete.component';
import { TopicserviceService } from '../../topicservice.service';

@Component({
  selector: 'app-topicdelete',
  standalone: true,
  imports: [CommonModule,FormsModule, MatDialogModule],
  templateUrl: './topicdelete.component.html',
  styleUrl: './topicdelete.component.css'
})
export class TopicdeleteComponent {
constructor(private service:UserServiceService,
  private dialog: MatDialog,
  private formBuilder: FormBuilder,
  public dialogRef: MatDialogRef<DeleteComponent>,
  private topicservice:TopicserviceService,
  ){}

onCancelClick(): void {
  this.dialogRef.close(false);
}
onDeleteClick(): void {
  this.topicservice.deleteTopic()
  window.location.reload();
   this.dialogRef.close(true);
}

}
