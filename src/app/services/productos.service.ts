import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
  export class ProductosService {
  cargando = true;
  public productos: any[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos(){
    this.http.get('https://angular-html-5e5e8.firebaseio.com/productos_idx.json')
      .subscribe( (resp: any[]) => {
        console.log(resp);
        this.productos = resp;
        this.cargando = false;
      });
  }
}
