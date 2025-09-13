import { NgModule } from '@angular/core';

import { CardComponent } from './card/card.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';

@NgModule({
  imports: [RouterModule, CommonModule, AsyncPipe],
  declarations: [CardComponent, HeaderComponent],
  exports: [CardComponent, HeaderComponent, CommonModule, ReactiveFormsModule],
})
export class SharedModule {}
