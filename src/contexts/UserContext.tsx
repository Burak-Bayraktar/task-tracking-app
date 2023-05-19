import { createContext, useEffect, useState } from "react";
import { Author } from "types";
import { users } from "constants/users.json";

type User = {
  id: string;
  name: string;
  bio: string;
  img: string;
};

type UserContextType = {
  activeUser?: Author;
  setActiveUser: React.Dispatch<React.SetStateAction<Author | undefined>>;
};

const UserContext = createContext<UserContextType>({
  activeUser: undefined,
  setActiveUser: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeUser, setActiveUser] = useState<Author>();

  useEffect(() => {
    const randomId = Math.floor(Math.random() * users.length).toString();
    const activeUser: User | undefined = users.find(
      (user) => user.id === randomId
    );

    if (activeUser === undefined) {
      throw new Error("User not found");
    }

    const convertedActiveUser: Author = {
      id: activeUser.id,
      name: activeUser.name,
      img: activeUser.img,
      title: activeUser.bio,
    };

    setActiveUser(convertedActiveUser);
  }, []);

  return (
    <UserContext.Provider value={{ activeUser, setActiveUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
