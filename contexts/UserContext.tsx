import { account, databases } from "@/lib/appwrite";
import { createContext, ReactNode, useState } from "react";
import { ID } from "react-native-appwrite";


const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const DATABASE_TABLE_user_profile = process.env.EXPO_PUBLIC_APPWRITE_USER_PROFILE_TABLE_ID!;
/* 1️⃣ Define user type (customize as needed) */
type User = {
  id: string;
  email: string;
};

/* 2️⃣ Define context value type */
type UserContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => Promise<void>;
  add_user_profile: (fname: string, lname: string, address: string, phonenumber: string, email: string) => Promise<void>;
  sessionChecker: () => Promise<boolean>;
  currentUser:() => Promise<void>;
};

/* 3️⃣ Create context with default value */
export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

/* 4️⃣ Define props type for provider */
type UserProviderProps = {
  children: ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);3

  async function currentUser() {
    try{
      const loggedInUser=await account.get();
    console.log(loggedInUser)
    }catch(error){
      console.log(error)
    }
  }

  async function login(email: string, password: string) {
    try{
      
      if(user!=null){
        await account.deleteSession("current");
      }
      await account.createEmailPasswordSession( email, password)
      const response = await account.get()
      setUser({ id: response.$id, email: response.email })
      return true

    }catch(error:any){
      console.log("Login error:", error);
      return false
    }
  }
  async function sessionChecker() {
    const session = await account.getSession("current");
    console.log("Session: ", session)
    if (session) {
      return true
    }else{
      return false
    }
     
  }
  async function register(email: string, password: string, name:string) {
    try{
      await account.create(ID.unique(), email, password,name)
      await login(email,password)
      return true
    }catch(error:any){
      console.log("Registering error:", error);
      return false
    }
  }

  async function add_user_profile(fname: string, lname: string, address: string, phonenumber: string, email: string) {
    try{
      const response =  await databases.createDocument(
        DATABASE_ID,
        DATABASE_TABLE_user_profile,
        ID.unique(),
        {
          firstName: fname,
          lastName: lname,
          emailAddress:email,
          phoneNumber: phonenumber,
          address: address,
        }
      );
      
      console.log("adding user profile response: ",response);
    }catch(error){
      console.log("Adding user profile error: ", error);
    }
  }

  async function logout() {
    await account.deleteSession("current");
    setUser(null);
  }

  return (
    <UserContext.Provider value={{ user, register, login, logout,add_user_profile, sessionChecker,currentUser}}>
      {children}
    </UserContext.Provider>
  );
}