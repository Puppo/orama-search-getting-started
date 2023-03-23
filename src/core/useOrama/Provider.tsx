import {
  create,
  insertMultiple,
  Orama,
  Schema
} from "@orama/orama";
import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";

import { OramaContext } from "./contex";
import { SchemaToTypes } from "./types";

type IOramaProviderProps<S extends Schema> = PropsWithChildren<{
  schema: S
  options?: Omit<Parameters<typeof create>[0], 'schema'>
}>

export const OramaProvider = <S extends Schema>({ schema, options, children }: IOramaProviderProps<S>) => {
  const [isIndexed, setIsIndexed] = useState(false);
  const [orama, setOrama] = useState<Orama | undefined>(undefined)

  const setData = useCallback(async (values: SchemaToTypes<S>[]) => {
    if (!orama) throw new Error(`Orama database is not created!`)
    setIsIndexed(false);
    await insertMultiple(orama, values);
    setIsIndexed(true);
  }, [orama, setIsIndexed])

  const context = useMemo<OramaContext>(() => ({
    isCreated: !!orama,
    isIndexed,
    db: orama,
    setData
  }), [setData, orama, isIndexed])

  useEffect(() => {
    async function init() {
      const db = await create({
        schema,
        ...(options ?? {}),
      });
      setOrama(db);
    }
    init();
  }, []);

  return <OramaContext.Provider value={context}>{children}</OramaContext.Provider>;
};