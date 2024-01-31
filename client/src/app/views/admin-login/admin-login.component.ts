import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  password: string = '';
  constructor(private authService: AuthService, private router: Router) { }


  ngOnInit() {
    if(this.authService.isAdminAuthenticated()){
      this.router.navigate(['/Admin Panel']);
    }
  }


  signIn():void{
    this.authService.adminLogin(this.password);
  }

}
