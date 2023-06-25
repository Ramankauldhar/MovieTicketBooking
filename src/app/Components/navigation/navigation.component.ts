import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit{

  ngOnInit(): void {
    
  }
  constructor(private router: Router){}

  isLoggedIn(): boolean {
    const loginToken = localStorage.getItem('token');
    return loginToken !== null;
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}

