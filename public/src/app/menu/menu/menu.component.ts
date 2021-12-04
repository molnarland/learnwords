import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { STORAGE_USER_NAME } from '../../localStorage.const';
import { PATH_LOGIN } from '../../app-paths.const';

@Component({
  selector: 'ons-page[menu]',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onLogoutClick(): void {
    localStorage.removeItem(STORAGE_USER_NAME) 
    this.router.navigate([PATH_LOGIN])
  }
}
