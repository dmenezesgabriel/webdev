import { NgModule } from '@angular/core';

import { CardComponent } from './card/card.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [RouterModule, CommonModule],
  declarations: [CardComponent, HeaderComponent],
  exports: [CardComponent, HeaderComponent, CommonModule, ReactiveFormsModule],
})
export class SharedModule {}
