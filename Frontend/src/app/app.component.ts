import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isLoggedIn: boolean = false;
  private authSubscription: Subscription | undefined;
  private userSubscription: Subscription | undefined;
  protected username: string = '';

  constructor(protected authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authSubscription = this.authService.isLoggedIn.subscribe((status) => {
      this.isLoggedIn = status;
    });
    this.userSubscription = this.authService.currentUser.subscribe((user) => {
      this.username = user.username;
    });
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.authSubscription?.unsubscribe();
    this.userSubscription?.unsubscribe();
  }
}
