import { Injectable } from '@angular/core';
// import { FacebookAuthProvider } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import info from '../../utils/info';


// const AUTH_API = 'http://localhost:3000/api/adminAuth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  userData !: any
  constructor(
     private afAuth: AngularFireAuth , private router: Router ,private userService: UserService, private http: HttpClient// Inject Firebase auth service
  ) {
  }

  // authenticated : boolean = this.afAuth.currentUser !== null

  
  async GoogleAuth() {
    await this.AuthLogin(new GoogleAuthProvider());
    // this.afAuth.user.subscribe((user) => {
    //   if (user) {
    //     this.userData = user;
    //     localStorage.setItem('user', JSON.stringify(this.userData));
    //     JSON.parse(localStorage.getItem('user')!);
    //   } else {
    //     localStorage.setItem('user', 'null');
    //     JSON.parse(localStorage.getItem('user')!);
    //   }

    // });

    function waitForValue(observable: Observable<any>): Promise<any> {
      return new Promise((resolve, reject) => {
        const subscription = observable.subscribe({
          next: (value) => {
            subscription.unsubscribe(); // Unsubscribe to stop listening to the observable
            resolve(value);
          },
          error: (error) => {
            subscription.unsubscribe(); // Unsubscribe in case of an error
            reject(error);
          },
        });
      });
    }
    const user = await waitForValue(this.afAuth.user)
    if (user) {
      this.userData = user;
      localStorage.setItem('user', JSON.stringify(this.userData));
      // JSON.parse(localStorage.getItem('user')!);
      this.userService.addUser(this.userData.uid,this.userData.displayName,this.userData.email,this.userData.photoURL,false).subscribe((data) => {
        console.log(data)
      }
      )
    } else {
      localStorage.setItem('user', 'null');
      // JSON.parse(localStorage.getItem('user')!);
    }

    console.log('You have been successfully logged in!');


    this.router.navigate(['/Academies'])


    
  }

  

  // Sign in with Facebook
  // async FacebookAuth() {
  //   await this.AuthLogin(new FacebookAuthProvider());
  //   // this.afAuth.user.subscribe((user) => {
  //   //   if (user) {
  //   //     this.userData = user;
  //   //     localStorage.setItem('user', JSON.stringify(this.userData));
  //   //     JSON.parse(localStorage.getItem('user')!);
  //   //   } else {
  //   //     localStorage.setItem('user', 'null');
  //   //     JSON.parse(localStorage.getItem('user')!);
  //   //   }

  //   // });

  //   function waitForValue(observable: Observable<any>): Promise<any> {
  //     return new Promise((resolve, reject) => {
  //       const subscription = observable.subscribe({
  //         next: (value) => {
  //           subscription.unsubscribe(); // Unsubscribe to stop listening to the observable
  //           resolve(value);
  //         },
  //         error: (error) => {
  //           subscription.unsubscribe(); // Unsubscribe in case of an error
  //           reject(error);
  //         },
  //       });
  //     });
  //   }
  //   const user = await waitForValue(this.afAuth.user)
  //   if (user) {
  //     this.userData = user;
  //     localStorage.setItem('user', JSON.stringify(this.userData));
  //     // JSON.parse(localStorage.getItem('user')!);
  //     this.userService.addUser(this.userData.uid,this.userData.displayName,this.userData.email,this.userData.photoURL,false).subscribe((data) => {
  //       console.log(data)
  //     }
  //     )
  //   } else {
  //     localStorage.setItem('user', 'null');
  //     // JSON.parse(localStorage.getItem('user')!);
  //   }

  //   console.log('You have been successfully logged in!');


  //   this.router.navigate(['/Academies'])


    
  // }


  adminLogin(password: string): void {
    this.http.post(
      info.BackendUrl + 'adminAuth/adminSignin',
      {
        password
      },
      httpOptions
    ).subscribe({
      next: data => {
        localStorage.setItem('admin', JSON.stringify(data));
        this.router.navigate(['/Admin Panel']);
        //do nothing

      },
      error: err => {
        console.log(err.error.message);
      }
    });
  }

  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    try {
      const result = this.afAuth.signInWithPopup(provider);
      

      return result
    } catch (error) {
      console.log(error);
      return false
    }
  }

  // isAuthenticated(): boolean {
  //   alert(!!this.authenticated)
  //   console.log(this.afAuth.currentUser)
  //   return !!this.authenticated;
  // }

  isAuthenticated(): boolean{
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null
  }


  isAdminAuthenticated(): boolean{
    const user = JSON.parse(localStorage.getItem('admin')!);
    return user !== null
  }

  logout() {
    this.afAuth.signOut()
      .then(() => {
        // Logout successful
        localStorage.removeItem('user');
        this.router.navigate(['/Login'])
      })
      .catch((error) => {
        // An error occurred
        console.log(error)
      });
  }


}