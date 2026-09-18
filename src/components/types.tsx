// 1. Defines el tipo una sola vez
export type Vista = 'inicio' | 'verdetalles' | 'ctusdatos' | 'cmetododepago' | 'cpagoenrevision' | 'cseleccionmanualtickets' | 'cseleccionmanualconfirmar' | 'cconsultarctickets' | 'cconsultarctresultados' | 'accessadmin' | 'iniciopromocion';

// 2. Defines la estructura de las propiedades (Props) de tus hijos una sola vez
export interface HijoProps {
  cambiarVista: (nuevaVista: Vista) => void;
}