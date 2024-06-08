 interface User extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface UserResponse {
  name: string;
  email: string;
  isActive: boolean;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export { User, UserResponse };