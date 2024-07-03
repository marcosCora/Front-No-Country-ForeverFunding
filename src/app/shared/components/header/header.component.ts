import { Component} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  isExpanded: boolean = false;

  //Maneja el estado del sidebar
  ontoggleSidebar(){
    this.isExpanded = !this.isExpanded;
  }

  //Determinar el dispositivo
  isMobileDevice(): boolean {
    return window.innerWidth <= 971;
  }
}
