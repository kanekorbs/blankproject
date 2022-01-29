import { Component } from '@angular/core';
import { HotelserviceService, Hotel } from '../services/hotelservice.service';
import { Firestore,collection,query, where, getDocs } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  //other in html
  Posizione = false;
  aaihide = false;
  amihide = false;
  findForIncrement = false;
  incrementoCl:boolean;
  city:string;
  aai:string;
  ami:string;
  
  //interface database hotel
  document: Hotel = null;
  hotel=[];
  starin3 = false;
  valori:string;

  //images
  imageIncrement = '../assets/img/icons8-financial-growth-analysis-64.png'

  //tools page
  toolone = true;
  toolsecond = false;
  toolthird = false;
  //tools button color
  colorTool1:string = '#000';
  colorTool2:string = '#000';
  colorTool3:string = '#000';

  constructor(private hotelService:HotelserviceService,private firestore:Firestore) {
    this.colorTool1 = '#6495ED';
  }

  toolOne() {
    this.toolone = true;
    this.toolsecond = false;
    this.toolthird = false;
    this.colorTool1 ='#6495ED';
    this.colorTool2 ='#000';
    this.colorTool3 = '#000';
  }

  toolTwo() {
    this.toolsecond = true;
    this.toolone = false;
    this.toolthird = false;
    this.colorTool2 ='#6495ED';
    this.colorTool1 ='#000';
    this.colorTool3 = '#000';
  }
  toolThird() {
    this.toolthird = true;
    this.toolsecond = false;
    this.toolone = false;
    this.colorTool3 ='#6495ED';
    this.colorTool1 ='#000';
    this.colorTool2 = '#000';
  }

  async searchFor() {
    console.log(this.city,this.aai,this.ami,this.incrementoCl);
    this.hotel.length = 0;
    if(this.city != '' && this.aai == undefined || this.aai == '' && this.ami == undefined || this.ami == '') {
      if(this.incrementoCl != true) {
        this.findForIncrement = false;
        return this.searchforCity();
      }
    }
    else if(this.city != '' && this.aai != '' && this.ami == undefined || this.ami == '') {
      if(this.incrementoCl != true) {
        this.findForIncrement = false;
        return this.searchQuery2();
      }
    }
    else if(this.city != '' && this.ami != '' && this.aai == undefined || this.aai == '') {
      if(this.incrementoCl != true) {
        this.findForIncrement = false;
        return this.searchQuery3();
      }
    }
    else if(this.city != '' && this.ami != '' && this.aai != '') {
      if(this.incrementoCl == true) {
        this.findForIncrement = true;
        return this.queryTotal();
      }
    }
  }

  async searchforCity() {
    
    const refDoc = collection(this.firestore, "hoteldata");
    const q2 = query(refDoc, where("city", "==", this.city.toLowerCase()));

    const querySnapshot = await getDocs(q2);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      this.hotelService.getHotelById(doc.id).subscribe(res => {
        console.log(res);
        this.document = res;
        this.hotel.push(this.document);
      })
    });
  }

  async searchQuery2() {
    
    const refDoc = collection(this.firestore, "hoteldata");
    const q2 = query(refDoc,where("city", "==", this.city.toLowerCase()),where("aai",">=",parseFloat(this.aai)));
    
    const querySnapshot = await getDocs(q2);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      this.hotelService.getHotelById(doc.id).subscribe(res => {
        console.log(res);
        this.document = res;
        this.hotel.push(this.document);
      })
    });
  }

  async searchQuery3() {
  
    const refDoc = collection(this.firestore, "hoteldata");
    const q2 = query(refDoc,where("city", "==", this.city.toLowerCase()),where("ami",">=",parseFloat(this.ami)));
    
    const querySnapshot = await getDocs(q2);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      this.hotelService.getHotelById(doc.id).subscribe(res => {
        console.log(res);
        this.document = res;
        this.hotel.push(this.document);
      })
    });
  }

  async queryTotal() {
  
    const refDoc = collection(this.firestore, "hoteldata");
    const q2 = query(refDoc,where("city", "==", this.city.toLowerCase()),where("ami",">=",parseFloat(this.ami)));

    const querySnapshot = await getDocs(q2);
    
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      this.hotelService.getHotelById(doc.id).subscribe(res => {
        console.log(res);
        var array = res.ncrementCl;
        
        for (var i = 0, sum = 0; i < array.length; sum += array[i++]);
        var first = [...array].shift();
        const sottrae = sum - first ;
        const dividi = sottrae / first;
        const moltiplica = dividi * 100;

        console.log(moltiplica);

        if(res.aai >= parseFloat(this.aai)) {
          this.document = res;
          this.document.valori = String(moltiplica)
          this.hotel.push(this.document);
        }
      })
    });
  }

  posController() {
    if(this.Posizione == false) {
      this.Posizione = true;
    } else {
      this.Posizione = false;
      this.city = '';
    }
  }

  aaiController() {
    if(this.aaihide == false) {
      this.aaihide = true;
    } else {
      this.aaihide = false;
      this.aai = '';
    }
  }

  amiController() {
    if(this.amihide == false) {
      this.amihide = true;
    } else {
      this.amihide = false;
      this.ami = '';
    }
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
}
