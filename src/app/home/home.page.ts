import { Component, OnInit, NgZone } from '@angular/core';
import { HotelserviceService, Hotel } from '../services/hotelservice.service';
import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
} from '@angular/fire/firestore';
import * as $ from 'jquery';
import { Geolocation } from '@capacitor/geolocation';
import { MapsAPILoader } from '@agm/core';

//charts import
import { Chart } from 'chart.js';
//environment
import { environment } from 'src/environments/environment';
import { ModalController } from '@ionic/angular';
import { HoteldettailsPage } from '../hoteldettails/hoteldettails.page';
import { CompravenduteService } from '../services/compravendute.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  
  strutture = [];
  //icon img src
  segnapostImg:string = '../assets/img/icons8-segnaposto-48.png';
  CustomarkerIcon:string = '../assets/img/icons8-location-64.png';

  checkRegionName: string;

  //Regioni coordinate
  trentinoLat: number = 46.734096;
  trentinoLong: number = 11.288801;
  BasilicataLat: number = 40.5;
  BasilicataLong: number = 16.5;
  LombardiaLat: number = 45.585556;
  LombardiaLong: number = 9.930278;
  LombardiaRadius:number = 143064;
  AbruzzoLat: number = 42.354008;
  AbruzzoLong: number = 13.391992;
  CalabriaLat: number = 38.91;
  CalabriaLong: number = 16.5875;
  CampaniaLat: number = 40.833333;
  CampaniaLong: number = 14.25;
  EmiliaLat: number = 44.493889;
  EmiliaLong: number = 11.342778;
  FriuliLat: number = 45.636111;
  FriuliLong: number = 13.804167;
  LazioLat: number = 41.893056;
  LazioLong: number = 12.482778;
  LiguriaLat: number = 44.411156;
  LiguriaLong: number = 8.932661;
  MarcheLat: number = 43.616667;
  MarcheLong: number = 13.516667;
  MoliseLat: number = 41.561;
  MoliseLong: number = 14.6684;
  PiemonteLat: number = 45.066667;
  PiemonteLong: number = 7.7;
  PugliaLat: number = 41.125278;
  PugliaLong: number = 16.866667;
  SardegnaLat: number = 39.216667;
  SardegnaLong: number = 9.116667;
  SiciliaLat: number = 38.115556;
  SiciliaLong: number = 13.361389;
  ToscanaLat: number = 43.771389;
  ToscanaLong: number = 11.254167;
  UmbriaLat: number = 43.1121;
  UmbriaLong: number = 12.3888;
  ValledaostaLat: number = 45.737222;
  ValledaostaLong: number = 7.320556;
  VenetoLat: number = 45.439722;
  VenetoLong: number = 12.331944;

  //regioni array
  allRegion = [
    {
      id: '13',
      nome: 'Abruzzo',
      latitudine: 42.354008,
      longitudine: 13.391992,
    },
    {
      id: '17',
      nome: 'Basilicata',
      latitudine: 40.633333,
      longitudine: 15.8,
    },
    {
      id: '18',
      nome: 'Calabria',
      latitudine: 38.91,
      longitudine: 16.5875,
    },
    {
      id: '15',
      nome: 'Campania',
      latitudine: 40.833333,
      longitudine: 14.25,
    },
    {
      id: '8',
      nome: 'Emilia-Romagna',
      latitudine: 44.493889,
      longitudine: 11.342778,
    },
    {
      id: '6',
      nome: 'Friuli-Venezia Giulia',
      latitudine: 45.636111,
      longitudine: 13.804167,
    },
    {
      id: '12',
      nome: 'Lazio',
      latitudine: 41.893056,
      longitudine: 12.482778,
    },
    {
      id: '7',
      nome: 'Liguria',
      latitudine: 44.411156,
      longitudine: 8.932661,
    },
    {
      id: '3',
      nome: 'Lombardia',
      latitudine: 45.464161,
      longitudine: 9.190336,
    },
    {
      id: '11',
      nome: 'Marche',
      latitudine: 43.616667,
      longitudine: 13.516667,
    },
    {
      id: '14',
      nome: 'Molise',
      latitudine: 41.561,
      longitudine: 14.6684,
    },
    {
      id: '1',
      nome: 'Piemonte',
      latitudine: 45.066667,
      longitudine: 7.7,
    },
    {
      id: '16',
      nome: 'Puglia',
      latitudine: 41.125278,
      longitudine: 16.866667,
    },
    {
      id: '20',
      nome: 'Sardegna',
      latitudine: 39.216667,
      longitudine: 9.116667,
    },
    {
      id: '19',
      nome: 'Sicilia',
      latitudine: 38.115556,
      longitudine: 13.361389,
    },
    {
      id: '9',
      nome: 'Toscana',
      latitudine: 43.771389,
      longitudine: 11.254167,
    },
    {
      id: '4',
      nome: 'Trentino-Alto Adige/Südtirol',
      latitudine: 46.066667,
      longitudine: 11.116667,
    },
    {
      id: '10',
      nome: 'Umbria',
      latitudine: 43.1121,
      longitudine: 12.3888,
    },
    {
      id: '2',
      nome: "Valle d'Aosta/Vallée d'Aoste",
      latitudine: 45.737222,
      longitudine: 7.320556,
    },
    {
      id: '5',
      nome: 'Veneto',
      latitudine: 45.439722,
      longitudine: 12.331944,
    },
  ];

  //provincie
  Sicilia = [ { "nome": "Agrigento ", "sigla": "AG" }, { "nome": "Caltanissetta ", "sigla": "CL" }, { "nome": "Catania ", "sigla": "CT" }, { "nome": "Enna ", "sigla": "EN" }, { "nome": "Messina ", "sigla": "ME" }, { "nome": "Palermo ", "sigla": "PA" }, { "nome": "Ragusa ", "sigla": "RG" }, { "nome": "Siracusa ", "sigla": "SR" }, { "nome": "Trapani ", "sigla": "TP" }];
  Piemonte = [{ "nome": "Alessandria ", "sigla": "AL" }, { "nome": "Asti ", "sigla": "AT" }, { "nome": "Biella ", "sigla": "BI" }, { "nome": "Cuneo ", "sigla": "CN" }, { "nome": "Novara ", "sigla": "NO" }, { "nome": "Torino ", "sigla": "TO" }, { "nome": "Verbano-Cusio-Ossola ", "sigla": "VB" }, { "nome": "Vercelli ", "sigla": "VC" }];
  Marche = [{ "nome": "Ancona ", "sigla": "AN" }, { "nome": "Ascoli Piceno ", "sigla": "AP" }, { "nome": "Macerata ", "sigla": "MC" }, { "nome": "Pesaro e Urbino ", "sigla": "PU" }, { "nome": "Fermo", "sigla": "FM" }];
  ValledAosta = [{ "nome": "Aosta ", "sigla": "AO" }];
  Toscana = [{ "nome": "Arezzo ", "sigla": "AR" }, { "nome": "Firenze ", "sigla": "FI" }, { "nome": "Grosseto ", "sigla": "GR" }, { "nome": "Livorno ", "sigla": "LI" }, { "nome": "Lucca ", "sigla": "LU" }, { "nome": "Massa-Carrara ", "sigla": "MS" }, { "nome": "Pisa ", "sigla": "PI" }, { "nome": "Pistoia ", "sigla": "PT" }, { "nome": "Prato ", "sigla": "PO" }, { "nome": "Siena ", "sigla": "SI" }];
  Campania = [{ "nome": "Avellino ", "sigla": "AV" }, { "nome": "Benevento ", "sigla": "BN" }, { "nome": "Caserta ", "sigla": "CE" }, { "nome": "Napoli ", "sigla": "NA" }, { "nome": "Salerno ", "sigla": "SA" }];
  Puglia = [{ "nome": "Bari ", "sigla": "BA" }, { "nome": "Brindisi ", "sigla": "BR" }, { "nome": "Foggia ", "sigla": "FG" }, { "nome": "Lecce ", "sigla": "LE" }, { "nome": "Taranto ", "sigla": "TA" }, { "nome": "Barletta-Andria-Trani", "sigla": "BT" }];
  Veneto = [{ "nome": "Belluno ", "sigla": "BL" }, { "nome": "Padova ", "sigla": "PD" }, { "nome": "Rovigo ", "sigla": "RO" }, { "nome": "Treviso ", "sigla": "TV" }, { "nome": "Venezia ", "sigla": "VE" }, { "nome": "Verona ", "sigla": "VR" }, { "nome": "Vicenza ", "sigla": "VI" }];
  Lombardia = [{ "nome": "Bergamo ", "sigla": "BG" }, { "nome": "Brescia ", "sigla": "BS" }, { "nome": "Como ", "sigla": "CO" }, { "nome": "Cremona ", "sigla": "CR" }, { "nome": "Lecco ", "sigla": "LC" }, { "nome": "Lodi ", "sigla": "LO" }, { "nome": "Mantova ", "sigla": "MN" }, { "nome": "Milano ", "sigla": "MI" }, { "nome": "Pavia ", "sigla": "PV" }, { "nome": "Sondrio ", "sigla": "SO" }, { "nome": "Varese ", "sigla": "VA" }, { "nome": "Monza/Brianza", "sigla": "MB" }, {'sigla': 'Tutte le provincie'}];
  EmiliaRomagna = [{ "nome": "Bologna ", "sigla": "BO" }, { "nome": "Ferrara ", "sigla": "FE" }, { "nome": "Forl\u002d0043esena ", "sigla": "FC" }, { "nome": "Modena ", "sigla": "MO" }, { "nome": "Parma ", "sigla": "PR" }, { "nome": "Piacenza ", "sigla": "PC" }, { "nome": "Ravenna ", "sigla": "RA" }, { "nome": "Reggio Emilia ", "sigla": "RE" }, { "nome": "Rimini ", "sigla": "RN" }];
  TrentinoAltoAdige = [{ "nome": "Bolzano ", "sigla": "BZ" }, { "nome": "Trento ", "sigla": "TN" }];
  Sardegna = [{ "nome": "Cagliari ", "sigla": "CA" }, { "nome": "Carbonia-Iglesias ", "sigla": "CI" }, { "nome": "Nuoro ", "sigla": "NU" }, { "nome": "Olbia-Tempio ", "sigla": "OT" }, { "nome": "Oristano ", "sigla": "OR" }, { "nome": "Medio Campidano ", "sigla": "VS" }, { "nome": "Sassari ", "sigla": "SS" }, { "nome": "Ogliastra ", "sigla": "OG" }];
  Molise = [{ "nome": "Campobasso ", "sigla": "CB" }, { "nome": "Isernia ", "sigla": "IS" }];
  Calabria = [{ "nome": "Catanzaro ", "sigla": "CZ" }, { "nome": "Cosenza ", "sigla": "CS" }, { "nome": "Crotone ", "sigla": "KR" }, { "nome": "Reggio Calabria ", "sigla": "RC" }, { "nome": "Vibo Valentia ", "sigla": "VV" }];
  Abruzzo = [{ "nome": "Chieti ", "sigla": "CH" }, { "nome": "L'Aquila ", "sigla": "AQ" }, { "nome": "Pescara ", "sigla": "PE" }, { "nome": "Teramo ", "sigla": "TE" }];
  Lazio = [{ "nome": "Frosinone ", "sigla": "FR" }, { "nome": "Latina ", "sigla": "LT" }, { "nome": "Rieti ", "sigla": "RI" }, { "nome": "Roma ", "sigla": "RM" }, { "nome": "Viterbo ", "sigla": "VT" }];
  Liguria = [{ "nome": "Genova ", "sigla": "GE" }, { "nome": "Imperia ", "sigla": "IM" }, { "nome": "La Spezia ", "sigla": "SP" }, { "nome": "Savona ", "sigla": "SV" }];
  FriuliVeneziaGiulia = [{ "nome": "Gorizia ", "sigla": "GO" }, { "nome": "Pordenone ", "sigla": "PN" }, { "nome": "Trieste ", "sigla": "TS" }, { "nome": "Udine ", "sigla": "UD" }];
  Basilicata = [{ "nome": "Matera ", "sigla": "MT" }, { "nome": "Potenza ", "sigla": "PZ" }];
  Umbria = [{ "nome": "Perugia ", "sigla": "PG" }, { "nome": "Terni ", "sigla": "TR" }];

  //interface database hotel
  document: Hotel = null;
  hotel = [];
  struttureH:any[] = [];
  starin3 = false;
  valori: string;

  coords:any[] = []

  filteredMarkers:any[]=[];

  viewStrutturaDettails:string;
  //latitude and longitude of your initial position
  latitude: number = 41.9027835;
  longitude: number = 12.4963655;

  //this is the value of input Region
  regionName: string;

  // this is the Radius of circle in map
  radius = 50000;
  radiusLat= 0;
  radiusLong = 0;

  //marker maps
  hotelPosition = false;
  yourPosition = false;
  
  // zoom of maps
  myzoom=5;

  //barra di caricamento
  showLoader:boolean;
  
  //view provinceSelect after select Region
  ionProvinceSelect = false;
  provinceName:string;

  //view regione select
  ionRegioneSelect = true;
  //this array push the correct province of region selected
  allProvinceForRegion = [];

  //default and custom maps
  defaultMaps:boolean = true;
  customMaps:boolean = false;


  constructor(private hotelService: HotelserviceService,private firestore: Firestore,private modalCtrl:ModalController,
    private mapsAPILoader:MapsAPILoader,private compravenduteService:CompravenduteService) {
      this.compravenduteService.getStruttureCompravendute().subscribe(res => {
        this.struttureH = res;
      })
      this.hotelService.getHotel().subscribe(res => {
        console.log(res.length)
        this.coords = res;
      })
      //this.getPosition();
  }

  async getPosition() {
    const coordinates = await Geolocation.getCurrentPosition().then((res) => {
      console.log('Current position:', res);
      this.latitude = res.coords.latitude;
      this.longitude = res.coords.longitude;
      this.radiusLat = this.latitude;
      this.radiusLong = this.longitude;
    });
  }

  findHotelHere(strutt) {
    console.log(strutt.id,strutt.latitude,strutt.longitude)
    this.mapsAPILoader.load().then(() => {
      const center = new google.maps.LatLng(strutt.latitude, strutt.longitude);
      //visualizza i markers nell'area designata in km
      this.filteredMarkers = this.coords.filter(m => {
        const markerLoc = new google.maps.LatLng(m.geo_x,m.geo_y);
        const  distanceInKm = google.maps.geometry.spherical.computeDistanceBetween(markerLoc, center) / 1000
        if (distanceInKm < 0.7) {
          this.viewStrutturaDettails = m.id;
          return this.viewHotelDettails();
        }
      });
    });
  }

  ngOnInit() {
  }


  doRefresh(event) {
    console.log('Begin async operation');
    this.allProvinceForRegion.length = 0;
    this.showProgressBar();
    setTimeout(() => {
      switch (this.regionName) {
        case 'Abruzzo':
          this.latitude = this.AbruzzoLat;
          this.longitude = this.AbruzzoLong;
          this.radiusLat = this.latitude;
          this.radiusLong = this.longitude;
          this.allProvinceForRegion = this.Abruzzo;
          break;
        case 'Basilicata':
          this.latitude = this.BasilicataLat;
          this.longitude = this.BasilicataLong;
          this.radiusLat = this.latitude;
          this.radiusLong = this.longitude;
          this.allProvinceForRegion = this.Basilicata;
          break;
        case 'Calabria':
          this.latitude = this.BasilicataLat;
          this.longitude = this.BasilicataLong;
          this.radiusLat = this.latitude;
          this.radiusLong = this.longitude;
          this.allProvinceForRegion = this.Calabria;
          break;
        case 'Campania':
          this.latitude = this.BasilicataLat;
          this.longitude = this.BasilicataLong;
          this.radiusLat = this.latitude;
          this.radiusLong = this.longitude;
          this.allProvinceForRegion = this.Campania;
          break;
        case 'Emilia-Romagna':
          this.latitude = this.EmiliaLat;
          this.longitude = this.EmiliaLong;
          this.radiusLat = this.latitude;
          this.radiusLong = this.longitude;
          this.allProvinceForRegion = this.EmiliaRomagna;
          break;
        case 'Friuli-Venezia Giulia':
          this.latitude = this.FriuliLat;
          this.longitude = this.FriuliLong;
          this.radiusLat = this.latitude;
          this.radiusLong = this.longitude;
          this.allProvinceForRegion = this.FriuliVeneziaGiulia;
          break;
        case 'Lazio':
          this.latitude = this.LazioLat;
          this.longitude = this.LazioLong;
          this.radiusLat = this.latitude;
          this.radiusLong = this.longitude;
          this.allProvinceForRegion = this.Lazio;
          break;
        case 'Liguria':
          this.latitude = this.LiguriaLat;
          this.longitude = this.LiguriaLong;
          this.radiusLat = this.latitude;
          this.radiusLong = this.longitude;
          this.allProvinceForRegion = this.Liguria;
          break;
        case 'Lombardia':
          this.latitude = this.LombardiaLat;
          this.longitude = this.LombardiaLong;
          this.radius = this.LombardiaRadius;
          this.radiusLat = this.latitude;
          this.radiusLong = this.longitude;
          this.allProvinceForRegion = this.Lombardia;
          //console.log(this.allProvinceForRegion);
          break;
        case 'Marche':
          this.latitude = this.MarcheLat;
          this.longitude = this.MarcheLong;
          this.radiusLat = this.latitude;
          this.radiusLong = this.longitude;
          this.allProvinceForRegion = this.Marche;
          break;
        case 'Molise':
          this.latitude = this.MoliseLat;
          this.longitude = this.MoliseLong;
          this.radiusLat = this.latitude;
          this.radiusLong = this.longitude;
          this.allProvinceForRegion = this.Molise;
          break;
        case 'Piemonte':
          this.latitude = this.PiemonteLat;
          this.longitude = this.PiemonteLong;
          this.radiusLat = this.latitude;
          this.radiusLong = this.longitude;
          this.allProvinceForRegion = this.Piemonte;
          break;
        case 'Puglia':
          this.latitude = this.PugliaLat;
          this.longitude = this.PugliaLong;
          this.radiusLat = this.latitude;
          this.radiusLong = this.longitude;
          this.allProvinceForRegion = this.Puglia;
          break;
        case 'Sardegna':
          this.latitude = this.SardegnaLat;
          this.longitude = this.SardegnaLong;
          this.radiusLat = this.latitude;
          this.radiusLong = this.longitude;
          this.allProvinceForRegion = this.Sardegna;
          break;
        case 'Sicilia':
          this.latitude = this.SiciliaLat;
          this.longitude = this.SiciliaLong;
          this.radiusLat = this.latitude;
          this.radiusLong = this.longitude;
          this.allProvinceForRegion = this.Sicilia;
          break;
        case 'Toscana':
          this.latitude = this.ToscanaLat;
          this.longitude = this.ToscanaLong;
          this.radiusLat = this.latitude;
          this.radiusLong = this.longitude;
          this.allProvinceForRegion = this.Toscana;
          break;
        case 'Trentino-Alto Adige/Südtirol':
          this.latitude = this.trentinoLat;
          this.longitude = this.trentinoLong;
          this.radiusLat = this.latitude;
          this.radiusLong = this.longitude;
          this.allProvinceForRegion = this.TrentinoAltoAdige;
          break;
        case 'Umbria':
          this.latitude = this.UmbriaLat;
          this.longitude = this.UmbriaLong;
          this.radiusLat = this.latitude;
          this.radiusLong = this.longitude;
          this.allProvinceForRegion = this.Umbria;
          break;
        case "Valle d'Aosta/Vallée d'Aoste":
          this.latitude = this.ValledaostaLat;
          this.longitude = this.ValledaostaLong;
          this.radiusLat = this.latitude;
          this.radiusLong = this.longitude;
          this.allProvinceForRegion = this.ValledAosta;
          break;
        case 'Veneto':
          this.latitude = this.VenetoLat;
          this.longitude = this.VenetoLong;
          this.radiusLat = this.latitude;
          this.radiusLong = this.longitude;
          this.allProvinceForRegion = this.Veneto;
          break;
      }
      this.ionProvinceSelect = true;
      this.ionRegioneSelect = false;
      this.hideProgressBar();
      event.target.complete();
    }, 2000);
  }
  
  async getH() {
    this.struttureH.length = 0;
    this.yourPosition = false;
    this.showProgressBar();
    const refDoc = collection(this.firestore, 'hoteldata');
    if(this.provinceName == 'Tutte le provincie') {
      const q2 = query(refDoc, where('provincia' || 'Provincia', '!=', this.provinceName));
      const querySnapshot = await getDocs(q2);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        this.hotelService.getHotelById(doc.id).subscribe((res) => {
          console.log(res);
          this.struttureH.push({denominazione:res.denominazione_struttura,
            latitude:res.geo_x,longitude:res.geo_y});

            return this.refreshHotel(event);
        });
      });
    } else if(this.allProvinceForRegion.length == 0) {
      return this.refreshHotel(event);
    } else {
      const q2 = query(refDoc, where('provincia', '==', this.provinceName));
      const querySnapshot = await getDocs(q2);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        this.hotelService.getHotelById(doc.id).subscribe((res) => {
          console.log(res);
          this.struttureH.push({denominazione:res.denominazione_struttura,
            latitude:res.geo_x,longitude:res.geo_y,id:res.id});
          
            return this.refreshHotel(event);
        });
      });
    }
  }

  refreshHotel(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      this.ionProvinceSelect = false;
      this.ionRegioneSelect = true;
      this.hideProgressBar();
      event.target.complete();
      this.myzoom = 13;
    },4000);
  }

  //this is proress function for progress bar 0% to 100%

  showProgressBar() {
    this.showLoader = true;
  }
  hideProgressBar() {
    this.showLoader = false;
  }

  async viewHotelDettails() {
    const modal = await this.modalCtrl.create({
      component: HoteldettailsPage,
      cssClass: 'hotel-dettails-modal-css',
      componentProps:{id:this.viewStrutturaDettails},
      breakpoints:[0,0.5,0.8],
      initialBreakpoint:0.8
    });
    modal.present();
  }

  placeMarkers() {
    this.yourPosition = this.yourPosition === false ? true : false;
    this.defaultMaps = this.defaultMaps === true ? false : true;
    this.customMaps = this.customMaps === false ? true : false;
  }
  markerDragEnd($event: any) {
    console.log('lat', $event.latLng.lat()); //to see the latitude in the console
    console.log('lng', $event.latLng.lng()); // to see the longitude in the console
    this.latitude = $event.latLng.lat();
    this.longitude = $event.latLng.lng();
    this.radiusLat = this.latitude;
    this.radiusLong = this.longitude;
    
    this.mapsAPILoader.load().then(() => {
      const center = new google.maps.LatLng(this.latitude, this.longitude);
      //visualizza i markers nell'area designata in km
      this.filteredMarkers = this.struttureH.filter(m => {
        const markerLoc = new google.maps.LatLng(m.latitude,m.longitude);
        const  distanceInKm = google.maps.geometry.spherical.computeDistanceBetween(markerLoc, center) / 1000
        if (distanceInKm < 100.0) {
          return m
          //return this.viewHotelDettails();
        }
      });
    });
  }
  //event(type, $event) {
  //  console.log(type, $event);
  //  this.radius = $event;
  //  //this.showHideMarkers();
  //}
  
}
