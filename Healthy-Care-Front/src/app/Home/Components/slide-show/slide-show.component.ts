import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.css']
})
export class SlideShowComponent implements OnInit {
  
  @ViewChild('useThisTemplateVar') elRef!: ElementRef; 
  ngOnInit(): void {
    setInterval(() => {
    const last: Element | null = this.elRef?.nativeElement.firstElementChild;
    if (last) {
        last.remove();
        this.elRef?.nativeElement.appendChild(last);
    }
}, 2500);
  }
   


  
  

}
