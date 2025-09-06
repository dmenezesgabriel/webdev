import { randomUUID } from "node:crypto";

export interface TodoProps {
  id?: string;
  title: string;
  userId: string;
  completed?: boolean;
}

export class Todo {
  private _id: string;
  private _title: string;
  private _completed: boolean;
  private _userId: string;

  constructor(props: TodoProps) {
    this._id = props.id ?? randomUUID();
    this._title = props.title;
    this._completed = props.completed ?? false;
    this._userId = props.userId;
  }

  public get id() {
    return this._id;
  }

  public get title() {
    return this._title;
  }

  public set title(value: string) {
    this._title = value;
  }

  public get competed() {
    return this._completed;
  }

  public set completed(value: boolean) {
    this._completed = value;
  }

  public get userId() {
    return this._userId;
  }
}
