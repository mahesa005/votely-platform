
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Penduduk
 * 
 */
export type Penduduk = $Result.DefaultSelection<Prisma.$PendudukPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Election
 * 
 */
export type Election = $Result.DefaultSelection<Prisma.$ElectionPayload>
/**
 * Model Candidate
 * 
 */
export type Candidate = $Result.DefaultSelection<Prisma.$CandidatePayload>
/**
 * Model Vote
 * 
 */
export type Vote = $Result.DefaultSelection<Prisma.$VotePayload>
/**
 * Model ElectionStatsCache
 * 
 */
export type ElectionStatsCache = $Result.DefaultSelection<Prisma.$ElectionStatsCachePayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  ADMIN: 'ADMIN',
  WARGA: 'WARGA'
};

export type Role = (typeof Role)[keyof typeof Role]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Penduduks
 * const penduduks = await prisma.penduduk.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Penduduks
   * const penduduks = await prisma.penduduk.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.penduduk`: Exposes CRUD operations for the **Penduduk** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Penduduks
    * const penduduks = await prisma.penduduk.findMany()
    * ```
    */
  get penduduk(): Prisma.PendudukDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.election`: Exposes CRUD operations for the **Election** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Elections
    * const elections = await prisma.election.findMany()
    * ```
    */
  get election(): Prisma.ElectionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.candidate`: Exposes CRUD operations for the **Candidate** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Candidates
    * const candidates = await prisma.candidate.findMany()
    * ```
    */
  get candidate(): Prisma.CandidateDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vote`: Exposes CRUD operations for the **Vote** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Votes
    * const votes = await prisma.vote.findMany()
    * ```
    */
  get vote(): Prisma.VoteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.electionStatsCache`: Exposes CRUD operations for the **ElectionStatsCache** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ElectionStatsCaches
    * const electionStatsCaches = await prisma.electionStatsCache.findMany()
    * ```
    */
  get electionStatsCache(): Prisma.ElectionStatsCacheDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.0.0
   * Query Engine version: 0c19ccc313cf9911a90d99d2ac2eb0280c76c513
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Penduduk: 'Penduduk',
    User: 'User',
    Election: 'Election',
    Candidate: 'Candidate',
    Vote: 'Vote',
    ElectionStatsCache: 'ElectionStatsCache',
    AuditLog: 'AuditLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "penduduk" | "user" | "election" | "candidate" | "vote" | "electionStatsCache" | "auditLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Penduduk: {
        payload: Prisma.$PendudukPayload<ExtArgs>
        fields: Prisma.PendudukFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PendudukFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendudukPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PendudukFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendudukPayload>
          }
          findFirst: {
            args: Prisma.PendudukFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendudukPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PendudukFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendudukPayload>
          }
          findMany: {
            args: Prisma.PendudukFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendudukPayload>[]
          }
          create: {
            args: Prisma.PendudukCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendudukPayload>
          }
          createMany: {
            args: Prisma.PendudukCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PendudukCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendudukPayload>[]
          }
          delete: {
            args: Prisma.PendudukDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendudukPayload>
          }
          update: {
            args: Prisma.PendudukUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendudukPayload>
          }
          deleteMany: {
            args: Prisma.PendudukDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PendudukUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PendudukUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendudukPayload>[]
          }
          upsert: {
            args: Prisma.PendudukUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendudukPayload>
          }
          aggregate: {
            args: Prisma.PendudukAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePenduduk>
          }
          groupBy: {
            args: Prisma.PendudukGroupByArgs<ExtArgs>
            result: $Utils.Optional<PendudukGroupByOutputType>[]
          }
          count: {
            args: Prisma.PendudukCountArgs<ExtArgs>
            result: $Utils.Optional<PendudukCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Election: {
        payload: Prisma.$ElectionPayload<ExtArgs>
        fields: Prisma.ElectionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ElectionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElectionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ElectionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElectionPayload>
          }
          findFirst: {
            args: Prisma.ElectionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElectionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ElectionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElectionPayload>
          }
          findMany: {
            args: Prisma.ElectionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElectionPayload>[]
          }
          create: {
            args: Prisma.ElectionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElectionPayload>
          }
          createMany: {
            args: Prisma.ElectionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ElectionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElectionPayload>[]
          }
          delete: {
            args: Prisma.ElectionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElectionPayload>
          }
          update: {
            args: Prisma.ElectionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElectionPayload>
          }
          deleteMany: {
            args: Prisma.ElectionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ElectionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ElectionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElectionPayload>[]
          }
          upsert: {
            args: Prisma.ElectionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElectionPayload>
          }
          aggregate: {
            args: Prisma.ElectionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateElection>
          }
          groupBy: {
            args: Prisma.ElectionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ElectionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ElectionCountArgs<ExtArgs>
            result: $Utils.Optional<ElectionCountAggregateOutputType> | number
          }
        }
      }
      Candidate: {
        payload: Prisma.$CandidatePayload<ExtArgs>
        fields: Prisma.CandidateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CandidateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CandidateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatePayload>
          }
          findFirst: {
            args: Prisma.CandidateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CandidateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatePayload>
          }
          findMany: {
            args: Prisma.CandidateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatePayload>[]
          }
          create: {
            args: Prisma.CandidateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatePayload>
          }
          createMany: {
            args: Prisma.CandidateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CandidateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatePayload>[]
          }
          delete: {
            args: Prisma.CandidateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatePayload>
          }
          update: {
            args: Prisma.CandidateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatePayload>
          }
          deleteMany: {
            args: Prisma.CandidateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CandidateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CandidateUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatePayload>[]
          }
          upsert: {
            args: Prisma.CandidateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandidatePayload>
          }
          aggregate: {
            args: Prisma.CandidateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCandidate>
          }
          groupBy: {
            args: Prisma.CandidateGroupByArgs<ExtArgs>
            result: $Utils.Optional<CandidateGroupByOutputType>[]
          }
          count: {
            args: Prisma.CandidateCountArgs<ExtArgs>
            result: $Utils.Optional<CandidateCountAggregateOutputType> | number
          }
        }
      }
      Vote: {
        payload: Prisma.$VotePayload<ExtArgs>
        fields: Prisma.VoteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VoteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VoteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload>
          }
          findFirst: {
            args: Prisma.VoteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VoteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload>
          }
          findMany: {
            args: Prisma.VoteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload>[]
          }
          create: {
            args: Prisma.VoteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload>
          }
          createMany: {
            args: Prisma.VoteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VoteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload>[]
          }
          delete: {
            args: Prisma.VoteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload>
          }
          update: {
            args: Prisma.VoteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload>
          }
          deleteMany: {
            args: Prisma.VoteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VoteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VoteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload>[]
          }
          upsert: {
            args: Prisma.VoteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload>
          }
          aggregate: {
            args: Prisma.VoteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVote>
          }
          groupBy: {
            args: Prisma.VoteGroupByArgs<ExtArgs>
            result: $Utils.Optional<VoteGroupByOutputType>[]
          }
          count: {
            args: Prisma.VoteCountArgs<ExtArgs>
            result: $Utils.Optional<VoteCountAggregateOutputType> | number
          }
        }
      }
      ElectionStatsCache: {
        payload: Prisma.$ElectionStatsCachePayload<ExtArgs>
        fields: Prisma.ElectionStatsCacheFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ElectionStatsCacheFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElectionStatsCachePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ElectionStatsCacheFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElectionStatsCachePayload>
          }
          findFirst: {
            args: Prisma.ElectionStatsCacheFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElectionStatsCachePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ElectionStatsCacheFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElectionStatsCachePayload>
          }
          findMany: {
            args: Prisma.ElectionStatsCacheFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElectionStatsCachePayload>[]
          }
          create: {
            args: Prisma.ElectionStatsCacheCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElectionStatsCachePayload>
          }
          createMany: {
            args: Prisma.ElectionStatsCacheCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ElectionStatsCacheCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElectionStatsCachePayload>[]
          }
          delete: {
            args: Prisma.ElectionStatsCacheDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElectionStatsCachePayload>
          }
          update: {
            args: Prisma.ElectionStatsCacheUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElectionStatsCachePayload>
          }
          deleteMany: {
            args: Prisma.ElectionStatsCacheDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ElectionStatsCacheUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ElectionStatsCacheUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElectionStatsCachePayload>[]
          }
          upsert: {
            args: Prisma.ElectionStatsCacheUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElectionStatsCachePayload>
          }
          aggregate: {
            args: Prisma.ElectionStatsCacheAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateElectionStatsCache>
          }
          groupBy: {
            args: Prisma.ElectionStatsCacheGroupByArgs<ExtArgs>
            result: $Utils.Optional<ElectionStatsCacheGroupByOutputType>[]
          }
          count: {
            args: Prisma.ElectionStatsCacheCountArgs<ExtArgs>
            result: $Utils.Optional<ElectionStatsCacheCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuditLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    penduduk?: PendudukOmit
    user?: UserOmit
    election?: ElectionOmit
    candidate?: CandidateOmit
    vote?: VoteOmit
    electionStatsCache?: ElectionStatsCacheOmit
    auditLog?: AuditLogOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    auditLogs: number
    createdElections: number
    votes: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    auditLogs?: boolean | UserCountOutputTypeCountAuditLogsArgs
    createdElections?: boolean | UserCountOutputTypeCountCreatedElectionsArgs
    votes?: boolean | UserCountOutputTypeCountVotesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreatedElectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ElectionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountVotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VoteWhereInput
  }


  /**
   * Count Type ElectionCountOutputType
   */

  export type ElectionCountOutputType = {
    candidates: number
    electionStatsCache: number
    votes: number
  }

  export type ElectionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    candidates?: boolean | ElectionCountOutputTypeCountCandidatesArgs
    electionStatsCache?: boolean | ElectionCountOutputTypeCountElectionStatsCacheArgs
    votes?: boolean | ElectionCountOutputTypeCountVotesArgs
  }

  // Custom InputTypes
  /**
   * ElectionCountOutputType without action
   */
  export type ElectionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElectionCountOutputType
     */
    select?: ElectionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ElectionCountOutputType without action
   */
  export type ElectionCountOutputTypeCountCandidatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CandidateWhereInput
  }

  /**
   * ElectionCountOutputType without action
   */
  export type ElectionCountOutputTypeCountElectionStatsCacheArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ElectionStatsCacheWhereInput
  }

  /**
   * ElectionCountOutputType without action
   */
  export type ElectionCountOutputTypeCountVotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VoteWhereInput
  }


  /**
   * Count Type CandidateCountOutputType
   */

  export type CandidateCountOutputType = {
    electionStatsCache: number
    votes: number
  }

  export type CandidateCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    electionStatsCache?: boolean | CandidateCountOutputTypeCountElectionStatsCacheArgs
    votes?: boolean | CandidateCountOutputTypeCountVotesArgs
  }

  // Custom InputTypes
  /**
   * CandidateCountOutputType without action
   */
  export type CandidateCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CandidateCountOutputType
     */
    select?: CandidateCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CandidateCountOutputType without action
   */
  export type CandidateCountOutputTypeCountElectionStatsCacheArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ElectionStatsCacheWhereInput
  }

  /**
   * CandidateCountOutputType without action
   */
  export type CandidateCountOutputTypeCountVotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VoteWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Penduduk
   */

  export type AggregatePenduduk = {
    _count: PendudukCountAggregateOutputType | null
    _min: PendudukMinAggregateOutputType | null
    _max: PendudukMaxAggregateOutputType | null
  }

  export type PendudukMinAggregateOutputType = {
    id: string | null
    nik: string | null
    namaLengkap: string | null
    tanggalLahir: Date | null
    alamat: string | null
    foto: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PendudukMaxAggregateOutputType = {
    id: string | null
    nik: string | null
    namaLengkap: string | null
    tanggalLahir: Date | null
    alamat: string | null
    foto: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PendudukCountAggregateOutputType = {
    id: number
    nik: number
    namaLengkap: number
    tanggalLahir: number
    alamat: number
    foto: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PendudukMinAggregateInputType = {
    id?: true
    nik?: true
    namaLengkap?: true
    tanggalLahir?: true
    alamat?: true
    foto?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PendudukMaxAggregateInputType = {
    id?: true
    nik?: true
    namaLengkap?: true
    tanggalLahir?: true
    alamat?: true
    foto?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PendudukCountAggregateInputType = {
    id?: true
    nik?: true
    namaLengkap?: true
    tanggalLahir?: true
    alamat?: true
    foto?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PendudukAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Penduduk to aggregate.
     */
    where?: PendudukWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Penduduks to fetch.
     */
    orderBy?: PendudukOrderByWithRelationInput | PendudukOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PendudukWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Penduduks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Penduduks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Penduduks
    **/
    _count?: true | PendudukCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PendudukMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PendudukMaxAggregateInputType
  }

  export type GetPendudukAggregateType<T extends PendudukAggregateArgs> = {
        [P in keyof T & keyof AggregatePenduduk]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePenduduk[P]>
      : GetScalarType<T[P], AggregatePenduduk[P]>
  }




  export type PendudukGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PendudukWhereInput
    orderBy?: PendudukOrderByWithAggregationInput | PendudukOrderByWithAggregationInput[]
    by: PendudukScalarFieldEnum[] | PendudukScalarFieldEnum
    having?: PendudukScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PendudukCountAggregateInputType | true
    _min?: PendudukMinAggregateInputType
    _max?: PendudukMaxAggregateInputType
  }

  export type PendudukGroupByOutputType = {
    id: string
    nik: string
    namaLengkap: string
    tanggalLahir: Date
    alamat: string | null
    foto: string | null
    createdAt: Date
    updatedAt: Date
    _count: PendudukCountAggregateOutputType | null
    _min: PendudukMinAggregateOutputType | null
    _max: PendudukMaxAggregateOutputType | null
  }

  type GetPendudukGroupByPayload<T extends PendudukGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PendudukGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PendudukGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PendudukGroupByOutputType[P]>
            : GetScalarType<T[P], PendudukGroupByOutputType[P]>
        }
      >
    >


  export type PendudukSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nik?: boolean
    namaLengkap?: boolean
    tanggalLahir?: boolean
    alamat?: boolean
    foto?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | Penduduk$userArgs<ExtArgs>
  }, ExtArgs["result"]["penduduk"]>

  export type PendudukSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nik?: boolean
    namaLengkap?: boolean
    tanggalLahir?: boolean
    alamat?: boolean
    foto?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["penduduk"]>

  export type PendudukSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nik?: boolean
    namaLengkap?: boolean
    tanggalLahir?: boolean
    alamat?: boolean
    foto?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["penduduk"]>

  export type PendudukSelectScalar = {
    id?: boolean
    nik?: boolean
    namaLengkap?: boolean
    tanggalLahir?: boolean
    alamat?: boolean
    foto?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PendudukOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nik" | "namaLengkap" | "tanggalLahir" | "alamat" | "foto" | "createdAt" | "updatedAt", ExtArgs["result"]["penduduk"]>
  export type PendudukInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Penduduk$userArgs<ExtArgs>
  }
  export type PendudukIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PendudukIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PendudukPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Penduduk"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nik: string
      namaLengkap: string
      tanggalLahir: Date
      alamat: string | null
      foto: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["penduduk"]>
    composites: {}
  }

  type PendudukGetPayload<S extends boolean | null | undefined | PendudukDefaultArgs> = $Result.GetResult<Prisma.$PendudukPayload, S>

  type PendudukCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PendudukFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PendudukCountAggregateInputType | true
    }

  export interface PendudukDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Penduduk'], meta: { name: 'Penduduk' } }
    /**
     * Find zero or one Penduduk that matches the filter.
     * @param {PendudukFindUniqueArgs} args - Arguments to find a Penduduk
     * @example
     * // Get one Penduduk
     * const penduduk = await prisma.penduduk.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PendudukFindUniqueArgs>(args: SelectSubset<T, PendudukFindUniqueArgs<ExtArgs>>): Prisma__PendudukClient<$Result.GetResult<Prisma.$PendudukPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Penduduk that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PendudukFindUniqueOrThrowArgs} args - Arguments to find a Penduduk
     * @example
     * // Get one Penduduk
     * const penduduk = await prisma.penduduk.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PendudukFindUniqueOrThrowArgs>(args: SelectSubset<T, PendudukFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PendudukClient<$Result.GetResult<Prisma.$PendudukPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Penduduk that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendudukFindFirstArgs} args - Arguments to find a Penduduk
     * @example
     * // Get one Penduduk
     * const penduduk = await prisma.penduduk.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PendudukFindFirstArgs>(args?: SelectSubset<T, PendudukFindFirstArgs<ExtArgs>>): Prisma__PendudukClient<$Result.GetResult<Prisma.$PendudukPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Penduduk that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendudukFindFirstOrThrowArgs} args - Arguments to find a Penduduk
     * @example
     * // Get one Penduduk
     * const penduduk = await prisma.penduduk.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PendudukFindFirstOrThrowArgs>(args?: SelectSubset<T, PendudukFindFirstOrThrowArgs<ExtArgs>>): Prisma__PendudukClient<$Result.GetResult<Prisma.$PendudukPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Penduduks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendudukFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Penduduks
     * const penduduks = await prisma.penduduk.findMany()
     * 
     * // Get first 10 Penduduks
     * const penduduks = await prisma.penduduk.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pendudukWithIdOnly = await prisma.penduduk.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PendudukFindManyArgs>(args?: SelectSubset<T, PendudukFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PendudukPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Penduduk.
     * @param {PendudukCreateArgs} args - Arguments to create a Penduduk.
     * @example
     * // Create one Penduduk
     * const Penduduk = await prisma.penduduk.create({
     *   data: {
     *     // ... data to create a Penduduk
     *   }
     * })
     * 
     */
    create<T extends PendudukCreateArgs>(args: SelectSubset<T, PendudukCreateArgs<ExtArgs>>): Prisma__PendudukClient<$Result.GetResult<Prisma.$PendudukPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Penduduks.
     * @param {PendudukCreateManyArgs} args - Arguments to create many Penduduks.
     * @example
     * // Create many Penduduks
     * const penduduk = await prisma.penduduk.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PendudukCreateManyArgs>(args?: SelectSubset<T, PendudukCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Penduduks and returns the data saved in the database.
     * @param {PendudukCreateManyAndReturnArgs} args - Arguments to create many Penduduks.
     * @example
     * // Create many Penduduks
     * const penduduk = await prisma.penduduk.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Penduduks and only return the `id`
     * const pendudukWithIdOnly = await prisma.penduduk.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PendudukCreateManyAndReturnArgs>(args?: SelectSubset<T, PendudukCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PendudukPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Penduduk.
     * @param {PendudukDeleteArgs} args - Arguments to delete one Penduduk.
     * @example
     * // Delete one Penduduk
     * const Penduduk = await prisma.penduduk.delete({
     *   where: {
     *     // ... filter to delete one Penduduk
     *   }
     * })
     * 
     */
    delete<T extends PendudukDeleteArgs>(args: SelectSubset<T, PendudukDeleteArgs<ExtArgs>>): Prisma__PendudukClient<$Result.GetResult<Prisma.$PendudukPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Penduduk.
     * @param {PendudukUpdateArgs} args - Arguments to update one Penduduk.
     * @example
     * // Update one Penduduk
     * const penduduk = await prisma.penduduk.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PendudukUpdateArgs>(args: SelectSubset<T, PendudukUpdateArgs<ExtArgs>>): Prisma__PendudukClient<$Result.GetResult<Prisma.$PendudukPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Penduduks.
     * @param {PendudukDeleteManyArgs} args - Arguments to filter Penduduks to delete.
     * @example
     * // Delete a few Penduduks
     * const { count } = await prisma.penduduk.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PendudukDeleteManyArgs>(args?: SelectSubset<T, PendudukDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Penduduks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendudukUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Penduduks
     * const penduduk = await prisma.penduduk.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PendudukUpdateManyArgs>(args: SelectSubset<T, PendudukUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Penduduks and returns the data updated in the database.
     * @param {PendudukUpdateManyAndReturnArgs} args - Arguments to update many Penduduks.
     * @example
     * // Update many Penduduks
     * const penduduk = await prisma.penduduk.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Penduduks and only return the `id`
     * const pendudukWithIdOnly = await prisma.penduduk.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PendudukUpdateManyAndReturnArgs>(args: SelectSubset<T, PendudukUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PendudukPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Penduduk.
     * @param {PendudukUpsertArgs} args - Arguments to update or create a Penduduk.
     * @example
     * // Update or create a Penduduk
     * const penduduk = await prisma.penduduk.upsert({
     *   create: {
     *     // ... data to create a Penduduk
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Penduduk we want to update
     *   }
     * })
     */
    upsert<T extends PendudukUpsertArgs>(args: SelectSubset<T, PendudukUpsertArgs<ExtArgs>>): Prisma__PendudukClient<$Result.GetResult<Prisma.$PendudukPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Penduduks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendudukCountArgs} args - Arguments to filter Penduduks to count.
     * @example
     * // Count the number of Penduduks
     * const count = await prisma.penduduk.count({
     *   where: {
     *     // ... the filter for the Penduduks we want to count
     *   }
     * })
    **/
    count<T extends PendudukCountArgs>(
      args?: Subset<T, PendudukCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PendudukCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Penduduk.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendudukAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PendudukAggregateArgs>(args: Subset<T, PendudukAggregateArgs>): Prisma.PrismaPromise<GetPendudukAggregateType<T>>

    /**
     * Group by Penduduk.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendudukGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PendudukGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PendudukGroupByArgs['orderBy'] }
        : { orderBy?: PendudukGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PendudukGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPendudukGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Penduduk model
   */
  readonly fields: PendudukFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Penduduk.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PendudukClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends Penduduk$userArgs<ExtArgs> = {}>(args?: Subset<T, Penduduk$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Penduduk model
   */
  interface PendudukFieldRefs {
    readonly id: FieldRef<"Penduduk", 'String'>
    readonly nik: FieldRef<"Penduduk", 'String'>
    readonly namaLengkap: FieldRef<"Penduduk", 'String'>
    readonly tanggalLahir: FieldRef<"Penduduk", 'DateTime'>
    readonly alamat: FieldRef<"Penduduk", 'String'>
    readonly foto: FieldRef<"Penduduk", 'String'>
    readonly createdAt: FieldRef<"Penduduk", 'DateTime'>
    readonly updatedAt: FieldRef<"Penduduk", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Penduduk findUnique
   */
  export type PendudukFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Penduduk
     */
    select?: PendudukSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Penduduk
     */
    omit?: PendudukOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendudukInclude<ExtArgs> | null
    /**
     * Filter, which Penduduk to fetch.
     */
    where: PendudukWhereUniqueInput
  }

  /**
   * Penduduk findUniqueOrThrow
   */
  export type PendudukFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Penduduk
     */
    select?: PendudukSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Penduduk
     */
    omit?: PendudukOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendudukInclude<ExtArgs> | null
    /**
     * Filter, which Penduduk to fetch.
     */
    where: PendudukWhereUniqueInput
  }

  /**
   * Penduduk findFirst
   */
  export type PendudukFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Penduduk
     */
    select?: PendudukSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Penduduk
     */
    omit?: PendudukOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendudukInclude<ExtArgs> | null
    /**
     * Filter, which Penduduk to fetch.
     */
    where?: PendudukWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Penduduks to fetch.
     */
    orderBy?: PendudukOrderByWithRelationInput | PendudukOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Penduduks.
     */
    cursor?: PendudukWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Penduduks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Penduduks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Penduduks.
     */
    distinct?: PendudukScalarFieldEnum | PendudukScalarFieldEnum[]
  }

  /**
   * Penduduk findFirstOrThrow
   */
  export type PendudukFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Penduduk
     */
    select?: PendudukSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Penduduk
     */
    omit?: PendudukOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendudukInclude<ExtArgs> | null
    /**
     * Filter, which Penduduk to fetch.
     */
    where?: PendudukWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Penduduks to fetch.
     */
    orderBy?: PendudukOrderByWithRelationInput | PendudukOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Penduduks.
     */
    cursor?: PendudukWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Penduduks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Penduduks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Penduduks.
     */
    distinct?: PendudukScalarFieldEnum | PendudukScalarFieldEnum[]
  }

  /**
   * Penduduk findMany
   */
  export type PendudukFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Penduduk
     */
    select?: PendudukSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Penduduk
     */
    omit?: PendudukOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendudukInclude<ExtArgs> | null
    /**
     * Filter, which Penduduks to fetch.
     */
    where?: PendudukWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Penduduks to fetch.
     */
    orderBy?: PendudukOrderByWithRelationInput | PendudukOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Penduduks.
     */
    cursor?: PendudukWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Penduduks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Penduduks.
     */
    skip?: number
    distinct?: PendudukScalarFieldEnum | PendudukScalarFieldEnum[]
  }

  /**
   * Penduduk create
   */
  export type PendudukCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Penduduk
     */
    select?: PendudukSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Penduduk
     */
    omit?: PendudukOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendudukInclude<ExtArgs> | null
    /**
     * The data needed to create a Penduduk.
     */
    data: XOR<PendudukCreateInput, PendudukUncheckedCreateInput>
  }

  /**
   * Penduduk createMany
   */
  export type PendudukCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Penduduks.
     */
    data: PendudukCreateManyInput | PendudukCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Penduduk createManyAndReturn
   */
  export type PendudukCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Penduduk
     */
    select?: PendudukSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Penduduk
     */
    omit?: PendudukOmit<ExtArgs> | null
    /**
     * The data used to create many Penduduks.
     */
    data: PendudukCreateManyInput | PendudukCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Penduduk update
   */
  export type PendudukUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Penduduk
     */
    select?: PendudukSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Penduduk
     */
    omit?: PendudukOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendudukInclude<ExtArgs> | null
    /**
     * The data needed to update a Penduduk.
     */
    data: XOR<PendudukUpdateInput, PendudukUncheckedUpdateInput>
    /**
     * Choose, which Penduduk to update.
     */
    where: PendudukWhereUniqueInput
  }

  /**
   * Penduduk updateMany
   */
  export type PendudukUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Penduduks.
     */
    data: XOR<PendudukUpdateManyMutationInput, PendudukUncheckedUpdateManyInput>
    /**
     * Filter which Penduduks to update
     */
    where?: PendudukWhereInput
    /**
     * Limit how many Penduduks to update.
     */
    limit?: number
  }

  /**
   * Penduduk updateManyAndReturn
   */
  export type PendudukUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Penduduk
     */
    select?: PendudukSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Penduduk
     */
    omit?: PendudukOmit<ExtArgs> | null
    /**
     * The data used to update Penduduks.
     */
    data: XOR<PendudukUpdateManyMutationInput, PendudukUncheckedUpdateManyInput>
    /**
     * Filter which Penduduks to update
     */
    where?: PendudukWhereInput
    /**
     * Limit how many Penduduks to update.
     */
    limit?: number
  }

  /**
   * Penduduk upsert
   */
  export type PendudukUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Penduduk
     */
    select?: PendudukSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Penduduk
     */
    omit?: PendudukOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendudukInclude<ExtArgs> | null
    /**
     * The filter to search for the Penduduk to update in case it exists.
     */
    where: PendudukWhereUniqueInput
    /**
     * In case the Penduduk found by the `where` argument doesn't exist, create a new Penduduk with this data.
     */
    create: XOR<PendudukCreateInput, PendudukUncheckedCreateInput>
    /**
     * In case the Penduduk was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PendudukUpdateInput, PendudukUncheckedUpdateInput>
  }

  /**
   * Penduduk delete
   */
  export type PendudukDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Penduduk
     */
    select?: PendudukSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Penduduk
     */
    omit?: PendudukOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendudukInclude<ExtArgs> | null
    /**
     * Filter which Penduduk to delete.
     */
    where: PendudukWhereUniqueInput
  }

  /**
   * Penduduk deleteMany
   */
  export type PendudukDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Penduduks to delete
     */
    where?: PendudukWhereInput
    /**
     * Limit how many Penduduks to delete.
     */
    limit?: number
  }

  /**
   * Penduduk.user
   */
  export type Penduduk$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Penduduk without action
   */
  export type PendudukDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Penduduk
     */
    select?: PendudukSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Penduduk
     */
    omit?: PendudukOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendudukInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    password: string | null
    role: $Enums.Role | null
    pendudukId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    walletAddress: string | null
    encryptedPrivateKey: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    password: string | null
    role: $Enums.Role | null
    pendudukId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    walletAddress: string | null
    encryptedPrivateKey: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    password: number
    role: number
    pendudukId: number
    createdAt: number
    updatedAt: number
    walletAddress: number
    encryptedPrivateKey: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    password?: true
    role?: true
    pendudukId?: true
    createdAt?: true
    updatedAt?: true
    walletAddress?: true
    encryptedPrivateKey?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    password?: true
    role?: true
    pendudukId?: true
    createdAt?: true
    updatedAt?: true
    walletAddress?: true
    encryptedPrivateKey?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    password?: true
    role?: true
    pendudukId?: true
    createdAt?: true
    updatedAt?: true
    walletAddress?: true
    encryptedPrivateKey?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    password: string
    role: $Enums.Role
    pendudukId: string
    createdAt: Date
    updatedAt: Date
    walletAddress: string
    encryptedPrivateKey: string | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    password?: boolean
    role?: boolean
    pendudukId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    walletAddress?: boolean
    encryptedPrivateKey?: boolean
    penduduk?: boolean | PendudukDefaultArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    createdElections?: boolean | User$createdElectionsArgs<ExtArgs>
    votes?: boolean | User$votesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    password?: boolean
    role?: boolean
    pendudukId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    walletAddress?: boolean
    encryptedPrivateKey?: boolean
    penduduk?: boolean | PendudukDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    password?: boolean
    role?: boolean
    pendudukId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    walletAddress?: boolean
    encryptedPrivateKey?: boolean
    penduduk?: boolean | PendudukDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    password?: boolean
    role?: boolean
    pendudukId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    walletAddress?: boolean
    encryptedPrivateKey?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "password" | "role" | "pendudukId" | "createdAt" | "updatedAt" | "walletAddress" | "encryptedPrivateKey", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    penduduk?: boolean | PendudukDefaultArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    createdElections?: boolean | User$createdElectionsArgs<ExtArgs>
    votes?: boolean | User$votesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    penduduk?: boolean | PendudukDefaultArgs<ExtArgs>
  }
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    penduduk?: boolean | PendudukDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      penduduk: Prisma.$PendudukPayload<ExtArgs>
      auditLogs: Prisma.$AuditLogPayload<ExtArgs>[]
      createdElections: Prisma.$ElectionPayload<ExtArgs>[]
      votes: Prisma.$VotePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      password: string
      role: $Enums.Role
      pendudukId: string
      createdAt: Date
      updatedAt: Date
      walletAddress: string
      encryptedPrivateKey: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    penduduk<T extends PendudukDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PendudukDefaultArgs<ExtArgs>>): Prisma__PendudukClient<$Result.GetResult<Prisma.$PendudukPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    auditLogs<T extends User$auditLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    createdElections<T extends User$createdElectionsArgs<ExtArgs> = {}>(args?: Subset<T, User$createdElectionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ElectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    votes<T extends User$votesArgs<ExtArgs> = {}>(args?: Subset<T, User$votesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly pendudukId: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly walletAddress: FieldRef<"User", 'String'>
    readonly encryptedPrivateKey: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.auditLogs
   */
  export type User$auditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * User.createdElections
   */
  export type User$createdElectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Election
     */
    select?: ElectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Election
     */
    omit?: ElectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElectionInclude<ExtArgs> | null
    where?: ElectionWhereInput
    orderBy?: ElectionOrderByWithRelationInput | ElectionOrderByWithRelationInput[]
    cursor?: ElectionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ElectionScalarFieldEnum | ElectionScalarFieldEnum[]
  }

  /**
   * User.votes
   */
  export type User$votesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    where?: VoteWhereInput
    orderBy?: VoteOrderByWithRelationInput | VoteOrderByWithRelationInput[]
    cursor?: VoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VoteScalarFieldEnum | VoteScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Election
   */

  export type AggregateElection = {
    _count: ElectionCountAggregateOutputType | null
    _avg: ElectionAvgAggregateOutputType | null
    _sum: ElectionSumAggregateOutputType | null
    _min: ElectionMinAggregateOutputType | null
    _max: ElectionMaxAggregateOutputType | null
  }

  export type ElectionAvgAggregateOutputType = {
    id: number | null
    chainElectionId: number | null
  }

  export type ElectionSumAggregateOutputType = {
    id: bigint | null
    chainElectionId: bigint | null
  }

  export type ElectionMinAggregateOutputType = {
    id: bigint | null
    name: string | null
    description: string | null
    level: string | null
    city: string | null
    province: string | null
    startTime: Date | null
    endTime: Date | null
    chainElectionId: bigint | null
    statusOverride: string | null
    createdBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ElectionMaxAggregateOutputType = {
    id: bigint | null
    name: string | null
    description: string | null
    level: string | null
    city: string | null
    province: string | null
    startTime: Date | null
    endTime: Date | null
    chainElectionId: bigint | null
    statusOverride: string | null
    createdBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ElectionCountAggregateOutputType = {
    id: number
    name: number
    description: number
    level: number
    city: number
    province: number
    startTime: number
    endTime: number
    chainElectionId: number
    statusOverride: number
    createdBy: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ElectionAvgAggregateInputType = {
    id?: true
    chainElectionId?: true
  }

  export type ElectionSumAggregateInputType = {
    id?: true
    chainElectionId?: true
  }

  export type ElectionMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    level?: true
    city?: true
    province?: true
    startTime?: true
    endTime?: true
    chainElectionId?: true
    statusOverride?: true
    createdBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ElectionMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    level?: true
    city?: true
    province?: true
    startTime?: true
    endTime?: true
    chainElectionId?: true
    statusOverride?: true
    createdBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ElectionCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    level?: true
    city?: true
    province?: true
    startTime?: true
    endTime?: true
    chainElectionId?: true
    statusOverride?: true
    createdBy?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ElectionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Election to aggregate.
     */
    where?: ElectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Elections to fetch.
     */
    orderBy?: ElectionOrderByWithRelationInput | ElectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ElectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Elections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Elections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Elections
    **/
    _count?: true | ElectionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ElectionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ElectionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ElectionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ElectionMaxAggregateInputType
  }

  export type GetElectionAggregateType<T extends ElectionAggregateArgs> = {
        [P in keyof T & keyof AggregateElection]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateElection[P]>
      : GetScalarType<T[P], AggregateElection[P]>
  }




  export type ElectionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ElectionWhereInput
    orderBy?: ElectionOrderByWithAggregationInput | ElectionOrderByWithAggregationInput[]
    by: ElectionScalarFieldEnum[] | ElectionScalarFieldEnum
    having?: ElectionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ElectionCountAggregateInputType | true
    _avg?: ElectionAvgAggregateInputType
    _sum?: ElectionSumAggregateInputType
    _min?: ElectionMinAggregateInputType
    _max?: ElectionMaxAggregateInputType
  }

  export type ElectionGroupByOutputType = {
    id: bigint
    name: string
    description: string
    level: string
    city: string | null
    province: string | null
    startTime: Date
    endTime: Date
    chainElectionId: bigint | null
    statusOverride: string | null
    createdBy: string
    createdAt: Date
    updatedAt: Date
    _count: ElectionCountAggregateOutputType | null
    _avg: ElectionAvgAggregateOutputType | null
    _sum: ElectionSumAggregateOutputType | null
    _min: ElectionMinAggregateOutputType | null
    _max: ElectionMaxAggregateOutputType | null
  }

  type GetElectionGroupByPayload<T extends ElectionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ElectionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ElectionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ElectionGroupByOutputType[P]>
            : GetScalarType<T[P], ElectionGroupByOutputType[P]>
        }
      >
    >


  export type ElectionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    level?: boolean
    city?: boolean
    province?: boolean
    startTime?: boolean
    endTime?: boolean
    chainElectionId?: boolean
    statusOverride?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    candidates?: boolean | Election$candidatesArgs<ExtArgs>
    electionStatsCache?: boolean | Election$electionStatsCacheArgs<ExtArgs>
    creator?: boolean | UserDefaultArgs<ExtArgs>
    votes?: boolean | Election$votesArgs<ExtArgs>
    _count?: boolean | ElectionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["election"]>

  export type ElectionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    level?: boolean
    city?: boolean
    province?: boolean
    startTime?: boolean
    endTime?: boolean
    chainElectionId?: boolean
    statusOverride?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["election"]>

  export type ElectionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    level?: boolean
    city?: boolean
    province?: boolean
    startTime?: boolean
    endTime?: boolean
    chainElectionId?: boolean
    statusOverride?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["election"]>

  export type ElectionSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    level?: boolean
    city?: boolean
    province?: boolean
    startTime?: boolean
    endTime?: boolean
    chainElectionId?: boolean
    statusOverride?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ElectionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "level" | "city" | "province" | "startTime" | "endTime" | "chainElectionId" | "statusOverride" | "createdBy" | "createdAt" | "updatedAt", ExtArgs["result"]["election"]>
  export type ElectionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    candidates?: boolean | Election$candidatesArgs<ExtArgs>
    electionStatsCache?: boolean | Election$electionStatsCacheArgs<ExtArgs>
    creator?: boolean | UserDefaultArgs<ExtArgs>
    votes?: boolean | Election$votesArgs<ExtArgs>
    _count?: boolean | ElectionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ElectionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ElectionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ElectionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Election"
    objects: {
      candidates: Prisma.$CandidatePayload<ExtArgs>[]
      electionStatsCache: Prisma.$ElectionStatsCachePayload<ExtArgs>[]
      creator: Prisma.$UserPayload<ExtArgs>
      votes: Prisma.$VotePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      name: string
      description: string
      level: string
      city: string | null
      province: string | null
      startTime: Date
      endTime: Date
      chainElectionId: bigint | null
      statusOverride: string | null
      createdBy: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["election"]>
    composites: {}
  }

  type ElectionGetPayload<S extends boolean | null | undefined | ElectionDefaultArgs> = $Result.GetResult<Prisma.$ElectionPayload, S>

  type ElectionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ElectionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ElectionCountAggregateInputType | true
    }

  export interface ElectionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Election'], meta: { name: 'Election' } }
    /**
     * Find zero or one Election that matches the filter.
     * @param {ElectionFindUniqueArgs} args - Arguments to find a Election
     * @example
     * // Get one Election
     * const election = await prisma.election.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ElectionFindUniqueArgs>(args: SelectSubset<T, ElectionFindUniqueArgs<ExtArgs>>): Prisma__ElectionClient<$Result.GetResult<Prisma.$ElectionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Election that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ElectionFindUniqueOrThrowArgs} args - Arguments to find a Election
     * @example
     * // Get one Election
     * const election = await prisma.election.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ElectionFindUniqueOrThrowArgs>(args: SelectSubset<T, ElectionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ElectionClient<$Result.GetResult<Prisma.$ElectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Election that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElectionFindFirstArgs} args - Arguments to find a Election
     * @example
     * // Get one Election
     * const election = await prisma.election.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ElectionFindFirstArgs>(args?: SelectSubset<T, ElectionFindFirstArgs<ExtArgs>>): Prisma__ElectionClient<$Result.GetResult<Prisma.$ElectionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Election that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElectionFindFirstOrThrowArgs} args - Arguments to find a Election
     * @example
     * // Get one Election
     * const election = await prisma.election.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ElectionFindFirstOrThrowArgs>(args?: SelectSubset<T, ElectionFindFirstOrThrowArgs<ExtArgs>>): Prisma__ElectionClient<$Result.GetResult<Prisma.$ElectionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Elections that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElectionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Elections
     * const elections = await prisma.election.findMany()
     * 
     * // Get first 10 Elections
     * const elections = await prisma.election.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const electionWithIdOnly = await prisma.election.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ElectionFindManyArgs>(args?: SelectSubset<T, ElectionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ElectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Election.
     * @param {ElectionCreateArgs} args - Arguments to create a Election.
     * @example
     * // Create one Election
     * const Election = await prisma.election.create({
     *   data: {
     *     // ... data to create a Election
     *   }
     * })
     * 
     */
    create<T extends ElectionCreateArgs>(args: SelectSubset<T, ElectionCreateArgs<ExtArgs>>): Prisma__ElectionClient<$Result.GetResult<Prisma.$ElectionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Elections.
     * @param {ElectionCreateManyArgs} args - Arguments to create many Elections.
     * @example
     * // Create many Elections
     * const election = await prisma.election.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ElectionCreateManyArgs>(args?: SelectSubset<T, ElectionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Elections and returns the data saved in the database.
     * @param {ElectionCreateManyAndReturnArgs} args - Arguments to create many Elections.
     * @example
     * // Create many Elections
     * const election = await prisma.election.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Elections and only return the `id`
     * const electionWithIdOnly = await prisma.election.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ElectionCreateManyAndReturnArgs>(args?: SelectSubset<T, ElectionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ElectionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Election.
     * @param {ElectionDeleteArgs} args - Arguments to delete one Election.
     * @example
     * // Delete one Election
     * const Election = await prisma.election.delete({
     *   where: {
     *     // ... filter to delete one Election
     *   }
     * })
     * 
     */
    delete<T extends ElectionDeleteArgs>(args: SelectSubset<T, ElectionDeleteArgs<ExtArgs>>): Prisma__ElectionClient<$Result.GetResult<Prisma.$ElectionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Election.
     * @param {ElectionUpdateArgs} args - Arguments to update one Election.
     * @example
     * // Update one Election
     * const election = await prisma.election.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ElectionUpdateArgs>(args: SelectSubset<T, ElectionUpdateArgs<ExtArgs>>): Prisma__ElectionClient<$Result.GetResult<Prisma.$ElectionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Elections.
     * @param {ElectionDeleteManyArgs} args - Arguments to filter Elections to delete.
     * @example
     * // Delete a few Elections
     * const { count } = await prisma.election.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ElectionDeleteManyArgs>(args?: SelectSubset<T, ElectionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Elections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElectionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Elections
     * const election = await prisma.election.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ElectionUpdateManyArgs>(args: SelectSubset<T, ElectionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Elections and returns the data updated in the database.
     * @param {ElectionUpdateManyAndReturnArgs} args - Arguments to update many Elections.
     * @example
     * // Update many Elections
     * const election = await prisma.election.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Elections and only return the `id`
     * const electionWithIdOnly = await prisma.election.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ElectionUpdateManyAndReturnArgs>(args: SelectSubset<T, ElectionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ElectionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Election.
     * @param {ElectionUpsertArgs} args - Arguments to update or create a Election.
     * @example
     * // Update or create a Election
     * const election = await prisma.election.upsert({
     *   create: {
     *     // ... data to create a Election
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Election we want to update
     *   }
     * })
     */
    upsert<T extends ElectionUpsertArgs>(args: SelectSubset<T, ElectionUpsertArgs<ExtArgs>>): Prisma__ElectionClient<$Result.GetResult<Prisma.$ElectionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Elections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElectionCountArgs} args - Arguments to filter Elections to count.
     * @example
     * // Count the number of Elections
     * const count = await prisma.election.count({
     *   where: {
     *     // ... the filter for the Elections we want to count
     *   }
     * })
    **/
    count<T extends ElectionCountArgs>(
      args?: Subset<T, ElectionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ElectionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Election.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElectionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ElectionAggregateArgs>(args: Subset<T, ElectionAggregateArgs>): Prisma.PrismaPromise<GetElectionAggregateType<T>>

    /**
     * Group by Election.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElectionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ElectionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ElectionGroupByArgs['orderBy'] }
        : { orderBy?: ElectionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ElectionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetElectionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Election model
   */
  readonly fields: ElectionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Election.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ElectionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    candidates<T extends Election$candidatesArgs<ExtArgs> = {}>(args?: Subset<T, Election$candidatesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    electionStatsCache<T extends Election$electionStatsCacheArgs<ExtArgs> = {}>(args?: Subset<T, Election$electionStatsCacheArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ElectionStatsCachePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    creator<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    votes<T extends Election$votesArgs<ExtArgs> = {}>(args?: Subset<T, Election$votesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Election model
   */
  interface ElectionFieldRefs {
    readonly id: FieldRef<"Election", 'BigInt'>
    readonly name: FieldRef<"Election", 'String'>
    readonly description: FieldRef<"Election", 'String'>
    readonly level: FieldRef<"Election", 'String'>
    readonly city: FieldRef<"Election", 'String'>
    readonly province: FieldRef<"Election", 'String'>
    readonly startTime: FieldRef<"Election", 'DateTime'>
    readonly endTime: FieldRef<"Election", 'DateTime'>
    readonly chainElectionId: FieldRef<"Election", 'BigInt'>
    readonly statusOverride: FieldRef<"Election", 'String'>
    readonly createdBy: FieldRef<"Election", 'String'>
    readonly createdAt: FieldRef<"Election", 'DateTime'>
    readonly updatedAt: FieldRef<"Election", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Election findUnique
   */
  export type ElectionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Election
     */
    select?: ElectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Election
     */
    omit?: ElectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElectionInclude<ExtArgs> | null
    /**
     * Filter, which Election to fetch.
     */
    where: ElectionWhereUniqueInput
  }

  /**
   * Election findUniqueOrThrow
   */
  export type ElectionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Election
     */
    select?: ElectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Election
     */
    omit?: ElectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElectionInclude<ExtArgs> | null
    /**
     * Filter, which Election to fetch.
     */
    where: ElectionWhereUniqueInput
  }

  /**
   * Election findFirst
   */
  export type ElectionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Election
     */
    select?: ElectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Election
     */
    omit?: ElectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElectionInclude<ExtArgs> | null
    /**
     * Filter, which Election to fetch.
     */
    where?: ElectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Elections to fetch.
     */
    orderBy?: ElectionOrderByWithRelationInput | ElectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Elections.
     */
    cursor?: ElectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Elections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Elections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Elections.
     */
    distinct?: ElectionScalarFieldEnum | ElectionScalarFieldEnum[]
  }

  /**
   * Election findFirstOrThrow
   */
  export type ElectionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Election
     */
    select?: ElectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Election
     */
    omit?: ElectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElectionInclude<ExtArgs> | null
    /**
     * Filter, which Election to fetch.
     */
    where?: ElectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Elections to fetch.
     */
    orderBy?: ElectionOrderByWithRelationInput | ElectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Elections.
     */
    cursor?: ElectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Elections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Elections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Elections.
     */
    distinct?: ElectionScalarFieldEnum | ElectionScalarFieldEnum[]
  }

  /**
   * Election findMany
   */
  export type ElectionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Election
     */
    select?: ElectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Election
     */
    omit?: ElectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElectionInclude<ExtArgs> | null
    /**
     * Filter, which Elections to fetch.
     */
    where?: ElectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Elections to fetch.
     */
    orderBy?: ElectionOrderByWithRelationInput | ElectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Elections.
     */
    cursor?: ElectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Elections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Elections.
     */
    skip?: number
    distinct?: ElectionScalarFieldEnum | ElectionScalarFieldEnum[]
  }

  /**
   * Election create
   */
  export type ElectionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Election
     */
    select?: ElectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Election
     */
    omit?: ElectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElectionInclude<ExtArgs> | null
    /**
     * The data needed to create a Election.
     */
    data: XOR<ElectionCreateInput, ElectionUncheckedCreateInput>
  }

  /**
   * Election createMany
   */
  export type ElectionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Elections.
     */
    data: ElectionCreateManyInput | ElectionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Election createManyAndReturn
   */
  export type ElectionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Election
     */
    select?: ElectionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Election
     */
    omit?: ElectionOmit<ExtArgs> | null
    /**
     * The data used to create many Elections.
     */
    data: ElectionCreateManyInput | ElectionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElectionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Election update
   */
  export type ElectionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Election
     */
    select?: ElectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Election
     */
    omit?: ElectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElectionInclude<ExtArgs> | null
    /**
     * The data needed to update a Election.
     */
    data: XOR<ElectionUpdateInput, ElectionUncheckedUpdateInput>
    /**
     * Choose, which Election to update.
     */
    where: ElectionWhereUniqueInput
  }

  /**
   * Election updateMany
   */
  export type ElectionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Elections.
     */
    data: XOR<ElectionUpdateManyMutationInput, ElectionUncheckedUpdateManyInput>
    /**
     * Filter which Elections to update
     */
    where?: ElectionWhereInput
    /**
     * Limit how many Elections to update.
     */
    limit?: number
  }

  /**
   * Election updateManyAndReturn
   */
  export type ElectionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Election
     */
    select?: ElectionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Election
     */
    omit?: ElectionOmit<ExtArgs> | null
    /**
     * The data used to update Elections.
     */
    data: XOR<ElectionUpdateManyMutationInput, ElectionUncheckedUpdateManyInput>
    /**
     * Filter which Elections to update
     */
    where?: ElectionWhereInput
    /**
     * Limit how many Elections to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElectionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Election upsert
   */
  export type ElectionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Election
     */
    select?: ElectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Election
     */
    omit?: ElectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElectionInclude<ExtArgs> | null
    /**
     * The filter to search for the Election to update in case it exists.
     */
    where: ElectionWhereUniqueInput
    /**
     * In case the Election found by the `where` argument doesn't exist, create a new Election with this data.
     */
    create: XOR<ElectionCreateInput, ElectionUncheckedCreateInput>
    /**
     * In case the Election was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ElectionUpdateInput, ElectionUncheckedUpdateInput>
  }

  /**
   * Election delete
   */
  export type ElectionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Election
     */
    select?: ElectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Election
     */
    omit?: ElectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElectionInclude<ExtArgs> | null
    /**
     * Filter which Election to delete.
     */
    where: ElectionWhereUniqueInput
  }

  /**
   * Election deleteMany
   */
  export type ElectionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Elections to delete
     */
    where?: ElectionWhereInput
    /**
     * Limit how many Elections to delete.
     */
    limit?: number
  }

  /**
   * Election.candidates
   */
  export type Election$candidatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateInclude<ExtArgs> | null
    where?: CandidateWhereInput
    orderBy?: CandidateOrderByWithRelationInput | CandidateOrderByWithRelationInput[]
    cursor?: CandidateWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CandidateScalarFieldEnum | CandidateScalarFieldEnum[]
  }

  /**
   * Election.electionStatsCache
   */
  export type Election$electionStatsCacheArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElectionStatsCache
     */
    select?: ElectionStatsCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ElectionStatsCache
     */
    omit?: ElectionStatsCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElectionStatsCacheInclude<ExtArgs> | null
    where?: ElectionStatsCacheWhereInput
    orderBy?: ElectionStatsCacheOrderByWithRelationInput | ElectionStatsCacheOrderByWithRelationInput[]
    cursor?: ElectionStatsCacheWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ElectionStatsCacheScalarFieldEnum | ElectionStatsCacheScalarFieldEnum[]
  }

  /**
   * Election.votes
   */
  export type Election$votesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    where?: VoteWhereInput
    orderBy?: VoteOrderByWithRelationInput | VoteOrderByWithRelationInput[]
    cursor?: VoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VoteScalarFieldEnum | VoteScalarFieldEnum[]
  }

  /**
   * Election without action
   */
  export type ElectionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Election
     */
    select?: ElectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Election
     */
    omit?: ElectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElectionInclude<ExtArgs> | null
  }


  /**
   * Model Candidate
   */

  export type AggregateCandidate = {
    _count: CandidateCountAggregateOutputType | null
    _avg: CandidateAvgAggregateOutputType | null
    _sum: CandidateSumAggregateOutputType | null
    _min: CandidateMinAggregateOutputType | null
    _max: CandidateMaxAggregateOutputType | null
  }

  export type CandidateAvgAggregateOutputType = {
    id: number | null
    electionId: number | null
    orderIndex: number | null
  }

  export type CandidateSumAggregateOutputType = {
    id: bigint | null
    electionId: bigint | null
    orderIndex: number | null
  }

  export type CandidateMinAggregateOutputType = {
    id: bigint | null
    electionId: bigint | null
    name: string | null
    party: string | null
    description: string | null
    photoUrl: string | null
    orderIndex: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CandidateMaxAggregateOutputType = {
    id: bigint | null
    electionId: bigint | null
    name: string | null
    party: string | null
    description: string | null
    photoUrl: string | null
    orderIndex: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CandidateCountAggregateOutputType = {
    id: number
    electionId: number
    name: number
    party: number
    description: number
    photoUrl: number
    orderIndex: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CandidateAvgAggregateInputType = {
    id?: true
    electionId?: true
    orderIndex?: true
  }

  export type CandidateSumAggregateInputType = {
    id?: true
    electionId?: true
    orderIndex?: true
  }

  export type CandidateMinAggregateInputType = {
    id?: true
    electionId?: true
    name?: true
    party?: true
    description?: true
    photoUrl?: true
    orderIndex?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CandidateMaxAggregateInputType = {
    id?: true
    electionId?: true
    name?: true
    party?: true
    description?: true
    photoUrl?: true
    orderIndex?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CandidateCountAggregateInputType = {
    id?: true
    electionId?: true
    name?: true
    party?: true
    description?: true
    photoUrl?: true
    orderIndex?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CandidateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Candidate to aggregate.
     */
    where?: CandidateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Candidates to fetch.
     */
    orderBy?: CandidateOrderByWithRelationInput | CandidateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CandidateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Candidates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Candidates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Candidates
    **/
    _count?: true | CandidateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CandidateAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CandidateSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CandidateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CandidateMaxAggregateInputType
  }

  export type GetCandidateAggregateType<T extends CandidateAggregateArgs> = {
        [P in keyof T & keyof AggregateCandidate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCandidate[P]>
      : GetScalarType<T[P], AggregateCandidate[P]>
  }




  export type CandidateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CandidateWhereInput
    orderBy?: CandidateOrderByWithAggregationInput | CandidateOrderByWithAggregationInput[]
    by: CandidateScalarFieldEnum[] | CandidateScalarFieldEnum
    having?: CandidateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CandidateCountAggregateInputType | true
    _avg?: CandidateAvgAggregateInputType
    _sum?: CandidateSumAggregateInputType
    _min?: CandidateMinAggregateInputType
    _max?: CandidateMaxAggregateInputType
  }

  export type CandidateGroupByOutputType = {
    id: bigint
    electionId: bigint
    name: string
    party: string
    description: string | null
    photoUrl: string | null
    orderIndex: number
    createdAt: Date
    updatedAt: Date
    _count: CandidateCountAggregateOutputType | null
    _avg: CandidateAvgAggregateOutputType | null
    _sum: CandidateSumAggregateOutputType | null
    _min: CandidateMinAggregateOutputType | null
    _max: CandidateMaxAggregateOutputType | null
  }

  type GetCandidateGroupByPayload<T extends CandidateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CandidateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CandidateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CandidateGroupByOutputType[P]>
            : GetScalarType<T[P], CandidateGroupByOutputType[P]>
        }
      >
    >


  export type CandidateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    electionId?: boolean
    name?: boolean
    party?: boolean
    description?: boolean
    photoUrl?: boolean
    orderIndex?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    election?: boolean | ElectionDefaultArgs<ExtArgs>
    electionStatsCache?: boolean | Candidate$electionStatsCacheArgs<ExtArgs>
    votes?: boolean | Candidate$votesArgs<ExtArgs>
    _count?: boolean | CandidateCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["candidate"]>

  export type CandidateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    electionId?: boolean
    name?: boolean
    party?: boolean
    description?: boolean
    photoUrl?: boolean
    orderIndex?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    election?: boolean | ElectionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["candidate"]>

  export type CandidateSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    electionId?: boolean
    name?: boolean
    party?: boolean
    description?: boolean
    photoUrl?: boolean
    orderIndex?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    election?: boolean | ElectionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["candidate"]>

  export type CandidateSelectScalar = {
    id?: boolean
    electionId?: boolean
    name?: boolean
    party?: boolean
    description?: boolean
    photoUrl?: boolean
    orderIndex?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CandidateOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "electionId" | "name" | "party" | "description" | "photoUrl" | "orderIndex" | "createdAt" | "updatedAt", ExtArgs["result"]["candidate"]>
  export type CandidateInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    election?: boolean | ElectionDefaultArgs<ExtArgs>
    electionStatsCache?: boolean | Candidate$electionStatsCacheArgs<ExtArgs>
    votes?: boolean | Candidate$votesArgs<ExtArgs>
    _count?: boolean | CandidateCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CandidateIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    election?: boolean | ElectionDefaultArgs<ExtArgs>
  }
  export type CandidateIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    election?: boolean | ElectionDefaultArgs<ExtArgs>
  }

  export type $CandidatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Candidate"
    objects: {
      election: Prisma.$ElectionPayload<ExtArgs>
      electionStatsCache: Prisma.$ElectionStatsCachePayload<ExtArgs>[]
      votes: Prisma.$VotePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      electionId: bigint
      name: string
      party: string
      description: string | null
      photoUrl: string | null
      orderIndex: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["candidate"]>
    composites: {}
  }

  type CandidateGetPayload<S extends boolean | null | undefined | CandidateDefaultArgs> = $Result.GetResult<Prisma.$CandidatePayload, S>

  type CandidateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CandidateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CandidateCountAggregateInputType | true
    }

  export interface CandidateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Candidate'], meta: { name: 'Candidate' } }
    /**
     * Find zero or one Candidate that matches the filter.
     * @param {CandidateFindUniqueArgs} args - Arguments to find a Candidate
     * @example
     * // Get one Candidate
     * const candidate = await prisma.candidate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CandidateFindUniqueArgs>(args: SelectSubset<T, CandidateFindUniqueArgs<ExtArgs>>): Prisma__CandidateClient<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Candidate that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CandidateFindUniqueOrThrowArgs} args - Arguments to find a Candidate
     * @example
     * // Get one Candidate
     * const candidate = await prisma.candidate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CandidateFindUniqueOrThrowArgs>(args: SelectSubset<T, CandidateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CandidateClient<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Candidate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidateFindFirstArgs} args - Arguments to find a Candidate
     * @example
     * // Get one Candidate
     * const candidate = await prisma.candidate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CandidateFindFirstArgs>(args?: SelectSubset<T, CandidateFindFirstArgs<ExtArgs>>): Prisma__CandidateClient<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Candidate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidateFindFirstOrThrowArgs} args - Arguments to find a Candidate
     * @example
     * // Get one Candidate
     * const candidate = await prisma.candidate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CandidateFindFirstOrThrowArgs>(args?: SelectSubset<T, CandidateFindFirstOrThrowArgs<ExtArgs>>): Prisma__CandidateClient<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Candidates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Candidates
     * const candidates = await prisma.candidate.findMany()
     * 
     * // Get first 10 Candidates
     * const candidates = await prisma.candidate.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const candidateWithIdOnly = await prisma.candidate.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CandidateFindManyArgs>(args?: SelectSubset<T, CandidateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Candidate.
     * @param {CandidateCreateArgs} args - Arguments to create a Candidate.
     * @example
     * // Create one Candidate
     * const Candidate = await prisma.candidate.create({
     *   data: {
     *     // ... data to create a Candidate
     *   }
     * })
     * 
     */
    create<T extends CandidateCreateArgs>(args: SelectSubset<T, CandidateCreateArgs<ExtArgs>>): Prisma__CandidateClient<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Candidates.
     * @param {CandidateCreateManyArgs} args - Arguments to create many Candidates.
     * @example
     * // Create many Candidates
     * const candidate = await prisma.candidate.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CandidateCreateManyArgs>(args?: SelectSubset<T, CandidateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Candidates and returns the data saved in the database.
     * @param {CandidateCreateManyAndReturnArgs} args - Arguments to create many Candidates.
     * @example
     * // Create many Candidates
     * const candidate = await prisma.candidate.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Candidates and only return the `id`
     * const candidateWithIdOnly = await prisma.candidate.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CandidateCreateManyAndReturnArgs>(args?: SelectSubset<T, CandidateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Candidate.
     * @param {CandidateDeleteArgs} args - Arguments to delete one Candidate.
     * @example
     * // Delete one Candidate
     * const Candidate = await prisma.candidate.delete({
     *   where: {
     *     // ... filter to delete one Candidate
     *   }
     * })
     * 
     */
    delete<T extends CandidateDeleteArgs>(args: SelectSubset<T, CandidateDeleteArgs<ExtArgs>>): Prisma__CandidateClient<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Candidate.
     * @param {CandidateUpdateArgs} args - Arguments to update one Candidate.
     * @example
     * // Update one Candidate
     * const candidate = await prisma.candidate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CandidateUpdateArgs>(args: SelectSubset<T, CandidateUpdateArgs<ExtArgs>>): Prisma__CandidateClient<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Candidates.
     * @param {CandidateDeleteManyArgs} args - Arguments to filter Candidates to delete.
     * @example
     * // Delete a few Candidates
     * const { count } = await prisma.candidate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CandidateDeleteManyArgs>(args?: SelectSubset<T, CandidateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Candidates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Candidates
     * const candidate = await prisma.candidate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CandidateUpdateManyArgs>(args: SelectSubset<T, CandidateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Candidates and returns the data updated in the database.
     * @param {CandidateUpdateManyAndReturnArgs} args - Arguments to update many Candidates.
     * @example
     * // Update many Candidates
     * const candidate = await prisma.candidate.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Candidates and only return the `id`
     * const candidateWithIdOnly = await prisma.candidate.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CandidateUpdateManyAndReturnArgs>(args: SelectSubset<T, CandidateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Candidate.
     * @param {CandidateUpsertArgs} args - Arguments to update or create a Candidate.
     * @example
     * // Update or create a Candidate
     * const candidate = await prisma.candidate.upsert({
     *   create: {
     *     // ... data to create a Candidate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Candidate we want to update
     *   }
     * })
     */
    upsert<T extends CandidateUpsertArgs>(args: SelectSubset<T, CandidateUpsertArgs<ExtArgs>>): Prisma__CandidateClient<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Candidates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidateCountArgs} args - Arguments to filter Candidates to count.
     * @example
     * // Count the number of Candidates
     * const count = await prisma.candidate.count({
     *   where: {
     *     // ... the filter for the Candidates we want to count
     *   }
     * })
    **/
    count<T extends CandidateCountArgs>(
      args?: Subset<T, CandidateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CandidateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Candidate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CandidateAggregateArgs>(args: Subset<T, CandidateAggregateArgs>): Prisma.PrismaPromise<GetCandidateAggregateType<T>>

    /**
     * Group by Candidate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandidateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CandidateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CandidateGroupByArgs['orderBy'] }
        : { orderBy?: CandidateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CandidateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCandidateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Candidate model
   */
  readonly fields: CandidateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Candidate.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CandidateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    election<T extends ElectionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ElectionDefaultArgs<ExtArgs>>): Prisma__ElectionClient<$Result.GetResult<Prisma.$ElectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    electionStatsCache<T extends Candidate$electionStatsCacheArgs<ExtArgs> = {}>(args?: Subset<T, Candidate$electionStatsCacheArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ElectionStatsCachePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    votes<T extends Candidate$votesArgs<ExtArgs> = {}>(args?: Subset<T, Candidate$votesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Candidate model
   */
  interface CandidateFieldRefs {
    readonly id: FieldRef<"Candidate", 'BigInt'>
    readonly electionId: FieldRef<"Candidate", 'BigInt'>
    readonly name: FieldRef<"Candidate", 'String'>
    readonly party: FieldRef<"Candidate", 'String'>
    readonly description: FieldRef<"Candidate", 'String'>
    readonly photoUrl: FieldRef<"Candidate", 'String'>
    readonly orderIndex: FieldRef<"Candidate", 'Int'>
    readonly createdAt: FieldRef<"Candidate", 'DateTime'>
    readonly updatedAt: FieldRef<"Candidate", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Candidate findUnique
   */
  export type CandidateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateInclude<ExtArgs> | null
    /**
     * Filter, which Candidate to fetch.
     */
    where: CandidateWhereUniqueInput
  }

  /**
   * Candidate findUniqueOrThrow
   */
  export type CandidateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateInclude<ExtArgs> | null
    /**
     * Filter, which Candidate to fetch.
     */
    where: CandidateWhereUniqueInput
  }

  /**
   * Candidate findFirst
   */
  export type CandidateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateInclude<ExtArgs> | null
    /**
     * Filter, which Candidate to fetch.
     */
    where?: CandidateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Candidates to fetch.
     */
    orderBy?: CandidateOrderByWithRelationInput | CandidateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Candidates.
     */
    cursor?: CandidateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Candidates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Candidates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Candidates.
     */
    distinct?: CandidateScalarFieldEnum | CandidateScalarFieldEnum[]
  }

  /**
   * Candidate findFirstOrThrow
   */
  export type CandidateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateInclude<ExtArgs> | null
    /**
     * Filter, which Candidate to fetch.
     */
    where?: CandidateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Candidates to fetch.
     */
    orderBy?: CandidateOrderByWithRelationInput | CandidateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Candidates.
     */
    cursor?: CandidateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Candidates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Candidates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Candidates.
     */
    distinct?: CandidateScalarFieldEnum | CandidateScalarFieldEnum[]
  }

  /**
   * Candidate findMany
   */
  export type CandidateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateInclude<ExtArgs> | null
    /**
     * Filter, which Candidates to fetch.
     */
    where?: CandidateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Candidates to fetch.
     */
    orderBy?: CandidateOrderByWithRelationInput | CandidateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Candidates.
     */
    cursor?: CandidateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Candidates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Candidates.
     */
    skip?: number
    distinct?: CandidateScalarFieldEnum | CandidateScalarFieldEnum[]
  }

  /**
   * Candidate create
   */
  export type CandidateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateInclude<ExtArgs> | null
    /**
     * The data needed to create a Candidate.
     */
    data: XOR<CandidateCreateInput, CandidateUncheckedCreateInput>
  }

  /**
   * Candidate createMany
   */
  export type CandidateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Candidates.
     */
    data: CandidateCreateManyInput | CandidateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Candidate createManyAndReturn
   */
  export type CandidateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * The data used to create many Candidates.
     */
    data: CandidateCreateManyInput | CandidateCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Candidate update
   */
  export type CandidateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateInclude<ExtArgs> | null
    /**
     * The data needed to update a Candidate.
     */
    data: XOR<CandidateUpdateInput, CandidateUncheckedUpdateInput>
    /**
     * Choose, which Candidate to update.
     */
    where: CandidateWhereUniqueInput
  }

  /**
   * Candidate updateMany
   */
  export type CandidateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Candidates.
     */
    data: XOR<CandidateUpdateManyMutationInput, CandidateUncheckedUpdateManyInput>
    /**
     * Filter which Candidates to update
     */
    where?: CandidateWhereInput
    /**
     * Limit how many Candidates to update.
     */
    limit?: number
  }

  /**
   * Candidate updateManyAndReturn
   */
  export type CandidateUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * The data used to update Candidates.
     */
    data: XOR<CandidateUpdateManyMutationInput, CandidateUncheckedUpdateManyInput>
    /**
     * Filter which Candidates to update
     */
    where?: CandidateWhereInput
    /**
     * Limit how many Candidates to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Candidate upsert
   */
  export type CandidateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateInclude<ExtArgs> | null
    /**
     * The filter to search for the Candidate to update in case it exists.
     */
    where: CandidateWhereUniqueInput
    /**
     * In case the Candidate found by the `where` argument doesn't exist, create a new Candidate with this data.
     */
    create: XOR<CandidateCreateInput, CandidateUncheckedCreateInput>
    /**
     * In case the Candidate was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CandidateUpdateInput, CandidateUncheckedUpdateInput>
  }

  /**
   * Candidate delete
   */
  export type CandidateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateInclude<ExtArgs> | null
    /**
     * Filter which Candidate to delete.
     */
    where: CandidateWhereUniqueInput
  }

  /**
   * Candidate deleteMany
   */
  export type CandidateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Candidates to delete
     */
    where?: CandidateWhereInput
    /**
     * Limit how many Candidates to delete.
     */
    limit?: number
  }

  /**
   * Candidate.electionStatsCache
   */
  export type Candidate$electionStatsCacheArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElectionStatsCache
     */
    select?: ElectionStatsCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ElectionStatsCache
     */
    omit?: ElectionStatsCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElectionStatsCacheInclude<ExtArgs> | null
    where?: ElectionStatsCacheWhereInput
    orderBy?: ElectionStatsCacheOrderByWithRelationInput | ElectionStatsCacheOrderByWithRelationInput[]
    cursor?: ElectionStatsCacheWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ElectionStatsCacheScalarFieldEnum | ElectionStatsCacheScalarFieldEnum[]
  }

  /**
   * Candidate.votes
   */
  export type Candidate$votesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    where?: VoteWhereInput
    orderBy?: VoteOrderByWithRelationInput | VoteOrderByWithRelationInput[]
    cursor?: VoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VoteScalarFieldEnum | VoteScalarFieldEnum[]
  }

  /**
   * Candidate without action
   */
  export type CandidateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Candidate
     */
    select?: CandidateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Candidate
     */
    omit?: CandidateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CandidateInclude<ExtArgs> | null
  }


  /**
   * Model Vote
   */

  export type AggregateVote = {
    _count: VoteCountAggregateOutputType | null
    _avg: VoteAvgAggregateOutputType | null
    _sum: VoteSumAggregateOutputType | null
    _min: VoteMinAggregateOutputType | null
    _max: VoteMaxAggregateOutputType | null
  }

  export type VoteAvgAggregateOutputType = {
    id: number | null
    electionId: number | null
    candidateId: number | null
  }

  export type VoteSumAggregateOutputType = {
    id: bigint | null
    electionId: bigint | null
    candidateId: bigint | null
  }

  export type VoteMinAggregateOutputType = {
    id: bigint | null
    userId: string | null
    electionId: bigint | null
    candidateId: bigint | null
    txHash: string | null
    castAt: Date | null
    sourceIp: string | null
    userAgent: string | null
  }

  export type VoteMaxAggregateOutputType = {
    id: bigint | null
    userId: string | null
    electionId: bigint | null
    candidateId: bigint | null
    txHash: string | null
    castAt: Date | null
    sourceIp: string | null
    userAgent: string | null
  }

  export type VoteCountAggregateOutputType = {
    id: number
    userId: number
    electionId: number
    candidateId: number
    txHash: number
    castAt: number
    sourceIp: number
    userAgent: number
    _all: number
  }


  export type VoteAvgAggregateInputType = {
    id?: true
    electionId?: true
    candidateId?: true
  }

  export type VoteSumAggregateInputType = {
    id?: true
    electionId?: true
    candidateId?: true
  }

  export type VoteMinAggregateInputType = {
    id?: true
    userId?: true
    electionId?: true
    candidateId?: true
    txHash?: true
    castAt?: true
    sourceIp?: true
    userAgent?: true
  }

  export type VoteMaxAggregateInputType = {
    id?: true
    userId?: true
    electionId?: true
    candidateId?: true
    txHash?: true
    castAt?: true
    sourceIp?: true
    userAgent?: true
  }

  export type VoteCountAggregateInputType = {
    id?: true
    userId?: true
    electionId?: true
    candidateId?: true
    txHash?: true
    castAt?: true
    sourceIp?: true
    userAgent?: true
    _all?: true
  }

  export type VoteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vote to aggregate.
     */
    where?: VoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Votes to fetch.
     */
    orderBy?: VoteOrderByWithRelationInput | VoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Votes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Votes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Votes
    **/
    _count?: true | VoteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VoteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VoteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VoteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VoteMaxAggregateInputType
  }

  export type GetVoteAggregateType<T extends VoteAggregateArgs> = {
        [P in keyof T & keyof AggregateVote]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVote[P]>
      : GetScalarType<T[P], AggregateVote[P]>
  }




  export type VoteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VoteWhereInput
    orderBy?: VoteOrderByWithAggregationInput | VoteOrderByWithAggregationInput[]
    by: VoteScalarFieldEnum[] | VoteScalarFieldEnum
    having?: VoteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VoteCountAggregateInputType | true
    _avg?: VoteAvgAggregateInputType
    _sum?: VoteSumAggregateInputType
    _min?: VoteMinAggregateInputType
    _max?: VoteMaxAggregateInputType
  }

  export type VoteGroupByOutputType = {
    id: bigint
    userId: string
    electionId: bigint
    candidateId: bigint
    txHash: string | null
    castAt: Date
    sourceIp: string | null
    userAgent: string | null
    _count: VoteCountAggregateOutputType | null
    _avg: VoteAvgAggregateOutputType | null
    _sum: VoteSumAggregateOutputType | null
    _min: VoteMinAggregateOutputType | null
    _max: VoteMaxAggregateOutputType | null
  }

  type GetVoteGroupByPayload<T extends VoteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VoteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VoteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VoteGroupByOutputType[P]>
            : GetScalarType<T[P], VoteGroupByOutputType[P]>
        }
      >
    >


  export type VoteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    electionId?: boolean
    candidateId?: boolean
    txHash?: boolean
    castAt?: boolean
    sourceIp?: boolean
    userAgent?: boolean
    candidate?: boolean | CandidateDefaultArgs<ExtArgs>
    election?: boolean | ElectionDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vote"]>

  export type VoteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    electionId?: boolean
    candidateId?: boolean
    txHash?: boolean
    castAt?: boolean
    sourceIp?: boolean
    userAgent?: boolean
    candidate?: boolean | CandidateDefaultArgs<ExtArgs>
    election?: boolean | ElectionDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vote"]>

  export type VoteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    electionId?: boolean
    candidateId?: boolean
    txHash?: boolean
    castAt?: boolean
    sourceIp?: boolean
    userAgent?: boolean
    candidate?: boolean | CandidateDefaultArgs<ExtArgs>
    election?: boolean | ElectionDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vote"]>

  export type VoteSelectScalar = {
    id?: boolean
    userId?: boolean
    electionId?: boolean
    candidateId?: boolean
    txHash?: boolean
    castAt?: boolean
    sourceIp?: boolean
    userAgent?: boolean
  }

  export type VoteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "electionId" | "candidateId" | "txHash" | "castAt" | "sourceIp" | "userAgent", ExtArgs["result"]["vote"]>
  export type VoteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    candidate?: boolean | CandidateDefaultArgs<ExtArgs>
    election?: boolean | ElectionDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type VoteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    candidate?: boolean | CandidateDefaultArgs<ExtArgs>
    election?: boolean | ElectionDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type VoteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    candidate?: boolean | CandidateDefaultArgs<ExtArgs>
    election?: boolean | ElectionDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $VotePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Vote"
    objects: {
      candidate: Prisma.$CandidatePayload<ExtArgs>
      election: Prisma.$ElectionPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      userId: string
      electionId: bigint
      candidateId: bigint
      txHash: string | null
      castAt: Date
      sourceIp: string | null
      userAgent: string | null
    }, ExtArgs["result"]["vote"]>
    composites: {}
  }

  type VoteGetPayload<S extends boolean | null | undefined | VoteDefaultArgs> = $Result.GetResult<Prisma.$VotePayload, S>

  type VoteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VoteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VoteCountAggregateInputType | true
    }

  export interface VoteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Vote'], meta: { name: 'Vote' } }
    /**
     * Find zero or one Vote that matches the filter.
     * @param {VoteFindUniqueArgs} args - Arguments to find a Vote
     * @example
     * // Get one Vote
     * const vote = await prisma.vote.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VoteFindUniqueArgs>(args: SelectSubset<T, VoteFindUniqueArgs<ExtArgs>>): Prisma__VoteClient<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Vote that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VoteFindUniqueOrThrowArgs} args - Arguments to find a Vote
     * @example
     * // Get one Vote
     * const vote = await prisma.vote.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VoteFindUniqueOrThrowArgs>(args: SelectSubset<T, VoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VoteClient<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vote that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteFindFirstArgs} args - Arguments to find a Vote
     * @example
     * // Get one Vote
     * const vote = await prisma.vote.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VoteFindFirstArgs>(args?: SelectSubset<T, VoteFindFirstArgs<ExtArgs>>): Prisma__VoteClient<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vote that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteFindFirstOrThrowArgs} args - Arguments to find a Vote
     * @example
     * // Get one Vote
     * const vote = await prisma.vote.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VoteFindFirstOrThrowArgs>(args?: SelectSubset<T, VoteFindFirstOrThrowArgs<ExtArgs>>): Prisma__VoteClient<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Votes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Votes
     * const votes = await prisma.vote.findMany()
     * 
     * // Get first 10 Votes
     * const votes = await prisma.vote.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const voteWithIdOnly = await prisma.vote.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VoteFindManyArgs>(args?: SelectSubset<T, VoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Vote.
     * @param {VoteCreateArgs} args - Arguments to create a Vote.
     * @example
     * // Create one Vote
     * const Vote = await prisma.vote.create({
     *   data: {
     *     // ... data to create a Vote
     *   }
     * })
     * 
     */
    create<T extends VoteCreateArgs>(args: SelectSubset<T, VoteCreateArgs<ExtArgs>>): Prisma__VoteClient<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Votes.
     * @param {VoteCreateManyArgs} args - Arguments to create many Votes.
     * @example
     * // Create many Votes
     * const vote = await prisma.vote.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VoteCreateManyArgs>(args?: SelectSubset<T, VoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Votes and returns the data saved in the database.
     * @param {VoteCreateManyAndReturnArgs} args - Arguments to create many Votes.
     * @example
     * // Create many Votes
     * const vote = await prisma.vote.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Votes and only return the `id`
     * const voteWithIdOnly = await prisma.vote.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VoteCreateManyAndReturnArgs>(args?: SelectSubset<T, VoteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Vote.
     * @param {VoteDeleteArgs} args - Arguments to delete one Vote.
     * @example
     * // Delete one Vote
     * const Vote = await prisma.vote.delete({
     *   where: {
     *     // ... filter to delete one Vote
     *   }
     * })
     * 
     */
    delete<T extends VoteDeleteArgs>(args: SelectSubset<T, VoteDeleteArgs<ExtArgs>>): Prisma__VoteClient<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Vote.
     * @param {VoteUpdateArgs} args - Arguments to update one Vote.
     * @example
     * // Update one Vote
     * const vote = await prisma.vote.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VoteUpdateArgs>(args: SelectSubset<T, VoteUpdateArgs<ExtArgs>>): Prisma__VoteClient<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Votes.
     * @param {VoteDeleteManyArgs} args - Arguments to filter Votes to delete.
     * @example
     * // Delete a few Votes
     * const { count } = await prisma.vote.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VoteDeleteManyArgs>(args?: SelectSubset<T, VoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Votes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Votes
     * const vote = await prisma.vote.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VoteUpdateManyArgs>(args: SelectSubset<T, VoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Votes and returns the data updated in the database.
     * @param {VoteUpdateManyAndReturnArgs} args - Arguments to update many Votes.
     * @example
     * // Update many Votes
     * const vote = await prisma.vote.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Votes and only return the `id`
     * const voteWithIdOnly = await prisma.vote.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VoteUpdateManyAndReturnArgs>(args: SelectSubset<T, VoteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Vote.
     * @param {VoteUpsertArgs} args - Arguments to update or create a Vote.
     * @example
     * // Update or create a Vote
     * const vote = await prisma.vote.upsert({
     *   create: {
     *     // ... data to create a Vote
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Vote we want to update
     *   }
     * })
     */
    upsert<T extends VoteUpsertArgs>(args: SelectSubset<T, VoteUpsertArgs<ExtArgs>>): Prisma__VoteClient<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Votes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteCountArgs} args - Arguments to filter Votes to count.
     * @example
     * // Count the number of Votes
     * const count = await prisma.vote.count({
     *   where: {
     *     // ... the filter for the Votes we want to count
     *   }
     * })
    **/
    count<T extends VoteCountArgs>(
      args?: Subset<T, VoteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VoteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Vote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VoteAggregateArgs>(args: Subset<T, VoteAggregateArgs>): Prisma.PrismaPromise<GetVoteAggregateType<T>>

    /**
     * Group by Vote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VoteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VoteGroupByArgs['orderBy'] }
        : { orderBy?: VoteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Vote model
   */
  readonly fields: VoteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Vote.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VoteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    candidate<T extends CandidateDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CandidateDefaultArgs<ExtArgs>>): Prisma__CandidateClient<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    election<T extends ElectionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ElectionDefaultArgs<ExtArgs>>): Prisma__ElectionClient<$Result.GetResult<Prisma.$ElectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Vote model
   */
  interface VoteFieldRefs {
    readonly id: FieldRef<"Vote", 'BigInt'>
    readonly userId: FieldRef<"Vote", 'String'>
    readonly electionId: FieldRef<"Vote", 'BigInt'>
    readonly candidateId: FieldRef<"Vote", 'BigInt'>
    readonly txHash: FieldRef<"Vote", 'String'>
    readonly castAt: FieldRef<"Vote", 'DateTime'>
    readonly sourceIp: FieldRef<"Vote", 'String'>
    readonly userAgent: FieldRef<"Vote", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Vote findUnique
   */
  export type VoteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    /**
     * Filter, which Vote to fetch.
     */
    where: VoteWhereUniqueInput
  }

  /**
   * Vote findUniqueOrThrow
   */
  export type VoteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    /**
     * Filter, which Vote to fetch.
     */
    where: VoteWhereUniqueInput
  }

  /**
   * Vote findFirst
   */
  export type VoteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    /**
     * Filter, which Vote to fetch.
     */
    where?: VoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Votes to fetch.
     */
    orderBy?: VoteOrderByWithRelationInput | VoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Votes.
     */
    cursor?: VoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Votes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Votes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Votes.
     */
    distinct?: VoteScalarFieldEnum | VoteScalarFieldEnum[]
  }

  /**
   * Vote findFirstOrThrow
   */
  export type VoteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    /**
     * Filter, which Vote to fetch.
     */
    where?: VoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Votes to fetch.
     */
    orderBy?: VoteOrderByWithRelationInput | VoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Votes.
     */
    cursor?: VoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Votes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Votes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Votes.
     */
    distinct?: VoteScalarFieldEnum | VoteScalarFieldEnum[]
  }

  /**
   * Vote findMany
   */
  export type VoteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    /**
     * Filter, which Votes to fetch.
     */
    where?: VoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Votes to fetch.
     */
    orderBy?: VoteOrderByWithRelationInput | VoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Votes.
     */
    cursor?: VoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Votes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Votes.
     */
    skip?: number
    distinct?: VoteScalarFieldEnum | VoteScalarFieldEnum[]
  }

  /**
   * Vote create
   */
  export type VoteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    /**
     * The data needed to create a Vote.
     */
    data: XOR<VoteCreateInput, VoteUncheckedCreateInput>
  }

  /**
   * Vote createMany
   */
  export type VoteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Votes.
     */
    data: VoteCreateManyInput | VoteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Vote createManyAndReturn
   */
  export type VoteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * The data used to create many Votes.
     */
    data: VoteCreateManyInput | VoteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Vote update
   */
  export type VoteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    /**
     * The data needed to update a Vote.
     */
    data: XOR<VoteUpdateInput, VoteUncheckedUpdateInput>
    /**
     * Choose, which Vote to update.
     */
    where: VoteWhereUniqueInput
  }

  /**
   * Vote updateMany
   */
  export type VoteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Votes.
     */
    data: XOR<VoteUpdateManyMutationInput, VoteUncheckedUpdateManyInput>
    /**
     * Filter which Votes to update
     */
    where?: VoteWhereInput
    /**
     * Limit how many Votes to update.
     */
    limit?: number
  }

  /**
   * Vote updateManyAndReturn
   */
  export type VoteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * The data used to update Votes.
     */
    data: XOR<VoteUpdateManyMutationInput, VoteUncheckedUpdateManyInput>
    /**
     * Filter which Votes to update
     */
    where?: VoteWhereInput
    /**
     * Limit how many Votes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Vote upsert
   */
  export type VoteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    /**
     * The filter to search for the Vote to update in case it exists.
     */
    where: VoteWhereUniqueInput
    /**
     * In case the Vote found by the `where` argument doesn't exist, create a new Vote with this data.
     */
    create: XOR<VoteCreateInput, VoteUncheckedCreateInput>
    /**
     * In case the Vote was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VoteUpdateInput, VoteUncheckedUpdateInput>
  }

  /**
   * Vote delete
   */
  export type VoteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    /**
     * Filter which Vote to delete.
     */
    where: VoteWhereUniqueInput
  }

  /**
   * Vote deleteMany
   */
  export type VoteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Votes to delete
     */
    where?: VoteWhereInput
    /**
     * Limit how many Votes to delete.
     */
    limit?: number
  }

  /**
   * Vote without action
   */
  export type VoteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
  }


  /**
   * Model ElectionStatsCache
   */

  export type AggregateElectionStatsCache = {
    _count: ElectionStatsCacheCountAggregateOutputType | null
    _avg: ElectionStatsCacheAvgAggregateOutputType | null
    _sum: ElectionStatsCacheSumAggregateOutputType | null
    _min: ElectionStatsCacheMinAggregateOutputType | null
    _max: ElectionStatsCacheMaxAggregateOutputType | null
  }

  export type ElectionStatsCacheAvgAggregateOutputType = {
    electionId: number | null
    candidateId: number | null
    votesCount: number | null
  }

  export type ElectionStatsCacheSumAggregateOutputType = {
    electionId: bigint | null
    candidateId: bigint | null
    votesCount: bigint | null
  }

  export type ElectionStatsCacheMinAggregateOutputType = {
    electionId: bigint | null
    candidateId: bigint | null
    votesCount: bigint | null
    lastUpdatedAt: Date | null
  }

  export type ElectionStatsCacheMaxAggregateOutputType = {
    electionId: bigint | null
    candidateId: bigint | null
    votesCount: bigint | null
    lastUpdatedAt: Date | null
  }

  export type ElectionStatsCacheCountAggregateOutputType = {
    electionId: number
    candidateId: number
    votesCount: number
    lastUpdatedAt: number
    _all: number
  }


  export type ElectionStatsCacheAvgAggregateInputType = {
    electionId?: true
    candidateId?: true
    votesCount?: true
  }

  export type ElectionStatsCacheSumAggregateInputType = {
    electionId?: true
    candidateId?: true
    votesCount?: true
  }

  export type ElectionStatsCacheMinAggregateInputType = {
    electionId?: true
    candidateId?: true
    votesCount?: true
    lastUpdatedAt?: true
  }

  export type ElectionStatsCacheMaxAggregateInputType = {
    electionId?: true
    candidateId?: true
    votesCount?: true
    lastUpdatedAt?: true
  }

  export type ElectionStatsCacheCountAggregateInputType = {
    electionId?: true
    candidateId?: true
    votesCount?: true
    lastUpdatedAt?: true
    _all?: true
  }

  export type ElectionStatsCacheAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ElectionStatsCache to aggregate.
     */
    where?: ElectionStatsCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ElectionStatsCaches to fetch.
     */
    orderBy?: ElectionStatsCacheOrderByWithRelationInput | ElectionStatsCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ElectionStatsCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ElectionStatsCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ElectionStatsCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ElectionStatsCaches
    **/
    _count?: true | ElectionStatsCacheCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ElectionStatsCacheAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ElectionStatsCacheSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ElectionStatsCacheMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ElectionStatsCacheMaxAggregateInputType
  }

  export type GetElectionStatsCacheAggregateType<T extends ElectionStatsCacheAggregateArgs> = {
        [P in keyof T & keyof AggregateElectionStatsCache]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateElectionStatsCache[P]>
      : GetScalarType<T[P], AggregateElectionStatsCache[P]>
  }




  export type ElectionStatsCacheGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ElectionStatsCacheWhereInput
    orderBy?: ElectionStatsCacheOrderByWithAggregationInput | ElectionStatsCacheOrderByWithAggregationInput[]
    by: ElectionStatsCacheScalarFieldEnum[] | ElectionStatsCacheScalarFieldEnum
    having?: ElectionStatsCacheScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ElectionStatsCacheCountAggregateInputType | true
    _avg?: ElectionStatsCacheAvgAggregateInputType
    _sum?: ElectionStatsCacheSumAggregateInputType
    _min?: ElectionStatsCacheMinAggregateInputType
    _max?: ElectionStatsCacheMaxAggregateInputType
  }

  export type ElectionStatsCacheGroupByOutputType = {
    electionId: bigint
    candidateId: bigint
    votesCount: bigint
    lastUpdatedAt: Date
    _count: ElectionStatsCacheCountAggregateOutputType | null
    _avg: ElectionStatsCacheAvgAggregateOutputType | null
    _sum: ElectionStatsCacheSumAggregateOutputType | null
    _min: ElectionStatsCacheMinAggregateOutputType | null
    _max: ElectionStatsCacheMaxAggregateOutputType | null
  }

  type GetElectionStatsCacheGroupByPayload<T extends ElectionStatsCacheGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ElectionStatsCacheGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ElectionStatsCacheGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ElectionStatsCacheGroupByOutputType[P]>
            : GetScalarType<T[P], ElectionStatsCacheGroupByOutputType[P]>
        }
      >
    >


  export type ElectionStatsCacheSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    electionId?: boolean
    candidateId?: boolean
    votesCount?: boolean
    lastUpdatedAt?: boolean
    candidate?: boolean | CandidateDefaultArgs<ExtArgs>
    election?: boolean | ElectionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["electionStatsCache"]>

  export type ElectionStatsCacheSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    electionId?: boolean
    candidateId?: boolean
    votesCount?: boolean
    lastUpdatedAt?: boolean
    candidate?: boolean | CandidateDefaultArgs<ExtArgs>
    election?: boolean | ElectionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["electionStatsCache"]>

  export type ElectionStatsCacheSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    electionId?: boolean
    candidateId?: boolean
    votesCount?: boolean
    lastUpdatedAt?: boolean
    candidate?: boolean | CandidateDefaultArgs<ExtArgs>
    election?: boolean | ElectionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["electionStatsCache"]>

  export type ElectionStatsCacheSelectScalar = {
    electionId?: boolean
    candidateId?: boolean
    votesCount?: boolean
    lastUpdatedAt?: boolean
  }

  export type ElectionStatsCacheOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"electionId" | "candidateId" | "votesCount" | "lastUpdatedAt", ExtArgs["result"]["electionStatsCache"]>
  export type ElectionStatsCacheInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    candidate?: boolean | CandidateDefaultArgs<ExtArgs>
    election?: boolean | ElectionDefaultArgs<ExtArgs>
  }
  export type ElectionStatsCacheIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    candidate?: boolean | CandidateDefaultArgs<ExtArgs>
    election?: boolean | ElectionDefaultArgs<ExtArgs>
  }
  export type ElectionStatsCacheIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    candidate?: boolean | CandidateDefaultArgs<ExtArgs>
    election?: boolean | ElectionDefaultArgs<ExtArgs>
  }

  export type $ElectionStatsCachePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ElectionStatsCache"
    objects: {
      candidate: Prisma.$CandidatePayload<ExtArgs>
      election: Prisma.$ElectionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      electionId: bigint
      candidateId: bigint
      votesCount: bigint
      lastUpdatedAt: Date
    }, ExtArgs["result"]["electionStatsCache"]>
    composites: {}
  }

  type ElectionStatsCacheGetPayload<S extends boolean | null | undefined | ElectionStatsCacheDefaultArgs> = $Result.GetResult<Prisma.$ElectionStatsCachePayload, S>

  type ElectionStatsCacheCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ElectionStatsCacheFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ElectionStatsCacheCountAggregateInputType | true
    }

  export interface ElectionStatsCacheDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ElectionStatsCache'], meta: { name: 'ElectionStatsCache' } }
    /**
     * Find zero or one ElectionStatsCache that matches the filter.
     * @param {ElectionStatsCacheFindUniqueArgs} args - Arguments to find a ElectionStatsCache
     * @example
     * // Get one ElectionStatsCache
     * const electionStatsCache = await prisma.electionStatsCache.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ElectionStatsCacheFindUniqueArgs>(args: SelectSubset<T, ElectionStatsCacheFindUniqueArgs<ExtArgs>>): Prisma__ElectionStatsCacheClient<$Result.GetResult<Prisma.$ElectionStatsCachePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ElectionStatsCache that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ElectionStatsCacheFindUniqueOrThrowArgs} args - Arguments to find a ElectionStatsCache
     * @example
     * // Get one ElectionStatsCache
     * const electionStatsCache = await prisma.electionStatsCache.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ElectionStatsCacheFindUniqueOrThrowArgs>(args: SelectSubset<T, ElectionStatsCacheFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ElectionStatsCacheClient<$Result.GetResult<Prisma.$ElectionStatsCachePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ElectionStatsCache that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElectionStatsCacheFindFirstArgs} args - Arguments to find a ElectionStatsCache
     * @example
     * // Get one ElectionStatsCache
     * const electionStatsCache = await prisma.electionStatsCache.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ElectionStatsCacheFindFirstArgs>(args?: SelectSubset<T, ElectionStatsCacheFindFirstArgs<ExtArgs>>): Prisma__ElectionStatsCacheClient<$Result.GetResult<Prisma.$ElectionStatsCachePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ElectionStatsCache that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElectionStatsCacheFindFirstOrThrowArgs} args - Arguments to find a ElectionStatsCache
     * @example
     * // Get one ElectionStatsCache
     * const electionStatsCache = await prisma.electionStatsCache.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ElectionStatsCacheFindFirstOrThrowArgs>(args?: SelectSubset<T, ElectionStatsCacheFindFirstOrThrowArgs<ExtArgs>>): Prisma__ElectionStatsCacheClient<$Result.GetResult<Prisma.$ElectionStatsCachePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ElectionStatsCaches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElectionStatsCacheFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ElectionStatsCaches
     * const electionStatsCaches = await prisma.electionStatsCache.findMany()
     * 
     * // Get first 10 ElectionStatsCaches
     * const electionStatsCaches = await prisma.electionStatsCache.findMany({ take: 10 })
     * 
     * // Only select the `electionId`
     * const electionStatsCacheWithElectionIdOnly = await prisma.electionStatsCache.findMany({ select: { electionId: true } })
     * 
     */
    findMany<T extends ElectionStatsCacheFindManyArgs>(args?: SelectSubset<T, ElectionStatsCacheFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ElectionStatsCachePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ElectionStatsCache.
     * @param {ElectionStatsCacheCreateArgs} args - Arguments to create a ElectionStatsCache.
     * @example
     * // Create one ElectionStatsCache
     * const ElectionStatsCache = await prisma.electionStatsCache.create({
     *   data: {
     *     // ... data to create a ElectionStatsCache
     *   }
     * })
     * 
     */
    create<T extends ElectionStatsCacheCreateArgs>(args: SelectSubset<T, ElectionStatsCacheCreateArgs<ExtArgs>>): Prisma__ElectionStatsCacheClient<$Result.GetResult<Prisma.$ElectionStatsCachePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ElectionStatsCaches.
     * @param {ElectionStatsCacheCreateManyArgs} args - Arguments to create many ElectionStatsCaches.
     * @example
     * // Create many ElectionStatsCaches
     * const electionStatsCache = await prisma.electionStatsCache.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ElectionStatsCacheCreateManyArgs>(args?: SelectSubset<T, ElectionStatsCacheCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ElectionStatsCaches and returns the data saved in the database.
     * @param {ElectionStatsCacheCreateManyAndReturnArgs} args - Arguments to create many ElectionStatsCaches.
     * @example
     * // Create many ElectionStatsCaches
     * const electionStatsCache = await prisma.electionStatsCache.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ElectionStatsCaches and only return the `electionId`
     * const electionStatsCacheWithElectionIdOnly = await prisma.electionStatsCache.createManyAndReturn({
     *   select: { electionId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ElectionStatsCacheCreateManyAndReturnArgs>(args?: SelectSubset<T, ElectionStatsCacheCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ElectionStatsCachePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ElectionStatsCache.
     * @param {ElectionStatsCacheDeleteArgs} args - Arguments to delete one ElectionStatsCache.
     * @example
     * // Delete one ElectionStatsCache
     * const ElectionStatsCache = await prisma.electionStatsCache.delete({
     *   where: {
     *     // ... filter to delete one ElectionStatsCache
     *   }
     * })
     * 
     */
    delete<T extends ElectionStatsCacheDeleteArgs>(args: SelectSubset<T, ElectionStatsCacheDeleteArgs<ExtArgs>>): Prisma__ElectionStatsCacheClient<$Result.GetResult<Prisma.$ElectionStatsCachePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ElectionStatsCache.
     * @param {ElectionStatsCacheUpdateArgs} args - Arguments to update one ElectionStatsCache.
     * @example
     * // Update one ElectionStatsCache
     * const electionStatsCache = await prisma.electionStatsCache.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ElectionStatsCacheUpdateArgs>(args: SelectSubset<T, ElectionStatsCacheUpdateArgs<ExtArgs>>): Prisma__ElectionStatsCacheClient<$Result.GetResult<Prisma.$ElectionStatsCachePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ElectionStatsCaches.
     * @param {ElectionStatsCacheDeleteManyArgs} args - Arguments to filter ElectionStatsCaches to delete.
     * @example
     * // Delete a few ElectionStatsCaches
     * const { count } = await prisma.electionStatsCache.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ElectionStatsCacheDeleteManyArgs>(args?: SelectSubset<T, ElectionStatsCacheDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ElectionStatsCaches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElectionStatsCacheUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ElectionStatsCaches
     * const electionStatsCache = await prisma.electionStatsCache.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ElectionStatsCacheUpdateManyArgs>(args: SelectSubset<T, ElectionStatsCacheUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ElectionStatsCaches and returns the data updated in the database.
     * @param {ElectionStatsCacheUpdateManyAndReturnArgs} args - Arguments to update many ElectionStatsCaches.
     * @example
     * // Update many ElectionStatsCaches
     * const electionStatsCache = await prisma.electionStatsCache.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ElectionStatsCaches and only return the `electionId`
     * const electionStatsCacheWithElectionIdOnly = await prisma.electionStatsCache.updateManyAndReturn({
     *   select: { electionId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ElectionStatsCacheUpdateManyAndReturnArgs>(args: SelectSubset<T, ElectionStatsCacheUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ElectionStatsCachePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ElectionStatsCache.
     * @param {ElectionStatsCacheUpsertArgs} args - Arguments to update or create a ElectionStatsCache.
     * @example
     * // Update or create a ElectionStatsCache
     * const electionStatsCache = await prisma.electionStatsCache.upsert({
     *   create: {
     *     // ... data to create a ElectionStatsCache
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ElectionStatsCache we want to update
     *   }
     * })
     */
    upsert<T extends ElectionStatsCacheUpsertArgs>(args: SelectSubset<T, ElectionStatsCacheUpsertArgs<ExtArgs>>): Prisma__ElectionStatsCacheClient<$Result.GetResult<Prisma.$ElectionStatsCachePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ElectionStatsCaches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElectionStatsCacheCountArgs} args - Arguments to filter ElectionStatsCaches to count.
     * @example
     * // Count the number of ElectionStatsCaches
     * const count = await prisma.electionStatsCache.count({
     *   where: {
     *     // ... the filter for the ElectionStatsCaches we want to count
     *   }
     * })
    **/
    count<T extends ElectionStatsCacheCountArgs>(
      args?: Subset<T, ElectionStatsCacheCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ElectionStatsCacheCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ElectionStatsCache.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElectionStatsCacheAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ElectionStatsCacheAggregateArgs>(args: Subset<T, ElectionStatsCacheAggregateArgs>): Prisma.PrismaPromise<GetElectionStatsCacheAggregateType<T>>

    /**
     * Group by ElectionStatsCache.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElectionStatsCacheGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ElectionStatsCacheGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ElectionStatsCacheGroupByArgs['orderBy'] }
        : { orderBy?: ElectionStatsCacheGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ElectionStatsCacheGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetElectionStatsCacheGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ElectionStatsCache model
   */
  readonly fields: ElectionStatsCacheFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ElectionStatsCache.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ElectionStatsCacheClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    candidate<T extends CandidateDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CandidateDefaultArgs<ExtArgs>>): Prisma__CandidateClient<$Result.GetResult<Prisma.$CandidatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    election<T extends ElectionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ElectionDefaultArgs<ExtArgs>>): Prisma__ElectionClient<$Result.GetResult<Prisma.$ElectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ElectionStatsCache model
   */
  interface ElectionStatsCacheFieldRefs {
    readonly electionId: FieldRef<"ElectionStatsCache", 'BigInt'>
    readonly candidateId: FieldRef<"ElectionStatsCache", 'BigInt'>
    readonly votesCount: FieldRef<"ElectionStatsCache", 'BigInt'>
    readonly lastUpdatedAt: FieldRef<"ElectionStatsCache", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ElectionStatsCache findUnique
   */
  export type ElectionStatsCacheFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElectionStatsCache
     */
    select?: ElectionStatsCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ElectionStatsCache
     */
    omit?: ElectionStatsCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElectionStatsCacheInclude<ExtArgs> | null
    /**
     * Filter, which ElectionStatsCache to fetch.
     */
    where: ElectionStatsCacheWhereUniqueInput
  }

  /**
   * ElectionStatsCache findUniqueOrThrow
   */
  export type ElectionStatsCacheFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElectionStatsCache
     */
    select?: ElectionStatsCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ElectionStatsCache
     */
    omit?: ElectionStatsCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElectionStatsCacheInclude<ExtArgs> | null
    /**
     * Filter, which ElectionStatsCache to fetch.
     */
    where: ElectionStatsCacheWhereUniqueInput
  }

  /**
   * ElectionStatsCache findFirst
   */
  export type ElectionStatsCacheFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElectionStatsCache
     */
    select?: ElectionStatsCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ElectionStatsCache
     */
    omit?: ElectionStatsCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElectionStatsCacheInclude<ExtArgs> | null
    /**
     * Filter, which ElectionStatsCache to fetch.
     */
    where?: ElectionStatsCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ElectionStatsCaches to fetch.
     */
    orderBy?: ElectionStatsCacheOrderByWithRelationInput | ElectionStatsCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ElectionStatsCaches.
     */
    cursor?: ElectionStatsCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ElectionStatsCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ElectionStatsCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ElectionStatsCaches.
     */
    distinct?: ElectionStatsCacheScalarFieldEnum | ElectionStatsCacheScalarFieldEnum[]
  }

  /**
   * ElectionStatsCache findFirstOrThrow
   */
  export type ElectionStatsCacheFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElectionStatsCache
     */
    select?: ElectionStatsCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ElectionStatsCache
     */
    omit?: ElectionStatsCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElectionStatsCacheInclude<ExtArgs> | null
    /**
     * Filter, which ElectionStatsCache to fetch.
     */
    where?: ElectionStatsCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ElectionStatsCaches to fetch.
     */
    orderBy?: ElectionStatsCacheOrderByWithRelationInput | ElectionStatsCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ElectionStatsCaches.
     */
    cursor?: ElectionStatsCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ElectionStatsCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ElectionStatsCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ElectionStatsCaches.
     */
    distinct?: ElectionStatsCacheScalarFieldEnum | ElectionStatsCacheScalarFieldEnum[]
  }

  /**
   * ElectionStatsCache findMany
   */
  export type ElectionStatsCacheFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElectionStatsCache
     */
    select?: ElectionStatsCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ElectionStatsCache
     */
    omit?: ElectionStatsCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElectionStatsCacheInclude<ExtArgs> | null
    /**
     * Filter, which ElectionStatsCaches to fetch.
     */
    where?: ElectionStatsCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ElectionStatsCaches to fetch.
     */
    orderBy?: ElectionStatsCacheOrderByWithRelationInput | ElectionStatsCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ElectionStatsCaches.
     */
    cursor?: ElectionStatsCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ElectionStatsCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ElectionStatsCaches.
     */
    skip?: number
    distinct?: ElectionStatsCacheScalarFieldEnum | ElectionStatsCacheScalarFieldEnum[]
  }

  /**
   * ElectionStatsCache create
   */
  export type ElectionStatsCacheCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElectionStatsCache
     */
    select?: ElectionStatsCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ElectionStatsCache
     */
    omit?: ElectionStatsCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElectionStatsCacheInclude<ExtArgs> | null
    /**
     * The data needed to create a ElectionStatsCache.
     */
    data: XOR<ElectionStatsCacheCreateInput, ElectionStatsCacheUncheckedCreateInput>
  }

  /**
   * ElectionStatsCache createMany
   */
  export type ElectionStatsCacheCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ElectionStatsCaches.
     */
    data: ElectionStatsCacheCreateManyInput | ElectionStatsCacheCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ElectionStatsCache createManyAndReturn
   */
  export type ElectionStatsCacheCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElectionStatsCache
     */
    select?: ElectionStatsCacheSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ElectionStatsCache
     */
    omit?: ElectionStatsCacheOmit<ExtArgs> | null
    /**
     * The data used to create many ElectionStatsCaches.
     */
    data: ElectionStatsCacheCreateManyInput | ElectionStatsCacheCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElectionStatsCacheIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ElectionStatsCache update
   */
  export type ElectionStatsCacheUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElectionStatsCache
     */
    select?: ElectionStatsCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ElectionStatsCache
     */
    omit?: ElectionStatsCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElectionStatsCacheInclude<ExtArgs> | null
    /**
     * The data needed to update a ElectionStatsCache.
     */
    data: XOR<ElectionStatsCacheUpdateInput, ElectionStatsCacheUncheckedUpdateInput>
    /**
     * Choose, which ElectionStatsCache to update.
     */
    where: ElectionStatsCacheWhereUniqueInput
  }

  /**
   * ElectionStatsCache updateMany
   */
  export type ElectionStatsCacheUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ElectionStatsCaches.
     */
    data: XOR<ElectionStatsCacheUpdateManyMutationInput, ElectionStatsCacheUncheckedUpdateManyInput>
    /**
     * Filter which ElectionStatsCaches to update
     */
    where?: ElectionStatsCacheWhereInput
    /**
     * Limit how many ElectionStatsCaches to update.
     */
    limit?: number
  }

  /**
   * ElectionStatsCache updateManyAndReturn
   */
  export type ElectionStatsCacheUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElectionStatsCache
     */
    select?: ElectionStatsCacheSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ElectionStatsCache
     */
    omit?: ElectionStatsCacheOmit<ExtArgs> | null
    /**
     * The data used to update ElectionStatsCaches.
     */
    data: XOR<ElectionStatsCacheUpdateManyMutationInput, ElectionStatsCacheUncheckedUpdateManyInput>
    /**
     * Filter which ElectionStatsCaches to update
     */
    where?: ElectionStatsCacheWhereInput
    /**
     * Limit how many ElectionStatsCaches to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElectionStatsCacheIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ElectionStatsCache upsert
   */
  export type ElectionStatsCacheUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElectionStatsCache
     */
    select?: ElectionStatsCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ElectionStatsCache
     */
    omit?: ElectionStatsCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElectionStatsCacheInclude<ExtArgs> | null
    /**
     * The filter to search for the ElectionStatsCache to update in case it exists.
     */
    where: ElectionStatsCacheWhereUniqueInput
    /**
     * In case the ElectionStatsCache found by the `where` argument doesn't exist, create a new ElectionStatsCache with this data.
     */
    create: XOR<ElectionStatsCacheCreateInput, ElectionStatsCacheUncheckedCreateInput>
    /**
     * In case the ElectionStatsCache was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ElectionStatsCacheUpdateInput, ElectionStatsCacheUncheckedUpdateInput>
  }

  /**
   * ElectionStatsCache delete
   */
  export type ElectionStatsCacheDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElectionStatsCache
     */
    select?: ElectionStatsCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ElectionStatsCache
     */
    omit?: ElectionStatsCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElectionStatsCacheInclude<ExtArgs> | null
    /**
     * Filter which ElectionStatsCache to delete.
     */
    where: ElectionStatsCacheWhereUniqueInput
  }

  /**
   * ElectionStatsCache deleteMany
   */
  export type ElectionStatsCacheDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ElectionStatsCaches to delete
     */
    where?: ElectionStatsCacheWhereInput
    /**
     * Limit how many ElectionStatsCaches to delete.
     */
    limit?: number
  }

  /**
   * ElectionStatsCache without action
   */
  export type ElectionStatsCacheDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElectionStatsCache
     */
    select?: ElectionStatsCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ElectionStatsCache
     */
    omit?: ElectionStatsCacheOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElectionStatsCacheInclude<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _avg: AuditLogAvgAggregateOutputType | null
    _sum: AuditLogSumAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogAvgAggregateOutputType = {
    id: number | null
  }

  export type AuditLogSumAggregateOutputType = {
    id: bigint | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: bigint | null
    userId: string | null
    action: string | null
    entityType: string | null
    entityId: string | null
    createdAt: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: bigint | null
    userId: string | null
    action: string | null
    entityType: string | null
    entityId: string | null
    createdAt: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    userId: number
    action: number
    entityType: number
    entityId: number
    metadata: number
    createdAt: number
    _all: number
  }


  export type AuditLogAvgAggregateInputType = {
    id?: true
  }

  export type AuditLogSumAggregateInputType = {
    id?: true
  }

  export type AuditLogMinAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    entityType?: true
    entityId?: true
    createdAt?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    entityType?: true
    entityId?: true
    createdAt?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    entityType?: true
    entityId?: true
    metadata?: true
    createdAt?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AuditLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AuditLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _avg?: AuditLogAvgAggregateInputType
    _sum?: AuditLogSumAggregateInputType
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: bigint
    userId: string | null
    action: string
    entityType: string
    entityId: string
    metadata: JsonValue | null
    createdAt: Date
    _count: AuditLogCountAggregateOutputType | null
    _avg: AuditLogAvgAggregateOutputType | null
    _sum: AuditLogSumAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    metadata?: boolean
    createdAt?: boolean
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    metadata?: boolean
    createdAt?: boolean
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    metadata?: boolean
    createdAt?: boolean
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    userId?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    metadata?: boolean
    createdAt?: boolean
  }

  export type AuditLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "action" | "entityType" | "entityId" | "metadata" | "createdAt", ExtArgs["result"]["auditLog"]>
  export type AuditLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }
  export type AuditLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }
  export type AuditLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      userId: string | null
      action: string
      entityType: string
      entityId: string
      metadata: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs and returns the data updated in the database.
     * @param {AuditLogUpdateManyAndReturnArgs} args - Arguments to update many AuditLogs.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AuditLogUpdateManyAndReturnArgs>(args: SelectSubset<T, AuditLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends AuditLog$userArgs<ExtArgs> = {}>(args?: Subset<T, AuditLog$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditLog model
   */
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'BigInt'>
    readonly userId: FieldRef<"AuditLog", 'String'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly entityType: FieldRef<"AuditLog", 'String'>
    readonly entityId: FieldRef<"AuditLog", 'String'>
    readonly metadata: FieldRef<"AuditLog", 'Json'>
    readonly createdAt: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuditLog updateManyAndReturn
   */
  export type AuditLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to delete.
     */
    limit?: number
  }

  /**
   * AuditLog.user
   */
  export type AuditLog$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const PendudukScalarFieldEnum: {
    id: 'id',
    nik: 'nik',
    namaLengkap: 'namaLengkap',
    tanggalLahir: 'tanggalLahir',
    alamat: 'alamat',
    foto: 'foto',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PendudukScalarFieldEnum = (typeof PendudukScalarFieldEnum)[keyof typeof PendudukScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    password: 'password',
    role: 'role',
    pendudukId: 'pendudukId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    walletAddress: 'walletAddress',
    encryptedPrivateKey: 'encryptedPrivateKey'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ElectionScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    level: 'level',
    city: 'city',
    province: 'province',
    startTime: 'startTime',
    endTime: 'endTime',
    chainElectionId: 'chainElectionId',
    statusOverride: 'statusOverride',
    createdBy: 'createdBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ElectionScalarFieldEnum = (typeof ElectionScalarFieldEnum)[keyof typeof ElectionScalarFieldEnum]


  export const CandidateScalarFieldEnum: {
    id: 'id',
    electionId: 'electionId',
    name: 'name',
    party: 'party',
    description: 'description',
    photoUrl: 'photoUrl',
    orderIndex: 'orderIndex',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CandidateScalarFieldEnum = (typeof CandidateScalarFieldEnum)[keyof typeof CandidateScalarFieldEnum]


  export const VoteScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    electionId: 'electionId',
    candidateId: 'candidateId',
    txHash: 'txHash',
    castAt: 'castAt',
    sourceIp: 'sourceIp',
    userAgent: 'userAgent'
  };

  export type VoteScalarFieldEnum = (typeof VoteScalarFieldEnum)[keyof typeof VoteScalarFieldEnum]


  export const ElectionStatsCacheScalarFieldEnum: {
    electionId: 'electionId',
    candidateId: 'candidateId',
    votesCount: 'votesCount',
    lastUpdatedAt: 'lastUpdatedAt'
  };

  export type ElectionStatsCacheScalarFieldEnum = (typeof ElectionStatsCacheScalarFieldEnum)[keyof typeof ElectionStatsCacheScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    action: 'action',
    entityType: 'entityType',
    entityId: 'entityId',
    metadata: 'metadata',
    createdAt: 'createdAt'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type PendudukWhereInput = {
    AND?: PendudukWhereInput | PendudukWhereInput[]
    OR?: PendudukWhereInput[]
    NOT?: PendudukWhereInput | PendudukWhereInput[]
    id?: StringFilter<"Penduduk"> | string
    nik?: StringFilter<"Penduduk"> | string
    namaLengkap?: StringFilter<"Penduduk"> | string
    tanggalLahir?: DateTimeFilter<"Penduduk"> | Date | string
    alamat?: StringNullableFilter<"Penduduk"> | string | null
    foto?: StringNullableFilter<"Penduduk"> | string | null
    createdAt?: DateTimeFilter<"Penduduk"> | Date | string
    updatedAt?: DateTimeFilter<"Penduduk"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type PendudukOrderByWithRelationInput = {
    id?: SortOrder
    nik?: SortOrder
    namaLengkap?: SortOrder
    tanggalLahir?: SortOrder
    alamat?: SortOrderInput | SortOrder
    foto?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type PendudukWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    nik?: string
    AND?: PendudukWhereInput | PendudukWhereInput[]
    OR?: PendudukWhereInput[]
    NOT?: PendudukWhereInput | PendudukWhereInput[]
    namaLengkap?: StringFilter<"Penduduk"> | string
    tanggalLahir?: DateTimeFilter<"Penduduk"> | Date | string
    alamat?: StringNullableFilter<"Penduduk"> | string | null
    foto?: StringNullableFilter<"Penduduk"> | string | null
    createdAt?: DateTimeFilter<"Penduduk"> | Date | string
    updatedAt?: DateTimeFilter<"Penduduk"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id" | "nik">

  export type PendudukOrderByWithAggregationInput = {
    id?: SortOrder
    nik?: SortOrder
    namaLengkap?: SortOrder
    tanggalLahir?: SortOrder
    alamat?: SortOrderInput | SortOrder
    foto?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PendudukCountOrderByAggregateInput
    _max?: PendudukMaxOrderByAggregateInput
    _min?: PendudukMinOrderByAggregateInput
  }

  export type PendudukScalarWhereWithAggregatesInput = {
    AND?: PendudukScalarWhereWithAggregatesInput | PendudukScalarWhereWithAggregatesInput[]
    OR?: PendudukScalarWhereWithAggregatesInput[]
    NOT?: PendudukScalarWhereWithAggregatesInput | PendudukScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Penduduk"> | string
    nik?: StringWithAggregatesFilter<"Penduduk"> | string
    namaLengkap?: StringWithAggregatesFilter<"Penduduk"> | string
    tanggalLahir?: DateTimeWithAggregatesFilter<"Penduduk"> | Date | string
    alamat?: StringNullableWithAggregatesFilter<"Penduduk"> | string | null
    foto?: StringNullableWithAggregatesFilter<"Penduduk"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Penduduk"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Penduduk"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    pendudukId?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    walletAddress?: StringFilter<"User"> | string
    encryptedPrivateKey?: StringNullableFilter<"User"> | string | null
    penduduk?: XOR<PendudukScalarRelationFilter, PendudukWhereInput>
    auditLogs?: AuditLogListRelationFilter
    createdElections?: ElectionListRelationFilter
    votes?: VoteListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    password?: SortOrder
    role?: SortOrder
    pendudukId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    walletAddress?: SortOrder
    encryptedPrivateKey?: SortOrderInput | SortOrder
    penduduk?: PendudukOrderByWithRelationInput
    auditLogs?: AuditLogOrderByRelationAggregateInput
    createdElections?: ElectionOrderByRelationAggregateInput
    votes?: VoteOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    pendudukId?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    walletAddress?: StringFilter<"User"> | string
    encryptedPrivateKey?: StringNullableFilter<"User"> | string | null
    penduduk?: XOR<PendudukScalarRelationFilter, PendudukWhereInput>
    auditLogs?: AuditLogListRelationFilter
    createdElections?: ElectionListRelationFilter
    votes?: VoteListRelationFilter
  }, "id" | "pendudukId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    password?: SortOrder
    role?: SortOrder
    pendudukId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    walletAddress?: SortOrder
    encryptedPrivateKey?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    pendudukId?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    walletAddress?: StringWithAggregatesFilter<"User"> | string
    encryptedPrivateKey?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type ElectionWhereInput = {
    AND?: ElectionWhereInput | ElectionWhereInput[]
    OR?: ElectionWhereInput[]
    NOT?: ElectionWhereInput | ElectionWhereInput[]
    id?: BigIntFilter<"Election"> | bigint | number
    name?: StringFilter<"Election"> | string
    description?: StringFilter<"Election"> | string
    level?: StringFilter<"Election"> | string
    city?: StringNullableFilter<"Election"> | string | null
    province?: StringNullableFilter<"Election"> | string | null
    startTime?: DateTimeFilter<"Election"> | Date | string
    endTime?: DateTimeFilter<"Election"> | Date | string
    chainElectionId?: BigIntNullableFilter<"Election"> | bigint | number | null
    statusOverride?: StringNullableFilter<"Election"> | string | null
    createdBy?: StringFilter<"Election"> | string
    createdAt?: DateTimeFilter<"Election"> | Date | string
    updatedAt?: DateTimeFilter<"Election"> | Date | string
    candidates?: CandidateListRelationFilter
    electionStatsCache?: ElectionStatsCacheListRelationFilter
    creator?: XOR<UserScalarRelationFilter, UserWhereInput>
    votes?: VoteListRelationFilter
  }

  export type ElectionOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    level?: SortOrder
    city?: SortOrderInput | SortOrder
    province?: SortOrderInput | SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    chainElectionId?: SortOrderInput | SortOrder
    statusOverride?: SortOrderInput | SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    candidates?: CandidateOrderByRelationAggregateInput
    electionStatsCache?: ElectionStatsCacheOrderByRelationAggregateInput
    creator?: UserOrderByWithRelationInput
    votes?: VoteOrderByRelationAggregateInput
  }

  export type ElectionWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: ElectionWhereInput | ElectionWhereInput[]
    OR?: ElectionWhereInput[]
    NOT?: ElectionWhereInput | ElectionWhereInput[]
    name?: StringFilter<"Election"> | string
    description?: StringFilter<"Election"> | string
    level?: StringFilter<"Election"> | string
    city?: StringNullableFilter<"Election"> | string | null
    province?: StringNullableFilter<"Election"> | string | null
    startTime?: DateTimeFilter<"Election"> | Date | string
    endTime?: DateTimeFilter<"Election"> | Date | string
    chainElectionId?: BigIntNullableFilter<"Election"> | bigint | number | null
    statusOverride?: StringNullableFilter<"Election"> | string | null
    createdBy?: StringFilter<"Election"> | string
    createdAt?: DateTimeFilter<"Election"> | Date | string
    updatedAt?: DateTimeFilter<"Election"> | Date | string
    candidates?: CandidateListRelationFilter
    electionStatsCache?: ElectionStatsCacheListRelationFilter
    creator?: XOR<UserScalarRelationFilter, UserWhereInput>
    votes?: VoteListRelationFilter
  }, "id">

  export type ElectionOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    level?: SortOrder
    city?: SortOrderInput | SortOrder
    province?: SortOrderInput | SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    chainElectionId?: SortOrderInput | SortOrder
    statusOverride?: SortOrderInput | SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ElectionCountOrderByAggregateInput
    _avg?: ElectionAvgOrderByAggregateInput
    _max?: ElectionMaxOrderByAggregateInput
    _min?: ElectionMinOrderByAggregateInput
    _sum?: ElectionSumOrderByAggregateInput
  }

  export type ElectionScalarWhereWithAggregatesInput = {
    AND?: ElectionScalarWhereWithAggregatesInput | ElectionScalarWhereWithAggregatesInput[]
    OR?: ElectionScalarWhereWithAggregatesInput[]
    NOT?: ElectionScalarWhereWithAggregatesInput | ElectionScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"Election"> | bigint | number
    name?: StringWithAggregatesFilter<"Election"> | string
    description?: StringWithAggregatesFilter<"Election"> | string
    level?: StringWithAggregatesFilter<"Election"> | string
    city?: StringNullableWithAggregatesFilter<"Election"> | string | null
    province?: StringNullableWithAggregatesFilter<"Election"> | string | null
    startTime?: DateTimeWithAggregatesFilter<"Election"> | Date | string
    endTime?: DateTimeWithAggregatesFilter<"Election"> | Date | string
    chainElectionId?: BigIntNullableWithAggregatesFilter<"Election"> | bigint | number | null
    statusOverride?: StringNullableWithAggregatesFilter<"Election"> | string | null
    createdBy?: StringWithAggregatesFilter<"Election"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Election"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Election"> | Date | string
  }

  export type CandidateWhereInput = {
    AND?: CandidateWhereInput | CandidateWhereInput[]
    OR?: CandidateWhereInput[]
    NOT?: CandidateWhereInput | CandidateWhereInput[]
    id?: BigIntFilter<"Candidate"> | bigint | number
    electionId?: BigIntFilter<"Candidate"> | bigint | number
    name?: StringFilter<"Candidate"> | string
    party?: StringFilter<"Candidate"> | string
    description?: StringNullableFilter<"Candidate"> | string | null
    photoUrl?: StringNullableFilter<"Candidate"> | string | null
    orderIndex?: IntFilter<"Candidate"> | number
    createdAt?: DateTimeFilter<"Candidate"> | Date | string
    updatedAt?: DateTimeFilter<"Candidate"> | Date | string
    election?: XOR<ElectionScalarRelationFilter, ElectionWhereInput>
    electionStatsCache?: ElectionStatsCacheListRelationFilter
    votes?: VoteListRelationFilter
  }

  export type CandidateOrderByWithRelationInput = {
    id?: SortOrder
    electionId?: SortOrder
    name?: SortOrder
    party?: SortOrder
    description?: SortOrderInput | SortOrder
    photoUrl?: SortOrderInput | SortOrder
    orderIndex?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    election?: ElectionOrderByWithRelationInput
    electionStatsCache?: ElectionStatsCacheOrderByRelationAggregateInput
    votes?: VoteOrderByRelationAggregateInput
  }

  export type CandidateWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: CandidateWhereInput | CandidateWhereInput[]
    OR?: CandidateWhereInput[]
    NOT?: CandidateWhereInput | CandidateWhereInput[]
    electionId?: BigIntFilter<"Candidate"> | bigint | number
    name?: StringFilter<"Candidate"> | string
    party?: StringFilter<"Candidate"> | string
    description?: StringNullableFilter<"Candidate"> | string | null
    photoUrl?: StringNullableFilter<"Candidate"> | string | null
    orderIndex?: IntFilter<"Candidate"> | number
    createdAt?: DateTimeFilter<"Candidate"> | Date | string
    updatedAt?: DateTimeFilter<"Candidate"> | Date | string
    election?: XOR<ElectionScalarRelationFilter, ElectionWhereInput>
    electionStatsCache?: ElectionStatsCacheListRelationFilter
    votes?: VoteListRelationFilter
  }, "id">

  export type CandidateOrderByWithAggregationInput = {
    id?: SortOrder
    electionId?: SortOrder
    name?: SortOrder
    party?: SortOrder
    description?: SortOrderInput | SortOrder
    photoUrl?: SortOrderInput | SortOrder
    orderIndex?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CandidateCountOrderByAggregateInput
    _avg?: CandidateAvgOrderByAggregateInput
    _max?: CandidateMaxOrderByAggregateInput
    _min?: CandidateMinOrderByAggregateInput
    _sum?: CandidateSumOrderByAggregateInput
  }

  export type CandidateScalarWhereWithAggregatesInput = {
    AND?: CandidateScalarWhereWithAggregatesInput | CandidateScalarWhereWithAggregatesInput[]
    OR?: CandidateScalarWhereWithAggregatesInput[]
    NOT?: CandidateScalarWhereWithAggregatesInput | CandidateScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"Candidate"> | bigint | number
    electionId?: BigIntWithAggregatesFilter<"Candidate"> | bigint | number
    name?: StringWithAggregatesFilter<"Candidate"> | string
    party?: StringWithAggregatesFilter<"Candidate"> | string
    description?: StringNullableWithAggregatesFilter<"Candidate"> | string | null
    photoUrl?: StringNullableWithAggregatesFilter<"Candidate"> | string | null
    orderIndex?: IntWithAggregatesFilter<"Candidate"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Candidate"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Candidate"> | Date | string
  }

  export type VoteWhereInput = {
    AND?: VoteWhereInput | VoteWhereInput[]
    OR?: VoteWhereInput[]
    NOT?: VoteWhereInput | VoteWhereInput[]
    id?: BigIntFilter<"Vote"> | bigint | number
    userId?: StringFilter<"Vote"> | string
    electionId?: BigIntFilter<"Vote"> | bigint | number
    candidateId?: BigIntFilter<"Vote"> | bigint | number
    txHash?: StringNullableFilter<"Vote"> | string | null
    castAt?: DateTimeFilter<"Vote"> | Date | string
    sourceIp?: StringNullableFilter<"Vote"> | string | null
    userAgent?: StringNullableFilter<"Vote"> | string | null
    candidate?: XOR<CandidateScalarRelationFilter, CandidateWhereInput>
    election?: XOR<ElectionScalarRelationFilter, ElectionWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type VoteOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    electionId?: SortOrder
    candidateId?: SortOrder
    txHash?: SortOrderInput | SortOrder
    castAt?: SortOrder
    sourceIp?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    candidate?: CandidateOrderByWithRelationInput
    election?: ElectionOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type VoteWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    userId_electionId?: VoteUserIdElectionIdCompoundUniqueInput
    AND?: VoteWhereInput | VoteWhereInput[]
    OR?: VoteWhereInput[]
    NOT?: VoteWhereInput | VoteWhereInput[]
    userId?: StringFilter<"Vote"> | string
    electionId?: BigIntFilter<"Vote"> | bigint | number
    candidateId?: BigIntFilter<"Vote"> | bigint | number
    txHash?: StringNullableFilter<"Vote"> | string | null
    castAt?: DateTimeFilter<"Vote"> | Date | string
    sourceIp?: StringNullableFilter<"Vote"> | string | null
    userAgent?: StringNullableFilter<"Vote"> | string | null
    candidate?: XOR<CandidateScalarRelationFilter, CandidateWhereInput>
    election?: XOR<ElectionScalarRelationFilter, ElectionWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_electionId">

  export type VoteOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    electionId?: SortOrder
    candidateId?: SortOrder
    txHash?: SortOrderInput | SortOrder
    castAt?: SortOrder
    sourceIp?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    _count?: VoteCountOrderByAggregateInput
    _avg?: VoteAvgOrderByAggregateInput
    _max?: VoteMaxOrderByAggregateInput
    _min?: VoteMinOrderByAggregateInput
    _sum?: VoteSumOrderByAggregateInput
  }

  export type VoteScalarWhereWithAggregatesInput = {
    AND?: VoteScalarWhereWithAggregatesInput | VoteScalarWhereWithAggregatesInput[]
    OR?: VoteScalarWhereWithAggregatesInput[]
    NOT?: VoteScalarWhereWithAggregatesInput | VoteScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"Vote"> | bigint | number
    userId?: StringWithAggregatesFilter<"Vote"> | string
    electionId?: BigIntWithAggregatesFilter<"Vote"> | bigint | number
    candidateId?: BigIntWithAggregatesFilter<"Vote"> | bigint | number
    txHash?: StringNullableWithAggregatesFilter<"Vote"> | string | null
    castAt?: DateTimeWithAggregatesFilter<"Vote"> | Date | string
    sourceIp?: StringNullableWithAggregatesFilter<"Vote"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"Vote"> | string | null
  }

  export type ElectionStatsCacheWhereInput = {
    AND?: ElectionStatsCacheWhereInput | ElectionStatsCacheWhereInput[]
    OR?: ElectionStatsCacheWhereInput[]
    NOT?: ElectionStatsCacheWhereInput | ElectionStatsCacheWhereInput[]
    electionId?: BigIntFilter<"ElectionStatsCache"> | bigint | number
    candidateId?: BigIntFilter<"ElectionStatsCache"> | bigint | number
    votesCount?: BigIntFilter<"ElectionStatsCache"> | bigint | number
    lastUpdatedAt?: DateTimeFilter<"ElectionStatsCache"> | Date | string
    candidate?: XOR<CandidateScalarRelationFilter, CandidateWhereInput>
    election?: XOR<ElectionScalarRelationFilter, ElectionWhereInput>
  }

  export type ElectionStatsCacheOrderByWithRelationInput = {
    electionId?: SortOrder
    candidateId?: SortOrder
    votesCount?: SortOrder
    lastUpdatedAt?: SortOrder
    candidate?: CandidateOrderByWithRelationInput
    election?: ElectionOrderByWithRelationInput
  }

  export type ElectionStatsCacheWhereUniqueInput = Prisma.AtLeast<{
    electionId_candidateId?: ElectionStatsCacheElectionIdCandidateIdCompoundUniqueInput
    AND?: ElectionStatsCacheWhereInput | ElectionStatsCacheWhereInput[]
    OR?: ElectionStatsCacheWhereInput[]
    NOT?: ElectionStatsCacheWhereInput | ElectionStatsCacheWhereInput[]
    electionId?: BigIntFilter<"ElectionStatsCache"> | bigint | number
    candidateId?: BigIntFilter<"ElectionStatsCache"> | bigint | number
    votesCount?: BigIntFilter<"ElectionStatsCache"> | bigint | number
    lastUpdatedAt?: DateTimeFilter<"ElectionStatsCache"> | Date | string
    candidate?: XOR<CandidateScalarRelationFilter, CandidateWhereInput>
    election?: XOR<ElectionScalarRelationFilter, ElectionWhereInput>
  }, "electionId_candidateId">

  export type ElectionStatsCacheOrderByWithAggregationInput = {
    electionId?: SortOrder
    candidateId?: SortOrder
    votesCount?: SortOrder
    lastUpdatedAt?: SortOrder
    _count?: ElectionStatsCacheCountOrderByAggregateInput
    _avg?: ElectionStatsCacheAvgOrderByAggregateInput
    _max?: ElectionStatsCacheMaxOrderByAggregateInput
    _min?: ElectionStatsCacheMinOrderByAggregateInput
    _sum?: ElectionStatsCacheSumOrderByAggregateInput
  }

  export type ElectionStatsCacheScalarWhereWithAggregatesInput = {
    AND?: ElectionStatsCacheScalarWhereWithAggregatesInput | ElectionStatsCacheScalarWhereWithAggregatesInput[]
    OR?: ElectionStatsCacheScalarWhereWithAggregatesInput[]
    NOT?: ElectionStatsCacheScalarWhereWithAggregatesInput | ElectionStatsCacheScalarWhereWithAggregatesInput[]
    electionId?: BigIntWithAggregatesFilter<"ElectionStatsCache"> | bigint | number
    candidateId?: BigIntWithAggregatesFilter<"ElectionStatsCache"> | bigint | number
    votesCount?: BigIntWithAggregatesFilter<"ElectionStatsCache"> | bigint | number
    lastUpdatedAt?: DateTimeWithAggregatesFilter<"ElectionStatsCache"> | Date | string
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: BigIntFilter<"AuditLog"> | bigint | number
    userId?: StringNullableFilter<"AuditLog"> | string | null
    action?: StringFilter<"AuditLog"> | string
    entityType?: StringFilter<"AuditLog"> | string
    entityId?: StringFilter<"AuditLog"> | string
    metadata?: JsonNullableFilter<"AuditLog">
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    userId?: StringNullableFilter<"AuditLog"> | string | null
    action?: StringFilter<"AuditLog"> | string
    entityType?: StringFilter<"AuditLog"> | string
    entityId?: StringFilter<"AuditLog"> | string
    metadata?: JsonNullableFilter<"AuditLog">
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _avg?: AuditLogAvgOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
    _sum?: AuditLogSumOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"AuditLog"> | bigint | number
    userId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    entityType?: StringWithAggregatesFilter<"AuditLog"> | string
    entityId?: StringWithAggregatesFilter<"AuditLog"> | string
    metadata?: JsonNullableWithAggregatesFilter<"AuditLog">
    createdAt?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type PendudukCreateInput = {
    id?: string
    nik: string
    namaLengkap: string
    tanggalLahir: Date | string
    alamat?: string | null
    foto?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutPendudukInput
  }

  export type PendudukUncheckedCreateInput = {
    id?: string
    nik: string
    namaLengkap: string
    tanggalLahir: Date | string
    alamat?: string | null
    foto?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserUncheckedCreateNestedOneWithoutPendudukInput
  }

  export type PendudukUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nik?: StringFieldUpdateOperationsInput | string
    namaLengkap?: StringFieldUpdateOperationsInput | string
    tanggalLahir?: DateTimeFieldUpdateOperationsInput | Date | string
    alamat?: NullableStringFieldUpdateOperationsInput | string | null
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutPendudukNestedInput
  }

  export type PendudukUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nik?: StringFieldUpdateOperationsInput | string
    namaLengkap?: StringFieldUpdateOperationsInput | string
    tanggalLahir?: DateTimeFieldUpdateOperationsInput | Date | string
    alamat?: NullableStringFieldUpdateOperationsInput | string | null
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUncheckedUpdateOneWithoutPendudukNestedInput
  }

  export type PendudukCreateManyInput = {
    id?: string
    nik: string
    namaLengkap: string
    tanggalLahir: Date | string
    alamat?: string | null
    foto?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PendudukUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nik?: StringFieldUpdateOperationsInput | string
    namaLengkap?: StringFieldUpdateOperationsInput | string
    tanggalLahir?: DateTimeFieldUpdateOperationsInput | Date | string
    alamat?: NullableStringFieldUpdateOperationsInput | string | null
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PendudukUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nik?: StringFieldUpdateOperationsInput | string
    namaLengkap?: StringFieldUpdateOperationsInput | string
    tanggalLahir?: DateTimeFieldUpdateOperationsInput | Date | string
    alamat?: NullableStringFieldUpdateOperationsInput | string | null
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    walletAddress: string
    encryptedPrivateKey?: string | null
    penduduk: PendudukCreateNestedOneWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
    createdElections?: ElectionCreateNestedManyWithoutCreatorInput
    votes?: VoteCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    password: string
    role?: $Enums.Role
    pendudukId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    walletAddress: string
    encryptedPrivateKey?: string | null
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
    createdElections?: ElectionUncheckedCreateNestedManyWithoutCreatorInput
    votes?: VoteUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    encryptedPrivateKey?: NullableStringFieldUpdateOperationsInput | string | null
    penduduk?: PendudukUpdateOneRequiredWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
    createdElections?: ElectionUpdateManyWithoutCreatorNestedInput
    votes?: VoteUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    pendudukId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    encryptedPrivateKey?: NullableStringFieldUpdateOperationsInput | string | null
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
    createdElections?: ElectionUncheckedUpdateManyWithoutCreatorNestedInput
    votes?: VoteUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    password: string
    role?: $Enums.Role
    pendudukId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    walletAddress: string
    encryptedPrivateKey?: string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    encryptedPrivateKey?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    pendudukId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    encryptedPrivateKey?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ElectionCreateInput = {
    id?: bigint | number
    name: string
    description: string
    level: string
    city?: string | null
    province?: string | null
    startTime: Date | string
    endTime: Date | string
    chainElectionId?: bigint | number | null
    statusOverride?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    candidates?: CandidateCreateNestedManyWithoutElectionInput
    electionStatsCache?: ElectionStatsCacheCreateNestedManyWithoutElectionInput
    creator: UserCreateNestedOneWithoutCreatedElectionsInput
    votes?: VoteCreateNestedManyWithoutElectionInput
  }

  export type ElectionUncheckedCreateInput = {
    id?: bigint | number
    name: string
    description: string
    level: string
    city?: string | null
    province?: string | null
    startTime: Date | string
    endTime: Date | string
    chainElectionId?: bigint | number | null
    statusOverride?: string | null
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
    candidates?: CandidateUncheckedCreateNestedManyWithoutElectionInput
    electionStatsCache?: ElectionStatsCacheUncheckedCreateNestedManyWithoutElectionInput
    votes?: VoteUncheckedCreateNestedManyWithoutElectionInput
  }

  export type ElectionUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    chainElectionId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    statusOverride?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    candidates?: CandidateUpdateManyWithoutElectionNestedInput
    electionStatsCache?: ElectionStatsCacheUpdateManyWithoutElectionNestedInput
    creator?: UserUpdateOneRequiredWithoutCreatedElectionsNestedInput
    votes?: VoteUpdateManyWithoutElectionNestedInput
  }

  export type ElectionUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    chainElectionId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    statusOverride?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    candidates?: CandidateUncheckedUpdateManyWithoutElectionNestedInput
    electionStatsCache?: ElectionStatsCacheUncheckedUpdateManyWithoutElectionNestedInput
    votes?: VoteUncheckedUpdateManyWithoutElectionNestedInput
  }

  export type ElectionCreateManyInput = {
    id?: bigint | number
    name: string
    description: string
    level: string
    city?: string | null
    province?: string | null
    startTime: Date | string
    endTime: Date | string
    chainElectionId?: bigint | number | null
    statusOverride?: string | null
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ElectionUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    chainElectionId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    statusOverride?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ElectionUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    chainElectionId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    statusOverride?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CandidateCreateInput = {
    id?: bigint | number
    name: string
    party: string
    description?: string | null
    photoUrl?: string | null
    orderIndex: number
    createdAt?: Date | string
    updatedAt?: Date | string
    election: ElectionCreateNestedOneWithoutCandidatesInput
    electionStatsCache?: ElectionStatsCacheCreateNestedManyWithoutCandidateInput
    votes?: VoteCreateNestedManyWithoutCandidateInput
  }

  export type CandidateUncheckedCreateInput = {
    id?: bigint | number
    electionId: bigint | number
    name: string
    party: string
    description?: string | null
    photoUrl?: string | null
    orderIndex: number
    createdAt?: Date | string
    updatedAt?: Date | string
    electionStatsCache?: ElectionStatsCacheUncheckedCreateNestedManyWithoutCandidateInput
    votes?: VoteUncheckedCreateNestedManyWithoutCandidateInput
  }

  export type CandidateUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    party?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    election?: ElectionUpdateOneRequiredWithoutCandidatesNestedInput
    electionStatsCache?: ElectionStatsCacheUpdateManyWithoutCandidateNestedInput
    votes?: VoteUpdateManyWithoutCandidateNestedInput
  }

  export type CandidateUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    electionId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    party?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    electionStatsCache?: ElectionStatsCacheUncheckedUpdateManyWithoutCandidateNestedInput
    votes?: VoteUncheckedUpdateManyWithoutCandidateNestedInput
  }

  export type CandidateCreateManyInput = {
    id?: bigint | number
    electionId: bigint | number
    name: string
    party: string
    description?: string | null
    photoUrl?: string | null
    orderIndex: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CandidateUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    party?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CandidateUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    electionId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    party?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoteCreateInput = {
    id?: bigint | number
    txHash?: string | null
    castAt?: Date | string
    sourceIp?: string | null
    userAgent?: string | null
    candidate: CandidateCreateNestedOneWithoutVotesInput
    election: ElectionCreateNestedOneWithoutVotesInput
    user: UserCreateNestedOneWithoutVotesInput
  }

  export type VoteUncheckedCreateInput = {
    id?: bigint | number
    userId: string
    electionId: bigint | number
    candidateId: bigint | number
    txHash?: string | null
    castAt?: Date | string
    sourceIp?: string | null
    userAgent?: string | null
  }

  export type VoteUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    castAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sourceIp?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    candidate?: CandidateUpdateOneRequiredWithoutVotesNestedInput
    election?: ElectionUpdateOneRequiredWithoutVotesNestedInput
    user?: UserUpdateOneRequiredWithoutVotesNestedInput
  }

  export type VoteUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: StringFieldUpdateOperationsInput | string
    electionId?: BigIntFieldUpdateOperationsInput | bigint | number
    candidateId?: BigIntFieldUpdateOperationsInput | bigint | number
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    castAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sourceIp?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type VoteCreateManyInput = {
    id?: bigint | number
    userId: string
    electionId: bigint | number
    candidateId: bigint | number
    txHash?: string | null
    castAt?: Date | string
    sourceIp?: string | null
    userAgent?: string | null
  }

  export type VoteUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    castAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sourceIp?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type VoteUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: StringFieldUpdateOperationsInput | string
    electionId?: BigIntFieldUpdateOperationsInput | bigint | number
    candidateId?: BigIntFieldUpdateOperationsInput | bigint | number
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    castAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sourceIp?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ElectionStatsCacheCreateInput = {
    votesCount?: bigint | number
    lastUpdatedAt?: Date | string
    candidate: CandidateCreateNestedOneWithoutElectionStatsCacheInput
    election: ElectionCreateNestedOneWithoutElectionStatsCacheInput
  }

  export type ElectionStatsCacheUncheckedCreateInput = {
    electionId: bigint | number
    candidateId: bigint | number
    votesCount?: bigint | number
    lastUpdatedAt?: Date | string
  }

  export type ElectionStatsCacheUpdateInput = {
    votesCount?: BigIntFieldUpdateOperationsInput | bigint | number
    lastUpdatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    candidate?: CandidateUpdateOneRequiredWithoutElectionStatsCacheNestedInput
    election?: ElectionUpdateOneRequiredWithoutElectionStatsCacheNestedInput
  }

  export type ElectionStatsCacheUncheckedUpdateInput = {
    electionId?: BigIntFieldUpdateOperationsInput | bigint | number
    candidateId?: BigIntFieldUpdateOperationsInput | bigint | number
    votesCount?: BigIntFieldUpdateOperationsInput | bigint | number
    lastUpdatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ElectionStatsCacheCreateManyInput = {
    electionId: bigint | number
    candidateId: bigint | number
    votesCount?: bigint | number
    lastUpdatedAt?: Date | string
  }

  export type ElectionStatsCacheUpdateManyMutationInput = {
    votesCount?: BigIntFieldUpdateOperationsInput | bigint | number
    lastUpdatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ElectionStatsCacheUncheckedUpdateManyInput = {
    electionId?: BigIntFieldUpdateOperationsInput | bigint | number
    candidateId?: BigIntFieldUpdateOperationsInput | bigint | number
    votesCount?: BigIntFieldUpdateOperationsInput | bigint | number
    lastUpdatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateInput = {
    id?: bigint | number
    action: string
    entityType: string
    entityId: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditLogUncheckedCreateInput = {
    id?: bigint | number
    userId?: string | null
    action: string
    entityType: string
    entityId: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AuditLogUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: bigint | number
    userId?: string | null
    action: string
    entityType: string
    entityId: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PendudukCountOrderByAggregateInput = {
    id?: SortOrder
    nik?: SortOrder
    namaLengkap?: SortOrder
    tanggalLahir?: SortOrder
    alamat?: SortOrder
    foto?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PendudukMaxOrderByAggregateInput = {
    id?: SortOrder
    nik?: SortOrder
    namaLengkap?: SortOrder
    tanggalLahir?: SortOrder
    alamat?: SortOrder
    foto?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PendudukMinOrderByAggregateInput = {
    id?: SortOrder
    nik?: SortOrder
    namaLengkap?: SortOrder
    tanggalLahir?: SortOrder
    alamat?: SortOrder
    foto?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type PendudukScalarRelationFilter = {
    is?: PendudukWhereInput
    isNot?: PendudukWhereInput
  }

  export type AuditLogListRelationFilter = {
    every?: AuditLogWhereInput
    some?: AuditLogWhereInput
    none?: AuditLogWhereInput
  }

  export type ElectionListRelationFilter = {
    every?: ElectionWhereInput
    some?: ElectionWhereInput
    none?: ElectionWhereInput
  }

  export type VoteListRelationFilter = {
    every?: VoteWhereInput
    some?: VoteWhereInput
    none?: VoteWhereInput
  }

  export type AuditLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ElectionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VoteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    password?: SortOrder
    role?: SortOrder
    pendudukId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    walletAddress?: SortOrder
    encryptedPrivateKey?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    password?: SortOrder
    role?: SortOrder
    pendudukId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    walletAddress?: SortOrder
    encryptedPrivateKey?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    password?: SortOrder
    role?: SortOrder
    pendudukId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    walletAddress?: SortOrder
    encryptedPrivateKey?: SortOrder
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type BigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type CandidateListRelationFilter = {
    every?: CandidateWhereInput
    some?: CandidateWhereInput
    none?: CandidateWhereInput
  }

  export type ElectionStatsCacheListRelationFilter = {
    every?: ElectionStatsCacheWhereInput
    some?: ElectionStatsCacheWhereInput
    none?: ElectionStatsCacheWhereInput
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type CandidateOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ElectionStatsCacheOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ElectionCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    level?: SortOrder
    city?: SortOrder
    province?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    chainElectionId?: SortOrder
    statusOverride?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ElectionAvgOrderByAggregateInput = {
    id?: SortOrder
    chainElectionId?: SortOrder
  }

  export type ElectionMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    level?: SortOrder
    city?: SortOrder
    province?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    chainElectionId?: SortOrder
    statusOverride?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ElectionMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    level?: SortOrder
    city?: SortOrder
    province?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    chainElectionId?: SortOrder
    statusOverride?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ElectionSumOrderByAggregateInput = {
    id?: SortOrder
    chainElectionId?: SortOrder
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type BigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type ElectionScalarRelationFilter = {
    is?: ElectionWhereInput
    isNot?: ElectionWhereInput
  }

  export type CandidateCountOrderByAggregateInput = {
    id?: SortOrder
    electionId?: SortOrder
    name?: SortOrder
    party?: SortOrder
    description?: SortOrder
    photoUrl?: SortOrder
    orderIndex?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CandidateAvgOrderByAggregateInput = {
    id?: SortOrder
    electionId?: SortOrder
    orderIndex?: SortOrder
  }

  export type CandidateMaxOrderByAggregateInput = {
    id?: SortOrder
    electionId?: SortOrder
    name?: SortOrder
    party?: SortOrder
    description?: SortOrder
    photoUrl?: SortOrder
    orderIndex?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CandidateMinOrderByAggregateInput = {
    id?: SortOrder
    electionId?: SortOrder
    name?: SortOrder
    party?: SortOrder
    description?: SortOrder
    photoUrl?: SortOrder
    orderIndex?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CandidateSumOrderByAggregateInput = {
    id?: SortOrder
    electionId?: SortOrder
    orderIndex?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type CandidateScalarRelationFilter = {
    is?: CandidateWhereInput
    isNot?: CandidateWhereInput
  }

  export type VoteUserIdElectionIdCompoundUniqueInput = {
    userId: string
    electionId: bigint | number
  }

  export type VoteCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    electionId?: SortOrder
    candidateId?: SortOrder
    txHash?: SortOrder
    castAt?: SortOrder
    sourceIp?: SortOrder
    userAgent?: SortOrder
  }

  export type VoteAvgOrderByAggregateInput = {
    id?: SortOrder
    electionId?: SortOrder
    candidateId?: SortOrder
  }

  export type VoteMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    electionId?: SortOrder
    candidateId?: SortOrder
    txHash?: SortOrder
    castAt?: SortOrder
    sourceIp?: SortOrder
    userAgent?: SortOrder
  }

  export type VoteMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    electionId?: SortOrder
    candidateId?: SortOrder
    txHash?: SortOrder
    castAt?: SortOrder
    sourceIp?: SortOrder
    userAgent?: SortOrder
  }

  export type VoteSumOrderByAggregateInput = {
    id?: SortOrder
    electionId?: SortOrder
    candidateId?: SortOrder
  }

  export type ElectionStatsCacheElectionIdCandidateIdCompoundUniqueInput = {
    electionId: bigint | number
    candidateId: bigint | number
  }

  export type ElectionStatsCacheCountOrderByAggregateInput = {
    electionId?: SortOrder
    candidateId?: SortOrder
    votesCount?: SortOrder
    lastUpdatedAt?: SortOrder
  }

  export type ElectionStatsCacheAvgOrderByAggregateInput = {
    electionId?: SortOrder
    candidateId?: SortOrder
    votesCount?: SortOrder
  }

  export type ElectionStatsCacheMaxOrderByAggregateInput = {
    electionId?: SortOrder
    candidateId?: SortOrder
    votesCount?: SortOrder
    lastUpdatedAt?: SortOrder
  }

  export type ElectionStatsCacheMinOrderByAggregateInput = {
    electionId?: SortOrder
    candidateId?: SortOrder
    votesCount?: SortOrder
    lastUpdatedAt?: SortOrder
  }

  export type ElectionStatsCacheSumOrderByAggregateInput = {
    electionId?: SortOrder
    candidateId?: SortOrder
    votesCount?: SortOrder
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogSumOrderByAggregateInput = {
    id?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type UserCreateNestedOneWithoutPendudukInput = {
    create?: XOR<UserCreateWithoutPendudukInput, UserUncheckedCreateWithoutPendudukInput>
    connectOrCreate?: UserCreateOrConnectWithoutPendudukInput
    connect?: UserWhereUniqueInput
  }

  export type UserUncheckedCreateNestedOneWithoutPendudukInput = {
    create?: XOR<UserCreateWithoutPendudukInput, UserUncheckedCreateWithoutPendudukInput>
    connectOrCreate?: UserCreateOrConnectWithoutPendudukInput
    connect?: UserWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type UserUpdateOneWithoutPendudukNestedInput = {
    create?: XOR<UserCreateWithoutPendudukInput, UserUncheckedCreateWithoutPendudukInput>
    connectOrCreate?: UserCreateOrConnectWithoutPendudukInput
    upsert?: UserUpsertWithoutPendudukInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPendudukInput, UserUpdateWithoutPendudukInput>, UserUncheckedUpdateWithoutPendudukInput>
  }

  export type UserUncheckedUpdateOneWithoutPendudukNestedInput = {
    create?: XOR<UserCreateWithoutPendudukInput, UserUncheckedCreateWithoutPendudukInput>
    connectOrCreate?: UserCreateOrConnectWithoutPendudukInput
    upsert?: UserUpsertWithoutPendudukInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPendudukInput, UserUpdateWithoutPendudukInput>, UserUncheckedUpdateWithoutPendudukInput>
  }

  export type PendudukCreateNestedOneWithoutUserInput = {
    create?: XOR<PendudukCreateWithoutUserInput, PendudukUncheckedCreateWithoutUserInput>
    connectOrCreate?: PendudukCreateOrConnectWithoutUserInput
    connect?: PendudukWhereUniqueInput
  }

  export type AuditLogCreateNestedManyWithoutUserInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type ElectionCreateNestedManyWithoutCreatorInput = {
    create?: XOR<ElectionCreateWithoutCreatorInput, ElectionUncheckedCreateWithoutCreatorInput> | ElectionCreateWithoutCreatorInput[] | ElectionUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: ElectionCreateOrConnectWithoutCreatorInput | ElectionCreateOrConnectWithoutCreatorInput[]
    createMany?: ElectionCreateManyCreatorInputEnvelope
    connect?: ElectionWhereUniqueInput | ElectionWhereUniqueInput[]
  }

  export type VoteCreateNestedManyWithoutUserInput = {
    create?: XOR<VoteCreateWithoutUserInput, VoteUncheckedCreateWithoutUserInput> | VoteCreateWithoutUserInput[] | VoteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VoteCreateOrConnectWithoutUserInput | VoteCreateOrConnectWithoutUserInput[]
    createMany?: VoteCreateManyUserInputEnvelope
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type ElectionUncheckedCreateNestedManyWithoutCreatorInput = {
    create?: XOR<ElectionCreateWithoutCreatorInput, ElectionUncheckedCreateWithoutCreatorInput> | ElectionCreateWithoutCreatorInput[] | ElectionUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: ElectionCreateOrConnectWithoutCreatorInput | ElectionCreateOrConnectWithoutCreatorInput[]
    createMany?: ElectionCreateManyCreatorInputEnvelope
    connect?: ElectionWhereUniqueInput | ElectionWhereUniqueInput[]
  }

  export type VoteUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<VoteCreateWithoutUserInput, VoteUncheckedCreateWithoutUserInput> | VoteCreateWithoutUserInput[] | VoteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VoteCreateOrConnectWithoutUserInput | VoteCreateOrConnectWithoutUserInput[]
    createMany?: VoteCreateManyUserInputEnvelope
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type PendudukUpdateOneRequiredWithoutUserNestedInput = {
    create?: XOR<PendudukCreateWithoutUserInput, PendudukUncheckedCreateWithoutUserInput>
    connectOrCreate?: PendudukCreateOrConnectWithoutUserInput
    upsert?: PendudukUpsertWithoutUserInput
    connect?: PendudukWhereUniqueInput
    update?: XOR<XOR<PendudukUpdateToOneWithWhereWithoutUserInput, PendudukUpdateWithoutUserInput>, PendudukUncheckedUpdateWithoutUserInput>
  }

  export type AuditLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutUserInput | AuditLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutUserInput | AuditLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutUserInput | AuditLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type ElectionUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<ElectionCreateWithoutCreatorInput, ElectionUncheckedCreateWithoutCreatorInput> | ElectionCreateWithoutCreatorInput[] | ElectionUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: ElectionCreateOrConnectWithoutCreatorInput | ElectionCreateOrConnectWithoutCreatorInput[]
    upsert?: ElectionUpsertWithWhereUniqueWithoutCreatorInput | ElectionUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: ElectionCreateManyCreatorInputEnvelope
    set?: ElectionWhereUniqueInput | ElectionWhereUniqueInput[]
    disconnect?: ElectionWhereUniqueInput | ElectionWhereUniqueInput[]
    delete?: ElectionWhereUniqueInput | ElectionWhereUniqueInput[]
    connect?: ElectionWhereUniqueInput | ElectionWhereUniqueInput[]
    update?: ElectionUpdateWithWhereUniqueWithoutCreatorInput | ElectionUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: ElectionUpdateManyWithWhereWithoutCreatorInput | ElectionUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: ElectionScalarWhereInput | ElectionScalarWhereInput[]
  }

  export type VoteUpdateManyWithoutUserNestedInput = {
    create?: XOR<VoteCreateWithoutUserInput, VoteUncheckedCreateWithoutUserInput> | VoteCreateWithoutUserInput[] | VoteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VoteCreateOrConnectWithoutUserInput | VoteCreateOrConnectWithoutUserInput[]
    upsert?: VoteUpsertWithWhereUniqueWithoutUserInput | VoteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: VoteCreateManyUserInputEnvelope
    set?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    disconnect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    delete?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    update?: VoteUpdateWithWhereUniqueWithoutUserInput | VoteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: VoteUpdateManyWithWhereWithoutUserInput | VoteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: VoteScalarWhereInput | VoteScalarWhereInput[]
  }

  export type AuditLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutUserInput | AuditLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutUserInput | AuditLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutUserInput | AuditLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type ElectionUncheckedUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<ElectionCreateWithoutCreatorInput, ElectionUncheckedCreateWithoutCreatorInput> | ElectionCreateWithoutCreatorInput[] | ElectionUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: ElectionCreateOrConnectWithoutCreatorInput | ElectionCreateOrConnectWithoutCreatorInput[]
    upsert?: ElectionUpsertWithWhereUniqueWithoutCreatorInput | ElectionUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: ElectionCreateManyCreatorInputEnvelope
    set?: ElectionWhereUniqueInput | ElectionWhereUniqueInput[]
    disconnect?: ElectionWhereUniqueInput | ElectionWhereUniqueInput[]
    delete?: ElectionWhereUniqueInput | ElectionWhereUniqueInput[]
    connect?: ElectionWhereUniqueInput | ElectionWhereUniqueInput[]
    update?: ElectionUpdateWithWhereUniqueWithoutCreatorInput | ElectionUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: ElectionUpdateManyWithWhereWithoutCreatorInput | ElectionUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: ElectionScalarWhereInput | ElectionScalarWhereInput[]
  }

  export type VoteUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<VoteCreateWithoutUserInput, VoteUncheckedCreateWithoutUserInput> | VoteCreateWithoutUserInput[] | VoteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VoteCreateOrConnectWithoutUserInput | VoteCreateOrConnectWithoutUserInput[]
    upsert?: VoteUpsertWithWhereUniqueWithoutUserInput | VoteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: VoteCreateManyUserInputEnvelope
    set?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    disconnect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    delete?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    update?: VoteUpdateWithWhereUniqueWithoutUserInput | VoteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: VoteUpdateManyWithWhereWithoutUserInput | VoteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: VoteScalarWhereInput | VoteScalarWhereInput[]
  }

  export type CandidateCreateNestedManyWithoutElectionInput = {
    create?: XOR<CandidateCreateWithoutElectionInput, CandidateUncheckedCreateWithoutElectionInput> | CandidateCreateWithoutElectionInput[] | CandidateUncheckedCreateWithoutElectionInput[]
    connectOrCreate?: CandidateCreateOrConnectWithoutElectionInput | CandidateCreateOrConnectWithoutElectionInput[]
    createMany?: CandidateCreateManyElectionInputEnvelope
    connect?: CandidateWhereUniqueInput | CandidateWhereUniqueInput[]
  }

  export type ElectionStatsCacheCreateNestedManyWithoutElectionInput = {
    create?: XOR<ElectionStatsCacheCreateWithoutElectionInput, ElectionStatsCacheUncheckedCreateWithoutElectionInput> | ElectionStatsCacheCreateWithoutElectionInput[] | ElectionStatsCacheUncheckedCreateWithoutElectionInput[]
    connectOrCreate?: ElectionStatsCacheCreateOrConnectWithoutElectionInput | ElectionStatsCacheCreateOrConnectWithoutElectionInput[]
    createMany?: ElectionStatsCacheCreateManyElectionInputEnvelope
    connect?: ElectionStatsCacheWhereUniqueInput | ElectionStatsCacheWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutCreatedElectionsInput = {
    create?: XOR<UserCreateWithoutCreatedElectionsInput, UserUncheckedCreateWithoutCreatedElectionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedElectionsInput
    connect?: UserWhereUniqueInput
  }

  export type VoteCreateNestedManyWithoutElectionInput = {
    create?: XOR<VoteCreateWithoutElectionInput, VoteUncheckedCreateWithoutElectionInput> | VoteCreateWithoutElectionInput[] | VoteUncheckedCreateWithoutElectionInput[]
    connectOrCreate?: VoteCreateOrConnectWithoutElectionInput | VoteCreateOrConnectWithoutElectionInput[]
    createMany?: VoteCreateManyElectionInputEnvelope
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
  }

  export type CandidateUncheckedCreateNestedManyWithoutElectionInput = {
    create?: XOR<CandidateCreateWithoutElectionInput, CandidateUncheckedCreateWithoutElectionInput> | CandidateCreateWithoutElectionInput[] | CandidateUncheckedCreateWithoutElectionInput[]
    connectOrCreate?: CandidateCreateOrConnectWithoutElectionInput | CandidateCreateOrConnectWithoutElectionInput[]
    createMany?: CandidateCreateManyElectionInputEnvelope
    connect?: CandidateWhereUniqueInput | CandidateWhereUniqueInput[]
  }

  export type ElectionStatsCacheUncheckedCreateNestedManyWithoutElectionInput = {
    create?: XOR<ElectionStatsCacheCreateWithoutElectionInput, ElectionStatsCacheUncheckedCreateWithoutElectionInput> | ElectionStatsCacheCreateWithoutElectionInput[] | ElectionStatsCacheUncheckedCreateWithoutElectionInput[]
    connectOrCreate?: ElectionStatsCacheCreateOrConnectWithoutElectionInput | ElectionStatsCacheCreateOrConnectWithoutElectionInput[]
    createMany?: ElectionStatsCacheCreateManyElectionInputEnvelope
    connect?: ElectionStatsCacheWhereUniqueInput | ElectionStatsCacheWhereUniqueInput[]
  }

  export type VoteUncheckedCreateNestedManyWithoutElectionInput = {
    create?: XOR<VoteCreateWithoutElectionInput, VoteUncheckedCreateWithoutElectionInput> | VoteCreateWithoutElectionInput[] | VoteUncheckedCreateWithoutElectionInput[]
    connectOrCreate?: VoteCreateOrConnectWithoutElectionInput | VoteCreateOrConnectWithoutElectionInput[]
    createMany?: VoteCreateManyElectionInputEnvelope
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type CandidateUpdateManyWithoutElectionNestedInput = {
    create?: XOR<CandidateCreateWithoutElectionInput, CandidateUncheckedCreateWithoutElectionInput> | CandidateCreateWithoutElectionInput[] | CandidateUncheckedCreateWithoutElectionInput[]
    connectOrCreate?: CandidateCreateOrConnectWithoutElectionInput | CandidateCreateOrConnectWithoutElectionInput[]
    upsert?: CandidateUpsertWithWhereUniqueWithoutElectionInput | CandidateUpsertWithWhereUniqueWithoutElectionInput[]
    createMany?: CandidateCreateManyElectionInputEnvelope
    set?: CandidateWhereUniqueInput | CandidateWhereUniqueInput[]
    disconnect?: CandidateWhereUniqueInput | CandidateWhereUniqueInput[]
    delete?: CandidateWhereUniqueInput | CandidateWhereUniqueInput[]
    connect?: CandidateWhereUniqueInput | CandidateWhereUniqueInput[]
    update?: CandidateUpdateWithWhereUniqueWithoutElectionInput | CandidateUpdateWithWhereUniqueWithoutElectionInput[]
    updateMany?: CandidateUpdateManyWithWhereWithoutElectionInput | CandidateUpdateManyWithWhereWithoutElectionInput[]
    deleteMany?: CandidateScalarWhereInput | CandidateScalarWhereInput[]
  }

  export type ElectionStatsCacheUpdateManyWithoutElectionNestedInput = {
    create?: XOR<ElectionStatsCacheCreateWithoutElectionInput, ElectionStatsCacheUncheckedCreateWithoutElectionInput> | ElectionStatsCacheCreateWithoutElectionInput[] | ElectionStatsCacheUncheckedCreateWithoutElectionInput[]
    connectOrCreate?: ElectionStatsCacheCreateOrConnectWithoutElectionInput | ElectionStatsCacheCreateOrConnectWithoutElectionInput[]
    upsert?: ElectionStatsCacheUpsertWithWhereUniqueWithoutElectionInput | ElectionStatsCacheUpsertWithWhereUniqueWithoutElectionInput[]
    createMany?: ElectionStatsCacheCreateManyElectionInputEnvelope
    set?: ElectionStatsCacheWhereUniqueInput | ElectionStatsCacheWhereUniqueInput[]
    disconnect?: ElectionStatsCacheWhereUniqueInput | ElectionStatsCacheWhereUniqueInput[]
    delete?: ElectionStatsCacheWhereUniqueInput | ElectionStatsCacheWhereUniqueInput[]
    connect?: ElectionStatsCacheWhereUniqueInput | ElectionStatsCacheWhereUniqueInput[]
    update?: ElectionStatsCacheUpdateWithWhereUniqueWithoutElectionInput | ElectionStatsCacheUpdateWithWhereUniqueWithoutElectionInput[]
    updateMany?: ElectionStatsCacheUpdateManyWithWhereWithoutElectionInput | ElectionStatsCacheUpdateManyWithWhereWithoutElectionInput[]
    deleteMany?: ElectionStatsCacheScalarWhereInput | ElectionStatsCacheScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutCreatedElectionsNestedInput = {
    create?: XOR<UserCreateWithoutCreatedElectionsInput, UserUncheckedCreateWithoutCreatedElectionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedElectionsInput
    upsert?: UserUpsertWithoutCreatedElectionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreatedElectionsInput, UserUpdateWithoutCreatedElectionsInput>, UserUncheckedUpdateWithoutCreatedElectionsInput>
  }

  export type VoteUpdateManyWithoutElectionNestedInput = {
    create?: XOR<VoteCreateWithoutElectionInput, VoteUncheckedCreateWithoutElectionInput> | VoteCreateWithoutElectionInput[] | VoteUncheckedCreateWithoutElectionInput[]
    connectOrCreate?: VoteCreateOrConnectWithoutElectionInput | VoteCreateOrConnectWithoutElectionInput[]
    upsert?: VoteUpsertWithWhereUniqueWithoutElectionInput | VoteUpsertWithWhereUniqueWithoutElectionInput[]
    createMany?: VoteCreateManyElectionInputEnvelope
    set?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    disconnect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    delete?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    update?: VoteUpdateWithWhereUniqueWithoutElectionInput | VoteUpdateWithWhereUniqueWithoutElectionInput[]
    updateMany?: VoteUpdateManyWithWhereWithoutElectionInput | VoteUpdateManyWithWhereWithoutElectionInput[]
    deleteMany?: VoteScalarWhereInput | VoteScalarWhereInput[]
  }

  export type CandidateUncheckedUpdateManyWithoutElectionNestedInput = {
    create?: XOR<CandidateCreateWithoutElectionInput, CandidateUncheckedCreateWithoutElectionInput> | CandidateCreateWithoutElectionInput[] | CandidateUncheckedCreateWithoutElectionInput[]
    connectOrCreate?: CandidateCreateOrConnectWithoutElectionInput | CandidateCreateOrConnectWithoutElectionInput[]
    upsert?: CandidateUpsertWithWhereUniqueWithoutElectionInput | CandidateUpsertWithWhereUniqueWithoutElectionInput[]
    createMany?: CandidateCreateManyElectionInputEnvelope
    set?: CandidateWhereUniqueInput | CandidateWhereUniqueInput[]
    disconnect?: CandidateWhereUniqueInput | CandidateWhereUniqueInput[]
    delete?: CandidateWhereUniqueInput | CandidateWhereUniqueInput[]
    connect?: CandidateWhereUniqueInput | CandidateWhereUniqueInput[]
    update?: CandidateUpdateWithWhereUniqueWithoutElectionInput | CandidateUpdateWithWhereUniqueWithoutElectionInput[]
    updateMany?: CandidateUpdateManyWithWhereWithoutElectionInput | CandidateUpdateManyWithWhereWithoutElectionInput[]
    deleteMany?: CandidateScalarWhereInput | CandidateScalarWhereInput[]
  }

  export type ElectionStatsCacheUncheckedUpdateManyWithoutElectionNestedInput = {
    create?: XOR<ElectionStatsCacheCreateWithoutElectionInput, ElectionStatsCacheUncheckedCreateWithoutElectionInput> | ElectionStatsCacheCreateWithoutElectionInput[] | ElectionStatsCacheUncheckedCreateWithoutElectionInput[]
    connectOrCreate?: ElectionStatsCacheCreateOrConnectWithoutElectionInput | ElectionStatsCacheCreateOrConnectWithoutElectionInput[]
    upsert?: ElectionStatsCacheUpsertWithWhereUniqueWithoutElectionInput | ElectionStatsCacheUpsertWithWhereUniqueWithoutElectionInput[]
    createMany?: ElectionStatsCacheCreateManyElectionInputEnvelope
    set?: ElectionStatsCacheWhereUniqueInput | ElectionStatsCacheWhereUniqueInput[]
    disconnect?: ElectionStatsCacheWhereUniqueInput | ElectionStatsCacheWhereUniqueInput[]
    delete?: ElectionStatsCacheWhereUniqueInput | ElectionStatsCacheWhereUniqueInput[]
    connect?: ElectionStatsCacheWhereUniqueInput | ElectionStatsCacheWhereUniqueInput[]
    update?: ElectionStatsCacheUpdateWithWhereUniqueWithoutElectionInput | ElectionStatsCacheUpdateWithWhereUniqueWithoutElectionInput[]
    updateMany?: ElectionStatsCacheUpdateManyWithWhereWithoutElectionInput | ElectionStatsCacheUpdateManyWithWhereWithoutElectionInput[]
    deleteMany?: ElectionStatsCacheScalarWhereInput | ElectionStatsCacheScalarWhereInput[]
  }

  export type VoteUncheckedUpdateManyWithoutElectionNestedInput = {
    create?: XOR<VoteCreateWithoutElectionInput, VoteUncheckedCreateWithoutElectionInput> | VoteCreateWithoutElectionInput[] | VoteUncheckedCreateWithoutElectionInput[]
    connectOrCreate?: VoteCreateOrConnectWithoutElectionInput | VoteCreateOrConnectWithoutElectionInput[]
    upsert?: VoteUpsertWithWhereUniqueWithoutElectionInput | VoteUpsertWithWhereUniqueWithoutElectionInput[]
    createMany?: VoteCreateManyElectionInputEnvelope
    set?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    disconnect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    delete?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    update?: VoteUpdateWithWhereUniqueWithoutElectionInput | VoteUpdateWithWhereUniqueWithoutElectionInput[]
    updateMany?: VoteUpdateManyWithWhereWithoutElectionInput | VoteUpdateManyWithWhereWithoutElectionInput[]
    deleteMany?: VoteScalarWhereInput | VoteScalarWhereInput[]
  }

  export type ElectionCreateNestedOneWithoutCandidatesInput = {
    create?: XOR<ElectionCreateWithoutCandidatesInput, ElectionUncheckedCreateWithoutCandidatesInput>
    connectOrCreate?: ElectionCreateOrConnectWithoutCandidatesInput
    connect?: ElectionWhereUniqueInput
  }

  export type ElectionStatsCacheCreateNestedManyWithoutCandidateInput = {
    create?: XOR<ElectionStatsCacheCreateWithoutCandidateInput, ElectionStatsCacheUncheckedCreateWithoutCandidateInput> | ElectionStatsCacheCreateWithoutCandidateInput[] | ElectionStatsCacheUncheckedCreateWithoutCandidateInput[]
    connectOrCreate?: ElectionStatsCacheCreateOrConnectWithoutCandidateInput | ElectionStatsCacheCreateOrConnectWithoutCandidateInput[]
    createMany?: ElectionStatsCacheCreateManyCandidateInputEnvelope
    connect?: ElectionStatsCacheWhereUniqueInput | ElectionStatsCacheWhereUniqueInput[]
  }

  export type VoteCreateNestedManyWithoutCandidateInput = {
    create?: XOR<VoteCreateWithoutCandidateInput, VoteUncheckedCreateWithoutCandidateInput> | VoteCreateWithoutCandidateInput[] | VoteUncheckedCreateWithoutCandidateInput[]
    connectOrCreate?: VoteCreateOrConnectWithoutCandidateInput | VoteCreateOrConnectWithoutCandidateInput[]
    createMany?: VoteCreateManyCandidateInputEnvelope
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
  }

  export type ElectionStatsCacheUncheckedCreateNestedManyWithoutCandidateInput = {
    create?: XOR<ElectionStatsCacheCreateWithoutCandidateInput, ElectionStatsCacheUncheckedCreateWithoutCandidateInput> | ElectionStatsCacheCreateWithoutCandidateInput[] | ElectionStatsCacheUncheckedCreateWithoutCandidateInput[]
    connectOrCreate?: ElectionStatsCacheCreateOrConnectWithoutCandidateInput | ElectionStatsCacheCreateOrConnectWithoutCandidateInput[]
    createMany?: ElectionStatsCacheCreateManyCandidateInputEnvelope
    connect?: ElectionStatsCacheWhereUniqueInput | ElectionStatsCacheWhereUniqueInput[]
  }

  export type VoteUncheckedCreateNestedManyWithoutCandidateInput = {
    create?: XOR<VoteCreateWithoutCandidateInput, VoteUncheckedCreateWithoutCandidateInput> | VoteCreateWithoutCandidateInput[] | VoteUncheckedCreateWithoutCandidateInput[]
    connectOrCreate?: VoteCreateOrConnectWithoutCandidateInput | VoteCreateOrConnectWithoutCandidateInput[]
    createMany?: VoteCreateManyCandidateInputEnvelope
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ElectionUpdateOneRequiredWithoutCandidatesNestedInput = {
    create?: XOR<ElectionCreateWithoutCandidatesInput, ElectionUncheckedCreateWithoutCandidatesInput>
    connectOrCreate?: ElectionCreateOrConnectWithoutCandidatesInput
    upsert?: ElectionUpsertWithoutCandidatesInput
    connect?: ElectionWhereUniqueInput
    update?: XOR<XOR<ElectionUpdateToOneWithWhereWithoutCandidatesInput, ElectionUpdateWithoutCandidatesInput>, ElectionUncheckedUpdateWithoutCandidatesInput>
  }

  export type ElectionStatsCacheUpdateManyWithoutCandidateNestedInput = {
    create?: XOR<ElectionStatsCacheCreateWithoutCandidateInput, ElectionStatsCacheUncheckedCreateWithoutCandidateInput> | ElectionStatsCacheCreateWithoutCandidateInput[] | ElectionStatsCacheUncheckedCreateWithoutCandidateInput[]
    connectOrCreate?: ElectionStatsCacheCreateOrConnectWithoutCandidateInput | ElectionStatsCacheCreateOrConnectWithoutCandidateInput[]
    upsert?: ElectionStatsCacheUpsertWithWhereUniqueWithoutCandidateInput | ElectionStatsCacheUpsertWithWhereUniqueWithoutCandidateInput[]
    createMany?: ElectionStatsCacheCreateManyCandidateInputEnvelope
    set?: ElectionStatsCacheWhereUniqueInput | ElectionStatsCacheWhereUniqueInput[]
    disconnect?: ElectionStatsCacheWhereUniqueInput | ElectionStatsCacheWhereUniqueInput[]
    delete?: ElectionStatsCacheWhereUniqueInput | ElectionStatsCacheWhereUniqueInput[]
    connect?: ElectionStatsCacheWhereUniqueInput | ElectionStatsCacheWhereUniqueInput[]
    update?: ElectionStatsCacheUpdateWithWhereUniqueWithoutCandidateInput | ElectionStatsCacheUpdateWithWhereUniqueWithoutCandidateInput[]
    updateMany?: ElectionStatsCacheUpdateManyWithWhereWithoutCandidateInput | ElectionStatsCacheUpdateManyWithWhereWithoutCandidateInput[]
    deleteMany?: ElectionStatsCacheScalarWhereInput | ElectionStatsCacheScalarWhereInput[]
  }

  export type VoteUpdateManyWithoutCandidateNestedInput = {
    create?: XOR<VoteCreateWithoutCandidateInput, VoteUncheckedCreateWithoutCandidateInput> | VoteCreateWithoutCandidateInput[] | VoteUncheckedCreateWithoutCandidateInput[]
    connectOrCreate?: VoteCreateOrConnectWithoutCandidateInput | VoteCreateOrConnectWithoutCandidateInput[]
    upsert?: VoteUpsertWithWhereUniqueWithoutCandidateInput | VoteUpsertWithWhereUniqueWithoutCandidateInput[]
    createMany?: VoteCreateManyCandidateInputEnvelope
    set?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    disconnect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    delete?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    update?: VoteUpdateWithWhereUniqueWithoutCandidateInput | VoteUpdateWithWhereUniqueWithoutCandidateInput[]
    updateMany?: VoteUpdateManyWithWhereWithoutCandidateInput | VoteUpdateManyWithWhereWithoutCandidateInput[]
    deleteMany?: VoteScalarWhereInput | VoteScalarWhereInput[]
  }

  export type ElectionStatsCacheUncheckedUpdateManyWithoutCandidateNestedInput = {
    create?: XOR<ElectionStatsCacheCreateWithoutCandidateInput, ElectionStatsCacheUncheckedCreateWithoutCandidateInput> | ElectionStatsCacheCreateWithoutCandidateInput[] | ElectionStatsCacheUncheckedCreateWithoutCandidateInput[]
    connectOrCreate?: ElectionStatsCacheCreateOrConnectWithoutCandidateInput | ElectionStatsCacheCreateOrConnectWithoutCandidateInput[]
    upsert?: ElectionStatsCacheUpsertWithWhereUniqueWithoutCandidateInput | ElectionStatsCacheUpsertWithWhereUniqueWithoutCandidateInput[]
    createMany?: ElectionStatsCacheCreateManyCandidateInputEnvelope
    set?: ElectionStatsCacheWhereUniqueInput | ElectionStatsCacheWhereUniqueInput[]
    disconnect?: ElectionStatsCacheWhereUniqueInput | ElectionStatsCacheWhereUniqueInput[]
    delete?: ElectionStatsCacheWhereUniqueInput | ElectionStatsCacheWhereUniqueInput[]
    connect?: ElectionStatsCacheWhereUniqueInput | ElectionStatsCacheWhereUniqueInput[]
    update?: ElectionStatsCacheUpdateWithWhereUniqueWithoutCandidateInput | ElectionStatsCacheUpdateWithWhereUniqueWithoutCandidateInput[]
    updateMany?: ElectionStatsCacheUpdateManyWithWhereWithoutCandidateInput | ElectionStatsCacheUpdateManyWithWhereWithoutCandidateInput[]
    deleteMany?: ElectionStatsCacheScalarWhereInput | ElectionStatsCacheScalarWhereInput[]
  }

  export type VoteUncheckedUpdateManyWithoutCandidateNestedInput = {
    create?: XOR<VoteCreateWithoutCandidateInput, VoteUncheckedCreateWithoutCandidateInput> | VoteCreateWithoutCandidateInput[] | VoteUncheckedCreateWithoutCandidateInput[]
    connectOrCreate?: VoteCreateOrConnectWithoutCandidateInput | VoteCreateOrConnectWithoutCandidateInput[]
    upsert?: VoteUpsertWithWhereUniqueWithoutCandidateInput | VoteUpsertWithWhereUniqueWithoutCandidateInput[]
    createMany?: VoteCreateManyCandidateInputEnvelope
    set?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    disconnect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    delete?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    update?: VoteUpdateWithWhereUniqueWithoutCandidateInput | VoteUpdateWithWhereUniqueWithoutCandidateInput[]
    updateMany?: VoteUpdateManyWithWhereWithoutCandidateInput | VoteUpdateManyWithWhereWithoutCandidateInput[]
    deleteMany?: VoteScalarWhereInput | VoteScalarWhereInput[]
  }

  export type CandidateCreateNestedOneWithoutVotesInput = {
    create?: XOR<CandidateCreateWithoutVotesInput, CandidateUncheckedCreateWithoutVotesInput>
    connectOrCreate?: CandidateCreateOrConnectWithoutVotesInput
    connect?: CandidateWhereUniqueInput
  }

  export type ElectionCreateNestedOneWithoutVotesInput = {
    create?: XOR<ElectionCreateWithoutVotesInput, ElectionUncheckedCreateWithoutVotesInput>
    connectOrCreate?: ElectionCreateOrConnectWithoutVotesInput
    connect?: ElectionWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutVotesInput = {
    create?: XOR<UserCreateWithoutVotesInput, UserUncheckedCreateWithoutVotesInput>
    connectOrCreate?: UserCreateOrConnectWithoutVotesInput
    connect?: UserWhereUniqueInput
  }

  export type CandidateUpdateOneRequiredWithoutVotesNestedInput = {
    create?: XOR<CandidateCreateWithoutVotesInput, CandidateUncheckedCreateWithoutVotesInput>
    connectOrCreate?: CandidateCreateOrConnectWithoutVotesInput
    upsert?: CandidateUpsertWithoutVotesInput
    connect?: CandidateWhereUniqueInput
    update?: XOR<XOR<CandidateUpdateToOneWithWhereWithoutVotesInput, CandidateUpdateWithoutVotesInput>, CandidateUncheckedUpdateWithoutVotesInput>
  }

  export type ElectionUpdateOneRequiredWithoutVotesNestedInput = {
    create?: XOR<ElectionCreateWithoutVotesInput, ElectionUncheckedCreateWithoutVotesInput>
    connectOrCreate?: ElectionCreateOrConnectWithoutVotesInput
    upsert?: ElectionUpsertWithoutVotesInput
    connect?: ElectionWhereUniqueInput
    update?: XOR<XOR<ElectionUpdateToOneWithWhereWithoutVotesInput, ElectionUpdateWithoutVotesInput>, ElectionUncheckedUpdateWithoutVotesInput>
  }

  export type UserUpdateOneRequiredWithoutVotesNestedInput = {
    create?: XOR<UserCreateWithoutVotesInput, UserUncheckedCreateWithoutVotesInput>
    connectOrCreate?: UserCreateOrConnectWithoutVotesInput
    upsert?: UserUpsertWithoutVotesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutVotesInput, UserUpdateWithoutVotesInput>, UserUncheckedUpdateWithoutVotesInput>
  }

  export type CandidateCreateNestedOneWithoutElectionStatsCacheInput = {
    create?: XOR<CandidateCreateWithoutElectionStatsCacheInput, CandidateUncheckedCreateWithoutElectionStatsCacheInput>
    connectOrCreate?: CandidateCreateOrConnectWithoutElectionStatsCacheInput
    connect?: CandidateWhereUniqueInput
  }

  export type ElectionCreateNestedOneWithoutElectionStatsCacheInput = {
    create?: XOR<ElectionCreateWithoutElectionStatsCacheInput, ElectionUncheckedCreateWithoutElectionStatsCacheInput>
    connectOrCreate?: ElectionCreateOrConnectWithoutElectionStatsCacheInput
    connect?: ElectionWhereUniqueInput
  }

  export type CandidateUpdateOneRequiredWithoutElectionStatsCacheNestedInput = {
    create?: XOR<CandidateCreateWithoutElectionStatsCacheInput, CandidateUncheckedCreateWithoutElectionStatsCacheInput>
    connectOrCreate?: CandidateCreateOrConnectWithoutElectionStatsCacheInput
    upsert?: CandidateUpsertWithoutElectionStatsCacheInput
    connect?: CandidateWhereUniqueInput
    update?: XOR<XOR<CandidateUpdateToOneWithWhereWithoutElectionStatsCacheInput, CandidateUpdateWithoutElectionStatsCacheInput>, CandidateUncheckedUpdateWithoutElectionStatsCacheInput>
  }

  export type ElectionUpdateOneRequiredWithoutElectionStatsCacheNestedInput = {
    create?: XOR<ElectionCreateWithoutElectionStatsCacheInput, ElectionUncheckedCreateWithoutElectionStatsCacheInput>
    connectOrCreate?: ElectionCreateOrConnectWithoutElectionStatsCacheInput
    upsert?: ElectionUpsertWithoutElectionStatsCacheInput
    connect?: ElectionWhereUniqueInput
    update?: XOR<XOR<ElectionUpdateToOneWithWhereWithoutElectionStatsCacheInput, ElectionUpdateWithoutElectionStatsCacheInput>, ElectionUncheckedUpdateWithoutElectionStatsCacheInput>
  }

  export type UserCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneWithoutAuditLogsNestedInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    upsert?: UserUpsertWithoutAuditLogsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAuditLogsInput, UserUpdateWithoutAuditLogsInput>, UserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedBigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type UserCreateWithoutPendudukInput = {
    id?: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    walletAddress: string
    encryptedPrivateKey?: string | null
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
    createdElections?: ElectionCreateNestedManyWithoutCreatorInput
    votes?: VoteCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPendudukInput = {
    id?: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    walletAddress: string
    encryptedPrivateKey?: string | null
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
    createdElections?: ElectionUncheckedCreateNestedManyWithoutCreatorInput
    votes?: VoteUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPendudukInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPendudukInput, UserUncheckedCreateWithoutPendudukInput>
  }

  export type UserUpsertWithoutPendudukInput = {
    update: XOR<UserUpdateWithoutPendudukInput, UserUncheckedUpdateWithoutPendudukInput>
    create: XOR<UserCreateWithoutPendudukInput, UserUncheckedCreateWithoutPendudukInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPendudukInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPendudukInput, UserUncheckedUpdateWithoutPendudukInput>
  }

  export type UserUpdateWithoutPendudukInput = {
    id?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    encryptedPrivateKey?: NullableStringFieldUpdateOperationsInput | string | null
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
    createdElections?: ElectionUpdateManyWithoutCreatorNestedInput
    votes?: VoteUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPendudukInput = {
    id?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    encryptedPrivateKey?: NullableStringFieldUpdateOperationsInput | string | null
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
    createdElections?: ElectionUncheckedUpdateManyWithoutCreatorNestedInput
    votes?: VoteUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PendudukCreateWithoutUserInput = {
    id?: string
    nik: string
    namaLengkap: string
    tanggalLahir: Date | string
    alamat?: string | null
    foto?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PendudukUncheckedCreateWithoutUserInput = {
    id?: string
    nik: string
    namaLengkap: string
    tanggalLahir: Date | string
    alamat?: string | null
    foto?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PendudukCreateOrConnectWithoutUserInput = {
    where: PendudukWhereUniqueInput
    create: XOR<PendudukCreateWithoutUserInput, PendudukUncheckedCreateWithoutUserInput>
  }

  export type AuditLogCreateWithoutUserInput = {
    id?: bigint | number
    action: string
    entityType: string
    entityId: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AuditLogUncheckedCreateWithoutUserInput = {
    id?: bigint | number
    action: string
    entityType: string
    entityId: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AuditLogCreateOrConnectWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput>
  }

  export type AuditLogCreateManyUserInputEnvelope = {
    data: AuditLogCreateManyUserInput | AuditLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ElectionCreateWithoutCreatorInput = {
    id?: bigint | number
    name: string
    description: string
    level: string
    city?: string | null
    province?: string | null
    startTime: Date | string
    endTime: Date | string
    chainElectionId?: bigint | number | null
    statusOverride?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    candidates?: CandidateCreateNestedManyWithoutElectionInput
    electionStatsCache?: ElectionStatsCacheCreateNestedManyWithoutElectionInput
    votes?: VoteCreateNestedManyWithoutElectionInput
  }

  export type ElectionUncheckedCreateWithoutCreatorInput = {
    id?: bigint | number
    name: string
    description: string
    level: string
    city?: string | null
    province?: string | null
    startTime: Date | string
    endTime: Date | string
    chainElectionId?: bigint | number | null
    statusOverride?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    candidates?: CandidateUncheckedCreateNestedManyWithoutElectionInput
    electionStatsCache?: ElectionStatsCacheUncheckedCreateNestedManyWithoutElectionInput
    votes?: VoteUncheckedCreateNestedManyWithoutElectionInput
  }

  export type ElectionCreateOrConnectWithoutCreatorInput = {
    where: ElectionWhereUniqueInput
    create: XOR<ElectionCreateWithoutCreatorInput, ElectionUncheckedCreateWithoutCreatorInput>
  }

  export type ElectionCreateManyCreatorInputEnvelope = {
    data: ElectionCreateManyCreatorInput | ElectionCreateManyCreatorInput[]
    skipDuplicates?: boolean
  }

  export type VoteCreateWithoutUserInput = {
    id?: bigint | number
    txHash?: string | null
    castAt?: Date | string
    sourceIp?: string | null
    userAgent?: string | null
    candidate: CandidateCreateNestedOneWithoutVotesInput
    election: ElectionCreateNestedOneWithoutVotesInput
  }

  export type VoteUncheckedCreateWithoutUserInput = {
    id?: bigint | number
    electionId: bigint | number
    candidateId: bigint | number
    txHash?: string | null
    castAt?: Date | string
    sourceIp?: string | null
    userAgent?: string | null
  }

  export type VoteCreateOrConnectWithoutUserInput = {
    where: VoteWhereUniqueInput
    create: XOR<VoteCreateWithoutUserInput, VoteUncheckedCreateWithoutUserInput>
  }

  export type VoteCreateManyUserInputEnvelope = {
    data: VoteCreateManyUserInput | VoteCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PendudukUpsertWithoutUserInput = {
    update: XOR<PendudukUpdateWithoutUserInput, PendudukUncheckedUpdateWithoutUserInput>
    create: XOR<PendudukCreateWithoutUserInput, PendudukUncheckedCreateWithoutUserInput>
    where?: PendudukWhereInput
  }

  export type PendudukUpdateToOneWithWhereWithoutUserInput = {
    where?: PendudukWhereInput
    data: XOR<PendudukUpdateWithoutUserInput, PendudukUncheckedUpdateWithoutUserInput>
  }

  export type PendudukUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    nik?: StringFieldUpdateOperationsInput | string
    namaLengkap?: StringFieldUpdateOperationsInput | string
    tanggalLahir?: DateTimeFieldUpdateOperationsInput | Date | string
    alamat?: NullableStringFieldUpdateOperationsInput | string | null
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PendudukUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    nik?: StringFieldUpdateOperationsInput | string
    namaLengkap?: StringFieldUpdateOperationsInput | string
    tanggalLahir?: DateTimeFieldUpdateOperationsInput | Date | string
    alamat?: NullableStringFieldUpdateOperationsInput | string | null
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUpsertWithWhereUniqueWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutUserInput, AuditLogUncheckedUpdateWithoutUserInput>
    create: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutUserInput, AuditLogUncheckedUpdateWithoutUserInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutUserInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutUserInput>
  }

  export type AuditLogScalarWhereInput = {
    AND?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    OR?: AuditLogScalarWhereInput[]
    NOT?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    id?: BigIntFilter<"AuditLog"> | bigint | number
    userId?: StringNullableFilter<"AuditLog"> | string | null
    action?: StringFilter<"AuditLog"> | string
    entityType?: StringFilter<"AuditLog"> | string
    entityId?: StringFilter<"AuditLog"> | string
    metadata?: JsonNullableFilter<"AuditLog">
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type ElectionUpsertWithWhereUniqueWithoutCreatorInput = {
    where: ElectionWhereUniqueInput
    update: XOR<ElectionUpdateWithoutCreatorInput, ElectionUncheckedUpdateWithoutCreatorInput>
    create: XOR<ElectionCreateWithoutCreatorInput, ElectionUncheckedCreateWithoutCreatorInput>
  }

  export type ElectionUpdateWithWhereUniqueWithoutCreatorInput = {
    where: ElectionWhereUniqueInput
    data: XOR<ElectionUpdateWithoutCreatorInput, ElectionUncheckedUpdateWithoutCreatorInput>
  }

  export type ElectionUpdateManyWithWhereWithoutCreatorInput = {
    where: ElectionScalarWhereInput
    data: XOR<ElectionUpdateManyMutationInput, ElectionUncheckedUpdateManyWithoutCreatorInput>
  }

  export type ElectionScalarWhereInput = {
    AND?: ElectionScalarWhereInput | ElectionScalarWhereInput[]
    OR?: ElectionScalarWhereInput[]
    NOT?: ElectionScalarWhereInput | ElectionScalarWhereInput[]
    id?: BigIntFilter<"Election"> | bigint | number
    name?: StringFilter<"Election"> | string
    description?: StringFilter<"Election"> | string
    level?: StringFilter<"Election"> | string
    city?: StringNullableFilter<"Election"> | string | null
    province?: StringNullableFilter<"Election"> | string | null
    startTime?: DateTimeFilter<"Election"> | Date | string
    endTime?: DateTimeFilter<"Election"> | Date | string
    chainElectionId?: BigIntNullableFilter<"Election"> | bigint | number | null
    statusOverride?: StringNullableFilter<"Election"> | string | null
    createdBy?: StringFilter<"Election"> | string
    createdAt?: DateTimeFilter<"Election"> | Date | string
    updatedAt?: DateTimeFilter<"Election"> | Date | string
  }

  export type VoteUpsertWithWhereUniqueWithoutUserInput = {
    where: VoteWhereUniqueInput
    update: XOR<VoteUpdateWithoutUserInput, VoteUncheckedUpdateWithoutUserInput>
    create: XOR<VoteCreateWithoutUserInput, VoteUncheckedCreateWithoutUserInput>
  }

  export type VoteUpdateWithWhereUniqueWithoutUserInput = {
    where: VoteWhereUniqueInput
    data: XOR<VoteUpdateWithoutUserInput, VoteUncheckedUpdateWithoutUserInput>
  }

  export type VoteUpdateManyWithWhereWithoutUserInput = {
    where: VoteScalarWhereInput
    data: XOR<VoteUpdateManyMutationInput, VoteUncheckedUpdateManyWithoutUserInput>
  }

  export type VoteScalarWhereInput = {
    AND?: VoteScalarWhereInput | VoteScalarWhereInput[]
    OR?: VoteScalarWhereInput[]
    NOT?: VoteScalarWhereInput | VoteScalarWhereInput[]
    id?: BigIntFilter<"Vote"> | bigint | number
    userId?: StringFilter<"Vote"> | string
    electionId?: BigIntFilter<"Vote"> | bigint | number
    candidateId?: BigIntFilter<"Vote"> | bigint | number
    txHash?: StringNullableFilter<"Vote"> | string | null
    castAt?: DateTimeFilter<"Vote"> | Date | string
    sourceIp?: StringNullableFilter<"Vote"> | string | null
    userAgent?: StringNullableFilter<"Vote"> | string | null
  }

  export type CandidateCreateWithoutElectionInput = {
    id?: bigint | number
    name: string
    party: string
    description?: string | null
    photoUrl?: string | null
    orderIndex: number
    createdAt?: Date | string
    updatedAt?: Date | string
    electionStatsCache?: ElectionStatsCacheCreateNestedManyWithoutCandidateInput
    votes?: VoteCreateNestedManyWithoutCandidateInput
  }

  export type CandidateUncheckedCreateWithoutElectionInput = {
    id?: bigint | number
    name: string
    party: string
    description?: string | null
    photoUrl?: string | null
    orderIndex: number
    createdAt?: Date | string
    updatedAt?: Date | string
    electionStatsCache?: ElectionStatsCacheUncheckedCreateNestedManyWithoutCandidateInput
    votes?: VoteUncheckedCreateNestedManyWithoutCandidateInput
  }

  export type CandidateCreateOrConnectWithoutElectionInput = {
    where: CandidateWhereUniqueInput
    create: XOR<CandidateCreateWithoutElectionInput, CandidateUncheckedCreateWithoutElectionInput>
  }

  export type CandidateCreateManyElectionInputEnvelope = {
    data: CandidateCreateManyElectionInput | CandidateCreateManyElectionInput[]
    skipDuplicates?: boolean
  }

  export type ElectionStatsCacheCreateWithoutElectionInput = {
    votesCount?: bigint | number
    lastUpdatedAt?: Date | string
    candidate: CandidateCreateNestedOneWithoutElectionStatsCacheInput
  }

  export type ElectionStatsCacheUncheckedCreateWithoutElectionInput = {
    candidateId: bigint | number
    votesCount?: bigint | number
    lastUpdatedAt?: Date | string
  }

  export type ElectionStatsCacheCreateOrConnectWithoutElectionInput = {
    where: ElectionStatsCacheWhereUniqueInput
    create: XOR<ElectionStatsCacheCreateWithoutElectionInput, ElectionStatsCacheUncheckedCreateWithoutElectionInput>
  }

  export type ElectionStatsCacheCreateManyElectionInputEnvelope = {
    data: ElectionStatsCacheCreateManyElectionInput | ElectionStatsCacheCreateManyElectionInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutCreatedElectionsInput = {
    id?: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    walletAddress: string
    encryptedPrivateKey?: string | null
    penduduk: PendudukCreateNestedOneWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
    votes?: VoteCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCreatedElectionsInput = {
    id?: string
    password: string
    role?: $Enums.Role
    pendudukId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    walletAddress: string
    encryptedPrivateKey?: string | null
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
    votes?: VoteUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCreatedElectionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatedElectionsInput, UserUncheckedCreateWithoutCreatedElectionsInput>
  }

  export type VoteCreateWithoutElectionInput = {
    id?: bigint | number
    txHash?: string | null
    castAt?: Date | string
    sourceIp?: string | null
    userAgent?: string | null
    candidate: CandidateCreateNestedOneWithoutVotesInput
    user: UserCreateNestedOneWithoutVotesInput
  }

  export type VoteUncheckedCreateWithoutElectionInput = {
    id?: bigint | number
    userId: string
    candidateId: bigint | number
    txHash?: string | null
    castAt?: Date | string
    sourceIp?: string | null
    userAgent?: string | null
  }

  export type VoteCreateOrConnectWithoutElectionInput = {
    where: VoteWhereUniqueInput
    create: XOR<VoteCreateWithoutElectionInput, VoteUncheckedCreateWithoutElectionInput>
  }

  export type VoteCreateManyElectionInputEnvelope = {
    data: VoteCreateManyElectionInput | VoteCreateManyElectionInput[]
    skipDuplicates?: boolean
  }

  export type CandidateUpsertWithWhereUniqueWithoutElectionInput = {
    where: CandidateWhereUniqueInput
    update: XOR<CandidateUpdateWithoutElectionInput, CandidateUncheckedUpdateWithoutElectionInput>
    create: XOR<CandidateCreateWithoutElectionInput, CandidateUncheckedCreateWithoutElectionInput>
  }

  export type CandidateUpdateWithWhereUniqueWithoutElectionInput = {
    where: CandidateWhereUniqueInput
    data: XOR<CandidateUpdateWithoutElectionInput, CandidateUncheckedUpdateWithoutElectionInput>
  }

  export type CandidateUpdateManyWithWhereWithoutElectionInput = {
    where: CandidateScalarWhereInput
    data: XOR<CandidateUpdateManyMutationInput, CandidateUncheckedUpdateManyWithoutElectionInput>
  }

  export type CandidateScalarWhereInput = {
    AND?: CandidateScalarWhereInput | CandidateScalarWhereInput[]
    OR?: CandidateScalarWhereInput[]
    NOT?: CandidateScalarWhereInput | CandidateScalarWhereInput[]
    id?: BigIntFilter<"Candidate"> | bigint | number
    electionId?: BigIntFilter<"Candidate"> | bigint | number
    name?: StringFilter<"Candidate"> | string
    party?: StringFilter<"Candidate"> | string
    description?: StringNullableFilter<"Candidate"> | string | null
    photoUrl?: StringNullableFilter<"Candidate"> | string | null
    orderIndex?: IntFilter<"Candidate"> | number
    createdAt?: DateTimeFilter<"Candidate"> | Date | string
    updatedAt?: DateTimeFilter<"Candidate"> | Date | string
  }

  export type ElectionStatsCacheUpsertWithWhereUniqueWithoutElectionInput = {
    where: ElectionStatsCacheWhereUniqueInput
    update: XOR<ElectionStatsCacheUpdateWithoutElectionInput, ElectionStatsCacheUncheckedUpdateWithoutElectionInput>
    create: XOR<ElectionStatsCacheCreateWithoutElectionInput, ElectionStatsCacheUncheckedCreateWithoutElectionInput>
  }

  export type ElectionStatsCacheUpdateWithWhereUniqueWithoutElectionInput = {
    where: ElectionStatsCacheWhereUniqueInput
    data: XOR<ElectionStatsCacheUpdateWithoutElectionInput, ElectionStatsCacheUncheckedUpdateWithoutElectionInput>
  }

  export type ElectionStatsCacheUpdateManyWithWhereWithoutElectionInput = {
    where: ElectionStatsCacheScalarWhereInput
    data: XOR<ElectionStatsCacheUpdateManyMutationInput, ElectionStatsCacheUncheckedUpdateManyWithoutElectionInput>
  }

  export type ElectionStatsCacheScalarWhereInput = {
    AND?: ElectionStatsCacheScalarWhereInput | ElectionStatsCacheScalarWhereInput[]
    OR?: ElectionStatsCacheScalarWhereInput[]
    NOT?: ElectionStatsCacheScalarWhereInput | ElectionStatsCacheScalarWhereInput[]
    electionId?: BigIntFilter<"ElectionStatsCache"> | bigint | number
    candidateId?: BigIntFilter<"ElectionStatsCache"> | bigint | number
    votesCount?: BigIntFilter<"ElectionStatsCache"> | bigint | number
    lastUpdatedAt?: DateTimeFilter<"ElectionStatsCache"> | Date | string
  }

  export type UserUpsertWithoutCreatedElectionsInput = {
    update: XOR<UserUpdateWithoutCreatedElectionsInput, UserUncheckedUpdateWithoutCreatedElectionsInput>
    create: XOR<UserCreateWithoutCreatedElectionsInput, UserUncheckedCreateWithoutCreatedElectionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreatedElectionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreatedElectionsInput, UserUncheckedUpdateWithoutCreatedElectionsInput>
  }

  export type UserUpdateWithoutCreatedElectionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    encryptedPrivateKey?: NullableStringFieldUpdateOperationsInput | string | null
    penduduk?: PendudukUpdateOneRequiredWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
    votes?: VoteUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatedElectionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    pendudukId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    encryptedPrivateKey?: NullableStringFieldUpdateOperationsInput | string | null
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
    votes?: VoteUncheckedUpdateManyWithoutUserNestedInput
  }

  export type VoteUpsertWithWhereUniqueWithoutElectionInput = {
    where: VoteWhereUniqueInput
    update: XOR<VoteUpdateWithoutElectionInput, VoteUncheckedUpdateWithoutElectionInput>
    create: XOR<VoteCreateWithoutElectionInput, VoteUncheckedCreateWithoutElectionInput>
  }

  export type VoteUpdateWithWhereUniqueWithoutElectionInput = {
    where: VoteWhereUniqueInput
    data: XOR<VoteUpdateWithoutElectionInput, VoteUncheckedUpdateWithoutElectionInput>
  }

  export type VoteUpdateManyWithWhereWithoutElectionInput = {
    where: VoteScalarWhereInput
    data: XOR<VoteUpdateManyMutationInput, VoteUncheckedUpdateManyWithoutElectionInput>
  }

  export type ElectionCreateWithoutCandidatesInput = {
    id?: bigint | number
    name: string
    description: string
    level: string
    city?: string | null
    province?: string | null
    startTime: Date | string
    endTime: Date | string
    chainElectionId?: bigint | number | null
    statusOverride?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    electionStatsCache?: ElectionStatsCacheCreateNestedManyWithoutElectionInput
    creator: UserCreateNestedOneWithoutCreatedElectionsInput
    votes?: VoteCreateNestedManyWithoutElectionInput
  }

  export type ElectionUncheckedCreateWithoutCandidatesInput = {
    id?: bigint | number
    name: string
    description: string
    level: string
    city?: string | null
    province?: string | null
    startTime: Date | string
    endTime: Date | string
    chainElectionId?: bigint | number | null
    statusOverride?: string | null
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
    electionStatsCache?: ElectionStatsCacheUncheckedCreateNestedManyWithoutElectionInput
    votes?: VoteUncheckedCreateNestedManyWithoutElectionInput
  }

  export type ElectionCreateOrConnectWithoutCandidatesInput = {
    where: ElectionWhereUniqueInput
    create: XOR<ElectionCreateWithoutCandidatesInput, ElectionUncheckedCreateWithoutCandidatesInput>
  }

  export type ElectionStatsCacheCreateWithoutCandidateInput = {
    votesCount?: bigint | number
    lastUpdatedAt?: Date | string
    election: ElectionCreateNestedOneWithoutElectionStatsCacheInput
  }

  export type ElectionStatsCacheUncheckedCreateWithoutCandidateInput = {
    electionId: bigint | number
    votesCount?: bigint | number
    lastUpdatedAt?: Date | string
  }

  export type ElectionStatsCacheCreateOrConnectWithoutCandidateInput = {
    where: ElectionStatsCacheWhereUniqueInput
    create: XOR<ElectionStatsCacheCreateWithoutCandidateInput, ElectionStatsCacheUncheckedCreateWithoutCandidateInput>
  }

  export type ElectionStatsCacheCreateManyCandidateInputEnvelope = {
    data: ElectionStatsCacheCreateManyCandidateInput | ElectionStatsCacheCreateManyCandidateInput[]
    skipDuplicates?: boolean
  }

  export type VoteCreateWithoutCandidateInput = {
    id?: bigint | number
    txHash?: string | null
    castAt?: Date | string
    sourceIp?: string | null
    userAgent?: string | null
    election: ElectionCreateNestedOneWithoutVotesInput
    user: UserCreateNestedOneWithoutVotesInput
  }

  export type VoteUncheckedCreateWithoutCandidateInput = {
    id?: bigint | number
    userId: string
    electionId: bigint | number
    txHash?: string | null
    castAt?: Date | string
    sourceIp?: string | null
    userAgent?: string | null
  }

  export type VoteCreateOrConnectWithoutCandidateInput = {
    where: VoteWhereUniqueInput
    create: XOR<VoteCreateWithoutCandidateInput, VoteUncheckedCreateWithoutCandidateInput>
  }

  export type VoteCreateManyCandidateInputEnvelope = {
    data: VoteCreateManyCandidateInput | VoteCreateManyCandidateInput[]
    skipDuplicates?: boolean
  }

  export type ElectionUpsertWithoutCandidatesInput = {
    update: XOR<ElectionUpdateWithoutCandidatesInput, ElectionUncheckedUpdateWithoutCandidatesInput>
    create: XOR<ElectionCreateWithoutCandidatesInput, ElectionUncheckedCreateWithoutCandidatesInput>
    where?: ElectionWhereInput
  }

  export type ElectionUpdateToOneWithWhereWithoutCandidatesInput = {
    where?: ElectionWhereInput
    data: XOR<ElectionUpdateWithoutCandidatesInput, ElectionUncheckedUpdateWithoutCandidatesInput>
  }

  export type ElectionUpdateWithoutCandidatesInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    chainElectionId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    statusOverride?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    electionStatsCache?: ElectionStatsCacheUpdateManyWithoutElectionNestedInput
    creator?: UserUpdateOneRequiredWithoutCreatedElectionsNestedInput
    votes?: VoteUpdateManyWithoutElectionNestedInput
  }

  export type ElectionUncheckedUpdateWithoutCandidatesInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    chainElectionId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    statusOverride?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    electionStatsCache?: ElectionStatsCacheUncheckedUpdateManyWithoutElectionNestedInput
    votes?: VoteUncheckedUpdateManyWithoutElectionNestedInput
  }

  export type ElectionStatsCacheUpsertWithWhereUniqueWithoutCandidateInput = {
    where: ElectionStatsCacheWhereUniqueInput
    update: XOR<ElectionStatsCacheUpdateWithoutCandidateInput, ElectionStatsCacheUncheckedUpdateWithoutCandidateInput>
    create: XOR<ElectionStatsCacheCreateWithoutCandidateInput, ElectionStatsCacheUncheckedCreateWithoutCandidateInput>
  }

  export type ElectionStatsCacheUpdateWithWhereUniqueWithoutCandidateInput = {
    where: ElectionStatsCacheWhereUniqueInput
    data: XOR<ElectionStatsCacheUpdateWithoutCandidateInput, ElectionStatsCacheUncheckedUpdateWithoutCandidateInput>
  }

  export type ElectionStatsCacheUpdateManyWithWhereWithoutCandidateInput = {
    where: ElectionStatsCacheScalarWhereInput
    data: XOR<ElectionStatsCacheUpdateManyMutationInput, ElectionStatsCacheUncheckedUpdateManyWithoutCandidateInput>
  }

  export type VoteUpsertWithWhereUniqueWithoutCandidateInput = {
    where: VoteWhereUniqueInput
    update: XOR<VoteUpdateWithoutCandidateInput, VoteUncheckedUpdateWithoutCandidateInput>
    create: XOR<VoteCreateWithoutCandidateInput, VoteUncheckedCreateWithoutCandidateInput>
  }

  export type VoteUpdateWithWhereUniqueWithoutCandidateInput = {
    where: VoteWhereUniqueInput
    data: XOR<VoteUpdateWithoutCandidateInput, VoteUncheckedUpdateWithoutCandidateInput>
  }

  export type VoteUpdateManyWithWhereWithoutCandidateInput = {
    where: VoteScalarWhereInput
    data: XOR<VoteUpdateManyMutationInput, VoteUncheckedUpdateManyWithoutCandidateInput>
  }

  export type CandidateCreateWithoutVotesInput = {
    id?: bigint | number
    name: string
    party: string
    description?: string | null
    photoUrl?: string | null
    orderIndex: number
    createdAt?: Date | string
    updatedAt?: Date | string
    election: ElectionCreateNestedOneWithoutCandidatesInput
    electionStatsCache?: ElectionStatsCacheCreateNestedManyWithoutCandidateInput
  }

  export type CandidateUncheckedCreateWithoutVotesInput = {
    id?: bigint | number
    electionId: bigint | number
    name: string
    party: string
    description?: string | null
    photoUrl?: string | null
    orderIndex: number
    createdAt?: Date | string
    updatedAt?: Date | string
    electionStatsCache?: ElectionStatsCacheUncheckedCreateNestedManyWithoutCandidateInput
  }

  export type CandidateCreateOrConnectWithoutVotesInput = {
    where: CandidateWhereUniqueInput
    create: XOR<CandidateCreateWithoutVotesInput, CandidateUncheckedCreateWithoutVotesInput>
  }

  export type ElectionCreateWithoutVotesInput = {
    id?: bigint | number
    name: string
    description: string
    level: string
    city?: string | null
    province?: string | null
    startTime: Date | string
    endTime: Date | string
    chainElectionId?: bigint | number | null
    statusOverride?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    candidates?: CandidateCreateNestedManyWithoutElectionInput
    electionStatsCache?: ElectionStatsCacheCreateNestedManyWithoutElectionInput
    creator: UserCreateNestedOneWithoutCreatedElectionsInput
  }

  export type ElectionUncheckedCreateWithoutVotesInput = {
    id?: bigint | number
    name: string
    description: string
    level: string
    city?: string | null
    province?: string | null
    startTime: Date | string
    endTime: Date | string
    chainElectionId?: bigint | number | null
    statusOverride?: string | null
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
    candidates?: CandidateUncheckedCreateNestedManyWithoutElectionInput
    electionStatsCache?: ElectionStatsCacheUncheckedCreateNestedManyWithoutElectionInput
  }

  export type ElectionCreateOrConnectWithoutVotesInput = {
    where: ElectionWhereUniqueInput
    create: XOR<ElectionCreateWithoutVotesInput, ElectionUncheckedCreateWithoutVotesInput>
  }

  export type UserCreateWithoutVotesInput = {
    id?: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    walletAddress: string
    encryptedPrivateKey?: string | null
    penduduk: PendudukCreateNestedOneWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
    createdElections?: ElectionCreateNestedManyWithoutCreatorInput
  }

  export type UserUncheckedCreateWithoutVotesInput = {
    id?: string
    password: string
    role?: $Enums.Role
    pendudukId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    walletAddress: string
    encryptedPrivateKey?: string | null
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
    createdElections?: ElectionUncheckedCreateNestedManyWithoutCreatorInput
  }

  export type UserCreateOrConnectWithoutVotesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutVotesInput, UserUncheckedCreateWithoutVotesInput>
  }

  export type CandidateUpsertWithoutVotesInput = {
    update: XOR<CandidateUpdateWithoutVotesInput, CandidateUncheckedUpdateWithoutVotesInput>
    create: XOR<CandidateCreateWithoutVotesInput, CandidateUncheckedCreateWithoutVotesInput>
    where?: CandidateWhereInput
  }

  export type CandidateUpdateToOneWithWhereWithoutVotesInput = {
    where?: CandidateWhereInput
    data: XOR<CandidateUpdateWithoutVotesInput, CandidateUncheckedUpdateWithoutVotesInput>
  }

  export type CandidateUpdateWithoutVotesInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    party?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    election?: ElectionUpdateOneRequiredWithoutCandidatesNestedInput
    electionStatsCache?: ElectionStatsCacheUpdateManyWithoutCandidateNestedInput
  }

  export type CandidateUncheckedUpdateWithoutVotesInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    electionId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    party?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    electionStatsCache?: ElectionStatsCacheUncheckedUpdateManyWithoutCandidateNestedInput
  }

  export type ElectionUpsertWithoutVotesInput = {
    update: XOR<ElectionUpdateWithoutVotesInput, ElectionUncheckedUpdateWithoutVotesInput>
    create: XOR<ElectionCreateWithoutVotesInput, ElectionUncheckedCreateWithoutVotesInput>
    where?: ElectionWhereInput
  }

  export type ElectionUpdateToOneWithWhereWithoutVotesInput = {
    where?: ElectionWhereInput
    data: XOR<ElectionUpdateWithoutVotesInput, ElectionUncheckedUpdateWithoutVotesInput>
  }

  export type ElectionUpdateWithoutVotesInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    chainElectionId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    statusOverride?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    candidates?: CandidateUpdateManyWithoutElectionNestedInput
    electionStatsCache?: ElectionStatsCacheUpdateManyWithoutElectionNestedInput
    creator?: UserUpdateOneRequiredWithoutCreatedElectionsNestedInput
  }

  export type ElectionUncheckedUpdateWithoutVotesInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    chainElectionId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    statusOverride?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    candidates?: CandidateUncheckedUpdateManyWithoutElectionNestedInput
    electionStatsCache?: ElectionStatsCacheUncheckedUpdateManyWithoutElectionNestedInput
  }

  export type UserUpsertWithoutVotesInput = {
    update: XOR<UserUpdateWithoutVotesInput, UserUncheckedUpdateWithoutVotesInput>
    create: XOR<UserCreateWithoutVotesInput, UserUncheckedCreateWithoutVotesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutVotesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutVotesInput, UserUncheckedUpdateWithoutVotesInput>
  }

  export type UserUpdateWithoutVotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    encryptedPrivateKey?: NullableStringFieldUpdateOperationsInput | string | null
    penduduk?: PendudukUpdateOneRequiredWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
    createdElections?: ElectionUpdateManyWithoutCreatorNestedInput
  }

  export type UserUncheckedUpdateWithoutVotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    pendudukId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    encryptedPrivateKey?: NullableStringFieldUpdateOperationsInput | string | null
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
    createdElections?: ElectionUncheckedUpdateManyWithoutCreatorNestedInput
  }

  export type CandidateCreateWithoutElectionStatsCacheInput = {
    id?: bigint | number
    name: string
    party: string
    description?: string | null
    photoUrl?: string | null
    orderIndex: number
    createdAt?: Date | string
    updatedAt?: Date | string
    election: ElectionCreateNestedOneWithoutCandidatesInput
    votes?: VoteCreateNestedManyWithoutCandidateInput
  }

  export type CandidateUncheckedCreateWithoutElectionStatsCacheInput = {
    id?: bigint | number
    electionId: bigint | number
    name: string
    party: string
    description?: string | null
    photoUrl?: string | null
    orderIndex: number
    createdAt?: Date | string
    updatedAt?: Date | string
    votes?: VoteUncheckedCreateNestedManyWithoutCandidateInput
  }

  export type CandidateCreateOrConnectWithoutElectionStatsCacheInput = {
    where: CandidateWhereUniqueInput
    create: XOR<CandidateCreateWithoutElectionStatsCacheInput, CandidateUncheckedCreateWithoutElectionStatsCacheInput>
  }

  export type ElectionCreateWithoutElectionStatsCacheInput = {
    id?: bigint | number
    name: string
    description: string
    level: string
    city?: string | null
    province?: string | null
    startTime: Date | string
    endTime: Date | string
    chainElectionId?: bigint | number | null
    statusOverride?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    candidates?: CandidateCreateNestedManyWithoutElectionInput
    creator: UserCreateNestedOneWithoutCreatedElectionsInput
    votes?: VoteCreateNestedManyWithoutElectionInput
  }

  export type ElectionUncheckedCreateWithoutElectionStatsCacheInput = {
    id?: bigint | number
    name: string
    description: string
    level: string
    city?: string | null
    province?: string | null
    startTime: Date | string
    endTime: Date | string
    chainElectionId?: bigint | number | null
    statusOverride?: string | null
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
    candidates?: CandidateUncheckedCreateNestedManyWithoutElectionInput
    votes?: VoteUncheckedCreateNestedManyWithoutElectionInput
  }

  export type ElectionCreateOrConnectWithoutElectionStatsCacheInput = {
    where: ElectionWhereUniqueInput
    create: XOR<ElectionCreateWithoutElectionStatsCacheInput, ElectionUncheckedCreateWithoutElectionStatsCacheInput>
  }

  export type CandidateUpsertWithoutElectionStatsCacheInput = {
    update: XOR<CandidateUpdateWithoutElectionStatsCacheInput, CandidateUncheckedUpdateWithoutElectionStatsCacheInput>
    create: XOR<CandidateCreateWithoutElectionStatsCacheInput, CandidateUncheckedCreateWithoutElectionStatsCacheInput>
    where?: CandidateWhereInput
  }

  export type CandidateUpdateToOneWithWhereWithoutElectionStatsCacheInput = {
    where?: CandidateWhereInput
    data: XOR<CandidateUpdateWithoutElectionStatsCacheInput, CandidateUncheckedUpdateWithoutElectionStatsCacheInput>
  }

  export type CandidateUpdateWithoutElectionStatsCacheInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    party?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    election?: ElectionUpdateOneRequiredWithoutCandidatesNestedInput
    votes?: VoteUpdateManyWithoutCandidateNestedInput
  }

  export type CandidateUncheckedUpdateWithoutElectionStatsCacheInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    electionId?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    party?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    votes?: VoteUncheckedUpdateManyWithoutCandidateNestedInput
  }

  export type ElectionUpsertWithoutElectionStatsCacheInput = {
    update: XOR<ElectionUpdateWithoutElectionStatsCacheInput, ElectionUncheckedUpdateWithoutElectionStatsCacheInput>
    create: XOR<ElectionCreateWithoutElectionStatsCacheInput, ElectionUncheckedCreateWithoutElectionStatsCacheInput>
    where?: ElectionWhereInput
  }

  export type ElectionUpdateToOneWithWhereWithoutElectionStatsCacheInput = {
    where?: ElectionWhereInput
    data: XOR<ElectionUpdateWithoutElectionStatsCacheInput, ElectionUncheckedUpdateWithoutElectionStatsCacheInput>
  }

  export type ElectionUpdateWithoutElectionStatsCacheInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    chainElectionId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    statusOverride?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    candidates?: CandidateUpdateManyWithoutElectionNestedInput
    creator?: UserUpdateOneRequiredWithoutCreatedElectionsNestedInput
    votes?: VoteUpdateManyWithoutElectionNestedInput
  }

  export type ElectionUncheckedUpdateWithoutElectionStatsCacheInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    chainElectionId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    statusOverride?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    candidates?: CandidateUncheckedUpdateManyWithoutElectionNestedInput
    votes?: VoteUncheckedUpdateManyWithoutElectionNestedInput
  }

  export type UserCreateWithoutAuditLogsInput = {
    id?: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    walletAddress: string
    encryptedPrivateKey?: string | null
    penduduk: PendudukCreateNestedOneWithoutUserInput
    createdElections?: ElectionCreateNestedManyWithoutCreatorInput
    votes?: VoteCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAuditLogsInput = {
    id?: string
    password: string
    role?: $Enums.Role
    pendudukId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    walletAddress: string
    encryptedPrivateKey?: string | null
    createdElections?: ElectionUncheckedCreateNestedManyWithoutCreatorInput
    votes?: VoteUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAuditLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
  }

  export type UserUpsertWithoutAuditLogsInput = {
    update: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type UserUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    encryptedPrivateKey?: NullableStringFieldUpdateOperationsInput | string | null
    penduduk?: PendudukUpdateOneRequiredWithoutUserNestedInput
    createdElections?: ElectionUpdateManyWithoutCreatorNestedInput
    votes?: VoteUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    pendudukId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    encryptedPrivateKey?: NullableStringFieldUpdateOperationsInput | string | null
    createdElections?: ElectionUncheckedUpdateManyWithoutCreatorNestedInput
    votes?: VoteUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AuditLogCreateManyUserInput = {
    id?: bigint | number
    action: string
    entityType: string
    entityId: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ElectionCreateManyCreatorInput = {
    id?: bigint | number
    name: string
    description: string
    level: string
    city?: string | null
    province?: string | null
    startTime: Date | string
    endTime: Date | string
    chainElectionId?: bigint | number | null
    statusOverride?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VoteCreateManyUserInput = {
    id?: bigint | number
    electionId: bigint | number
    candidateId: bigint | number
    txHash?: string | null
    castAt?: Date | string
    sourceIp?: string | null
    userAgent?: string | null
  }

  export type AuditLogUpdateWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ElectionUpdateWithoutCreatorInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    chainElectionId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    statusOverride?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    candidates?: CandidateUpdateManyWithoutElectionNestedInput
    electionStatsCache?: ElectionStatsCacheUpdateManyWithoutElectionNestedInput
    votes?: VoteUpdateManyWithoutElectionNestedInput
  }

  export type ElectionUncheckedUpdateWithoutCreatorInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    chainElectionId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    statusOverride?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    candidates?: CandidateUncheckedUpdateManyWithoutElectionNestedInput
    electionStatsCache?: ElectionStatsCacheUncheckedUpdateManyWithoutElectionNestedInput
    votes?: VoteUncheckedUpdateManyWithoutElectionNestedInput
  }

  export type ElectionUncheckedUpdateManyWithoutCreatorInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    province?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    chainElectionId?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    statusOverride?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoteUpdateWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    castAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sourceIp?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    candidate?: CandidateUpdateOneRequiredWithoutVotesNestedInput
    election?: ElectionUpdateOneRequiredWithoutVotesNestedInput
  }

  export type VoteUncheckedUpdateWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    electionId?: BigIntFieldUpdateOperationsInput | bigint | number
    candidateId?: BigIntFieldUpdateOperationsInput | bigint | number
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    castAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sourceIp?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type VoteUncheckedUpdateManyWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    electionId?: BigIntFieldUpdateOperationsInput | bigint | number
    candidateId?: BigIntFieldUpdateOperationsInput | bigint | number
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    castAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sourceIp?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CandidateCreateManyElectionInput = {
    id?: bigint | number
    name: string
    party: string
    description?: string | null
    photoUrl?: string | null
    orderIndex: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ElectionStatsCacheCreateManyElectionInput = {
    candidateId: bigint | number
    votesCount?: bigint | number
    lastUpdatedAt?: Date | string
  }

  export type VoteCreateManyElectionInput = {
    id?: bigint | number
    userId: string
    candidateId: bigint | number
    txHash?: string | null
    castAt?: Date | string
    sourceIp?: string | null
    userAgent?: string | null
  }

  export type CandidateUpdateWithoutElectionInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    party?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    electionStatsCache?: ElectionStatsCacheUpdateManyWithoutCandidateNestedInput
    votes?: VoteUpdateManyWithoutCandidateNestedInput
  }

  export type CandidateUncheckedUpdateWithoutElectionInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    party?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    electionStatsCache?: ElectionStatsCacheUncheckedUpdateManyWithoutCandidateNestedInput
    votes?: VoteUncheckedUpdateManyWithoutCandidateNestedInput
  }

  export type CandidateUncheckedUpdateManyWithoutElectionInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    party?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ElectionStatsCacheUpdateWithoutElectionInput = {
    votesCount?: BigIntFieldUpdateOperationsInput | bigint | number
    lastUpdatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    candidate?: CandidateUpdateOneRequiredWithoutElectionStatsCacheNestedInput
  }

  export type ElectionStatsCacheUncheckedUpdateWithoutElectionInput = {
    candidateId?: BigIntFieldUpdateOperationsInput | bigint | number
    votesCount?: BigIntFieldUpdateOperationsInput | bigint | number
    lastUpdatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ElectionStatsCacheUncheckedUpdateManyWithoutElectionInput = {
    candidateId?: BigIntFieldUpdateOperationsInput | bigint | number
    votesCount?: BigIntFieldUpdateOperationsInput | bigint | number
    lastUpdatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoteUpdateWithoutElectionInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    castAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sourceIp?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    candidate?: CandidateUpdateOneRequiredWithoutVotesNestedInput
    user?: UserUpdateOneRequiredWithoutVotesNestedInput
  }

  export type VoteUncheckedUpdateWithoutElectionInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: StringFieldUpdateOperationsInput | string
    candidateId?: BigIntFieldUpdateOperationsInput | bigint | number
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    castAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sourceIp?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type VoteUncheckedUpdateManyWithoutElectionInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: StringFieldUpdateOperationsInput | string
    candidateId?: BigIntFieldUpdateOperationsInput | bigint | number
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    castAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sourceIp?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ElectionStatsCacheCreateManyCandidateInput = {
    electionId: bigint | number
    votesCount?: bigint | number
    lastUpdatedAt?: Date | string
  }

  export type VoteCreateManyCandidateInput = {
    id?: bigint | number
    userId: string
    electionId: bigint | number
    txHash?: string | null
    castAt?: Date | string
    sourceIp?: string | null
    userAgent?: string | null
  }

  export type ElectionStatsCacheUpdateWithoutCandidateInput = {
    votesCount?: BigIntFieldUpdateOperationsInput | bigint | number
    lastUpdatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    election?: ElectionUpdateOneRequiredWithoutElectionStatsCacheNestedInput
  }

  export type ElectionStatsCacheUncheckedUpdateWithoutCandidateInput = {
    electionId?: BigIntFieldUpdateOperationsInput | bigint | number
    votesCount?: BigIntFieldUpdateOperationsInput | bigint | number
    lastUpdatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ElectionStatsCacheUncheckedUpdateManyWithoutCandidateInput = {
    electionId?: BigIntFieldUpdateOperationsInput | bigint | number
    votesCount?: BigIntFieldUpdateOperationsInput | bigint | number
    lastUpdatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoteUpdateWithoutCandidateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    castAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sourceIp?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    election?: ElectionUpdateOneRequiredWithoutVotesNestedInput
    user?: UserUpdateOneRequiredWithoutVotesNestedInput
  }

  export type VoteUncheckedUpdateWithoutCandidateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: StringFieldUpdateOperationsInput | string
    electionId?: BigIntFieldUpdateOperationsInput | bigint | number
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    castAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sourceIp?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type VoteUncheckedUpdateManyWithoutCandidateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: StringFieldUpdateOperationsInput | string
    electionId?: BigIntFieldUpdateOperationsInput | bigint | number
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    castAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sourceIp?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}