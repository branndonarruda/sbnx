import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sbnx-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  clicked() {
    alert('HOLA!');
  }

}
