import { UsuarioPermiso } from '../interfaces/AuthInterface';
import { ROUTES } from '../data/routes';

type permisosOpcion = {
  name: string,
  url: string,
  id: number,
  icon: string,
  permissions: {
    title: string,
  }[]
}
export const usePermissions = (permissions: UsuarioPermiso[]) => {
  let opciones: permisosOpcion[] = [];
  let allowedRoutes: string[] = [];
  
  Object.entries(ROUTES).forEach((entry) => {
    allowedRoutes.push(entry[1]);
  })

  permissions.forEach((permiso) => {
    if(permiso.nombre === 'Aplicación Móvil'){
      permiso.opciones.forEach((opcion) => {
        if(allowedRoutes.includes(opcion.url)){
          let permisosOpcion : permisosOpcion = {
            name: '',
            url: '',
            id: 0,
            icon: '',
            permissions: []
          };
          permisosOpcion.name = opcion.nombre;
          permisosOpcion.url = opcion.url;
          permisosOpcion.icon = opcion.icono_menu??'';
          permisosOpcion.id = opcion.id;
          opcion.permisos.forEach((opcPermisos) => {
            if(opcPermisos.permitido){
              permisosOpcion.permissions.push({title: opcPermisos.titulo})
            }
          })
          opciones.push(permisosOpcion);
        }
      })
    }
  })
  return {opciones};
}