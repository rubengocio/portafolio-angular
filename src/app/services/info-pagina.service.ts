import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {
  info: any = {};
  cargada = false;
  equipo: any[] = [];

  constructor(private http: HttpClient) {
    // Leer el archivo JSON
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo(){
    this.http.get('assets/data/data-pagina.json')
      .subscribe(resp => {
          this.cargada = true;
          this.info = resp;
      });
  }

  private cargarEquipo(){
    this.http.get('https://angular-html-5e5e8.firebaseio.com/equipo.json')
      .subscribe((resp: any[]) => {
        this.cargada = true;
        this.equipo = resp;
      });
  }
}
