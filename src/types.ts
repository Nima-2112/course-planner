//-------Types-------

export type Course = {
  id: number;
  title: string;
  code: string;
  department: string;
  credits: number;
};

export type User = {
  id: number;
  username: string;
};

export type StoredUser = {
  user: User;
  planner: number[];
};
