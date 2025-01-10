export interface Template {
    id: string;
    name: string;
    description: string;
  }
  
  export interface CardFields {
    priority: string;
    severity: string;
    age: number;
    prefix: string;
    cardNumber: number;
  }