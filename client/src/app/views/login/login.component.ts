import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if(this.authService.isAuthenticated()){
      this.router.navigate(['/Academies']);
    }
  }

  signInWithFB():void{
    this.authService.FacebookAuth();
  }

}
