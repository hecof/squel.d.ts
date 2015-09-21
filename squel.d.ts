interface Handler {
    (...args: any[]): any
}

interface SqlSelect {
  distinct(): SqlSelect
  field(name: string | any, alias?: string, options?: any): SqlSelect
  fields(fields: Object | any[]): SqlSelect
  from(name: string, alias?: string): SqlSelect
  join(name: string, alias?: string, condition?: string | any): SqlSelect
  left_join(name: string, alias?: string, condition?: string | any): SqlSelect
  right_join(name: string, alias?: string, condition?: string | any): SqlSelect
  outer_join(name: string, alias?: string, condition?: string | any): SqlSelect
  cross_join(name: string, alias?: string, condition?: string | any): SqlSelect
  where(condition: string, ...args: any[]): SqlSelect
  order(field: string, direction?: boolean, ...args: any[]): SqlSelect
  group(field: string): SqlSelect
  having(condition: string | any, ...args: any[]): SqlSelect
  limit(limit: number): SqlSelect
  offset(limit: number): SqlSelect
  top(num: number): SqlSelect
  toString(): string
  toParam(options?: Object, numberedParametersStartAt?: number): { text: string, values: any[] }
}

interface SqlInsert {
  into(name: string): SqlInsert
  set(name: string, value: any, options?: {  autoQuoteFieldNames?: boolean, dontQuote?: boolean }): SqlInsert
  setFields(fields: Object, options?: { ignorePeriodsForFieldNameQuotes?: boolean }): SqlInsert
  setFieldRows(fields: Object[], options?: { ignorePeriodsForFieldNameQuotes?: boolean }): SqlInsert
  fromQuery(columns: string[], selectQry: SqlSelect): SqlInsert
  onDupUpdate(name: string, value: any, options? : { ignorePeriodsForFieldNameQuotes?: boolean, dontQuote?: boolean}): SqlInsert
  output(name: string|string[]): SqlInsert
  returning(str: string): SqlInsert
  updateOptions(options: Object): SqlInsert
  registerValueHandler<T>(type: T|string, handler: Handler): SqlInsert
  isNestable(): boolean
  clone(): SqlInsert
  toString(): string
  toParam(options?: { numberedParametersStartAt?: number }): { text: string, values: any[] }
}

interface  SqlUpdate {
  table(name: string, alias?: string): SqlUpdate
  set(name: string, value?: any, options?: { ignorePeriodsForFieldNameQuotes?: boolean, dontQuote?: boolean}): SqlUpdate
  setFields(fields: Object, options?: { ignorePeriodsForFieldNameQuotes?: boolean }): SqlUpdate
  where(condition: string, ...args: any[]): SqlUpdate
  limit(limit: number): SqlUpdate
  offset(limit: number): SqlUpdate
  output(name: string, alias?: string): SqlUpdate
  outputs(fields: Object): SqlUpdate
  returning(str: string): SqlUpdate
  updateOptions(options: Object): SqlUpdate
  registerValueHandler(type: any, handler: Handler): SqlInsert
  isNestable(): boolean
  clone(): SqlInsert
  toString(): string
  toParam(options?: { numberedParametersStartAt?: number }): { text: string, values: any[] }
}

interface SqlDelete {
  trget(table: string): SqlDelete
  from(table: string, alias: string): SqlDelete
  join(name: string, alias?: string, condition?: string): SqlDelete
  left_join(name: string, alias?: string, condition?: string): SqlDelete
  right_join(name: string, alias?: string, condition?: string): SqlDelete
  outer_join(name: string, alias?: string, condition?: string): SqlDelete
  where(condition: string): SqlDelete
  limit(limit: number): SqlDelete
  offset(limit: number): SqlDelete
  output(name: string, alias?: string): SqlDelete
  outputs(fields: Object): SqlDelete
  returning(str: string): SqlDelete
  updateOptions(options: Object): SqlDelete
  registerValueHandler<T>(type: T|string, handler: Handler): SqlDelete
  isNestable(): boolean
  clone(): SqlDelete
  toString(): string
  toParam(options?: { numberedParametersStartAt?: number }): { text: string, values: any[] }
}

interface QueryBuilderOptions {
  autoQuoteAliasNames?: boolean
  autoQuoteFieldNames?: boolean
  autoQuoteTableNames?: boolean
  customValueHandlers?: Handler[]
  fieldAliasQuoteCharacter?: string
  nameQuoteCharacter?: string
  nestedBuilder?: boolean
  numberedParametersStartAt? :number
  replaceSingleQuotes?: boolean
  separator?: string
  singleQuoteReplacement?: string
  tableAliasQuoteCharacter?: string
}

interface QueryBuilder {
  select(options?: QueryBuilderOptions, blocks?: Object[]) : SqlSelect
  insert(options?: QueryBuilderOptions, blocks?: Object[]): SqlInsert
  update(options?: QueryBuilderOptions, blocks?: Object[]): SqlUpdate
  delete(options?: QueryBuilderOptions, blocks?: Object[]): SqlDelete
  remove(options?: QueryBuilderOptions, blocks?: Object[]): SqlDelete
}

interface Squel extends QueryBuilder {
  useFlavour(s: string): QueryBuilder
  VERSION: string
  registerValueHandler<T>(type: T, handler: Handler): Squel
  fval(func: string, ...args: any[])
}

declare module 'squel' {
  export = squel;
}

declare var squel: Squel;
