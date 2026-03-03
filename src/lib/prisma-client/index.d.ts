
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Tenant
 * 
 */
export type Tenant = $Result.DefaultSelection<Prisma.$TenantPayload>
/**
 * Model EmployerGroup
 * 
 */
export type EmployerGroup = $Result.DefaultSelection<Prisma.$EmployerGroupPayload>
/**
 * Model Member
 * 
 */
export type Member = $Result.DefaultSelection<Prisma.$MemberPayload>
/**
 * Model MedicalEvent
 * 
 */
export type MedicalEvent = $Result.DefaultSelection<Prisma.$MedicalEventPayload>
/**
 * Model Claim
 * 
 */
export type Claim = $Result.DefaultSelection<Prisma.$ClaimPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const ClaimStatus: {
  PENDING: 'PENDING',
  VERIFIED: 'VERIFIED',
  DISPUTED: 'DISPUTED',
  PAID: 'PAID'
};

export type ClaimStatus = (typeof ClaimStatus)[keyof typeof ClaimStatus]

}

export type ClaimStatus = $Enums.ClaimStatus

export const ClaimStatus: typeof $Enums.ClaimStatus

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Tenants
 * const tenants = await prisma.tenant.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
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
   * // Fetch zero or more Tenants
   * const tenants = await prisma.tenant.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

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


  $extends: $Extensions.ExtendsHook<'extends', Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.tenant`: Exposes CRUD operations for the **Tenant** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tenants
    * const tenants = await prisma.tenant.findMany()
    * ```
    */
  get tenant(): Prisma.TenantDelegate<ExtArgs>;

  /**
   * `prisma.employerGroup`: Exposes CRUD operations for the **EmployerGroup** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EmployerGroups
    * const employerGroups = await prisma.employerGroup.findMany()
    * ```
    */
  get employerGroup(): Prisma.EmployerGroupDelegate<ExtArgs>;

  /**
   * `prisma.member`: Exposes CRUD operations for the **Member** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Members
    * const members = await prisma.member.findMany()
    * ```
    */
  get member(): Prisma.MemberDelegate<ExtArgs>;

  /**
   * `prisma.medicalEvent`: Exposes CRUD operations for the **MedicalEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MedicalEvents
    * const medicalEvents = await prisma.medicalEvent.findMany()
    * ```
    */
  get medicalEvent(): Prisma.MedicalEventDelegate<ExtArgs>;

  /**
   * `prisma.claim`: Exposes CRUD operations for the **Claim** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Claims
    * const claims = await prisma.claim.findMany()
    * ```
    */
  get claim(): Prisma.ClaimDelegate<ExtArgs>;
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
  export import NotFoundError = runtime.NotFoundError

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
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

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
   * Prisma Client JS version: 5.12.0
   * Query Engine version: 473ed3124229e22d881cb7addf559799debae1ab
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray | { toJSON(): unknown }

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
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
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
    Tenant: 'Tenant',
    EmployerGroup: 'EmployerGroup',
    Member: 'Member',
    MedicalEvent: 'MedicalEvent',
    Claim: 'Claim'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }


  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs}, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meta: {
      modelProps: 'tenant' | 'employerGroup' | 'member' | 'medicalEvent' | 'claim'
      txIsolationLevel: Prisma.TransactionIsolationLevel
    },
    model: {
      Tenant: {
        payload: Prisma.$TenantPayload<ExtArgs>
        fields: Prisma.TenantFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TenantFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TenantPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TenantFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          findFirst: {
            args: Prisma.TenantFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TenantPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TenantFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          findMany: {
            args: Prisma.TenantFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>[]
          }
          create: {
            args: Prisma.TenantCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          createMany: {
            args: Prisma.TenantCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.TenantDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          update: {
            args: Prisma.TenantUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          deleteMany: {
            args: Prisma.TenantDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.TenantUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.TenantUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          aggregate: {
            args: Prisma.TenantAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateTenant>
          }
          groupBy: {
            args: Prisma.TenantGroupByArgs<ExtArgs>,
            result: $Utils.Optional<TenantGroupByOutputType>[]
          }
          count: {
            args: Prisma.TenantCountArgs<ExtArgs>,
            result: $Utils.Optional<TenantCountAggregateOutputType> | number
          }
        }
      }
      EmployerGroup: {
        payload: Prisma.$EmployerGroupPayload<ExtArgs>
        fields: Prisma.EmployerGroupFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmployerGroupFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$EmployerGroupPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmployerGroupFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$EmployerGroupPayload>
          }
          findFirst: {
            args: Prisma.EmployerGroupFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$EmployerGroupPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmployerGroupFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$EmployerGroupPayload>
          }
          findMany: {
            args: Prisma.EmployerGroupFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$EmployerGroupPayload>[]
          }
          create: {
            args: Prisma.EmployerGroupCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$EmployerGroupPayload>
          }
          createMany: {
            args: Prisma.EmployerGroupCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.EmployerGroupDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$EmployerGroupPayload>
          }
          update: {
            args: Prisma.EmployerGroupUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$EmployerGroupPayload>
          }
          deleteMany: {
            args: Prisma.EmployerGroupDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.EmployerGroupUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.EmployerGroupUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$EmployerGroupPayload>
          }
          aggregate: {
            args: Prisma.EmployerGroupAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateEmployerGroup>
          }
          groupBy: {
            args: Prisma.EmployerGroupGroupByArgs<ExtArgs>,
            result: $Utils.Optional<EmployerGroupGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmployerGroupCountArgs<ExtArgs>,
            result: $Utils.Optional<EmployerGroupCountAggregateOutputType> | number
          }
        }
      }
      Member: {
        payload: Prisma.$MemberPayload<ExtArgs>
        fields: Prisma.MemberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MemberFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MemberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MemberFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>
          }
          findFirst: {
            args: Prisma.MemberFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MemberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MemberFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>
          }
          findMany: {
            args: Prisma.MemberFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>[]
          }
          create: {
            args: Prisma.MemberCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>
          }
          createMany: {
            args: Prisma.MemberCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.MemberDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>
          }
          update: {
            args: Prisma.MemberUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>
          }
          deleteMany: {
            args: Prisma.MemberDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.MemberUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.MemberUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MemberPayload>
          }
          aggregate: {
            args: Prisma.MemberAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateMember>
          }
          groupBy: {
            args: Prisma.MemberGroupByArgs<ExtArgs>,
            result: $Utils.Optional<MemberGroupByOutputType>[]
          }
          count: {
            args: Prisma.MemberCountArgs<ExtArgs>,
            result: $Utils.Optional<MemberCountAggregateOutputType> | number
          }
        }
      }
      MedicalEvent: {
        payload: Prisma.$MedicalEventPayload<ExtArgs>
        fields: Prisma.MedicalEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MedicalEventFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MedicalEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MedicalEventFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MedicalEventPayload>
          }
          findFirst: {
            args: Prisma.MedicalEventFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MedicalEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MedicalEventFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MedicalEventPayload>
          }
          findMany: {
            args: Prisma.MedicalEventFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MedicalEventPayload>[]
          }
          create: {
            args: Prisma.MedicalEventCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MedicalEventPayload>
          }
          createMany: {
            args: Prisma.MedicalEventCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.MedicalEventDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MedicalEventPayload>
          }
          update: {
            args: Prisma.MedicalEventUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MedicalEventPayload>
          }
          deleteMany: {
            args: Prisma.MedicalEventDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.MedicalEventUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.MedicalEventUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MedicalEventPayload>
          }
          aggregate: {
            args: Prisma.MedicalEventAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateMedicalEvent>
          }
          groupBy: {
            args: Prisma.MedicalEventGroupByArgs<ExtArgs>,
            result: $Utils.Optional<MedicalEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.MedicalEventCountArgs<ExtArgs>,
            result: $Utils.Optional<MedicalEventCountAggregateOutputType> | number
          }
        }
      }
      Claim: {
        payload: Prisma.$ClaimPayload<ExtArgs>
        fields: Prisma.ClaimFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClaimFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ClaimPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClaimFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ClaimPayload>
          }
          findFirst: {
            args: Prisma.ClaimFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ClaimPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClaimFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ClaimPayload>
          }
          findMany: {
            args: Prisma.ClaimFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ClaimPayload>[]
          }
          create: {
            args: Prisma.ClaimCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ClaimPayload>
          }
          createMany: {
            args: Prisma.ClaimCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.ClaimDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ClaimPayload>
          }
          update: {
            args: Prisma.ClaimUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ClaimPayload>
          }
          deleteMany: {
            args: Prisma.ClaimDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.ClaimUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.ClaimUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ClaimPayload>
          }
          aggregate: {
            args: Prisma.ClaimAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateClaim>
          }
          groupBy: {
            args: Prisma.ClaimGroupByArgs<ExtArgs>,
            result: $Utils.Optional<ClaimGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClaimCountArgs<ExtArgs>,
            result: $Utils.Optional<ClaimCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<'define', Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
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
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

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
    | 'update'
    | 'updateMany'
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

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

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
   * Count Type TenantCountOutputType
   */

  export type TenantCountOutputType = {
    employers: number
  }

  export type TenantCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employers?: boolean | TenantCountOutputTypeCountEmployersArgs
  }

  // Custom InputTypes

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantCountOutputType
     */
    select?: TenantCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountEmployersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployerGroupWhereInput
  }



  /**
   * Count Type EmployerGroupCountOutputType
   */

  export type EmployerGroupCountOutputType = {
    members: number
  }

  export type EmployerGroupCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    members?: boolean | EmployerGroupCountOutputTypeCountMembersArgs
  }

  // Custom InputTypes

  /**
   * EmployerGroupCountOutputType without action
   */
  export type EmployerGroupCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployerGroupCountOutputType
     */
    select?: EmployerGroupCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * EmployerGroupCountOutputType without action
   */
  export type EmployerGroupCountOutputTypeCountMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MemberWhereInput
  }



  /**
   * Count Type MemberCountOutputType
   */

  export type MemberCountOutputType = {
    medicalEvents: number
  }

  export type MemberCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    medicalEvents?: boolean | MemberCountOutputTypeCountMedicalEventsArgs
  }

  // Custom InputTypes

  /**
   * MemberCountOutputType without action
   */
  export type MemberCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberCountOutputType
     */
    select?: MemberCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * MemberCountOutputType without action
   */
  export type MemberCountOutputTypeCountMedicalEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MedicalEventWhereInput
  }



  /**
   * Count Type MedicalEventCountOutputType
   */

  export type MedicalEventCountOutputType = {
    claims: number
  }

  export type MedicalEventCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    claims?: boolean | MedicalEventCountOutputTypeCountClaimsArgs
  }

  // Custom InputTypes

  /**
   * MedicalEventCountOutputType without action
   */
  export type MedicalEventCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalEventCountOutputType
     */
    select?: MedicalEventCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * MedicalEventCountOutputType without action
   */
  export type MedicalEventCountOutputTypeCountClaimsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClaimWhereInput
  }



  /**
   * Models
   */

  /**
   * Model Tenant
   */

  export type AggregateTenant = {
    _count: TenantCountAggregateOutputType | null
    _min: TenantMinAggregateOutputType | null
    _max: TenantMaxAggregateOutputType | null
  }

  export type TenantMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    primaryColor: string | null
    logoUrl: string | null
    apiKeyHash: string | null
    createdAt: Date | null
  }

  export type TenantMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    primaryColor: string | null
    logoUrl: string | null
    apiKeyHash: string | null
    createdAt: Date | null
  }

  export type TenantCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    primaryColor: number
    logoUrl: number
    apiKeyHash: number
    createdAt: number
    _all: number
  }


  export type TenantMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    primaryColor?: true
    logoUrl?: true
    apiKeyHash?: true
    createdAt?: true
  }

  export type TenantMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    primaryColor?: true
    logoUrl?: true
    apiKeyHash?: true
    createdAt?: true
  }

  export type TenantCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    primaryColor?: true
    logoUrl?: true
    apiKeyHash?: true
    createdAt?: true
    _all?: true
  }

  export type TenantAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tenant to aggregate.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tenants
    **/
    _count?: true | TenantCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TenantMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TenantMaxAggregateInputType
  }

  export type GetTenantAggregateType<T extends TenantAggregateArgs> = {
        [P in keyof T & keyof AggregateTenant]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTenant[P]>
      : GetScalarType<T[P], AggregateTenant[P]>
  }




  export type TenantGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TenantWhereInput
    orderBy?: TenantOrderByWithAggregationInput | TenantOrderByWithAggregationInput[]
    by: TenantScalarFieldEnum[] | TenantScalarFieldEnum
    having?: TenantScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TenantCountAggregateInputType | true
    _min?: TenantMinAggregateInputType
    _max?: TenantMaxAggregateInputType
  }

  export type TenantGroupByOutputType = {
    id: string
    name: string
    slug: string
    primaryColor: string
    logoUrl: string | null
    apiKeyHash: string
    createdAt: Date
    _count: TenantCountAggregateOutputType | null
    _min: TenantMinAggregateOutputType | null
    _max: TenantMaxAggregateOutputType | null
  }

  type GetTenantGroupByPayload<T extends TenantGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TenantGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TenantGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TenantGroupByOutputType[P]>
            : GetScalarType<T[P], TenantGroupByOutputType[P]>
        }
      >
    >


  export type TenantSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    primaryColor?: boolean
    logoUrl?: boolean
    apiKeyHash?: boolean
    createdAt?: boolean
    employers?: boolean | Tenant$employersArgs<ExtArgs>
    _count?: boolean | TenantCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tenant"]>

  export type TenantSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    primaryColor?: boolean
    logoUrl?: boolean
    apiKeyHash?: boolean
    createdAt?: boolean
  }

  export type TenantInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employers?: boolean | Tenant$employersArgs<ExtArgs>
    _count?: boolean | TenantCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $TenantPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tenant"
    objects: {
      employers: Prisma.$EmployerGroupPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      primaryColor: string
      logoUrl: string | null
      apiKeyHash: string
      createdAt: Date
    }, ExtArgs["result"]["tenant"]>
    composites: {}
  }


  type TenantGetPayload<S extends boolean | null | undefined | TenantDefaultArgs> = $Result.GetResult<Prisma.$TenantPayload, S>

  type TenantCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TenantFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TenantCountAggregateInputType | true
    }

  export interface TenantDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tenant'], meta: { name: 'Tenant' } }
    /**
     * Find zero or one Tenant that matches the filter.
     * @param {TenantFindUniqueArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends TenantFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, TenantFindUniqueArgs<ExtArgs>>
    ): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Tenant that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {TenantFindUniqueOrThrowArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends TenantFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, TenantFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Tenant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFindFirstArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends TenantFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, TenantFindFirstArgs<ExtArgs>>
    ): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Tenant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFindFirstOrThrowArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends TenantFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, TenantFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Tenants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tenants
     * const tenants = await prisma.tenant.findMany()
     * 
     * // Get first 10 Tenants
     * const tenants = await prisma.tenant.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tenantWithIdOnly = await prisma.tenant.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends TenantFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, TenantFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Tenant.
     * @param {TenantCreateArgs} args - Arguments to create a Tenant.
     * @example
     * // Create one Tenant
     * const Tenant = await prisma.tenant.create({
     *   data: {
     *     // ... data to create a Tenant
     *   }
     * })
     * 
    **/
    create<T extends TenantCreateArgs<ExtArgs>>(
      args: SelectSubset<T, TenantCreateArgs<ExtArgs>>
    ): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Tenants.
     *     @param {TenantCreateManyArgs} args - Arguments to create many Tenants.
     *     @example
     *     // Create many Tenants
     *     const tenant = await prisma.tenant.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends TenantCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, TenantCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Tenant.
     * @param {TenantDeleteArgs} args - Arguments to delete one Tenant.
     * @example
     * // Delete one Tenant
     * const Tenant = await prisma.tenant.delete({
     *   where: {
     *     // ... filter to delete one Tenant
     *   }
     * })
     * 
    **/
    delete<T extends TenantDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, TenantDeleteArgs<ExtArgs>>
    ): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Tenant.
     * @param {TenantUpdateArgs} args - Arguments to update one Tenant.
     * @example
     * // Update one Tenant
     * const tenant = await prisma.tenant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends TenantUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, TenantUpdateArgs<ExtArgs>>
    ): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Tenants.
     * @param {TenantDeleteManyArgs} args - Arguments to filter Tenants to delete.
     * @example
     * // Delete a few Tenants
     * const { count } = await prisma.tenant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends TenantDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, TenantDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tenants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tenants
     * const tenant = await prisma.tenant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends TenantUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, TenantUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Tenant.
     * @param {TenantUpsertArgs} args - Arguments to update or create a Tenant.
     * @example
     * // Update or create a Tenant
     * const tenant = await prisma.tenant.upsert({
     *   create: {
     *     // ... data to create a Tenant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tenant we want to update
     *   }
     * })
    **/
    upsert<T extends TenantUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, TenantUpsertArgs<ExtArgs>>
    ): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Tenants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantCountArgs} args - Arguments to filter Tenants to count.
     * @example
     * // Count the number of Tenants
     * const count = await prisma.tenant.count({
     *   where: {
     *     // ... the filter for the Tenants we want to count
     *   }
     * })
    **/
    count<T extends TenantCountArgs>(
      args?: Subset<T, TenantCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TenantCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tenant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TenantAggregateArgs>(args: Subset<T, TenantAggregateArgs>): Prisma.PrismaPromise<GetTenantAggregateType<T>>

    /**
     * Group by Tenant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantGroupByArgs} args - Group by arguments.
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
      T extends TenantGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TenantGroupByArgs['orderBy'] }
        : { orderBy?: TenantGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TenantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTenantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tenant model
   */
  readonly fields: TenantFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tenant.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TenantClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    employers<T extends Tenant$employersArgs<ExtArgs> = {}>(args?: Subset<T, Tenant$employersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployerGroupPayload<ExtArgs>, T, 'findMany'> | Null>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Tenant model
   */ 
  interface TenantFieldRefs {
    readonly id: FieldRef<"Tenant", 'String'>
    readonly name: FieldRef<"Tenant", 'String'>
    readonly slug: FieldRef<"Tenant", 'String'>
    readonly primaryColor: FieldRef<"Tenant", 'String'>
    readonly logoUrl: FieldRef<"Tenant", 'String'>
    readonly apiKeyHash: FieldRef<"Tenant", 'String'>
    readonly createdAt: FieldRef<"Tenant", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * Tenant findUnique
   */
  export type TenantFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where: TenantWhereUniqueInput
  }


  /**
   * Tenant findUniqueOrThrow
   */
  export type TenantFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where: TenantWhereUniqueInput
  }


  /**
   * Tenant findFirst
   */
  export type TenantFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tenants.
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tenants.
     */
    distinct?: TenantScalarFieldEnum | TenantScalarFieldEnum[]
  }


  /**
   * Tenant findFirstOrThrow
   */
  export type TenantFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tenants.
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tenants.
     */
    distinct?: TenantScalarFieldEnum | TenantScalarFieldEnum[]
  }


  /**
   * Tenant findMany
   */
  export type TenantFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenants to fetch.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tenants.
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    distinct?: TenantScalarFieldEnum | TenantScalarFieldEnum[]
  }


  /**
   * Tenant create
   */
  export type TenantCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * The data needed to create a Tenant.
     */
    data: XOR<TenantCreateInput, TenantUncheckedCreateInput>
  }


  /**
   * Tenant createMany
   */
  export type TenantCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tenants.
     */
    data: TenantCreateManyInput | TenantCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * Tenant update
   */
  export type TenantUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * The data needed to update a Tenant.
     */
    data: XOR<TenantUpdateInput, TenantUncheckedUpdateInput>
    /**
     * Choose, which Tenant to update.
     */
    where: TenantWhereUniqueInput
  }


  /**
   * Tenant updateMany
   */
  export type TenantUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tenants.
     */
    data: XOR<TenantUpdateManyMutationInput, TenantUncheckedUpdateManyInput>
    /**
     * Filter which Tenants to update
     */
    where?: TenantWhereInput
  }


  /**
   * Tenant upsert
   */
  export type TenantUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * The filter to search for the Tenant to update in case it exists.
     */
    where: TenantWhereUniqueInput
    /**
     * In case the Tenant found by the `where` argument doesn't exist, create a new Tenant with this data.
     */
    create: XOR<TenantCreateInput, TenantUncheckedCreateInput>
    /**
     * In case the Tenant was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TenantUpdateInput, TenantUncheckedUpdateInput>
  }


  /**
   * Tenant delete
   */
  export type TenantDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter which Tenant to delete.
     */
    where: TenantWhereUniqueInput
  }


  /**
   * Tenant deleteMany
   */
  export type TenantDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tenants to delete
     */
    where?: TenantWhereInput
  }


  /**
   * Tenant.employers
   */
  export type Tenant$employersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployerGroup
     */
    select?: EmployerGroupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EmployerGroupInclude<ExtArgs> | null
    where?: EmployerGroupWhereInput
    orderBy?: EmployerGroupOrderByWithRelationInput | EmployerGroupOrderByWithRelationInput[]
    cursor?: EmployerGroupWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmployerGroupScalarFieldEnum | EmployerGroupScalarFieldEnum[]
  }


  /**
   * Tenant without action
   */
  export type TenantDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TenantInclude<ExtArgs> | null
  }



  /**
   * Model EmployerGroup
   */

  export type AggregateEmployerGroup = {
    _count: EmployerGroupCountAggregateOutputType | null
    _min: EmployerGroupMinAggregateOutputType | null
    _max: EmployerGroupMaxAggregateOutputType | null
  }

  export type EmployerGroupMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    name: string | null
    planDocUrl: string | null
    createdAt: Date | null
  }

  export type EmployerGroupMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    name: string | null
    planDocUrl: string | null
    createdAt: Date | null
  }

  export type EmployerGroupCountAggregateOutputType = {
    id: number
    tenantId: number
    name: number
    planDocUrl: number
    planRules: number
    createdAt: number
    _all: number
  }


  export type EmployerGroupMinAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    planDocUrl?: true
    createdAt?: true
  }

  export type EmployerGroupMaxAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    planDocUrl?: true
    createdAt?: true
  }

  export type EmployerGroupCountAggregateInputType = {
    id?: true
    tenantId?: true
    name?: true
    planDocUrl?: true
    planRules?: true
    createdAt?: true
    _all?: true
  }

  export type EmployerGroupAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmployerGroup to aggregate.
     */
    where?: EmployerGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployerGroups to fetch.
     */
    orderBy?: EmployerGroupOrderByWithRelationInput | EmployerGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmployerGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployerGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployerGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EmployerGroups
    **/
    _count?: true | EmployerGroupCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmployerGroupMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmployerGroupMaxAggregateInputType
  }

  export type GetEmployerGroupAggregateType<T extends EmployerGroupAggregateArgs> = {
        [P in keyof T & keyof AggregateEmployerGroup]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmployerGroup[P]>
      : GetScalarType<T[P], AggregateEmployerGroup[P]>
  }




  export type EmployerGroupGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployerGroupWhereInput
    orderBy?: EmployerGroupOrderByWithAggregationInput | EmployerGroupOrderByWithAggregationInput[]
    by: EmployerGroupScalarFieldEnum[] | EmployerGroupScalarFieldEnum
    having?: EmployerGroupScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmployerGroupCountAggregateInputType | true
    _min?: EmployerGroupMinAggregateInputType
    _max?: EmployerGroupMaxAggregateInputType
  }

  export type EmployerGroupGroupByOutputType = {
    id: string
    tenantId: string
    name: string
    planDocUrl: string | null
    planRules: JsonValue | null
    createdAt: Date
    _count: EmployerGroupCountAggregateOutputType | null
    _min: EmployerGroupMinAggregateOutputType | null
    _max: EmployerGroupMaxAggregateOutputType | null
  }

  type GetEmployerGroupGroupByPayload<T extends EmployerGroupGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmployerGroupGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmployerGroupGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmployerGroupGroupByOutputType[P]>
            : GetScalarType<T[P], EmployerGroupGroupByOutputType[P]>
        }
      >
    >


  export type EmployerGroupSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    name?: boolean
    planDocUrl?: boolean
    planRules?: boolean
    createdAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    members?: boolean | EmployerGroup$membersArgs<ExtArgs>
    _count?: boolean | EmployerGroupCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["employerGroup"]>

  export type EmployerGroupSelectScalar = {
    id?: boolean
    tenantId?: boolean
    name?: boolean
    planDocUrl?: boolean
    planRules?: boolean
    createdAt?: boolean
  }

  export type EmployerGroupInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    members?: boolean | EmployerGroup$membersArgs<ExtArgs>
    _count?: boolean | EmployerGroupCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $EmployerGroupPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EmployerGroup"
    objects: {
      tenant: Prisma.$TenantPayload<ExtArgs>
      members: Prisma.$MemberPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      name: string
      planDocUrl: string | null
      planRules: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["employerGroup"]>
    composites: {}
  }


  type EmployerGroupGetPayload<S extends boolean | null | undefined | EmployerGroupDefaultArgs> = $Result.GetResult<Prisma.$EmployerGroupPayload, S>

  type EmployerGroupCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<EmployerGroupFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: EmployerGroupCountAggregateInputType | true
    }

  export interface EmployerGroupDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EmployerGroup'], meta: { name: 'EmployerGroup' } }
    /**
     * Find zero or one EmployerGroup that matches the filter.
     * @param {EmployerGroupFindUniqueArgs} args - Arguments to find a EmployerGroup
     * @example
     * // Get one EmployerGroup
     * const employerGroup = await prisma.employerGroup.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends EmployerGroupFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, EmployerGroupFindUniqueArgs<ExtArgs>>
    ): Prisma__EmployerGroupClient<$Result.GetResult<Prisma.$EmployerGroupPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one EmployerGroup that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {EmployerGroupFindUniqueOrThrowArgs} args - Arguments to find a EmployerGroup
     * @example
     * // Get one EmployerGroup
     * const employerGroup = await prisma.employerGroup.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends EmployerGroupFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, EmployerGroupFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__EmployerGroupClient<$Result.GetResult<Prisma.$EmployerGroupPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first EmployerGroup that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployerGroupFindFirstArgs} args - Arguments to find a EmployerGroup
     * @example
     * // Get one EmployerGroup
     * const employerGroup = await prisma.employerGroup.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends EmployerGroupFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, EmployerGroupFindFirstArgs<ExtArgs>>
    ): Prisma__EmployerGroupClient<$Result.GetResult<Prisma.$EmployerGroupPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first EmployerGroup that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployerGroupFindFirstOrThrowArgs} args - Arguments to find a EmployerGroup
     * @example
     * // Get one EmployerGroup
     * const employerGroup = await prisma.employerGroup.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends EmployerGroupFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, EmployerGroupFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__EmployerGroupClient<$Result.GetResult<Prisma.$EmployerGroupPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more EmployerGroups that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployerGroupFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EmployerGroups
     * const employerGroups = await prisma.employerGroup.findMany()
     * 
     * // Get first 10 EmployerGroups
     * const employerGroups = await prisma.employerGroup.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const employerGroupWithIdOnly = await prisma.employerGroup.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends EmployerGroupFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, EmployerGroupFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployerGroupPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a EmployerGroup.
     * @param {EmployerGroupCreateArgs} args - Arguments to create a EmployerGroup.
     * @example
     * // Create one EmployerGroup
     * const EmployerGroup = await prisma.employerGroup.create({
     *   data: {
     *     // ... data to create a EmployerGroup
     *   }
     * })
     * 
    **/
    create<T extends EmployerGroupCreateArgs<ExtArgs>>(
      args: SelectSubset<T, EmployerGroupCreateArgs<ExtArgs>>
    ): Prisma__EmployerGroupClient<$Result.GetResult<Prisma.$EmployerGroupPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many EmployerGroups.
     *     @param {EmployerGroupCreateManyArgs} args - Arguments to create many EmployerGroups.
     *     @example
     *     // Create many EmployerGroups
     *     const employerGroup = await prisma.employerGroup.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends EmployerGroupCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, EmployerGroupCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a EmployerGroup.
     * @param {EmployerGroupDeleteArgs} args - Arguments to delete one EmployerGroup.
     * @example
     * // Delete one EmployerGroup
     * const EmployerGroup = await prisma.employerGroup.delete({
     *   where: {
     *     // ... filter to delete one EmployerGroup
     *   }
     * })
     * 
    **/
    delete<T extends EmployerGroupDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, EmployerGroupDeleteArgs<ExtArgs>>
    ): Prisma__EmployerGroupClient<$Result.GetResult<Prisma.$EmployerGroupPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one EmployerGroup.
     * @param {EmployerGroupUpdateArgs} args - Arguments to update one EmployerGroup.
     * @example
     * // Update one EmployerGroup
     * const employerGroup = await prisma.employerGroup.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends EmployerGroupUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, EmployerGroupUpdateArgs<ExtArgs>>
    ): Prisma__EmployerGroupClient<$Result.GetResult<Prisma.$EmployerGroupPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more EmployerGroups.
     * @param {EmployerGroupDeleteManyArgs} args - Arguments to filter EmployerGroups to delete.
     * @example
     * // Delete a few EmployerGroups
     * const { count } = await prisma.employerGroup.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends EmployerGroupDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, EmployerGroupDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmployerGroups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployerGroupUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EmployerGroups
     * const employerGroup = await prisma.employerGroup.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends EmployerGroupUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, EmployerGroupUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one EmployerGroup.
     * @param {EmployerGroupUpsertArgs} args - Arguments to update or create a EmployerGroup.
     * @example
     * // Update or create a EmployerGroup
     * const employerGroup = await prisma.employerGroup.upsert({
     *   create: {
     *     // ... data to create a EmployerGroup
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EmployerGroup we want to update
     *   }
     * })
    **/
    upsert<T extends EmployerGroupUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, EmployerGroupUpsertArgs<ExtArgs>>
    ): Prisma__EmployerGroupClient<$Result.GetResult<Prisma.$EmployerGroupPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of EmployerGroups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployerGroupCountArgs} args - Arguments to filter EmployerGroups to count.
     * @example
     * // Count the number of EmployerGroups
     * const count = await prisma.employerGroup.count({
     *   where: {
     *     // ... the filter for the EmployerGroups we want to count
     *   }
     * })
    **/
    count<T extends EmployerGroupCountArgs>(
      args?: Subset<T, EmployerGroupCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmployerGroupCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EmployerGroup.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployerGroupAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EmployerGroupAggregateArgs>(args: Subset<T, EmployerGroupAggregateArgs>): Prisma.PrismaPromise<GetEmployerGroupAggregateType<T>>

    /**
     * Group by EmployerGroup.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployerGroupGroupByArgs} args - Group by arguments.
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
      T extends EmployerGroupGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmployerGroupGroupByArgs['orderBy'] }
        : { orderBy?: EmployerGroupGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, EmployerGroupGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmployerGroupGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EmployerGroup model
   */
  readonly fields: EmployerGroupFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EmployerGroup.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmployerGroupClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TenantDefaultArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    members<T extends EmployerGroup$membersArgs<ExtArgs> = {}>(args?: Subset<T, EmployerGroup$membersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, 'findMany'> | Null>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the EmployerGroup model
   */ 
  interface EmployerGroupFieldRefs {
    readonly id: FieldRef<"EmployerGroup", 'String'>
    readonly tenantId: FieldRef<"EmployerGroup", 'String'>
    readonly name: FieldRef<"EmployerGroup", 'String'>
    readonly planDocUrl: FieldRef<"EmployerGroup", 'String'>
    readonly planRules: FieldRef<"EmployerGroup", 'Json'>
    readonly createdAt: FieldRef<"EmployerGroup", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * EmployerGroup findUnique
   */
  export type EmployerGroupFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployerGroup
     */
    select?: EmployerGroupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EmployerGroupInclude<ExtArgs> | null
    /**
     * Filter, which EmployerGroup to fetch.
     */
    where: EmployerGroupWhereUniqueInput
  }


  /**
   * EmployerGroup findUniqueOrThrow
   */
  export type EmployerGroupFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployerGroup
     */
    select?: EmployerGroupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EmployerGroupInclude<ExtArgs> | null
    /**
     * Filter, which EmployerGroup to fetch.
     */
    where: EmployerGroupWhereUniqueInput
  }


  /**
   * EmployerGroup findFirst
   */
  export type EmployerGroupFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployerGroup
     */
    select?: EmployerGroupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EmployerGroupInclude<ExtArgs> | null
    /**
     * Filter, which EmployerGroup to fetch.
     */
    where?: EmployerGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployerGroups to fetch.
     */
    orderBy?: EmployerGroupOrderByWithRelationInput | EmployerGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmployerGroups.
     */
    cursor?: EmployerGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployerGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployerGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmployerGroups.
     */
    distinct?: EmployerGroupScalarFieldEnum | EmployerGroupScalarFieldEnum[]
  }


  /**
   * EmployerGroup findFirstOrThrow
   */
  export type EmployerGroupFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployerGroup
     */
    select?: EmployerGroupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EmployerGroupInclude<ExtArgs> | null
    /**
     * Filter, which EmployerGroup to fetch.
     */
    where?: EmployerGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployerGroups to fetch.
     */
    orderBy?: EmployerGroupOrderByWithRelationInput | EmployerGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmployerGroups.
     */
    cursor?: EmployerGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployerGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployerGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmployerGroups.
     */
    distinct?: EmployerGroupScalarFieldEnum | EmployerGroupScalarFieldEnum[]
  }


  /**
   * EmployerGroup findMany
   */
  export type EmployerGroupFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployerGroup
     */
    select?: EmployerGroupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EmployerGroupInclude<ExtArgs> | null
    /**
     * Filter, which EmployerGroups to fetch.
     */
    where?: EmployerGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmployerGroups to fetch.
     */
    orderBy?: EmployerGroupOrderByWithRelationInput | EmployerGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EmployerGroups.
     */
    cursor?: EmployerGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmployerGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmployerGroups.
     */
    skip?: number
    distinct?: EmployerGroupScalarFieldEnum | EmployerGroupScalarFieldEnum[]
  }


  /**
   * EmployerGroup create
   */
  export type EmployerGroupCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployerGroup
     */
    select?: EmployerGroupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EmployerGroupInclude<ExtArgs> | null
    /**
     * The data needed to create a EmployerGroup.
     */
    data: XOR<EmployerGroupCreateInput, EmployerGroupUncheckedCreateInput>
  }


  /**
   * EmployerGroup createMany
   */
  export type EmployerGroupCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EmployerGroups.
     */
    data: EmployerGroupCreateManyInput | EmployerGroupCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * EmployerGroup update
   */
  export type EmployerGroupUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployerGroup
     */
    select?: EmployerGroupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EmployerGroupInclude<ExtArgs> | null
    /**
     * The data needed to update a EmployerGroup.
     */
    data: XOR<EmployerGroupUpdateInput, EmployerGroupUncheckedUpdateInput>
    /**
     * Choose, which EmployerGroup to update.
     */
    where: EmployerGroupWhereUniqueInput
  }


  /**
   * EmployerGroup updateMany
   */
  export type EmployerGroupUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EmployerGroups.
     */
    data: XOR<EmployerGroupUpdateManyMutationInput, EmployerGroupUncheckedUpdateManyInput>
    /**
     * Filter which EmployerGroups to update
     */
    where?: EmployerGroupWhereInput
  }


  /**
   * EmployerGroup upsert
   */
  export type EmployerGroupUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployerGroup
     */
    select?: EmployerGroupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EmployerGroupInclude<ExtArgs> | null
    /**
     * The filter to search for the EmployerGroup to update in case it exists.
     */
    where: EmployerGroupWhereUniqueInput
    /**
     * In case the EmployerGroup found by the `where` argument doesn't exist, create a new EmployerGroup with this data.
     */
    create: XOR<EmployerGroupCreateInput, EmployerGroupUncheckedCreateInput>
    /**
     * In case the EmployerGroup was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmployerGroupUpdateInput, EmployerGroupUncheckedUpdateInput>
  }


  /**
   * EmployerGroup delete
   */
  export type EmployerGroupDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployerGroup
     */
    select?: EmployerGroupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EmployerGroupInclude<ExtArgs> | null
    /**
     * Filter which EmployerGroup to delete.
     */
    where: EmployerGroupWhereUniqueInput
  }


  /**
   * EmployerGroup deleteMany
   */
  export type EmployerGroupDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmployerGroups to delete
     */
    where?: EmployerGroupWhereInput
  }


  /**
   * EmployerGroup.members
   */
  export type EmployerGroup$membersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MemberInclude<ExtArgs> | null
    where?: MemberWhereInput
    orderBy?: MemberOrderByWithRelationInput | MemberOrderByWithRelationInput[]
    cursor?: MemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MemberScalarFieldEnum | MemberScalarFieldEnum[]
  }


  /**
   * EmployerGroup without action
   */
  export type EmployerGroupDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployerGroup
     */
    select?: EmployerGroupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EmployerGroupInclude<ExtArgs> | null
  }



  /**
   * Model Member
   */

  export type AggregateMember = {
    _count: MemberCountAggregateOutputType | null
    _min: MemberMinAggregateOutputType | null
    _max: MemberMaxAggregateOutputType | null
  }

  export type MemberMinAggregateOutputType = {
    id: string | null
    employerGroupId: string | null
    externalId: string | null
    firstName: string | null
    lastName: string | null
  }

  export type MemberMaxAggregateOutputType = {
    id: string | null
    employerGroupId: string | null
    externalId: string | null
    firstName: string | null
    lastName: string | null
  }

  export type MemberCountAggregateOutputType = {
    id: number
    employerGroupId: number
    externalId: number
    firstName: number
    lastName: number
    _all: number
  }


  export type MemberMinAggregateInputType = {
    id?: true
    employerGroupId?: true
    externalId?: true
    firstName?: true
    lastName?: true
  }

  export type MemberMaxAggregateInputType = {
    id?: true
    employerGroupId?: true
    externalId?: true
    firstName?: true
    lastName?: true
  }

  export type MemberCountAggregateInputType = {
    id?: true
    employerGroupId?: true
    externalId?: true
    firstName?: true
    lastName?: true
    _all?: true
  }

  export type MemberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Member to aggregate.
     */
    where?: MemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Members to fetch.
     */
    orderBy?: MemberOrderByWithRelationInput | MemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Members from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Members.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Members
    **/
    _count?: true | MemberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MemberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MemberMaxAggregateInputType
  }

  export type GetMemberAggregateType<T extends MemberAggregateArgs> = {
        [P in keyof T & keyof AggregateMember]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMember[P]>
      : GetScalarType<T[P], AggregateMember[P]>
  }




  export type MemberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MemberWhereInput
    orderBy?: MemberOrderByWithAggregationInput | MemberOrderByWithAggregationInput[]
    by: MemberScalarFieldEnum[] | MemberScalarFieldEnum
    having?: MemberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MemberCountAggregateInputType | true
    _min?: MemberMinAggregateInputType
    _max?: MemberMaxAggregateInputType
  }

  export type MemberGroupByOutputType = {
    id: string
    employerGroupId: string
    externalId: string | null
    firstName: string
    lastName: string
    _count: MemberCountAggregateOutputType | null
    _min: MemberMinAggregateOutputType | null
    _max: MemberMaxAggregateOutputType | null
  }

  type GetMemberGroupByPayload<T extends MemberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MemberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MemberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MemberGroupByOutputType[P]>
            : GetScalarType<T[P], MemberGroupByOutputType[P]>
        }
      >
    >


  export type MemberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employerGroupId?: boolean
    externalId?: boolean
    firstName?: boolean
    lastName?: boolean
    employerGroup?: boolean | EmployerGroupDefaultArgs<ExtArgs>
    medicalEvents?: boolean | Member$medicalEventsArgs<ExtArgs>
    _count?: boolean | MemberCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["member"]>

  export type MemberSelectScalar = {
    id?: boolean
    employerGroupId?: boolean
    externalId?: boolean
    firstName?: boolean
    lastName?: boolean
  }

  export type MemberInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employerGroup?: boolean | EmployerGroupDefaultArgs<ExtArgs>
    medicalEvents?: boolean | Member$medicalEventsArgs<ExtArgs>
    _count?: boolean | MemberCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $MemberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Member"
    objects: {
      employerGroup: Prisma.$EmployerGroupPayload<ExtArgs>
      medicalEvents: Prisma.$MedicalEventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      employerGroupId: string
      externalId: string | null
      firstName: string
      lastName: string
    }, ExtArgs["result"]["member"]>
    composites: {}
  }


  type MemberGetPayload<S extends boolean | null | undefined | MemberDefaultArgs> = $Result.GetResult<Prisma.$MemberPayload, S>

  type MemberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MemberFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MemberCountAggregateInputType | true
    }

  export interface MemberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Member'], meta: { name: 'Member' } }
    /**
     * Find zero or one Member that matches the filter.
     * @param {MemberFindUniqueArgs} args - Arguments to find a Member
     * @example
     * // Get one Member
     * const member = await prisma.member.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends MemberFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, MemberFindUniqueArgs<ExtArgs>>
    ): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Member that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {MemberFindUniqueOrThrowArgs} args - Arguments to find a Member
     * @example
     * // Get one Member
     * const member = await prisma.member.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends MemberFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, MemberFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Member that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberFindFirstArgs} args - Arguments to find a Member
     * @example
     * // Get one Member
     * const member = await prisma.member.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends MemberFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, MemberFindFirstArgs<ExtArgs>>
    ): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Member that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberFindFirstOrThrowArgs} args - Arguments to find a Member
     * @example
     * // Get one Member
     * const member = await prisma.member.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends MemberFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, MemberFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Members that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Members
     * const members = await prisma.member.findMany()
     * 
     * // Get first 10 Members
     * const members = await prisma.member.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const memberWithIdOnly = await prisma.member.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends MemberFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, MemberFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Member.
     * @param {MemberCreateArgs} args - Arguments to create a Member.
     * @example
     * // Create one Member
     * const Member = await prisma.member.create({
     *   data: {
     *     // ... data to create a Member
     *   }
     * })
     * 
    **/
    create<T extends MemberCreateArgs<ExtArgs>>(
      args: SelectSubset<T, MemberCreateArgs<ExtArgs>>
    ): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Members.
     *     @param {MemberCreateManyArgs} args - Arguments to create many Members.
     *     @example
     *     // Create many Members
     *     const member = await prisma.member.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends MemberCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, MemberCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Member.
     * @param {MemberDeleteArgs} args - Arguments to delete one Member.
     * @example
     * // Delete one Member
     * const Member = await prisma.member.delete({
     *   where: {
     *     // ... filter to delete one Member
     *   }
     * })
     * 
    **/
    delete<T extends MemberDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, MemberDeleteArgs<ExtArgs>>
    ): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Member.
     * @param {MemberUpdateArgs} args - Arguments to update one Member.
     * @example
     * // Update one Member
     * const member = await prisma.member.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends MemberUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, MemberUpdateArgs<ExtArgs>>
    ): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Members.
     * @param {MemberDeleteManyArgs} args - Arguments to filter Members to delete.
     * @example
     * // Delete a few Members
     * const { count } = await prisma.member.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends MemberDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, MemberDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Members.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Members
     * const member = await prisma.member.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends MemberUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, MemberUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Member.
     * @param {MemberUpsertArgs} args - Arguments to update or create a Member.
     * @example
     * // Update or create a Member
     * const member = await prisma.member.upsert({
     *   create: {
     *     // ... data to create a Member
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Member we want to update
     *   }
     * })
    **/
    upsert<T extends MemberUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, MemberUpsertArgs<ExtArgs>>
    ): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Members.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberCountArgs} args - Arguments to filter Members to count.
     * @example
     * // Count the number of Members
     * const count = await prisma.member.count({
     *   where: {
     *     // ... the filter for the Members we want to count
     *   }
     * })
    **/
    count<T extends MemberCountArgs>(
      args?: Subset<T, MemberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MemberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Member.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MemberAggregateArgs>(args: Subset<T, MemberAggregateArgs>): Prisma.PrismaPromise<GetMemberAggregateType<T>>

    /**
     * Group by Member.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberGroupByArgs} args - Group by arguments.
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
      T extends MemberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MemberGroupByArgs['orderBy'] }
        : { orderBy?: MemberGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Member model
   */
  readonly fields: MemberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Member.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MemberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    employerGroup<T extends EmployerGroupDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmployerGroupDefaultArgs<ExtArgs>>): Prisma__EmployerGroupClient<$Result.GetResult<Prisma.$EmployerGroupPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    medicalEvents<T extends Member$medicalEventsArgs<ExtArgs> = {}>(args?: Subset<T, Member$medicalEventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MedicalEventPayload<ExtArgs>, T, 'findMany'> | Null>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Member model
   */ 
  interface MemberFieldRefs {
    readonly id: FieldRef<"Member", 'String'>
    readonly employerGroupId: FieldRef<"Member", 'String'>
    readonly externalId: FieldRef<"Member", 'String'>
    readonly firstName: FieldRef<"Member", 'String'>
    readonly lastName: FieldRef<"Member", 'String'>
  }
    

  // Custom InputTypes

  /**
   * Member findUnique
   */
  export type MemberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * Filter, which Member to fetch.
     */
    where: MemberWhereUniqueInput
  }


  /**
   * Member findUniqueOrThrow
   */
  export type MemberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * Filter, which Member to fetch.
     */
    where: MemberWhereUniqueInput
  }


  /**
   * Member findFirst
   */
  export type MemberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * Filter, which Member to fetch.
     */
    where?: MemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Members to fetch.
     */
    orderBy?: MemberOrderByWithRelationInput | MemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Members.
     */
    cursor?: MemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Members from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Members.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Members.
     */
    distinct?: MemberScalarFieldEnum | MemberScalarFieldEnum[]
  }


  /**
   * Member findFirstOrThrow
   */
  export type MemberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * Filter, which Member to fetch.
     */
    where?: MemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Members to fetch.
     */
    orderBy?: MemberOrderByWithRelationInput | MemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Members.
     */
    cursor?: MemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Members from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Members.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Members.
     */
    distinct?: MemberScalarFieldEnum | MemberScalarFieldEnum[]
  }


  /**
   * Member findMany
   */
  export type MemberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * Filter, which Members to fetch.
     */
    where?: MemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Members to fetch.
     */
    orderBy?: MemberOrderByWithRelationInput | MemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Members.
     */
    cursor?: MemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Members from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Members.
     */
    skip?: number
    distinct?: MemberScalarFieldEnum | MemberScalarFieldEnum[]
  }


  /**
   * Member create
   */
  export type MemberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * The data needed to create a Member.
     */
    data: XOR<MemberCreateInput, MemberUncheckedCreateInput>
  }


  /**
   * Member createMany
   */
  export type MemberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Members.
     */
    data: MemberCreateManyInput | MemberCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * Member update
   */
  export type MemberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * The data needed to update a Member.
     */
    data: XOR<MemberUpdateInput, MemberUncheckedUpdateInput>
    /**
     * Choose, which Member to update.
     */
    where: MemberWhereUniqueInput
  }


  /**
   * Member updateMany
   */
  export type MemberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Members.
     */
    data: XOR<MemberUpdateManyMutationInput, MemberUncheckedUpdateManyInput>
    /**
     * Filter which Members to update
     */
    where?: MemberWhereInput
  }


  /**
   * Member upsert
   */
  export type MemberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * The filter to search for the Member to update in case it exists.
     */
    where: MemberWhereUniqueInput
    /**
     * In case the Member found by the `where` argument doesn't exist, create a new Member with this data.
     */
    create: XOR<MemberCreateInput, MemberUncheckedCreateInput>
    /**
     * In case the Member was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MemberUpdateInput, MemberUncheckedUpdateInput>
  }


  /**
   * Member delete
   */
  export type MemberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MemberInclude<ExtArgs> | null
    /**
     * Filter which Member to delete.
     */
    where: MemberWhereUniqueInput
  }


  /**
   * Member deleteMany
   */
  export type MemberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Members to delete
     */
    where?: MemberWhereInput
  }


  /**
   * Member.medicalEvents
   */
  export type Member$medicalEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalEvent
     */
    select?: MedicalEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MedicalEventInclude<ExtArgs> | null
    where?: MedicalEventWhereInput
    orderBy?: MedicalEventOrderByWithRelationInput | MedicalEventOrderByWithRelationInput[]
    cursor?: MedicalEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MedicalEventScalarFieldEnum | MedicalEventScalarFieldEnum[]
  }


  /**
   * Member without action
   */
  export type MemberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Member
     */
    select?: MemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MemberInclude<ExtArgs> | null
  }



  /**
   * Model MedicalEvent
   */

  export type AggregateMedicalEvent = {
    _count: MedicalEventCountAggregateOutputType | null
    _avg: MedicalEventAvgAggregateOutputType | null
    _sum: MedicalEventSumAggregateOutputType | null
    _min: MedicalEventMinAggregateOutputType | null
    _max: MedicalEventMaxAggregateOutputType | null
  }

  export type MedicalEventAvgAggregateOutputType = {
    totalSaved: Decimal | null
  }

  export type MedicalEventSumAggregateOutputType = {
    totalSaved: Decimal | null
  }

  export type MedicalEventMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    memberId: string | null
    name: string | null
    status: string | null
    totalSaved: Decimal | null
    createdAt: Date | null
  }

  export type MedicalEventMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    memberId: string | null
    name: string | null
    status: string | null
    totalSaved: Decimal | null
    createdAt: Date | null
  }

  export type MedicalEventCountAggregateOutputType = {
    id: number
    tenantId: number
    memberId: number
    name: number
    status: number
    totalSaved: number
    createdAt: number
    _all: number
  }


  export type MedicalEventAvgAggregateInputType = {
    totalSaved?: true
  }

  export type MedicalEventSumAggregateInputType = {
    totalSaved?: true
  }

  export type MedicalEventMinAggregateInputType = {
    id?: true
    tenantId?: true
    memberId?: true
    name?: true
    status?: true
    totalSaved?: true
    createdAt?: true
  }

  export type MedicalEventMaxAggregateInputType = {
    id?: true
    tenantId?: true
    memberId?: true
    name?: true
    status?: true
    totalSaved?: true
    createdAt?: true
  }

  export type MedicalEventCountAggregateInputType = {
    id?: true
    tenantId?: true
    memberId?: true
    name?: true
    status?: true
    totalSaved?: true
    createdAt?: true
    _all?: true
  }

  export type MedicalEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MedicalEvent to aggregate.
     */
    where?: MedicalEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MedicalEvents to fetch.
     */
    orderBy?: MedicalEventOrderByWithRelationInput | MedicalEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MedicalEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MedicalEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MedicalEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MedicalEvents
    **/
    _count?: true | MedicalEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MedicalEventAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MedicalEventSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MedicalEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MedicalEventMaxAggregateInputType
  }

  export type GetMedicalEventAggregateType<T extends MedicalEventAggregateArgs> = {
        [P in keyof T & keyof AggregateMedicalEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMedicalEvent[P]>
      : GetScalarType<T[P], AggregateMedicalEvent[P]>
  }




  export type MedicalEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MedicalEventWhereInput
    orderBy?: MedicalEventOrderByWithAggregationInput | MedicalEventOrderByWithAggregationInput[]
    by: MedicalEventScalarFieldEnum[] | MedicalEventScalarFieldEnum
    having?: MedicalEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MedicalEventCountAggregateInputType | true
    _avg?: MedicalEventAvgAggregateInputType
    _sum?: MedicalEventSumAggregateInputType
    _min?: MedicalEventMinAggregateInputType
    _max?: MedicalEventMaxAggregateInputType
  }

  export type MedicalEventGroupByOutputType = {
    id: string
    tenantId: string
    memberId: string
    name: string
    status: string
    totalSaved: Decimal
    createdAt: Date
    _count: MedicalEventCountAggregateOutputType | null
    _avg: MedicalEventAvgAggregateOutputType | null
    _sum: MedicalEventSumAggregateOutputType | null
    _min: MedicalEventMinAggregateOutputType | null
    _max: MedicalEventMaxAggregateOutputType | null
  }

  type GetMedicalEventGroupByPayload<T extends MedicalEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MedicalEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MedicalEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MedicalEventGroupByOutputType[P]>
            : GetScalarType<T[P], MedicalEventGroupByOutputType[P]>
        }
      >
    >


  export type MedicalEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    memberId?: boolean
    name?: boolean
    status?: boolean
    totalSaved?: boolean
    createdAt?: boolean
    member?: boolean | MemberDefaultArgs<ExtArgs>
    claims?: boolean | MedicalEvent$claimsArgs<ExtArgs>
    _count?: boolean | MedicalEventCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["medicalEvent"]>

  export type MedicalEventSelectScalar = {
    id?: boolean
    tenantId?: boolean
    memberId?: boolean
    name?: boolean
    status?: boolean
    totalSaved?: boolean
    createdAt?: boolean
  }

  export type MedicalEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    member?: boolean | MemberDefaultArgs<ExtArgs>
    claims?: boolean | MedicalEvent$claimsArgs<ExtArgs>
    _count?: boolean | MedicalEventCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $MedicalEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MedicalEvent"
    objects: {
      member: Prisma.$MemberPayload<ExtArgs>
      claims: Prisma.$ClaimPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      memberId: string
      name: string
      status: string
      totalSaved: Prisma.Decimal
      createdAt: Date
    }, ExtArgs["result"]["medicalEvent"]>
    composites: {}
  }


  type MedicalEventGetPayload<S extends boolean | null | undefined | MedicalEventDefaultArgs> = $Result.GetResult<Prisma.$MedicalEventPayload, S>

  type MedicalEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MedicalEventFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MedicalEventCountAggregateInputType | true
    }

  export interface MedicalEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MedicalEvent'], meta: { name: 'MedicalEvent' } }
    /**
     * Find zero or one MedicalEvent that matches the filter.
     * @param {MedicalEventFindUniqueArgs} args - Arguments to find a MedicalEvent
     * @example
     * // Get one MedicalEvent
     * const medicalEvent = await prisma.medicalEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends MedicalEventFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, MedicalEventFindUniqueArgs<ExtArgs>>
    ): Prisma__MedicalEventClient<$Result.GetResult<Prisma.$MedicalEventPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one MedicalEvent that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {MedicalEventFindUniqueOrThrowArgs} args - Arguments to find a MedicalEvent
     * @example
     * // Get one MedicalEvent
     * const medicalEvent = await prisma.medicalEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends MedicalEventFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, MedicalEventFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__MedicalEventClient<$Result.GetResult<Prisma.$MedicalEventPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first MedicalEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicalEventFindFirstArgs} args - Arguments to find a MedicalEvent
     * @example
     * // Get one MedicalEvent
     * const medicalEvent = await prisma.medicalEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends MedicalEventFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, MedicalEventFindFirstArgs<ExtArgs>>
    ): Prisma__MedicalEventClient<$Result.GetResult<Prisma.$MedicalEventPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first MedicalEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicalEventFindFirstOrThrowArgs} args - Arguments to find a MedicalEvent
     * @example
     * // Get one MedicalEvent
     * const medicalEvent = await prisma.medicalEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends MedicalEventFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, MedicalEventFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__MedicalEventClient<$Result.GetResult<Prisma.$MedicalEventPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more MedicalEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicalEventFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MedicalEvents
     * const medicalEvents = await prisma.medicalEvent.findMany()
     * 
     * // Get first 10 MedicalEvents
     * const medicalEvents = await prisma.medicalEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const medicalEventWithIdOnly = await prisma.medicalEvent.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends MedicalEventFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, MedicalEventFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MedicalEventPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a MedicalEvent.
     * @param {MedicalEventCreateArgs} args - Arguments to create a MedicalEvent.
     * @example
     * // Create one MedicalEvent
     * const MedicalEvent = await prisma.medicalEvent.create({
     *   data: {
     *     // ... data to create a MedicalEvent
     *   }
     * })
     * 
    **/
    create<T extends MedicalEventCreateArgs<ExtArgs>>(
      args: SelectSubset<T, MedicalEventCreateArgs<ExtArgs>>
    ): Prisma__MedicalEventClient<$Result.GetResult<Prisma.$MedicalEventPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many MedicalEvents.
     *     @param {MedicalEventCreateManyArgs} args - Arguments to create many MedicalEvents.
     *     @example
     *     // Create many MedicalEvents
     *     const medicalEvent = await prisma.medicalEvent.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends MedicalEventCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, MedicalEventCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a MedicalEvent.
     * @param {MedicalEventDeleteArgs} args - Arguments to delete one MedicalEvent.
     * @example
     * // Delete one MedicalEvent
     * const MedicalEvent = await prisma.medicalEvent.delete({
     *   where: {
     *     // ... filter to delete one MedicalEvent
     *   }
     * })
     * 
    **/
    delete<T extends MedicalEventDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, MedicalEventDeleteArgs<ExtArgs>>
    ): Prisma__MedicalEventClient<$Result.GetResult<Prisma.$MedicalEventPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one MedicalEvent.
     * @param {MedicalEventUpdateArgs} args - Arguments to update one MedicalEvent.
     * @example
     * // Update one MedicalEvent
     * const medicalEvent = await prisma.medicalEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends MedicalEventUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, MedicalEventUpdateArgs<ExtArgs>>
    ): Prisma__MedicalEventClient<$Result.GetResult<Prisma.$MedicalEventPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more MedicalEvents.
     * @param {MedicalEventDeleteManyArgs} args - Arguments to filter MedicalEvents to delete.
     * @example
     * // Delete a few MedicalEvents
     * const { count } = await prisma.medicalEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends MedicalEventDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, MedicalEventDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MedicalEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicalEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MedicalEvents
     * const medicalEvent = await prisma.medicalEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends MedicalEventUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, MedicalEventUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MedicalEvent.
     * @param {MedicalEventUpsertArgs} args - Arguments to update or create a MedicalEvent.
     * @example
     * // Update or create a MedicalEvent
     * const medicalEvent = await prisma.medicalEvent.upsert({
     *   create: {
     *     // ... data to create a MedicalEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MedicalEvent we want to update
     *   }
     * })
    **/
    upsert<T extends MedicalEventUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, MedicalEventUpsertArgs<ExtArgs>>
    ): Prisma__MedicalEventClient<$Result.GetResult<Prisma.$MedicalEventPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of MedicalEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicalEventCountArgs} args - Arguments to filter MedicalEvents to count.
     * @example
     * // Count the number of MedicalEvents
     * const count = await prisma.medicalEvent.count({
     *   where: {
     *     // ... the filter for the MedicalEvents we want to count
     *   }
     * })
    **/
    count<T extends MedicalEventCountArgs>(
      args?: Subset<T, MedicalEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MedicalEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MedicalEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicalEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MedicalEventAggregateArgs>(args: Subset<T, MedicalEventAggregateArgs>): Prisma.PrismaPromise<GetMedicalEventAggregateType<T>>

    /**
     * Group by MedicalEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicalEventGroupByArgs} args - Group by arguments.
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
      T extends MedicalEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MedicalEventGroupByArgs['orderBy'] }
        : { orderBy?: MedicalEventGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MedicalEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMedicalEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MedicalEvent model
   */
  readonly fields: MedicalEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MedicalEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MedicalEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    member<T extends MemberDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MemberDefaultArgs<ExtArgs>>): Prisma__MemberClient<$Result.GetResult<Prisma.$MemberPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    claims<T extends MedicalEvent$claimsArgs<ExtArgs> = {}>(args?: Subset<T, MedicalEvent$claimsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, 'findMany'> | Null>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the MedicalEvent model
   */ 
  interface MedicalEventFieldRefs {
    readonly id: FieldRef<"MedicalEvent", 'String'>
    readonly tenantId: FieldRef<"MedicalEvent", 'String'>
    readonly memberId: FieldRef<"MedicalEvent", 'String'>
    readonly name: FieldRef<"MedicalEvent", 'String'>
    readonly status: FieldRef<"MedicalEvent", 'String'>
    readonly totalSaved: FieldRef<"MedicalEvent", 'Decimal'>
    readonly createdAt: FieldRef<"MedicalEvent", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * MedicalEvent findUnique
   */
  export type MedicalEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalEvent
     */
    select?: MedicalEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MedicalEventInclude<ExtArgs> | null
    /**
     * Filter, which MedicalEvent to fetch.
     */
    where: MedicalEventWhereUniqueInput
  }


  /**
   * MedicalEvent findUniqueOrThrow
   */
  export type MedicalEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalEvent
     */
    select?: MedicalEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MedicalEventInclude<ExtArgs> | null
    /**
     * Filter, which MedicalEvent to fetch.
     */
    where: MedicalEventWhereUniqueInput
  }


  /**
   * MedicalEvent findFirst
   */
  export type MedicalEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalEvent
     */
    select?: MedicalEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MedicalEventInclude<ExtArgs> | null
    /**
     * Filter, which MedicalEvent to fetch.
     */
    where?: MedicalEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MedicalEvents to fetch.
     */
    orderBy?: MedicalEventOrderByWithRelationInput | MedicalEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MedicalEvents.
     */
    cursor?: MedicalEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MedicalEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MedicalEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MedicalEvents.
     */
    distinct?: MedicalEventScalarFieldEnum | MedicalEventScalarFieldEnum[]
  }


  /**
   * MedicalEvent findFirstOrThrow
   */
  export type MedicalEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalEvent
     */
    select?: MedicalEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MedicalEventInclude<ExtArgs> | null
    /**
     * Filter, which MedicalEvent to fetch.
     */
    where?: MedicalEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MedicalEvents to fetch.
     */
    orderBy?: MedicalEventOrderByWithRelationInput | MedicalEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MedicalEvents.
     */
    cursor?: MedicalEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MedicalEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MedicalEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MedicalEvents.
     */
    distinct?: MedicalEventScalarFieldEnum | MedicalEventScalarFieldEnum[]
  }


  /**
   * MedicalEvent findMany
   */
  export type MedicalEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalEvent
     */
    select?: MedicalEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MedicalEventInclude<ExtArgs> | null
    /**
     * Filter, which MedicalEvents to fetch.
     */
    where?: MedicalEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MedicalEvents to fetch.
     */
    orderBy?: MedicalEventOrderByWithRelationInput | MedicalEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MedicalEvents.
     */
    cursor?: MedicalEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MedicalEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MedicalEvents.
     */
    skip?: number
    distinct?: MedicalEventScalarFieldEnum | MedicalEventScalarFieldEnum[]
  }


  /**
   * MedicalEvent create
   */
  export type MedicalEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalEvent
     */
    select?: MedicalEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MedicalEventInclude<ExtArgs> | null
    /**
     * The data needed to create a MedicalEvent.
     */
    data: XOR<MedicalEventCreateInput, MedicalEventUncheckedCreateInput>
  }


  /**
   * MedicalEvent createMany
   */
  export type MedicalEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MedicalEvents.
     */
    data: MedicalEventCreateManyInput | MedicalEventCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * MedicalEvent update
   */
  export type MedicalEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalEvent
     */
    select?: MedicalEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MedicalEventInclude<ExtArgs> | null
    /**
     * The data needed to update a MedicalEvent.
     */
    data: XOR<MedicalEventUpdateInput, MedicalEventUncheckedUpdateInput>
    /**
     * Choose, which MedicalEvent to update.
     */
    where: MedicalEventWhereUniqueInput
  }


  /**
   * MedicalEvent updateMany
   */
  export type MedicalEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MedicalEvents.
     */
    data: XOR<MedicalEventUpdateManyMutationInput, MedicalEventUncheckedUpdateManyInput>
    /**
     * Filter which MedicalEvents to update
     */
    where?: MedicalEventWhereInput
  }


  /**
   * MedicalEvent upsert
   */
  export type MedicalEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalEvent
     */
    select?: MedicalEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MedicalEventInclude<ExtArgs> | null
    /**
     * The filter to search for the MedicalEvent to update in case it exists.
     */
    where: MedicalEventWhereUniqueInput
    /**
     * In case the MedicalEvent found by the `where` argument doesn't exist, create a new MedicalEvent with this data.
     */
    create: XOR<MedicalEventCreateInput, MedicalEventUncheckedCreateInput>
    /**
     * In case the MedicalEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MedicalEventUpdateInput, MedicalEventUncheckedUpdateInput>
  }


  /**
   * MedicalEvent delete
   */
  export type MedicalEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalEvent
     */
    select?: MedicalEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MedicalEventInclude<ExtArgs> | null
    /**
     * Filter which MedicalEvent to delete.
     */
    where: MedicalEventWhereUniqueInput
  }


  /**
   * MedicalEvent deleteMany
   */
  export type MedicalEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MedicalEvents to delete
     */
    where?: MedicalEventWhereInput
  }


  /**
   * MedicalEvent.claims
   */
  export type MedicalEvent$claimsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ClaimInclude<ExtArgs> | null
    where?: ClaimWhereInput
    orderBy?: ClaimOrderByWithRelationInput | ClaimOrderByWithRelationInput[]
    cursor?: ClaimWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClaimScalarFieldEnum | ClaimScalarFieldEnum[]
  }


  /**
   * MedicalEvent without action
   */
  export type MedicalEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalEvent
     */
    select?: MedicalEventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MedicalEventInclude<ExtArgs> | null
  }



  /**
   * Model Claim
   */

  export type AggregateClaim = {
    _count: ClaimCountAggregateOutputType | null
    _avg: ClaimAvgAggregateOutputType | null
    _sum: ClaimSumAggregateOutputType | null
    _min: ClaimMinAggregateOutputType | null
    _max: ClaimMaxAggregateOutputType | null
  }

  export type ClaimAvgAggregateOutputType = {
    providerBilled: Decimal | null
    insuranceAllowed: Decimal | null
    planRuleAmount: Decimal | null
    memberOwes: Decimal | null
  }

  export type ClaimSumAggregateOutputType = {
    providerBilled: Decimal | null
    insuranceAllowed: Decimal | null
    planRuleAmount: Decimal | null
    memberOwes: Decimal | null
  }

  export type ClaimMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    eventId: string | null
    providerName: string | null
    serviceDate: Date | null
    cptCode: string | null
    providerBilled: Decimal | null
    insuranceAllowed: Decimal | null
    planRuleAmount: Decimal | null
    memberOwes: Decimal | null
    status: $Enums.ClaimStatus | null
    varianceNote: string | null
    createdAt: Date | null
  }

  export type ClaimMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    eventId: string | null
    providerName: string | null
    serviceDate: Date | null
    cptCode: string | null
    providerBilled: Decimal | null
    insuranceAllowed: Decimal | null
    planRuleAmount: Decimal | null
    memberOwes: Decimal | null
    status: $Enums.ClaimStatus | null
    varianceNote: string | null
    createdAt: Date | null
  }

  export type ClaimCountAggregateOutputType = {
    id: number
    tenantId: number
    eventId: number
    providerName: number
    serviceDate: number
    cptCode: number
    providerBilled: number
    insuranceAllowed: number
    planRuleAmount: number
    memberOwes: number
    status: number
    varianceNote: number
    rawEobData: number
    createdAt: number
    _all: number
  }


  export type ClaimAvgAggregateInputType = {
    providerBilled?: true
    insuranceAllowed?: true
    planRuleAmount?: true
    memberOwes?: true
  }

  export type ClaimSumAggregateInputType = {
    providerBilled?: true
    insuranceAllowed?: true
    planRuleAmount?: true
    memberOwes?: true
  }

  export type ClaimMinAggregateInputType = {
    id?: true
    tenantId?: true
    eventId?: true
    providerName?: true
    serviceDate?: true
    cptCode?: true
    providerBilled?: true
    insuranceAllowed?: true
    planRuleAmount?: true
    memberOwes?: true
    status?: true
    varianceNote?: true
    createdAt?: true
  }

  export type ClaimMaxAggregateInputType = {
    id?: true
    tenantId?: true
    eventId?: true
    providerName?: true
    serviceDate?: true
    cptCode?: true
    providerBilled?: true
    insuranceAllowed?: true
    planRuleAmount?: true
    memberOwes?: true
    status?: true
    varianceNote?: true
    createdAt?: true
  }

  export type ClaimCountAggregateInputType = {
    id?: true
    tenantId?: true
    eventId?: true
    providerName?: true
    serviceDate?: true
    cptCode?: true
    providerBilled?: true
    insuranceAllowed?: true
    planRuleAmount?: true
    memberOwes?: true
    status?: true
    varianceNote?: true
    rawEobData?: true
    createdAt?: true
    _all?: true
  }

  export type ClaimAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Claim to aggregate.
     */
    where?: ClaimWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Claims to fetch.
     */
    orderBy?: ClaimOrderByWithRelationInput | ClaimOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClaimWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Claims from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Claims.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Claims
    **/
    _count?: true | ClaimCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ClaimAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ClaimSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClaimMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClaimMaxAggregateInputType
  }

  export type GetClaimAggregateType<T extends ClaimAggregateArgs> = {
        [P in keyof T & keyof AggregateClaim]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClaim[P]>
      : GetScalarType<T[P], AggregateClaim[P]>
  }




  export type ClaimGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClaimWhereInput
    orderBy?: ClaimOrderByWithAggregationInput | ClaimOrderByWithAggregationInput[]
    by: ClaimScalarFieldEnum[] | ClaimScalarFieldEnum
    having?: ClaimScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClaimCountAggregateInputType | true
    _avg?: ClaimAvgAggregateInputType
    _sum?: ClaimSumAggregateInputType
    _min?: ClaimMinAggregateInputType
    _max?: ClaimMaxAggregateInputType
  }

  export type ClaimGroupByOutputType = {
    id: string
    tenantId: string
    eventId: string
    providerName: string
    serviceDate: Date
    cptCode: string
    providerBilled: Decimal
    insuranceAllowed: Decimal
    planRuleAmount: Decimal
    memberOwes: Decimal
    status: $Enums.ClaimStatus
    varianceNote: string | null
    rawEobData: JsonValue | null
    createdAt: Date
    _count: ClaimCountAggregateOutputType | null
    _avg: ClaimAvgAggregateOutputType | null
    _sum: ClaimSumAggregateOutputType | null
    _min: ClaimMinAggregateOutputType | null
    _max: ClaimMaxAggregateOutputType | null
  }

  type GetClaimGroupByPayload<T extends ClaimGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClaimGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClaimGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClaimGroupByOutputType[P]>
            : GetScalarType<T[P], ClaimGroupByOutputType[P]>
        }
      >
    >


  export type ClaimSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    eventId?: boolean
    providerName?: boolean
    serviceDate?: boolean
    cptCode?: boolean
    providerBilled?: boolean
    insuranceAllowed?: boolean
    planRuleAmount?: boolean
    memberOwes?: boolean
    status?: boolean
    varianceNote?: boolean
    rawEobData?: boolean
    createdAt?: boolean
    medicalEvent?: boolean | MedicalEventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["claim"]>

  export type ClaimSelectScalar = {
    id?: boolean
    tenantId?: boolean
    eventId?: boolean
    providerName?: boolean
    serviceDate?: boolean
    cptCode?: boolean
    providerBilled?: boolean
    insuranceAllowed?: boolean
    planRuleAmount?: boolean
    memberOwes?: boolean
    status?: boolean
    varianceNote?: boolean
    rawEobData?: boolean
    createdAt?: boolean
  }

  export type ClaimInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    medicalEvent?: boolean | MedicalEventDefaultArgs<ExtArgs>
  }


  export type $ClaimPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Claim"
    objects: {
      medicalEvent: Prisma.$MedicalEventPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      eventId: string
      providerName: string
      serviceDate: Date
      cptCode: string
      providerBilled: Prisma.Decimal
      insuranceAllowed: Prisma.Decimal
      planRuleAmount: Prisma.Decimal
      memberOwes: Prisma.Decimal
      status: $Enums.ClaimStatus
      varianceNote: string | null
      rawEobData: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["claim"]>
    composites: {}
  }


  type ClaimGetPayload<S extends boolean | null | undefined | ClaimDefaultArgs> = $Result.GetResult<Prisma.$ClaimPayload, S>

  type ClaimCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ClaimFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ClaimCountAggregateInputType | true
    }

  export interface ClaimDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Claim'], meta: { name: 'Claim' } }
    /**
     * Find zero or one Claim that matches the filter.
     * @param {ClaimFindUniqueArgs} args - Arguments to find a Claim
     * @example
     * // Get one Claim
     * const claim = await prisma.claim.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ClaimFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, ClaimFindUniqueArgs<ExtArgs>>
    ): Prisma__ClaimClient<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Claim that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ClaimFindUniqueOrThrowArgs} args - Arguments to find a Claim
     * @example
     * // Get one Claim
     * const claim = await prisma.claim.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ClaimFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ClaimFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ClaimClient<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Claim that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimFindFirstArgs} args - Arguments to find a Claim
     * @example
     * // Get one Claim
     * const claim = await prisma.claim.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ClaimFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, ClaimFindFirstArgs<ExtArgs>>
    ): Prisma__ClaimClient<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Claim that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimFindFirstOrThrowArgs} args - Arguments to find a Claim
     * @example
     * // Get one Claim
     * const claim = await prisma.claim.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ClaimFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ClaimFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ClaimClient<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Claims that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Claims
     * const claims = await prisma.claim.findMany()
     * 
     * // Get first 10 Claims
     * const claims = await prisma.claim.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const claimWithIdOnly = await prisma.claim.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ClaimFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ClaimFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Claim.
     * @param {ClaimCreateArgs} args - Arguments to create a Claim.
     * @example
     * // Create one Claim
     * const Claim = await prisma.claim.create({
     *   data: {
     *     // ... data to create a Claim
     *   }
     * })
     * 
    **/
    create<T extends ClaimCreateArgs<ExtArgs>>(
      args: SelectSubset<T, ClaimCreateArgs<ExtArgs>>
    ): Prisma__ClaimClient<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Claims.
     *     @param {ClaimCreateManyArgs} args - Arguments to create many Claims.
     *     @example
     *     // Create many Claims
     *     const claim = await prisma.claim.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ClaimCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ClaimCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Claim.
     * @param {ClaimDeleteArgs} args - Arguments to delete one Claim.
     * @example
     * // Delete one Claim
     * const Claim = await prisma.claim.delete({
     *   where: {
     *     // ... filter to delete one Claim
     *   }
     * })
     * 
    **/
    delete<T extends ClaimDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, ClaimDeleteArgs<ExtArgs>>
    ): Prisma__ClaimClient<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Claim.
     * @param {ClaimUpdateArgs} args - Arguments to update one Claim.
     * @example
     * // Update one Claim
     * const claim = await prisma.claim.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ClaimUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, ClaimUpdateArgs<ExtArgs>>
    ): Prisma__ClaimClient<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Claims.
     * @param {ClaimDeleteManyArgs} args - Arguments to filter Claims to delete.
     * @example
     * // Delete a few Claims
     * const { count } = await prisma.claim.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ClaimDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ClaimDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Claims.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Claims
     * const claim = await prisma.claim.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ClaimUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, ClaimUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Claim.
     * @param {ClaimUpsertArgs} args - Arguments to update or create a Claim.
     * @example
     * // Update or create a Claim
     * const claim = await prisma.claim.upsert({
     *   create: {
     *     // ... data to create a Claim
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Claim we want to update
     *   }
     * })
    **/
    upsert<T extends ClaimUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, ClaimUpsertArgs<ExtArgs>>
    ): Prisma__ClaimClient<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Claims.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimCountArgs} args - Arguments to filter Claims to count.
     * @example
     * // Count the number of Claims
     * const count = await prisma.claim.count({
     *   where: {
     *     // ... the filter for the Claims we want to count
     *   }
     * })
    **/
    count<T extends ClaimCountArgs>(
      args?: Subset<T, ClaimCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClaimCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Claim.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ClaimAggregateArgs>(args: Subset<T, ClaimAggregateArgs>): Prisma.PrismaPromise<GetClaimAggregateType<T>>

    /**
     * Group by Claim.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimGroupByArgs} args - Group by arguments.
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
      T extends ClaimGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClaimGroupByArgs['orderBy'] }
        : { orderBy?: ClaimGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ClaimGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClaimGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Claim model
   */
  readonly fields: ClaimFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Claim.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClaimClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    medicalEvent<T extends MedicalEventDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MedicalEventDefaultArgs<ExtArgs>>): Prisma__MedicalEventClient<$Result.GetResult<Prisma.$MedicalEventPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Claim model
   */ 
  interface ClaimFieldRefs {
    readonly id: FieldRef<"Claim", 'String'>
    readonly tenantId: FieldRef<"Claim", 'String'>
    readonly eventId: FieldRef<"Claim", 'String'>
    readonly providerName: FieldRef<"Claim", 'String'>
    readonly serviceDate: FieldRef<"Claim", 'DateTime'>
    readonly cptCode: FieldRef<"Claim", 'String'>
    readonly providerBilled: FieldRef<"Claim", 'Decimal'>
    readonly insuranceAllowed: FieldRef<"Claim", 'Decimal'>
    readonly planRuleAmount: FieldRef<"Claim", 'Decimal'>
    readonly memberOwes: FieldRef<"Claim", 'Decimal'>
    readonly status: FieldRef<"Claim", 'ClaimStatus'>
    readonly varianceNote: FieldRef<"Claim", 'String'>
    readonly rawEobData: FieldRef<"Claim", 'Json'>
    readonly createdAt: FieldRef<"Claim", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * Claim findUnique
   */
  export type ClaimFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ClaimInclude<ExtArgs> | null
    /**
     * Filter, which Claim to fetch.
     */
    where: ClaimWhereUniqueInput
  }


  /**
   * Claim findUniqueOrThrow
   */
  export type ClaimFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ClaimInclude<ExtArgs> | null
    /**
     * Filter, which Claim to fetch.
     */
    where: ClaimWhereUniqueInput
  }


  /**
   * Claim findFirst
   */
  export type ClaimFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ClaimInclude<ExtArgs> | null
    /**
     * Filter, which Claim to fetch.
     */
    where?: ClaimWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Claims to fetch.
     */
    orderBy?: ClaimOrderByWithRelationInput | ClaimOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Claims.
     */
    cursor?: ClaimWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Claims from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Claims.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Claims.
     */
    distinct?: ClaimScalarFieldEnum | ClaimScalarFieldEnum[]
  }


  /**
   * Claim findFirstOrThrow
   */
  export type ClaimFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ClaimInclude<ExtArgs> | null
    /**
     * Filter, which Claim to fetch.
     */
    where?: ClaimWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Claims to fetch.
     */
    orderBy?: ClaimOrderByWithRelationInput | ClaimOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Claims.
     */
    cursor?: ClaimWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Claims from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Claims.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Claims.
     */
    distinct?: ClaimScalarFieldEnum | ClaimScalarFieldEnum[]
  }


  /**
   * Claim findMany
   */
  export type ClaimFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ClaimInclude<ExtArgs> | null
    /**
     * Filter, which Claims to fetch.
     */
    where?: ClaimWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Claims to fetch.
     */
    orderBy?: ClaimOrderByWithRelationInput | ClaimOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Claims.
     */
    cursor?: ClaimWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Claims from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Claims.
     */
    skip?: number
    distinct?: ClaimScalarFieldEnum | ClaimScalarFieldEnum[]
  }


  /**
   * Claim create
   */
  export type ClaimCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ClaimInclude<ExtArgs> | null
    /**
     * The data needed to create a Claim.
     */
    data: XOR<ClaimCreateInput, ClaimUncheckedCreateInput>
  }


  /**
   * Claim createMany
   */
  export type ClaimCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Claims.
     */
    data: ClaimCreateManyInput | ClaimCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * Claim update
   */
  export type ClaimUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ClaimInclude<ExtArgs> | null
    /**
     * The data needed to update a Claim.
     */
    data: XOR<ClaimUpdateInput, ClaimUncheckedUpdateInput>
    /**
     * Choose, which Claim to update.
     */
    where: ClaimWhereUniqueInput
  }


  /**
   * Claim updateMany
   */
  export type ClaimUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Claims.
     */
    data: XOR<ClaimUpdateManyMutationInput, ClaimUncheckedUpdateManyInput>
    /**
     * Filter which Claims to update
     */
    where?: ClaimWhereInput
  }


  /**
   * Claim upsert
   */
  export type ClaimUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ClaimInclude<ExtArgs> | null
    /**
     * The filter to search for the Claim to update in case it exists.
     */
    where: ClaimWhereUniqueInput
    /**
     * In case the Claim found by the `where` argument doesn't exist, create a new Claim with this data.
     */
    create: XOR<ClaimCreateInput, ClaimUncheckedCreateInput>
    /**
     * In case the Claim was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClaimUpdateInput, ClaimUncheckedUpdateInput>
  }


  /**
   * Claim delete
   */
  export type ClaimDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ClaimInclude<ExtArgs> | null
    /**
     * Filter which Claim to delete.
     */
    where: ClaimWhereUniqueInput
  }


  /**
   * Claim deleteMany
   */
  export type ClaimDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Claims to delete
     */
    where?: ClaimWhereInput
  }


  /**
   * Claim without action
   */
  export type ClaimDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ClaimInclude<ExtArgs> | null
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


  export const TenantScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    primaryColor: 'primaryColor',
    logoUrl: 'logoUrl',
    apiKeyHash: 'apiKeyHash',
    createdAt: 'createdAt'
  };

  export type TenantScalarFieldEnum = (typeof TenantScalarFieldEnum)[keyof typeof TenantScalarFieldEnum]


  export const EmployerGroupScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    name: 'name',
    planDocUrl: 'planDocUrl',
    planRules: 'planRules',
    createdAt: 'createdAt'
  };

  export type EmployerGroupScalarFieldEnum = (typeof EmployerGroupScalarFieldEnum)[keyof typeof EmployerGroupScalarFieldEnum]


  export const MemberScalarFieldEnum: {
    id: 'id',
    employerGroupId: 'employerGroupId',
    externalId: 'externalId',
    firstName: 'firstName',
    lastName: 'lastName'
  };

  export type MemberScalarFieldEnum = (typeof MemberScalarFieldEnum)[keyof typeof MemberScalarFieldEnum]


  export const MedicalEventScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    memberId: 'memberId',
    name: 'name',
    status: 'status',
    totalSaved: 'totalSaved',
    createdAt: 'createdAt'
  };

  export type MedicalEventScalarFieldEnum = (typeof MedicalEventScalarFieldEnum)[keyof typeof MedicalEventScalarFieldEnum]


  export const ClaimScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    eventId: 'eventId',
    providerName: 'providerName',
    serviceDate: 'serviceDate',
    cptCode: 'cptCode',
    providerBilled: 'providerBilled',
    insuranceAllowed: 'insuranceAllowed',
    planRuleAmount: 'planRuleAmount',
    memberOwes: 'memberOwes',
    status: 'status',
    varianceNote: 'varianceNote',
    rawEobData: 'rawEobData',
    createdAt: 'createdAt'
  };

  export type ClaimScalarFieldEnum = (typeof ClaimScalarFieldEnum)[keyof typeof ClaimScalarFieldEnum]


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
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'ClaimStatus'
   */
  export type EnumClaimStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ClaimStatus'>
    


  /**
   * Reference to a field of type 'ClaimStatus[]'
   */
  export type ListEnumClaimStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ClaimStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type TenantWhereInput = {
    AND?: TenantWhereInput | TenantWhereInput[]
    OR?: TenantWhereInput[]
    NOT?: TenantWhereInput | TenantWhereInput[]
    id?: StringFilter<"Tenant"> | string
    name?: StringFilter<"Tenant"> | string
    slug?: StringFilter<"Tenant"> | string
    primaryColor?: StringFilter<"Tenant"> | string
    logoUrl?: StringNullableFilter<"Tenant"> | string | null
    apiKeyHash?: StringFilter<"Tenant"> | string
    createdAt?: DateTimeFilter<"Tenant"> | Date | string
    employers?: EmployerGroupListRelationFilter
  }

  export type TenantOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    primaryColor?: SortOrder
    logoUrl?: SortOrderInput | SortOrder
    apiKeyHash?: SortOrder
    createdAt?: SortOrder
    employers?: EmployerGroupOrderByRelationAggregateInput
  }

  export type TenantWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    apiKeyHash?: string
    AND?: TenantWhereInput | TenantWhereInput[]
    OR?: TenantWhereInput[]
    NOT?: TenantWhereInput | TenantWhereInput[]
    name?: StringFilter<"Tenant"> | string
    primaryColor?: StringFilter<"Tenant"> | string
    logoUrl?: StringNullableFilter<"Tenant"> | string | null
    createdAt?: DateTimeFilter<"Tenant"> | Date | string
    employers?: EmployerGroupListRelationFilter
  }, "id" | "slug" | "apiKeyHash">

  export type TenantOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    primaryColor?: SortOrder
    logoUrl?: SortOrderInput | SortOrder
    apiKeyHash?: SortOrder
    createdAt?: SortOrder
    _count?: TenantCountOrderByAggregateInput
    _max?: TenantMaxOrderByAggregateInput
    _min?: TenantMinOrderByAggregateInput
  }

  export type TenantScalarWhereWithAggregatesInput = {
    AND?: TenantScalarWhereWithAggregatesInput | TenantScalarWhereWithAggregatesInput[]
    OR?: TenantScalarWhereWithAggregatesInput[]
    NOT?: TenantScalarWhereWithAggregatesInput | TenantScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Tenant"> | string
    name?: StringWithAggregatesFilter<"Tenant"> | string
    slug?: StringWithAggregatesFilter<"Tenant"> | string
    primaryColor?: StringWithAggregatesFilter<"Tenant"> | string
    logoUrl?: StringNullableWithAggregatesFilter<"Tenant"> | string | null
    apiKeyHash?: StringWithAggregatesFilter<"Tenant"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Tenant"> | Date | string
  }

  export type EmployerGroupWhereInput = {
    AND?: EmployerGroupWhereInput | EmployerGroupWhereInput[]
    OR?: EmployerGroupWhereInput[]
    NOT?: EmployerGroupWhereInput | EmployerGroupWhereInput[]
    id?: StringFilter<"EmployerGroup"> | string
    tenantId?: StringFilter<"EmployerGroup"> | string
    name?: StringFilter<"EmployerGroup"> | string
    planDocUrl?: StringNullableFilter<"EmployerGroup"> | string | null
    planRules?: JsonNullableFilter<"EmployerGroup">
    createdAt?: DateTimeFilter<"EmployerGroup"> | Date | string
    tenant?: XOR<TenantRelationFilter, TenantWhereInput>
    members?: MemberListRelationFilter
  }

  export type EmployerGroupOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    planDocUrl?: SortOrderInput | SortOrder
    planRules?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    tenant?: TenantOrderByWithRelationInput
    members?: MemberOrderByRelationAggregateInput
  }

  export type EmployerGroupWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EmployerGroupWhereInput | EmployerGroupWhereInput[]
    OR?: EmployerGroupWhereInput[]
    NOT?: EmployerGroupWhereInput | EmployerGroupWhereInput[]
    tenantId?: StringFilter<"EmployerGroup"> | string
    name?: StringFilter<"EmployerGroup"> | string
    planDocUrl?: StringNullableFilter<"EmployerGroup"> | string | null
    planRules?: JsonNullableFilter<"EmployerGroup">
    createdAt?: DateTimeFilter<"EmployerGroup"> | Date | string
    tenant?: XOR<TenantRelationFilter, TenantWhereInput>
    members?: MemberListRelationFilter
  }, "id">

  export type EmployerGroupOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    planDocUrl?: SortOrderInput | SortOrder
    planRules?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: EmployerGroupCountOrderByAggregateInput
    _max?: EmployerGroupMaxOrderByAggregateInput
    _min?: EmployerGroupMinOrderByAggregateInput
  }

  export type EmployerGroupScalarWhereWithAggregatesInput = {
    AND?: EmployerGroupScalarWhereWithAggregatesInput | EmployerGroupScalarWhereWithAggregatesInput[]
    OR?: EmployerGroupScalarWhereWithAggregatesInput[]
    NOT?: EmployerGroupScalarWhereWithAggregatesInput | EmployerGroupScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EmployerGroup"> | string
    tenantId?: StringWithAggregatesFilter<"EmployerGroup"> | string
    name?: StringWithAggregatesFilter<"EmployerGroup"> | string
    planDocUrl?: StringNullableWithAggregatesFilter<"EmployerGroup"> | string | null
    planRules?: JsonNullableWithAggregatesFilter<"EmployerGroup">
    createdAt?: DateTimeWithAggregatesFilter<"EmployerGroup"> | Date | string
  }

  export type MemberWhereInput = {
    AND?: MemberWhereInput | MemberWhereInput[]
    OR?: MemberWhereInput[]
    NOT?: MemberWhereInput | MemberWhereInput[]
    id?: StringFilter<"Member"> | string
    employerGroupId?: StringFilter<"Member"> | string
    externalId?: StringNullableFilter<"Member"> | string | null
    firstName?: StringFilter<"Member"> | string
    lastName?: StringFilter<"Member"> | string
    employerGroup?: XOR<EmployerGroupRelationFilter, EmployerGroupWhereInput>
    medicalEvents?: MedicalEventListRelationFilter
  }

  export type MemberOrderByWithRelationInput = {
    id?: SortOrder
    employerGroupId?: SortOrder
    externalId?: SortOrderInput | SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    employerGroup?: EmployerGroupOrderByWithRelationInput
    medicalEvents?: MedicalEventOrderByRelationAggregateInput
  }

  export type MemberWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MemberWhereInput | MemberWhereInput[]
    OR?: MemberWhereInput[]
    NOT?: MemberWhereInput | MemberWhereInput[]
    employerGroupId?: StringFilter<"Member"> | string
    externalId?: StringNullableFilter<"Member"> | string | null
    firstName?: StringFilter<"Member"> | string
    lastName?: StringFilter<"Member"> | string
    employerGroup?: XOR<EmployerGroupRelationFilter, EmployerGroupWhereInput>
    medicalEvents?: MedicalEventListRelationFilter
  }, "id">

  export type MemberOrderByWithAggregationInput = {
    id?: SortOrder
    employerGroupId?: SortOrder
    externalId?: SortOrderInput | SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    _count?: MemberCountOrderByAggregateInput
    _max?: MemberMaxOrderByAggregateInput
    _min?: MemberMinOrderByAggregateInput
  }

  export type MemberScalarWhereWithAggregatesInput = {
    AND?: MemberScalarWhereWithAggregatesInput | MemberScalarWhereWithAggregatesInput[]
    OR?: MemberScalarWhereWithAggregatesInput[]
    NOT?: MemberScalarWhereWithAggregatesInput | MemberScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Member"> | string
    employerGroupId?: StringWithAggregatesFilter<"Member"> | string
    externalId?: StringNullableWithAggregatesFilter<"Member"> | string | null
    firstName?: StringWithAggregatesFilter<"Member"> | string
    lastName?: StringWithAggregatesFilter<"Member"> | string
  }

  export type MedicalEventWhereInput = {
    AND?: MedicalEventWhereInput | MedicalEventWhereInput[]
    OR?: MedicalEventWhereInput[]
    NOT?: MedicalEventWhereInput | MedicalEventWhereInput[]
    id?: StringFilter<"MedicalEvent"> | string
    tenantId?: StringFilter<"MedicalEvent"> | string
    memberId?: StringFilter<"MedicalEvent"> | string
    name?: StringFilter<"MedicalEvent"> | string
    status?: StringFilter<"MedicalEvent"> | string
    totalSaved?: DecimalFilter<"MedicalEvent"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"MedicalEvent"> | Date | string
    member?: XOR<MemberRelationFilter, MemberWhereInput>
    claims?: ClaimListRelationFilter
  }

  export type MedicalEventOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    memberId?: SortOrder
    name?: SortOrder
    status?: SortOrder
    totalSaved?: SortOrder
    createdAt?: SortOrder
    member?: MemberOrderByWithRelationInput
    claims?: ClaimOrderByRelationAggregateInput
  }

  export type MedicalEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MedicalEventWhereInput | MedicalEventWhereInput[]
    OR?: MedicalEventWhereInput[]
    NOT?: MedicalEventWhereInput | MedicalEventWhereInput[]
    tenantId?: StringFilter<"MedicalEvent"> | string
    memberId?: StringFilter<"MedicalEvent"> | string
    name?: StringFilter<"MedicalEvent"> | string
    status?: StringFilter<"MedicalEvent"> | string
    totalSaved?: DecimalFilter<"MedicalEvent"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"MedicalEvent"> | Date | string
    member?: XOR<MemberRelationFilter, MemberWhereInput>
    claims?: ClaimListRelationFilter
  }, "id">

  export type MedicalEventOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    memberId?: SortOrder
    name?: SortOrder
    status?: SortOrder
    totalSaved?: SortOrder
    createdAt?: SortOrder
    _count?: MedicalEventCountOrderByAggregateInput
    _avg?: MedicalEventAvgOrderByAggregateInput
    _max?: MedicalEventMaxOrderByAggregateInput
    _min?: MedicalEventMinOrderByAggregateInput
    _sum?: MedicalEventSumOrderByAggregateInput
  }

  export type MedicalEventScalarWhereWithAggregatesInput = {
    AND?: MedicalEventScalarWhereWithAggregatesInput | MedicalEventScalarWhereWithAggregatesInput[]
    OR?: MedicalEventScalarWhereWithAggregatesInput[]
    NOT?: MedicalEventScalarWhereWithAggregatesInput | MedicalEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MedicalEvent"> | string
    tenantId?: StringWithAggregatesFilter<"MedicalEvent"> | string
    memberId?: StringWithAggregatesFilter<"MedicalEvent"> | string
    name?: StringWithAggregatesFilter<"MedicalEvent"> | string
    status?: StringWithAggregatesFilter<"MedicalEvent"> | string
    totalSaved?: DecimalWithAggregatesFilter<"MedicalEvent"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeWithAggregatesFilter<"MedicalEvent"> | Date | string
  }

  export type ClaimWhereInput = {
    AND?: ClaimWhereInput | ClaimWhereInput[]
    OR?: ClaimWhereInput[]
    NOT?: ClaimWhereInput | ClaimWhereInput[]
    id?: StringFilter<"Claim"> | string
    tenantId?: StringFilter<"Claim"> | string
    eventId?: StringFilter<"Claim"> | string
    providerName?: StringFilter<"Claim"> | string
    serviceDate?: DateTimeFilter<"Claim"> | Date | string
    cptCode?: StringFilter<"Claim"> | string
    providerBilled?: DecimalFilter<"Claim"> | Decimal | DecimalJsLike | number | string
    insuranceAllowed?: DecimalFilter<"Claim"> | Decimal | DecimalJsLike | number | string
    planRuleAmount?: DecimalFilter<"Claim"> | Decimal | DecimalJsLike | number | string
    memberOwes?: DecimalFilter<"Claim"> | Decimal | DecimalJsLike | number | string
    status?: EnumClaimStatusFilter<"Claim"> | $Enums.ClaimStatus
    varianceNote?: StringNullableFilter<"Claim"> | string | null
    rawEobData?: JsonNullableFilter<"Claim">
    createdAt?: DateTimeFilter<"Claim"> | Date | string
    medicalEvent?: XOR<MedicalEventRelationFilter, MedicalEventWhereInput>
  }

  export type ClaimOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    eventId?: SortOrder
    providerName?: SortOrder
    serviceDate?: SortOrder
    cptCode?: SortOrder
    providerBilled?: SortOrder
    insuranceAllowed?: SortOrder
    planRuleAmount?: SortOrder
    memberOwes?: SortOrder
    status?: SortOrder
    varianceNote?: SortOrderInput | SortOrder
    rawEobData?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    medicalEvent?: MedicalEventOrderByWithRelationInput
  }

  export type ClaimWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ClaimWhereInput | ClaimWhereInput[]
    OR?: ClaimWhereInput[]
    NOT?: ClaimWhereInput | ClaimWhereInput[]
    tenantId?: StringFilter<"Claim"> | string
    eventId?: StringFilter<"Claim"> | string
    providerName?: StringFilter<"Claim"> | string
    serviceDate?: DateTimeFilter<"Claim"> | Date | string
    cptCode?: StringFilter<"Claim"> | string
    providerBilled?: DecimalFilter<"Claim"> | Decimal | DecimalJsLike | number | string
    insuranceAllowed?: DecimalFilter<"Claim"> | Decimal | DecimalJsLike | number | string
    planRuleAmount?: DecimalFilter<"Claim"> | Decimal | DecimalJsLike | number | string
    memberOwes?: DecimalFilter<"Claim"> | Decimal | DecimalJsLike | number | string
    status?: EnumClaimStatusFilter<"Claim"> | $Enums.ClaimStatus
    varianceNote?: StringNullableFilter<"Claim"> | string | null
    rawEobData?: JsonNullableFilter<"Claim">
    createdAt?: DateTimeFilter<"Claim"> | Date | string
    medicalEvent?: XOR<MedicalEventRelationFilter, MedicalEventWhereInput>
  }, "id">

  export type ClaimOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    eventId?: SortOrder
    providerName?: SortOrder
    serviceDate?: SortOrder
    cptCode?: SortOrder
    providerBilled?: SortOrder
    insuranceAllowed?: SortOrder
    planRuleAmount?: SortOrder
    memberOwes?: SortOrder
    status?: SortOrder
    varianceNote?: SortOrderInput | SortOrder
    rawEobData?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ClaimCountOrderByAggregateInput
    _avg?: ClaimAvgOrderByAggregateInput
    _max?: ClaimMaxOrderByAggregateInput
    _min?: ClaimMinOrderByAggregateInput
    _sum?: ClaimSumOrderByAggregateInput
  }

  export type ClaimScalarWhereWithAggregatesInput = {
    AND?: ClaimScalarWhereWithAggregatesInput | ClaimScalarWhereWithAggregatesInput[]
    OR?: ClaimScalarWhereWithAggregatesInput[]
    NOT?: ClaimScalarWhereWithAggregatesInput | ClaimScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Claim"> | string
    tenantId?: StringWithAggregatesFilter<"Claim"> | string
    eventId?: StringWithAggregatesFilter<"Claim"> | string
    providerName?: StringWithAggregatesFilter<"Claim"> | string
    serviceDate?: DateTimeWithAggregatesFilter<"Claim"> | Date | string
    cptCode?: StringWithAggregatesFilter<"Claim"> | string
    providerBilled?: DecimalWithAggregatesFilter<"Claim"> | Decimal | DecimalJsLike | number | string
    insuranceAllowed?: DecimalWithAggregatesFilter<"Claim"> | Decimal | DecimalJsLike | number | string
    planRuleAmount?: DecimalWithAggregatesFilter<"Claim"> | Decimal | DecimalJsLike | number | string
    memberOwes?: DecimalWithAggregatesFilter<"Claim"> | Decimal | DecimalJsLike | number | string
    status?: EnumClaimStatusWithAggregatesFilter<"Claim"> | $Enums.ClaimStatus
    varianceNote?: StringNullableWithAggregatesFilter<"Claim"> | string | null
    rawEobData?: JsonNullableWithAggregatesFilter<"Claim">
    createdAt?: DateTimeWithAggregatesFilter<"Claim"> | Date | string
  }

  export type TenantCreateInput = {
    id?: string
    name: string
    slug: string
    primaryColor?: string
    logoUrl?: string | null
    apiKeyHash: string
    createdAt?: Date | string
    employers?: EmployerGroupCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    primaryColor?: string
    logoUrl?: string | null
    apiKeyHash: string
    createdAt?: Date | string
    employers?: EmployerGroupUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    primaryColor?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    apiKeyHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employers?: EmployerGroupUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    primaryColor?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    apiKeyHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employers?: EmployerGroupUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type TenantCreateManyInput = {
    id?: string
    name: string
    slug: string
    primaryColor?: string
    logoUrl?: string | null
    apiKeyHash: string
    createdAt?: Date | string
  }

  export type TenantUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    primaryColor?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    apiKeyHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TenantUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    primaryColor?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    apiKeyHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployerGroupCreateInput = {
    id?: string
    name: string
    planDocUrl?: string | null
    planRules?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    tenant: TenantCreateNestedOneWithoutEmployersInput
    members?: MemberCreateNestedManyWithoutEmployerGroupInput
  }

  export type EmployerGroupUncheckedCreateInput = {
    id?: string
    tenantId: string
    name: string
    planDocUrl?: string | null
    planRules?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    members?: MemberUncheckedCreateNestedManyWithoutEmployerGroupInput
  }

  export type EmployerGroupUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    planDocUrl?: NullableStringFieldUpdateOperationsInput | string | null
    planRules?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutEmployersNestedInput
    members?: MemberUpdateManyWithoutEmployerGroupNestedInput
  }

  export type EmployerGroupUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    planDocUrl?: NullableStringFieldUpdateOperationsInput | string | null
    planRules?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: MemberUncheckedUpdateManyWithoutEmployerGroupNestedInput
  }

  export type EmployerGroupCreateManyInput = {
    id?: string
    tenantId: string
    name: string
    planDocUrl?: string | null
    planRules?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type EmployerGroupUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    planDocUrl?: NullableStringFieldUpdateOperationsInput | string | null
    planRules?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployerGroupUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    planDocUrl?: NullableStringFieldUpdateOperationsInput | string | null
    planRules?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberCreateInput = {
    id?: string
    externalId?: string | null
    firstName: string
    lastName: string
    employerGroup: EmployerGroupCreateNestedOneWithoutMembersInput
    medicalEvents?: MedicalEventCreateNestedManyWithoutMemberInput
  }

  export type MemberUncheckedCreateInput = {
    id?: string
    employerGroupId: string
    externalId?: string | null
    firstName: string
    lastName: string
    medicalEvents?: MedicalEventUncheckedCreateNestedManyWithoutMemberInput
  }

  export type MemberUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    employerGroup?: EmployerGroupUpdateOneRequiredWithoutMembersNestedInput
    medicalEvents?: MedicalEventUpdateManyWithoutMemberNestedInput
  }

  export type MemberUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    employerGroupId?: StringFieldUpdateOperationsInput | string
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    medicalEvents?: MedicalEventUncheckedUpdateManyWithoutMemberNestedInput
  }

  export type MemberCreateManyInput = {
    id?: string
    employerGroupId: string
    externalId?: string | null
    firstName: string
    lastName: string
  }

  export type MemberUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
  }

  export type MemberUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    employerGroupId?: StringFieldUpdateOperationsInput | string
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
  }

  export type MedicalEventCreateInput = {
    id?: string
    tenantId: string
    name: string
    status?: string
    totalSaved?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    member: MemberCreateNestedOneWithoutMedicalEventsInput
    claims?: ClaimCreateNestedManyWithoutMedicalEventInput
  }

  export type MedicalEventUncheckedCreateInput = {
    id?: string
    tenantId: string
    memberId: string
    name: string
    status?: string
    totalSaved?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    claims?: ClaimUncheckedCreateNestedManyWithoutMedicalEventInput
  }

  export type MedicalEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    totalSaved?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    member?: MemberUpdateOneRequiredWithoutMedicalEventsNestedInput
    claims?: ClaimUpdateManyWithoutMedicalEventNestedInput
  }

  export type MedicalEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    totalSaved?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    claims?: ClaimUncheckedUpdateManyWithoutMedicalEventNestedInput
  }

  export type MedicalEventCreateManyInput = {
    id?: string
    tenantId: string
    memberId: string
    name: string
    status?: string
    totalSaved?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
  }

  export type MedicalEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    totalSaved?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MedicalEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    totalSaved?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClaimCreateInput = {
    id?: string
    tenantId: string
    providerName: string
    serviceDate: Date | string
    cptCode: string
    providerBilled: Decimal | DecimalJsLike | number | string
    insuranceAllowed: Decimal | DecimalJsLike | number | string
    planRuleAmount: Decimal | DecimalJsLike | number | string
    memberOwes: Decimal | DecimalJsLike | number | string
    status?: $Enums.ClaimStatus
    varianceNote?: string | null
    rawEobData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    medicalEvent: MedicalEventCreateNestedOneWithoutClaimsInput
  }

  export type ClaimUncheckedCreateInput = {
    id?: string
    tenantId: string
    eventId: string
    providerName: string
    serviceDate: Date | string
    cptCode: string
    providerBilled: Decimal | DecimalJsLike | number | string
    insuranceAllowed: Decimal | DecimalJsLike | number | string
    planRuleAmount: Decimal | DecimalJsLike | number | string
    memberOwes: Decimal | DecimalJsLike | number | string
    status?: $Enums.ClaimStatus
    varianceNote?: string | null
    rawEobData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ClaimUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    providerName?: StringFieldUpdateOperationsInput | string
    serviceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    cptCode?: StringFieldUpdateOperationsInput | string
    providerBilled?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    insuranceAllowed?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    planRuleAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    memberOwes?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumClaimStatusFieldUpdateOperationsInput | $Enums.ClaimStatus
    varianceNote?: NullableStringFieldUpdateOperationsInput | string | null
    rawEobData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    medicalEvent?: MedicalEventUpdateOneRequiredWithoutClaimsNestedInput
  }

  export type ClaimUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    providerName?: StringFieldUpdateOperationsInput | string
    serviceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    cptCode?: StringFieldUpdateOperationsInput | string
    providerBilled?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    insuranceAllowed?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    planRuleAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    memberOwes?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumClaimStatusFieldUpdateOperationsInput | $Enums.ClaimStatus
    varianceNote?: NullableStringFieldUpdateOperationsInput | string | null
    rawEobData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClaimCreateManyInput = {
    id?: string
    tenantId: string
    eventId: string
    providerName: string
    serviceDate: Date | string
    cptCode: string
    providerBilled: Decimal | DecimalJsLike | number | string
    insuranceAllowed: Decimal | DecimalJsLike | number | string
    planRuleAmount: Decimal | DecimalJsLike | number | string
    memberOwes: Decimal | DecimalJsLike | number | string
    status?: $Enums.ClaimStatus
    varianceNote?: string | null
    rawEobData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ClaimUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    providerName?: StringFieldUpdateOperationsInput | string
    serviceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    cptCode?: StringFieldUpdateOperationsInput | string
    providerBilled?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    insuranceAllowed?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    planRuleAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    memberOwes?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumClaimStatusFieldUpdateOperationsInput | $Enums.ClaimStatus
    varianceNote?: NullableStringFieldUpdateOperationsInput | string | null
    rawEobData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClaimUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    providerName?: StringFieldUpdateOperationsInput | string
    serviceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    cptCode?: StringFieldUpdateOperationsInput | string
    providerBilled?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    insuranceAllowed?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    planRuleAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    memberOwes?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumClaimStatusFieldUpdateOperationsInput | $Enums.ClaimStatus
    varianceNote?: NullableStringFieldUpdateOperationsInput | string | null
    rawEobData?: NullableJsonNullValueInput | InputJsonValue
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

  export type EmployerGroupListRelationFilter = {
    every?: EmployerGroupWhereInput
    some?: EmployerGroupWhereInput
    none?: EmployerGroupWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type EmployerGroupOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TenantCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    primaryColor?: SortOrder
    logoUrl?: SortOrder
    apiKeyHash?: SortOrder
    createdAt?: SortOrder
  }

  export type TenantMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    primaryColor?: SortOrder
    logoUrl?: SortOrder
    apiKeyHash?: SortOrder
    createdAt?: SortOrder
  }

  export type TenantMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    primaryColor?: SortOrder
    logoUrl?: SortOrder
    apiKeyHash?: SortOrder
    createdAt?: SortOrder
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
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type TenantRelationFilter = {
    is?: TenantWhereInput
    isNot?: TenantWhereInput
  }

  export type MemberListRelationFilter = {
    every?: MemberWhereInput
    some?: MemberWhereInput
    none?: MemberWhereInput
  }

  export type MemberOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EmployerGroupCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    planDocUrl?: SortOrder
    planRules?: SortOrder
    createdAt?: SortOrder
  }

  export type EmployerGroupMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    planDocUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type EmployerGroupMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    name?: SortOrder
    planDocUrl?: SortOrder
    createdAt?: SortOrder
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
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type EmployerGroupRelationFilter = {
    is?: EmployerGroupWhereInput
    isNot?: EmployerGroupWhereInput
  }

  export type MedicalEventListRelationFilter = {
    every?: MedicalEventWhereInput
    some?: MedicalEventWhereInput
    none?: MedicalEventWhereInput
  }

  export type MedicalEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MemberCountOrderByAggregateInput = {
    id?: SortOrder
    employerGroupId?: SortOrder
    externalId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
  }

  export type MemberMaxOrderByAggregateInput = {
    id?: SortOrder
    employerGroupId?: SortOrder
    externalId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
  }

  export type MemberMinOrderByAggregateInput = {
    id?: SortOrder
    employerGroupId?: SortOrder
    externalId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type MemberRelationFilter = {
    is?: MemberWhereInput
    isNot?: MemberWhereInput
  }

  export type ClaimListRelationFilter = {
    every?: ClaimWhereInput
    some?: ClaimWhereInput
    none?: ClaimWhereInput
  }

  export type ClaimOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MedicalEventCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    memberId?: SortOrder
    name?: SortOrder
    status?: SortOrder
    totalSaved?: SortOrder
    createdAt?: SortOrder
  }

  export type MedicalEventAvgOrderByAggregateInput = {
    totalSaved?: SortOrder
  }

  export type MedicalEventMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    memberId?: SortOrder
    name?: SortOrder
    status?: SortOrder
    totalSaved?: SortOrder
    createdAt?: SortOrder
  }

  export type MedicalEventMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    memberId?: SortOrder
    name?: SortOrder
    status?: SortOrder
    totalSaved?: SortOrder
    createdAt?: SortOrder
  }

  export type MedicalEventSumOrderByAggregateInput = {
    totalSaved?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type EnumClaimStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ClaimStatus | EnumClaimStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ClaimStatus[] | ListEnumClaimStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ClaimStatus[] | ListEnumClaimStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumClaimStatusFilter<$PrismaModel> | $Enums.ClaimStatus
  }

  export type MedicalEventRelationFilter = {
    is?: MedicalEventWhereInput
    isNot?: MedicalEventWhereInput
  }

  export type ClaimCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    eventId?: SortOrder
    providerName?: SortOrder
    serviceDate?: SortOrder
    cptCode?: SortOrder
    providerBilled?: SortOrder
    insuranceAllowed?: SortOrder
    planRuleAmount?: SortOrder
    memberOwes?: SortOrder
    status?: SortOrder
    varianceNote?: SortOrder
    rawEobData?: SortOrder
    createdAt?: SortOrder
  }

  export type ClaimAvgOrderByAggregateInput = {
    providerBilled?: SortOrder
    insuranceAllowed?: SortOrder
    planRuleAmount?: SortOrder
    memberOwes?: SortOrder
  }

  export type ClaimMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    eventId?: SortOrder
    providerName?: SortOrder
    serviceDate?: SortOrder
    cptCode?: SortOrder
    providerBilled?: SortOrder
    insuranceAllowed?: SortOrder
    planRuleAmount?: SortOrder
    memberOwes?: SortOrder
    status?: SortOrder
    varianceNote?: SortOrder
    createdAt?: SortOrder
  }

  export type ClaimMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    eventId?: SortOrder
    providerName?: SortOrder
    serviceDate?: SortOrder
    cptCode?: SortOrder
    providerBilled?: SortOrder
    insuranceAllowed?: SortOrder
    planRuleAmount?: SortOrder
    memberOwes?: SortOrder
    status?: SortOrder
    varianceNote?: SortOrder
    createdAt?: SortOrder
  }

  export type ClaimSumOrderByAggregateInput = {
    providerBilled?: SortOrder
    insuranceAllowed?: SortOrder
    planRuleAmount?: SortOrder
    memberOwes?: SortOrder
  }

  export type EnumClaimStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ClaimStatus | EnumClaimStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ClaimStatus[] | ListEnumClaimStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ClaimStatus[] | ListEnumClaimStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumClaimStatusWithAggregatesFilter<$PrismaModel> | $Enums.ClaimStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumClaimStatusFilter<$PrismaModel>
    _max?: NestedEnumClaimStatusFilter<$PrismaModel>
  }

  export type EmployerGroupCreateNestedManyWithoutTenantInput = {
    create?: XOR<EmployerGroupCreateWithoutTenantInput, EmployerGroupUncheckedCreateWithoutTenantInput> | EmployerGroupCreateWithoutTenantInput[] | EmployerGroupUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: EmployerGroupCreateOrConnectWithoutTenantInput | EmployerGroupCreateOrConnectWithoutTenantInput[]
    createMany?: EmployerGroupCreateManyTenantInputEnvelope
    connect?: EmployerGroupWhereUniqueInput | EmployerGroupWhereUniqueInput[]
  }

  export type EmployerGroupUncheckedCreateNestedManyWithoutTenantInput = {
    create?: XOR<EmployerGroupCreateWithoutTenantInput, EmployerGroupUncheckedCreateWithoutTenantInput> | EmployerGroupCreateWithoutTenantInput[] | EmployerGroupUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: EmployerGroupCreateOrConnectWithoutTenantInput | EmployerGroupCreateOrConnectWithoutTenantInput[]
    createMany?: EmployerGroupCreateManyTenantInputEnvelope
    connect?: EmployerGroupWhereUniqueInput | EmployerGroupWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type EmployerGroupUpdateManyWithoutTenantNestedInput = {
    create?: XOR<EmployerGroupCreateWithoutTenantInput, EmployerGroupUncheckedCreateWithoutTenantInput> | EmployerGroupCreateWithoutTenantInput[] | EmployerGroupUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: EmployerGroupCreateOrConnectWithoutTenantInput | EmployerGroupCreateOrConnectWithoutTenantInput[]
    upsert?: EmployerGroupUpsertWithWhereUniqueWithoutTenantInput | EmployerGroupUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: EmployerGroupCreateManyTenantInputEnvelope
    set?: EmployerGroupWhereUniqueInput | EmployerGroupWhereUniqueInput[]
    disconnect?: EmployerGroupWhereUniqueInput | EmployerGroupWhereUniqueInput[]
    delete?: EmployerGroupWhereUniqueInput | EmployerGroupWhereUniqueInput[]
    connect?: EmployerGroupWhereUniqueInput | EmployerGroupWhereUniqueInput[]
    update?: EmployerGroupUpdateWithWhereUniqueWithoutTenantInput | EmployerGroupUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: EmployerGroupUpdateManyWithWhereWithoutTenantInput | EmployerGroupUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: EmployerGroupScalarWhereInput | EmployerGroupScalarWhereInput[]
  }

  export type EmployerGroupUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: XOR<EmployerGroupCreateWithoutTenantInput, EmployerGroupUncheckedCreateWithoutTenantInput> | EmployerGroupCreateWithoutTenantInput[] | EmployerGroupUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: EmployerGroupCreateOrConnectWithoutTenantInput | EmployerGroupCreateOrConnectWithoutTenantInput[]
    upsert?: EmployerGroupUpsertWithWhereUniqueWithoutTenantInput | EmployerGroupUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: EmployerGroupCreateManyTenantInputEnvelope
    set?: EmployerGroupWhereUniqueInput | EmployerGroupWhereUniqueInput[]
    disconnect?: EmployerGroupWhereUniqueInput | EmployerGroupWhereUniqueInput[]
    delete?: EmployerGroupWhereUniqueInput | EmployerGroupWhereUniqueInput[]
    connect?: EmployerGroupWhereUniqueInput | EmployerGroupWhereUniqueInput[]
    update?: EmployerGroupUpdateWithWhereUniqueWithoutTenantInput | EmployerGroupUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: EmployerGroupUpdateManyWithWhereWithoutTenantInput | EmployerGroupUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: EmployerGroupScalarWhereInput | EmployerGroupScalarWhereInput[]
  }

  export type TenantCreateNestedOneWithoutEmployersInput = {
    create?: XOR<TenantCreateWithoutEmployersInput, TenantUncheckedCreateWithoutEmployersInput>
    connectOrCreate?: TenantCreateOrConnectWithoutEmployersInput
    connect?: TenantWhereUniqueInput
  }

  export type MemberCreateNestedManyWithoutEmployerGroupInput = {
    create?: XOR<MemberCreateWithoutEmployerGroupInput, MemberUncheckedCreateWithoutEmployerGroupInput> | MemberCreateWithoutEmployerGroupInput[] | MemberUncheckedCreateWithoutEmployerGroupInput[]
    connectOrCreate?: MemberCreateOrConnectWithoutEmployerGroupInput | MemberCreateOrConnectWithoutEmployerGroupInput[]
    createMany?: MemberCreateManyEmployerGroupInputEnvelope
    connect?: MemberWhereUniqueInput | MemberWhereUniqueInput[]
  }

  export type MemberUncheckedCreateNestedManyWithoutEmployerGroupInput = {
    create?: XOR<MemberCreateWithoutEmployerGroupInput, MemberUncheckedCreateWithoutEmployerGroupInput> | MemberCreateWithoutEmployerGroupInput[] | MemberUncheckedCreateWithoutEmployerGroupInput[]
    connectOrCreate?: MemberCreateOrConnectWithoutEmployerGroupInput | MemberCreateOrConnectWithoutEmployerGroupInput[]
    createMany?: MemberCreateManyEmployerGroupInputEnvelope
    connect?: MemberWhereUniqueInput | MemberWhereUniqueInput[]
  }

  export type TenantUpdateOneRequiredWithoutEmployersNestedInput = {
    create?: XOR<TenantCreateWithoutEmployersInput, TenantUncheckedCreateWithoutEmployersInput>
    connectOrCreate?: TenantCreateOrConnectWithoutEmployersInput
    upsert?: TenantUpsertWithoutEmployersInput
    connect?: TenantWhereUniqueInput
    update?: XOR<XOR<TenantUpdateToOneWithWhereWithoutEmployersInput, TenantUpdateWithoutEmployersInput>, TenantUncheckedUpdateWithoutEmployersInput>
  }

  export type MemberUpdateManyWithoutEmployerGroupNestedInput = {
    create?: XOR<MemberCreateWithoutEmployerGroupInput, MemberUncheckedCreateWithoutEmployerGroupInput> | MemberCreateWithoutEmployerGroupInput[] | MemberUncheckedCreateWithoutEmployerGroupInput[]
    connectOrCreate?: MemberCreateOrConnectWithoutEmployerGroupInput | MemberCreateOrConnectWithoutEmployerGroupInput[]
    upsert?: MemberUpsertWithWhereUniqueWithoutEmployerGroupInput | MemberUpsertWithWhereUniqueWithoutEmployerGroupInput[]
    createMany?: MemberCreateManyEmployerGroupInputEnvelope
    set?: MemberWhereUniqueInput | MemberWhereUniqueInput[]
    disconnect?: MemberWhereUniqueInput | MemberWhereUniqueInput[]
    delete?: MemberWhereUniqueInput | MemberWhereUniqueInput[]
    connect?: MemberWhereUniqueInput | MemberWhereUniqueInput[]
    update?: MemberUpdateWithWhereUniqueWithoutEmployerGroupInput | MemberUpdateWithWhereUniqueWithoutEmployerGroupInput[]
    updateMany?: MemberUpdateManyWithWhereWithoutEmployerGroupInput | MemberUpdateManyWithWhereWithoutEmployerGroupInput[]
    deleteMany?: MemberScalarWhereInput | MemberScalarWhereInput[]
  }

  export type MemberUncheckedUpdateManyWithoutEmployerGroupNestedInput = {
    create?: XOR<MemberCreateWithoutEmployerGroupInput, MemberUncheckedCreateWithoutEmployerGroupInput> | MemberCreateWithoutEmployerGroupInput[] | MemberUncheckedCreateWithoutEmployerGroupInput[]
    connectOrCreate?: MemberCreateOrConnectWithoutEmployerGroupInput | MemberCreateOrConnectWithoutEmployerGroupInput[]
    upsert?: MemberUpsertWithWhereUniqueWithoutEmployerGroupInput | MemberUpsertWithWhereUniqueWithoutEmployerGroupInput[]
    createMany?: MemberCreateManyEmployerGroupInputEnvelope
    set?: MemberWhereUniqueInput | MemberWhereUniqueInput[]
    disconnect?: MemberWhereUniqueInput | MemberWhereUniqueInput[]
    delete?: MemberWhereUniqueInput | MemberWhereUniqueInput[]
    connect?: MemberWhereUniqueInput | MemberWhereUniqueInput[]
    update?: MemberUpdateWithWhereUniqueWithoutEmployerGroupInput | MemberUpdateWithWhereUniqueWithoutEmployerGroupInput[]
    updateMany?: MemberUpdateManyWithWhereWithoutEmployerGroupInput | MemberUpdateManyWithWhereWithoutEmployerGroupInput[]
    deleteMany?: MemberScalarWhereInput | MemberScalarWhereInput[]
  }

  export type EmployerGroupCreateNestedOneWithoutMembersInput = {
    create?: XOR<EmployerGroupCreateWithoutMembersInput, EmployerGroupUncheckedCreateWithoutMembersInput>
    connectOrCreate?: EmployerGroupCreateOrConnectWithoutMembersInput
    connect?: EmployerGroupWhereUniqueInput
  }

  export type MedicalEventCreateNestedManyWithoutMemberInput = {
    create?: XOR<MedicalEventCreateWithoutMemberInput, MedicalEventUncheckedCreateWithoutMemberInput> | MedicalEventCreateWithoutMemberInput[] | MedicalEventUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: MedicalEventCreateOrConnectWithoutMemberInput | MedicalEventCreateOrConnectWithoutMemberInput[]
    createMany?: MedicalEventCreateManyMemberInputEnvelope
    connect?: MedicalEventWhereUniqueInput | MedicalEventWhereUniqueInput[]
  }

  export type MedicalEventUncheckedCreateNestedManyWithoutMemberInput = {
    create?: XOR<MedicalEventCreateWithoutMemberInput, MedicalEventUncheckedCreateWithoutMemberInput> | MedicalEventCreateWithoutMemberInput[] | MedicalEventUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: MedicalEventCreateOrConnectWithoutMemberInput | MedicalEventCreateOrConnectWithoutMemberInput[]
    createMany?: MedicalEventCreateManyMemberInputEnvelope
    connect?: MedicalEventWhereUniqueInput | MedicalEventWhereUniqueInput[]
  }

  export type EmployerGroupUpdateOneRequiredWithoutMembersNestedInput = {
    create?: XOR<EmployerGroupCreateWithoutMembersInput, EmployerGroupUncheckedCreateWithoutMembersInput>
    connectOrCreate?: EmployerGroupCreateOrConnectWithoutMembersInput
    upsert?: EmployerGroupUpsertWithoutMembersInput
    connect?: EmployerGroupWhereUniqueInput
    update?: XOR<XOR<EmployerGroupUpdateToOneWithWhereWithoutMembersInput, EmployerGroupUpdateWithoutMembersInput>, EmployerGroupUncheckedUpdateWithoutMembersInput>
  }

  export type MedicalEventUpdateManyWithoutMemberNestedInput = {
    create?: XOR<MedicalEventCreateWithoutMemberInput, MedicalEventUncheckedCreateWithoutMemberInput> | MedicalEventCreateWithoutMemberInput[] | MedicalEventUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: MedicalEventCreateOrConnectWithoutMemberInput | MedicalEventCreateOrConnectWithoutMemberInput[]
    upsert?: MedicalEventUpsertWithWhereUniqueWithoutMemberInput | MedicalEventUpsertWithWhereUniqueWithoutMemberInput[]
    createMany?: MedicalEventCreateManyMemberInputEnvelope
    set?: MedicalEventWhereUniqueInput | MedicalEventWhereUniqueInput[]
    disconnect?: MedicalEventWhereUniqueInput | MedicalEventWhereUniqueInput[]
    delete?: MedicalEventWhereUniqueInput | MedicalEventWhereUniqueInput[]
    connect?: MedicalEventWhereUniqueInput | MedicalEventWhereUniqueInput[]
    update?: MedicalEventUpdateWithWhereUniqueWithoutMemberInput | MedicalEventUpdateWithWhereUniqueWithoutMemberInput[]
    updateMany?: MedicalEventUpdateManyWithWhereWithoutMemberInput | MedicalEventUpdateManyWithWhereWithoutMemberInput[]
    deleteMany?: MedicalEventScalarWhereInput | MedicalEventScalarWhereInput[]
  }

  export type MedicalEventUncheckedUpdateManyWithoutMemberNestedInput = {
    create?: XOR<MedicalEventCreateWithoutMemberInput, MedicalEventUncheckedCreateWithoutMemberInput> | MedicalEventCreateWithoutMemberInput[] | MedicalEventUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: MedicalEventCreateOrConnectWithoutMemberInput | MedicalEventCreateOrConnectWithoutMemberInput[]
    upsert?: MedicalEventUpsertWithWhereUniqueWithoutMemberInput | MedicalEventUpsertWithWhereUniqueWithoutMemberInput[]
    createMany?: MedicalEventCreateManyMemberInputEnvelope
    set?: MedicalEventWhereUniqueInput | MedicalEventWhereUniqueInput[]
    disconnect?: MedicalEventWhereUniqueInput | MedicalEventWhereUniqueInput[]
    delete?: MedicalEventWhereUniqueInput | MedicalEventWhereUniqueInput[]
    connect?: MedicalEventWhereUniqueInput | MedicalEventWhereUniqueInput[]
    update?: MedicalEventUpdateWithWhereUniqueWithoutMemberInput | MedicalEventUpdateWithWhereUniqueWithoutMemberInput[]
    updateMany?: MedicalEventUpdateManyWithWhereWithoutMemberInput | MedicalEventUpdateManyWithWhereWithoutMemberInput[]
    deleteMany?: MedicalEventScalarWhereInput | MedicalEventScalarWhereInput[]
  }

  export type MemberCreateNestedOneWithoutMedicalEventsInput = {
    create?: XOR<MemberCreateWithoutMedicalEventsInput, MemberUncheckedCreateWithoutMedicalEventsInput>
    connectOrCreate?: MemberCreateOrConnectWithoutMedicalEventsInput
    connect?: MemberWhereUniqueInput
  }

  export type ClaimCreateNestedManyWithoutMedicalEventInput = {
    create?: XOR<ClaimCreateWithoutMedicalEventInput, ClaimUncheckedCreateWithoutMedicalEventInput> | ClaimCreateWithoutMedicalEventInput[] | ClaimUncheckedCreateWithoutMedicalEventInput[]
    connectOrCreate?: ClaimCreateOrConnectWithoutMedicalEventInput | ClaimCreateOrConnectWithoutMedicalEventInput[]
    createMany?: ClaimCreateManyMedicalEventInputEnvelope
    connect?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
  }

  export type ClaimUncheckedCreateNestedManyWithoutMedicalEventInput = {
    create?: XOR<ClaimCreateWithoutMedicalEventInput, ClaimUncheckedCreateWithoutMedicalEventInput> | ClaimCreateWithoutMedicalEventInput[] | ClaimUncheckedCreateWithoutMedicalEventInput[]
    connectOrCreate?: ClaimCreateOrConnectWithoutMedicalEventInput | ClaimCreateOrConnectWithoutMedicalEventInput[]
    createMany?: ClaimCreateManyMedicalEventInputEnvelope
    connect?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type MemberUpdateOneRequiredWithoutMedicalEventsNestedInput = {
    create?: XOR<MemberCreateWithoutMedicalEventsInput, MemberUncheckedCreateWithoutMedicalEventsInput>
    connectOrCreate?: MemberCreateOrConnectWithoutMedicalEventsInput
    upsert?: MemberUpsertWithoutMedicalEventsInput
    connect?: MemberWhereUniqueInput
    update?: XOR<XOR<MemberUpdateToOneWithWhereWithoutMedicalEventsInput, MemberUpdateWithoutMedicalEventsInput>, MemberUncheckedUpdateWithoutMedicalEventsInput>
  }

  export type ClaimUpdateManyWithoutMedicalEventNestedInput = {
    create?: XOR<ClaimCreateWithoutMedicalEventInput, ClaimUncheckedCreateWithoutMedicalEventInput> | ClaimCreateWithoutMedicalEventInput[] | ClaimUncheckedCreateWithoutMedicalEventInput[]
    connectOrCreate?: ClaimCreateOrConnectWithoutMedicalEventInput | ClaimCreateOrConnectWithoutMedicalEventInput[]
    upsert?: ClaimUpsertWithWhereUniqueWithoutMedicalEventInput | ClaimUpsertWithWhereUniqueWithoutMedicalEventInput[]
    createMany?: ClaimCreateManyMedicalEventInputEnvelope
    set?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
    disconnect?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
    delete?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
    connect?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
    update?: ClaimUpdateWithWhereUniqueWithoutMedicalEventInput | ClaimUpdateWithWhereUniqueWithoutMedicalEventInput[]
    updateMany?: ClaimUpdateManyWithWhereWithoutMedicalEventInput | ClaimUpdateManyWithWhereWithoutMedicalEventInput[]
    deleteMany?: ClaimScalarWhereInput | ClaimScalarWhereInput[]
  }

  export type ClaimUncheckedUpdateManyWithoutMedicalEventNestedInput = {
    create?: XOR<ClaimCreateWithoutMedicalEventInput, ClaimUncheckedCreateWithoutMedicalEventInput> | ClaimCreateWithoutMedicalEventInput[] | ClaimUncheckedCreateWithoutMedicalEventInput[]
    connectOrCreate?: ClaimCreateOrConnectWithoutMedicalEventInput | ClaimCreateOrConnectWithoutMedicalEventInput[]
    upsert?: ClaimUpsertWithWhereUniqueWithoutMedicalEventInput | ClaimUpsertWithWhereUniqueWithoutMedicalEventInput[]
    createMany?: ClaimCreateManyMedicalEventInputEnvelope
    set?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
    disconnect?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
    delete?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
    connect?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
    update?: ClaimUpdateWithWhereUniqueWithoutMedicalEventInput | ClaimUpdateWithWhereUniqueWithoutMedicalEventInput[]
    updateMany?: ClaimUpdateManyWithWhereWithoutMedicalEventInput | ClaimUpdateManyWithWhereWithoutMedicalEventInput[]
    deleteMany?: ClaimScalarWhereInput | ClaimScalarWhereInput[]
  }

  export type MedicalEventCreateNestedOneWithoutClaimsInput = {
    create?: XOR<MedicalEventCreateWithoutClaimsInput, MedicalEventUncheckedCreateWithoutClaimsInput>
    connectOrCreate?: MedicalEventCreateOrConnectWithoutClaimsInput
    connect?: MedicalEventWhereUniqueInput
  }

  export type EnumClaimStatusFieldUpdateOperationsInput = {
    set?: $Enums.ClaimStatus
  }

  export type MedicalEventUpdateOneRequiredWithoutClaimsNestedInput = {
    create?: XOR<MedicalEventCreateWithoutClaimsInput, MedicalEventUncheckedCreateWithoutClaimsInput>
    connectOrCreate?: MedicalEventCreateOrConnectWithoutClaimsInput
    upsert?: MedicalEventUpsertWithoutClaimsInput
    connect?: MedicalEventWhereUniqueInput
    update?: XOR<XOR<MedicalEventUpdateToOneWithWhereWithoutClaimsInput, MedicalEventUpdateWithoutClaimsInput>, MedicalEventUncheckedUpdateWithoutClaimsInput>
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
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedEnumClaimStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ClaimStatus | EnumClaimStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ClaimStatus[] | ListEnumClaimStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ClaimStatus[] | ListEnumClaimStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumClaimStatusFilter<$PrismaModel> | $Enums.ClaimStatus
  }

  export type NestedEnumClaimStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ClaimStatus | EnumClaimStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ClaimStatus[] | ListEnumClaimStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ClaimStatus[] | ListEnumClaimStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumClaimStatusWithAggregatesFilter<$PrismaModel> | $Enums.ClaimStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumClaimStatusFilter<$PrismaModel>
    _max?: NestedEnumClaimStatusFilter<$PrismaModel>
  }

  export type EmployerGroupCreateWithoutTenantInput = {
    id?: string
    name: string
    planDocUrl?: string | null
    planRules?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    members?: MemberCreateNestedManyWithoutEmployerGroupInput
  }

  export type EmployerGroupUncheckedCreateWithoutTenantInput = {
    id?: string
    name: string
    planDocUrl?: string | null
    planRules?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    members?: MemberUncheckedCreateNestedManyWithoutEmployerGroupInput
  }

  export type EmployerGroupCreateOrConnectWithoutTenantInput = {
    where: EmployerGroupWhereUniqueInput
    create: XOR<EmployerGroupCreateWithoutTenantInput, EmployerGroupUncheckedCreateWithoutTenantInput>
  }

  export type EmployerGroupCreateManyTenantInputEnvelope = {
    data: EmployerGroupCreateManyTenantInput | EmployerGroupCreateManyTenantInput[]
    skipDuplicates?: boolean
  }

  export type EmployerGroupUpsertWithWhereUniqueWithoutTenantInput = {
    where: EmployerGroupWhereUniqueInput
    update: XOR<EmployerGroupUpdateWithoutTenantInput, EmployerGroupUncheckedUpdateWithoutTenantInput>
    create: XOR<EmployerGroupCreateWithoutTenantInput, EmployerGroupUncheckedCreateWithoutTenantInput>
  }

  export type EmployerGroupUpdateWithWhereUniqueWithoutTenantInput = {
    where: EmployerGroupWhereUniqueInput
    data: XOR<EmployerGroupUpdateWithoutTenantInput, EmployerGroupUncheckedUpdateWithoutTenantInput>
  }

  export type EmployerGroupUpdateManyWithWhereWithoutTenantInput = {
    where: EmployerGroupScalarWhereInput
    data: XOR<EmployerGroupUpdateManyMutationInput, EmployerGroupUncheckedUpdateManyWithoutTenantInput>
  }

  export type EmployerGroupScalarWhereInput = {
    AND?: EmployerGroupScalarWhereInput | EmployerGroupScalarWhereInput[]
    OR?: EmployerGroupScalarWhereInput[]
    NOT?: EmployerGroupScalarWhereInput | EmployerGroupScalarWhereInput[]
    id?: StringFilter<"EmployerGroup"> | string
    tenantId?: StringFilter<"EmployerGroup"> | string
    name?: StringFilter<"EmployerGroup"> | string
    planDocUrl?: StringNullableFilter<"EmployerGroup"> | string | null
    planRules?: JsonNullableFilter<"EmployerGroup">
    createdAt?: DateTimeFilter<"EmployerGroup"> | Date | string
  }

  export type TenantCreateWithoutEmployersInput = {
    id?: string
    name: string
    slug: string
    primaryColor?: string
    logoUrl?: string | null
    apiKeyHash: string
    createdAt?: Date | string
  }

  export type TenantUncheckedCreateWithoutEmployersInput = {
    id?: string
    name: string
    slug: string
    primaryColor?: string
    logoUrl?: string | null
    apiKeyHash: string
    createdAt?: Date | string
  }

  export type TenantCreateOrConnectWithoutEmployersInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutEmployersInput, TenantUncheckedCreateWithoutEmployersInput>
  }

  export type MemberCreateWithoutEmployerGroupInput = {
    id?: string
    externalId?: string | null
    firstName: string
    lastName: string
    medicalEvents?: MedicalEventCreateNestedManyWithoutMemberInput
  }

  export type MemberUncheckedCreateWithoutEmployerGroupInput = {
    id?: string
    externalId?: string | null
    firstName: string
    lastName: string
    medicalEvents?: MedicalEventUncheckedCreateNestedManyWithoutMemberInput
  }

  export type MemberCreateOrConnectWithoutEmployerGroupInput = {
    where: MemberWhereUniqueInput
    create: XOR<MemberCreateWithoutEmployerGroupInput, MemberUncheckedCreateWithoutEmployerGroupInput>
  }

  export type MemberCreateManyEmployerGroupInputEnvelope = {
    data: MemberCreateManyEmployerGroupInput | MemberCreateManyEmployerGroupInput[]
    skipDuplicates?: boolean
  }

  export type TenantUpsertWithoutEmployersInput = {
    update: XOR<TenantUpdateWithoutEmployersInput, TenantUncheckedUpdateWithoutEmployersInput>
    create: XOR<TenantCreateWithoutEmployersInput, TenantUncheckedCreateWithoutEmployersInput>
    where?: TenantWhereInput
  }

  export type TenantUpdateToOneWithWhereWithoutEmployersInput = {
    where?: TenantWhereInput
    data: XOR<TenantUpdateWithoutEmployersInput, TenantUncheckedUpdateWithoutEmployersInput>
  }

  export type TenantUpdateWithoutEmployersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    primaryColor?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    apiKeyHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TenantUncheckedUpdateWithoutEmployersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    primaryColor?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    apiKeyHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberUpsertWithWhereUniqueWithoutEmployerGroupInput = {
    where: MemberWhereUniqueInput
    update: XOR<MemberUpdateWithoutEmployerGroupInput, MemberUncheckedUpdateWithoutEmployerGroupInput>
    create: XOR<MemberCreateWithoutEmployerGroupInput, MemberUncheckedCreateWithoutEmployerGroupInput>
  }

  export type MemberUpdateWithWhereUniqueWithoutEmployerGroupInput = {
    where: MemberWhereUniqueInput
    data: XOR<MemberUpdateWithoutEmployerGroupInput, MemberUncheckedUpdateWithoutEmployerGroupInput>
  }

  export type MemberUpdateManyWithWhereWithoutEmployerGroupInput = {
    where: MemberScalarWhereInput
    data: XOR<MemberUpdateManyMutationInput, MemberUncheckedUpdateManyWithoutEmployerGroupInput>
  }

  export type MemberScalarWhereInput = {
    AND?: MemberScalarWhereInput | MemberScalarWhereInput[]
    OR?: MemberScalarWhereInput[]
    NOT?: MemberScalarWhereInput | MemberScalarWhereInput[]
    id?: StringFilter<"Member"> | string
    employerGroupId?: StringFilter<"Member"> | string
    externalId?: StringNullableFilter<"Member"> | string | null
    firstName?: StringFilter<"Member"> | string
    lastName?: StringFilter<"Member"> | string
  }

  export type EmployerGroupCreateWithoutMembersInput = {
    id?: string
    name: string
    planDocUrl?: string | null
    planRules?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    tenant: TenantCreateNestedOneWithoutEmployersInput
  }

  export type EmployerGroupUncheckedCreateWithoutMembersInput = {
    id?: string
    tenantId: string
    name: string
    planDocUrl?: string | null
    planRules?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type EmployerGroupCreateOrConnectWithoutMembersInput = {
    where: EmployerGroupWhereUniqueInput
    create: XOR<EmployerGroupCreateWithoutMembersInput, EmployerGroupUncheckedCreateWithoutMembersInput>
  }

  export type MedicalEventCreateWithoutMemberInput = {
    id?: string
    tenantId: string
    name: string
    status?: string
    totalSaved?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    claims?: ClaimCreateNestedManyWithoutMedicalEventInput
  }

  export type MedicalEventUncheckedCreateWithoutMemberInput = {
    id?: string
    tenantId: string
    name: string
    status?: string
    totalSaved?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    claims?: ClaimUncheckedCreateNestedManyWithoutMedicalEventInput
  }

  export type MedicalEventCreateOrConnectWithoutMemberInput = {
    where: MedicalEventWhereUniqueInput
    create: XOR<MedicalEventCreateWithoutMemberInput, MedicalEventUncheckedCreateWithoutMemberInput>
  }

  export type MedicalEventCreateManyMemberInputEnvelope = {
    data: MedicalEventCreateManyMemberInput | MedicalEventCreateManyMemberInput[]
    skipDuplicates?: boolean
  }

  export type EmployerGroupUpsertWithoutMembersInput = {
    update: XOR<EmployerGroupUpdateWithoutMembersInput, EmployerGroupUncheckedUpdateWithoutMembersInput>
    create: XOR<EmployerGroupCreateWithoutMembersInput, EmployerGroupUncheckedCreateWithoutMembersInput>
    where?: EmployerGroupWhereInput
  }

  export type EmployerGroupUpdateToOneWithWhereWithoutMembersInput = {
    where?: EmployerGroupWhereInput
    data: XOR<EmployerGroupUpdateWithoutMembersInput, EmployerGroupUncheckedUpdateWithoutMembersInput>
  }

  export type EmployerGroupUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    planDocUrl?: NullableStringFieldUpdateOperationsInput | string | null
    planRules?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutEmployersNestedInput
  }

  export type EmployerGroupUncheckedUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    planDocUrl?: NullableStringFieldUpdateOperationsInput | string | null
    planRules?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MedicalEventUpsertWithWhereUniqueWithoutMemberInput = {
    where: MedicalEventWhereUniqueInput
    update: XOR<MedicalEventUpdateWithoutMemberInput, MedicalEventUncheckedUpdateWithoutMemberInput>
    create: XOR<MedicalEventCreateWithoutMemberInput, MedicalEventUncheckedCreateWithoutMemberInput>
  }

  export type MedicalEventUpdateWithWhereUniqueWithoutMemberInput = {
    where: MedicalEventWhereUniqueInput
    data: XOR<MedicalEventUpdateWithoutMemberInput, MedicalEventUncheckedUpdateWithoutMemberInput>
  }

  export type MedicalEventUpdateManyWithWhereWithoutMemberInput = {
    where: MedicalEventScalarWhereInput
    data: XOR<MedicalEventUpdateManyMutationInput, MedicalEventUncheckedUpdateManyWithoutMemberInput>
  }

  export type MedicalEventScalarWhereInput = {
    AND?: MedicalEventScalarWhereInput | MedicalEventScalarWhereInput[]
    OR?: MedicalEventScalarWhereInput[]
    NOT?: MedicalEventScalarWhereInput | MedicalEventScalarWhereInput[]
    id?: StringFilter<"MedicalEvent"> | string
    tenantId?: StringFilter<"MedicalEvent"> | string
    memberId?: StringFilter<"MedicalEvent"> | string
    name?: StringFilter<"MedicalEvent"> | string
    status?: StringFilter<"MedicalEvent"> | string
    totalSaved?: DecimalFilter<"MedicalEvent"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"MedicalEvent"> | Date | string
  }

  export type MemberCreateWithoutMedicalEventsInput = {
    id?: string
    externalId?: string | null
    firstName: string
    lastName: string
    employerGroup: EmployerGroupCreateNestedOneWithoutMembersInput
  }

  export type MemberUncheckedCreateWithoutMedicalEventsInput = {
    id?: string
    employerGroupId: string
    externalId?: string | null
    firstName: string
    lastName: string
  }

  export type MemberCreateOrConnectWithoutMedicalEventsInput = {
    where: MemberWhereUniqueInput
    create: XOR<MemberCreateWithoutMedicalEventsInput, MemberUncheckedCreateWithoutMedicalEventsInput>
  }

  export type ClaimCreateWithoutMedicalEventInput = {
    id?: string
    tenantId: string
    providerName: string
    serviceDate: Date | string
    cptCode: string
    providerBilled: Decimal | DecimalJsLike | number | string
    insuranceAllowed: Decimal | DecimalJsLike | number | string
    planRuleAmount: Decimal | DecimalJsLike | number | string
    memberOwes: Decimal | DecimalJsLike | number | string
    status?: $Enums.ClaimStatus
    varianceNote?: string | null
    rawEobData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ClaimUncheckedCreateWithoutMedicalEventInput = {
    id?: string
    tenantId: string
    providerName: string
    serviceDate: Date | string
    cptCode: string
    providerBilled: Decimal | DecimalJsLike | number | string
    insuranceAllowed: Decimal | DecimalJsLike | number | string
    planRuleAmount: Decimal | DecimalJsLike | number | string
    memberOwes: Decimal | DecimalJsLike | number | string
    status?: $Enums.ClaimStatus
    varianceNote?: string | null
    rawEobData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ClaimCreateOrConnectWithoutMedicalEventInput = {
    where: ClaimWhereUniqueInput
    create: XOR<ClaimCreateWithoutMedicalEventInput, ClaimUncheckedCreateWithoutMedicalEventInput>
  }

  export type ClaimCreateManyMedicalEventInputEnvelope = {
    data: ClaimCreateManyMedicalEventInput | ClaimCreateManyMedicalEventInput[]
    skipDuplicates?: boolean
  }

  export type MemberUpsertWithoutMedicalEventsInput = {
    update: XOR<MemberUpdateWithoutMedicalEventsInput, MemberUncheckedUpdateWithoutMedicalEventsInput>
    create: XOR<MemberCreateWithoutMedicalEventsInput, MemberUncheckedCreateWithoutMedicalEventsInput>
    where?: MemberWhereInput
  }

  export type MemberUpdateToOneWithWhereWithoutMedicalEventsInput = {
    where?: MemberWhereInput
    data: XOR<MemberUpdateWithoutMedicalEventsInput, MemberUncheckedUpdateWithoutMedicalEventsInput>
  }

  export type MemberUpdateWithoutMedicalEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    employerGroup?: EmployerGroupUpdateOneRequiredWithoutMembersNestedInput
  }

  export type MemberUncheckedUpdateWithoutMedicalEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    employerGroupId?: StringFieldUpdateOperationsInput | string
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
  }

  export type ClaimUpsertWithWhereUniqueWithoutMedicalEventInput = {
    where: ClaimWhereUniqueInput
    update: XOR<ClaimUpdateWithoutMedicalEventInput, ClaimUncheckedUpdateWithoutMedicalEventInput>
    create: XOR<ClaimCreateWithoutMedicalEventInput, ClaimUncheckedCreateWithoutMedicalEventInput>
  }

  export type ClaimUpdateWithWhereUniqueWithoutMedicalEventInput = {
    where: ClaimWhereUniqueInput
    data: XOR<ClaimUpdateWithoutMedicalEventInput, ClaimUncheckedUpdateWithoutMedicalEventInput>
  }

  export type ClaimUpdateManyWithWhereWithoutMedicalEventInput = {
    where: ClaimScalarWhereInput
    data: XOR<ClaimUpdateManyMutationInput, ClaimUncheckedUpdateManyWithoutMedicalEventInput>
  }

  export type ClaimScalarWhereInput = {
    AND?: ClaimScalarWhereInput | ClaimScalarWhereInput[]
    OR?: ClaimScalarWhereInput[]
    NOT?: ClaimScalarWhereInput | ClaimScalarWhereInput[]
    id?: StringFilter<"Claim"> | string
    tenantId?: StringFilter<"Claim"> | string
    eventId?: StringFilter<"Claim"> | string
    providerName?: StringFilter<"Claim"> | string
    serviceDate?: DateTimeFilter<"Claim"> | Date | string
    cptCode?: StringFilter<"Claim"> | string
    providerBilled?: DecimalFilter<"Claim"> | Decimal | DecimalJsLike | number | string
    insuranceAllowed?: DecimalFilter<"Claim"> | Decimal | DecimalJsLike | number | string
    planRuleAmount?: DecimalFilter<"Claim"> | Decimal | DecimalJsLike | number | string
    memberOwes?: DecimalFilter<"Claim"> | Decimal | DecimalJsLike | number | string
    status?: EnumClaimStatusFilter<"Claim"> | $Enums.ClaimStatus
    varianceNote?: StringNullableFilter<"Claim"> | string | null
    rawEobData?: JsonNullableFilter<"Claim">
    createdAt?: DateTimeFilter<"Claim"> | Date | string
  }

  export type MedicalEventCreateWithoutClaimsInput = {
    id?: string
    tenantId: string
    name: string
    status?: string
    totalSaved?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    member: MemberCreateNestedOneWithoutMedicalEventsInput
  }

  export type MedicalEventUncheckedCreateWithoutClaimsInput = {
    id?: string
    tenantId: string
    memberId: string
    name: string
    status?: string
    totalSaved?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
  }

  export type MedicalEventCreateOrConnectWithoutClaimsInput = {
    where: MedicalEventWhereUniqueInput
    create: XOR<MedicalEventCreateWithoutClaimsInput, MedicalEventUncheckedCreateWithoutClaimsInput>
  }

  export type MedicalEventUpsertWithoutClaimsInput = {
    update: XOR<MedicalEventUpdateWithoutClaimsInput, MedicalEventUncheckedUpdateWithoutClaimsInput>
    create: XOR<MedicalEventCreateWithoutClaimsInput, MedicalEventUncheckedCreateWithoutClaimsInput>
    where?: MedicalEventWhereInput
  }

  export type MedicalEventUpdateToOneWithWhereWithoutClaimsInput = {
    where?: MedicalEventWhereInput
    data: XOR<MedicalEventUpdateWithoutClaimsInput, MedicalEventUncheckedUpdateWithoutClaimsInput>
  }

  export type MedicalEventUpdateWithoutClaimsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    totalSaved?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    member?: MemberUpdateOneRequiredWithoutMedicalEventsNestedInput
  }

  export type MedicalEventUncheckedUpdateWithoutClaimsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    totalSaved?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmployerGroupCreateManyTenantInput = {
    id?: string
    name: string
    planDocUrl?: string | null
    planRules?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type EmployerGroupUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    planDocUrl?: NullableStringFieldUpdateOperationsInput | string | null
    planRules?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: MemberUpdateManyWithoutEmployerGroupNestedInput
  }

  export type EmployerGroupUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    planDocUrl?: NullableStringFieldUpdateOperationsInput | string | null
    planRules?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: MemberUncheckedUpdateManyWithoutEmployerGroupNestedInput
  }

  export type EmployerGroupUncheckedUpdateManyWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    planDocUrl?: NullableStringFieldUpdateOperationsInput | string | null
    planRules?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberCreateManyEmployerGroupInput = {
    id?: string
    externalId?: string | null
    firstName: string
    lastName: string
  }

  export type MemberUpdateWithoutEmployerGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    medicalEvents?: MedicalEventUpdateManyWithoutMemberNestedInput
  }

  export type MemberUncheckedUpdateWithoutEmployerGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    medicalEvents?: MedicalEventUncheckedUpdateManyWithoutMemberNestedInput
  }

  export type MemberUncheckedUpdateManyWithoutEmployerGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalId?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
  }

  export type MedicalEventCreateManyMemberInput = {
    id?: string
    tenantId: string
    name: string
    status?: string
    totalSaved?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
  }

  export type MedicalEventUpdateWithoutMemberInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    totalSaved?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    claims?: ClaimUpdateManyWithoutMedicalEventNestedInput
  }

  export type MedicalEventUncheckedUpdateWithoutMemberInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    totalSaved?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    claims?: ClaimUncheckedUpdateManyWithoutMedicalEventNestedInput
  }

  export type MedicalEventUncheckedUpdateManyWithoutMemberInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    totalSaved?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClaimCreateManyMedicalEventInput = {
    id?: string
    tenantId: string
    providerName: string
    serviceDate: Date | string
    cptCode: string
    providerBilled: Decimal | DecimalJsLike | number | string
    insuranceAllowed: Decimal | DecimalJsLike | number | string
    planRuleAmount: Decimal | DecimalJsLike | number | string
    memberOwes: Decimal | DecimalJsLike | number | string
    status?: $Enums.ClaimStatus
    varianceNote?: string | null
    rawEobData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ClaimUpdateWithoutMedicalEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    providerName?: StringFieldUpdateOperationsInput | string
    serviceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    cptCode?: StringFieldUpdateOperationsInput | string
    providerBilled?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    insuranceAllowed?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    planRuleAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    memberOwes?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumClaimStatusFieldUpdateOperationsInput | $Enums.ClaimStatus
    varianceNote?: NullableStringFieldUpdateOperationsInput | string | null
    rawEobData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClaimUncheckedUpdateWithoutMedicalEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    providerName?: StringFieldUpdateOperationsInput | string
    serviceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    cptCode?: StringFieldUpdateOperationsInput | string
    providerBilled?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    insuranceAllowed?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    planRuleAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    memberOwes?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumClaimStatusFieldUpdateOperationsInput | $Enums.ClaimStatus
    varianceNote?: NullableStringFieldUpdateOperationsInput | string | null
    rawEobData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClaimUncheckedUpdateManyWithoutMedicalEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    providerName?: StringFieldUpdateOperationsInput | string
    serviceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    cptCode?: StringFieldUpdateOperationsInput | string
    providerBilled?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    insuranceAllowed?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    planRuleAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    memberOwes?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumClaimStatusFieldUpdateOperationsInput | $Enums.ClaimStatus
    varianceNote?: NullableStringFieldUpdateOperationsInput | string | null
    rawEobData?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use TenantCountOutputTypeDefaultArgs instead
     */
    export type TenantCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TenantCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use EmployerGroupCountOutputTypeDefaultArgs instead
     */
    export type EmployerGroupCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EmployerGroupCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MemberCountOutputTypeDefaultArgs instead
     */
    export type MemberCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MemberCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MedicalEventCountOutputTypeDefaultArgs instead
     */
    export type MedicalEventCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MedicalEventCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TenantDefaultArgs instead
     */
    export type TenantArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TenantDefaultArgs<ExtArgs>
    /**
     * @deprecated Use EmployerGroupDefaultArgs instead
     */
    export type EmployerGroupArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EmployerGroupDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MemberDefaultArgs instead
     */
    export type MemberArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MemberDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MedicalEventDefaultArgs instead
     */
    export type MedicalEventArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MedicalEventDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ClaimDefaultArgs instead
     */
    export type ClaimArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ClaimDefaultArgs<ExtArgs>

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