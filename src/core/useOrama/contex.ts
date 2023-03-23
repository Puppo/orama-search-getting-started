import { Orama, Schema } from "@orama/orama";
import { createContext } from "react";
import { SchemaToTypes } from "./types";

export type OramaContext<S extends Schema = any> = {
  isCreated: boolean;
  isIndexed: boolean;
  db?: Orama;
  setData: (data: SchemaToTypes<S>[]) => Promise<void>;
};

export const OramaContext = createContext<OramaContext>({
  isCreated: false,
  isIndexed: false,
  setData: async values => undefined,
});
