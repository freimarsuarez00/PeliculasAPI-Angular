import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginacionDTO } from '../modelos/PaginacionDTO';

export interface IServicioCRUD<TDTO, TcreacionDTO> {
  obtenerPaginado(paginacion: PaginacionDTO): Observable<HttpResponse<TDTO[]>>;
  obtenerPorId(id: number): Observable<TDTO>;
  actualizar(id: number, entidad: TcreacionDTO): Observable<any>;
  crear(genero: TcreacionDTO): Observable<any>;
  borrar(id: number): Observable<any>;
}
