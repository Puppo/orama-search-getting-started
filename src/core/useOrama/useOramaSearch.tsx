import {
  Schema,
  search as searchWithOrama
} from "@orama/orama";

import {
  useCallback,
  useContext
} from "react";
import { OramaContext } from "./contex";
import { Results } from "./types";


export const useOramaSearch = <S extends Schema,>() => {
  const context: OramaContext<S> = useContext(OramaContext);

  const search = useCallback(
    async (term: string, properties: string[] | '*' = '*'): Promise<Results<S>> => {
      if (!context.db) throw new Error("Database not ready");

      const { length } = properties;
      const boost = properties === '*' ? {
        city: 2,
      } : properties.reduce((acc, key, index) => {
        const boostValue = (length - index) * 2;
        acc[key] = boostValue;
        return acc;
      }, {} as Record<string, number>);

      const result = await searchWithOrama(context.db, {
        term,
        properties,
        boost
      }) as unknown as Results<S>;

      return result;
    },
    [context]
  );

  return {
    isReady: context.isCreated && context.isIndexed,
    search,
  };
};
