import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NGXLogger } from 'ngx-logger';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  feedbackform!: FormGroup;
  feedbackList:any;

  constructor(private formbuilder:FormBuilder,
     private feedback:FeedbackService,
     private logger:NGXLogger){}

  ngOnInit(): void {
    this.feedbackform = this.formbuilder.group({
      name:['', Validators.required],
      comments:['', Validators.required],
      email:['', Validators.required],
      ratings:[null, Validators.required]
    })
  }

  submit(users:any)
  {

    this.feedback.postFeedback(users.value).subscribe({
      next:(result)=>
      {
        this.feedbackList = result;
        alert("Thanks for Submitting the Feedback");
        this.feedbackform.reset();
      },
      error:(errormessage)=>
      {
        this.logger.error(errormessage.message);
      }
    })
  }

}
