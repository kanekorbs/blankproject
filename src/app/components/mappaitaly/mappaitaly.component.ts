import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";

@Component({
  selector: 'app-mappaitaly',
  templateUrl: './mappaitaly.component.html',
  styleUrls: ['./mappaitaly.component.scss'],
})
export class MappaitalyComponent implements OnInit {

  constructor() {
  }
  
  ngOnInit() {
    //$('.regione').on('click',function(){
    //  $('.regione').removeClass('selected');
    //  $(this).addClass('selected'); 
    //  console.log($(this).data('nome-regione')); 
    //});
  }

}
