import { Component, EventEmitter, Output } from '@angular/core';
import { Helper } from 'src/app/helper';
import { Language } from '../models/language';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.css'],
})
export class LanguageSelectorComponent {
  @Output() change = new EventEmitter()
  data: Language[] = [
    { id: 1, name: 'ENG' },
    { id: 2, name: 'GEO' },
    { id: 3, name: 'FRA' },
  ];
  selectedLanguage = this.data[0];

  onChange() {
    if (this.data) {
      const index = Helper.getIndexById(this.selectedLanguage.id, this.data);
      if (index >= 0) {
        if (index + 1 < this.data.length) {
          this.selectedLanguage = this.data[index + 1];
        } else {
          this.selectedLanguage = this.data[0];
        }
      }
      console.log(`selected languaage: ${this.selectedLanguage.name}`)
      this.change.emit(this.selectedLanguage)
    }
  }
}
