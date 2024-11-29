type SearchUserResult = {
  query: any;
  total: number;
  users: SearchUserModel[];
};

type SearchUserModel = {
  id: number;
  fullname: string;
};
