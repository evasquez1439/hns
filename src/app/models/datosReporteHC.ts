export interface datosReporteHC{

    numeroHis : number,
    episodios : number[]
    numeroCitasAyudasDx: number[]
    campoHC: boolean
    campoAyudasDx: boolean

}

export interface reportServicesResponse{

    pdfFile : Blob;

}