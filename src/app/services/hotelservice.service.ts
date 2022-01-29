import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


//aai = average annual income
//ami = average monthly income
export interface Hotel {
  id?:string;
  name:string;
  region:string;
  city:string;
  aai:number;
  ami:number;
  star:[];
  ncrementCl:[];
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

