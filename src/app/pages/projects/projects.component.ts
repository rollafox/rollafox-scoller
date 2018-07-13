import { Component, OnInit } from '@angular/core';
import { Skill } from '@app/services/skills/skill.model';
import { SkillsService } from '@app/services/skills/skills.service';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Component({
    selector: 'pmp-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
    public skills;
    public selected = null;
    public expanded = false;

    constructor(private skillsService: SkillsService) { }

    ngOnInit() {
        this.skills = this.skillsService.getAll();
    }

    selectedTech(event, skill) {
        console.log(event, skill);
        console.log(this.selected, (this.selected));
        // this.expanded = !this.expanded;
        this.selected =  skill;
    }

}
