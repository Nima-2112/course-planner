//-------Course Types-------

export type Course = {
  id: number;
  title: string;
  code: string;
  department: string;
  credits: number;
};

//-------User Types-------

export type User = {
  id: number;
  username: string;
};

//-------Stored User-------

export type StoredUser = {
  user: User;
  planner: number[];
};

//-------Create Course-------

export type CreateCourseInput = {
  title: string;
  code: string;
  department: string;
  credits: number;
};
