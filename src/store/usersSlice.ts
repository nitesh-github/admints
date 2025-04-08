import { createSlice } from "@reduxjs/toolkit";
interface Address {
  addres1: string;
  country:string;
  state: string;
  city: string;
}
interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  address: Address;
}

interface UserState {
  users: User[];            // Array of users
  selectedUser: User | null; // Currently selected user (can be null initially)
}
  const initialState:UserState = {
    users: [],  
    selectedUser: null, 
  }

  const usersSlice = createSlice({
    name:"users",
    initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setSelectedUserRedux: (state, action) => {
      state.selectedUser = action.payload;
    },
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
  },
  });

export const { setUsers, setSelectedUserRedux, clearSelectedUser } = usersSlice.actions;
export default usersSlice.reducer;