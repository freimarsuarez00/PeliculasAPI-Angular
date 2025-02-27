import { Component, Input, numberAttribute } from '@angular/core';
import { PeliculaCreacionDTO, PeliculaDTO } from '../peliculas';
import { FormularioPeliculasComponent } from "../formulario-peliculas/formulario-peliculas.component";
import { SelectorMultipleDTO } from '../../compartidos/componentes/selector-multiple/SelectorMultipleModelo';
import { actorAutoCompleteDTO } from '../../actores/actores';

@Component({
  selector: 'app-editar-pelicula',
  imports: [FormularioPeliculasComponent],
  templateUrl: './editar-pelicula.component.html',
  styleUrl: './editar-pelicula.component.css'
})
export class EditarPeliculaComponent {
  @Input({transform: numberAttribute})
  id!: number;

  pelicula: PeliculaDTO ={ id: 1, titulo: 'Spider-Man', trailer: 'ABC', fechaLanzamiento: new Date('2018-07-25'), poster: 'https://upload.wikimedia.org/wikipedia/en/2/21/Web_of_Spider-Man_Vol_1_129-1.png'}


    generosSeleccionados: SelectorMultipleDTO[] = [
      { llave: 2, valor: 'Acción' }

    ];
    generosNoSeleccionados: SelectorMultipleDTO[] = [
      { llave: 1, valor: 'Drama' },
      { llave: 3, valor: 'Comedia' }
    ];

    cinesSeleccionados: SelectorMultipleDTO[] = [
      { llave: 2, valor: 'Blue Mall' }
    ];

    cinesNoSeleccionados: SelectorMultipleDTO[] = [
      { llave: 1, valor: 'Agora Mall' },
      { llave: 3, valor: 'Acropolis' }
    ];

    actoresSeleccionados: actorAutoCompleteDTO[] = [
    {id:1, nombre:'Tom Holland', personaje: 'Spider-Man', foto:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Tom_Holland_by_Gage_Skidmore.jpg/220px-Tom_Holland_by_Gage_Skidmore.jpg'},
    ]
    
  guardarCambios(pelicula: PeliculaCreacionDTO){
    console.log('Editando pelicula', pelicula);
  }
}
 