import type {
  Result as OramaResult,
  Results as OramaResults,
} from "@orama/orama";
import { Schema } from "@orama/orama";

export type SchemaToTypes<S extends Schema> = {
  [k in keyof S]: S[k] extends Schema
    ? SchemaToTypes<S[k]>
    : S[k] extends "string"
    ? string
    : S[k] extends "boolean"
    ? boolean
    : S[k] extends "number"
    ? number
    : never;
};

export type Result<S extends Schema = any> = S extends Schema
  ? Omit<OramaResult, "document"> & { document: SchemaToTypes<S> }
  : OramaResult;
export type Results<S extends Schema = any> = S extends Schema
  ? Omit<OramaResults, "hits"> & { hits: Result<S>[] }
  : OramaResults;
