export type Task = {
  id: string;
  text: string;
};

export interface Lead {
  id: string;
  name: string;
  family: string;
  phone: string;
  address: string;
}

export interface User {
  id: string;
  name: string;
  family: string;
  userName: string;
  password: string;
}