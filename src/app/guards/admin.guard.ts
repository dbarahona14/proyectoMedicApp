import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanLoad {

  constructor( private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let usuarioActivo: Usuario = JSON.parse(localStorage.getItem('userData'));
      if( usuarioActivo.rol == 'administrador'){
        return true;
      }
      this.router.navigate(['./vertical/page-404']);
    return false;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let usuarioActivo: Usuario = JSON.parse(localStorage.getItem('userData'));
      if( usuarioActivo.rol == 'administrador'){
        return true;
      }
      this.router.navigate(['./vertical/page-404']);
    return false;
  }
}
