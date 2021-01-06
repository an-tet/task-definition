export class Project {
  constructor(
    public title: string,
    public description?: string,
    public id?: string,
    public task?: Task[]
  ) {}
}
export class Task {
  constructor(
    public status: boolean = false,
    public deadline?: number,
    public commentary?: string[]
  ) {}
}
