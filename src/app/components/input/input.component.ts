import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [NgIf, MaterialModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styles: ['mat-form-field{display: block}']
})
export class InputComponent {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) control!: FormControl;
  @Input() maxlength = '';
  @Input() hint?: string;
  @Input() errMsg?: string;
  @Input() patternMsg?: string;
}
