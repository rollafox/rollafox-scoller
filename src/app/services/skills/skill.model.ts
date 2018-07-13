interface SkillConf {
    id: number;
    title: string;
    technology: string;
    type: string;
    imgUrl?: string;
    details?: string;
    selfRanked?: number;
    experience?: number;
    tooling?: string;
}

export class Skill {
    id: number;
    title: string;
    technology: string;
    type: string; // ENUM - design | font-end | back-end
    imgUrl: string;
    details: string;
    selfRanked: number; // out of 10
    experience: number; // in years
    tooling: string; // in years

    constructor(skill: SkillConf) {
        this.id = skill.id;
        this.title = skill.title;
        this.technology = skill.technology;
        this.type = skill.type;
        this.imgUrl = skill.imgUrl || './assets/img/placeholder.png';
        this.details = skill.details || 'This is some great tech that I\'m familiar with.';
        this.selfRanked = skill.selfRanked || 10; // ofc!
        this.experience = skill.experience || null;
        this.tooling = skill.tooling || null;
    }
}
