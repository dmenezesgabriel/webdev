import { randomUUID } from "node:crypto";

export interface UserProps {
  id?: string;
  name: string;
  email: string;
  password: string;
}

export class User {
  private _id: string;
  private _name: string;
  private _email: string;
  private _password: string;

  constructor(props: UserProps) {
    this._id = props.id ?? randomUUID();
    this._name = props.name;
    this._email = props.email;
    this._password = props.password;
  }

  public get id() {
    return this._id;
  }

  public get name() {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }

  public get email() {
    return this._email;
  }

  public set password(value: string) {
    this._password = value;
  }
}
