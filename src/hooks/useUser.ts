import { useEffect, useState } from "react";
import { users } from "constants/users.json";
import { Author } from "types";

type User = {
  id: number;
  name: string;
  bio: string;
  img: string;
};

const useUser = () => {
  const [activeUser, setActiveUser] = useState<Author>();

  useEffect(() => {
    const randomId = Math.floor(Math.random() * users.length);
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
    localStorage.setItem("activeUser", JSON.stringify(convertedActiveUser));
  }, []);

  return {
    activeUser,
  };
};

export default useUser;
