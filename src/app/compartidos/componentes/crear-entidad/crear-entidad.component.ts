import { AfterViewInit, Component, ComponentRef, inject, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { IServicioCRUD } from '../../interfaces/IServicioCRUD';
import { SERVICIO_CRUD_TOKEN } from '../../proveedores/proveedores';
import { Router } from '@angular/router';
import { extraerErrores } from '../../funciones/extraerErrores';
import { MostrarErroresComponent } from "../mostrar-errores/mostrar-errores.component";

@Component({
  selector: 'app-crear-entidad',
  imports: [MostrarErroresComponent],
  templateUrl: './crear-entidad.component.html',
  styleUrl: './crear-entidad.component.css',
})
export class CrearEntidadComponent<TDTO, TcreacionDTO> implements AfterViewInit{
  
  ngAfterViewInit(): void {
   this.componentRef = this.contenedorFormulario.createComponent(this.formulario);
   this.componentRef.instance.posteoFormulario.subscribe((entidad: any)=>{
     this.guardarCambios(entidad);
   })
  }
  @Input({ required: true })
  titulo!: string;

  @Input({ required: true })
  rutaIndice!: string;

  @Input({ required: true })
  formulario: any;

  errores: string[] = [];

  servicioCRUD = inject(SERVICIO_CRUD_TOKEN) as IServicioCRUD<TDTO, TcreacionDTO>;
  private router = inject(Router);

  @ViewChild('contenedorFormulario', {read: ViewContainerRef})
  contenedorFormulario!: ViewContainerRef;

  private componentRef!: ComponentRef<any>;

  guardarCambios(entidad: TcreacionDTO) {
    this.servicioCRUD.crear(entidad).subscribe({
      next: () => {
        this.router.navigate([this.rutaIndice]);
      },
      error: err =>{
        const errores = extraerErrores(err);
        this.errores = errores;
      }
    });
  }

}
