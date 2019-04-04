import { Component, OnInit } from '@angular/core';
import { ArrayToObjectEntity } from '@sbnx/shared/services';

@Component({
   selector: 'sbnx-list',
   templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

   manga: string;

   constructor() { }

   ngOnInit() {
      let x = [
         {
            id: 1,
            name: 'One punch man'
         },
         {
            id: 2,
            name: 'One Piece'
         }
      ];

      const z = ArrayToObjectEntity(x, 'id');
      this.manga = z[1].name;
   }
   
}
