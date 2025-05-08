import { useEffect, useState } from "react";

export default function useAvatar(threshold: number = 250) {
  const [avatarPic, setAvatarPic] = useState<string | undefined>(undefined);

  useEffect(() => {
    const placeHolderPic = new Promise<string>((resolve) => {
      let timer: number;
      timer = setTimeout(() => {
        resolve("avatar.png");
      }, threshold);
      return () => {
        clearTimeout(timer);
      };
    });

    const apiPromise = new Promise<string>(async (resolve) => {
      await fetch("https://avatar.iran.liara.run/public");
      resolve("https://avatar.iran.liara.run/public");
    });

    Promise.race([placeHolderPic, apiPromise]).then((result) => {
      setAvatarPic(result);
    });
  }, []);

  return avatarPic;
}
