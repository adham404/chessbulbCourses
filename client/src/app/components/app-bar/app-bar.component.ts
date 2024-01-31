import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { initFlowbite } from 'flowbite';



@Component({
  selector: 'app-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.css']
})
export class AppBarComponent implements OnInit {
  constructor(private authService: AuthService) { }
  signOut(): void {
    this.authService.logout();
  }

  ngOnInit(): void {
    initFlowbite();
  }

}
