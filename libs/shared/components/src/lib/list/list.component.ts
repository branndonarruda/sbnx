import { Component, OnInit, Input, EventEmitter, Output, HostListener, OnChanges, SimpleChanges, ChangeDetectionStrategy, HostBinding, Host, Renderer, ElementRef, ViewChild } from '@angular/core';
import { Splice, ArrayToObjectEntity } from '@sbnx/shared/services';
import { timer } from 'rxjs';
import { trigger, transition, style, animate, AnimationPlayer } from '@angular/animations';

@Component({
   selector: 'sbnx-list',
   templateUrl: './list.component.html',
   animations: [
      trigger('items', [
         transition(':enter', [
            style({ opacity: 0, height: 0, padding: '0 20px', margin: 0 }),
            animate('0.4s ease-out', style({ height: '44px', opacity: 1, padding: '10px 20px', margin: '2px 0' }))
         ]),
         transition(':leave', [
            style({ opacity: 1, height: '44px' }),
            animate('0.4s ease-out', style({ opacity: 0, height: 0, padding: '0 20px', margin: 0 }))
         ])
      ])
   ]
})
export class ListComponent implements OnInit, OnChanges {
   @HostBinding('class') classes = 'sbnx sbnx-list';
   @Input() items: any[];
   @Input() undoTrigger: number;
   @Input() undoTimer: number = 10000;
   @Input() class: string;

   @Output() remove = new EventEmitter<any>();
   @Output() update = new EventEmitter<any[]>();
   @Output() delete = new EventEmitter<any[]>();
   @Output() undo = new EventEmitter<any[]>();
   @Output() selected = new EventEmitter<any>();

   public player: AnimationPlayer;
   @ViewChild('mContentWrapper') contenWrapper: ElementRef;

   shadowItems: any[] = []; // copy of items
   deletableItems: any[] = []; // items to be deleted
   allowDelete: boolean = true;
   selectedRow: string = undefined;

   removeCount: number = 0;
   finalDeleteCount: number = 0;


   constructor(private el: ElementRef, public renderer: Renderer) { }

   ngOnInit() {
      this.shadowItems = this.items;
   }
   
   ngAfterViewInit() {
      if (this.class) {
         const arryfy = this.class.split(' ');
         if (arryfy.length > 1) {
            arryfy.forEach(val => {
               this.renderer.setElementClass(this.el.nativeElement, `${val}`, true);
            });
         } else {
            this.renderer.setElementClass(this.el.nativeElement, `${this.class}`, true);
         }
      }
   }

   ngOnChanges(changes: SimpleChanges): void {
      // function for update shadowItems if new data is added
      // make sure to do this function if there's changes in items
      if (changes.items) {
         if (changes.items.previousValue) {
            console.log('has changes');
            // omit removed data if new data are added
            if (this.deletableItems.length > 0) {
               const deletedids = this.deletableItems.map(x => x.id);

               this.shadowItems = this.shadowItems.filter(x => deletedids.indexOf(x.id) === -1);
               const oldandForgotten = [...this.shadowItems.map(x => x.id), ...deletedids];

               const newRow = this.items.filter(x => oldandForgotten.indexOf(x.id) === -1);

               this.shadowItems = [...newRow, ...this.shadowItems];
            }
            // get newly added data
            else {
               const oldies = this.shadowItems.map(x => x.id);
               const newRow = this.items.filter(x => oldies.indexOf(x.id) === -1);
               // insert newly added
               if (newRow.length > 0) {
                  this.shadowItems = [...newRow, ...this.shadowItems];
               } 
               // do update
               else {
                  // emit update ONLY IF name changes
                  const obj = ArrayToObjectEntity(changes.items.currentValue, 'id');
                  changes.items.previousValue.forEach(el => {
                     // make sure that this row exist before validating changes
                     if (obj[el['id']]) {
                        if (el['name'] !== obj[el['id']]['name']) {
                           this.update.emit(this.shadowItems);
                        }
                     }
                  });
               }               
            }
         }
      }

      // function for undo
      // make sure to do this function if there's an undo trigger
      if (changes.undoTrigger) {
         if (changes.undoTrigger.currentValue > 0) {
            if (this.deletableItems.length > 0) {
               // apply undo, inserting top row of deleted item to shadowitems
               this.shadowItems = [this.deletableItems[0], ...this.shadowItems];
               this.deletableItems = Splice(this.deletableItems, 0, 1);

               // add delay emiting deletable items to avoid expressionchange error
               timer(100).subscribe(val => this.undo.emit(this.deletableItems));
            }
         }
      }
   }

   removeItem(i: number) {
      this.remove.emit(this.shadowItems[i]);
      this.deletableItems = [this.shadowItems[i], ...this.deletableItems];

      this.shadowItems = Splice(this.shadowItems, i, 1);
      
      console.log('%cremoving', 'color: red', this.shadowItems);
      this.allowDelete = true;

      this.removeCount++;
      let timerInitiate = timer(this.undoTimer).subscribe(val => {
         this.finalDeleteCount++;

         if (this.removeCount === this.finalDeleteCount) {
            this.removeCount = 0;
            this.finalDeleteCount = 0;
            this.delete.emit(this.deletableItems);
            this.deletableItems = [];
            timerInitiate.unsubscribe();
         }
      });
   }

   onSelected(i: string) {
      this.selectedRow = i;
      this.selected.emit(ArrayToObjectEntity(this.shadowItems, 'id')[i]);
   }
}
