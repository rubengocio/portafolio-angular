import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
  export class ProductosService {
  cargando = true;
  public productos: any[] = [];
  productosFiltrado: any[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos(){
    return new Promise((resolve, reject) => {
      this.http.get('https://angular-html-5e5e8.firebaseio.com/productos_idx.json')
      .subscribe( (resp: any[]) => {
        this.productos = resp;
        this.cargando = false;
        resolve();
      });
    });
  }

  getProducto(id: string){
    return this.http.get(`https://angular-html-5e5e8.firebaseio.com/productos/${id}.json`);
  }

  buscarProducto(termino: string){
    if(this.productos.length === 0){
      // cargar productos
      this.cargarProductos().then(()=>{
        // ejecutar despues de tener los productos
        this.filtrarProductos(termino);
      });
    }else{
      // aplicar el filtro
      this.filtrarProductos(termino);
    }
  }

  private filtrarProductos(termino: string){
    termino = termino.toLocaleLowerCase();
    this.productosFiltrado = [];
    this.productos.forEach(prod => {
      if(prod.categoria.toLocaleLowerCase().indexOf(termino) >= 0 || prod.titulo.toLocaleLowerCase().indexOf(termino) >=0){
        this.productosFiltrado.push(prod);
      }
    });
  }
}
