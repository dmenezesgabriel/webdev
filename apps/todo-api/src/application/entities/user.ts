import { randomUUID } from "node:crypto";

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface UserProps {
  name: string;
  email: string;
  password: string;
  role?: Role;
}

export class User {
  private _id: string;
  private props: UserProps;

  constructor(props: UserProps, id?: string) {
    this._id = id ?? randomUUID();
    this.props = { ...props, role: props.role ?? Role.USER };
  }

  public get id() {
    return this._id;
  }

  public get name() {
    return this.props.name;
  }

  public set name(value: string) {
    this.props.name = value;
  }

  public get email() {
    return this.props.email;
  }

  public get password() {
    return this.props.password;
  }

  public set password(value: string) {
    this.props.password = value;
  }

  public get role() {
    return this.props.role;
  }
}
