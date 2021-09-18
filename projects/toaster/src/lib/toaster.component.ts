import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sy-toaster',
  template: `
    <p>
      toaster works! 12
    </p>
  `,
  styles: [
  ]
})
export class ToasterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
