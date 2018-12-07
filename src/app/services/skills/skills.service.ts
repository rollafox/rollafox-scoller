import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Skill } from '@app/services/skills/skill.model';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class SkillsService {
  skillStore: Array<any> = [];

  constructor(private http: HttpClient) { }

  getDetailed(id): Observable<Skill> {
    return this.http.get<Skill>('./assets/static/data/skills.data.json').pipe(
      map((skill) => new Skill(skill)),
      filter((skill) => skill.id === id)
    );
  }

  getAll(): Observable<Array<Skill>> {
    return this.http.get<Array<Skill>>('./assets/static/data/skills.data.json');
  }
}
