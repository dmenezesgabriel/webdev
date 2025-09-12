import { randomUUID } from "node:crypto";

export interface TodoProps {
  title: string;
  userId: string;
  completedAt?: Date | null;
  createdAt?: Date | null;
}

export class Todo {
  private _id: string;
  props: TodoProps;

  constructor(props: TodoProps, id?: string) {
    this._id = id ?? randomUUID();
    this.props = { ...props, createdAt: props.createdAt ?? new Date() };
  }

  public get id() {
    return this._id;
  }

  public get title() {
    return this.props.title;
  }

  public set title(value: string) {
    this.props.title = value;
  }

  public get userId() {
    return this.props.userId;
  }

  public get completedAt() {
    return this.props.completedAt;
  }

  public complete() {
    this.props.completedAt = new Date();
  }
  public get createdAt() {
    return this.props.createdAt;
  }
}
