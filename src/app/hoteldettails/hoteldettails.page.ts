import { Component, Input, OnInit } from '@angular/core';
import { HotelserviceService, Hotel } from '../services/hotelservice.service';
import { Papa } from 'ngx-papaparse';

@Component({
  selector: 'app-hoteldettails',
  templateUrl: './hoteldettails.page.html',
  styleUrls: ['./hoteldettails.page.scss'],
})
export class HoteldettailsPage implements OnInit {

  @Input() id:string;
  strutt:Hotel = null;
  arrayCsv = [];
  constructor(private hotelService:HotelserviceService, private papa: Papa) { }

  ngOnInit() {
    this.hotelService.getHotelById(this.id).subscribe(res => {
      console.log(res.id)
      this.strutt = res;
    })
  }

  createCsv() {
    this.arrayCsv.push({'nome comune':this.strutt.nome_comune,'indirizzo':this.strutt.indirizzo,
    'localita':this.strutt.localita,'frazione':this.strutt.frazione,'cap':this.strutt.cap,
    'denominazione struttura':this.strutt.denominazione_struttura,'tel':this.strutt.tel,
    'email':this.strutt.email});
    var csv = this.papa.unparse(this.arrayCsv);
    console.log(csv)

    const blob = new Blob([csv],{type: 'text/csv;charset=utf-8;'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'CSV Export File';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
