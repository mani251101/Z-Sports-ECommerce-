import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  feedback = environment.feedback;

  constructor(private http:HttpClient) { }

  getFeedBack()
  {
    return this.http.get(this.feedback + '/alluserfeedback');
  }

  postFeedback(feedback:any)
  {
    return this.http.post(this.feedback + '/addfeedback', feedback)
  }
}
