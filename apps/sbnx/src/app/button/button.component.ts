import { Component, OnInit } from '@angular/core';
import { ApiService } from '@sbnx/client/src';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  clicked() {
    this.api.call();
  }

}
