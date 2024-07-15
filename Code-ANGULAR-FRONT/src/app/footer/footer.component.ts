import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  name = '';
  object = '';
  privateForm: FormGroup;
  companyForm: FormGroup;
  private: boolean = true;
  company: boolean = false;

  constructor(private http: HttpClient, private snackbar: MatSnackBar, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.privateForm = this.fb.group({
      email: ['', Validators.required],
      content: ['', Validators.required],
      phone: ['', Validators.required]
    })

    this.companyForm = this.fb.group({
      email: ['', Validators.required],
      content: ['', Validators.required],
      name: ['', Validators.required],
      siret: ['', Validators.required],
      phone: ['', Validators.required]
    })

  }

  sendContact(form: string): void {
    let obj = {}
    if (form === "private") {
      if (this.privateForm.invalid) return;
      obj = {
        "email": this.privateForm.controls.email.value,
        "content": this.privateForm.controls.content.value,
        "details": {
          "@class": "com.laba4s.Private",
          "phone": this.privateForm.controls.phone.value
        }
      }
      this.privateForm.reset();
    } else if (form === "company") {
      obj = {
        "email": this.companyForm.controls.email.value,
        "content": this.companyForm.controls.content.value,
        "details": {
          "@class": "com.laba4s.Company",
          "siret": this.companyForm.controls.siret.value,
          "name": this.companyForm.controls.name.value,
          "phone": this.companyForm.controls.phone.value
        }
      }
      this.companyForm.reset();
    }
    this.http.post(`${environment.endpoint}/contact`, obj).subscribe(
      (reponse) => {
        this.snackbar.open(`Your request is submited`, 'close', {
          duration: 10 * 1000
        })
      }
    )
  }

  switch(): void {
    this.private = !this.private;
    this.company = !this.company
  }
}
