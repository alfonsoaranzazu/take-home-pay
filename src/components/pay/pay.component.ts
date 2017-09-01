import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pay-item',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {
  @Input() pay: any;

  constructor() { }

  ngOnInit() {
  }

}
