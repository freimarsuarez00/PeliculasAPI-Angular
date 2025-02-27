import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ActorCreacionDTO, ActorDTO } from './actores';
import { PaginacionDTO } from '../compartidos/modelos/PaginacionDTO';
import { Observable } from 'rxjs';
import { construirQueryParams } from '../compartidos/funciones/construirQueryParams';
import { IServicioCRUD } from '../compartidos/interfaces/IServicioCRUD';

@Injectable({
  providedIn: 'root',
})
export class ActoresService  implements IServicioCRUD<ActorDTO, ActorCreacionDTO> {
  constructor() {}
  private http = inject(HttpClient);
  private urlBase = environment.apiURL + '/Actores';

  public obtenerPaginado(paginacion: PaginacionDTO): Observable<HttpResponse<ActorDTO[]>> {
    let queryParams = construirQueryParams(paginacion);
    return this.http.get<ActorDTO[]>(this.urlBase, {params: queryParams, observe: 'response',});
  }

  public obtenerPorId(id: number): Observable<ActorDTO>{
    return this.http.get<ActorDTO>(`${this.urlBase}/${id}`);
  }

  public actualizar(id: number, actor: ActorCreacionDTO){
    const formdata = this.construirFormData(actor);
    return this.http.put(`${this.urlBase}/${id}`, formdata);
  }

  public crear(actor: ActorCreacionDTO) {
    const formdata = this.construirFormData(actor);
    return this.http.post(this.urlBase, formdata);
  }

  public borrar(id: number){
    return this.http.delete(`${this.urlBase}/${id}`);
  }

  private construirFormData(actor: ActorCreacionDTO): FormData {
    const formdata = new FormData();

    formdata.append('nombre', actor.nombre);
    formdata.append('fechaNacimiento', actor.fechaNacimiento.toISOString().split('T')[0]
    );

    if (actor.foto) {
      formdata.append('foto', actor.foto);
    }
    return formdata;
  }
}
