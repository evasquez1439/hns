export interface responseLdap{
    code : String,
    description: String,
    fullName: string
}

export interface user{
    user: String,
    password: String,

}


export interface userLongin{

    user: String

}

export interface responseLogin{
    code: string,
    description: string,
    data: string,
    nombreUsuario: string    
}

export interface userTipoPermisos{
    grupoServi: String
}

export interface responseTipoPermisos{

    code:  String,
    description:  String,
    data:  String,
    clasePermiso:  String

}