import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projectlist',
  templateUrl: './projectlist.component.html',
  styleUrls: ['./projectlist.component.css'],
})
export class ProjectlistComponent implements OnInit {
  activeProyect: string;
  proyects: string[] = ['a', 'b'];
  constructor() {}

  ngOnInit(): void {}

  showProyect(proyect: string): void {
    this.activeProyect = proyect;
  }
}
