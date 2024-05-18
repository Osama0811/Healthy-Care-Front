import { GeneralResponse } from './../../Shared/GeneralResponse';
import { Observable } from 'rxjs';


export interface CrudOperations<T> {
	Add(t: T): Observable<GeneralResponse<T>>;
	update( t: T): Observable<GeneralResponse<T>>;
	GetById(id: string): Observable<GeneralResponse<T>>;
	GetAll(t: T):   Observable<GeneralResponse<T[]>>;
	delete(id: string): Observable<GeneralResponse<T>>;
}
