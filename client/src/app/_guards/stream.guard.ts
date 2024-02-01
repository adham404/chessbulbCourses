import { Injectable} from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../_services/shared.service';
import { Subscription } from 'rxjs';
import { EnrollmentService } from '../_services/enrollment.service';
import { AcademyService } from '../_services/academy.service';

@Injectable({
  providedIn: 'root',
})
export class StreamGuard implements CanActivate {

  activationData: any = {};
  // user: any = {};
  // enrollment: any = {};
  // academy: any = {};
  // allowed: boolean = false;

  private subscription!: Subscription;
  constructor( private router: Router,private sharedService: SharedService,private route: ActivatedRoute, private enrollmentService: EnrollmentService, private academyService: AcademyService) {
    this.subscription = this.sharedService.data$.subscribe((data) => {
      this.activationData = data;
      console.log(this.activationData);
    });

    
  }



  



  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log(this.activationData);
    if (this.activationData.approved || this.activationData.ownerId == this.activationData.userId) {
    // if (this.activationData.approved) {
      return true; // User is authenticated, allow access to the route
    }else{
      this.router.navigate(['/Payment',this.activationData.academyId]);
      return false;

    }

}

}

