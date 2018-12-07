import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  	 this.loginService.isLogin()
  	 this.loginService.isProfesor()
  	  
  }

  handleClick(){
  	localStorage.removeItem("token")
  	this.loginService.isLogin()
  	this.router.navigate(['/home'])

  }

}
