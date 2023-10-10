export interface IUserReduxState {
  loading: boolean;
  selectedField?: User;
  users?: User[];
  isShowUserModal: boolean;
  userType: "Admin" | "Agent" | "Traveler";
}

export interface User {
  id: string;
  name: string;
  email: string;
  age: string;
  address: string;
  phoneNo: string;
  password: string;
  isActive: boolean;
  role: "Admin" | "Agent" | "Traveler";
}
