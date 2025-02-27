import { Component, Input, numberAttribute } from '@angular/core';
import { CineCreacionDTO, CineDTO } from '../cines';
import { FormularioCinesComponent } from "../formulario-cines/formulario-cines.component";

@Component({
  selector: 'app-editar-cine',
  imports: [FormularioCinesComponent],
  templateUrl: './editar-cine.component.html',
  styleUrl: './editar-cine.component.css'
})
export class EditarCineComponent {

    @Input({transform: numberAttribute})
    id!: number;

    cine:CineDTO = {id:1, nombre: 'Valledupar', latitud: 10.470659737260432, longitud: -73.23944195362105};

    guardarCambios(cine: CineCreacionDTO){
      console.log('Editar el cine', cine);
    }
}
