import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import {MutableRefObject, useEffect } from "react";
import { useTypedDispatch } from "./useTypedDispatch";

export const useOutsideAlerter = (ref: MutableRefObject<any>,
                                  action: ActionCreatorWithPayload<boolean, string>) => {
                                    
  const dispatch = useTypedDispatch()
  useEffect(() => {
    function handleClickOutside(event : Event) {
      if (ref.current && !ref.current.contains(event.target)) {
        dispatch(action(false))
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, dispatch, action]);
}