import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { countryRoutes } from './countries.routing';
import { SelectorPageComponent } from './pages/selector-page/selector-page.component';

@NgModule({
  declarations: [SelectorPageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(countryRoutes),
  ],
})
export class CountriesModule {}
