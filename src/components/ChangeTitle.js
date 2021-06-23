import { useEffect, useState } from "react";

export default function useChangeTitle(title){

    useEffect(() => {
        console.log(title);
        const prevTitle = document.title
        document.title = title
        return () => {
          document.title = prevTitle
        }
      })
}