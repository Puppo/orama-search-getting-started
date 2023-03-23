import {
  Schema
} from "@orama/orama";

import {
  useContext
} from "react";
import { OramaContext } from "./contex";


export const useOramaSetData = <S extends Schema = any>() => {
  const { setData, isCreated }: OramaContext<S> = useContext(OramaContext);
  return {
    canSetData: isCreated,
    setData
  };
};
