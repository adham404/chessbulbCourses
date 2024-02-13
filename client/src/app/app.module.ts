import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { AppBarComponent } from './components/app-bar/app-bar.component';
import { AcademyCardComponent } from './components/academy-card/academy-card.component';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { MyCourseCardComponent } from './components/my-course-card/my-course-card.component';
import { AuthService } from './_services/auth.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environments';
import { AdminLoginComponent } from './views/admin-login/admin-login.component';
import { AdminPanelComponent } from './views/admin-panel/admin-panel.component';
import { AdminAcademyCardComponent } from './components/admin-academy-card/admin-academy-card.component';
import { EnrollmentsComponent } from './views/enrollments/enrollments.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutUsComponent } from './views/about-us/about-us.component';
import { PolicyComponent } from './views/policy/policy.component';
import { ContactComponent } from './views/contact/contact.component';
import { RefundPolicyComponent } from './views/refund-policy/refund-policy.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    MyAcademyPageComponent,
    PaymentComponent,
    CourseStreamingComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    NotFoundComponent,
    AcademyComponent,
    AcademiesComponent,
    AppBarComponent,
    AcademyCardComponent,
    CourseCardComponent,
    MyCourseCardComponent,
    AdminLoginComponent,
    AdminPanelComponent,
    AdminAcademyCardComponent,
    EnrollmentsComponent,
    FooterComponent,
    AboutUsComponent,
    PolicyComponent,
    ContactComponent,
    RefundPolicyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
