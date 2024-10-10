import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'lib-search-bar',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  @Input() label!: string;
  @Input() title!: string;
  @Input() id!: string;
  @Input() placeholder!: string;

  @Output() search = new EventEmitter();

  inputChanged(event: KeyboardEvent): void {
    const inputElement = event.target as HTMLInputElement;
    this.search.emit(inputElement.value);
  }
}
