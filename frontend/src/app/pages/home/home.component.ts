import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  activeProyect: string;
  projects: Project[] = [];
  crear: boolean = false;
  title: string = '';
  description: string = '';
  deadline: Date;
  status: boolean;
  commentary: string[];

  constructor(private projectService: ProjectService) {
    this.loadProjects();
  }

  ngOnInit(): void {}

  showProyect(title: string): void {
    this.activeProyect = title;
  }

  onSubmit(f: NgForm, i: number): void {
    if (i == 1) {
      if (f.valid) {
        this.projectService
          .createProject({
            project: { title: this.title, description: this.description },
          })
          .subscribe(
            (resp) => {},
            (err) => {
              console.log(err.error.message);
            }
          );
      }
    }
  }

  createActive() {
    this.crear = true;
  }

  loadProjects(): any {
    this.projectService.getProjects().subscribe(
      (res: any) => {
        if (res.ok) {
          const projectsDB: any[] = res.projects;
          for (let i = 0; i < projectsDB.length; i++) {
            this.projects.push(projectsDB[i]);
          }
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
