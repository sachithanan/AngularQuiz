import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TopicserviceService } from '../../topicservice.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topicupdate',
  standalone: true,
  imports: [CommonModule,FormsModule,NgClass],
  templateUrl: './topicupdate.component.html',
  styleUrl: './topicupdate.component.css'
})
export class TopicupdateComponent implements OnInit {
constructor(private topicservice:TopicserviceService,private dialog: MatDialog,private router:Router){}
  async ngOnInit() {
    await this.topicservice.GetTopicDetail(this.topicId).then((topicdetail) => {
      this.topicDetails = topicdetail;
    }).catch((error) => {
      console.log("Fetching error in topicDetail");
    });
  }
topicId:number=this.topicservice.getEditTopicId();
topicDetails = {
  topicName:'',
  topicId:0,
  modifiedBy:0,
  modifiedOn:new Date()
}
async saveChanges()
  {
    if(this.topicId!=null)
    {
      const currentUser= sessionStorage.getItem('user');
        if(currentUser)
        {
          const userDetails=JSON.parse(currentUser);
          this.topicDetails.modifiedBy=userDetails.id;
          this.topicDetails.modifiedOn=new Date();
        }
      const res=await this.topicservice.update(this.topicDetails)
      location.reload();
      this.dialog.closeAll();
    }
    this.clickTOCancel();
  }
  cancel(){
    this.dialog.closeAll();
  }
  clickTOCancel() {
    this.router.navigate(['/topic']);
  }
}
