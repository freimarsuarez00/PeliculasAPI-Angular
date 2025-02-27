import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ListadoPeliculasComponent } from "../listado-peliculas/listado-peliculas.component";
import { FiltroPelicula } from './filtroPelicula';

import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filtro-peliculas',
  imports: [MatButtonModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatSelectModule, MatCheckboxModule, ListadoPeliculasComponent],
  templateUrl: './filtro-peliculas.component.html',
  styleUrl: './filtro-peliculas.component.css'
})
export class FiltroPeliculasComponent implements OnInit {

  ngOnInit(): void {
    this.leerValoresURL();
    this.buscarPeliculas(this.form.value as FiltroPelicula);
    this.form.valueChanges.subscribe(valores => {
      this.peliculas = this.peliculasOriginal;
      this.buscarPeliculas(valores as FiltroPelicula);
      this.escribirParametosBusquedaEnURL(valores as FiltroPelicula);
    });
  }


  buscarPeliculas(valores: FiltroPelicula){
    if(valores.titulo){
      this.peliculas = this.peliculas.filter(pelicula => pelicula.titulo.indexOf(valores.titulo) !== -1);
    }

    if(valores.generoId !== 0){
      this.peliculas = this.peliculas.filter(pelicula => pelicula.generos.indexOf(valores.generoId) !== -1);
    }

    if(valores.proximosEstrenos){
      this.peliculas = this.peliculas.filter(pelicula => pelicula.proximosEstrenos);
    }

    if(valores.enCines){
      this.peliculas = this.peliculas.filter(pelicula => pelicula.enCines);
    }
  }

  escribirParametosBusquedaEnURL(valores: FiltroPelicula){
    let queryStrings =[];

    if(valores.titulo){
      queryStrings.push(`titulo=${encodeURIComponent(valores.titulo)}`);
    }
    if(valores.generoId !== 0){
      queryStrings.push(`generoId=${valores.generoId}`);
    }
    if(valores.proximosEstrenos){
      queryStrings.push(`proximosEstrenos=${valores.proximosEstrenos}`);
    }
    if(valores.enCines){
      queryStrings.push(`enCines=${valores.enCines}`);
    }

    this.location.replaceState('peliculas/filtrar', queryStrings.join('&'));
  }

  leerValoresURL(){
    this.activateRoute.queryParams.subscribe((params:any) =>{
      var objeto: any ={};

      if(params.titulo){
        objeto.titulo = params.titulo;
      }
      if(params.generoId){
        objeto.generoId = params.generoId;
      }
      if(params.proximosEstrenos){
        objeto.proximosEstrenos = params.proximosEstrenos;
      }
      if(params.enCines){
        objeto.enCines = params.enCines;
      }

      this.form.patchValue(objeto);
      

    })
  }

  limpiar(){
    this.form.patchValue({titulo: '', generoId: 0, proximosEstrenos: false, enCines: false});
  }

  private formBuilder = inject(FormBuilder);
  private location = inject(Location);
  private activateRoute = inject(ActivatedRoute);

  form= this.formBuilder.group({
    titulo: '',
    generoId: 0,
    proximosEstrenos: false,
    enCines: false
  })

  generos = [
    {id: 1, nombre: 'Drama'},
    {id: 2, nombre: 'Acción'},
    {id: 3, nombre: 'Comedia'}
  ]

  peliculasOriginal = [
    {
      titulo: 'Spider-Man',
      fechaLanzamiento: new Date(),
      precio: 1400.99,
      poster:
        'https://upload.wikimedia.org/wikipedia/en/2/21/Web_of_Spider-Man_Vol_1_129-1.png',
        generos: [1, 2, 3],
        enCines: false,
        proximosEstrenos: true
    },
    {
      titulo: 'Avengers: Endgame',
      fechaLanzamiento: new Date(),
      precio: 300.99,
      poster:
        'https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg',
        generos: [3],
        enCines: true,
        proximosEstrenos: false
    },
    {
      titulo: 'Deadpool & Wolverine',
      fechaLanzamiento: new Date(),
      precio: 500.99,
      poster:
        'https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Deadpool_%26_Wolverine_poster.jpg/220px-Deadpool_%26_Wolverine_poster.jpg',
        generos: [1],
        enCines: false,
        proximosEstrenos: false
    },
    {
      titulo: 'Fast and furious',
      fechaLanzamiento: new Date(),
      precio: 400.99,
      poster:
        'https://upload.wikimedia.org/wikipedia/en/thumb/b/b8/Furious_7_poster.jpg/220px-Furious_7_poster.jpg',
        generos: [],
        enCines: true,
        proximosEstrenos: false
    },
    {
      titulo: 'The Dark Knight',
      fechaLanzamiento: new Date(),
      precio: 700.99,
      poster:
        'https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29.jpg',
        generos: [1, 3],
        enCines: false,
        proximosEstrenos: true
    },
    {
      titulo: 'Transformers',
      fechaLanzamiento: new Date(),
      precio: 800.99,
      poster:
        'https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Transformers_One_Official_Poster.jpg/220px-Transformers_One_Official_Poster.jpg',
        generos: [2, 3],
        enCines: false,
        proximosEstrenos: false
    },
  ];

  peliculas = this.peliculasOriginal;





}
