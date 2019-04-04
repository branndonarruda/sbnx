import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { ListComponent } from './list/list.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ButtonComponent, ListComponent],
  exports: [ButtonComponent, ListComponent],
})
export class SharedComponentsModule {}
