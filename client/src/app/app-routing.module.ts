import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { SignupComponent } from './views/signup/signup.component';
import { MyAcademyPageComponent } from './views/my-academy-page/my-academy-page.component';
import { PaymentComponent } from './views/payment/payment.component';
import { CourseStreamingComponent } from './views/course-streaming/course-streaming.component';
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './views/reset-password/reset-password.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { AcademyComponent } from './views/academy/academy.component';
import { AcademiesComponent } from './views/academies/academies.component';
import { AuthGuard } from './_guards/auth.guard';
import { StreamGuard } from './_guards/stream.guard';
import { AdminLoginComponent } from './views/admin-login/admin-login.component';
import { AdminPanelComponent } from './views/admin-panel/admin-panel.component';
import { EnrollmentsComponent } from './views/enrollments/enrollments.component';
import { AboutUsComponent } from './views/about-us/about-us.component';
import { PolicyComponent } from './views/policy/policy.component';
import { ContactComponent } from './views/contact/contact.component';
import { RefundPolicyComponent } from './views/refund-policy/refund-policy.component';


const routes: Routes = [
  { path: '', redirectTo: '/Login', pathMatch: 'full' },
  { path: 'Academies/:academyId', component: AcademyComponent, canActivate:[AuthGuard]},
  { path: 'Academies', component: AcademiesComponent, canActivate:[AuthGuard]},
  { path: 'Enrollments/:academyId', component: EnrollmentsComponent, canActivate:[AuthGuard]},
  { path: 'Admin Panel', component: AdminPanelComponent, canActivate:[AuthGuard]},
  { path: 'Login', component:  LoginComponent},
  // { path: 'Signup', component:  SignupComponent},
  { path: 'MyAcademy', component:  MyAcademyPageComponent, canActivate:[AuthGuard]},
  { path: 'Payment/:academyId', component:  PaymentComponent, canActivate:[AuthGuard]},
  { path: 'Course/:courseId', component:  CourseStreamingComponent, canActivate:[AuthGuard, StreamGuard]},
  { path: 'Admin Login', component:  AdminLoginComponent},
  { path: 'About Us', component:  AboutUsComponent},
  { path: 'Privacy Policy', component:  PolicyComponent},
  { path: 'Contact', component:  ContactComponent},
  { path: 'Refund Policy', component:  RefundPolicyComponent},
  // { path: 'ForgotPassword', component:  ForgotPasswordComponent},
  // { path: 'ResetPassword', component:  ResetPasswordComponent},
  { path: '**', component:  NotFoundComponent},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
