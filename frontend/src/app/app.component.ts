import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'client';
  itemsPerPage = [1,2,3,4,5,6,7,8,9,10];
  noOfRecPerPage!: number
  form!: FormGroup;

  constructor(public fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.createForm()
  }

  clearForm() {
    this.form = this.createForm()
  }

  newRecPerPage(){
    console.log("newRecPerPage")
    this.noOfRecPerPage = this.form.value["noOfRecPerPage"];
  }

  private createForm(): FormGroup {
    return this.fb.group({
      noOfRecPerPage: this.fb.control<number>(10, [ Validators.required] ),
    })
  }
}
