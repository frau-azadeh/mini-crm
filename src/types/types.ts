export interface Task {
  id: string | number;
  text: string;
}

export interface Lead {
  id: string;
  name: string;
  family: string;
  phone: string;
  address: string;
}

export interface Admin {
  id: string;
  name: string;
  family: string;
  userName: string;
  password: string;
}

export interface Branch {
  id: string;
  city: string;
  phone: string;
  address: string;
  status: string;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
}

export interface Sell {
  id: string;
  quantity: string;
  name: string;
  description: string;
  madeIn: string;
  sellPrice: string;
  purchesPrice: string;
}
