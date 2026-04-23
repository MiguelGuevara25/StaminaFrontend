import type { IconProps } from "@tabler/icons-react";

export interface LoginData {
  email: string;
  password: string;
}

export interface NavItems {
  title: string;
  items: {
    title: string;
    url: string;
    icon: React.ForwardRefExoticComponent<
      IconProps & React.RefAttributes<SVGSVGElement>
    >;
  }[];
}

export interface Plan {
  id: number;
  name: string;
  price: number;
  durationDays: number;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  dni: string;
  email: string;
  phone: string;
  status: string;
}

export interface Subscription {
  startDate: string;
  endDate: string;
  status: string;
  user: {
    id: number;
  };
  plan: {
    id: number;
  };
}
