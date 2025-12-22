import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../../shared/material.module';

import { PropertyFormComponent } from './property-form/property-form.component';
import { PropertyListComponent } from './property-list/property-list.component';

@NgModule({
  declarations: [
    PropertyFormComponent,
    PropertyListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule
  ]
})
export class PropertiesModule {}
