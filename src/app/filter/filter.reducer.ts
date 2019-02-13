
import * as fromFiltro from './filter.actions';

const estadoInicial: fromFiltro.filtrosValidos = 'todos';

export function filtroReducer( state = estadoInicial, action: fromFiltro.acciones): fromFiltro.filtrosValidos {
    switch ( action.type) {

        case fromFiltro.SET_FILTRO:
           return state = action.filtro;
        default:
          return state;

      }

}
