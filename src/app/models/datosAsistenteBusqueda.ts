export interface datosAsistenteBusqueda {
  numeroHistoria: string;
  tipoDocumento:string;
  numeroDocumento: string;
  fechaInicial: string;
  fechaFinal: string;
}




export interface responseTipoEpisodios {
  tipoEpisodio: string;
  fechaInicial: string;
  fechaFinal: string;
  numeroEpisodio: number;
}

export interface responseDatosDemo {
  code: String;
  descripcion: string;
  data: {
    tipoDocumento: string;
    nombresApellidos: string;
    dni: string;
    numeroHistoria: string;
    fnacimiento: string;
  };
}


export interface datosDemo {

  numeroHistoria: string

}

export interface ResponseDatosAyudasDx{

  nombreEstudio: string;
  fechaEstudio: string;
  numeroCita: number;

}