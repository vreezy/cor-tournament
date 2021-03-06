export const setKey = (key: string, value:string): void => {
   const now = new Date().getTime().toString();
   sessionStorage.setItem(key, value);
   sessionStorage.setItem(key + "_time", now);
}

export const getKey = (key: string): string | null => {
   const now = new Date().getTime();
   const time = sessionStorage.getItem(key + "_time");

   if (!time || time === "undefined" || time === null) {
      return null;
   }
   
   const timeInt = time ? parseInt(time) + 300_000 : 0;

   // console.log(now)
   // console.log(timeInt)
   // console.log(now < timeInt)
   // console.log(now - timeInt)

   if (now < timeInt) {
      const value = sessionStorage.getItem(key);
      if (value && value !== "undefined" && value !== null) {
         return value;
      }
   }
   return null;
}