import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Compravendute {
  id?:string;
  latitude:number;
  longitude:number;
}

@Injectable({
  providedIn: 'root'
})
export class CompravenduteService {

  constructor(private firestore:Firestore) { }

  getStruttureCompravendute(): Observable<Compravendute[]> {
    const refDoc = collection(this.firestore,'hotelCompravenduti');
    return collectionData(refDoc,{idField:'id'}) as Observable<Compravendute[]>;
  }
}
