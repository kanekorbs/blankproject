import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


//aai = average annual income
//ami = average monthly income
export interface Hotel {
  id?:string;
  id_struttura:string;
  provincia:string;
  nome_comune:string;
  denominazione_struttura:string;
  categoria:string;
  classificazione:string;
  indirizzo:string;
  cap:string;
  frazione:string;
  localita:string;
  email:string;
  tel:string;
  fax:string;
  web:string;
  camere:string;
  suite:string;
  prima_colazione:string;
  in_abitato:string;
  sul_lago:string;
  vicino_eliporto:string;
  vicino_aereoporto:string;
  zona_centrale:string;
  vicino_imp_risalita:string;
  zona_periferica:string;
  zona_stazione_fs:string;
  attrezzature:string;
  attrezzature_carte:string;
  attrezzature_lingue:string;
  attrezzature_sport:string;
  attrezzature_congressi:string;
  letti:string;
  bagni:string;
  geo_y:number;
  geo_x:number;
  location:any;
  valori:string;
}

@Injectable({
  providedIn: 'root'
})
export class HotelserviceService {

  constructor(private firestore:Firestore) { }

  getHotel():Observable<Hotel[]> {
    const docRef = collection(this.firestore,'hoteldata');
    return collectionData(docRef,{idField:'id'}) as Observable<Hotel[]>;
  }
  getHotelById(id):Observable<Hotel> {
    const docRefId = doc(this.firestore,`hoteldata/${id}`);
    return docData(docRefId,{idField:'id'}) as Observable<Hotel>;
  }
}

