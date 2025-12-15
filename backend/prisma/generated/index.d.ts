
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
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Role
 * 
 */
export type Role = $Result.DefaultSelection<Prisma.$RolePayload>
/**
 * Model Policy
 * 
 */
export type Policy = $Result.DefaultSelection<Prisma.$PolicyPayload>
/**
 * Model RolePolicy
 * 
 */
export type RolePolicy = $Result.DefaultSelection<Prisma.$RolePolicyPayload>
/**
 * Model UserRole
 * 
 */
export type UserRole = $Result.DefaultSelection<Prisma.$UserRolePayload>
/**
 * Model Group
 * 
 */
export type Group = $Result.DefaultSelection<Prisma.$GroupPayload>
/**
 * Model GroupUser
 * 
 */
export type GroupUser = $Result.DefaultSelection<Prisma.$GroupUserPayload>
/**
 * Model Form
 * 
 */
export type Form = $Result.DefaultSelection<Prisma.$FormPayload>
/**
 * Model FormAccess
 * 
 */
export type FormAccess = $Result.DefaultSelection<Prisma.$FormAccessPayload>
/**
 * Model FormField
 * 
 */
export type FormField = $Result.DefaultSelection<Prisma.$FormFieldPayload>
/**
 * Model FormFieldOption
 * 
 */
export type FormFieldOption = $Result.DefaultSelection<Prisma.$FormFieldOptionPayload>
/**
 * Model FormFieldTableSource
 * 
 */
export type FormFieldTableSource = $Result.DefaultSelection<Prisma.$FormFieldTableSourcePayload>
/**
 * Model FormResponse
 * 
 */
export type FormResponse = $Result.DefaultSelection<Prisma.$FormResponsePayload>
/**
 * Model FormResponseValue
 * 
 */
export type FormResponseValue = $Result.DefaultSelection<Prisma.$FormResponseValuePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const AccessType: {
  role: 'role',
  group: 'group',
  link: 'link'
};

export type AccessType = (typeof AccessType)[keyof typeof AccessType]


export const FieldType: {
  text: 'text',
  textarea: 'textarea',
  number: 'number',
  select: 'select',
  checkbox: 'checkbox',
  radio: 'radio',
  table_select: 'table_select',
  score: 'score'
};

export type FieldType = (typeof FieldType)[keyof typeof FieldType]


export const FieldMode: {
  question: 'question',
  check: 'check'
};

export type FieldMode = (typeof FieldMode)[keyof typeof FieldMode]


export const ResponseStatus: {
  draft: 'draft',
  submitted: 'submitted',
  reviewed: 'reviewed'
};

export type ResponseStatus = (typeof ResponseStatus)[keyof typeof ResponseStatus]

}

export type AccessType = $Enums.AccessType

export const AccessType: typeof $Enums.AccessType

export type FieldType = $Enums.FieldType

export const FieldType: typeof $Enums.FieldType

export type FieldMode = $Enums.FieldMode

export const FieldMode: typeof $Enums.FieldMode

export type ResponseStatus = $Enums.ResponseStatus

export const ResponseStatus: typeof $Enums.ResponseStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
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
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.role`: Exposes CRUD operations for the **Role** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Roles
    * const roles = await prisma.role.findMany()
    * ```
    */
  get role(): Prisma.RoleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.policy`: Exposes CRUD operations for the **Policy** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Policies
    * const policies = await prisma.policy.findMany()
    * ```
    */
  get policy(): Prisma.PolicyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.rolePolicy`: Exposes CRUD operations for the **RolePolicy** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RolePolicies
    * const rolePolicies = await prisma.rolePolicy.findMany()
    * ```
    */
  get rolePolicy(): Prisma.RolePolicyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userRole`: Exposes CRUD operations for the **UserRole** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserRoles
    * const userRoles = await prisma.userRole.findMany()
    * ```
    */
  get userRole(): Prisma.UserRoleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.group`: Exposes CRUD operations for the **Group** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Groups
    * const groups = await prisma.group.findMany()
    * ```
    */
  get group(): Prisma.GroupDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.groupUser`: Exposes CRUD operations for the **GroupUser** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GroupUsers
    * const groupUsers = await prisma.groupUser.findMany()
    * ```
    */
  get groupUser(): Prisma.GroupUserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.form`: Exposes CRUD operations for the **Form** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Forms
    * const forms = await prisma.form.findMany()
    * ```
    */
  get form(): Prisma.FormDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.formAccess`: Exposes CRUD operations for the **FormAccess** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FormAccesses
    * const formAccesses = await prisma.formAccess.findMany()
    * ```
    */
  get formAccess(): Prisma.FormAccessDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.formField`: Exposes CRUD operations for the **FormField** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FormFields
    * const formFields = await prisma.formField.findMany()
    * ```
    */
  get formField(): Prisma.FormFieldDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.formFieldOption`: Exposes CRUD operations for the **FormFieldOption** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FormFieldOptions
    * const formFieldOptions = await prisma.formFieldOption.findMany()
    * ```
    */
  get formFieldOption(): Prisma.FormFieldOptionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.formFieldTableSource`: Exposes CRUD operations for the **FormFieldTableSource** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FormFieldTableSources
    * const formFieldTableSources = await prisma.formFieldTableSource.findMany()
    * ```
    */
  get formFieldTableSource(): Prisma.FormFieldTableSourceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.formResponse`: Exposes CRUD operations for the **FormResponse** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FormResponses
    * const formResponses = await prisma.formResponse.findMany()
    * ```
    */
  get formResponse(): Prisma.FormResponseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.formResponseValue`: Exposes CRUD operations for the **FormResponseValue** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FormResponseValues
    * const formResponseValues = await prisma.formResponseValue.findMany()
    * ```
    */
  get formResponseValue(): Prisma.FormResponseValueDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 7.1.0
   * Query Engine version: ab635e6b9d606fa5c8fb8b1a7f909c3c3c1c98ba
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
    User: 'User',
    Role: 'Role',
    Policy: 'Policy',
    RolePolicy: 'RolePolicy',
    UserRole: 'UserRole',
    Group: 'Group',
    GroupUser: 'GroupUser',
    Form: 'Form',
    FormAccess: 'FormAccess',
    FormField: 'FormField',
    FormFieldOption: 'FormFieldOption',
    FormFieldTableSource: 'FormFieldTableSource',
    FormResponse: 'FormResponse',
    FormResponseValue: 'FormResponseValue'
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
      modelProps: "user" | "role" | "policy" | "rolePolicy" | "userRole" | "group" | "groupUser" | "form" | "formAccess" | "formField" | "formFieldOption" | "formFieldTableSource" | "formResponse" | "formResponseValue"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
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
      Role: {
        payload: Prisma.$RolePayload<ExtArgs>
        fields: Prisma.RoleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          findFirst: {
            args: Prisma.RoleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          findMany: {
            args: Prisma.RoleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>[]
          }
          create: {
            args: Prisma.RoleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          createMany: {
            args: Prisma.RoleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.RoleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          update: {
            args: Prisma.RoleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          deleteMany: {
            args: Prisma.RoleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RoleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          aggregate: {
            args: Prisma.RoleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRole>
          }
          groupBy: {
            args: Prisma.RoleGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoleGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoleCountArgs<ExtArgs>
            result: $Utils.Optional<RoleCountAggregateOutputType> | number
          }
        }
      }
      Policy: {
        payload: Prisma.$PolicyPayload<ExtArgs>
        fields: Prisma.PolicyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PolicyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PolicyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyPayload>
          }
          findFirst: {
            args: Prisma.PolicyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PolicyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyPayload>
          }
          findMany: {
            args: Prisma.PolicyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyPayload>[]
          }
          create: {
            args: Prisma.PolicyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyPayload>
          }
          createMany: {
            args: Prisma.PolicyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PolicyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyPayload>
          }
          update: {
            args: Prisma.PolicyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyPayload>
          }
          deleteMany: {
            args: Prisma.PolicyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PolicyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PolicyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PolicyPayload>
          }
          aggregate: {
            args: Prisma.PolicyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePolicy>
          }
          groupBy: {
            args: Prisma.PolicyGroupByArgs<ExtArgs>
            result: $Utils.Optional<PolicyGroupByOutputType>[]
          }
          count: {
            args: Prisma.PolicyCountArgs<ExtArgs>
            result: $Utils.Optional<PolicyCountAggregateOutputType> | number
          }
        }
      }
      RolePolicy: {
        payload: Prisma.$RolePolicyPayload<ExtArgs>
        fields: Prisma.RolePolicyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RolePolicyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePolicyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RolePolicyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePolicyPayload>
          }
          findFirst: {
            args: Prisma.RolePolicyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePolicyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RolePolicyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePolicyPayload>
          }
          findMany: {
            args: Prisma.RolePolicyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePolicyPayload>[]
          }
          create: {
            args: Prisma.RolePolicyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePolicyPayload>
          }
          createMany: {
            args: Prisma.RolePolicyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.RolePolicyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePolicyPayload>
          }
          update: {
            args: Prisma.RolePolicyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePolicyPayload>
          }
          deleteMany: {
            args: Prisma.RolePolicyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RolePolicyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RolePolicyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePolicyPayload>
          }
          aggregate: {
            args: Prisma.RolePolicyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRolePolicy>
          }
          groupBy: {
            args: Prisma.RolePolicyGroupByArgs<ExtArgs>
            result: $Utils.Optional<RolePolicyGroupByOutputType>[]
          }
          count: {
            args: Prisma.RolePolicyCountArgs<ExtArgs>
            result: $Utils.Optional<RolePolicyCountAggregateOutputType> | number
          }
        }
      }
      UserRole: {
        payload: Prisma.$UserRolePayload<ExtArgs>
        fields: Prisma.UserRoleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserRoleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserRoleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload>
          }
          findFirst: {
            args: Prisma.UserRoleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserRoleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload>
          }
          findMany: {
            args: Prisma.UserRoleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload>[]
          }
          create: {
            args: Prisma.UserRoleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload>
          }
          createMany: {
            args: Prisma.UserRoleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserRoleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload>
          }
          update: {
            args: Prisma.UserRoleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload>
          }
          deleteMany: {
            args: Prisma.UserRoleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserRoleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserRoleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserRolePayload>
          }
          aggregate: {
            args: Prisma.UserRoleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserRole>
          }
          groupBy: {
            args: Prisma.UserRoleGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserRoleGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserRoleCountArgs<ExtArgs>
            result: $Utils.Optional<UserRoleCountAggregateOutputType> | number
          }
        }
      }
      Group: {
        payload: Prisma.$GroupPayload<ExtArgs>
        fields: Prisma.GroupFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GroupFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GroupFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          findFirst: {
            args: Prisma.GroupFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GroupFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          findMany: {
            args: Prisma.GroupFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>[]
          }
          create: {
            args: Prisma.GroupCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          createMany: {
            args: Prisma.GroupCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.GroupDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          update: {
            args: Prisma.GroupUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          deleteMany: {
            args: Prisma.GroupDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GroupUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.GroupUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          aggregate: {
            args: Prisma.GroupAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGroup>
          }
          groupBy: {
            args: Prisma.GroupGroupByArgs<ExtArgs>
            result: $Utils.Optional<GroupGroupByOutputType>[]
          }
          count: {
            args: Prisma.GroupCountArgs<ExtArgs>
            result: $Utils.Optional<GroupCountAggregateOutputType> | number
          }
        }
      }
      GroupUser: {
        payload: Prisma.$GroupUserPayload<ExtArgs>
        fields: Prisma.GroupUserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GroupUserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupUserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GroupUserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupUserPayload>
          }
          findFirst: {
            args: Prisma.GroupUserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupUserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GroupUserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupUserPayload>
          }
          findMany: {
            args: Prisma.GroupUserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupUserPayload>[]
          }
          create: {
            args: Prisma.GroupUserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupUserPayload>
          }
          createMany: {
            args: Prisma.GroupUserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.GroupUserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupUserPayload>
          }
          update: {
            args: Prisma.GroupUserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupUserPayload>
          }
          deleteMany: {
            args: Prisma.GroupUserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GroupUserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.GroupUserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupUserPayload>
          }
          aggregate: {
            args: Prisma.GroupUserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGroupUser>
          }
          groupBy: {
            args: Prisma.GroupUserGroupByArgs<ExtArgs>
            result: $Utils.Optional<GroupUserGroupByOutputType>[]
          }
          count: {
            args: Prisma.GroupUserCountArgs<ExtArgs>
            result: $Utils.Optional<GroupUserCountAggregateOutputType> | number
          }
        }
      }
      Form: {
        payload: Prisma.$FormPayload<ExtArgs>
        fields: Prisma.FormFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FormFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FormFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormPayload>
          }
          findFirst: {
            args: Prisma.FormFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FormFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormPayload>
          }
          findMany: {
            args: Prisma.FormFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormPayload>[]
          }
          create: {
            args: Prisma.FormCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormPayload>
          }
          createMany: {
            args: Prisma.FormCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.FormDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormPayload>
          }
          update: {
            args: Prisma.FormUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormPayload>
          }
          deleteMany: {
            args: Prisma.FormDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FormUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FormUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormPayload>
          }
          aggregate: {
            args: Prisma.FormAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateForm>
          }
          groupBy: {
            args: Prisma.FormGroupByArgs<ExtArgs>
            result: $Utils.Optional<FormGroupByOutputType>[]
          }
          count: {
            args: Prisma.FormCountArgs<ExtArgs>
            result: $Utils.Optional<FormCountAggregateOutputType> | number
          }
        }
      }
      FormAccess: {
        payload: Prisma.$FormAccessPayload<ExtArgs>
        fields: Prisma.FormAccessFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FormAccessFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormAccessPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FormAccessFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormAccessPayload>
          }
          findFirst: {
            args: Prisma.FormAccessFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormAccessPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FormAccessFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormAccessPayload>
          }
          findMany: {
            args: Prisma.FormAccessFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormAccessPayload>[]
          }
          create: {
            args: Prisma.FormAccessCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormAccessPayload>
          }
          createMany: {
            args: Prisma.FormAccessCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.FormAccessDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormAccessPayload>
          }
          update: {
            args: Prisma.FormAccessUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormAccessPayload>
          }
          deleteMany: {
            args: Prisma.FormAccessDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FormAccessUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FormAccessUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormAccessPayload>
          }
          aggregate: {
            args: Prisma.FormAccessAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFormAccess>
          }
          groupBy: {
            args: Prisma.FormAccessGroupByArgs<ExtArgs>
            result: $Utils.Optional<FormAccessGroupByOutputType>[]
          }
          count: {
            args: Prisma.FormAccessCountArgs<ExtArgs>
            result: $Utils.Optional<FormAccessCountAggregateOutputType> | number
          }
        }
      }
      FormField: {
        payload: Prisma.$FormFieldPayload<ExtArgs>
        fields: Prisma.FormFieldFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FormFieldFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormFieldPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FormFieldFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormFieldPayload>
          }
          findFirst: {
            args: Prisma.FormFieldFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormFieldPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FormFieldFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormFieldPayload>
          }
          findMany: {
            args: Prisma.FormFieldFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormFieldPayload>[]
          }
          create: {
            args: Prisma.FormFieldCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormFieldPayload>
          }
          createMany: {
            args: Prisma.FormFieldCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.FormFieldDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormFieldPayload>
          }
          update: {
            args: Prisma.FormFieldUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormFieldPayload>
          }
          deleteMany: {
            args: Prisma.FormFieldDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FormFieldUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FormFieldUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormFieldPayload>
          }
          aggregate: {
            args: Prisma.FormFieldAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFormField>
          }
          groupBy: {
            args: Prisma.FormFieldGroupByArgs<ExtArgs>
            result: $Utils.Optional<FormFieldGroupByOutputType>[]
          }
          count: {
            args: Prisma.FormFieldCountArgs<ExtArgs>
            result: $Utils.Optional<FormFieldCountAggregateOutputType> | number
          }
        }
      }
      FormFieldOption: {
        payload: Prisma.$FormFieldOptionPayload<ExtArgs>
        fields: Prisma.FormFieldOptionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FormFieldOptionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormFieldOptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FormFieldOptionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormFieldOptionPayload>
          }
          findFirst: {
            args: Prisma.FormFieldOptionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormFieldOptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FormFieldOptionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormFieldOptionPayload>
          }
          findMany: {
            args: Prisma.FormFieldOptionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormFieldOptionPayload>[]
          }
          create: {
            args: Prisma.FormFieldOptionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormFieldOptionPayload>
          }
          createMany: {
            args: Prisma.FormFieldOptionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.FormFieldOptionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormFieldOptionPayload>
          }
          update: {
            args: Prisma.FormFieldOptionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormFieldOptionPayload>
          }
          deleteMany: {
            args: Prisma.FormFieldOptionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FormFieldOptionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FormFieldOptionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormFieldOptionPayload>
          }
          aggregate: {
            args: Prisma.FormFieldOptionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFormFieldOption>
          }
          groupBy: {
            args: Prisma.FormFieldOptionGroupByArgs<ExtArgs>
            result: $Utils.Optional<FormFieldOptionGroupByOutputType>[]
          }
          count: {
            args: Prisma.FormFieldOptionCountArgs<ExtArgs>
            result: $Utils.Optional<FormFieldOptionCountAggregateOutputType> | number
          }
        }
      }
      FormFieldTableSource: {
        payload: Prisma.$FormFieldTableSourcePayload<ExtArgs>
        fields: Prisma.FormFieldTableSourceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FormFieldTableSourceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormFieldTableSourcePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FormFieldTableSourceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormFieldTableSourcePayload>
          }
          findFirst: {
            args: Prisma.FormFieldTableSourceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormFieldTableSourcePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FormFieldTableSourceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormFieldTableSourcePayload>
          }
          findMany: {
            args: Prisma.FormFieldTableSourceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormFieldTableSourcePayload>[]
          }
          create: {
            args: Prisma.FormFieldTableSourceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormFieldTableSourcePayload>
          }
          createMany: {
            args: Prisma.FormFieldTableSourceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.FormFieldTableSourceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormFieldTableSourcePayload>
          }
          update: {
            args: Prisma.FormFieldTableSourceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormFieldTableSourcePayload>
          }
          deleteMany: {
            args: Prisma.FormFieldTableSourceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FormFieldTableSourceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FormFieldTableSourceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormFieldTableSourcePayload>
          }
          aggregate: {
            args: Prisma.FormFieldTableSourceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFormFieldTableSource>
          }
          groupBy: {
            args: Prisma.FormFieldTableSourceGroupByArgs<ExtArgs>
            result: $Utils.Optional<FormFieldTableSourceGroupByOutputType>[]
          }
          count: {
            args: Prisma.FormFieldTableSourceCountArgs<ExtArgs>
            result: $Utils.Optional<FormFieldTableSourceCountAggregateOutputType> | number
          }
        }
      }
      FormResponse: {
        payload: Prisma.$FormResponsePayload<ExtArgs>
        fields: Prisma.FormResponseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FormResponseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormResponsePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FormResponseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormResponsePayload>
          }
          findFirst: {
            args: Prisma.FormResponseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormResponsePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FormResponseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormResponsePayload>
          }
          findMany: {
            args: Prisma.FormResponseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormResponsePayload>[]
          }
          create: {
            args: Prisma.FormResponseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormResponsePayload>
          }
          createMany: {
            args: Prisma.FormResponseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.FormResponseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormResponsePayload>
          }
          update: {
            args: Prisma.FormResponseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormResponsePayload>
          }
          deleteMany: {
            args: Prisma.FormResponseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FormResponseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FormResponseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormResponsePayload>
          }
          aggregate: {
            args: Prisma.FormResponseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFormResponse>
          }
          groupBy: {
            args: Prisma.FormResponseGroupByArgs<ExtArgs>
            result: $Utils.Optional<FormResponseGroupByOutputType>[]
          }
          count: {
            args: Prisma.FormResponseCountArgs<ExtArgs>
            result: $Utils.Optional<FormResponseCountAggregateOutputType> | number
          }
        }
      }
      FormResponseValue: {
        payload: Prisma.$FormResponseValuePayload<ExtArgs>
        fields: Prisma.FormResponseValueFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FormResponseValueFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormResponseValuePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FormResponseValueFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormResponseValuePayload>
          }
          findFirst: {
            args: Prisma.FormResponseValueFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormResponseValuePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FormResponseValueFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormResponseValuePayload>
          }
          findMany: {
            args: Prisma.FormResponseValueFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormResponseValuePayload>[]
          }
          create: {
            args: Prisma.FormResponseValueCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormResponseValuePayload>
          }
          createMany: {
            args: Prisma.FormResponseValueCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.FormResponseValueDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormResponseValuePayload>
          }
          update: {
            args: Prisma.FormResponseValueUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormResponseValuePayload>
          }
          deleteMany: {
            args: Prisma.FormResponseValueDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FormResponseValueUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FormResponseValueUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FormResponseValuePayload>
          }
          aggregate: {
            args: Prisma.FormResponseValueAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFormResponseValue>
          }
          groupBy: {
            args: Prisma.FormResponseValueGroupByArgs<ExtArgs>
            result: $Utils.Optional<FormResponseValueGroupByOutputType>[]
          }
          count: {
            args: Prisma.FormResponseValueCountArgs<ExtArgs>
            result: $Utils.Optional<FormResponseValueCountAggregateOutputType> | number
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
     * Read more in our [docs](https://pris.ly/d/logging).
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
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    role?: RoleOmit
    policy?: PolicyOmit
    rolePolicy?: RolePolicyOmit
    userRole?: UserRoleOmit
    group?: GroupOmit
    groupUser?: GroupUserOmit
    form?: FormOmit
    formAccess?: FormAccessOmit
    formField?: FormFieldOmit
    formFieldOption?: FormFieldOptionOmit
    formFieldTableSource?: FormFieldTableSourceOmit
    formResponse?: FormResponseOmit
    formResponseValue?: FormResponseValueOmit
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
    roles: number
    groups: number
    forms: number
    responses: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roles?: boolean | UserCountOutputTypeCountRolesArgs
    groups?: boolean | UserCountOutputTypeCountGroupsArgs
    forms?: boolean | UserCountOutputTypeCountFormsArgs
    responses?: boolean | UserCountOutputTypeCountResponsesArgs
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
  export type UserCountOutputTypeCountRolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserRoleWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountGroupsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupUserWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFormsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FormWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountResponsesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FormResponseWhereInput
  }


  /**
   * Count Type RoleCountOutputType
   */

  export type RoleCountOutputType = {
    policies: number
    users: number
    defaultForUsers: number
  }

  export type RoleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    policies?: boolean | RoleCountOutputTypeCountPoliciesArgs
    users?: boolean | RoleCountOutputTypeCountUsersArgs
    defaultForUsers?: boolean | RoleCountOutputTypeCountDefaultForUsersArgs
  }

  // Custom InputTypes
  /**
   * RoleCountOutputType without action
   */
  export type RoleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleCountOutputType
     */
    select?: RoleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RoleCountOutputType without action
   */
  export type RoleCountOutputTypeCountPoliciesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RolePolicyWhereInput
  }

  /**
   * RoleCountOutputType without action
   */
  export type RoleCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserRoleWhereInput
  }

  /**
   * RoleCountOutputType without action
   */
  export type RoleCountOutputTypeCountDefaultForUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }


  /**
   * Count Type PolicyCountOutputType
   */

  export type PolicyCountOutputType = {
    roles: number
  }

  export type PolicyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roles?: boolean | PolicyCountOutputTypeCountRolesArgs
  }

  // Custom InputTypes
  /**
   * PolicyCountOutputType without action
   */
  export type PolicyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PolicyCountOutputType
     */
    select?: PolicyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PolicyCountOutputType without action
   */
  export type PolicyCountOutputTypeCountRolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RolePolicyWhereInput
  }


  /**
   * Count Type GroupCountOutputType
   */

  export type GroupCountOutputType = {
    users: number
  }

  export type GroupCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | GroupCountOutputTypeCountUsersArgs
  }

  // Custom InputTypes
  /**
   * GroupCountOutputType without action
   */
  export type GroupCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupCountOutputType
     */
    select?: GroupCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GroupCountOutputType without action
   */
  export type GroupCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupUserWhereInput
  }


  /**
   * Count Type FormCountOutputType
   */

  export type FormCountOutputType = {
    access: number
    fields: number
    responses: number
  }

  export type FormCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    access?: boolean | FormCountOutputTypeCountAccessArgs
    fields?: boolean | FormCountOutputTypeCountFieldsArgs
    responses?: boolean | FormCountOutputTypeCountResponsesArgs
  }

  // Custom InputTypes
  /**
   * FormCountOutputType without action
   */
  export type FormCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormCountOutputType
     */
    select?: FormCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FormCountOutputType without action
   */
  export type FormCountOutputTypeCountAccessArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FormAccessWhereInput
  }

  /**
   * FormCountOutputType without action
   */
  export type FormCountOutputTypeCountFieldsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FormFieldWhereInput
  }

  /**
   * FormCountOutputType without action
   */
  export type FormCountOutputTypeCountResponsesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FormResponseWhereInput
  }


  /**
   * Count Type FormFieldCountOutputType
   */

  export type FormFieldCountOutputType = {
    options: number
    values: number
  }

  export type FormFieldCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    options?: boolean | FormFieldCountOutputTypeCountOptionsArgs
    values?: boolean | FormFieldCountOutputTypeCountValuesArgs
  }

  // Custom InputTypes
  /**
   * FormFieldCountOutputType without action
   */
  export type FormFieldCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormFieldCountOutputType
     */
    select?: FormFieldCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FormFieldCountOutputType without action
   */
  export type FormFieldCountOutputTypeCountOptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FormFieldOptionWhereInput
  }

  /**
   * FormFieldCountOutputType without action
   */
  export type FormFieldCountOutputTypeCountValuesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FormResponseValueWhereInput
  }


  /**
   * Count Type FormResponseCountOutputType
   */

  export type FormResponseCountOutputType = {
    values: number
  }

  export type FormResponseCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    values?: boolean | FormResponseCountOutputTypeCountValuesArgs
  }

  // Custom InputTypes
  /**
   * FormResponseCountOutputType without action
   */
  export type FormResponseCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormResponseCountOutputType
     */
    select?: FormResponseCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FormResponseCountOutputType without action
   */
  export type FormResponseCountOutputTypeCountValuesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FormResponseValueWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
    default_role_id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
    default_role_id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    username: string | null
    first_name: string | null
    last_name: string | null
    phone: string | null
    password: string | null
    google_id: string | null
    default_role_id: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    username: string | null
    first_name: string | null
    last_name: string | null
    phone: string | null
    password: string | null
    google_id: string | null
    default_role_id: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    username: number
    first_name: number
    last_name: number
    phone: number
    password: number
    google_id: number
    default_role_id: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
    default_role_id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
    default_role_id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    username?: true
    first_name?: true
    last_name?: true
    phone?: true
    password?: true
    google_id?: true
    default_role_id?: true
    created_at?: true
    updated_at?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    username?: true
    first_name?: true
    last_name?: true
    phone?: true
    password?: true
    google_id?: true
    default_role_id?: true
    created_at?: true
    updated_at?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    username?: true
    first_name?: true
    last_name?: true
    phone?: true
    password?: true
    google_id?: true
    default_role_id?: true
    created_at?: true
    updated_at?: true
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
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
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
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    email: string | null
    username: string | null
    first_name: string | null
    last_name: string | null
    phone: string | null
    password: string | null
    google_id: string | null
    default_role_id: number | null
    created_at: Date
    updated_at: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
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
    email?: boolean
    username?: boolean
    first_name?: boolean
    last_name?: boolean
    phone?: boolean
    password?: boolean
    google_id?: boolean
    default_role_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    default_role?: boolean | User$default_roleArgs<ExtArgs>
    roles?: boolean | User$rolesArgs<ExtArgs>
    groups?: boolean | User$groupsArgs<ExtArgs>
    forms?: boolean | User$formsArgs<ExtArgs>
    responses?: boolean | User$responsesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    username?: boolean
    first_name?: boolean
    last_name?: boolean
    phone?: boolean
    password?: boolean
    google_id?: boolean
    default_role_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "username" | "first_name" | "last_name" | "phone" | "password" | "google_id" | "default_role_id" | "created_at" | "updated_at", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    default_role?: boolean | User$default_roleArgs<ExtArgs>
    roles?: boolean | User$rolesArgs<ExtArgs>
    groups?: boolean | User$groupsArgs<ExtArgs>
    forms?: boolean | User$formsArgs<ExtArgs>
    responses?: boolean | User$responsesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      default_role: Prisma.$RolePayload<ExtArgs> | null
      roles: Prisma.$UserRolePayload<ExtArgs>[]
      groups: Prisma.$GroupUserPayload<ExtArgs>[]
      forms: Prisma.$FormPayload<ExtArgs>[]
      responses: Prisma.$FormResponsePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string | null
      username: string | null
      first_name: string | null
      last_name: string | null
      phone: string | null
      password: string | null
      google_id: string | null
      default_role_id: number | null
      created_at: Date
      updated_at: Date
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
    default_role<T extends User$default_roleArgs<ExtArgs> = {}>(args?: Subset<T, User$default_roleArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    roles<T extends User$rolesArgs<ExtArgs> = {}>(args?: Subset<T, User$rolesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    groups<T extends User$groupsArgs<ExtArgs> = {}>(args?: Subset<T, User$groupsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupUserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    forms<T extends User$formsArgs<ExtArgs> = {}>(args?: Subset<T, User$formsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FormPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    responses<T extends User$responsesArgs<ExtArgs> = {}>(args?: Subset<T, User$responsesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FormResponsePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly first_name: FieldRef<"User", 'String'>
    readonly last_name: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly google_id: FieldRef<"User", 'String'>
    readonly default_role_id: FieldRef<"User", 'Int'>
    readonly created_at: FieldRef<"User", 'DateTime'>
    readonly updated_at: FieldRef<"User", 'DateTime'>
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
   * User.default_role
   */
  export type User$default_roleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    where?: RoleWhereInput
  }

  /**
   * User.roles
   */
  export type User$rolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    where?: UserRoleWhereInput
    orderBy?: UserRoleOrderByWithRelationInput | UserRoleOrderByWithRelationInput[]
    cursor?: UserRoleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserRoleScalarFieldEnum | UserRoleScalarFieldEnum[]
  }

  /**
   * User.groups
   */
  export type User$groupsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupUser
     */
    select?: GroupUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupUser
     */
    omit?: GroupUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupUserInclude<ExtArgs> | null
    where?: GroupUserWhereInput
    orderBy?: GroupUserOrderByWithRelationInput | GroupUserOrderByWithRelationInput[]
    cursor?: GroupUserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GroupUserScalarFieldEnum | GroupUserScalarFieldEnum[]
  }

  /**
   * User.forms
   */
  export type User$formsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Form
     */
    select?: FormSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Form
     */
    omit?: FormOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormInclude<ExtArgs> | null
    where?: FormWhereInput
    orderBy?: FormOrderByWithRelationInput | FormOrderByWithRelationInput[]
    cursor?: FormWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FormScalarFieldEnum | FormScalarFieldEnum[]
  }

  /**
   * User.responses
   */
  export type User$responsesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormResponse
     */
    select?: FormResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormResponse
     */
    omit?: FormResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormResponseInclude<ExtArgs> | null
    where?: FormResponseWhereInput
    orderBy?: FormResponseOrderByWithRelationInput | FormResponseOrderByWithRelationInput[]
    cursor?: FormResponseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FormResponseScalarFieldEnum | FormResponseScalarFieldEnum[]
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
   * Model Role
   */

  export type AggregateRole = {
    _count: RoleCountAggregateOutputType | null
    _avg: RoleAvgAggregateOutputType | null
    _sum: RoleSumAggregateOutputType | null
    _min: RoleMinAggregateOutputType | null
    _max: RoleMaxAggregateOutputType | null
  }

  export type RoleAvgAggregateOutputType = {
    id: number | null
  }

  export type RoleSumAggregateOutputType = {
    id: number | null
  }

  export type RoleMinAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type RoleMaxAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type RoleCountAggregateOutputType = {
    id: number
    name: number
    description: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type RoleAvgAggregateInputType = {
    id?: true
  }

  export type RoleSumAggregateInputType = {
    id?: true
  }

  export type RoleMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    created_at?: true
    updated_at?: true
  }

  export type RoleMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    created_at?: true
    updated_at?: true
  }

  export type RoleCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type RoleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Role to aggregate.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Roles
    **/
    _count?: true | RoleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RoleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RoleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoleMaxAggregateInputType
  }

  export type GetRoleAggregateType<T extends RoleAggregateArgs> = {
        [P in keyof T & keyof AggregateRole]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRole[P]>
      : GetScalarType<T[P], AggregateRole[P]>
  }




  export type RoleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoleWhereInput
    orderBy?: RoleOrderByWithAggregationInput | RoleOrderByWithAggregationInput[]
    by: RoleScalarFieldEnum[] | RoleScalarFieldEnum
    having?: RoleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoleCountAggregateInputType | true
    _avg?: RoleAvgAggregateInputType
    _sum?: RoleSumAggregateInputType
    _min?: RoleMinAggregateInputType
    _max?: RoleMaxAggregateInputType
  }

  export type RoleGroupByOutputType = {
    id: number
    name: string
    description: string | null
    created_at: Date
    updated_at: Date
    _count: RoleCountAggregateOutputType | null
    _avg: RoleAvgAggregateOutputType | null
    _sum: RoleSumAggregateOutputType | null
    _min: RoleMinAggregateOutputType | null
    _max: RoleMaxAggregateOutputType | null
  }

  type GetRoleGroupByPayload<T extends RoleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoleGroupByOutputType[P]>
            : GetScalarType<T[P], RoleGroupByOutputType[P]>
        }
      >
    >


  export type RoleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    created_at?: boolean
    updated_at?: boolean
    policies?: boolean | Role$policiesArgs<ExtArgs>
    users?: boolean | Role$usersArgs<ExtArgs>
    defaultForUsers?: boolean | Role$defaultForUsersArgs<ExtArgs>
    _count?: boolean | RoleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["role"]>



  export type RoleSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type RoleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "created_at" | "updated_at", ExtArgs["result"]["role"]>
  export type RoleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    policies?: boolean | Role$policiesArgs<ExtArgs>
    users?: boolean | Role$usersArgs<ExtArgs>
    defaultForUsers?: boolean | Role$defaultForUsersArgs<ExtArgs>
    _count?: boolean | RoleCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $RolePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Role"
    objects: {
      policies: Prisma.$RolePolicyPayload<ExtArgs>[]
      users: Prisma.$UserRolePayload<ExtArgs>[]
      defaultForUsers: Prisma.$UserPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      description: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["role"]>
    composites: {}
  }

  type RoleGetPayload<S extends boolean | null | undefined | RoleDefaultArgs> = $Result.GetResult<Prisma.$RolePayload, S>

  type RoleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoleCountAggregateInputType | true
    }

  export interface RoleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Role'], meta: { name: 'Role' } }
    /**
     * Find zero or one Role that matches the filter.
     * @param {RoleFindUniqueArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoleFindUniqueArgs>(args: SelectSubset<T, RoleFindUniqueArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Role that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoleFindUniqueOrThrowArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoleFindUniqueOrThrowArgs>(args: SelectSubset<T, RoleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Role that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleFindFirstArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoleFindFirstArgs>(args?: SelectSubset<T, RoleFindFirstArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Role that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleFindFirstOrThrowArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoleFindFirstOrThrowArgs>(args?: SelectSubset<T, RoleFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Roles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Roles
     * const roles = await prisma.role.findMany()
     * 
     * // Get first 10 Roles
     * const roles = await prisma.role.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roleWithIdOnly = await prisma.role.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoleFindManyArgs>(args?: SelectSubset<T, RoleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Role.
     * @param {RoleCreateArgs} args - Arguments to create a Role.
     * @example
     * // Create one Role
     * const Role = await prisma.role.create({
     *   data: {
     *     // ... data to create a Role
     *   }
     * })
     * 
     */
    create<T extends RoleCreateArgs>(args: SelectSubset<T, RoleCreateArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Roles.
     * @param {RoleCreateManyArgs} args - Arguments to create many Roles.
     * @example
     * // Create many Roles
     * const role = await prisma.role.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoleCreateManyArgs>(args?: SelectSubset<T, RoleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Role.
     * @param {RoleDeleteArgs} args - Arguments to delete one Role.
     * @example
     * // Delete one Role
     * const Role = await prisma.role.delete({
     *   where: {
     *     // ... filter to delete one Role
     *   }
     * })
     * 
     */
    delete<T extends RoleDeleteArgs>(args: SelectSubset<T, RoleDeleteArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Role.
     * @param {RoleUpdateArgs} args - Arguments to update one Role.
     * @example
     * // Update one Role
     * const role = await prisma.role.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoleUpdateArgs>(args: SelectSubset<T, RoleUpdateArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Roles.
     * @param {RoleDeleteManyArgs} args - Arguments to filter Roles to delete.
     * @example
     * // Delete a few Roles
     * const { count } = await prisma.role.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoleDeleteManyArgs>(args?: SelectSubset<T, RoleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Roles
     * const role = await prisma.role.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoleUpdateManyArgs>(args: SelectSubset<T, RoleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Role.
     * @param {RoleUpsertArgs} args - Arguments to update or create a Role.
     * @example
     * // Update or create a Role
     * const role = await prisma.role.upsert({
     *   create: {
     *     // ... data to create a Role
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Role we want to update
     *   }
     * })
     */
    upsert<T extends RoleUpsertArgs>(args: SelectSubset<T, RoleUpsertArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleCountArgs} args - Arguments to filter Roles to count.
     * @example
     * // Count the number of Roles
     * const count = await prisma.role.count({
     *   where: {
     *     // ... the filter for the Roles we want to count
     *   }
     * })
    **/
    count<T extends RoleCountArgs>(
      args?: Subset<T, RoleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Role.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RoleAggregateArgs>(args: Subset<T, RoleAggregateArgs>): Prisma.PrismaPromise<GetRoleAggregateType<T>>

    /**
     * Group by Role.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleGroupByArgs} args - Group by arguments.
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
      T extends RoleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoleGroupByArgs['orderBy'] }
        : { orderBy?: RoleGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RoleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Role model
   */
  readonly fields: RoleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Role.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    policies<T extends Role$policiesArgs<ExtArgs> = {}>(args?: Subset<T, Role$policiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePolicyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    users<T extends Role$usersArgs<ExtArgs> = {}>(args?: Subset<T, Role$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    defaultForUsers<T extends Role$defaultForUsersArgs<ExtArgs> = {}>(args?: Subset<T, Role$defaultForUsersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Role model
   */
  interface RoleFieldRefs {
    readonly id: FieldRef<"Role", 'Int'>
    readonly name: FieldRef<"Role", 'String'>
    readonly description: FieldRef<"Role", 'String'>
    readonly created_at: FieldRef<"Role", 'DateTime'>
    readonly updated_at: FieldRef<"Role", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Role findUnique
   */
  export type RoleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role findUniqueOrThrow
   */
  export type RoleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role findFirst
   */
  export type RoleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Roles.
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Roles.
     */
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
  }

  /**
   * Role findFirstOrThrow
   */
  export type RoleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Roles.
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Roles.
     */
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
  }

  /**
   * Role findMany
   */
  export type RoleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Roles to fetch.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Roles.
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
  }

  /**
   * Role create
   */
  export type RoleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * The data needed to create a Role.
     */
    data: XOR<RoleCreateInput, RoleUncheckedCreateInput>
  }

  /**
   * Role createMany
   */
  export type RoleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Roles.
     */
    data: RoleCreateManyInput | RoleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Role update
   */
  export type RoleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * The data needed to update a Role.
     */
    data: XOR<RoleUpdateInput, RoleUncheckedUpdateInput>
    /**
     * Choose, which Role to update.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role updateMany
   */
  export type RoleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Roles.
     */
    data: XOR<RoleUpdateManyMutationInput, RoleUncheckedUpdateManyInput>
    /**
     * Filter which Roles to update
     */
    where?: RoleWhereInput
    /**
     * Limit how many Roles to update.
     */
    limit?: number
  }

  /**
   * Role upsert
   */
  export type RoleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * The filter to search for the Role to update in case it exists.
     */
    where: RoleWhereUniqueInput
    /**
     * In case the Role found by the `where` argument doesn't exist, create a new Role with this data.
     */
    create: XOR<RoleCreateInput, RoleUncheckedCreateInput>
    /**
     * In case the Role was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoleUpdateInput, RoleUncheckedUpdateInput>
  }

  /**
   * Role delete
   */
  export type RoleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter which Role to delete.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role deleteMany
   */
  export type RoleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Roles to delete
     */
    where?: RoleWhereInput
    /**
     * Limit how many Roles to delete.
     */
    limit?: number
  }

  /**
   * Role.policies
   */
  export type Role$policiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePolicy
     */
    select?: RolePolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePolicy
     */
    omit?: RolePolicyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePolicyInclude<ExtArgs> | null
    where?: RolePolicyWhereInput
    orderBy?: RolePolicyOrderByWithRelationInput | RolePolicyOrderByWithRelationInput[]
    cursor?: RolePolicyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RolePolicyScalarFieldEnum | RolePolicyScalarFieldEnum[]
  }

  /**
   * Role.users
   */
  export type Role$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    where?: UserRoleWhereInput
    orderBy?: UserRoleOrderByWithRelationInput | UserRoleOrderByWithRelationInput[]
    cursor?: UserRoleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserRoleScalarFieldEnum | UserRoleScalarFieldEnum[]
  }

  /**
   * Role.defaultForUsers
   */
  export type Role$defaultForUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Role without action
   */
  export type RoleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
  }


  /**
   * Model Policy
   */

  export type AggregatePolicy = {
    _count: PolicyCountAggregateOutputType | null
    _avg: PolicyAvgAggregateOutputType | null
    _sum: PolicySumAggregateOutputType | null
    _min: PolicyMinAggregateOutputType | null
    _max: PolicyMaxAggregateOutputType | null
  }

  export type PolicyAvgAggregateOutputType = {
    id: number | null
  }

  export type PolicySumAggregateOutputType = {
    id: number | null
  }

  export type PolicyMinAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type PolicyMaxAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type PolicyCountAggregateOutputType = {
    id: number
    name: number
    description: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type PolicyAvgAggregateInputType = {
    id?: true
  }

  export type PolicySumAggregateInputType = {
    id?: true
  }

  export type PolicyMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    created_at?: true
    updated_at?: true
  }

  export type PolicyMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    created_at?: true
    updated_at?: true
  }

  export type PolicyCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type PolicyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Policy to aggregate.
     */
    where?: PolicyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Policies to fetch.
     */
    orderBy?: PolicyOrderByWithRelationInput | PolicyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PolicyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Policies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Policies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Policies
    **/
    _count?: true | PolicyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PolicyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PolicySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PolicyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PolicyMaxAggregateInputType
  }

  export type GetPolicyAggregateType<T extends PolicyAggregateArgs> = {
        [P in keyof T & keyof AggregatePolicy]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePolicy[P]>
      : GetScalarType<T[P], AggregatePolicy[P]>
  }




  export type PolicyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PolicyWhereInput
    orderBy?: PolicyOrderByWithAggregationInput | PolicyOrderByWithAggregationInput[]
    by: PolicyScalarFieldEnum[] | PolicyScalarFieldEnum
    having?: PolicyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PolicyCountAggregateInputType | true
    _avg?: PolicyAvgAggregateInputType
    _sum?: PolicySumAggregateInputType
    _min?: PolicyMinAggregateInputType
    _max?: PolicyMaxAggregateInputType
  }

  export type PolicyGroupByOutputType = {
    id: number
    name: string
    description: string | null
    created_at: Date
    updated_at: Date
    _count: PolicyCountAggregateOutputType | null
    _avg: PolicyAvgAggregateOutputType | null
    _sum: PolicySumAggregateOutputType | null
    _min: PolicyMinAggregateOutputType | null
    _max: PolicyMaxAggregateOutputType | null
  }

  type GetPolicyGroupByPayload<T extends PolicyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PolicyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PolicyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PolicyGroupByOutputType[P]>
            : GetScalarType<T[P], PolicyGroupByOutputType[P]>
        }
      >
    >


  export type PolicySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    created_at?: boolean
    updated_at?: boolean
    roles?: boolean | Policy$rolesArgs<ExtArgs>
    _count?: boolean | PolicyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["policy"]>



  export type PolicySelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type PolicyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "created_at" | "updated_at", ExtArgs["result"]["policy"]>
  export type PolicyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roles?: boolean | Policy$rolesArgs<ExtArgs>
    _count?: boolean | PolicyCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $PolicyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Policy"
    objects: {
      roles: Prisma.$RolePolicyPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      description: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["policy"]>
    composites: {}
  }

  type PolicyGetPayload<S extends boolean | null | undefined | PolicyDefaultArgs> = $Result.GetResult<Prisma.$PolicyPayload, S>

  type PolicyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PolicyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PolicyCountAggregateInputType | true
    }

  export interface PolicyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Policy'], meta: { name: 'Policy' } }
    /**
     * Find zero or one Policy that matches the filter.
     * @param {PolicyFindUniqueArgs} args - Arguments to find a Policy
     * @example
     * // Get one Policy
     * const policy = await prisma.policy.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PolicyFindUniqueArgs>(args: SelectSubset<T, PolicyFindUniqueArgs<ExtArgs>>): Prisma__PolicyClient<$Result.GetResult<Prisma.$PolicyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Policy that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PolicyFindUniqueOrThrowArgs} args - Arguments to find a Policy
     * @example
     * // Get one Policy
     * const policy = await prisma.policy.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PolicyFindUniqueOrThrowArgs>(args: SelectSubset<T, PolicyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PolicyClient<$Result.GetResult<Prisma.$PolicyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Policy that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PolicyFindFirstArgs} args - Arguments to find a Policy
     * @example
     * // Get one Policy
     * const policy = await prisma.policy.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PolicyFindFirstArgs>(args?: SelectSubset<T, PolicyFindFirstArgs<ExtArgs>>): Prisma__PolicyClient<$Result.GetResult<Prisma.$PolicyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Policy that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PolicyFindFirstOrThrowArgs} args - Arguments to find a Policy
     * @example
     * // Get one Policy
     * const policy = await prisma.policy.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PolicyFindFirstOrThrowArgs>(args?: SelectSubset<T, PolicyFindFirstOrThrowArgs<ExtArgs>>): Prisma__PolicyClient<$Result.GetResult<Prisma.$PolicyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Policies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PolicyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Policies
     * const policies = await prisma.policy.findMany()
     * 
     * // Get first 10 Policies
     * const policies = await prisma.policy.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const policyWithIdOnly = await prisma.policy.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PolicyFindManyArgs>(args?: SelectSubset<T, PolicyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PolicyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Policy.
     * @param {PolicyCreateArgs} args - Arguments to create a Policy.
     * @example
     * // Create one Policy
     * const Policy = await prisma.policy.create({
     *   data: {
     *     // ... data to create a Policy
     *   }
     * })
     * 
     */
    create<T extends PolicyCreateArgs>(args: SelectSubset<T, PolicyCreateArgs<ExtArgs>>): Prisma__PolicyClient<$Result.GetResult<Prisma.$PolicyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Policies.
     * @param {PolicyCreateManyArgs} args - Arguments to create many Policies.
     * @example
     * // Create many Policies
     * const policy = await prisma.policy.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PolicyCreateManyArgs>(args?: SelectSubset<T, PolicyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Policy.
     * @param {PolicyDeleteArgs} args - Arguments to delete one Policy.
     * @example
     * // Delete one Policy
     * const Policy = await prisma.policy.delete({
     *   where: {
     *     // ... filter to delete one Policy
     *   }
     * })
     * 
     */
    delete<T extends PolicyDeleteArgs>(args: SelectSubset<T, PolicyDeleteArgs<ExtArgs>>): Prisma__PolicyClient<$Result.GetResult<Prisma.$PolicyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Policy.
     * @param {PolicyUpdateArgs} args - Arguments to update one Policy.
     * @example
     * // Update one Policy
     * const policy = await prisma.policy.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PolicyUpdateArgs>(args: SelectSubset<T, PolicyUpdateArgs<ExtArgs>>): Prisma__PolicyClient<$Result.GetResult<Prisma.$PolicyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Policies.
     * @param {PolicyDeleteManyArgs} args - Arguments to filter Policies to delete.
     * @example
     * // Delete a few Policies
     * const { count } = await prisma.policy.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PolicyDeleteManyArgs>(args?: SelectSubset<T, PolicyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Policies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PolicyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Policies
     * const policy = await prisma.policy.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PolicyUpdateManyArgs>(args: SelectSubset<T, PolicyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Policy.
     * @param {PolicyUpsertArgs} args - Arguments to update or create a Policy.
     * @example
     * // Update or create a Policy
     * const policy = await prisma.policy.upsert({
     *   create: {
     *     // ... data to create a Policy
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Policy we want to update
     *   }
     * })
     */
    upsert<T extends PolicyUpsertArgs>(args: SelectSubset<T, PolicyUpsertArgs<ExtArgs>>): Prisma__PolicyClient<$Result.GetResult<Prisma.$PolicyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Policies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PolicyCountArgs} args - Arguments to filter Policies to count.
     * @example
     * // Count the number of Policies
     * const count = await prisma.policy.count({
     *   where: {
     *     // ... the filter for the Policies we want to count
     *   }
     * })
    **/
    count<T extends PolicyCountArgs>(
      args?: Subset<T, PolicyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PolicyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Policy.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PolicyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PolicyAggregateArgs>(args: Subset<T, PolicyAggregateArgs>): Prisma.PrismaPromise<GetPolicyAggregateType<T>>

    /**
     * Group by Policy.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PolicyGroupByArgs} args - Group by arguments.
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
      T extends PolicyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PolicyGroupByArgs['orderBy'] }
        : { orderBy?: PolicyGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PolicyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPolicyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Policy model
   */
  readonly fields: PolicyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Policy.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PolicyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    roles<T extends Policy$rolesArgs<ExtArgs> = {}>(args?: Subset<T, Policy$rolesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePolicyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Policy model
   */
  interface PolicyFieldRefs {
    readonly id: FieldRef<"Policy", 'Int'>
    readonly name: FieldRef<"Policy", 'String'>
    readonly description: FieldRef<"Policy", 'String'>
    readonly created_at: FieldRef<"Policy", 'DateTime'>
    readonly updated_at: FieldRef<"Policy", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Policy findUnique
   */
  export type PolicyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Policy
     */
    select?: PolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Policy
     */
    omit?: PolicyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolicyInclude<ExtArgs> | null
    /**
     * Filter, which Policy to fetch.
     */
    where: PolicyWhereUniqueInput
  }

  /**
   * Policy findUniqueOrThrow
   */
  export type PolicyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Policy
     */
    select?: PolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Policy
     */
    omit?: PolicyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolicyInclude<ExtArgs> | null
    /**
     * Filter, which Policy to fetch.
     */
    where: PolicyWhereUniqueInput
  }

  /**
   * Policy findFirst
   */
  export type PolicyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Policy
     */
    select?: PolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Policy
     */
    omit?: PolicyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolicyInclude<ExtArgs> | null
    /**
     * Filter, which Policy to fetch.
     */
    where?: PolicyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Policies to fetch.
     */
    orderBy?: PolicyOrderByWithRelationInput | PolicyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Policies.
     */
    cursor?: PolicyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Policies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Policies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Policies.
     */
    distinct?: PolicyScalarFieldEnum | PolicyScalarFieldEnum[]
  }

  /**
   * Policy findFirstOrThrow
   */
  export type PolicyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Policy
     */
    select?: PolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Policy
     */
    omit?: PolicyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolicyInclude<ExtArgs> | null
    /**
     * Filter, which Policy to fetch.
     */
    where?: PolicyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Policies to fetch.
     */
    orderBy?: PolicyOrderByWithRelationInput | PolicyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Policies.
     */
    cursor?: PolicyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Policies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Policies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Policies.
     */
    distinct?: PolicyScalarFieldEnum | PolicyScalarFieldEnum[]
  }

  /**
   * Policy findMany
   */
  export type PolicyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Policy
     */
    select?: PolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Policy
     */
    omit?: PolicyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolicyInclude<ExtArgs> | null
    /**
     * Filter, which Policies to fetch.
     */
    where?: PolicyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Policies to fetch.
     */
    orderBy?: PolicyOrderByWithRelationInput | PolicyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Policies.
     */
    cursor?: PolicyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Policies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Policies.
     */
    skip?: number
    distinct?: PolicyScalarFieldEnum | PolicyScalarFieldEnum[]
  }

  /**
   * Policy create
   */
  export type PolicyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Policy
     */
    select?: PolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Policy
     */
    omit?: PolicyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolicyInclude<ExtArgs> | null
    /**
     * The data needed to create a Policy.
     */
    data: XOR<PolicyCreateInput, PolicyUncheckedCreateInput>
  }

  /**
   * Policy createMany
   */
  export type PolicyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Policies.
     */
    data: PolicyCreateManyInput | PolicyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Policy update
   */
  export type PolicyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Policy
     */
    select?: PolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Policy
     */
    omit?: PolicyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolicyInclude<ExtArgs> | null
    /**
     * The data needed to update a Policy.
     */
    data: XOR<PolicyUpdateInput, PolicyUncheckedUpdateInput>
    /**
     * Choose, which Policy to update.
     */
    where: PolicyWhereUniqueInput
  }

  /**
   * Policy updateMany
   */
  export type PolicyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Policies.
     */
    data: XOR<PolicyUpdateManyMutationInput, PolicyUncheckedUpdateManyInput>
    /**
     * Filter which Policies to update
     */
    where?: PolicyWhereInput
    /**
     * Limit how many Policies to update.
     */
    limit?: number
  }

  /**
   * Policy upsert
   */
  export type PolicyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Policy
     */
    select?: PolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Policy
     */
    omit?: PolicyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolicyInclude<ExtArgs> | null
    /**
     * The filter to search for the Policy to update in case it exists.
     */
    where: PolicyWhereUniqueInput
    /**
     * In case the Policy found by the `where` argument doesn't exist, create a new Policy with this data.
     */
    create: XOR<PolicyCreateInput, PolicyUncheckedCreateInput>
    /**
     * In case the Policy was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PolicyUpdateInput, PolicyUncheckedUpdateInput>
  }

  /**
   * Policy delete
   */
  export type PolicyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Policy
     */
    select?: PolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Policy
     */
    omit?: PolicyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolicyInclude<ExtArgs> | null
    /**
     * Filter which Policy to delete.
     */
    where: PolicyWhereUniqueInput
  }

  /**
   * Policy deleteMany
   */
  export type PolicyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Policies to delete
     */
    where?: PolicyWhereInput
    /**
     * Limit how many Policies to delete.
     */
    limit?: number
  }

  /**
   * Policy.roles
   */
  export type Policy$rolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePolicy
     */
    select?: RolePolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePolicy
     */
    omit?: RolePolicyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePolicyInclude<ExtArgs> | null
    where?: RolePolicyWhereInput
    orderBy?: RolePolicyOrderByWithRelationInput | RolePolicyOrderByWithRelationInput[]
    cursor?: RolePolicyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RolePolicyScalarFieldEnum | RolePolicyScalarFieldEnum[]
  }

  /**
   * Policy without action
   */
  export type PolicyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Policy
     */
    select?: PolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Policy
     */
    omit?: PolicyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PolicyInclude<ExtArgs> | null
  }


  /**
   * Model RolePolicy
   */

  export type AggregateRolePolicy = {
    _count: RolePolicyCountAggregateOutputType | null
    _avg: RolePolicyAvgAggregateOutputType | null
    _sum: RolePolicySumAggregateOutputType | null
    _min: RolePolicyMinAggregateOutputType | null
    _max: RolePolicyMaxAggregateOutputType | null
  }

  export type RolePolicyAvgAggregateOutputType = {
    id: number | null
    role_id: number | null
    policy_id: number | null
  }

  export type RolePolicySumAggregateOutputType = {
    id: number | null
    role_id: number | null
    policy_id: number | null
  }

  export type RolePolicyMinAggregateOutputType = {
    id: number | null
    role_id: number | null
    policy_id: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type RolePolicyMaxAggregateOutputType = {
    id: number | null
    role_id: number | null
    policy_id: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type RolePolicyCountAggregateOutputType = {
    id: number
    role_id: number
    policy_id: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type RolePolicyAvgAggregateInputType = {
    id?: true
    role_id?: true
    policy_id?: true
  }

  export type RolePolicySumAggregateInputType = {
    id?: true
    role_id?: true
    policy_id?: true
  }

  export type RolePolicyMinAggregateInputType = {
    id?: true
    role_id?: true
    policy_id?: true
    created_at?: true
    updated_at?: true
  }

  export type RolePolicyMaxAggregateInputType = {
    id?: true
    role_id?: true
    policy_id?: true
    created_at?: true
    updated_at?: true
  }

  export type RolePolicyCountAggregateInputType = {
    id?: true
    role_id?: true
    policy_id?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type RolePolicyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RolePolicy to aggregate.
     */
    where?: RolePolicyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RolePolicies to fetch.
     */
    orderBy?: RolePolicyOrderByWithRelationInput | RolePolicyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RolePolicyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RolePolicies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RolePolicies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RolePolicies
    **/
    _count?: true | RolePolicyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RolePolicyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RolePolicySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RolePolicyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RolePolicyMaxAggregateInputType
  }

  export type GetRolePolicyAggregateType<T extends RolePolicyAggregateArgs> = {
        [P in keyof T & keyof AggregateRolePolicy]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRolePolicy[P]>
      : GetScalarType<T[P], AggregateRolePolicy[P]>
  }




  export type RolePolicyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RolePolicyWhereInput
    orderBy?: RolePolicyOrderByWithAggregationInput | RolePolicyOrderByWithAggregationInput[]
    by: RolePolicyScalarFieldEnum[] | RolePolicyScalarFieldEnum
    having?: RolePolicyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RolePolicyCountAggregateInputType | true
    _avg?: RolePolicyAvgAggregateInputType
    _sum?: RolePolicySumAggregateInputType
    _min?: RolePolicyMinAggregateInputType
    _max?: RolePolicyMaxAggregateInputType
  }

  export type RolePolicyGroupByOutputType = {
    id: number
    role_id: number
    policy_id: number
    created_at: Date
    updated_at: Date
    _count: RolePolicyCountAggregateOutputType | null
    _avg: RolePolicyAvgAggregateOutputType | null
    _sum: RolePolicySumAggregateOutputType | null
    _min: RolePolicyMinAggregateOutputType | null
    _max: RolePolicyMaxAggregateOutputType | null
  }

  type GetRolePolicyGroupByPayload<T extends RolePolicyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RolePolicyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RolePolicyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RolePolicyGroupByOutputType[P]>
            : GetScalarType<T[P], RolePolicyGroupByOutputType[P]>
        }
      >
    >


  export type RolePolicySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    role_id?: boolean
    policy_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    role?: boolean | RoleDefaultArgs<ExtArgs>
    policy?: boolean | PolicyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rolePolicy"]>



  export type RolePolicySelectScalar = {
    id?: boolean
    role_id?: boolean
    policy_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type RolePolicyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "role_id" | "policy_id" | "created_at" | "updated_at", ExtArgs["result"]["rolePolicy"]>
  export type RolePolicyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    role?: boolean | RoleDefaultArgs<ExtArgs>
    policy?: boolean | PolicyDefaultArgs<ExtArgs>
  }

  export type $RolePolicyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RolePolicy"
    objects: {
      role: Prisma.$RolePayload<ExtArgs>
      policy: Prisma.$PolicyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      role_id: number
      policy_id: number
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["rolePolicy"]>
    composites: {}
  }

  type RolePolicyGetPayload<S extends boolean | null | undefined | RolePolicyDefaultArgs> = $Result.GetResult<Prisma.$RolePolicyPayload, S>

  type RolePolicyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RolePolicyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RolePolicyCountAggregateInputType | true
    }

  export interface RolePolicyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RolePolicy'], meta: { name: 'RolePolicy' } }
    /**
     * Find zero or one RolePolicy that matches the filter.
     * @param {RolePolicyFindUniqueArgs} args - Arguments to find a RolePolicy
     * @example
     * // Get one RolePolicy
     * const rolePolicy = await prisma.rolePolicy.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RolePolicyFindUniqueArgs>(args: SelectSubset<T, RolePolicyFindUniqueArgs<ExtArgs>>): Prisma__RolePolicyClient<$Result.GetResult<Prisma.$RolePolicyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RolePolicy that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RolePolicyFindUniqueOrThrowArgs} args - Arguments to find a RolePolicy
     * @example
     * // Get one RolePolicy
     * const rolePolicy = await prisma.rolePolicy.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RolePolicyFindUniqueOrThrowArgs>(args: SelectSubset<T, RolePolicyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RolePolicyClient<$Result.GetResult<Prisma.$RolePolicyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RolePolicy that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolePolicyFindFirstArgs} args - Arguments to find a RolePolicy
     * @example
     * // Get one RolePolicy
     * const rolePolicy = await prisma.rolePolicy.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RolePolicyFindFirstArgs>(args?: SelectSubset<T, RolePolicyFindFirstArgs<ExtArgs>>): Prisma__RolePolicyClient<$Result.GetResult<Prisma.$RolePolicyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RolePolicy that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolePolicyFindFirstOrThrowArgs} args - Arguments to find a RolePolicy
     * @example
     * // Get one RolePolicy
     * const rolePolicy = await prisma.rolePolicy.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RolePolicyFindFirstOrThrowArgs>(args?: SelectSubset<T, RolePolicyFindFirstOrThrowArgs<ExtArgs>>): Prisma__RolePolicyClient<$Result.GetResult<Prisma.$RolePolicyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RolePolicies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolePolicyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RolePolicies
     * const rolePolicies = await prisma.rolePolicy.findMany()
     * 
     * // Get first 10 RolePolicies
     * const rolePolicies = await prisma.rolePolicy.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rolePolicyWithIdOnly = await prisma.rolePolicy.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RolePolicyFindManyArgs>(args?: SelectSubset<T, RolePolicyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePolicyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RolePolicy.
     * @param {RolePolicyCreateArgs} args - Arguments to create a RolePolicy.
     * @example
     * // Create one RolePolicy
     * const RolePolicy = await prisma.rolePolicy.create({
     *   data: {
     *     // ... data to create a RolePolicy
     *   }
     * })
     * 
     */
    create<T extends RolePolicyCreateArgs>(args: SelectSubset<T, RolePolicyCreateArgs<ExtArgs>>): Prisma__RolePolicyClient<$Result.GetResult<Prisma.$RolePolicyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RolePolicies.
     * @param {RolePolicyCreateManyArgs} args - Arguments to create many RolePolicies.
     * @example
     * // Create many RolePolicies
     * const rolePolicy = await prisma.rolePolicy.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RolePolicyCreateManyArgs>(args?: SelectSubset<T, RolePolicyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a RolePolicy.
     * @param {RolePolicyDeleteArgs} args - Arguments to delete one RolePolicy.
     * @example
     * // Delete one RolePolicy
     * const RolePolicy = await prisma.rolePolicy.delete({
     *   where: {
     *     // ... filter to delete one RolePolicy
     *   }
     * })
     * 
     */
    delete<T extends RolePolicyDeleteArgs>(args: SelectSubset<T, RolePolicyDeleteArgs<ExtArgs>>): Prisma__RolePolicyClient<$Result.GetResult<Prisma.$RolePolicyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RolePolicy.
     * @param {RolePolicyUpdateArgs} args - Arguments to update one RolePolicy.
     * @example
     * // Update one RolePolicy
     * const rolePolicy = await prisma.rolePolicy.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RolePolicyUpdateArgs>(args: SelectSubset<T, RolePolicyUpdateArgs<ExtArgs>>): Prisma__RolePolicyClient<$Result.GetResult<Prisma.$RolePolicyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RolePolicies.
     * @param {RolePolicyDeleteManyArgs} args - Arguments to filter RolePolicies to delete.
     * @example
     * // Delete a few RolePolicies
     * const { count } = await prisma.rolePolicy.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RolePolicyDeleteManyArgs>(args?: SelectSubset<T, RolePolicyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RolePolicies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolePolicyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RolePolicies
     * const rolePolicy = await prisma.rolePolicy.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RolePolicyUpdateManyArgs>(args: SelectSubset<T, RolePolicyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RolePolicy.
     * @param {RolePolicyUpsertArgs} args - Arguments to update or create a RolePolicy.
     * @example
     * // Update or create a RolePolicy
     * const rolePolicy = await prisma.rolePolicy.upsert({
     *   create: {
     *     // ... data to create a RolePolicy
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RolePolicy we want to update
     *   }
     * })
     */
    upsert<T extends RolePolicyUpsertArgs>(args: SelectSubset<T, RolePolicyUpsertArgs<ExtArgs>>): Prisma__RolePolicyClient<$Result.GetResult<Prisma.$RolePolicyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RolePolicies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolePolicyCountArgs} args - Arguments to filter RolePolicies to count.
     * @example
     * // Count the number of RolePolicies
     * const count = await prisma.rolePolicy.count({
     *   where: {
     *     // ... the filter for the RolePolicies we want to count
     *   }
     * })
    **/
    count<T extends RolePolicyCountArgs>(
      args?: Subset<T, RolePolicyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RolePolicyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RolePolicy.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolePolicyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RolePolicyAggregateArgs>(args: Subset<T, RolePolicyAggregateArgs>): Prisma.PrismaPromise<GetRolePolicyAggregateType<T>>

    /**
     * Group by RolePolicy.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolePolicyGroupByArgs} args - Group by arguments.
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
      T extends RolePolicyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RolePolicyGroupByArgs['orderBy'] }
        : { orderBy?: RolePolicyGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RolePolicyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRolePolicyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RolePolicy model
   */
  readonly fields: RolePolicyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RolePolicy.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RolePolicyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    role<T extends RoleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoleDefaultArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    policy<T extends PolicyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PolicyDefaultArgs<ExtArgs>>): Prisma__PolicyClient<$Result.GetResult<Prisma.$PolicyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the RolePolicy model
   */
  interface RolePolicyFieldRefs {
    readonly id: FieldRef<"RolePolicy", 'Int'>
    readonly role_id: FieldRef<"RolePolicy", 'Int'>
    readonly policy_id: FieldRef<"RolePolicy", 'Int'>
    readonly created_at: FieldRef<"RolePolicy", 'DateTime'>
    readonly updated_at: FieldRef<"RolePolicy", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RolePolicy findUnique
   */
  export type RolePolicyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePolicy
     */
    select?: RolePolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePolicy
     */
    omit?: RolePolicyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePolicyInclude<ExtArgs> | null
    /**
     * Filter, which RolePolicy to fetch.
     */
    where: RolePolicyWhereUniqueInput
  }

  /**
   * RolePolicy findUniqueOrThrow
   */
  export type RolePolicyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePolicy
     */
    select?: RolePolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePolicy
     */
    omit?: RolePolicyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePolicyInclude<ExtArgs> | null
    /**
     * Filter, which RolePolicy to fetch.
     */
    where: RolePolicyWhereUniqueInput
  }

  /**
   * RolePolicy findFirst
   */
  export type RolePolicyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePolicy
     */
    select?: RolePolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePolicy
     */
    omit?: RolePolicyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePolicyInclude<ExtArgs> | null
    /**
     * Filter, which RolePolicy to fetch.
     */
    where?: RolePolicyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RolePolicies to fetch.
     */
    orderBy?: RolePolicyOrderByWithRelationInput | RolePolicyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RolePolicies.
     */
    cursor?: RolePolicyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RolePolicies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RolePolicies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RolePolicies.
     */
    distinct?: RolePolicyScalarFieldEnum | RolePolicyScalarFieldEnum[]
  }

  /**
   * RolePolicy findFirstOrThrow
   */
  export type RolePolicyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePolicy
     */
    select?: RolePolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePolicy
     */
    omit?: RolePolicyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePolicyInclude<ExtArgs> | null
    /**
     * Filter, which RolePolicy to fetch.
     */
    where?: RolePolicyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RolePolicies to fetch.
     */
    orderBy?: RolePolicyOrderByWithRelationInput | RolePolicyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RolePolicies.
     */
    cursor?: RolePolicyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RolePolicies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RolePolicies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RolePolicies.
     */
    distinct?: RolePolicyScalarFieldEnum | RolePolicyScalarFieldEnum[]
  }

  /**
   * RolePolicy findMany
   */
  export type RolePolicyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePolicy
     */
    select?: RolePolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePolicy
     */
    omit?: RolePolicyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePolicyInclude<ExtArgs> | null
    /**
     * Filter, which RolePolicies to fetch.
     */
    where?: RolePolicyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RolePolicies to fetch.
     */
    orderBy?: RolePolicyOrderByWithRelationInput | RolePolicyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RolePolicies.
     */
    cursor?: RolePolicyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RolePolicies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RolePolicies.
     */
    skip?: number
    distinct?: RolePolicyScalarFieldEnum | RolePolicyScalarFieldEnum[]
  }

  /**
   * RolePolicy create
   */
  export type RolePolicyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePolicy
     */
    select?: RolePolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePolicy
     */
    omit?: RolePolicyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePolicyInclude<ExtArgs> | null
    /**
     * The data needed to create a RolePolicy.
     */
    data: XOR<RolePolicyCreateInput, RolePolicyUncheckedCreateInput>
  }

  /**
   * RolePolicy createMany
   */
  export type RolePolicyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RolePolicies.
     */
    data: RolePolicyCreateManyInput | RolePolicyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RolePolicy update
   */
  export type RolePolicyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePolicy
     */
    select?: RolePolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePolicy
     */
    omit?: RolePolicyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePolicyInclude<ExtArgs> | null
    /**
     * The data needed to update a RolePolicy.
     */
    data: XOR<RolePolicyUpdateInput, RolePolicyUncheckedUpdateInput>
    /**
     * Choose, which RolePolicy to update.
     */
    where: RolePolicyWhereUniqueInput
  }

  /**
   * RolePolicy updateMany
   */
  export type RolePolicyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RolePolicies.
     */
    data: XOR<RolePolicyUpdateManyMutationInput, RolePolicyUncheckedUpdateManyInput>
    /**
     * Filter which RolePolicies to update
     */
    where?: RolePolicyWhereInput
    /**
     * Limit how many RolePolicies to update.
     */
    limit?: number
  }

  /**
   * RolePolicy upsert
   */
  export type RolePolicyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePolicy
     */
    select?: RolePolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePolicy
     */
    omit?: RolePolicyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePolicyInclude<ExtArgs> | null
    /**
     * The filter to search for the RolePolicy to update in case it exists.
     */
    where: RolePolicyWhereUniqueInput
    /**
     * In case the RolePolicy found by the `where` argument doesn't exist, create a new RolePolicy with this data.
     */
    create: XOR<RolePolicyCreateInput, RolePolicyUncheckedCreateInput>
    /**
     * In case the RolePolicy was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RolePolicyUpdateInput, RolePolicyUncheckedUpdateInput>
  }

  /**
   * RolePolicy delete
   */
  export type RolePolicyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePolicy
     */
    select?: RolePolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePolicy
     */
    omit?: RolePolicyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePolicyInclude<ExtArgs> | null
    /**
     * Filter which RolePolicy to delete.
     */
    where: RolePolicyWhereUniqueInput
  }

  /**
   * RolePolicy deleteMany
   */
  export type RolePolicyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RolePolicies to delete
     */
    where?: RolePolicyWhereInput
    /**
     * Limit how many RolePolicies to delete.
     */
    limit?: number
  }

  /**
   * RolePolicy without action
   */
  export type RolePolicyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolePolicy
     */
    select?: RolePolicySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RolePolicy
     */
    omit?: RolePolicyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RolePolicyInclude<ExtArgs> | null
  }


  /**
   * Model UserRole
   */

  export type AggregateUserRole = {
    _count: UserRoleCountAggregateOutputType | null
    _avg: UserRoleAvgAggregateOutputType | null
    _sum: UserRoleSumAggregateOutputType | null
    _min: UserRoleMinAggregateOutputType | null
    _max: UserRoleMaxAggregateOutputType | null
  }

  export type UserRoleAvgAggregateOutputType = {
    id: number | null
    user_id: number | null
    role_id: number | null
  }

  export type UserRoleSumAggregateOutputType = {
    id: number | null
    user_id: number | null
    role_id: number | null
  }

  export type UserRoleMinAggregateOutputType = {
    id: number | null
    user_id: number | null
    role_id: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UserRoleMaxAggregateOutputType = {
    id: number | null
    user_id: number | null
    role_id: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UserRoleCountAggregateOutputType = {
    id: number
    user_id: number
    role_id: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type UserRoleAvgAggregateInputType = {
    id?: true
    user_id?: true
    role_id?: true
  }

  export type UserRoleSumAggregateInputType = {
    id?: true
    user_id?: true
    role_id?: true
  }

  export type UserRoleMinAggregateInputType = {
    id?: true
    user_id?: true
    role_id?: true
    created_at?: true
    updated_at?: true
  }

  export type UserRoleMaxAggregateInputType = {
    id?: true
    user_id?: true
    role_id?: true
    created_at?: true
    updated_at?: true
  }

  export type UserRoleCountAggregateInputType = {
    id?: true
    user_id?: true
    role_id?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type UserRoleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserRole to aggregate.
     */
    where?: UserRoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRoles to fetch.
     */
    orderBy?: UserRoleOrderByWithRelationInput | UserRoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserRoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRoles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserRoles
    **/
    _count?: true | UserRoleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserRoleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserRoleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserRoleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserRoleMaxAggregateInputType
  }

  export type GetUserRoleAggregateType<T extends UserRoleAggregateArgs> = {
        [P in keyof T & keyof AggregateUserRole]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserRole[P]>
      : GetScalarType<T[P], AggregateUserRole[P]>
  }




  export type UserRoleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserRoleWhereInput
    orderBy?: UserRoleOrderByWithAggregationInput | UserRoleOrderByWithAggregationInput[]
    by: UserRoleScalarFieldEnum[] | UserRoleScalarFieldEnum
    having?: UserRoleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserRoleCountAggregateInputType | true
    _avg?: UserRoleAvgAggregateInputType
    _sum?: UserRoleSumAggregateInputType
    _min?: UserRoleMinAggregateInputType
    _max?: UserRoleMaxAggregateInputType
  }

  export type UserRoleGroupByOutputType = {
    id: number
    user_id: number
    role_id: number
    created_at: Date
    updated_at: Date
    _count: UserRoleCountAggregateOutputType | null
    _avg: UserRoleAvgAggregateOutputType | null
    _sum: UserRoleSumAggregateOutputType | null
    _min: UserRoleMinAggregateOutputType | null
    _max: UserRoleMaxAggregateOutputType | null
  }

  type GetUserRoleGroupByPayload<T extends UserRoleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserRoleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserRoleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserRoleGroupByOutputType[P]>
            : GetScalarType<T[P], UserRoleGroupByOutputType[P]>
        }
      >
    >


  export type UserRoleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    role_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    role?: boolean | RoleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userRole"]>



  export type UserRoleSelectScalar = {
    id?: boolean
    user_id?: boolean
    role_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type UserRoleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "role_id" | "created_at" | "updated_at", ExtArgs["result"]["userRole"]>
  export type UserRoleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    role?: boolean | RoleDefaultArgs<ExtArgs>
  }

  export type $UserRolePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserRole"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      role: Prisma.$RolePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      user_id: number
      role_id: number
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["userRole"]>
    composites: {}
  }

  type UserRoleGetPayload<S extends boolean | null | undefined | UserRoleDefaultArgs> = $Result.GetResult<Prisma.$UserRolePayload, S>

  type UserRoleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserRoleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserRoleCountAggregateInputType | true
    }

  export interface UserRoleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserRole'], meta: { name: 'UserRole' } }
    /**
     * Find zero or one UserRole that matches the filter.
     * @param {UserRoleFindUniqueArgs} args - Arguments to find a UserRole
     * @example
     * // Get one UserRole
     * const userRole = await prisma.userRole.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserRoleFindUniqueArgs>(args: SelectSubset<T, UserRoleFindUniqueArgs<ExtArgs>>): Prisma__UserRoleClient<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserRole that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserRoleFindUniqueOrThrowArgs} args - Arguments to find a UserRole
     * @example
     * // Get one UserRole
     * const userRole = await prisma.userRole.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserRoleFindUniqueOrThrowArgs>(args: SelectSubset<T, UserRoleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserRoleClient<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserRole that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoleFindFirstArgs} args - Arguments to find a UserRole
     * @example
     * // Get one UserRole
     * const userRole = await prisma.userRole.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserRoleFindFirstArgs>(args?: SelectSubset<T, UserRoleFindFirstArgs<ExtArgs>>): Prisma__UserRoleClient<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserRole that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoleFindFirstOrThrowArgs} args - Arguments to find a UserRole
     * @example
     * // Get one UserRole
     * const userRole = await prisma.userRole.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserRoleFindFirstOrThrowArgs>(args?: SelectSubset<T, UserRoleFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserRoleClient<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserRoles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserRoles
     * const userRoles = await prisma.userRole.findMany()
     * 
     * // Get first 10 UserRoles
     * const userRoles = await prisma.userRole.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userRoleWithIdOnly = await prisma.userRole.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserRoleFindManyArgs>(args?: SelectSubset<T, UserRoleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserRole.
     * @param {UserRoleCreateArgs} args - Arguments to create a UserRole.
     * @example
     * // Create one UserRole
     * const UserRole = await prisma.userRole.create({
     *   data: {
     *     // ... data to create a UserRole
     *   }
     * })
     * 
     */
    create<T extends UserRoleCreateArgs>(args: SelectSubset<T, UserRoleCreateArgs<ExtArgs>>): Prisma__UserRoleClient<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserRoles.
     * @param {UserRoleCreateManyArgs} args - Arguments to create many UserRoles.
     * @example
     * // Create many UserRoles
     * const userRole = await prisma.userRole.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserRoleCreateManyArgs>(args?: SelectSubset<T, UserRoleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a UserRole.
     * @param {UserRoleDeleteArgs} args - Arguments to delete one UserRole.
     * @example
     * // Delete one UserRole
     * const UserRole = await prisma.userRole.delete({
     *   where: {
     *     // ... filter to delete one UserRole
     *   }
     * })
     * 
     */
    delete<T extends UserRoleDeleteArgs>(args: SelectSubset<T, UserRoleDeleteArgs<ExtArgs>>): Prisma__UserRoleClient<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserRole.
     * @param {UserRoleUpdateArgs} args - Arguments to update one UserRole.
     * @example
     * // Update one UserRole
     * const userRole = await prisma.userRole.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserRoleUpdateArgs>(args: SelectSubset<T, UserRoleUpdateArgs<ExtArgs>>): Prisma__UserRoleClient<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserRoles.
     * @param {UserRoleDeleteManyArgs} args - Arguments to filter UserRoles to delete.
     * @example
     * // Delete a few UserRoles
     * const { count } = await prisma.userRole.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserRoleDeleteManyArgs>(args?: SelectSubset<T, UserRoleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserRoles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserRoles
     * const userRole = await prisma.userRole.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserRoleUpdateManyArgs>(args: SelectSubset<T, UserRoleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UserRole.
     * @param {UserRoleUpsertArgs} args - Arguments to update or create a UserRole.
     * @example
     * // Update or create a UserRole
     * const userRole = await prisma.userRole.upsert({
     *   create: {
     *     // ... data to create a UserRole
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserRole we want to update
     *   }
     * })
     */
    upsert<T extends UserRoleUpsertArgs>(args: SelectSubset<T, UserRoleUpsertArgs<ExtArgs>>): Prisma__UserRoleClient<$Result.GetResult<Prisma.$UserRolePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserRoles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoleCountArgs} args - Arguments to filter UserRoles to count.
     * @example
     * // Count the number of UserRoles
     * const count = await prisma.userRole.count({
     *   where: {
     *     // ... the filter for the UserRoles we want to count
     *   }
     * })
    **/
    count<T extends UserRoleCountArgs>(
      args?: Subset<T, UserRoleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserRoleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserRole.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserRoleAggregateArgs>(args: Subset<T, UserRoleAggregateArgs>): Prisma.PrismaPromise<GetUserRoleAggregateType<T>>

    /**
     * Group by UserRole.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserRoleGroupByArgs} args - Group by arguments.
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
      T extends UserRoleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserRoleGroupByArgs['orderBy'] }
        : { orderBy?: UserRoleGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserRoleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserRoleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserRole model
   */
  readonly fields: UserRoleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserRole.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserRoleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    role<T extends RoleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoleDefaultArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the UserRole model
   */
  interface UserRoleFieldRefs {
    readonly id: FieldRef<"UserRole", 'Int'>
    readonly user_id: FieldRef<"UserRole", 'Int'>
    readonly role_id: FieldRef<"UserRole", 'Int'>
    readonly created_at: FieldRef<"UserRole", 'DateTime'>
    readonly updated_at: FieldRef<"UserRole", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserRole findUnique
   */
  export type UserRoleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    /**
     * Filter, which UserRole to fetch.
     */
    where: UserRoleWhereUniqueInput
  }

  /**
   * UserRole findUniqueOrThrow
   */
  export type UserRoleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    /**
     * Filter, which UserRole to fetch.
     */
    where: UserRoleWhereUniqueInput
  }

  /**
   * UserRole findFirst
   */
  export type UserRoleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    /**
     * Filter, which UserRole to fetch.
     */
    where?: UserRoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRoles to fetch.
     */
    orderBy?: UserRoleOrderByWithRelationInput | UserRoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserRoles.
     */
    cursor?: UserRoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRoles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserRoles.
     */
    distinct?: UserRoleScalarFieldEnum | UserRoleScalarFieldEnum[]
  }

  /**
   * UserRole findFirstOrThrow
   */
  export type UserRoleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    /**
     * Filter, which UserRole to fetch.
     */
    where?: UserRoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRoles to fetch.
     */
    orderBy?: UserRoleOrderByWithRelationInput | UserRoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserRoles.
     */
    cursor?: UserRoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRoles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserRoles.
     */
    distinct?: UserRoleScalarFieldEnum | UserRoleScalarFieldEnum[]
  }

  /**
   * UserRole findMany
   */
  export type UserRoleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    /**
     * Filter, which UserRoles to fetch.
     */
    where?: UserRoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserRoles to fetch.
     */
    orderBy?: UserRoleOrderByWithRelationInput | UserRoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserRoles.
     */
    cursor?: UserRoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserRoles.
     */
    skip?: number
    distinct?: UserRoleScalarFieldEnum | UserRoleScalarFieldEnum[]
  }

  /**
   * UserRole create
   */
  export type UserRoleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    /**
     * The data needed to create a UserRole.
     */
    data: XOR<UserRoleCreateInput, UserRoleUncheckedCreateInput>
  }

  /**
   * UserRole createMany
   */
  export type UserRoleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserRoles.
     */
    data: UserRoleCreateManyInput | UserRoleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserRole update
   */
  export type UserRoleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    /**
     * The data needed to update a UserRole.
     */
    data: XOR<UserRoleUpdateInput, UserRoleUncheckedUpdateInput>
    /**
     * Choose, which UserRole to update.
     */
    where: UserRoleWhereUniqueInput
  }

  /**
   * UserRole updateMany
   */
  export type UserRoleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserRoles.
     */
    data: XOR<UserRoleUpdateManyMutationInput, UserRoleUncheckedUpdateManyInput>
    /**
     * Filter which UserRoles to update
     */
    where?: UserRoleWhereInput
    /**
     * Limit how many UserRoles to update.
     */
    limit?: number
  }

  /**
   * UserRole upsert
   */
  export type UserRoleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    /**
     * The filter to search for the UserRole to update in case it exists.
     */
    where: UserRoleWhereUniqueInput
    /**
     * In case the UserRole found by the `where` argument doesn't exist, create a new UserRole with this data.
     */
    create: XOR<UserRoleCreateInput, UserRoleUncheckedCreateInput>
    /**
     * In case the UserRole was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserRoleUpdateInput, UserRoleUncheckedUpdateInput>
  }

  /**
   * UserRole delete
   */
  export type UserRoleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
    /**
     * Filter which UserRole to delete.
     */
    where: UserRoleWhereUniqueInput
  }

  /**
   * UserRole deleteMany
   */
  export type UserRoleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserRoles to delete
     */
    where?: UserRoleWhereInput
    /**
     * Limit how many UserRoles to delete.
     */
    limit?: number
  }

  /**
   * UserRole without action
   */
  export type UserRoleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserRole
     */
    select?: UserRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserRole
     */
    omit?: UserRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserRoleInclude<ExtArgs> | null
  }


  /**
   * Model Group
   */

  export type AggregateGroup = {
    _count: GroupCountAggregateOutputType | null
    _avg: GroupAvgAggregateOutputType | null
    _sum: GroupSumAggregateOutputType | null
    _min: GroupMinAggregateOutputType | null
    _max: GroupMaxAggregateOutputType | null
  }

  export type GroupAvgAggregateOutputType = {
    id: number | null
  }

  export type GroupSumAggregateOutputType = {
    id: number | null
  }

  export type GroupMinAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type GroupMaxAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type GroupCountAggregateOutputType = {
    id: number
    name: number
    description: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type GroupAvgAggregateInputType = {
    id?: true
  }

  export type GroupSumAggregateInputType = {
    id?: true
  }

  export type GroupMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    created_at?: true
    updated_at?: true
  }

  export type GroupMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    created_at?: true
    updated_at?: true
  }

  export type GroupCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type GroupAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Group to aggregate.
     */
    where?: GroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     */
    orderBy?: GroupOrderByWithRelationInput | GroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Groups
    **/
    _count?: true | GroupCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GroupAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GroupSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GroupMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GroupMaxAggregateInputType
  }

  export type GetGroupAggregateType<T extends GroupAggregateArgs> = {
        [P in keyof T & keyof AggregateGroup]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGroup[P]>
      : GetScalarType<T[P], AggregateGroup[P]>
  }




  export type GroupGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupWhereInput
    orderBy?: GroupOrderByWithAggregationInput | GroupOrderByWithAggregationInput[]
    by: GroupScalarFieldEnum[] | GroupScalarFieldEnum
    having?: GroupScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GroupCountAggregateInputType | true
    _avg?: GroupAvgAggregateInputType
    _sum?: GroupSumAggregateInputType
    _min?: GroupMinAggregateInputType
    _max?: GroupMaxAggregateInputType
  }

  export type GroupGroupByOutputType = {
    id: number
    name: string
    description: string | null
    created_at: Date
    updated_at: Date
    _count: GroupCountAggregateOutputType | null
    _avg: GroupAvgAggregateOutputType | null
    _sum: GroupSumAggregateOutputType | null
    _min: GroupMinAggregateOutputType | null
    _max: GroupMaxAggregateOutputType | null
  }

  type GetGroupGroupByPayload<T extends GroupGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GroupGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GroupGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GroupGroupByOutputType[P]>
            : GetScalarType<T[P], GroupGroupByOutputType[P]>
        }
      >
    >


  export type GroupSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    created_at?: boolean
    updated_at?: boolean
    users?: boolean | Group$usersArgs<ExtArgs>
    _count?: boolean | GroupCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["group"]>



  export type GroupSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type GroupOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "created_at" | "updated_at", ExtArgs["result"]["group"]>
  export type GroupInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | Group$usersArgs<ExtArgs>
    _count?: boolean | GroupCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $GroupPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Group"
    objects: {
      users: Prisma.$GroupUserPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      description: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["group"]>
    composites: {}
  }

  type GroupGetPayload<S extends boolean | null | undefined | GroupDefaultArgs> = $Result.GetResult<Prisma.$GroupPayload, S>

  type GroupCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GroupFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GroupCountAggregateInputType | true
    }

  export interface GroupDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Group'], meta: { name: 'Group' } }
    /**
     * Find zero or one Group that matches the filter.
     * @param {GroupFindUniqueArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GroupFindUniqueArgs>(args: SelectSubset<T, GroupFindUniqueArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Group that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GroupFindUniqueOrThrowArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GroupFindUniqueOrThrowArgs>(args: SelectSubset<T, GroupFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Group that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupFindFirstArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GroupFindFirstArgs>(args?: SelectSubset<T, GroupFindFirstArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Group that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupFindFirstOrThrowArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GroupFindFirstOrThrowArgs>(args?: SelectSubset<T, GroupFindFirstOrThrowArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Groups that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Groups
     * const groups = await prisma.group.findMany()
     * 
     * // Get first 10 Groups
     * const groups = await prisma.group.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const groupWithIdOnly = await prisma.group.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GroupFindManyArgs>(args?: SelectSubset<T, GroupFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Group.
     * @param {GroupCreateArgs} args - Arguments to create a Group.
     * @example
     * // Create one Group
     * const Group = await prisma.group.create({
     *   data: {
     *     // ... data to create a Group
     *   }
     * })
     * 
     */
    create<T extends GroupCreateArgs>(args: SelectSubset<T, GroupCreateArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Groups.
     * @param {GroupCreateManyArgs} args - Arguments to create many Groups.
     * @example
     * // Create many Groups
     * const group = await prisma.group.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GroupCreateManyArgs>(args?: SelectSubset<T, GroupCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Group.
     * @param {GroupDeleteArgs} args - Arguments to delete one Group.
     * @example
     * // Delete one Group
     * const Group = await prisma.group.delete({
     *   where: {
     *     // ... filter to delete one Group
     *   }
     * })
     * 
     */
    delete<T extends GroupDeleteArgs>(args: SelectSubset<T, GroupDeleteArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Group.
     * @param {GroupUpdateArgs} args - Arguments to update one Group.
     * @example
     * // Update one Group
     * const group = await prisma.group.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GroupUpdateArgs>(args: SelectSubset<T, GroupUpdateArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Groups.
     * @param {GroupDeleteManyArgs} args - Arguments to filter Groups to delete.
     * @example
     * // Delete a few Groups
     * const { count } = await prisma.group.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GroupDeleteManyArgs>(args?: SelectSubset<T, GroupDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Groups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Groups
     * const group = await prisma.group.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GroupUpdateManyArgs>(args: SelectSubset<T, GroupUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Group.
     * @param {GroupUpsertArgs} args - Arguments to update or create a Group.
     * @example
     * // Update or create a Group
     * const group = await prisma.group.upsert({
     *   create: {
     *     // ... data to create a Group
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Group we want to update
     *   }
     * })
     */
    upsert<T extends GroupUpsertArgs>(args: SelectSubset<T, GroupUpsertArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Groups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupCountArgs} args - Arguments to filter Groups to count.
     * @example
     * // Count the number of Groups
     * const count = await prisma.group.count({
     *   where: {
     *     // ... the filter for the Groups we want to count
     *   }
     * })
    **/
    count<T extends GroupCountArgs>(
      args?: Subset<T, GroupCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GroupCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Group.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends GroupAggregateArgs>(args: Subset<T, GroupAggregateArgs>): Prisma.PrismaPromise<GetGroupAggregateType<T>>

    /**
     * Group by Group.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupGroupByArgs} args - Group by arguments.
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
      T extends GroupGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GroupGroupByArgs['orderBy'] }
        : { orderBy?: GroupGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, GroupGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGroupGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Group model
   */
  readonly fields: GroupFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Group.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GroupClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends Group$usersArgs<ExtArgs> = {}>(args?: Subset<T, Group$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupUserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Group model
   */
  interface GroupFieldRefs {
    readonly id: FieldRef<"Group", 'Int'>
    readonly name: FieldRef<"Group", 'String'>
    readonly description: FieldRef<"Group", 'String'>
    readonly created_at: FieldRef<"Group", 'DateTime'>
    readonly updated_at: FieldRef<"Group", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Group findUnique
   */
  export type GroupFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Group to fetch.
     */
    where: GroupWhereUniqueInput
  }

  /**
   * Group findUniqueOrThrow
   */
  export type GroupFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Group to fetch.
     */
    where: GroupWhereUniqueInput
  }

  /**
   * Group findFirst
   */
  export type GroupFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Group to fetch.
     */
    where?: GroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     */
    orderBy?: GroupOrderByWithRelationInput | GroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Groups.
     */
    cursor?: GroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Groups.
     */
    distinct?: GroupScalarFieldEnum | GroupScalarFieldEnum[]
  }

  /**
   * Group findFirstOrThrow
   */
  export type GroupFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Group to fetch.
     */
    where?: GroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     */
    orderBy?: GroupOrderByWithRelationInput | GroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Groups.
     */
    cursor?: GroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Groups.
     */
    distinct?: GroupScalarFieldEnum | GroupScalarFieldEnum[]
  }

  /**
   * Group findMany
   */
  export type GroupFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Groups to fetch.
     */
    where?: GroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     */
    orderBy?: GroupOrderByWithRelationInput | GroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Groups.
     */
    cursor?: GroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     */
    skip?: number
    distinct?: GroupScalarFieldEnum | GroupScalarFieldEnum[]
  }

  /**
   * Group create
   */
  export type GroupCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * The data needed to create a Group.
     */
    data: XOR<GroupCreateInput, GroupUncheckedCreateInput>
  }

  /**
   * Group createMany
   */
  export type GroupCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Groups.
     */
    data: GroupCreateManyInput | GroupCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Group update
   */
  export type GroupUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * The data needed to update a Group.
     */
    data: XOR<GroupUpdateInput, GroupUncheckedUpdateInput>
    /**
     * Choose, which Group to update.
     */
    where: GroupWhereUniqueInput
  }

  /**
   * Group updateMany
   */
  export type GroupUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Groups.
     */
    data: XOR<GroupUpdateManyMutationInput, GroupUncheckedUpdateManyInput>
    /**
     * Filter which Groups to update
     */
    where?: GroupWhereInput
    /**
     * Limit how many Groups to update.
     */
    limit?: number
  }

  /**
   * Group upsert
   */
  export type GroupUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * The filter to search for the Group to update in case it exists.
     */
    where: GroupWhereUniqueInput
    /**
     * In case the Group found by the `where` argument doesn't exist, create a new Group with this data.
     */
    create: XOR<GroupCreateInput, GroupUncheckedCreateInput>
    /**
     * In case the Group was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GroupUpdateInput, GroupUncheckedUpdateInput>
  }

  /**
   * Group delete
   */
  export type GroupDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter which Group to delete.
     */
    where: GroupWhereUniqueInput
  }

  /**
   * Group deleteMany
   */
  export type GroupDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Groups to delete
     */
    where?: GroupWhereInput
    /**
     * Limit how many Groups to delete.
     */
    limit?: number
  }

  /**
   * Group.users
   */
  export type Group$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupUser
     */
    select?: GroupUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupUser
     */
    omit?: GroupUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupUserInclude<ExtArgs> | null
    where?: GroupUserWhereInput
    orderBy?: GroupUserOrderByWithRelationInput | GroupUserOrderByWithRelationInput[]
    cursor?: GroupUserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GroupUserScalarFieldEnum | GroupUserScalarFieldEnum[]
  }

  /**
   * Group without action
   */
  export type GroupDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
  }


  /**
   * Model GroupUser
   */

  export type AggregateGroupUser = {
    _count: GroupUserCountAggregateOutputType | null
    _avg: GroupUserAvgAggregateOutputType | null
    _sum: GroupUserSumAggregateOutputType | null
    _min: GroupUserMinAggregateOutputType | null
    _max: GroupUserMaxAggregateOutputType | null
  }

  export type GroupUserAvgAggregateOutputType = {
    id: number | null
    group_id: number | null
    user_id: number | null
  }

  export type GroupUserSumAggregateOutputType = {
    id: number | null
    group_id: number | null
    user_id: number | null
  }

  export type GroupUserMinAggregateOutputType = {
    id: number | null
    group_id: number | null
    user_id: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type GroupUserMaxAggregateOutputType = {
    id: number | null
    group_id: number | null
    user_id: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type GroupUserCountAggregateOutputType = {
    id: number
    group_id: number
    user_id: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type GroupUserAvgAggregateInputType = {
    id?: true
    group_id?: true
    user_id?: true
  }

  export type GroupUserSumAggregateInputType = {
    id?: true
    group_id?: true
    user_id?: true
  }

  export type GroupUserMinAggregateInputType = {
    id?: true
    group_id?: true
    user_id?: true
    created_at?: true
    updated_at?: true
  }

  export type GroupUserMaxAggregateInputType = {
    id?: true
    group_id?: true
    user_id?: true
    created_at?: true
    updated_at?: true
  }

  export type GroupUserCountAggregateInputType = {
    id?: true
    group_id?: true
    user_id?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type GroupUserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GroupUser to aggregate.
     */
    where?: GroupUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupUsers to fetch.
     */
    orderBy?: GroupUserOrderByWithRelationInput | GroupUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GroupUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GroupUsers
    **/
    _count?: true | GroupUserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GroupUserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GroupUserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GroupUserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GroupUserMaxAggregateInputType
  }

  export type GetGroupUserAggregateType<T extends GroupUserAggregateArgs> = {
        [P in keyof T & keyof AggregateGroupUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGroupUser[P]>
      : GetScalarType<T[P], AggregateGroupUser[P]>
  }




  export type GroupUserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupUserWhereInput
    orderBy?: GroupUserOrderByWithAggregationInput | GroupUserOrderByWithAggregationInput[]
    by: GroupUserScalarFieldEnum[] | GroupUserScalarFieldEnum
    having?: GroupUserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GroupUserCountAggregateInputType | true
    _avg?: GroupUserAvgAggregateInputType
    _sum?: GroupUserSumAggregateInputType
    _min?: GroupUserMinAggregateInputType
    _max?: GroupUserMaxAggregateInputType
  }

  export type GroupUserGroupByOutputType = {
    id: number
    group_id: number
    user_id: number
    created_at: Date
    updated_at: Date
    _count: GroupUserCountAggregateOutputType | null
    _avg: GroupUserAvgAggregateOutputType | null
    _sum: GroupUserSumAggregateOutputType | null
    _min: GroupUserMinAggregateOutputType | null
    _max: GroupUserMaxAggregateOutputType | null
  }

  type GetGroupUserGroupByPayload<T extends GroupUserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GroupUserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GroupUserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GroupUserGroupByOutputType[P]>
            : GetScalarType<T[P], GroupUserGroupByOutputType[P]>
        }
      >
    >


  export type GroupUserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    group_id?: boolean
    user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    group?: boolean | GroupDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["groupUser"]>



  export type GroupUserSelectScalar = {
    id?: boolean
    group_id?: boolean
    user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type GroupUserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "group_id" | "user_id" | "created_at" | "updated_at", ExtArgs["result"]["groupUser"]>
  export type GroupUserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    group?: boolean | GroupDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $GroupUserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GroupUser"
    objects: {
      group: Prisma.$GroupPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      group_id: number
      user_id: number
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["groupUser"]>
    composites: {}
  }

  type GroupUserGetPayload<S extends boolean | null | undefined | GroupUserDefaultArgs> = $Result.GetResult<Prisma.$GroupUserPayload, S>

  type GroupUserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GroupUserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GroupUserCountAggregateInputType | true
    }

  export interface GroupUserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GroupUser'], meta: { name: 'GroupUser' } }
    /**
     * Find zero or one GroupUser that matches the filter.
     * @param {GroupUserFindUniqueArgs} args - Arguments to find a GroupUser
     * @example
     * // Get one GroupUser
     * const groupUser = await prisma.groupUser.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GroupUserFindUniqueArgs>(args: SelectSubset<T, GroupUserFindUniqueArgs<ExtArgs>>): Prisma__GroupUserClient<$Result.GetResult<Prisma.$GroupUserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GroupUser that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GroupUserFindUniqueOrThrowArgs} args - Arguments to find a GroupUser
     * @example
     * // Get one GroupUser
     * const groupUser = await prisma.groupUser.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GroupUserFindUniqueOrThrowArgs>(args: SelectSubset<T, GroupUserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GroupUserClient<$Result.GetResult<Prisma.$GroupUserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GroupUser that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupUserFindFirstArgs} args - Arguments to find a GroupUser
     * @example
     * // Get one GroupUser
     * const groupUser = await prisma.groupUser.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GroupUserFindFirstArgs>(args?: SelectSubset<T, GroupUserFindFirstArgs<ExtArgs>>): Prisma__GroupUserClient<$Result.GetResult<Prisma.$GroupUserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GroupUser that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupUserFindFirstOrThrowArgs} args - Arguments to find a GroupUser
     * @example
     * // Get one GroupUser
     * const groupUser = await prisma.groupUser.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GroupUserFindFirstOrThrowArgs>(args?: SelectSubset<T, GroupUserFindFirstOrThrowArgs<ExtArgs>>): Prisma__GroupUserClient<$Result.GetResult<Prisma.$GroupUserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GroupUsers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupUserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GroupUsers
     * const groupUsers = await prisma.groupUser.findMany()
     * 
     * // Get first 10 GroupUsers
     * const groupUsers = await prisma.groupUser.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const groupUserWithIdOnly = await prisma.groupUser.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GroupUserFindManyArgs>(args?: SelectSubset<T, GroupUserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupUserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GroupUser.
     * @param {GroupUserCreateArgs} args - Arguments to create a GroupUser.
     * @example
     * // Create one GroupUser
     * const GroupUser = await prisma.groupUser.create({
     *   data: {
     *     // ... data to create a GroupUser
     *   }
     * })
     * 
     */
    create<T extends GroupUserCreateArgs>(args: SelectSubset<T, GroupUserCreateArgs<ExtArgs>>): Prisma__GroupUserClient<$Result.GetResult<Prisma.$GroupUserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GroupUsers.
     * @param {GroupUserCreateManyArgs} args - Arguments to create many GroupUsers.
     * @example
     * // Create many GroupUsers
     * const groupUser = await prisma.groupUser.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GroupUserCreateManyArgs>(args?: SelectSubset<T, GroupUserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a GroupUser.
     * @param {GroupUserDeleteArgs} args - Arguments to delete one GroupUser.
     * @example
     * // Delete one GroupUser
     * const GroupUser = await prisma.groupUser.delete({
     *   where: {
     *     // ... filter to delete one GroupUser
     *   }
     * })
     * 
     */
    delete<T extends GroupUserDeleteArgs>(args: SelectSubset<T, GroupUserDeleteArgs<ExtArgs>>): Prisma__GroupUserClient<$Result.GetResult<Prisma.$GroupUserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GroupUser.
     * @param {GroupUserUpdateArgs} args - Arguments to update one GroupUser.
     * @example
     * // Update one GroupUser
     * const groupUser = await prisma.groupUser.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GroupUserUpdateArgs>(args: SelectSubset<T, GroupUserUpdateArgs<ExtArgs>>): Prisma__GroupUserClient<$Result.GetResult<Prisma.$GroupUserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GroupUsers.
     * @param {GroupUserDeleteManyArgs} args - Arguments to filter GroupUsers to delete.
     * @example
     * // Delete a few GroupUsers
     * const { count } = await prisma.groupUser.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GroupUserDeleteManyArgs>(args?: SelectSubset<T, GroupUserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GroupUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupUserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GroupUsers
     * const groupUser = await prisma.groupUser.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GroupUserUpdateManyArgs>(args: SelectSubset<T, GroupUserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one GroupUser.
     * @param {GroupUserUpsertArgs} args - Arguments to update or create a GroupUser.
     * @example
     * // Update or create a GroupUser
     * const groupUser = await prisma.groupUser.upsert({
     *   create: {
     *     // ... data to create a GroupUser
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GroupUser we want to update
     *   }
     * })
     */
    upsert<T extends GroupUserUpsertArgs>(args: SelectSubset<T, GroupUserUpsertArgs<ExtArgs>>): Prisma__GroupUserClient<$Result.GetResult<Prisma.$GroupUserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GroupUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupUserCountArgs} args - Arguments to filter GroupUsers to count.
     * @example
     * // Count the number of GroupUsers
     * const count = await prisma.groupUser.count({
     *   where: {
     *     // ... the filter for the GroupUsers we want to count
     *   }
     * })
    **/
    count<T extends GroupUserCountArgs>(
      args?: Subset<T, GroupUserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GroupUserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GroupUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupUserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends GroupUserAggregateArgs>(args: Subset<T, GroupUserAggregateArgs>): Prisma.PrismaPromise<GetGroupUserAggregateType<T>>

    /**
     * Group by GroupUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupUserGroupByArgs} args - Group by arguments.
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
      T extends GroupUserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GroupUserGroupByArgs['orderBy'] }
        : { orderBy?: GroupUserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, GroupUserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGroupUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GroupUser model
   */
  readonly fields: GroupUserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GroupUser.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GroupUserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    group<T extends GroupDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GroupDefaultArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the GroupUser model
   */
  interface GroupUserFieldRefs {
    readonly id: FieldRef<"GroupUser", 'Int'>
    readonly group_id: FieldRef<"GroupUser", 'Int'>
    readonly user_id: FieldRef<"GroupUser", 'Int'>
    readonly created_at: FieldRef<"GroupUser", 'DateTime'>
    readonly updated_at: FieldRef<"GroupUser", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GroupUser findUnique
   */
  export type GroupUserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupUser
     */
    select?: GroupUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupUser
     */
    omit?: GroupUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupUserInclude<ExtArgs> | null
    /**
     * Filter, which GroupUser to fetch.
     */
    where: GroupUserWhereUniqueInput
  }

  /**
   * GroupUser findUniqueOrThrow
   */
  export type GroupUserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupUser
     */
    select?: GroupUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupUser
     */
    omit?: GroupUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupUserInclude<ExtArgs> | null
    /**
     * Filter, which GroupUser to fetch.
     */
    where: GroupUserWhereUniqueInput
  }

  /**
   * GroupUser findFirst
   */
  export type GroupUserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupUser
     */
    select?: GroupUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupUser
     */
    omit?: GroupUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupUserInclude<ExtArgs> | null
    /**
     * Filter, which GroupUser to fetch.
     */
    where?: GroupUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupUsers to fetch.
     */
    orderBy?: GroupUserOrderByWithRelationInput | GroupUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GroupUsers.
     */
    cursor?: GroupUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GroupUsers.
     */
    distinct?: GroupUserScalarFieldEnum | GroupUserScalarFieldEnum[]
  }

  /**
   * GroupUser findFirstOrThrow
   */
  export type GroupUserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupUser
     */
    select?: GroupUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupUser
     */
    omit?: GroupUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupUserInclude<ExtArgs> | null
    /**
     * Filter, which GroupUser to fetch.
     */
    where?: GroupUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupUsers to fetch.
     */
    orderBy?: GroupUserOrderByWithRelationInput | GroupUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GroupUsers.
     */
    cursor?: GroupUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GroupUsers.
     */
    distinct?: GroupUserScalarFieldEnum | GroupUserScalarFieldEnum[]
  }

  /**
   * GroupUser findMany
   */
  export type GroupUserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupUser
     */
    select?: GroupUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupUser
     */
    omit?: GroupUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupUserInclude<ExtArgs> | null
    /**
     * Filter, which GroupUsers to fetch.
     */
    where?: GroupUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupUsers to fetch.
     */
    orderBy?: GroupUserOrderByWithRelationInput | GroupUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GroupUsers.
     */
    cursor?: GroupUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupUsers.
     */
    skip?: number
    distinct?: GroupUserScalarFieldEnum | GroupUserScalarFieldEnum[]
  }

  /**
   * GroupUser create
   */
  export type GroupUserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupUser
     */
    select?: GroupUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupUser
     */
    omit?: GroupUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupUserInclude<ExtArgs> | null
    /**
     * The data needed to create a GroupUser.
     */
    data: XOR<GroupUserCreateInput, GroupUserUncheckedCreateInput>
  }

  /**
   * GroupUser createMany
   */
  export type GroupUserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GroupUsers.
     */
    data: GroupUserCreateManyInput | GroupUserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GroupUser update
   */
  export type GroupUserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupUser
     */
    select?: GroupUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupUser
     */
    omit?: GroupUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupUserInclude<ExtArgs> | null
    /**
     * The data needed to update a GroupUser.
     */
    data: XOR<GroupUserUpdateInput, GroupUserUncheckedUpdateInput>
    /**
     * Choose, which GroupUser to update.
     */
    where: GroupUserWhereUniqueInput
  }

  /**
   * GroupUser updateMany
   */
  export type GroupUserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GroupUsers.
     */
    data: XOR<GroupUserUpdateManyMutationInput, GroupUserUncheckedUpdateManyInput>
    /**
     * Filter which GroupUsers to update
     */
    where?: GroupUserWhereInput
    /**
     * Limit how many GroupUsers to update.
     */
    limit?: number
  }

  /**
   * GroupUser upsert
   */
  export type GroupUserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupUser
     */
    select?: GroupUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupUser
     */
    omit?: GroupUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupUserInclude<ExtArgs> | null
    /**
     * The filter to search for the GroupUser to update in case it exists.
     */
    where: GroupUserWhereUniqueInput
    /**
     * In case the GroupUser found by the `where` argument doesn't exist, create a new GroupUser with this data.
     */
    create: XOR<GroupUserCreateInput, GroupUserUncheckedCreateInput>
    /**
     * In case the GroupUser was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GroupUserUpdateInput, GroupUserUncheckedUpdateInput>
  }

  /**
   * GroupUser delete
   */
  export type GroupUserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupUser
     */
    select?: GroupUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupUser
     */
    omit?: GroupUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupUserInclude<ExtArgs> | null
    /**
     * Filter which GroupUser to delete.
     */
    where: GroupUserWhereUniqueInput
  }

  /**
   * GroupUser deleteMany
   */
  export type GroupUserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GroupUsers to delete
     */
    where?: GroupUserWhereInput
    /**
     * Limit how many GroupUsers to delete.
     */
    limit?: number
  }

  /**
   * GroupUser without action
   */
  export type GroupUserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupUser
     */
    select?: GroupUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupUser
     */
    omit?: GroupUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupUserInclude<ExtArgs> | null
  }


  /**
   * Model Form
   */

  export type AggregateForm = {
    _count: FormCountAggregateOutputType | null
    _avg: FormAvgAggregateOutputType | null
    _sum: FormSumAggregateOutputType | null
    _min: FormMinAggregateOutputType | null
    _max: FormMaxAggregateOutputType | null
  }

  export type FormAvgAggregateOutputType = {
    id: number | null
    created_by: number | null
  }

  export type FormSumAggregateOutputType = {
    id: number | null
    created_by: number | null
  }

  export type FormMinAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    created_by: number | null
    is_active: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type FormMaxAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    created_by: number | null
    is_active: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type FormCountAggregateOutputType = {
    id: number
    name: number
    description: number
    created_by: number
    is_active: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type FormAvgAggregateInputType = {
    id?: true
    created_by?: true
  }

  export type FormSumAggregateInputType = {
    id?: true
    created_by?: true
  }

  export type FormMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    created_by?: true
    is_active?: true
    created_at?: true
    updated_at?: true
  }

  export type FormMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    created_by?: true
    is_active?: true
    created_at?: true
    updated_at?: true
  }

  export type FormCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    created_by?: true
    is_active?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type FormAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Form to aggregate.
     */
    where?: FormWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Forms to fetch.
     */
    orderBy?: FormOrderByWithRelationInput | FormOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FormWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Forms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Forms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Forms
    **/
    _count?: true | FormCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FormAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FormSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FormMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FormMaxAggregateInputType
  }

  export type GetFormAggregateType<T extends FormAggregateArgs> = {
        [P in keyof T & keyof AggregateForm]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateForm[P]>
      : GetScalarType<T[P], AggregateForm[P]>
  }




  export type FormGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FormWhereInput
    orderBy?: FormOrderByWithAggregationInput | FormOrderByWithAggregationInput[]
    by: FormScalarFieldEnum[] | FormScalarFieldEnum
    having?: FormScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FormCountAggregateInputType | true
    _avg?: FormAvgAggregateInputType
    _sum?: FormSumAggregateInputType
    _min?: FormMinAggregateInputType
    _max?: FormMaxAggregateInputType
  }

  export type FormGroupByOutputType = {
    id: number
    name: string
    description: string | null
    created_by: number | null
    is_active: boolean
    created_at: Date
    updated_at: Date
    _count: FormCountAggregateOutputType | null
    _avg: FormAvgAggregateOutputType | null
    _sum: FormSumAggregateOutputType | null
    _min: FormMinAggregateOutputType | null
    _max: FormMaxAggregateOutputType | null
  }

  type GetFormGroupByPayload<T extends FormGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FormGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FormGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FormGroupByOutputType[P]>
            : GetScalarType<T[P], FormGroupByOutputType[P]>
        }
      >
    >


  export type FormSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    created_by?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
    creator?: boolean | Form$creatorArgs<ExtArgs>
    access?: boolean | Form$accessArgs<ExtArgs>
    fields?: boolean | Form$fieldsArgs<ExtArgs>
    responses?: boolean | Form$responsesArgs<ExtArgs>
    _count?: boolean | FormCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["form"]>



  export type FormSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    created_by?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type FormOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "created_by" | "is_active" | "created_at" | "updated_at", ExtArgs["result"]["form"]>
  export type FormInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | Form$creatorArgs<ExtArgs>
    access?: boolean | Form$accessArgs<ExtArgs>
    fields?: boolean | Form$fieldsArgs<ExtArgs>
    responses?: boolean | Form$responsesArgs<ExtArgs>
    _count?: boolean | FormCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $FormPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Form"
    objects: {
      creator: Prisma.$UserPayload<ExtArgs> | null
      access: Prisma.$FormAccessPayload<ExtArgs>[]
      fields: Prisma.$FormFieldPayload<ExtArgs>[]
      responses: Prisma.$FormResponsePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      description: string | null
      created_by: number | null
      is_active: boolean
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["form"]>
    composites: {}
  }

  type FormGetPayload<S extends boolean | null | undefined | FormDefaultArgs> = $Result.GetResult<Prisma.$FormPayload, S>

  type FormCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FormFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FormCountAggregateInputType | true
    }

  export interface FormDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Form'], meta: { name: 'Form' } }
    /**
     * Find zero or one Form that matches the filter.
     * @param {FormFindUniqueArgs} args - Arguments to find a Form
     * @example
     * // Get one Form
     * const form = await prisma.form.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FormFindUniqueArgs>(args: SelectSubset<T, FormFindUniqueArgs<ExtArgs>>): Prisma__FormClient<$Result.GetResult<Prisma.$FormPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Form that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FormFindUniqueOrThrowArgs} args - Arguments to find a Form
     * @example
     * // Get one Form
     * const form = await prisma.form.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FormFindUniqueOrThrowArgs>(args: SelectSubset<T, FormFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FormClient<$Result.GetResult<Prisma.$FormPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Form that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormFindFirstArgs} args - Arguments to find a Form
     * @example
     * // Get one Form
     * const form = await prisma.form.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FormFindFirstArgs>(args?: SelectSubset<T, FormFindFirstArgs<ExtArgs>>): Prisma__FormClient<$Result.GetResult<Prisma.$FormPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Form that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormFindFirstOrThrowArgs} args - Arguments to find a Form
     * @example
     * // Get one Form
     * const form = await prisma.form.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FormFindFirstOrThrowArgs>(args?: SelectSubset<T, FormFindFirstOrThrowArgs<ExtArgs>>): Prisma__FormClient<$Result.GetResult<Prisma.$FormPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Forms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Forms
     * const forms = await prisma.form.findMany()
     * 
     * // Get first 10 Forms
     * const forms = await prisma.form.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const formWithIdOnly = await prisma.form.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FormFindManyArgs>(args?: SelectSubset<T, FormFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FormPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Form.
     * @param {FormCreateArgs} args - Arguments to create a Form.
     * @example
     * // Create one Form
     * const Form = await prisma.form.create({
     *   data: {
     *     // ... data to create a Form
     *   }
     * })
     * 
     */
    create<T extends FormCreateArgs>(args: SelectSubset<T, FormCreateArgs<ExtArgs>>): Prisma__FormClient<$Result.GetResult<Prisma.$FormPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Forms.
     * @param {FormCreateManyArgs} args - Arguments to create many Forms.
     * @example
     * // Create many Forms
     * const form = await prisma.form.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FormCreateManyArgs>(args?: SelectSubset<T, FormCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Form.
     * @param {FormDeleteArgs} args - Arguments to delete one Form.
     * @example
     * // Delete one Form
     * const Form = await prisma.form.delete({
     *   where: {
     *     // ... filter to delete one Form
     *   }
     * })
     * 
     */
    delete<T extends FormDeleteArgs>(args: SelectSubset<T, FormDeleteArgs<ExtArgs>>): Prisma__FormClient<$Result.GetResult<Prisma.$FormPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Form.
     * @param {FormUpdateArgs} args - Arguments to update one Form.
     * @example
     * // Update one Form
     * const form = await prisma.form.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FormUpdateArgs>(args: SelectSubset<T, FormUpdateArgs<ExtArgs>>): Prisma__FormClient<$Result.GetResult<Prisma.$FormPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Forms.
     * @param {FormDeleteManyArgs} args - Arguments to filter Forms to delete.
     * @example
     * // Delete a few Forms
     * const { count } = await prisma.form.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FormDeleteManyArgs>(args?: SelectSubset<T, FormDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Forms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Forms
     * const form = await prisma.form.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FormUpdateManyArgs>(args: SelectSubset<T, FormUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Form.
     * @param {FormUpsertArgs} args - Arguments to update or create a Form.
     * @example
     * // Update or create a Form
     * const form = await prisma.form.upsert({
     *   create: {
     *     // ... data to create a Form
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Form we want to update
     *   }
     * })
     */
    upsert<T extends FormUpsertArgs>(args: SelectSubset<T, FormUpsertArgs<ExtArgs>>): Prisma__FormClient<$Result.GetResult<Prisma.$FormPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Forms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormCountArgs} args - Arguments to filter Forms to count.
     * @example
     * // Count the number of Forms
     * const count = await prisma.form.count({
     *   where: {
     *     // ... the filter for the Forms we want to count
     *   }
     * })
    **/
    count<T extends FormCountArgs>(
      args?: Subset<T, FormCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FormCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Form.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FormAggregateArgs>(args: Subset<T, FormAggregateArgs>): Prisma.PrismaPromise<GetFormAggregateType<T>>

    /**
     * Group by Form.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormGroupByArgs} args - Group by arguments.
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
      T extends FormGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FormGroupByArgs['orderBy'] }
        : { orderBy?: FormGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, FormGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFormGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Form model
   */
  readonly fields: FormFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Form.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FormClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    creator<T extends Form$creatorArgs<ExtArgs> = {}>(args?: Subset<T, Form$creatorArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    access<T extends Form$accessArgs<ExtArgs> = {}>(args?: Subset<T, Form$accessArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FormAccessPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    fields<T extends Form$fieldsArgs<ExtArgs> = {}>(args?: Subset<T, Form$fieldsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FormFieldPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    responses<T extends Form$responsesArgs<ExtArgs> = {}>(args?: Subset<T, Form$responsesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FormResponsePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Form model
   */
  interface FormFieldRefs {
    readonly id: FieldRef<"Form", 'Int'>
    readonly name: FieldRef<"Form", 'String'>
    readonly description: FieldRef<"Form", 'String'>
    readonly created_by: FieldRef<"Form", 'Int'>
    readonly is_active: FieldRef<"Form", 'Boolean'>
    readonly created_at: FieldRef<"Form", 'DateTime'>
    readonly updated_at: FieldRef<"Form", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Form findUnique
   */
  export type FormFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Form
     */
    select?: FormSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Form
     */
    omit?: FormOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormInclude<ExtArgs> | null
    /**
     * Filter, which Form to fetch.
     */
    where: FormWhereUniqueInput
  }

  /**
   * Form findUniqueOrThrow
   */
  export type FormFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Form
     */
    select?: FormSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Form
     */
    omit?: FormOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormInclude<ExtArgs> | null
    /**
     * Filter, which Form to fetch.
     */
    where: FormWhereUniqueInput
  }

  /**
   * Form findFirst
   */
  export type FormFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Form
     */
    select?: FormSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Form
     */
    omit?: FormOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormInclude<ExtArgs> | null
    /**
     * Filter, which Form to fetch.
     */
    where?: FormWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Forms to fetch.
     */
    orderBy?: FormOrderByWithRelationInput | FormOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Forms.
     */
    cursor?: FormWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Forms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Forms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Forms.
     */
    distinct?: FormScalarFieldEnum | FormScalarFieldEnum[]
  }

  /**
   * Form findFirstOrThrow
   */
  export type FormFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Form
     */
    select?: FormSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Form
     */
    omit?: FormOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormInclude<ExtArgs> | null
    /**
     * Filter, which Form to fetch.
     */
    where?: FormWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Forms to fetch.
     */
    orderBy?: FormOrderByWithRelationInput | FormOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Forms.
     */
    cursor?: FormWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Forms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Forms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Forms.
     */
    distinct?: FormScalarFieldEnum | FormScalarFieldEnum[]
  }

  /**
   * Form findMany
   */
  export type FormFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Form
     */
    select?: FormSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Form
     */
    omit?: FormOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormInclude<ExtArgs> | null
    /**
     * Filter, which Forms to fetch.
     */
    where?: FormWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Forms to fetch.
     */
    orderBy?: FormOrderByWithRelationInput | FormOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Forms.
     */
    cursor?: FormWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Forms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Forms.
     */
    skip?: number
    distinct?: FormScalarFieldEnum | FormScalarFieldEnum[]
  }

  /**
   * Form create
   */
  export type FormCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Form
     */
    select?: FormSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Form
     */
    omit?: FormOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormInclude<ExtArgs> | null
    /**
     * The data needed to create a Form.
     */
    data: XOR<FormCreateInput, FormUncheckedCreateInput>
  }

  /**
   * Form createMany
   */
  export type FormCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Forms.
     */
    data: FormCreateManyInput | FormCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Form update
   */
  export type FormUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Form
     */
    select?: FormSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Form
     */
    omit?: FormOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormInclude<ExtArgs> | null
    /**
     * The data needed to update a Form.
     */
    data: XOR<FormUpdateInput, FormUncheckedUpdateInput>
    /**
     * Choose, which Form to update.
     */
    where: FormWhereUniqueInput
  }

  /**
   * Form updateMany
   */
  export type FormUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Forms.
     */
    data: XOR<FormUpdateManyMutationInput, FormUncheckedUpdateManyInput>
    /**
     * Filter which Forms to update
     */
    where?: FormWhereInput
    /**
     * Limit how many Forms to update.
     */
    limit?: number
  }

  /**
   * Form upsert
   */
  export type FormUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Form
     */
    select?: FormSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Form
     */
    omit?: FormOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormInclude<ExtArgs> | null
    /**
     * The filter to search for the Form to update in case it exists.
     */
    where: FormWhereUniqueInput
    /**
     * In case the Form found by the `where` argument doesn't exist, create a new Form with this data.
     */
    create: XOR<FormCreateInput, FormUncheckedCreateInput>
    /**
     * In case the Form was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FormUpdateInput, FormUncheckedUpdateInput>
  }

  /**
   * Form delete
   */
  export type FormDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Form
     */
    select?: FormSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Form
     */
    omit?: FormOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormInclude<ExtArgs> | null
    /**
     * Filter which Form to delete.
     */
    where: FormWhereUniqueInput
  }

  /**
   * Form deleteMany
   */
  export type FormDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Forms to delete
     */
    where?: FormWhereInput
    /**
     * Limit how many Forms to delete.
     */
    limit?: number
  }

  /**
   * Form.creator
   */
  export type Form$creatorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * Form.access
   */
  export type Form$accessArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormAccess
     */
    select?: FormAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormAccess
     */
    omit?: FormAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormAccessInclude<ExtArgs> | null
    where?: FormAccessWhereInput
    orderBy?: FormAccessOrderByWithRelationInput | FormAccessOrderByWithRelationInput[]
    cursor?: FormAccessWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FormAccessScalarFieldEnum | FormAccessScalarFieldEnum[]
  }

  /**
   * Form.fields
   */
  export type Form$fieldsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormField
     */
    select?: FormFieldSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormField
     */
    omit?: FormFieldOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormFieldInclude<ExtArgs> | null
    where?: FormFieldWhereInput
    orderBy?: FormFieldOrderByWithRelationInput | FormFieldOrderByWithRelationInput[]
    cursor?: FormFieldWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FormFieldScalarFieldEnum | FormFieldScalarFieldEnum[]
  }

  /**
   * Form.responses
   */
  export type Form$responsesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormResponse
     */
    select?: FormResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormResponse
     */
    omit?: FormResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormResponseInclude<ExtArgs> | null
    where?: FormResponseWhereInput
    orderBy?: FormResponseOrderByWithRelationInput | FormResponseOrderByWithRelationInput[]
    cursor?: FormResponseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FormResponseScalarFieldEnum | FormResponseScalarFieldEnum[]
  }

  /**
   * Form without action
   */
  export type FormDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Form
     */
    select?: FormSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Form
     */
    omit?: FormOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormInclude<ExtArgs> | null
  }


  /**
   * Model FormAccess
   */

  export type AggregateFormAccess = {
    _count: FormAccessCountAggregateOutputType | null
    _avg: FormAccessAvgAggregateOutputType | null
    _sum: FormAccessSumAggregateOutputType | null
    _min: FormAccessMinAggregateOutputType | null
    _max: FormAccessMaxAggregateOutputType | null
  }

  export type FormAccessAvgAggregateOutputType = {
    id: number | null
    form_id: number | null
  }

  export type FormAccessSumAggregateOutputType = {
    id: number | null
    form_id: number | null
  }

  export type FormAccessMinAggregateOutputType = {
    id: number | null
    form_id: number | null
    access_type: $Enums.AccessType | null
    access_value: string | null
    expires_at: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type FormAccessMaxAggregateOutputType = {
    id: number | null
    form_id: number | null
    access_type: $Enums.AccessType | null
    access_value: string | null
    expires_at: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type FormAccessCountAggregateOutputType = {
    id: number
    form_id: number
    access_type: number
    access_value: number
    expires_at: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type FormAccessAvgAggregateInputType = {
    id?: true
    form_id?: true
  }

  export type FormAccessSumAggregateInputType = {
    id?: true
    form_id?: true
  }

  export type FormAccessMinAggregateInputType = {
    id?: true
    form_id?: true
    access_type?: true
    access_value?: true
    expires_at?: true
    created_at?: true
    updated_at?: true
  }

  export type FormAccessMaxAggregateInputType = {
    id?: true
    form_id?: true
    access_type?: true
    access_value?: true
    expires_at?: true
    created_at?: true
    updated_at?: true
  }

  export type FormAccessCountAggregateInputType = {
    id?: true
    form_id?: true
    access_type?: true
    access_value?: true
    expires_at?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type FormAccessAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FormAccess to aggregate.
     */
    where?: FormAccessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FormAccesses to fetch.
     */
    orderBy?: FormAccessOrderByWithRelationInput | FormAccessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FormAccessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FormAccesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FormAccesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FormAccesses
    **/
    _count?: true | FormAccessCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FormAccessAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FormAccessSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FormAccessMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FormAccessMaxAggregateInputType
  }

  export type GetFormAccessAggregateType<T extends FormAccessAggregateArgs> = {
        [P in keyof T & keyof AggregateFormAccess]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFormAccess[P]>
      : GetScalarType<T[P], AggregateFormAccess[P]>
  }




  export type FormAccessGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FormAccessWhereInput
    orderBy?: FormAccessOrderByWithAggregationInput | FormAccessOrderByWithAggregationInput[]
    by: FormAccessScalarFieldEnum[] | FormAccessScalarFieldEnum
    having?: FormAccessScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FormAccessCountAggregateInputType | true
    _avg?: FormAccessAvgAggregateInputType
    _sum?: FormAccessSumAggregateInputType
    _min?: FormAccessMinAggregateInputType
    _max?: FormAccessMaxAggregateInputType
  }

  export type FormAccessGroupByOutputType = {
    id: number
    form_id: number
    access_type: $Enums.AccessType
    access_value: string
    expires_at: Date | null
    created_at: Date
    updated_at: Date
    _count: FormAccessCountAggregateOutputType | null
    _avg: FormAccessAvgAggregateOutputType | null
    _sum: FormAccessSumAggregateOutputType | null
    _min: FormAccessMinAggregateOutputType | null
    _max: FormAccessMaxAggregateOutputType | null
  }

  type GetFormAccessGroupByPayload<T extends FormAccessGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FormAccessGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FormAccessGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FormAccessGroupByOutputType[P]>
            : GetScalarType<T[P], FormAccessGroupByOutputType[P]>
        }
      >
    >


  export type FormAccessSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    form_id?: boolean
    access_type?: boolean
    access_value?: boolean
    expires_at?: boolean
    created_at?: boolean
    updated_at?: boolean
    form?: boolean | FormDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["formAccess"]>



  export type FormAccessSelectScalar = {
    id?: boolean
    form_id?: boolean
    access_type?: boolean
    access_value?: boolean
    expires_at?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type FormAccessOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "form_id" | "access_type" | "access_value" | "expires_at" | "created_at" | "updated_at", ExtArgs["result"]["formAccess"]>
  export type FormAccessInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    form?: boolean | FormDefaultArgs<ExtArgs>
  }

  export type $FormAccessPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FormAccess"
    objects: {
      form: Prisma.$FormPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      form_id: number
      access_type: $Enums.AccessType
      access_value: string
      expires_at: Date | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["formAccess"]>
    composites: {}
  }

  type FormAccessGetPayload<S extends boolean | null | undefined | FormAccessDefaultArgs> = $Result.GetResult<Prisma.$FormAccessPayload, S>

  type FormAccessCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FormAccessFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FormAccessCountAggregateInputType | true
    }

  export interface FormAccessDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FormAccess'], meta: { name: 'FormAccess' } }
    /**
     * Find zero or one FormAccess that matches the filter.
     * @param {FormAccessFindUniqueArgs} args - Arguments to find a FormAccess
     * @example
     * // Get one FormAccess
     * const formAccess = await prisma.formAccess.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FormAccessFindUniqueArgs>(args: SelectSubset<T, FormAccessFindUniqueArgs<ExtArgs>>): Prisma__FormAccessClient<$Result.GetResult<Prisma.$FormAccessPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FormAccess that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FormAccessFindUniqueOrThrowArgs} args - Arguments to find a FormAccess
     * @example
     * // Get one FormAccess
     * const formAccess = await prisma.formAccess.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FormAccessFindUniqueOrThrowArgs>(args: SelectSubset<T, FormAccessFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FormAccessClient<$Result.GetResult<Prisma.$FormAccessPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FormAccess that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormAccessFindFirstArgs} args - Arguments to find a FormAccess
     * @example
     * // Get one FormAccess
     * const formAccess = await prisma.formAccess.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FormAccessFindFirstArgs>(args?: SelectSubset<T, FormAccessFindFirstArgs<ExtArgs>>): Prisma__FormAccessClient<$Result.GetResult<Prisma.$FormAccessPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FormAccess that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormAccessFindFirstOrThrowArgs} args - Arguments to find a FormAccess
     * @example
     * // Get one FormAccess
     * const formAccess = await prisma.formAccess.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FormAccessFindFirstOrThrowArgs>(args?: SelectSubset<T, FormAccessFindFirstOrThrowArgs<ExtArgs>>): Prisma__FormAccessClient<$Result.GetResult<Prisma.$FormAccessPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FormAccesses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormAccessFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FormAccesses
     * const formAccesses = await prisma.formAccess.findMany()
     * 
     * // Get first 10 FormAccesses
     * const formAccesses = await prisma.formAccess.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const formAccessWithIdOnly = await prisma.formAccess.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FormAccessFindManyArgs>(args?: SelectSubset<T, FormAccessFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FormAccessPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FormAccess.
     * @param {FormAccessCreateArgs} args - Arguments to create a FormAccess.
     * @example
     * // Create one FormAccess
     * const FormAccess = await prisma.formAccess.create({
     *   data: {
     *     // ... data to create a FormAccess
     *   }
     * })
     * 
     */
    create<T extends FormAccessCreateArgs>(args: SelectSubset<T, FormAccessCreateArgs<ExtArgs>>): Prisma__FormAccessClient<$Result.GetResult<Prisma.$FormAccessPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FormAccesses.
     * @param {FormAccessCreateManyArgs} args - Arguments to create many FormAccesses.
     * @example
     * // Create many FormAccesses
     * const formAccess = await prisma.formAccess.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FormAccessCreateManyArgs>(args?: SelectSubset<T, FormAccessCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a FormAccess.
     * @param {FormAccessDeleteArgs} args - Arguments to delete one FormAccess.
     * @example
     * // Delete one FormAccess
     * const FormAccess = await prisma.formAccess.delete({
     *   where: {
     *     // ... filter to delete one FormAccess
     *   }
     * })
     * 
     */
    delete<T extends FormAccessDeleteArgs>(args: SelectSubset<T, FormAccessDeleteArgs<ExtArgs>>): Prisma__FormAccessClient<$Result.GetResult<Prisma.$FormAccessPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FormAccess.
     * @param {FormAccessUpdateArgs} args - Arguments to update one FormAccess.
     * @example
     * // Update one FormAccess
     * const formAccess = await prisma.formAccess.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FormAccessUpdateArgs>(args: SelectSubset<T, FormAccessUpdateArgs<ExtArgs>>): Prisma__FormAccessClient<$Result.GetResult<Prisma.$FormAccessPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FormAccesses.
     * @param {FormAccessDeleteManyArgs} args - Arguments to filter FormAccesses to delete.
     * @example
     * // Delete a few FormAccesses
     * const { count } = await prisma.formAccess.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FormAccessDeleteManyArgs>(args?: SelectSubset<T, FormAccessDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FormAccesses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormAccessUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FormAccesses
     * const formAccess = await prisma.formAccess.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FormAccessUpdateManyArgs>(args: SelectSubset<T, FormAccessUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one FormAccess.
     * @param {FormAccessUpsertArgs} args - Arguments to update or create a FormAccess.
     * @example
     * // Update or create a FormAccess
     * const formAccess = await prisma.formAccess.upsert({
     *   create: {
     *     // ... data to create a FormAccess
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FormAccess we want to update
     *   }
     * })
     */
    upsert<T extends FormAccessUpsertArgs>(args: SelectSubset<T, FormAccessUpsertArgs<ExtArgs>>): Prisma__FormAccessClient<$Result.GetResult<Prisma.$FormAccessPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FormAccesses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormAccessCountArgs} args - Arguments to filter FormAccesses to count.
     * @example
     * // Count the number of FormAccesses
     * const count = await prisma.formAccess.count({
     *   where: {
     *     // ... the filter for the FormAccesses we want to count
     *   }
     * })
    **/
    count<T extends FormAccessCountArgs>(
      args?: Subset<T, FormAccessCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FormAccessCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FormAccess.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormAccessAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FormAccessAggregateArgs>(args: Subset<T, FormAccessAggregateArgs>): Prisma.PrismaPromise<GetFormAccessAggregateType<T>>

    /**
     * Group by FormAccess.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormAccessGroupByArgs} args - Group by arguments.
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
      T extends FormAccessGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FormAccessGroupByArgs['orderBy'] }
        : { orderBy?: FormAccessGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, FormAccessGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFormAccessGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FormAccess model
   */
  readonly fields: FormAccessFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FormAccess.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FormAccessClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    form<T extends FormDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FormDefaultArgs<ExtArgs>>): Prisma__FormClient<$Result.GetResult<Prisma.$FormPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the FormAccess model
   */
  interface FormAccessFieldRefs {
    readonly id: FieldRef<"FormAccess", 'Int'>
    readonly form_id: FieldRef<"FormAccess", 'Int'>
    readonly access_type: FieldRef<"FormAccess", 'AccessType'>
    readonly access_value: FieldRef<"FormAccess", 'String'>
    readonly expires_at: FieldRef<"FormAccess", 'DateTime'>
    readonly created_at: FieldRef<"FormAccess", 'DateTime'>
    readonly updated_at: FieldRef<"FormAccess", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FormAccess findUnique
   */
  export type FormAccessFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormAccess
     */
    select?: FormAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormAccess
     */
    omit?: FormAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormAccessInclude<ExtArgs> | null
    /**
     * Filter, which FormAccess to fetch.
     */
    where: FormAccessWhereUniqueInput
  }

  /**
   * FormAccess findUniqueOrThrow
   */
  export type FormAccessFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormAccess
     */
    select?: FormAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormAccess
     */
    omit?: FormAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormAccessInclude<ExtArgs> | null
    /**
     * Filter, which FormAccess to fetch.
     */
    where: FormAccessWhereUniqueInput
  }

  /**
   * FormAccess findFirst
   */
  export type FormAccessFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormAccess
     */
    select?: FormAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormAccess
     */
    omit?: FormAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormAccessInclude<ExtArgs> | null
    /**
     * Filter, which FormAccess to fetch.
     */
    where?: FormAccessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FormAccesses to fetch.
     */
    orderBy?: FormAccessOrderByWithRelationInput | FormAccessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FormAccesses.
     */
    cursor?: FormAccessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FormAccesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FormAccesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FormAccesses.
     */
    distinct?: FormAccessScalarFieldEnum | FormAccessScalarFieldEnum[]
  }

  /**
   * FormAccess findFirstOrThrow
   */
  export type FormAccessFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormAccess
     */
    select?: FormAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormAccess
     */
    omit?: FormAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormAccessInclude<ExtArgs> | null
    /**
     * Filter, which FormAccess to fetch.
     */
    where?: FormAccessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FormAccesses to fetch.
     */
    orderBy?: FormAccessOrderByWithRelationInput | FormAccessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FormAccesses.
     */
    cursor?: FormAccessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FormAccesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FormAccesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FormAccesses.
     */
    distinct?: FormAccessScalarFieldEnum | FormAccessScalarFieldEnum[]
  }

  /**
   * FormAccess findMany
   */
  export type FormAccessFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormAccess
     */
    select?: FormAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormAccess
     */
    omit?: FormAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormAccessInclude<ExtArgs> | null
    /**
     * Filter, which FormAccesses to fetch.
     */
    where?: FormAccessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FormAccesses to fetch.
     */
    orderBy?: FormAccessOrderByWithRelationInput | FormAccessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FormAccesses.
     */
    cursor?: FormAccessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FormAccesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FormAccesses.
     */
    skip?: number
    distinct?: FormAccessScalarFieldEnum | FormAccessScalarFieldEnum[]
  }

  /**
   * FormAccess create
   */
  export type FormAccessCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormAccess
     */
    select?: FormAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormAccess
     */
    omit?: FormAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormAccessInclude<ExtArgs> | null
    /**
     * The data needed to create a FormAccess.
     */
    data: XOR<FormAccessCreateInput, FormAccessUncheckedCreateInput>
  }

  /**
   * FormAccess createMany
   */
  export type FormAccessCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FormAccesses.
     */
    data: FormAccessCreateManyInput | FormAccessCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FormAccess update
   */
  export type FormAccessUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormAccess
     */
    select?: FormAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormAccess
     */
    omit?: FormAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormAccessInclude<ExtArgs> | null
    /**
     * The data needed to update a FormAccess.
     */
    data: XOR<FormAccessUpdateInput, FormAccessUncheckedUpdateInput>
    /**
     * Choose, which FormAccess to update.
     */
    where: FormAccessWhereUniqueInput
  }

  /**
   * FormAccess updateMany
   */
  export type FormAccessUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FormAccesses.
     */
    data: XOR<FormAccessUpdateManyMutationInput, FormAccessUncheckedUpdateManyInput>
    /**
     * Filter which FormAccesses to update
     */
    where?: FormAccessWhereInput
    /**
     * Limit how many FormAccesses to update.
     */
    limit?: number
  }

  /**
   * FormAccess upsert
   */
  export type FormAccessUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormAccess
     */
    select?: FormAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormAccess
     */
    omit?: FormAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormAccessInclude<ExtArgs> | null
    /**
     * The filter to search for the FormAccess to update in case it exists.
     */
    where: FormAccessWhereUniqueInput
    /**
     * In case the FormAccess found by the `where` argument doesn't exist, create a new FormAccess with this data.
     */
    create: XOR<FormAccessCreateInput, FormAccessUncheckedCreateInput>
    /**
     * In case the FormAccess was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FormAccessUpdateInput, FormAccessUncheckedUpdateInput>
  }

  /**
   * FormAccess delete
   */
  export type FormAccessDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormAccess
     */
    select?: FormAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormAccess
     */
    omit?: FormAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormAccessInclude<ExtArgs> | null
    /**
     * Filter which FormAccess to delete.
     */
    where: FormAccessWhereUniqueInput
  }

  /**
   * FormAccess deleteMany
   */
  export type FormAccessDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FormAccesses to delete
     */
    where?: FormAccessWhereInput
    /**
     * Limit how many FormAccesses to delete.
     */
    limit?: number
  }

  /**
   * FormAccess without action
   */
  export type FormAccessDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormAccess
     */
    select?: FormAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormAccess
     */
    omit?: FormAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormAccessInclude<ExtArgs> | null
  }


  /**
   * Model FormField
   */

  export type AggregateFormField = {
    _count: FormFieldCountAggregateOutputType | null
    _avg: FormFieldAvgAggregateOutputType | null
    _sum: FormFieldSumAggregateOutputType | null
    _min: FormFieldMinAggregateOutputType | null
    _max: FormFieldMaxAggregateOutputType | null
  }

  export type FormFieldAvgAggregateOutputType = {
    id: number | null
    form_id: number | null
    field_order: number | null
  }

  export type FormFieldSumAggregateOutputType = {
    id: number | null
    form_id: number | null
    field_order: number | null
  }

  export type FormFieldMinAggregateOutputType = {
    id: number | null
    form_id: number | null
    field_key: string | null
    label: string | null
    field_type: $Enums.FieldType | null
    mode: $Enums.FieldMode | null
    is_required: boolean | null
    field_order: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type FormFieldMaxAggregateOutputType = {
    id: number | null
    form_id: number | null
    field_key: string | null
    label: string | null
    field_type: $Enums.FieldType | null
    mode: $Enums.FieldMode | null
    is_required: boolean | null
    field_order: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type FormFieldCountAggregateOutputType = {
    id: number
    form_id: number
    field_key: number
    label: number
    field_type: number
    mode: number
    is_required: number
    field_order: number
    settings: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type FormFieldAvgAggregateInputType = {
    id?: true
    form_id?: true
    field_order?: true
  }

  export type FormFieldSumAggregateInputType = {
    id?: true
    form_id?: true
    field_order?: true
  }

  export type FormFieldMinAggregateInputType = {
    id?: true
    form_id?: true
    field_key?: true
    label?: true
    field_type?: true
    mode?: true
    is_required?: true
    field_order?: true
    created_at?: true
    updated_at?: true
  }

  export type FormFieldMaxAggregateInputType = {
    id?: true
    form_id?: true
    field_key?: true
    label?: true
    field_type?: true
    mode?: true
    is_required?: true
    field_order?: true
    created_at?: true
    updated_at?: true
  }

  export type FormFieldCountAggregateInputType = {
    id?: true
    form_id?: true
    field_key?: true
    label?: true
    field_type?: true
    mode?: true
    is_required?: true
    field_order?: true
    settings?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type FormFieldAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FormField to aggregate.
     */
    where?: FormFieldWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FormFields to fetch.
     */
    orderBy?: FormFieldOrderByWithRelationInput | FormFieldOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FormFieldWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FormFields from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FormFields.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FormFields
    **/
    _count?: true | FormFieldCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FormFieldAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FormFieldSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FormFieldMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FormFieldMaxAggregateInputType
  }

  export type GetFormFieldAggregateType<T extends FormFieldAggregateArgs> = {
        [P in keyof T & keyof AggregateFormField]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFormField[P]>
      : GetScalarType<T[P], AggregateFormField[P]>
  }




  export type FormFieldGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FormFieldWhereInput
    orderBy?: FormFieldOrderByWithAggregationInput | FormFieldOrderByWithAggregationInput[]
    by: FormFieldScalarFieldEnum[] | FormFieldScalarFieldEnum
    having?: FormFieldScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FormFieldCountAggregateInputType | true
    _avg?: FormFieldAvgAggregateInputType
    _sum?: FormFieldSumAggregateInputType
    _min?: FormFieldMinAggregateInputType
    _max?: FormFieldMaxAggregateInputType
  }

  export type FormFieldGroupByOutputType = {
    id: number
    form_id: number
    field_key: string
    label: string
    field_type: $Enums.FieldType
    mode: $Enums.FieldMode
    is_required: boolean
    field_order: number
    settings: JsonValue | null
    created_at: Date
    updated_at: Date
    _count: FormFieldCountAggregateOutputType | null
    _avg: FormFieldAvgAggregateOutputType | null
    _sum: FormFieldSumAggregateOutputType | null
    _min: FormFieldMinAggregateOutputType | null
    _max: FormFieldMaxAggregateOutputType | null
  }

  type GetFormFieldGroupByPayload<T extends FormFieldGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FormFieldGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FormFieldGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FormFieldGroupByOutputType[P]>
            : GetScalarType<T[P], FormFieldGroupByOutputType[P]>
        }
      >
    >


  export type FormFieldSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    form_id?: boolean
    field_key?: boolean
    label?: boolean
    field_type?: boolean
    mode?: boolean
    is_required?: boolean
    field_order?: boolean
    settings?: boolean
    created_at?: boolean
    updated_at?: boolean
    form?: boolean | FormDefaultArgs<ExtArgs>
    options?: boolean | FormField$optionsArgs<ExtArgs>
    tableSource?: boolean | FormField$tableSourceArgs<ExtArgs>
    values?: boolean | FormField$valuesArgs<ExtArgs>
    _count?: boolean | FormFieldCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["formField"]>



  export type FormFieldSelectScalar = {
    id?: boolean
    form_id?: boolean
    field_key?: boolean
    label?: boolean
    field_type?: boolean
    mode?: boolean
    is_required?: boolean
    field_order?: boolean
    settings?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type FormFieldOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "form_id" | "field_key" | "label" | "field_type" | "mode" | "is_required" | "field_order" | "settings" | "created_at" | "updated_at", ExtArgs["result"]["formField"]>
  export type FormFieldInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    form?: boolean | FormDefaultArgs<ExtArgs>
    options?: boolean | FormField$optionsArgs<ExtArgs>
    tableSource?: boolean | FormField$tableSourceArgs<ExtArgs>
    values?: boolean | FormField$valuesArgs<ExtArgs>
    _count?: boolean | FormFieldCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $FormFieldPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FormField"
    objects: {
      form: Prisma.$FormPayload<ExtArgs>
      options: Prisma.$FormFieldOptionPayload<ExtArgs>[]
      tableSource: Prisma.$FormFieldTableSourcePayload<ExtArgs> | null
      values: Prisma.$FormResponseValuePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      form_id: number
      field_key: string
      label: string
      field_type: $Enums.FieldType
      mode: $Enums.FieldMode
      is_required: boolean
      field_order: number
      settings: Prisma.JsonValue | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["formField"]>
    composites: {}
  }

  type FormFieldGetPayload<S extends boolean | null | undefined | FormFieldDefaultArgs> = $Result.GetResult<Prisma.$FormFieldPayload, S>

  type FormFieldCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FormFieldFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FormFieldCountAggregateInputType | true
    }

  export interface FormFieldDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FormField'], meta: { name: 'FormField' } }
    /**
     * Find zero or one FormField that matches the filter.
     * @param {FormFieldFindUniqueArgs} args - Arguments to find a FormField
     * @example
     * // Get one FormField
     * const formField = await prisma.formField.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FormFieldFindUniqueArgs>(args: SelectSubset<T, FormFieldFindUniqueArgs<ExtArgs>>): Prisma__FormFieldClient<$Result.GetResult<Prisma.$FormFieldPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FormField that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FormFieldFindUniqueOrThrowArgs} args - Arguments to find a FormField
     * @example
     * // Get one FormField
     * const formField = await prisma.formField.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FormFieldFindUniqueOrThrowArgs>(args: SelectSubset<T, FormFieldFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FormFieldClient<$Result.GetResult<Prisma.$FormFieldPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FormField that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormFieldFindFirstArgs} args - Arguments to find a FormField
     * @example
     * // Get one FormField
     * const formField = await prisma.formField.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FormFieldFindFirstArgs>(args?: SelectSubset<T, FormFieldFindFirstArgs<ExtArgs>>): Prisma__FormFieldClient<$Result.GetResult<Prisma.$FormFieldPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FormField that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormFieldFindFirstOrThrowArgs} args - Arguments to find a FormField
     * @example
     * // Get one FormField
     * const formField = await prisma.formField.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FormFieldFindFirstOrThrowArgs>(args?: SelectSubset<T, FormFieldFindFirstOrThrowArgs<ExtArgs>>): Prisma__FormFieldClient<$Result.GetResult<Prisma.$FormFieldPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FormFields that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormFieldFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FormFields
     * const formFields = await prisma.formField.findMany()
     * 
     * // Get first 10 FormFields
     * const formFields = await prisma.formField.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const formFieldWithIdOnly = await prisma.formField.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FormFieldFindManyArgs>(args?: SelectSubset<T, FormFieldFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FormFieldPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FormField.
     * @param {FormFieldCreateArgs} args - Arguments to create a FormField.
     * @example
     * // Create one FormField
     * const FormField = await prisma.formField.create({
     *   data: {
     *     // ... data to create a FormField
     *   }
     * })
     * 
     */
    create<T extends FormFieldCreateArgs>(args: SelectSubset<T, FormFieldCreateArgs<ExtArgs>>): Prisma__FormFieldClient<$Result.GetResult<Prisma.$FormFieldPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FormFields.
     * @param {FormFieldCreateManyArgs} args - Arguments to create many FormFields.
     * @example
     * // Create many FormFields
     * const formField = await prisma.formField.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FormFieldCreateManyArgs>(args?: SelectSubset<T, FormFieldCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a FormField.
     * @param {FormFieldDeleteArgs} args - Arguments to delete one FormField.
     * @example
     * // Delete one FormField
     * const FormField = await prisma.formField.delete({
     *   where: {
     *     // ... filter to delete one FormField
     *   }
     * })
     * 
     */
    delete<T extends FormFieldDeleteArgs>(args: SelectSubset<T, FormFieldDeleteArgs<ExtArgs>>): Prisma__FormFieldClient<$Result.GetResult<Prisma.$FormFieldPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FormField.
     * @param {FormFieldUpdateArgs} args - Arguments to update one FormField.
     * @example
     * // Update one FormField
     * const formField = await prisma.formField.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FormFieldUpdateArgs>(args: SelectSubset<T, FormFieldUpdateArgs<ExtArgs>>): Prisma__FormFieldClient<$Result.GetResult<Prisma.$FormFieldPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FormFields.
     * @param {FormFieldDeleteManyArgs} args - Arguments to filter FormFields to delete.
     * @example
     * // Delete a few FormFields
     * const { count } = await prisma.formField.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FormFieldDeleteManyArgs>(args?: SelectSubset<T, FormFieldDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FormFields.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormFieldUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FormFields
     * const formField = await prisma.formField.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FormFieldUpdateManyArgs>(args: SelectSubset<T, FormFieldUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one FormField.
     * @param {FormFieldUpsertArgs} args - Arguments to update or create a FormField.
     * @example
     * // Update or create a FormField
     * const formField = await prisma.formField.upsert({
     *   create: {
     *     // ... data to create a FormField
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FormField we want to update
     *   }
     * })
     */
    upsert<T extends FormFieldUpsertArgs>(args: SelectSubset<T, FormFieldUpsertArgs<ExtArgs>>): Prisma__FormFieldClient<$Result.GetResult<Prisma.$FormFieldPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FormFields.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormFieldCountArgs} args - Arguments to filter FormFields to count.
     * @example
     * // Count the number of FormFields
     * const count = await prisma.formField.count({
     *   where: {
     *     // ... the filter for the FormFields we want to count
     *   }
     * })
    **/
    count<T extends FormFieldCountArgs>(
      args?: Subset<T, FormFieldCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FormFieldCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FormField.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormFieldAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FormFieldAggregateArgs>(args: Subset<T, FormFieldAggregateArgs>): Prisma.PrismaPromise<GetFormFieldAggregateType<T>>

    /**
     * Group by FormField.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormFieldGroupByArgs} args - Group by arguments.
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
      T extends FormFieldGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FormFieldGroupByArgs['orderBy'] }
        : { orderBy?: FormFieldGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, FormFieldGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFormFieldGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FormField model
   */
  readonly fields: FormFieldFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FormField.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FormFieldClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    form<T extends FormDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FormDefaultArgs<ExtArgs>>): Prisma__FormClient<$Result.GetResult<Prisma.$FormPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    options<T extends FormField$optionsArgs<ExtArgs> = {}>(args?: Subset<T, FormField$optionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FormFieldOptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tableSource<T extends FormField$tableSourceArgs<ExtArgs> = {}>(args?: Subset<T, FormField$tableSourceArgs<ExtArgs>>): Prisma__FormFieldTableSourceClient<$Result.GetResult<Prisma.$FormFieldTableSourcePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    values<T extends FormField$valuesArgs<ExtArgs> = {}>(args?: Subset<T, FormField$valuesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FormResponseValuePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the FormField model
   */
  interface FormFieldFieldRefs {
    readonly id: FieldRef<"FormField", 'Int'>
    readonly form_id: FieldRef<"FormField", 'Int'>
    readonly field_key: FieldRef<"FormField", 'String'>
    readonly label: FieldRef<"FormField", 'String'>
    readonly field_type: FieldRef<"FormField", 'FieldType'>
    readonly mode: FieldRef<"FormField", 'FieldMode'>
    readonly is_required: FieldRef<"FormField", 'Boolean'>
    readonly field_order: FieldRef<"FormField", 'Int'>
    readonly settings: FieldRef<"FormField", 'Json'>
    readonly created_at: FieldRef<"FormField", 'DateTime'>
    readonly updated_at: FieldRef<"FormField", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FormField findUnique
   */
  export type FormFieldFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormField
     */
    select?: FormFieldSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormField
     */
    omit?: FormFieldOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormFieldInclude<ExtArgs> | null
    /**
     * Filter, which FormField to fetch.
     */
    where: FormFieldWhereUniqueInput
  }

  /**
   * FormField findUniqueOrThrow
   */
  export type FormFieldFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormField
     */
    select?: FormFieldSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormField
     */
    omit?: FormFieldOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormFieldInclude<ExtArgs> | null
    /**
     * Filter, which FormField to fetch.
     */
    where: FormFieldWhereUniqueInput
  }

  /**
   * FormField findFirst
   */
  export type FormFieldFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormField
     */
    select?: FormFieldSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormField
     */
    omit?: FormFieldOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormFieldInclude<ExtArgs> | null
    /**
     * Filter, which FormField to fetch.
     */
    where?: FormFieldWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FormFields to fetch.
     */
    orderBy?: FormFieldOrderByWithRelationInput | FormFieldOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FormFields.
     */
    cursor?: FormFieldWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FormFields from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FormFields.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FormFields.
     */
    distinct?: FormFieldScalarFieldEnum | FormFieldScalarFieldEnum[]
  }

  /**
   * FormField findFirstOrThrow
   */
  export type FormFieldFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormField
     */
    select?: FormFieldSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormField
     */
    omit?: FormFieldOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormFieldInclude<ExtArgs> | null
    /**
     * Filter, which FormField to fetch.
     */
    where?: FormFieldWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FormFields to fetch.
     */
    orderBy?: FormFieldOrderByWithRelationInput | FormFieldOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FormFields.
     */
    cursor?: FormFieldWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FormFields from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FormFields.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FormFields.
     */
    distinct?: FormFieldScalarFieldEnum | FormFieldScalarFieldEnum[]
  }

  /**
   * FormField findMany
   */
  export type FormFieldFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormField
     */
    select?: FormFieldSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormField
     */
    omit?: FormFieldOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormFieldInclude<ExtArgs> | null
    /**
     * Filter, which FormFields to fetch.
     */
    where?: FormFieldWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FormFields to fetch.
     */
    orderBy?: FormFieldOrderByWithRelationInput | FormFieldOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FormFields.
     */
    cursor?: FormFieldWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FormFields from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FormFields.
     */
    skip?: number
    distinct?: FormFieldScalarFieldEnum | FormFieldScalarFieldEnum[]
  }

  /**
   * FormField create
   */
  export type FormFieldCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormField
     */
    select?: FormFieldSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormField
     */
    omit?: FormFieldOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormFieldInclude<ExtArgs> | null
    /**
     * The data needed to create a FormField.
     */
    data: XOR<FormFieldCreateInput, FormFieldUncheckedCreateInput>
  }

  /**
   * FormField createMany
   */
  export type FormFieldCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FormFields.
     */
    data: FormFieldCreateManyInput | FormFieldCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FormField update
   */
  export type FormFieldUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormField
     */
    select?: FormFieldSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormField
     */
    omit?: FormFieldOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormFieldInclude<ExtArgs> | null
    /**
     * The data needed to update a FormField.
     */
    data: XOR<FormFieldUpdateInput, FormFieldUncheckedUpdateInput>
    /**
     * Choose, which FormField to update.
     */
    where: FormFieldWhereUniqueInput
  }

  /**
   * FormField updateMany
   */
  export type FormFieldUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FormFields.
     */
    data: XOR<FormFieldUpdateManyMutationInput, FormFieldUncheckedUpdateManyInput>
    /**
     * Filter which FormFields to update
     */
    where?: FormFieldWhereInput
    /**
     * Limit how many FormFields to update.
     */
    limit?: number
  }

  /**
   * FormField upsert
   */
  export type FormFieldUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormField
     */
    select?: FormFieldSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormField
     */
    omit?: FormFieldOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormFieldInclude<ExtArgs> | null
    /**
     * The filter to search for the FormField to update in case it exists.
     */
    where: FormFieldWhereUniqueInput
    /**
     * In case the FormField found by the `where` argument doesn't exist, create a new FormField with this data.
     */
    create: XOR<FormFieldCreateInput, FormFieldUncheckedCreateInput>
    /**
     * In case the FormField was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FormFieldUpdateInput, FormFieldUncheckedUpdateInput>
  }

  /**
   * FormField delete
   */
  export type FormFieldDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormField
     */
    select?: FormFieldSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormField
     */
    omit?: FormFieldOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormFieldInclude<ExtArgs> | null
    /**
     * Filter which FormField to delete.
     */
    where: FormFieldWhereUniqueInput
  }

  /**
   * FormField deleteMany
   */
  export type FormFieldDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FormFields to delete
     */
    where?: FormFieldWhereInput
    /**
     * Limit how many FormFields to delete.
     */
    limit?: number
  }

  /**
   * FormField.options
   */
  export type FormField$optionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormFieldOption
     */
    select?: FormFieldOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormFieldOption
     */
    omit?: FormFieldOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormFieldOptionInclude<ExtArgs> | null
    where?: FormFieldOptionWhereInput
    orderBy?: FormFieldOptionOrderByWithRelationInput | FormFieldOptionOrderByWithRelationInput[]
    cursor?: FormFieldOptionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FormFieldOptionScalarFieldEnum | FormFieldOptionScalarFieldEnum[]
  }

  /**
   * FormField.tableSource
   */
  export type FormField$tableSourceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormFieldTableSource
     */
    select?: FormFieldTableSourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormFieldTableSource
     */
    omit?: FormFieldTableSourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormFieldTableSourceInclude<ExtArgs> | null
    where?: FormFieldTableSourceWhereInput
  }

  /**
   * FormField.values
   */
  export type FormField$valuesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormResponseValue
     */
    select?: FormResponseValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormResponseValue
     */
    omit?: FormResponseValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormResponseValueInclude<ExtArgs> | null
    where?: FormResponseValueWhereInput
    orderBy?: FormResponseValueOrderByWithRelationInput | FormResponseValueOrderByWithRelationInput[]
    cursor?: FormResponseValueWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FormResponseValueScalarFieldEnum | FormResponseValueScalarFieldEnum[]
  }

  /**
   * FormField without action
   */
  export type FormFieldDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormField
     */
    select?: FormFieldSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormField
     */
    omit?: FormFieldOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormFieldInclude<ExtArgs> | null
  }


  /**
   * Model FormFieldOption
   */

  export type AggregateFormFieldOption = {
    _count: FormFieldOptionCountAggregateOutputType | null
    _avg: FormFieldOptionAvgAggregateOutputType | null
    _sum: FormFieldOptionSumAggregateOutputType | null
    _min: FormFieldOptionMinAggregateOutputType | null
    _max: FormFieldOptionMaxAggregateOutputType | null
  }

  export type FormFieldOptionAvgAggregateOutputType = {
    id: number | null
    field_id: number | null
    score: number | null
    option_order: number | null
  }

  export type FormFieldOptionSumAggregateOutputType = {
    id: number | null
    field_id: number | null
    score: number | null
    option_order: number | null
  }

  export type FormFieldOptionMinAggregateOutputType = {
    id: number | null
    field_id: number | null
    value: string | null
    label: string | null
    score: number | null
    option_order: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type FormFieldOptionMaxAggregateOutputType = {
    id: number | null
    field_id: number | null
    value: string | null
    label: string | null
    score: number | null
    option_order: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type FormFieldOptionCountAggregateOutputType = {
    id: number
    field_id: number
    value: number
    label: number
    score: number
    option_order: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type FormFieldOptionAvgAggregateInputType = {
    id?: true
    field_id?: true
    score?: true
    option_order?: true
  }

  export type FormFieldOptionSumAggregateInputType = {
    id?: true
    field_id?: true
    score?: true
    option_order?: true
  }

  export type FormFieldOptionMinAggregateInputType = {
    id?: true
    field_id?: true
    value?: true
    label?: true
    score?: true
    option_order?: true
    created_at?: true
    updated_at?: true
  }

  export type FormFieldOptionMaxAggregateInputType = {
    id?: true
    field_id?: true
    value?: true
    label?: true
    score?: true
    option_order?: true
    created_at?: true
    updated_at?: true
  }

  export type FormFieldOptionCountAggregateInputType = {
    id?: true
    field_id?: true
    value?: true
    label?: true
    score?: true
    option_order?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type FormFieldOptionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FormFieldOption to aggregate.
     */
    where?: FormFieldOptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FormFieldOptions to fetch.
     */
    orderBy?: FormFieldOptionOrderByWithRelationInput | FormFieldOptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FormFieldOptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FormFieldOptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FormFieldOptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FormFieldOptions
    **/
    _count?: true | FormFieldOptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FormFieldOptionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FormFieldOptionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FormFieldOptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FormFieldOptionMaxAggregateInputType
  }

  export type GetFormFieldOptionAggregateType<T extends FormFieldOptionAggregateArgs> = {
        [P in keyof T & keyof AggregateFormFieldOption]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFormFieldOption[P]>
      : GetScalarType<T[P], AggregateFormFieldOption[P]>
  }




  export type FormFieldOptionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FormFieldOptionWhereInput
    orderBy?: FormFieldOptionOrderByWithAggregationInput | FormFieldOptionOrderByWithAggregationInput[]
    by: FormFieldOptionScalarFieldEnum[] | FormFieldOptionScalarFieldEnum
    having?: FormFieldOptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FormFieldOptionCountAggregateInputType | true
    _avg?: FormFieldOptionAvgAggregateInputType
    _sum?: FormFieldOptionSumAggregateInputType
    _min?: FormFieldOptionMinAggregateInputType
    _max?: FormFieldOptionMaxAggregateInputType
  }

  export type FormFieldOptionGroupByOutputType = {
    id: number
    field_id: number
    value: string
    label: string | null
    score: number
    option_order: number
    created_at: Date
    updated_at: Date
    _count: FormFieldOptionCountAggregateOutputType | null
    _avg: FormFieldOptionAvgAggregateOutputType | null
    _sum: FormFieldOptionSumAggregateOutputType | null
    _min: FormFieldOptionMinAggregateOutputType | null
    _max: FormFieldOptionMaxAggregateOutputType | null
  }

  type GetFormFieldOptionGroupByPayload<T extends FormFieldOptionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FormFieldOptionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FormFieldOptionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FormFieldOptionGroupByOutputType[P]>
            : GetScalarType<T[P], FormFieldOptionGroupByOutputType[P]>
        }
      >
    >


  export type FormFieldOptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    field_id?: boolean
    value?: boolean
    label?: boolean
    score?: boolean
    option_order?: boolean
    created_at?: boolean
    updated_at?: boolean
    field?: boolean | FormFieldDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["formFieldOption"]>



  export type FormFieldOptionSelectScalar = {
    id?: boolean
    field_id?: boolean
    value?: boolean
    label?: boolean
    score?: boolean
    option_order?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type FormFieldOptionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "field_id" | "value" | "label" | "score" | "option_order" | "created_at" | "updated_at", ExtArgs["result"]["formFieldOption"]>
  export type FormFieldOptionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    field?: boolean | FormFieldDefaultArgs<ExtArgs>
  }

  export type $FormFieldOptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FormFieldOption"
    objects: {
      field: Prisma.$FormFieldPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      field_id: number
      value: string
      label: string | null
      score: number
      option_order: number
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["formFieldOption"]>
    composites: {}
  }

  type FormFieldOptionGetPayload<S extends boolean | null | undefined | FormFieldOptionDefaultArgs> = $Result.GetResult<Prisma.$FormFieldOptionPayload, S>

  type FormFieldOptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FormFieldOptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FormFieldOptionCountAggregateInputType | true
    }

  export interface FormFieldOptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FormFieldOption'], meta: { name: 'FormFieldOption' } }
    /**
     * Find zero or one FormFieldOption that matches the filter.
     * @param {FormFieldOptionFindUniqueArgs} args - Arguments to find a FormFieldOption
     * @example
     * // Get one FormFieldOption
     * const formFieldOption = await prisma.formFieldOption.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FormFieldOptionFindUniqueArgs>(args: SelectSubset<T, FormFieldOptionFindUniqueArgs<ExtArgs>>): Prisma__FormFieldOptionClient<$Result.GetResult<Prisma.$FormFieldOptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FormFieldOption that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FormFieldOptionFindUniqueOrThrowArgs} args - Arguments to find a FormFieldOption
     * @example
     * // Get one FormFieldOption
     * const formFieldOption = await prisma.formFieldOption.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FormFieldOptionFindUniqueOrThrowArgs>(args: SelectSubset<T, FormFieldOptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FormFieldOptionClient<$Result.GetResult<Prisma.$FormFieldOptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FormFieldOption that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormFieldOptionFindFirstArgs} args - Arguments to find a FormFieldOption
     * @example
     * // Get one FormFieldOption
     * const formFieldOption = await prisma.formFieldOption.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FormFieldOptionFindFirstArgs>(args?: SelectSubset<T, FormFieldOptionFindFirstArgs<ExtArgs>>): Prisma__FormFieldOptionClient<$Result.GetResult<Prisma.$FormFieldOptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FormFieldOption that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormFieldOptionFindFirstOrThrowArgs} args - Arguments to find a FormFieldOption
     * @example
     * // Get one FormFieldOption
     * const formFieldOption = await prisma.formFieldOption.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FormFieldOptionFindFirstOrThrowArgs>(args?: SelectSubset<T, FormFieldOptionFindFirstOrThrowArgs<ExtArgs>>): Prisma__FormFieldOptionClient<$Result.GetResult<Prisma.$FormFieldOptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FormFieldOptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormFieldOptionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FormFieldOptions
     * const formFieldOptions = await prisma.formFieldOption.findMany()
     * 
     * // Get first 10 FormFieldOptions
     * const formFieldOptions = await prisma.formFieldOption.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const formFieldOptionWithIdOnly = await prisma.formFieldOption.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FormFieldOptionFindManyArgs>(args?: SelectSubset<T, FormFieldOptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FormFieldOptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FormFieldOption.
     * @param {FormFieldOptionCreateArgs} args - Arguments to create a FormFieldOption.
     * @example
     * // Create one FormFieldOption
     * const FormFieldOption = await prisma.formFieldOption.create({
     *   data: {
     *     // ... data to create a FormFieldOption
     *   }
     * })
     * 
     */
    create<T extends FormFieldOptionCreateArgs>(args: SelectSubset<T, FormFieldOptionCreateArgs<ExtArgs>>): Prisma__FormFieldOptionClient<$Result.GetResult<Prisma.$FormFieldOptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FormFieldOptions.
     * @param {FormFieldOptionCreateManyArgs} args - Arguments to create many FormFieldOptions.
     * @example
     * // Create many FormFieldOptions
     * const formFieldOption = await prisma.formFieldOption.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FormFieldOptionCreateManyArgs>(args?: SelectSubset<T, FormFieldOptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a FormFieldOption.
     * @param {FormFieldOptionDeleteArgs} args - Arguments to delete one FormFieldOption.
     * @example
     * // Delete one FormFieldOption
     * const FormFieldOption = await prisma.formFieldOption.delete({
     *   where: {
     *     // ... filter to delete one FormFieldOption
     *   }
     * })
     * 
     */
    delete<T extends FormFieldOptionDeleteArgs>(args: SelectSubset<T, FormFieldOptionDeleteArgs<ExtArgs>>): Prisma__FormFieldOptionClient<$Result.GetResult<Prisma.$FormFieldOptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FormFieldOption.
     * @param {FormFieldOptionUpdateArgs} args - Arguments to update one FormFieldOption.
     * @example
     * // Update one FormFieldOption
     * const formFieldOption = await prisma.formFieldOption.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FormFieldOptionUpdateArgs>(args: SelectSubset<T, FormFieldOptionUpdateArgs<ExtArgs>>): Prisma__FormFieldOptionClient<$Result.GetResult<Prisma.$FormFieldOptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FormFieldOptions.
     * @param {FormFieldOptionDeleteManyArgs} args - Arguments to filter FormFieldOptions to delete.
     * @example
     * // Delete a few FormFieldOptions
     * const { count } = await prisma.formFieldOption.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FormFieldOptionDeleteManyArgs>(args?: SelectSubset<T, FormFieldOptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FormFieldOptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormFieldOptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FormFieldOptions
     * const formFieldOption = await prisma.formFieldOption.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FormFieldOptionUpdateManyArgs>(args: SelectSubset<T, FormFieldOptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one FormFieldOption.
     * @param {FormFieldOptionUpsertArgs} args - Arguments to update or create a FormFieldOption.
     * @example
     * // Update or create a FormFieldOption
     * const formFieldOption = await prisma.formFieldOption.upsert({
     *   create: {
     *     // ... data to create a FormFieldOption
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FormFieldOption we want to update
     *   }
     * })
     */
    upsert<T extends FormFieldOptionUpsertArgs>(args: SelectSubset<T, FormFieldOptionUpsertArgs<ExtArgs>>): Prisma__FormFieldOptionClient<$Result.GetResult<Prisma.$FormFieldOptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FormFieldOptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormFieldOptionCountArgs} args - Arguments to filter FormFieldOptions to count.
     * @example
     * // Count the number of FormFieldOptions
     * const count = await prisma.formFieldOption.count({
     *   where: {
     *     // ... the filter for the FormFieldOptions we want to count
     *   }
     * })
    **/
    count<T extends FormFieldOptionCountArgs>(
      args?: Subset<T, FormFieldOptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FormFieldOptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FormFieldOption.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormFieldOptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FormFieldOptionAggregateArgs>(args: Subset<T, FormFieldOptionAggregateArgs>): Prisma.PrismaPromise<GetFormFieldOptionAggregateType<T>>

    /**
     * Group by FormFieldOption.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormFieldOptionGroupByArgs} args - Group by arguments.
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
      T extends FormFieldOptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FormFieldOptionGroupByArgs['orderBy'] }
        : { orderBy?: FormFieldOptionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, FormFieldOptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFormFieldOptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FormFieldOption model
   */
  readonly fields: FormFieldOptionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FormFieldOption.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FormFieldOptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    field<T extends FormFieldDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FormFieldDefaultArgs<ExtArgs>>): Prisma__FormFieldClient<$Result.GetResult<Prisma.$FormFieldPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the FormFieldOption model
   */
  interface FormFieldOptionFieldRefs {
    readonly id: FieldRef<"FormFieldOption", 'Int'>
    readonly field_id: FieldRef<"FormFieldOption", 'Int'>
    readonly value: FieldRef<"FormFieldOption", 'String'>
    readonly label: FieldRef<"FormFieldOption", 'String'>
    readonly score: FieldRef<"FormFieldOption", 'Int'>
    readonly option_order: FieldRef<"FormFieldOption", 'Int'>
    readonly created_at: FieldRef<"FormFieldOption", 'DateTime'>
    readonly updated_at: FieldRef<"FormFieldOption", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FormFieldOption findUnique
   */
  export type FormFieldOptionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormFieldOption
     */
    select?: FormFieldOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormFieldOption
     */
    omit?: FormFieldOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormFieldOptionInclude<ExtArgs> | null
    /**
     * Filter, which FormFieldOption to fetch.
     */
    where: FormFieldOptionWhereUniqueInput
  }

  /**
   * FormFieldOption findUniqueOrThrow
   */
  export type FormFieldOptionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormFieldOption
     */
    select?: FormFieldOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormFieldOption
     */
    omit?: FormFieldOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormFieldOptionInclude<ExtArgs> | null
    /**
     * Filter, which FormFieldOption to fetch.
     */
    where: FormFieldOptionWhereUniqueInput
  }

  /**
   * FormFieldOption findFirst
   */
  export type FormFieldOptionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormFieldOption
     */
    select?: FormFieldOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormFieldOption
     */
    omit?: FormFieldOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormFieldOptionInclude<ExtArgs> | null
    /**
     * Filter, which FormFieldOption to fetch.
     */
    where?: FormFieldOptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FormFieldOptions to fetch.
     */
    orderBy?: FormFieldOptionOrderByWithRelationInput | FormFieldOptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FormFieldOptions.
     */
    cursor?: FormFieldOptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FormFieldOptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FormFieldOptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FormFieldOptions.
     */
    distinct?: FormFieldOptionScalarFieldEnum | FormFieldOptionScalarFieldEnum[]
  }

  /**
   * FormFieldOption findFirstOrThrow
   */
  export type FormFieldOptionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormFieldOption
     */
    select?: FormFieldOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormFieldOption
     */
    omit?: FormFieldOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormFieldOptionInclude<ExtArgs> | null
    /**
     * Filter, which FormFieldOption to fetch.
     */
    where?: FormFieldOptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FormFieldOptions to fetch.
     */
    orderBy?: FormFieldOptionOrderByWithRelationInput | FormFieldOptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FormFieldOptions.
     */
    cursor?: FormFieldOptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FormFieldOptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FormFieldOptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FormFieldOptions.
     */
    distinct?: FormFieldOptionScalarFieldEnum | FormFieldOptionScalarFieldEnum[]
  }

  /**
   * FormFieldOption findMany
   */
  export type FormFieldOptionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormFieldOption
     */
    select?: FormFieldOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormFieldOption
     */
    omit?: FormFieldOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormFieldOptionInclude<ExtArgs> | null
    /**
     * Filter, which FormFieldOptions to fetch.
     */
    where?: FormFieldOptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FormFieldOptions to fetch.
     */
    orderBy?: FormFieldOptionOrderByWithRelationInput | FormFieldOptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FormFieldOptions.
     */
    cursor?: FormFieldOptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FormFieldOptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FormFieldOptions.
     */
    skip?: number
    distinct?: FormFieldOptionScalarFieldEnum | FormFieldOptionScalarFieldEnum[]
  }

  /**
   * FormFieldOption create
   */
  export type FormFieldOptionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormFieldOption
     */
    select?: FormFieldOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormFieldOption
     */
    omit?: FormFieldOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormFieldOptionInclude<ExtArgs> | null
    /**
     * The data needed to create a FormFieldOption.
     */
    data: XOR<FormFieldOptionCreateInput, FormFieldOptionUncheckedCreateInput>
  }

  /**
   * FormFieldOption createMany
   */
  export type FormFieldOptionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FormFieldOptions.
     */
    data: FormFieldOptionCreateManyInput | FormFieldOptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FormFieldOption update
   */
  export type FormFieldOptionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormFieldOption
     */
    select?: FormFieldOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormFieldOption
     */
    omit?: FormFieldOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormFieldOptionInclude<ExtArgs> | null
    /**
     * The data needed to update a FormFieldOption.
     */
    data: XOR<FormFieldOptionUpdateInput, FormFieldOptionUncheckedUpdateInput>
    /**
     * Choose, which FormFieldOption to update.
     */
    where: FormFieldOptionWhereUniqueInput
  }

  /**
   * FormFieldOption updateMany
   */
  export type FormFieldOptionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FormFieldOptions.
     */
    data: XOR<FormFieldOptionUpdateManyMutationInput, FormFieldOptionUncheckedUpdateManyInput>
    /**
     * Filter which FormFieldOptions to update
     */
    where?: FormFieldOptionWhereInput
    /**
     * Limit how many FormFieldOptions to update.
     */
    limit?: number
  }

  /**
   * FormFieldOption upsert
   */
  export type FormFieldOptionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormFieldOption
     */
    select?: FormFieldOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormFieldOption
     */
    omit?: FormFieldOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormFieldOptionInclude<ExtArgs> | null
    /**
     * The filter to search for the FormFieldOption to update in case it exists.
     */
    where: FormFieldOptionWhereUniqueInput
    /**
     * In case the FormFieldOption found by the `where` argument doesn't exist, create a new FormFieldOption with this data.
     */
    create: XOR<FormFieldOptionCreateInput, FormFieldOptionUncheckedCreateInput>
    /**
     * In case the FormFieldOption was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FormFieldOptionUpdateInput, FormFieldOptionUncheckedUpdateInput>
  }

  /**
   * FormFieldOption delete
   */
  export type FormFieldOptionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormFieldOption
     */
    select?: FormFieldOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormFieldOption
     */
    omit?: FormFieldOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormFieldOptionInclude<ExtArgs> | null
    /**
     * Filter which FormFieldOption to delete.
     */
    where: FormFieldOptionWhereUniqueInput
  }

  /**
   * FormFieldOption deleteMany
   */
  export type FormFieldOptionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FormFieldOptions to delete
     */
    where?: FormFieldOptionWhereInput
    /**
     * Limit how many FormFieldOptions to delete.
     */
    limit?: number
  }

  /**
   * FormFieldOption without action
   */
  export type FormFieldOptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormFieldOption
     */
    select?: FormFieldOptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormFieldOption
     */
    omit?: FormFieldOptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormFieldOptionInclude<ExtArgs> | null
  }


  /**
   * Model FormFieldTableSource
   */

  export type AggregateFormFieldTableSource = {
    _count: FormFieldTableSourceCountAggregateOutputType | null
    _avg: FormFieldTableSourceAvgAggregateOutputType | null
    _sum: FormFieldTableSourceSumAggregateOutputType | null
    _min: FormFieldTableSourceMinAggregateOutputType | null
    _max: FormFieldTableSourceMaxAggregateOutputType | null
  }

  export type FormFieldTableSourceAvgAggregateOutputType = {
    id: number | null
    field_id: number | null
  }

  export type FormFieldTableSourceSumAggregateOutputType = {
    id: number | null
    field_id: number | null
  }

  export type FormFieldTableSourceMinAggregateOutputType = {
    id: number | null
    field_id: number | null
    source_table: string | null
    source_value_column: string | null
    source_label_column: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type FormFieldTableSourceMaxAggregateOutputType = {
    id: number | null
    field_id: number | null
    source_table: string | null
    source_value_column: string | null
    source_label_column: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type FormFieldTableSourceCountAggregateOutputType = {
    id: number
    field_id: number
    source_table: number
    source_value_column: number
    source_label_column: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type FormFieldTableSourceAvgAggregateInputType = {
    id?: true
    field_id?: true
  }

  export type FormFieldTableSourceSumAggregateInputType = {
    id?: true
    field_id?: true
  }

  export type FormFieldTableSourceMinAggregateInputType = {
    id?: true
    field_id?: true
    source_table?: true
    source_value_column?: true
    source_label_column?: true
    created_at?: true
    updated_at?: true
  }

  export type FormFieldTableSourceMaxAggregateInputType = {
    id?: true
    field_id?: true
    source_table?: true
    source_value_column?: true
    source_label_column?: true
    created_at?: true
    updated_at?: true
  }

  export type FormFieldTableSourceCountAggregateInputType = {
    id?: true
    field_id?: true
    source_table?: true
    source_value_column?: true
    source_label_column?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type FormFieldTableSourceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FormFieldTableSource to aggregate.
     */
    where?: FormFieldTableSourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FormFieldTableSources to fetch.
     */
    orderBy?: FormFieldTableSourceOrderByWithRelationInput | FormFieldTableSourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FormFieldTableSourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FormFieldTableSources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FormFieldTableSources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FormFieldTableSources
    **/
    _count?: true | FormFieldTableSourceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FormFieldTableSourceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FormFieldTableSourceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FormFieldTableSourceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FormFieldTableSourceMaxAggregateInputType
  }

  export type GetFormFieldTableSourceAggregateType<T extends FormFieldTableSourceAggregateArgs> = {
        [P in keyof T & keyof AggregateFormFieldTableSource]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFormFieldTableSource[P]>
      : GetScalarType<T[P], AggregateFormFieldTableSource[P]>
  }




  export type FormFieldTableSourceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FormFieldTableSourceWhereInput
    orderBy?: FormFieldTableSourceOrderByWithAggregationInput | FormFieldTableSourceOrderByWithAggregationInput[]
    by: FormFieldTableSourceScalarFieldEnum[] | FormFieldTableSourceScalarFieldEnum
    having?: FormFieldTableSourceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FormFieldTableSourceCountAggregateInputType | true
    _avg?: FormFieldTableSourceAvgAggregateInputType
    _sum?: FormFieldTableSourceSumAggregateInputType
    _min?: FormFieldTableSourceMinAggregateInputType
    _max?: FormFieldTableSourceMaxAggregateInputType
  }

  export type FormFieldTableSourceGroupByOutputType = {
    id: number
    field_id: number
    source_table: string
    source_value_column: string
    source_label_column: string
    created_at: Date
    updated_at: Date
    _count: FormFieldTableSourceCountAggregateOutputType | null
    _avg: FormFieldTableSourceAvgAggregateOutputType | null
    _sum: FormFieldTableSourceSumAggregateOutputType | null
    _min: FormFieldTableSourceMinAggregateOutputType | null
    _max: FormFieldTableSourceMaxAggregateOutputType | null
  }

  type GetFormFieldTableSourceGroupByPayload<T extends FormFieldTableSourceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FormFieldTableSourceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FormFieldTableSourceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FormFieldTableSourceGroupByOutputType[P]>
            : GetScalarType<T[P], FormFieldTableSourceGroupByOutputType[P]>
        }
      >
    >


  export type FormFieldTableSourceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    field_id?: boolean
    source_table?: boolean
    source_value_column?: boolean
    source_label_column?: boolean
    created_at?: boolean
    updated_at?: boolean
    field?: boolean | FormFieldDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["formFieldTableSource"]>



  export type FormFieldTableSourceSelectScalar = {
    id?: boolean
    field_id?: boolean
    source_table?: boolean
    source_value_column?: boolean
    source_label_column?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type FormFieldTableSourceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "field_id" | "source_table" | "source_value_column" | "source_label_column" | "created_at" | "updated_at", ExtArgs["result"]["formFieldTableSource"]>
  export type FormFieldTableSourceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    field?: boolean | FormFieldDefaultArgs<ExtArgs>
  }

  export type $FormFieldTableSourcePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FormFieldTableSource"
    objects: {
      field: Prisma.$FormFieldPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      field_id: number
      source_table: string
      source_value_column: string
      source_label_column: string
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["formFieldTableSource"]>
    composites: {}
  }

  type FormFieldTableSourceGetPayload<S extends boolean | null | undefined | FormFieldTableSourceDefaultArgs> = $Result.GetResult<Prisma.$FormFieldTableSourcePayload, S>

  type FormFieldTableSourceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FormFieldTableSourceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FormFieldTableSourceCountAggregateInputType | true
    }

  export interface FormFieldTableSourceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FormFieldTableSource'], meta: { name: 'FormFieldTableSource' } }
    /**
     * Find zero or one FormFieldTableSource that matches the filter.
     * @param {FormFieldTableSourceFindUniqueArgs} args - Arguments to find a FormFieldTableSource
     * @example
     * // Get one FormFieldTableSource
     * const formFieldTableSource = await prisma.formFieldTableSource.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FormFieldTableSourceFindUniqueArgs>(args: SelectSubset<T, FormFieldTableSourceFindUniqueArgs<ExtArgs>>): Prisma__FormFieldTableSourceClient<$Result.GetResult<Prisma.$FormFieldTableSourcePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FormFieldTableSource that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FormFieldTableSourceFindUniqueOrThrowArgs} args - Arguments to find a FormFieldTableSource
     * @example
     * // Get one FormFieldTableSource
     * const formFieldTableSource = await prisma.formFieldTableSource.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FormFieldTableSourceFindUniqueOrThrowArgs>(args: SelectSubset<T, FormFieldTableSourceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FormFieldTableSourceClient<$Result.GetResult<Prisma.$FormFieldTableSourcePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FormFieldTableSource that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormFieldTableSourceFindFirstArgs} args - Arguments to find a FormFieldTableSource
     * @example
     * // Get one FormFieldTableSource
     * const formFieldTableSource = await prisma.formFieldTableSource.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FormFieldTableSourceFindFirstArgs>(args?: SelectSubset<T, FormFieldTableSourceFindFirstArgs<ExtArgs>>): Prisma__FormFieldTableSourceClient<$Result.GetResult<Prisma.$FormFieldTableSourcePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FormFieldTableSource that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormFieldTableSourceFindFirstOrThrowArgs} args - Arguments to find a FormFieldTableSource
     * @example
     * // Get one FormFieldTableSource
     * const formFieldTableSource = await prisma.formFieldTableSource.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FormFieldTableSourceFindFirstOrThrowArgs>(args?: SelectSubset<T, FormFieldTableSourceFindFirstOrThrowArgs<ExtArgs>>): Prisma__FormFieldTableSourceClient<$Result.GetResult<Prisma.$FormFieldTableSourcePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FormFieldTableSources that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormFieldTableSourceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FormFieldTableSources
     * const formFieldTableSources = await prisma.formFieldTableSource.findMany()
     * 
     * // Get first 10 FormFieldTableSources
     * const formFieldTableSources = await prisma.formFieldTableSource.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const formFieldTableSourceWithIdOnly = await prisma.formFieldTableSource.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FormFieldTableSourceFindManyArgs>(args?: SelectSubset<T, FormFieldTableSourceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FormFieldTableSourcePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FormFieldTableSource.
     * @param {FormFieldTableSourceCreateArgs} args - Arguments to create a FormFieldTableSource.
     * @example
     * // Create one FormFieldTableSource
     * const FormFieldTableSource = await prisma.formFieldTableSource.create({
     *   data: {
     *     // ... data to create a FormFieldTableSource
     *   }
     * })
     * 
     */
    create<T extends FormFieldTableSourceCreateArgs>(args: SelectSubset<T, FormFieldTableSourceCreateArgs<ExtArgs>>): Prisma__FormFieldTableSourceClient<$Result.GetResult<Prisma.$FormFieldTableSourcePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FormFieldTableSources.
     * @param {FormFieldTableSourceCreateManyArgs} args - Arguments to create many FormFieldTableSources.
     * @example
     * // Create many FormFieldTableSources
     * const formFieldTableSource = await prisma.formFieldTableSource.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FormFieldTableSourceCreateManyArgs>(args?: SelectSubset<T, FormFieldTableSourceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a FormFieldTableSource.
     * @param {FormFieldTableSourceDeleteArgs} args - Arguments to delete one FormFieldTableSource.
     * @example
     * // Delete one FormFieldTableSource
     * const FormFieldTableSource = await prisma.formFieldTableSource.delete({
     *   where: {
     *     // ... filter to delete one FormFieldTableSource
     *   }
     * })
     * 
     */
    delete<T extends FormFieldTableSourceDeleteArgs>(args: SelectSubset<T, FormFieldTableSourceDeleteArgs<ExtArgs>>): Prisma__FormFieldTableSourceClient<$Result.GetResult<Prisma.$FormFieldTableSourcePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FormFieldTableSource.
     * @param {FormFieldTableSourceUpdateArgs} args - Arguments to update one FormFieldTableSource.
     * @example
     * // Update one FormFieldTableSource
     * const formFieldTableSource = await prisma.formFieldTableSource.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FormFieldTableSourceUpdateArgs>(args: SelectSubset<T, FormFieldTableSourceUpdateArgs<ExtArgs>>): Prisma__FormFieldTableSourceClient<$Result.GetResult<Prisma.$FormFieldTableSourcePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FormFieldTableSources.
     * @param {FormFieldTableSourceDeleteManyArgs} args - Arguments to filter FormFieldTableSources to delete.
     * @example
     * // Delete a few FormFieldTableSources
     * const { count } = await prisma.formFieldTableSource.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FormFieldTableSourceDeleteManyArgs>(args?: SelectSubset<T, FormFieldTableSourceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FormFieldTableSources.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormFieldTableSourceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FormFieldTableSources
     * const formFieldTableSource = await prisma.formFieldTableSource.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FormFieldTableSourceUpdateManyArgs>(args: SelectSubset<T, FormFieldTableSourceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one FormFieldTableSource.
     * @param {FormFieldTableSourceUpsertArgs} args - Arguments to update or create a FormFieldTableSource.
     * @example
     * // Update or create a FormFieldTableSource
     * const formFieldTableSource = await prisma.formFieldTableSource.upsert({
     *   create: {
     *     // ... data to create a FormFieldTableSource
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FormFieldTableSource we want to update
     *   }
     * })
     */
    upsert<T extends FormFieldTableSourceUpsertArgs>(args: SelectSubset<T, FormFieldTableSourceUpsertArgs<ExtArgs>>): Prisma__FormFieldTableSourceClient<$Result.GetResult<Prisma.$FormFieldTableSourcePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FormFieldTableSources.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormFieldTableSourceCountArgs} args - Arguments to filter FormFieldTableSources to count.
     * @example
     * // Count the number of FormFieldTableSources
     * const count = await prisma.formFieldTableSource.count({
     *   where: {
     *     // ... the filter for the FormFieldTableSources we want to count
     *   }
     * })
    **/
    count<T extends FormFieldTableSourceCountArgs>(
      args?: Subset<T, FormFieldTableSourceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FormFieldTableSourceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FormFieldTableSource.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormFieldTableSourceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FormFieldTableSourceAggregateArgs>(args: Subset<T, FormFieldTableSourceAggregateArgs>): Prisma.PrismaPromise<GetFormFieldTableSourceAggregateType<T>>

    /**
     * Group by FormFieldTableSource.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormFieldTableSourceGroupByArgs} args - Group by arguments.
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
      T extends FormFieldTableSourceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FormFieldTableSourceGroupByArgs['orderBy'] }
        : { orderBy?: FormFieldTableSourceGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, FormFieldTableSourceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFormFieldTableSourceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FormFieldTableSource model
   */
  readonly fields: FormFieldTableSourceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FormFieldTableSource.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FormFieldTableSourceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    field<T extends FormFieldDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FormFieldDefaultArgs<ExtArgs>>): Prisma__FormFieldClient<$Result.GetResult<Prisma.$FormFieldPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the FormFieldTableSource model
   */
  interface FormFieldTableSourceFieldRefs {
    readonly id: FieldRef<"FormFieldTableSource", 'Int'>
    readonly field_id: FieldRef<"FormFieldTableSource", 'Int'>
    readonly source_table: FieldRef<"FormFieldTableSource", 'String'>
    readonly source_value_column: FieldRef<"FormFieldTableSource", 'String'>
    readonly source_label_column: FieldRef<"FormFieldTableSource", 'String'>
    readonly created_at: FieldRef<"FormFieldTableSource", 'DateTime'>
    readonly updated_at: FieldRef<"FormFieldTableSource", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FormFieldTableSource findUnique
   */
  export type FormFieldTableSourceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormFieldTableSource
     */
    select?: FormFieldTableSourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormFieldTableSource
     */
    omit?: FormFieldTableSourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormFieldTableSourceInclude<ExtArgs> | null
    /**
     * Filter, which FormFieldTableSource to fetch.
     */
    where: FormFieldTableSourceWhereUniqueInput
  }

  /**
   * FormFieldTableSource findUniqueOrThrow
   */
  export type FormFieldTableSourceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormFieldTableSource
     */
    select?: FormFieldTableSourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormFieldTableSource
     */
    omit?: FormFieldTableSourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormFieldTableSourceInclude<ExtArgs> | null
    /**
     * Filter, which FormFieldTableSource to fetch.
     */
    where: FormFieldTableSourceWhereUniqueInput
  }

  /**
   * FormFieldTableSource findFirst
   */
  export type FormFieldTableSourceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormFieldTableSource
     */
    select?: FormFieldTableSourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormFieldTableSource
     */
    omit?: FormFieldTableSourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormFieldTableSourceInclude<ExtArgs> | null
    /**
     * Filter, which FormFieldTableSource to fetch.
     */
    where?: FormFieldTableSourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FormFieldTableSources to fetch.
     */
    orderBy?: FormFieldTableSourceOrderByWithRelationInput | FormFieldTableSourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FormFieldTableSources.
     */
    cursor?: FormFieldTableSourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FormFieldTableSources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FormFieldTableSources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FormFieldTableSources.
     */
    distinct?: FormFieldTableSourceScalarFieldEnum | FormFieldTableSourceScalarFieldEnum[]
  }

  /**
   * FormFieldTableSource findFirstOrThrow
   */
  export type FormFieldTableSourceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormFieldTableSource
     */
    select?: FormFieldTableSourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormFieldTableSource
     */
    omit?: FormFieldTableSourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormFieldTableSourceInclude<ExtArgs> | null
    /**
     * Filter, which FormFieldTableSource to fetch.
     */
    where?: FormFieldTableSourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FormFieldTableSources to fetch.
     */
    orderBy?: FormFieldTableSourceOrderByWithRelationInput | FormFieldTableSourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FormFieldTableSources.
     */
    cursor?: FormFieldTableSourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FormFieldTableSources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FormFieldTableSources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FormFieldTableSources.
     */
    distinct?: FormFieldTableSourceScalarFieldEnum | FormFieldTableSourceScalarFieldEnum[]
  }

  /**
   * FormFieldTableSource findMany
   */
  export type FormFieldTableSourceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormFieldTableSource
     */
    select?: FormFieldTableSourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormFieldTableSource
     */
    omit?: FormFieldTableSourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormFieldTableSourceInclude<ExtArgs> | null
    /**
     * Filter, which FormFieldTableSources to fetch.
     */
    where?: FormFieldTableSourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FormFieldTableSources to fetch.
     */
    orderBy?: FormFieldTableSourceOrderByWithRelationInput | FormFieldTableSourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FormFieldTableSources.
     */
    cursor?: FormFieldTableSourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FormFieldTableSources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FormFieldTableSources.
     */
    skip?: number
    distinct?: FormFieldTableSourceScalarFieldEnum | FormFieldTableSourceScalarFieldEnum[]
  }

  /**
   * FormFieldTableSource create
   */
  export type FormFieldTableSourceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormFieldTableSource
     */
    select?: FormFieldTableSourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormFieldTableSource
     */
    omit?: FormFieldTableSourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormFieldTableSourceInclude<ExtArgs> | null
    /**
     * The data needed to create a FormFieldTableSource.
     */
    data: XOR<FormFieldTableSourceCreateInput, FormFieldTableSourceUncheckedCreateInput>
  }

  /**
   * FormFieldTableSource createMany
   */
  export type FormFieldTableSourceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FormFieldTableSources.
     */
    data: FormFieldTableSourceCreateManyInput | FormFieldTableSourceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FormFieldTableSource update
   */
  export type FormFieldTableSourceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormFieldTableSource
     */
    select?: FormFieldTableSourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormFieldTableSource
     */
    omit?: FormFieldTableSourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormFieldTableSourceInclude<ExtArgs> | null
    /**
     * The data needed to update a FormFieldTableSource.
     */
    data: XOR<FormFieldTableSourceUpdateInput, FormFieldTableSourceUncheckedUpdateInput>
    /**
     * Choose, which FormFieldTableSource to update.
     */
    where: FormFieldTableSourceWhereUniqueInput
  }

  /**
   * FormFieldTableSource updateMany
   */
  export type FormFieldTableSourceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FormFieldTableSources.
     */
    data: XOR<FormFieldTableSourceUpdateManyMutationInput, FormFieldTableSourceUncheckedUpdateManyInput>
    /**
     * Filter which FormFieldTableSources to update
     */
    where?: FormFieldTableSourceWhereInput
    /**
     * Limit how many FormFieldTableSources to update.
     */
    limit?: number
  }

  /**
   * FormFieldTableSource upsert
   */
  export type FormFieldTableSourceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormFieldTableSource
     */
    select?: FormFieldTableSourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormFieldTableSource
     */
    omit?: FormFieldTableSourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormFieldTableSourceInclude<ExtArgs> | null
    /**
     * The filter to search for the FormFieldTableSource to update in case it exists.
     */
    where: FormFieldTableSourceWhereUniqueInput
    /**
     * In case the FormFieldTableSource found by the `where` argument doesn't exist, create a new FormFieldTableSource with this data.
     */
    create: XOR<FormFieldTableSourceCreateInput, FormFieldTableSourceUncheckedCreateInput>
    /**
     * In case the FormFieldTableSource was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FormFieldTableSourceUpdateInput, FormFieldTableSourceUncheckedUpdateInput>
  }

  /**
   * FormFieldTableSource delete
   */
  export type FormFieldTableSourceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormFieldTableSource
     */
    select?: FormFieldTableSourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormFieldTableSource
     */
    omit?: FormFieldTableSourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormFieldTableSourceInclude<ExtArgs> | null
    /**
     * Filter which FormFieldTableSource to delete.
     */
    where: FormFieldTableSourceWhereUniqueInput
  }

  /**
   * FormFieldTableSource deleteMany
   */
  export type FormFieldTableSourceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FormFieldTableSources to delete
     */
    where?: FormFieldTableSourceWhereInput
    /**
     * Limit how many FormFieldTableSources to delete.
     */
    limit?: number
  }

  /**
   * FormFieldTableSource without action
   */
  export type FormFieldTableSourceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormFieldTableSource
     */
    select?: FormFieldTableSourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormFieldTableSource
     */
    omit?: FormFieldTableSourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormFieldTableSourceInclude<ExtArgs> | null
  }


  /**
   * Model FormResponse
   */

  export type AggregateFormResponse = {
    _count: FormResponseCountAggregateOutputType | null
    _avg: FormResponseAvgAggregateOutputType | null
    _sum: FormResponseSumAggregateOutputType | null
    _min: FormResponseMinAggregateOutputType | null
    _max: FormResponseMaxAggregateOutputType | null
  }

  export type FormResponseAvgAggregateOutputType = {
    id: number | null
    form_id: number | null
    user_id: number | null
    total_score: number | null
  }

  export type FormResponseSumAggregateOutputType = {
    id: number | null
    form_id: number | null
    user_id: number | null
    total_score: number | null
  }

  export type FormResponseMinAggregateOutputType = {
    id: number | null
    form_id: number | null
    user_id: number | null
    total_score: number | null
    status: $Enums.ResponseStatus | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type FormResponseMaxAggregateOutputType = {
    id: number | null
    form_id: number | null
    user_id: number | null
    total_score: number | null
    status: $Enums.ResponseStatus | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type FormResponseCountAggregateOutputType = {
    id: number
    form_id: number
    user_id: number
    total_score: number
    status: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type FormResponseAvgAggregateInputType = {
    id?: true
    form_id?: true
    user_id?: true
    total_score?: true
  }

  export type FormResponseSumAggregateInputType = {
    id?: true
    form_id?: true
    user_id?: true
    total_score?: true
  }

  export type FormResponseMinAggregateInputType = {
    id?: true
    form_id?: true
    user_id?: true
    total_score?: true
    status?: true
    created_at?: true
    updated_at?: true
  }

  export type FormResponseMaxAggregateInputType = {
    id?: true
    form_id?: true
    user_id?: true
    total_score?: true
    status?: true
    created_at?: true
    updated_at?: true
  }

  export type FormResponseCountAggregateInputType = {
    id?: true
    form_id?: true
    user_id?: true
    total_score?: true
    status?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type FormResponseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FormResponse to aggregate.
     */
    where?: FormResponseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FormResponses to fetch.
     */
    orderBy?: FormResponseOrderByWithRelationInput | FormResponseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FormResponseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FormResponses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FormResponses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FormResponses
    **/
    _count?: true | FormResponseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FormResponseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FormResponseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FormResponseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FormResponseMaxAggregateInputType
  }

  export type GetFormResponseAggregateType<T extends FormResponseAggregateArgs> = {
        [P in keyof T & keyof AggregateFormResponse]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFormResponse[P]>
      : GetScalarType<T[P], AggregateFormResponse[P]>
  }




  export type FormResponseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FormResponseWhereInput
    orderBy?: FormResponseOrderByWithAggregationInput | FormResponseOrderByWithAggregationInput[]
    by: FormResponseScalarFieldEnum[] | FormResponseScalarFieldEnum
    having?: FormResponseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FormResponseCountAggregateInputType | true
    _avg?: FormResponseAvgAggregateInputType
    _sum?: FormResponseSumAggregateInputType
    _min?: FormResponseMinAggregateInputType
    _max?: FormResponseMaxAggregateInputType
  }

  export type FormResponseGroupByOutputType = {
    id: number
    form_id: number
    user_id: number | null
    total_score: number
    status: $Enums.ResponseStatus
    created_at: Date
    updated_at: Date
    _count: FormResponseCountAggregateOutputType | null
    _avg: FormResponseAvgAggregateOutputType | null
    _sum: FormResponseSumAggregateOutputType | null
    _min: FormResponseMinAggregateOutputType | null
    _max: FormResponseMaxAggregateOutputType | null
  }

  type GetFormResponseGroupByPayload<T extends FormResponseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FormResponseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FormResponseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FormResponseGroupByOutputType[P]>
            : GetScalarType<T[P], FormResponseGroupByOutputType[P]>
        }
      >
    >


  export type FormResponseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    form_id?: boolean
    user_id?: boolean
    total_score?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    form?: boolean | FormDefaultArgs<ExtArgs>
    user?: boolean | FormResponse$userArgs<ExtArgs>
    values?: boolean | FormResponse$valuesArgs<ExtArgs>
    _count?: boolean | FormResponseCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["formResponse"]>



  export type FormResponseSelectScalar = {
    id?: boolean
    form_id?: boolean
    user_id?: boolean
    total_score?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type FormResponseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "form_id" | "user_id" | "total_score" | "status" | "created_at" | "updated_at", ExtArgs["result"]["formResponse"]>
  export type FormResponseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    form?: boolean | FormDefaultArgs<ExtArgs>
    user?: boolean | FormResponse$userArgs<ExtArgs>
    values?: boolean | FormResponse$valuesArgs<ExtArgs>
    _count?: boolean | FormResponseCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $FormResponsePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FormResponse"
    objects: {
      form: Prisma.$FormPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs> | null
      values: Prisma.$FormResponseValuePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      form_id: number
      user_id: number | null
      total_score: number
      status: $Enums.ResponseStatus
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["formResponse"]>
    composites: {}
  }

  type FormResponseGetPayload<S extends boolean | null | undefined | FormResponseDefaultArgs> = $Result.GetResult<Prisma.$FormResponsePayload, S>

  type FormResponseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FormResponseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FormResponseCountAggregateInputType | true
    }

  export interface FormResponseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FormResponse'], meta: { name: 'FormResponse' } }
    /**
     * Find zero or one FormResponse that matches the filter.
     * @param {FormResponseFindUniqueArgs} args - Arguments to find a FormResponse
     * @example
     * // Get one FormResponse
     * const formResponse = await prisma.formResponse.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FormResponseFindUniqueArgs>(args: SelectSubset<T, FormResponseFindUniqueArgs<ExtArgs>>): Prisma__FormResponseClient<$Result.GetResult<Prisma.$FormResponsePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FormResponse that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FormResponseFindUniqueOrThrowArgs} args - Arguments to find a FormResponse
     * @example
     * // Get one FormResponse
     * const formResponse = await prisma.formResponse.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FormResponseFindUniqueOrThrowArgs>(args: SelectSubset<T, FormResponseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FormResponseClient<$Result.GetResult<Prisma.$FormResponsePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FormResponse that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormResponseFindFirstArgs} args - Arguments to find a FormResponse
     * @example
     * // Get one FormResponse
     * const formResponse = await prisma.formResponse.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FormResponseFindFirstArgs>(args?: SelectSubset<T, FormResponseFindFirstArgs<ExtArgs>>): Prisma__FormResponseClient<$Result.GetResult<Prisma.$FormResponsePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FormResponse that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormResponseFindFirstOrThrowArgs} args - Arguments to find a FormResponse
     * @example
     * // Get one FormResponse
     * const formResponse = await prisma.formResponse.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FormResponseFindFirstOrThrowArgs>(args?: SelectSubset<T, FormResponseFindFirstOrThrowArgs<ExtArgs>>): Prisma__FormResponseClient<$Result.GetResult<Prisma.$FormResponsePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FormResponses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormResponseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FormResponses
     * const formResponses = await prisma.formResponse.findMany()
     * 
     * // Get first 10 FormResponses
     * const formResponses = await prisma.formResponse.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const formResponseWithIdOnly = await prisma.formResponse.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FormResponseFindManyArgs>(args?: SelectSubset<T, FormResponseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FormResponsePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FormResponse.
     * @param {FormResponseCreateArgs} args - Arguments to create a FormResponse.
     * @example
     * // Create one FormResponse
     * const FormResponse = await prisma.formResponse.create({
     *   data: {
     *     // ... data to create a FormResponse
     *   }
     * })
     * 
     */
    create<T extends FormResponseCreateArgs>(args: SelectSubset<T, FormResponseCreateArgs<ExtArgs>>): Prisma__FormResponseClient<$Result.GetResult<Prisma.$FormResponsePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FormResponses.
     * @param {FormResponseCreateManyArgs} args - Arguments to create many FormResponses.
     * @example
     * // Create many FormResponses
     * const formResponse = await prisma.formResponse.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FormResponseCreateManyArgs>(args?: SelectSubset<T, FormResponseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a FormResponse.
     * @param {FormResponseDeleteArgs} args - Arguments to delete one FormResponse.
     * @example
     * // Delete one FormResponse
     * const FormResponse = await prisma.formResponse.delete({
     *   where: {
     *     // ... filter to delete one FormResponse
     *   }
     * })
     * 
     */
    delete<T extends FormResponseDeleteArgs>(args: SelectSubset<T, FormResponseDeleteArgs<ExtArgs>>): Prisma__FormResponseClient<$Result.GetResult<Prisma.$FormResponsePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FormResponse.
     * @param {FormResponseUpdateArgs} args - Arguments to update one FormResponse.
     * @example
     * // Update one FormResponse
     * const formResponse = await prisma.formResponse.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FormResponseUpdateArgs>(args: SelectSubset<T, FormResponseUpdateArgs<ExtArgs>>): Prisma__FormResponseClient<$Result.GetResult<Prisma.$FormResponsePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FormResponses.
     * @param {FormResponseDeleteManyArgs} args - Arguments to filter FormResponses to delete.
     * @example
     * // Delete a few FormResponses
     * const { count } = await prisma.formResponse.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FormResponseDeleteManyArgs>(args?: SelectSubset<T, FormResponseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FormResponses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormResponseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FormResponses
     * const formResponse = await prisma.formResponse.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FormResponseUpdateManyArgs>(args: SelectSubset<T, FormResponseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one FormResponse.
     * @param {FormResponseUpsertArgs} args - Arguments to update or create a FormResponse.
     * @example
     * // Update or create a FormResponse
     * const formResponse = await prisma.formResponse.upsert({
     *   create: {
     *     // ... data to create a FormResponse
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FormResponse we want to update
     *   }
     * })
     */
    upsert<T extends FormResponseUpsertArgs>(args: SelectSubset<T, FormResponseUpsertArgs<ExtArgs>>): Prisma__FormResponseClient<$Result.GetResult<Prisma.$FormResponsePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FormResponses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormResponseCountArgs} args - Arguments to filter FormResponses to count.
     * @example
     * // Count the number of FormResponses
     * const count = await prisma.formResponse.count({
     *   where: {
     *     // ... the filter for the FormResponses we want to count
     *   }
     * })
    **/
    count<T extends FormResponseCountArgs>(
      args?: Subset<T, FormResponseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FormResponseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FormResponse.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormResponseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FormResponseAggregateArgs>(args: Subset<T, FormResponseAggregateArgs>): Prisma.PrismaPromise<GetFormResponseAggregateType<T>>

    /**
     * Group by FormResponse.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormResponseGroupByArgs} args - Group by arguments.
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
      T extends FormResponseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FormResponseGroupByArgs['orderBy'] }
        : { orderBy?: FormResponseGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, FormResponseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFormResponseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FormResponse model
   */
  readonly fields: FormResponseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FormResponse.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FormResponseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    form<T extends FormDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FormDefaultArgs<ExtArgs>>): Prisma__FormClient<$Result.GetResult<Prisma.$FormPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends FormResponse$userArgs<ExtArgs> = {}>(args?: Subset<T, FormResponse$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    values<T extends FormResponse$valuesArgs<ExtArgs> = {}>(args?: Subset<T, FormResponse$valuesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FormResponseValuePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the FormResponse model
   */
  interface FormResponseFieldRefs {
    readonly id: FieldRef<"FormResponse", 'Int'>
    readonly form_id: FieldRef<"FormResponse", 'Int'>
    readonly user_id: FieldRef<"FormResponse", 'Int'>
    readonly total_score: FieldRef<"FormResponse", 'Int'>
    readonly status: FieldRef<"FormResponse", 'ResponseStatus'>
    readonly created_at: FieldRef<"FormResponse", 'DateTime'>
    readonly updated_at: FieldRef<"FormResponse", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FormResponse findUnique
   */
  export type FormResponseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormResponse
     */
    select?: FormResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormResponse
     */
    omit?: FormResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormResponseInclude<ExtArgs> | null
    /**
     * Filter, which FormResponse to fetch.
     */
    where: FormResponseWhereUniqueInput
  }

  /**
   * FormResponse findUniqueOrThrow
   */
  export type FormResponseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormResponse
     */
    select?: FormResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormResponse
     */
    omit?: FormResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormResponseInclude<ExtArgs> | null
    /**
     * Filter, which FormResponse to fetch.
     */
    where: FormResponseWhereUniqueInput
  }

  /**
   * FormResponse findFirst
   */
  export type FormResponseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormResponse
     */
    select?: FormResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormResponse
     */
    omit?: FormResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormResponseInclude<ExtArgs> | null
    /**
     * Filter, which FormResponse to fetch.
     */
    where?: FormResponseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FormResponses to fetch.
     */
    orderBy?: FormResponseOrderByWithRelationInput | FormResponseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FormResponses.
     */
    cursor?: FormResponseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FormResponses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FormResponses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FormResponses.
     */
    distinct?: FormResponseScalarFieldEnum | FormResponseScalarFieldEnum[]
  }

  /**
   * FormResponse findFirstOrThrow
   */
  export type FormResponseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormResponse
     */
    select?: FormResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormResponse
     */
    omit?: FormResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormResponseInclude<ExtArgs> | null
    /**
     * Filter, which FormResponse to fetch.
     */
    where?: FormResponseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FormResponses to fetch.
     */
    orderBy?: FormResponseOrderByWithRelationInput | FormResponseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FormResponses.
     */
    cursor?: FormResponseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FormResponses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FormResponses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FormResponses.
     */
    distinct?: FormResponseScalarFieldEnum | FormResponseScalarFieldEnum[]
  }

  /**
   * FormResponse findMany
   */
  export type FormResponseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormResponse
     */
    select?: FormResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormResponse
     */
    omit?: FormResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormResponseInclude<ExtArgs> | null
    /**
     * Filter, which FormResponses to fetch.
     */
    where?: FormResponseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FormResponses to fetch.
     */
    orderBy?: FormResponseOrderByWithRelationInput | FormResponseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FormResponses.
     */
    cursor?: FormResponseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FormResponses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FormResponses.
     */
    skip?: number
    distinct?: FormResponseScalarFieldEnum | FormResponseScalarFieldEnum[]
  }

  /**
   * FormResponse create
   */
  export type FormResponseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormResponse
     */
    select?: FormResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormResponse
     */
    omit?: FormResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormResponseInclude<ExtArgs> | null
    /**
     * The data needed to create a FormResponse.
     */
    data: XOR<FormResponseCreateInput, FormResponseUncheckedCreateInput>
  }

  /**
   * FormResponse createMany
   */
  export type FormResponseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FormResponses.
     */
    data: FormResponseCreateManyInput | FormResponseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FormResponse update
   */
  export type FormResponseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormResponse
     */
    select?: FormResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormResponse
     */
    omit?: FormResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormResponseInclude<ExtArgs> | null
    /**
     * The data needed to update a FormResponse.
     */
    data: XOR<FormResponseUpdateInput, FormResponseUncheckedUpdateInput>
    /**
     * Choose, which FormResponse to update.
     */
    where: FormResponseWhereUniqueInput
  }

  /**
   * FormResponse updateMany
   */
  export type FormResponseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FormResponses.
     */
    data: XOR<FormResponseUpdateManyMutationInput, FormResponseUncheckedUpdateManyInput>
    /**
     * Filter which FormResponses to update
     */
    where?: FormResponseWhereInput
    /**
     * Limit how many FormResponses to update.
     */
    limit?: number
  }

  /**
   * FormResponse upsert
   */
  export type FormResponseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormResponse
     */
    select?: FormResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormResponse
     */
    omit?: FormResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormResponseInclude<ExtArgs> | null
    /**
     * The filter to search for the FormResponse to update in case it exists.
     */
    where: FormResponseWhereUniqueInput
    /**
     * In case the FormResponse found by the `where` argument doesn't exist, create a new FormResponse with this data.
     */
    create: XOR<FormResponseCreateInput, FormResponseUncheckedCreateInput>
    /**
     * In case the FormResponse was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FormResponseUpdateInput, FormResponseUncheckedUpdateInput>
  }

  /**
   * FormResponse delete
   */
  export type FormResponseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormResponse
     */
    select?: FormResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormResponse
     */
    omit?: FormResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormResponseInclude<ExtArgs> | null
    /**
     * Filter which FormResponse to delete.
     */
    where: FormResponseWhereUniqueInput
  }

  /**
   * FormResponse deleteMany
   */
  export type FormResponseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FormResponses to delete
     */
    where?: FormResponseWhereInput
    /**
     * Limit how many FormResponses to delete.
     */
    limit?: number
  }

  /**
   * FormResponse.user
   */
  export type FormResponse$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * FormResponse.values
   */
  export type FormResponse$valuesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormResponseValue
     */
    select?: FormResponseValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormResponseValue
     */
    omit?: FormResponseValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormResponseValueInclude<ExtArgs> | null
    where?: FormResponseValueWhereInput
    orderBy?: FormResponseValueOrderByWithRelationInput | FormResponseValueOrderByWithRelationInput[]
    cursor?: FormResponseValueWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FormResponseValueScalarFieldEnum | FormResponseValueScalarFieldEnum[]
  }

  /**
   * FormResponse without action
   */
  export type FormResponseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormResponse
     */
    select?: FormResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormResponse
     */
    omit?: FormResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormResponseInclude<ExtArgs> | null
  }


  /**
   * Model FormResponseValue
   */

  export type AggregateFormResponseValue = {
    _count: FormResponseValueCountAggregateOutputType | null
    _avg: FormResponseValueAvgAggregateOutputType | null
    _sum: FormResponseValueSumAggregateOutputType | null
    _min: FormResponseValueMinAggregateOutputType | null
    _max: FormResponseValueMaxAggregateOutputType | null
  }

  export type FormResponseValueAvgAggregateOutputType = {
    id: number | null
    response_id: number | null
    field_id: number | null
    score: number | null
  }

  export type FormResponseValueSumAggregateOutputType = {
    id: number | null
    response_id: number | null
    field_id: number | null
    score: number | null
  }

  export type FormResponseValueMinAggregateOutputType = {
    id: number | null
    response_id: number | null
    field_id: number | null
    value: string | null
    score: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type FormResponseValueMaxAggregateOutputType = {
    id: number | null
    response_id: number | null
    field_id: number | null
    value: string | null
    score: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type FormResponseValueCountAggregateOutputType = {
    id: number
    response_id: number
    field_id: number
    value: number
    score: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type FormResponseValueAvgAggregateInputType = {
    id?: true
    response_id?: true
    field_id?: true
    score?: true
  }

  export type FormResponseValueSumAggregateInputType = {
    id?: true
    response_id?: true
    field_id?: true
    score?: true
  }

  export type FormResponseValueMinAggregateInputType = {
    id?: true
    response_id?: true
    field_id?: true
    value?: true
    score?: true
    created_at?: true
    updated_at?: true
  }

  export type FormResponseValueMaxAggregateInputType = {
    id?: true
    response_id?: true
    field_id?: true
    value?: true
    score?: true
    created_at?: true
    updated_at?: true
  }

  export type FormResponseValueCountAggregateInputType = {
    id?: true
    response_id?: true
    field_id?: true
    value?: true
    score?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type FormResponseValueAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FormResponseValue to aggregate.
     */
    where?: FormResponseValueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FormResponseValues to fetch.
     */
    orderBy?: FormResponseValueOrderByWithRelationInput | FormResponseValueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FormResponseValueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FormResponseValues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FormResponseValues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FormResponseValues
    **/
    _count?: true | FormResponseValueCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FormResponseValueAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FormResponseValueSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FormResponseValueMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FormResponseValueMaxAggregateInputType
  }

  export type GetFormResponseValueAggregateType<T extends FormResponseValueAggregateArgs> = {
        [P in keyof T & keyof AggregateFormResponseValue]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFormResponseValue[P]>
      : GetScalarType<T[P], AggregateFormResponseValue[P]>
  }




  export type FormResponseValueGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FormResponseValueWhereInput
    orderBy?: FormResponseValueOrderByWithAggregationInput | FormResponseValueOrderByWithAggregationInput[]
    by: FormResponseValueScalarFieldEnum[] | FormResponseValueScalarFieldEnum
    having?: FormResponseValueScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FormResponseValueCountAggregateInputType | true
    _avg?: FormResponseValueAvgAggregateInputType
    _sum?: FormResponseValueSumAggregateInputType
    _min?: FormResponseValueMinAggregateInputType
    _max?: FormResponseValueMaxAggregateInputType
  }

  export type FormResponseValueGroupByOutputType = {
    id: number
    response_id: number
    field_id: number
    value: string | null
    score: number
    created_at: Date
    updated_at: Date
    _count: FormResponseValueCountAggregateOutputType | null
    _avg: FormResponseValueAvgAggregateOutputType | null
    _sum: FormResponseValueSumAggregateOutputType | null
    _min: FormResponseValueMinAggregateOutputType | null
    _max: FormResponseValueMaxAggregateOutputType | null
  }

  type GetFormResponseValueGroupByPayload<T extends FormResponseValueGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FormResponseValueGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FormResponseValueGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FormResponseValueGroupByOutputType[P]>
            : GetScalarType<T[P], FormResponseValueGroupByOutputType[P]>
        }
      >
    >


  export type FormResponseValueSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    response_id?: boolean
    field_id?: boolean
    value?: boolean
    score?: boolean
    created_at?: boolean
    updated_at?: boolean
    response?: boolean | FormResponseDefaultArgs<ExtArgs>
    field?: boolean | FormFieldDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["formResponseValue"]>



  export type FormResponseValueSelectScalar = {
    id?: boolean
    response_id?: boolean
    field_id?: boolean
    value?: boolean
    score?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type FormResponseValueOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "response_id" | "field_id" | "value" | "score" | "created_at" | "updated_at", ExtArgs["result"]["formResponseValue"]>
  export type FormResponseValueInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    response?: boolean | FormResponseDefaultArgs<ExtArgs>
    field?: boolean | FormFieldDefaultArgs<ExtArgs>
  }

  export type $FormResponseValuePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FormResponseValue"
    objects: {
      response: Prisma.$FormResponsePayload<ExtArgs>
      field: Prisma.$FormFieldPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      response_id: number
      field_id: number
      value: string | null
      score: number
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["formResponseValue"]>
    composites: {}
  }

  type FormResponseValueGetPayload<S extends boolean | null | undefined | FormResponseValueDefaultArgs> = $Result.GetResult<Prisma.$FormResponseValuePayload, S>

  type FormResponseValueCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FormResponseValueFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FormResponseValueCountAggregateInputType | true
    }

  export interface FormResponseValueDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FormResponseValue'], meta: { name: 'FormResponseValue' } }
    /**
     * Find zero or one FormResponseValue that matches the filter.
     * @param {FormResponseValueFindUniqueArgs} args - Arguments to find a FormResponseValue
     * @example
     * // Get one FormResponseValue
     * const formResponseValue = await prisma.formResponseValue.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FormResponseValueFindUniqueArgs>(args: SelectSubset<T, FormResponseValueFindUniqueArgs<ExtArgs>>): Prisma__FormResponseValueClient<$Result.GetResult<Prisma.$FormResponseValuePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FormResponseValue that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FormResponseValueFindUniqueOrThrowArgs} args - Arguments to find a FormResponseValue
     * @example
     * // Get one FormResponseValue
     * const formResponseValue = await prisma.formResponseValue.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FormResponseValueFindUniqueOrThrowArgs>(args: SelectSubset<T, FormResponseValueFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FormResponseValueClient<$Result.GetResult<Prisma.$FormResponseValuePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FormResponseValue that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormResponseValueFindFirstArgs} args - Arguments to find a FormResponseValue
     * @example
     * // Get one FormResponseValue
     * const formResponseValue = await prisma.formResponseValue.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FormResponseValueFindFirstArgs>(args?: SelectSubset<T, FormResponseValueFindFirstArgs<ExtArgs>>): Prisma__FormResponseValueClient<$Result.GetResult<Prisma.$FormResponseValuePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FormResponseValue that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormResponseValueFindFirstOrThrowArgs} args - Arguments to find a FormResponseValue
     * @example
     * // Get one FormResponseValue
     * const formResponseValue = await prisma.formResponseValue.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FormResponseValueFindFirstOrThrowArgs>(args?: SelectSubset<T, FormResponseValueFindFirstOrThrowArgs<ExtArgs>>): Prisma__FormResponseValueClient<$Result.GetResult<Prisma.$FormResponseValuePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FormResponseValues that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormResponseValueFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FormResponseValues
     * const formResponseValues = await prisma.formResponseValue.findMany()
     * 
     * // Get first 10 FormResponseValues
     * const formResponseValues = await prisma.formResponseValue.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const formResponseValueWithIdOnly = await prisma.formResponseValue.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FormResponseValueFindManyArgs>(args?: SelectSubset<T, FormResponseValueFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FormResponseValuePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FormResponseValue.
     * @param {FormResponseValueCreateArgs} args - Arguments to create a FormResponseValue.
     * @example
     * // Create one FormResponseValue
     * const FormResponseValue = await prisma.formResponseValue.create({
     *   data: {
     *     // ... data to create a FormResponseValue
     *   }
     * })
     * 
     */
    create<T extends FormResponseValueCreateArgs>(args: SelectSubset<T, FormResponseValueCreateArgs<ExtArgs>>): Prisma__FormResponseValueClient<$Result.GetResult<Prisma.$FormResponseValuePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FormResponseValues.
     * @param {FormResponseValueCreateManyArgs} args - Arguments to create many FormResponseValues.
     * @example
     * // Create many FormResponseValues
     * const formResponseValue = await prisma.formResponseValue.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FormResponseValueCreateManyArgs>(args?: SelectSubset<T, FormResponseValueCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a FormResponseValue.
     * @param {FormResponseValueDeleteArgs} args - Arguments to delete one FormResponseValue.
     * @example
     * // Delete one FormResponseValue
     * const FormResponseValue = await prisma.formResponseValue.delete({
     *   where: {
     *     // ... filter to delete one FormResponseValue
     *   }
     * })
     * 
     */
    delete<T extends FormResponseValueDeleteArgs>(args: SelectSubset<T, FormResponseValueDeleteArgs<ExtArgs>>): Prisma__FormResponseValueClient<$Result.GetResult<Prisma.$FormResponseValuePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FormResponseValue.
     * @param {FormResponseValueUpdateArgs} args - Arguments to update one FormResponseValue.
     * @example
     * // Update one FormResponseValue
     * const formResponseValue = await prisma.formResponseValue.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FormResponseValueUpdateArgs>(args: SelectSubset<T, FormResponseValueUpdateArgs<ExtArgs>>): Prisma__FormResponseValueClient<$Result.GetResult<Prisma.$FormResponseValuePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FormResponseValues.
     * @param {FormResponseValueDeleteManyArgs} args - Arguments to filter FormResponseValues to delete.
     * @example
     * // Delete a few FormResponseValues
     * const { count } = await prisma.formResponseValue.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FormResponseValueDeleteManyArgs>(args?: SelectSubset<T, FormResponseValueDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FormResponseValues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormResponseValueUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FormResponseValues
     * const formResponseValue = await prisma.formResponseValue.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FormResponseValueUpdateManyArgs>(args: SelectSubset<T, FormResponseValueUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one FormResponseValue.
     * @param {FormResponseValueUpsertArgs} args - Arguments to update or create a FormResponseValue.
     * @example
     * // Update or create a FormResponseValue
     * const formResponseValue = await prisma.formResponseValue.upsert({
     *   create: {
     *     // ... data to create a FormResponseValue
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FormResponseValue we want to update
     *   }
     * })
     */
    upsert<T extends FormResponseValueUpsertArgs>(args: SelectSubset<T, FormResponseValueUpsertArgs<ExtArgs>>): Prisma__FormResponseValueClient<$Result.GetResult<Prisma.$FormResponseValuePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FormResponseValues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormResponseValueCountArgs} args - Arguments to filter FormResponseValues to count.
     * @example
     * // Count the number of FormResponseValues
     * const count = await prisma.formResponseValue.count({
     *   where: {
     *     // ... the filter for the FormResponseValues we want to count
     *   }
     * })
    **/
    count<T extends FormResponseValueCountArgs>(
      args?: Subset<T, FormResponseValueCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FormResponseValueCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FormResponseValue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormResponseValueAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FormResponseValueAggregateArgs>(args: Subset<T, FormResponseValueAggregateArgs>): Prisma.PrismaPromise<GetFormResponseValueAggregateType<T>>

    /**
     * Group by FormResponseValue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FormResponseValueGroupByArgs} args - Group by arguments.
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
      T extends FormResponseValueGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FormResponseValueGroupByArgs['orderBy'] }
        : { orderBy?: FormResponseValueGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, FormResponseValueGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFormResponseValueGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FormResponseValue model
   */
  readonly fields: FormResponseValueFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FormResponseValue.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FormResponseValueClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    response<T extends FormResponseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FormResponseDefaultArgs<ExtArgs>>): Prisma__FormResponseClient<$Result.GetResult<Prisma.$FormResponsePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    field<T extends FormFieldDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FormFieldDefaultArgs<ExtArgs>>): Prisma__FormFieldClient<$Result.GetResult<Prisma.$FormFieldPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the FormResponseValue model
   */
  interface FormResponseValueFieldRefs {
    readonly id: FieldRef<"FormResponseValue", 'Int'>
    readonly response_id: FieldRef<"FormResponseValue", 'Int'>
    readonly field_id: FieldRef<"FormResponseValue", 'Int'>
    readonly value: FieldRef<"FormResponseValue", 'String'>
    readonly score: FieldRef<"FormResponseValue", 'Int'>
    readonly created_at: FieldRef<"FormResponseValue", 'DateTime'>
    readonly updated_at: FieldRef<"FormResponseValue", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FormResponseValue findUnique
   */
  export type FormResponseValueFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormResponseValue
     */
    select?: FormResponseValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormResponseValue
     */
    omit?: FormResponseValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormResponseValueInclude<ExtArgs> | null
    /**
     * Filter, which FormResponseValue to fetch.
     */
    where: FormResponseValueWhereUniqueInput
  }

  /**
   * FormResponseValue findUniqueOrThrow
   */
  export type FormResponseValueFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormResponseValue
     */
    select?: FormResponseValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormResponseValue
     */
    omit?: FormResponseValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormResponseValueInclude<ExtArgs> | null
    /**
     * Filter, which FormResponseValue to fetch.
     */
    where: FormResponseValueWhereUniqueInput
  }

  /**
   * FormResponseValue findFirst
   */
  export type FormResponseValueFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormResponseValue
     */
    select?: FormResponseValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormResponseValue
     */
    omit?: FormResponseValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormResponseValueInclude<ExtArgs> | null
    /**
     * Filter, which FormResponseValue to fetch.
     */
    where?: FormResponseValueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FormResponseValues to fetch.
     */
    orderBy?: FormResponseValueOrderByWithRelationInput | FormResponseValueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FormResponseValues.
     */
    cursor?: FormResponseValueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FormResponseValues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FormResponseValues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FormResponseValues.
     */
    distinct?: FormResponseValueScalarFieldEnum | FormResponseValueScalarFieldEnum[]
  }

  /**
   * FormResponseValue findFirstOrThrow
   */
  export type FormResponseValueFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormResponseValue
     */
    select?: FormResponseValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormResponseValue
     */
    omit?: FormResponseValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormResponseValueInclude<ExtArgs> | null
    /**
     * Filter, which FormResponseValue to fetch.
     */
    where?: FormResponseValueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FormResponseValues to fetch.
     */
    orderBy?: FormResponseValueOrderByWithRelationInput | FormResponseValueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FormResponseValues.
     */
    cursor?: FormResponseValueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FormResponseValues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FormResponseValues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FormResponseValues.
     */
    distinct?: FormResponseValueScalarFieldEnum | FormResponseValueScalarFieldEnum[]
  }

  /**
   * FormResponseValue findMany
   */
  export type FormResponseValueFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormResponseValue
     */
    select?: FormResponseValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormResponseValue
     */
    omit?: FormResponseValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormResponseValueInclude<ExtArgs> | null
    /**
     * Filter, which FormResponseValues to fetch.
     */
    where?: FormResponseValueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FormResponseValues to fetch.
     */
    orderBy?: FormResponseValueOrderByWithRelationInput | FormResponseValueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FormResponseValues.
     */
    cursor?: FormResponseValueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FormResponseValues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FormResponseValues.
     */
    skip?: number
    distinct?: FormResponseValueScalarFieldEnum | FormResponseValueScalarFieldEnum[]
  }

  /**
   * FormResponseValue create
   */
  export type FormResponseValueCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormResponseValue
     */
    select?: FormResponseValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormResponseValue
     */
    omit?: FormResponseValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormResponseValueInclude<ExtArgs> | null
    /**
     * The data needed to create a FormResponseValue.
     */
    data: XOR<FormResponseValueCreateInput, FormResponseValueUncheckedCreateInput>
  }

  /**
   * FormResponseValue createMany
   */
  export type FormResponseValueCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FormResponseValues.
     */
    data: FormResponseValueCreateManyInput | FormResponseValueCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FormResponseValue update
   */
  export type FormResponseValueUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormResponseValue
     */
    select?: FormResponseValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormResponseValue
     */
    omit?: FormResponseValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormResponseValueInclude<ExtArgs> | null
    /**
     * The data needed to update a FormResponseValue.
     */
    data: XOR<FormResponseValueUpdateInput, FormResponseValueUncheckedUpdateInput>
    /**
     * Choose, which FormResponseValue to update.
     */
    where: FormResponseValueWhereUniqueInput
  }

  /**
   * FormResponseValue updateMany
   */
  export type FormResponseValueUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FormResponseValues.
     */
    data: XOR<FormResponseValueUpdateManyMutationInput, FormResponseValueUncheckedUpdateManyInput>
    /**
     * Filter which FormResponseValues to update
     */
    where?: FormResponseValueWhereInput
    /**
     * Limit how many FormResponseValues to update.
     */
    limit?: number
  }

  /**
   * FormResponseValue upsert
   */
  export type FormResponseValueUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormResponseValue
     */
    select?: FormResponseValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormResponseValue
     */
    omit?: FormResponseValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormResponseValueInclude<ExtArgs> | null
    /**
     * The filter to search for the FormResponseValue to update in case it exists.
     */
    where: FormResponseValueWhereUniqueInput
    /**
     * In case the FormResponseValue found by the `where` argument doesn't exist, create a new FormResponseValue with this data.
     */
    create: XOR<FormResponseValueCreateInput, FormResponseValueUncheckedCreateInput>
    /**
     * In case the FormResponseValue was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FormResponseValueUpdateInput, FormResponseValueUncheckedUpdateInput>
  }

  /**
   * FormResponseValue delete
   */
  export type FormResponseValueDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormResponseValue
     */
    select?: FormResponseValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormResponseValue
     */
    omit?: FormResponseValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormResponseValueInclude<ExtArgs> | null
    /**
     * Filter which FormResponseValue to delete.
     */
    where: FormResponseValueWhereUniqueInput
  }

  /**
   * FormResponseValue deleteMany
   */
  export type FormResponseValueDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FormResponseValues to delete
     */
    where?: FormResponseValueWhereInput
    /**
     * Limit how many FormResponseValues to delete.
     */
    limit?: number
  }

  /**
   * FormResponseValue without action
   */
  export type FormResponseValueDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FormResponseValue
     */
    select?: FormResponseValueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FormResponseValue
     */
    omit?: FormResponseValueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FormResponseValueInclude<ExtArgs> | null
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


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    username: 'username',
    first_name: 'first_name',
    last_name: 'last_name',
    phone: 'phone',
    password: 'password',
    google_id: 'google_id',
    default_role_id: 'default_role_id',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const RoleScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type RoleScalarFieldEnum = (typeof RoleScalarFieldEnum)[keyof typeof RoleScalarFieldEnum]


  export const PolicyScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type PolicyScalarFieldEnum = (typeof PolicyScalarFieldEnum)[keyof typeof PolicyScalarFieldEnum]


  export const RolePolicyScalarFieldEnum: {
    id: 'id',
    role_id: 'role_id',
    policy_id: 'policy_id',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type RolePolicyScalarFieldEnum = (typeof RolePolicyScalarFieldEnum)[keyof typeof RolePolicyScalarFieldEnum]


  export const UserRoleScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    role_id: 'role_id',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type UserRoleScalarFieldEnum = (typeof UserRoleScalarFieldEnum)[keyof typeof UserRoleScalarFieldEnum]


  export const GroupScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type GroupScalarFieldEnum = (typeof GroupScalarFieldEnum)[keyof typeof GroupScalarFieldEnum]


  export const GroupUserScalarFieldEnum: {
    id: 'id',
    group_id: 'group_id',
    user_id: 'user_id',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type GroupUserScalarFieldEnum = (typeof GroupUserScalarFieldEnum)[keyof typeof GroupUserScalarFieldEnum]


  export const FormScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    created_by: 'created_by',
    is_active: 'is_active',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type FormScalarFieldEnum = (typeof FormScalarFieldEnum)[keyof typeof FormScalarFieldEnum]


  export const FormAccessScalarFieldEnum: {
    id: 'id',
    form_id: 'form_id',
    access_type: 'access_type',
    access_value: 'access_value',
    expires_at: 'expires_at',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type FormAccessScalarFieldEnum = (typeof FormAccessScalarFieldEnum)[keyof typeof FormAccessScalarFieldEnum]


  export const FormFieldScalarFieldEnum: {
    id: 'id',
    form_id: 'form_id',
    field_key: 'field_key',
    label: 'label',
    field_type: 'field_type',
    mode: 'mode',
    is_required: 'is_required',
    field_order: 'field_order',
    settings: 'settings',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type FormFieldScalarFieldEnum = (typeof FormFieldScalarFieldEnum)[keyof typeof FormFieldScalarFieldEnum]


  export const FormFieldOptionScalarFieldEnum: {
    id: 'id',
    field_id: 'field_id',
    value: 'value',
    label: 'label',
    score: 'score',
    option_order: 'option_order',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type FormFieldOptionScalarFieldEnum = (typeof FormFieldOptionScalarFieldEnum)[keyof typeof FormFieldOptionScalarFieldEnum]


  export const FormFieldTableSourceScalarFieldEnum: {
    id: 'id',
    field_id: 'field_id',
    source_table: 'source_table',
    source_value_column: 'source_value_column',
    source_label_column: 'source_label_column',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type FormFieldTableSourceScalarFieldEnum = (typeof FormFieldTableSourceScalarFieldEnum)[keyof typeof FormFieldTableSourceScalarFieldEnum]


  export const FormResponseScalarFieldEnum: {
    id: 'id',
    form_id: 'form_id',
    user_id: 'user_id',
    total_score: 'total_score',
    status: 'status',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type FormResponseScalarFieldEnum = (typeof FormResponseScalarFieldEnum)[keyof typeof FormResponseScalarFieldEnum]


  export const FormResponseValueScalarFieldEnum: {
    id: 'id',
    response_id: 'response_id',
    field_id: 'field_id',
    value: 'value',
    score: 'score',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type FormResponseValueScalarFieldEnum = (typeof FormResponseValueScalarFieldEnum)[keyof typeof FormResponseValueScalarFieldEnum]


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


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const UserOrderByRelevanceFieldEnum: {
    email: 'email',
    username: 'username',
    first_name: 'first_name',
    last_name: 'last_name',
    phone: 'phone',
    password: 'password',
    google_id: 'google_id'
  };

  export type UserOrderByRelevanceFieldEnum = (typeof UserOrderByRelevanceFieldEnum)[keyof typeof UserOrderByRelevanceFieldEnum]


  export const RoleOrderByRelevanceFieldEnum: {
    name: 'name',
    description: 'description'
  };

  export type RoleOrderByRelevanceFieldEnum = (typeof RoleOrderByRelevanceFieldEnum)[keyof typeof RoleOrderByRelevanceFieldEnum]


  export const PolicyOrderByRelevanceFieldEnum: {
    name: 'name',
    description: 'description'
  };

  export type PolicyOrderByRelevanceFieldEnum = (typeof PolicyOrderByRelevanceFieldEnum)[keyof typeof PolicyOrderByRelevanceFieldEnum]


  export const GroupOrderByRelevanceFieldEnum: {
    name: 'name',
    description: 'description'
  };

  export type GroupOrderByRelevanceFieldEnum = (typeof GroupOrderByRelevanceFieldEnum)[keyof typeof GroupOrderByRelevanceFieldEnum]


  export const FormOrderByRelevanceFieldEnum: {
    name: 'name',
    description: 'description'
  };

  export type FormOrderByRelevanceFieldEnum = (typeof FormOrderByRelevanceFieldEnum)[keyof typeof FormOrderByRelevanceFieldEnum]


  export const FormAccessOrderByRelevanceFieldEnum: {
    access_value: 'access_value'
  };

  export type FormAccessOrderByRelevanceFieldEnum = (typeof FormAccessOrderByRelevanceFieldEnum)[keyof typeof FormAccessOrderByRelevanceFieldEnum]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const FormFieldOrderByRelevanceFieldEnum: {
    field_key: 'field_key',
    label: 'label'
  };

  export type FormFieldOrderByRelevanceFieldEnum = (typeof FormFieldOrderByRelevanceFieldEnum)[keyof typeof FormFieldOrderByRelevanceFieldEnum]


  export const FormFieldOptionOrderByRelevanceFieldEnum: {
    value: 'value',
    label: 'label'
  };

  export type FormFieldOptionOrderByRelevanceFieldEnum = (typeof FormFieldOptionOrderByRelevanceFieldEnum)[keyof typeof FormFieldOptionOrderByRelevanceFieldEnum]


  export const FormFieldTableSourceOrderByRelevanceFieldEnum: {
    source_table: 'source_table',
    source_value_column: 'source_value_column',
    source_label_column: 'source_label_column'
  };

  export type FormFieldTableSourceOrderByRelevanceFieldEnum = (typeof FormFieldTableSourceOrderByRelevanceFieldEnum)[keyof typeof FormFieldTableSourceOrderByRelevanceFieldEnum]


  export const FormResponseValueOrderByRelevanceFieldEnum: {
    value: 'value'
  };

  export type FormResponseValueOrderByRelevanceFieldEnum = (typeof FormResponseValueOrderByRelevanceFieldEnum)[keyof typeof FormResponseValueOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'AccessType'
   */
  export type EnumAccessTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AccessType'>
    


  /**
   * Reference to a field of type 'FieldType'
   */
  export type EnumFieldTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FieldType'>
    


  /**
   * Reference to a field of type 'FieldMode'
   */
  export type EnumFieldModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FieldMode'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'ResponseStatus'
   */
  export type EnumResponseStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ResponseStatus'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringNullableFilter<"User"> | string | null
    username?: StringNullableFilter<"User"> | string | null
    first_name?: StringNullableFilter<"User"> | string | null
    last_name?: StringNullableFilter<"User"> | string | null
    phone?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    google_id?: StringNullableFilter<"User"> | string | null
    default_role_id?: IntNullableFilter<"User"> | number | null
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
    default_role?: XOR<RoleNullableScalarRelationFilter, RoleWhereInput> | null
    roles?: UserRoleListRelationFilter
    groups?: GroupUserListRelationFilter
    forms?: FormListRelationFilter
    responses?: FormResponseListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrderInput | SortOrder
    username?: SortOrderInput | SortOrder
    first_name?: SortOrderInput | SortOrder
    last_name?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    google_id?: SortOrderInput | SortOrder
    default_role_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    default_role?: RoleOrderByWithRelationInput
    roles?: UserRoleOrderByRelationAggregateInput
    groups?: GroupUserOrderByRelationAggregateInput
    forms?: FormOrderByRelationAggregateInput
    responses?: FormResponseOrderByRelationAggregateInput
    _relevance?: UserOrderByRelevanceInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    username?: string
    google_id?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    first_name?: StringNullableFilter<"User"> | string | null
    last_name?: StringNullableFilter<"User"> | string | null
    phone?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    default_role_id?: IntNullableFilter<"User"> | number | null
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
    default_role?: XOR<RoleNullableScalarRelationFilter, RoleWhereInput> | null
    roles?: UserRoleListRelationFilter
    groups?: GroupUserListRelationFilter
    forms?: FormListRelationFilter
    responses?: FormResponseListRelationFilter
  }, "id" | "email" | "username" | "google_id">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrderInput | SortOrder
    username?: SortOrderInput | SortOrder
    first_name?: SortOrderInput | SortOrder
    last_name?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    google_id?: SortOrderInput | SortOrder
    default_role_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    username?: StringNullableWithAggregatesFilter<"User"> | string | null
    first_name?: StringNullableWithAggregatesFilter<"User"> | string | null
    last_name?: StringNullableWithAggregatesFilter<"User"> | string | null
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
    google_id?: StringNullableWithAggregatesFilter<"User"> | string | null
    default_role_id?: IntNullableWithAggregatesFilter<"User"> | number | null
    created_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type RoleWhereInput = {
    AND?: RoleWhereInput | RoleWhereInput[]
    OR?: RoleWhereInput[]
    NOT?: RoleWhereInput | RoleWhereInput[]
    id?: IntFilter<"Role"> | number
    name?: StringFilter<"Role"> | string
    description?: StringNullableFilter<"Role"> | string | null
    created_at?: DateTimeFilter<"Role"> | Date | string
    updated_at?: DateTimeFilter<"Role"> | Date | string
    policies?: RolePolicyListRelationFilter
    users?: UserRoleListRelationFilter
    defaultForUsers?: UserListRelationFilter
  }

  export type RoleOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    policies?: RolePolicyOrderByRelationAggregateInput
    users?: UserRoleOrderByRelationAggregateInput
    defaultForUsers?: UserOrderByRelationAggregateInput
    _relevance?: RoleOrderByRelevanceInput
  }

  export type RoleWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: RoleWhereInput | RoleWhereInput[]
    OR?: RoleWhereInput[]
    NOT?: RoleWhereInput | RoleWhereInput[]
    description?: StringNullableFilter<"Role"> | string | null
    created_at?: DateTimeFilter<"Role"> | Date | string
    updated_at?: DateTimeFilter<"Role"> | Date | string
    policies?: RolePolicyListRelationFilter
    users?: UserRoleListRelationFilter
    defaultForUsers?: UserListRelationFilter
  }, "id" | "name">

  export type RoleOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: RoleCountOrderByAggregateInput
    _avg?: RoleAvgOrderByAggregateInput
    _max?: RoleMaxOrderByAggregateInput
    _min?: RoleMinOrderByAggregateInput
    _sum?: RoleSumOrderByAggregateInput
  }

  export type RoleScalarWhereWithAggregatesInput = {
    AND?: RoleScalarWhereWithAggregatesInput | RoleScalarWhereWithAggregatesInput[]
    OR?: RoleScalarWhereWithAggregatesInput[]
    NOT?: RoleScalarWhereWithAggregatesInput | RoleScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Role"> | number
    name?: StringWithAggregatesFilter<"Role"> | string
    description?: StringNullableWithAggregatesFilter<"Role"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"Role"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Role"> | Date | string
  }

  export type PolicyWhereInput = {
    AND?: PolicyWhereInput | PolicyWhereInput[]
    OR?: PolicyWhereInput[]
    NOT?: PolicyWhereInput | PolicyWhereInput[]
    id?: IntFilter<"Policy"> | number
    name?: StringFilter<"Policy"> | string
    description?: StringNullableFilter<"Policy"> | string | null
    created_at?: DateTimeFilter<"Policy"> | Date | string
    updated_at?: DateTimeFilter<"Policy"> | Date | string
    roles?: RolePolicyListRelationFilter
  }

  export type PolicyOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    roles?: RolePolicyOrderByRelationAggregateInput
    _relevance?: PolicyOrderByRelevanceInput
  }

  export type PolicyWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: PolicyWhereInput | PolicyWhereInput[]
    OR?: PolicyWhereInput[]
    NOT?: PolicyWhereInput | PolicyWhereInput[]
    description?: StringNullableFilter<"Policy"> | string | null
    created_at?: DateTimeFilter<"Policy"> | Date | string
    updated_at?: DateTimeFilter<"Policy"> | Date | string
    roles?: RolePolicyListRelationFilter
  }, "id" | "name">

  export type PolicyOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: PolicyCountOrderByAggregateInput
    _avg?: PolicyAvgOrderByAggregateInput
    _max?: PolicyMaxOrderByAggregateInput
    _min?: PolicyMinOrderByAggregateInput
    _sum?: PolicySumOrderByAggregateInput
  }

  export type PolicyScalarWhereWithAggregatesInput = {
    AND?: PolicyScalarWhereWithAggregatesInput | PolicyScalarWhereWithAggregatesInput[]
    OR?: PolicyScalarWhereWithAggregatesInput[]
    NOT?: PolicyScalarWhereWithAggregatesInput | PolicyScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Policy"> | number
    name?: StringWithAggregatesFilter<"Policy"> | string
    description?: StringNullableWithAggregatesFilter<"Policy"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"Policy"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Policy"> | Date | string
  }

  export type RolePolicyWhereInput = {
    AND?: RolePolicyWhereInput | RolePolicyWhereInput[]
    OR?: RolePolicyWhereInput[]
    NOT?: RolePolicyWhereInput | RolePolicyWhereInput[]
    id?: IntFilter<"RolePolicy"> | number
    role_id?: IntFilter<"RolePolicy"> | number
    policy_id?: IntFilter<"RolePolicy"> | number
    created_at?: DateTimeFilter<"RolePolicy"> | Date | string
    updated_at?: DateTimeFilter<"RolePolicy"> | Date | string
    role?: XOR<RoleScalarRelationFilter, RoleWhereInput>
    policy?: XOR<PolicyScalarRelationFilter, PolicyWhereInput>
  }

  export type RolePolicyOrderByWithRelationInput = {
    id?: SortOrder
    role_id?: SortOrder
    policy_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    role?: RoleOrderByWithRelationInput
    policy?: PolicyOrderByWithRelationInput
  }

  export type RolePolicyWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    role_id_policy_id?: RolePolicyRole_idPolicy_idCompoundUniqueInput
    AND?: RolePolicyWhereInput | RolePolicyWhereInput[]
    OR?: RolePolicyWhereInput[]
    NOT?: RolePolicyWhereInput | RolePolicyWhereInput[]
    role_id?: IntFilter<"RolePolicy"> | number
    policy_id?: IntFilter<"RolePolicy"> | number
    created_at?: DateTimeFilter<"RolePolicy"> | Date | string
    updated_at?: DateTimeFilter<"RolePolicy"> | Date | string
    role?: XOR<RoleScalarRelationFilter, RoleWhereInput>
    policy?: XOR<PolicyScalarRelationFilter, PolicyWhereInput>
  }, "id" | "role_id_policy_id">

  export type RolePolicyOrderByWithAggregationInput = {
    id?: SortOrder
    role_id?: SortOrder
    policy_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: RolePolicyCountOrderByAggregateInput
    _avg?: RolePolicyAvgOrderByAggregateInput
    _max?: RolePolicyMaxOrderByAggregateInput
    _min?: RolePolicyMinOrderByAggregateInput
    _sum?: RolePolicySumOrderByAggregateInput
  }

  export type RolePolicyScalarWhereWithAggregatesInput = {
    AND?: RolePolicyScalarWhereWithAggregatesInput | RolePolicyScalarWhereWithAggregatesInput[]
    OR?: RolePolicyScalarWhereWithAggregatesInput[]
    NOT?: RolePolicyScalarWhereWithAggregatesInput | RolePolicyScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"RolePolicy"> | number
    role_id?: IntWithAggregatesFilter<"RolePolicy"> | number
    policy_id?: IntWithAggregatesFilter<"RolePolicy"> | number
    created_at?: DateTimeWithAggregatesFilter<"RolePolicy"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"RolePolicy"> | Date | string
  }

  export type UserRoleWhereInput = {
    AND?: UserRoleWhereInput | UserRoleWhereInput[]
    OR?: UserRoleWhereInput[]
    NOT?: UserRoleWhereInput | UserRoleWhereInput[]
    id?: IntFilter<"UserRole"> | number
    user_id?: IntFilter<"UserRole"> | number
    role_id?: IntFilter<"UserRole"> | number
    created_at?: DateTimeFilter<"UserRole"> | Date | string
    updated_at?: DateTimeFilter<"UserRole"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    role?: XOR<RoleScalarRelationFilter, RoleWhereInput>
  }

  export type UserRoleOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    role_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user?: UserOrderByWithRelationInput
    role?: RoleOrderByWithRelationInput
  }

  export type UserRoleWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    user_id_role_id?: UserRoleUser_idRole_idCompoundUniqueInput
    AND?: UserRoleWhereInput | UserRoleWhereInput[]
    OR?: UserRoleWhereInput[]
    NOT?: UserRoleWhereInput | UserRoleWhereInput[]
    user_id?: IntFilter<"UserRole"> | number
    role_id?: IntFilter<"UserRole"> | number
    created_at?: DateTimeFilter<"UserRole"> | Date | string
    updated_at?: DateTimeFilter<"UserRole"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    role?: XOR<RoleScalarRelationFilter, RoleWhereInput>
  }, "id" | "user_id_role_id">

  export type UserRoleOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    role_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: UserRoleCountOrderByAggregateInput
    _avg?: UserRoleAvgOrderByAggregateInput
    _max?: UserRoleMaxOrderByAggregateInput
    _min?: UserRoleMinOrderByAggregateInput
    _sum?: UserRoleSumOrderByAggregateInput
  }

  export type UserRoleScalarWhereWithAggregatesInput = {
    AND?: UserRoleScalarWhereWithAggregatesInput | UserRoleScalarWhereWithAggregatesInput[]
    OR?: UserRoleScalarWhereWithAggregatesInput[]
    NOT?: UserRoleScalarWhereWithAggregatesInput | UserRoleScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"UserRole"> | number
    user_id?: IntWithAggregatesFilter<"UserRole"> | number
    role_id?: IntWithAggregatesFilter<"UserRole"> | number
    created_at?: DateTimeWithAggregatesFilter<"UserRole"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"UserRole"> | Date | string
  }

  export type GroupWhereInput = {
    AND?: GroupWhereInput | GroupWhereInput[]
    OR?: GroupWhereInput[]
    NOT?: GroupWhereInput | GroupWhereInput[]
    id?: IntFilter<"Group"> | number
    name?: StringFilter<"Group"> | string
    description?: StringNullableFilter<"Group"> | string | null
    created_at?: DateTimeFilter<"Group"> | Date | string
    updated_at?: DateTimeFilter<"Group"> | Date | string
    users?: GroupUserListRelationFilter
  }

  export type GroupOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    users?: GroupUserOrderByRelationAggregateInput
    _relevance?: GroupOrderByRelevanceInput
  }

  export type GroupWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: GroupWhereInput | GroupWhereInput[]
    OR?: GroupWhereInput[]
    NOT?: GroupWhereInput | GroupWhereInput[]
    name?: StringFilter<"Group"> | string
    description?: StringNullableFilter<"Group"> | string | null
    created_at?: DateTimeFilter<"Group"> | Date | string
    updated_at?: DateTimeFilter<"Group"> | Date | string
    users?: GroupUserListRelationFilter
  }, "id">

  export type GroupOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: GroupCountOrderByAggregateInput
    _avg?: GroupAvgOrderByAggregateInput
    _max?: GroupMaxOrderByAggregateInput
    _min?: GroupMinOrderByAggregateInput
    _sum?: GroupSumOrderByAggregateInput
  }

  export type GroupScalarWhereWithAggregatesInput = {
    AND?: GroupScalarWhereWithAggregatesInput | GroupScalarWhereWithAggregatesInput[]
    OR?: GroupScalarWhereWithAggregatesInput[]
    NOT?: GroupScalarWhereWithAggregatesInput | GroupScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Group"> | number
    name?: StringWithAggregatesFilter<"Group"> | string
    description?: StringNullableWithAggregatesFilter<"Group"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"Group"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Group"> | Date | string
  }

  export type GroupUserWhereInput = {
    AND?: GroupUserWhereInput | GroupUserWhereInput[]
    OR?: GroupUserWhereInput[]
    NOT?: GroupUserWhereInput | GroupUserWhereInput[]
    id?: IntFilter<"GroupUser"> | number
    group_id?: IntFilter<"GroupUser"> | number
    user_id?: IntFilter<"GroupUser"> | number
    created_at?: DateTimeFilter<"GroupUser"> | Date | string
    updated_at?: DateTimeFilter<"GroupUser"> | Date | string
    group?: XOR<GroupScalarRelationFilter, GroupWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type GroupUserOrderByWithRelationInput = {
    id?: SortOrder
    group_id?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    group?: GroupOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type GroupUserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    group_id_user_id?: GroupUserGroup_idUser_idCompoundUniqueInput
    AND?: GroupUserWhereInput | GroupUserWhereInput[]
    OR?: GroupUserWhereInput[]
    NOT?: GroupUserWhereInput | GroupUserWhereInput[]
    group_id?: IntFilter<"GroupUser"> | number
    user_id?: IntFilter<"GroupUser"> | number
    created_at?: DateTimeFilter<"GroupUser"> | Date | string
    updated_at?: DateTimeFilter<"GroupUser"> | Date | string
    group?: XOR<GroupScalarRelationFilter, GroupWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "group_id_user_id">

  export type GroupUserOrderByWithAggregationInput = {
    id?: SortOrder
    group_id?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: GroupUserCountOrderByAggregateInput
    _avg?: GroupUserAvgOrderByAggregateInput
    _max?: GroupUserMaxOrderByAggregateInput
    _min?: GroupUserMinOrderByAggregateInput
    _sum?: GroupUserSumOrderByAggregateInput
  }

  export type GroupUserScalarWhereWithAggregatesInput = {
    AND?: GroupUserScalarWhereWithAggregatesInput | GroupUserScalarWhereWithAggregatesInput[]
    OR?: GroupUserScalarWhereWithAggregatesInput[]
    NOT?: GroupUserScalarWhereWithAggregatesInput | GroupUserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"GroupUser"> | number
    group_id?: IntWithAggregatesFilter<"GroupUser"> | number
    user_id?: IntWithAggregatesFilter<"GroupUser"> | number
    created_at?: DateTimeWithAggregatesFilter<"GroupUser"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"GroupUser"> | Date | string
  }

  export type FormWhereInput = {
    AND?: FormWhereInput | FormWhereInput[]
    OR?: FormWhereInput[]
    NOT?: FormWhereInput | FormWhereInput[]
    id?: IntFilter<"Form"> | number
    name?: StringFilter<"Form"> | string
    description?: StringNullableFilter<"Form"> | string | null
    created_by?: IntNullableFilter<"Form"> | number | null
    is_active?: BoolFilter<"Form"> | boolean
    created_at?: DateTimeFilter<"Form"> | Date | string
    updated_at?: DateTimeFilter<"Form"> | Date | string
    creator?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    access?: FormAccessListRelationFilter
    fields?: FormFieldListRelationFilter
    responses?: FormResponseListRelationFilter
  }

  export type FormOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    created_by?: SortOrderInput | SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    creator?: UserOrderByWithRelationInput
    access?: FormAccessOrderByRelationAggregateInput
    fields?: FormFieldOrderByRelationAggregateInput
    responses?: FormResponseOrderByRelationAggregateInput
    _relevance?: FormOrderByRelevanceInput
  }

  export type FormWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: FormWhereInput | FormWhereInput[]
    OR?: FormWhereInput[]
    NOT?: FormWhereInput | FormWhereInput[]
    name?: StringFilter<"Form"> | string
    description?: StringNullableFilter<"Form"> | string | null
    created_by?: IntNullableFilter<"Form"> | number | null
    is_active?: BoolFilter<"Form"> | boolean
    created_at?: DateTimeFilter<"Form"> | Date | string
    updated_at?: DateTimeFilter<"Form"> | Date | string
    creator?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    access?: FormAccessListRelationFilter
    fields?: FormFieldListRelationFilter
    responses?: FormResponseListRelationFilter
  }, "id">

  export type FormOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    created_by?: SortOrderInput | SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: FormCountOrderByAggregateInput
    _avg?: FormAvgOrderByAggregateInput
    _max?: FormMaxOrderByAggregateInput
    _min?: FormMinOrderByAggregateInput
    _sum?: FormSumOrderByAggregateInput
  }

  export type FormScalarWhereWithAggregatesInput = {
    AND?: FormScalarWhereWithAggregatesInput | FormScalarWhereWithAggregatesInput[]
    OR?: FormScalarWhereWithAggregatesInput[]
    NOT?: FormScalarWhereWithAggregatesInput | FormScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Form"> | number
    name?: StringWithAggregatesFilter<"Form"> | string
    description?: StringNullableWithAggregatesFilter<"Form"> | string | null
    created_by?: IntNullableWithAggregatesFilter<"Form"> | number | null
    is_active?: BoolWithAggregatesFilter<"Form"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"Form"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Form"> | Date | string
  }

  export type FormAccessWhereInput = {
    AND?: FormAccessWhereInput | FormAccessWhereInput[]
    OR?: FormAccessWhereInput[]
    NOT?: FormAccessWhereInput | FormAccessWhereInput[]
    id?: IntFilter<"FormAccess"> | number
    form_id?: IntFilter<"FormAccess"> | number
    access_type?: EnumAccessTypeFilter<"FormAccess"> | $Enums.AccessType
    access_value?: StringFilter<"FormAccess"> | string
    expires_at?: DateTimeNullableFilter<"FormAccess"> | Date | string | null
    created_at?: DateTimeFilter<"FormAccess"> | Date | string
    updated_at?: DateTimeFilter<"FormAccess"> | Date | string
    form?: XOR<FormScalarRelationFilter, FormWhereInput>
  }

  export type FormAccessOrderByWithRelationInput = {
    id?: SortOrder
    form_id?: SortOrder
    access_type?: SortOrder
    access_value?: SortOrder
    expires_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    form?: FormOrderByWithRelationInput
    _relevance?: FormAccessOrderByRelevanceInput
  }

  export type FormAccessWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: FormAccessWhereInput | FormAccessWhereInput[]
    OR?: FormAccessWhereInput[]
    NOT?: FormAccessWhereInput | FormAccessWhereInput[]
    form_id?: IntFilter<"FormAccess"> | number
    access_type?: EnumAccessTypeFilter<"FormAccess"> | $Enums.AccessType
    access_value?: StringFilter<"FormAccess"> | string
    expires_at?: DateTimeNullableFilter<"FormAccess"> | Date | string | null
    created_at?: DateTimeFilter<"FormAccess"> | Date | string
    updated_at?: DateTimeFilter<"FormAccess"> | Date | string
    form?: XOR<FormScalarRelationFilter, FormWhereInput>
  }, "id">

  export type FormAccessOrderByWithAggregationInput = {
    id?: SortOrder
    form_id?: SortOrder
    access_type?: SortOrder
    access_value?: SortOrder
    expires_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: FormAccessCountOrderByAggregateInput
    _avg?: FormAccessAvgOrderByAggregateInput
    _max?: FormAccessMaxOrderByAggregateInput
    _min?: FormAccessMinOrderByAggregateInput
    _sum?: FormAccessSumOrderByAggregateInput
  }

  export type FormAccessScalarWhereWithAggregatesInput = {
    AND?: FormAccessScalarWhereWithAggregatesInput | FormAccessScalarWhereWithAggregatesInput[]
    OR?: FormAccessScalarWhereWithAggregatesInput[]
    NOT?: FormAccessScalarWhereWithAggregatesInput | FormAccessScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"FormAccess"> | number
    form_id?: IntWithAggregatesFilter<"FormAccess"> | number
    access_type?: EnumAccessTypeWithAggregatesFilter<"FormAccess"> | $Enums.AccessType
    access_value?: StringWithAggregatesFilter<"FormAccess"> | string
    expires_at?: DateTimeNullableWithAggregatesFilter<"FormAccess"> | Date | string | null
    created_at?: DateTimeWithAggregatesFilter<"FormAccess"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"FormAccess"> | Date | string
  }

  export type FormFieldWhereInput = {
    AND?: FormFieldWhereInput | FormFieldWhereInput[]
    OR?: FormFieldWhereInput[]
    NOT?: FormFieldWhereInput | FormFieldWhereInput[]
    id?: IntFilter<"FormField"> | number
    form_id?: IntFilter<"FormField"> | number
    field_key?: StringFilter<"FormField"> | string
    label?: StringFilter<"FormField"> | string
    field_type?: EnumFieldTypeFilter<"FormField"> | $Enums.FieldType
    mode?: EnumFieldModeFilter<"FormField"> | $Enums.FieldMode
    is_required?: BoolFilter<"FormField"> | boolean
    field_order?: IntFilter<"FormField"> | number
    settings?: JsonNullableFilter<"FormField">
    created_at?: DateTimeFilter<"FormField"> | Date | string
    updated_at?: DateTimeFilter<"FormField"> | Date | string
    form?: XOR<FormScalarRelationFilter, FormWhereInput>
    options?: FormFieldOptionListRelationFilter
    tableSource?: XOR<FormFieldTableSourceNullableScalarRelationFilter, FormFieldTableSourceWhereInput> | null
    values?: FormResponseValueListRelationFilter
  }

  export type FormFieldOrderByWithRelationInput = {
    id?: SortOrder
    form_id?: SortOrder
    field_key?: SortOrder
    label?: SortOrder
    field_type?: SortOrder
    mode?: SortOrder
    is_required?: SortOrder
    field_order?: SortOrder
    settings?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    form?: FormOrderByWithRelationInput
    options?: FormFieldOptionOrderByRelationAggregateInput
    tableSource?: FormFieldTableSourceOrderByWithRelationInput
    values?: FormResponseValueOrderByRelationAggregateInput
    _relevance?: FormFieldOrderByRelevanceInput
  }

  export type FormFieldWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: FormFieldWhereInput | FormFieldWhereInput[]
    OR?: FormFieldWhereInput[]
    NOT?: FormFieldWhereInput | FormFieldWhereInput[]
    form_id?: IntFilter<"FormField"> | number
    field_key?: StringFilter<"FormField"> | string
    label?: StringFilter<"FormField"> | string
    field_type?: EnumFieldTypeFilter<"FormField"> | $Enums.FieldType
    mode?: EnumFieldModeFilter<"FormField"> | $Enums.FieldMode
    is_required?: BoolFilter<"FormField"> | boolean
    field_order?: IntFilter<"FormField"> | number
    settings?: JsonNullableFilter<"FormField">
    created_at?: DateTimeFilter<"FormField"> | Date | string
    updated_at?: DateTimeFilter<"FormField"> | Date | string
    form?: XOR<FormScalarRelationFilter, FormWhereInput>
    options?: FormFieldOptionListRelationFilter
    tableSource?: XOR<FormFieldTableSourceNullableScalarRelationFilter, FormFieldTableSourceWhereInput> | null
    values?: FormResponseValueListRelationFilter
  }, "id">

  export type FormFieldOrderByWithAggregationInput = {
    id?: SortOrder
    form_id?: SortOrder
    field_key?: SortOrder
    label?: SortOrder
    field_type?: SortOrder
    mode?: SortOrder
    is_required?: SortOrder
    field_order?: SortOrder
    settings?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: FormFieldCountOrderByAggregateInput
    _avg?: FormFieldAvgOrderByAggregateInput
    _max?: FormFieldMaxOrderByAggregateInput
    _min?: FormFieldMinOrderByAggregateInput
    _sum?: FormFieldSumOrderByAggregateInput
  }

  export type FormFieldScalarWhereWithAggregatesInput = {
    AND?: FormFieldScalarWhereWithAggregatesInput | FormFieldScalarWhereWithAggregatesInput[]
    OR?: FormFieldScalarWhereWithAggregatesInput[]
    NOT?: FormFieldScalarWhereWithAggregatesInput | FormFieldScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"FormField"> | number
    form_id?: IntWithAggregatesFilter<"FormField"> | number
    field_key?: StringWithAggregatesFilter<"FormField"> | string
    label?: StringWithAggregatesFilter<"FormField"> | string
    field_type?: EnumFieldTypeWithAggregatesFilter<"FormField"> | $Enums.FieldType
    mode?: EnumFieldModeWithAggregatesFilter<"FormField"> | $Enums.FieldMode
    is_required?: BoolWithAggregatesFilter<"FormField"> | boolean
    field_order?: IntWithAggregatesFilter<"FormField"> | number
    settings?: JsonNullableWithAggregatesFilter<"FormField">
    created_at?: DateTimeWithAggregatesFilter<"FormField"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"FormField"> | Date | string
  }

  export type FormFieldOptionWhereInput = {
    AND?: FormFieldOptionWhereInput | FormFieldOptionWhereInput[]
    OR?: FormFieldOptionWhereInput[]
    NOT?: FormFieldOptionWhereInput | FormFieldOptionWhereInput[]
    id?: IntFilter<"FormFieldOption"> | number
    field_id?: IntFilter<"FormFieldOption"> | number
    value?: StringFilter<"FormFieldOption"> | string
    label?: StringNullableFilter<"FormFieldOption"> | string | null
    score?: IntFilter<"FormFieldOption"> | number
    option_order?: IntFilter<"FormFieldOption"> | number
    created_at?: DateTimeFilter<"FormFieldOption"> | Date | string
    updated_at?: DateTimeFilter<"FormFieldOption"> | Date | string
    field?: XOR<FormFieldScalarRelationFilter, FormFieldWhereInput>
  }

  export type FormFieldOptionOrderByWithRelationInput = {
    id?: SortOrder
    field_id?: SortOrder
    value?: SortOrder
    label?: SortOrderInput | SortOrder
    score?: SortOrder
    option_order?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    field?: FormFieldOrderByWithRelationInput
    _relevance?: FormFieldOptionOrderByRelevanceInput
  }

  export type FormFieldOptionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: FormFieldOptionWhereInput | FormFieldOptionWhereInput[]
    OR?: FormFieldOptionWhereInput[]
    NOT?: FormFieldOptionWhereInput | FormFieldOptionWhereInput[]
    field_id?: IntFilter<"FormFieldOption"> | number
    value?: StringFilter<"FormFieldOption"> | string
    label?: StringNullableFilter<"FormFieldOption"> | string | null
    score?: IntFilter<"FormFieldOption"> | number
    option_order?: IntFilter<"FormFieldOption"> | number
    created_at?: DateTimeFilter<"FormFieldOption"> | Date | string
    updated_at?: DateTimeFilter<"FormFieldOption"> | Date | string
    field?: XOR<FormFieldScalarRelationFilter, FormFieldWhereInput>
  }, "id">

  export type FormFieldOptionOrderByWithAggregationInput = {
    id?: SortOrder
    field_id?: SortOrder
    value?: SortOrder
    label?: SortOrderInput | SortOrder
    score?: SortOrder
    option_order?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: FormFieldOptionCountOrderByAggregateInput
    _avg?: FormFieldOptionAvgOrderByAggregateInput
    _max?: FormFieldOptionMaxOrderByAggregateInput
    _min?: FormFieldOptionMinOrderByAggregateInput
    _sum?: FormFieldOptionSumOrderByAggregateInput
  }

  export type FormFieldOptionScalarWhereWithAggregatesInput = {
    AND?: FormFieldOptionScalarWhereWithAggregatesInput | FormFieldOptionScalarWhereWithAggregatesInput[]
    OR?: FormFieldOptionScalarWhereWithAggregatesInput[]
    NOT?: FormFieldOptionScalarWhereWithAggregatesInput | FormFieldOptionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"FormFieldOption"> | number
    field_id?: IntWithAggregatesFilter<"FormFieldOption"> | number
    value?: StringWithAggregatesFilter<"FormFieldOption"> | string
    label?: StringNullableWithAggregatesFilter<"FormFieldOption"> | string | null
    score?: IntWithAggregatesFilter<"FormFieldOption"> | number
    option_order?: IntWithAggregatesFilter<"FormFieldOption"> | number
    created_at?: DateTimeWithAggregatesFilter<"FormFieldOption"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"FormFieldOption"> | Date | string
  }

  export type FormFieldTableSourceWhereInput = {
    AND?: FormFieldTableSourceWhereInput | FormFieldTableSourceWhereInput[]
    OR?: FormFieldTableSourceWhereInput[]
    NOT?: FormFieldTableSourceWhereInput | FormFieldTableSourceWhereInput[]
    id?: IntFilter<"FormFieldTableSource"> | number
    field_id?: IntFilter<"FormFieldTableSource"> | number
    source_table?: StringFilter<"FormFieldTableSource"> | string
    source_value_column?: StringFilter<"FormFieldTableSource"> | string
    source_label_column?: StringFilter<"FormFieldTableSource"> | string
    created_at?: DateTimeFilter<"FormFieldTableSource"> | Date | string
    updated_at?: DateTimeFilter<"FormFieldTableSource"> | Date | string
    field?: XOR<FormFieldScalarRelationFilter, FormFieldWhereInput>
  }

  export type FormFieldTableSourceOrderByWithRelationInput = {
    id?: SortOrder
    field_id?: SortOrder
    source_table?: SortOrder
    source_value_column?: SortOrder
    source_label_column?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    field?: FormFieldOrderByWithRelationInput
    _relevance?: FormFieldTableSourceOrderByRelevanceInput
  }

  export type FormFieldTableSourceWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    field_id?: number
    AND?: FormFieldTableSourceWhereInput | FormFieldTableSourceWhereInput[]
    OR?: FormFieldTableSourceWhereInput[]
    NOT?: FormFieldTableSourceWhereInput | FormFieldTableSourceWhereInput[]
    source_table?: StringFilter<"FormFieldTableSource"> | string
    source_value_column?: StringFilter<"FormFieldTableSource"> | string
    source_label_column?: StringFilter<"FormFieldTableSource"> | string
    created_at?: DateTimeFilter<"FormFieldTableSource"> | Date | string
    updated_at?: DateTimeFilter<"FormFieldTableSource"> | Date | string
    field?: XOR<FormFieldScalarRelationFilter, FormFieldWhereInput>
  }, "id" | "field_id">

  export type FormFieldTableSourceOrderByWithAggregationInput = {
    id?: SortOrder
    field_id?: SortOrder
    source_table?: SortOrder
    source_value_column?: SortOrder
    source_label_column?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: FormFieldTableSourceCountOrderByAggregateInput
    _avg?: FormFieldTableSourceAvgOrderByAggregateInput
    _max?: FormFieldTableSourceMaxOrderByAggregateInput
    _min?: FormFieldTableSourceMinOrderByAggregateInput
    _sum?: FormFieldTableSourceSumOrderByAggregateInput
  }

  export type FormFieldTableSourceScalarWhereWithAggregatesInput = {
    AND?: FormFieldTableSourceScalarWhereWithAggregatesInput | FormFieldTableSourceScalarWhereWithAggregatesInput[]
    OR?: FormFieldTableSourceScalarWhereWithAggregatesInput[]
    NOT?: FormFieldTableSourceScalarWhereWithAggregatesInput | FormFieldTableSourceScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"FormFieldTableSource"> | number
    field_id?: IntWithAggregatesFilter<"FormFieldTableSource"> | number
    source_table?: StringWithAggregatesFilter<"FormFieldTableSource"> | string
    source_value_column?: StringWithAggregatesFilter<"FormFieldTableSource"> | string
    source_label_column?: StringWithAggregatesFilter<"FormFieldTableSource"> | string
    created_at?: DateTimeWithAggregatesFilter<"FormFieldTableSource"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"FormFieldTableSource"> | Date | string
  }

  export type FormResponseWhereInput = {
    AND?: FormResponseWhereInput | FormResponseWhereInput[]
    OR?: FormResponseWhereInput[]
    NOT?: FormResponseWhereInput | FormResponseWhereInput[]
    id?: IntFilter<"FormResponse"> | number
    form_id?: IntFilter<"FormResponse"> | number
    user_id?: IntNullableFilter<"FormResponse"> | number | null
    total_score?: IntFilter<"FormResponse"> | number
    status?: EnumResponseStatusFilter<"FormResponse"> | $Enums.ResponseStatus
    created_at?: DateTimeFilter<"FormResponse"> | Date | string
    updated_at?: DateTimeFilter<"FormResponse"> | Date | string
    form?: XOR<FormScalarRelationFilter, FormWhereInput>
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    values?: FormResponseValueListRelationFilter
  }

  export type FormResponseOrderByWithRelationInput = {
    id?: SortOrder
    form_id?: SortOrder
    user_id?: SortOrderInput | SortOrder
    total_score?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    form?: FormOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    values?: FormResponseValueOrderByRelationAggregateInput
  }

  export type FormResponseWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: FormResponseWhereInput | FormResponseWhereInput[]
    OR?: FormResponseWhereInput[]
    NOT?: FormResponseWhereInput | FormResponseWhereInput[]
    form_id?: IntFilter<"FormResponse"> | number
    user_id?: IntNullableFilter<"FormResponse"> | number | null
    total_score?: IntFilter<"FormResponse"> | number
    status?: EnumResponseStatusFilter<"FormResponse"> | $Enums.ResponseStatus
    created_at?: DateTimeFilter<"FormResponse"> | Date | string
    updated_at?: DateTimeFilter<"FormResponse"> | Date | string
    form?: XOR<FormScalarRelationFilter, FormWhereInput>
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    values?: FormResponseValueListRelationFilter
  }, "id">

  export type FormResponseOrderByWithAggregationInput = {
    id?: SortOrder
    form_id?: SortOrder
    user_id?: SortOrderInput | SortOrder
    total_score?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: FormResponseCountOrderByAggregateInput
    _avg?: FormResponseAvgOrderByAggregateInput
    _max?: FormResponseMaxOrderByAggregateInput
    _min?: FormResponseMinOrderByAggregateInput
    _sum?: FormResponseSumOrderByAggregateInput
  }

  export type FormResponseScalarWhereWithAggregatesInput = {
    AND?: FormResponseScalarWhereWithAggregatesInput | FormResponseScalarWhereWithAggregatesInput[]
    OR?: FormResponseScalarWhereWithAggregatesInput[]
    NOT?: FormResponseScalarWhereWithAggregatesInput | FormResponseScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"FormResponse"> | number
    form_id?: IntWithAggregatesFilter<"FormResponse"> | number
    user_id?: IntNullableWithAggregatesFilter<"FormResponse"> | number | null
    total_score?: IntWithAggregatesFilter<"FormResponse"> | number
    status?: EnumResponseStatusWithAggregatesFilter<"FormResponse"> | $Enums.ResponseStatus
    created_at?: DateTimeWithAggregatesFilter<"FormResponse"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"FormResponse"> | Date | string
  }

  export type FormResponseValueWhereInput = {
    AND?: FormResponseValueWhereInput | FormResponseValueWhereInput[]
    OR?: FormResponseValueWhereInput[]
    NOT?: FormResponseValueWhereInput | FormResponseValueWhereInput[]
    id?: IntFilter<"FormResponseValue"> | number
    response_id?: IntFilter<"FormResponseValue"> | number
    field_id?: IntFilter<"FormResponseValue"> | number
    value?: StringNullableFilter<"FormResponseValue"> | string | null
    score?: IntFilter<"FormResponseValue"> | number
    created_at?: DateTimeFilter<"FormResponseValue"> | Date | string
    updated_at?: DateTimeFilter<"FormResponseValue"> | Date | string
    response?: XOR<FormResponseScalarRelationFilter, FormResponseWhereInput>
    field?: XOR<FormFieldScalarRelationFilter, FormFieldWhereInput>
  }

  export type FormResponseValueOrderByWithRelationInput = {
    id?: SortOrder
    response_id?: SortOrder
    field_id?: SortOrder
    value?: SortOrderInput | SortOrder
    score?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    response?: FormResponseOrderByWithRelationInput
    field?: FormFieldOrderByWithRelationInput
    _relevance?: FormResponseValueOrderByRelevanceInput
  }

  export type FormResponseValueWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: FormResponseValueWhereInput | FormResponseValueWhereInput[]
    OR?: FormResponseValueWhereInput[]
    NOT?: FormResponseValueWhereInput | FormResponseValueWhereInput[]
    response_id?: IntFilter<"FormResponseValue"> | number
    field_id?: IntFilter<"FormResponseValue"> | number
    value?: StringNullableFilter<"FormResponseValue"> | string | null
    score?: IntFilter<"FormResponseValue"> | number
    created_at?: DateTimeFilter<"FormResponseValue"> | Date | string
    updated_at?: DateTimeFilter<"FormResponseValue"> | Date | string
    response?: XOR<FormResponseScalarRelationFilter, FormResponseWhereInput>
    field?: XOR<FormFieldScalarRelationFilter, FormFieldWhereInput>
  }, "id">

  export type FormResponseValueOrderByWithAggregationInput = {
    id?: SortOrder
    response_id?: SortOrder
    field_id?: SortOrder
    value?: SortOrderInput | SortOrder
    score?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: FormResponseValueCountOrderByAggregateInput
    _avg?: FormResponseValueAvgOrderByAggregateInput
    _max?: FormResponseValueMaxOrderByAggregateInput
    _min?: FormResponseValueMinOrderByAggregateInput
    _sum?: FormResponseValueSumOrderByAggregateInput
  }

  export type FormResponseValueScalarWhereWithAggregatesInput = {
    AND?: FormResponseValueScalarWhereWithAggregatesInput | FormResponseValueScalarWhereWithAggregatesInput[]
    OR?: FormResponseValueScalarWhereWithAggregatesInput[]
    NOT?: FormResponseValueScalarWhereWithAggregatesInput | FormResponseValueScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"FormResponseValue"> | number
    response_id?: IntWithAggregatesFilter<"FormResponseValue"> | number
    field_id?: IntWithAggregatesFilter<"FormResponseValue"> | number
    value?: StringNullableWithAggregatesFilter<"FormResponseValue"> | string | null
    score?: IntWithAggregatesFilter<"FormResponseValue"> | number
    created_at?: DateTimeWithAggregatesFilter<"FormResponseValue"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"FormResponseValue"> | Date | string
  }

  export type UserCreateInput = {
    email?: string | null
    username?: string | null
    first_name?: string | null
    last_name?: string | null
    phone?: string | null
    password?: string | null
    google_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    default_role?: RoleCreateNestedOneWithoutDefaultForUsersInput
    roles?: UserRoleCreateNestedManyWithoutUserInput
    groups?: GroupUserCreateNestedManyWithoutUserInput
    forms?: FormCreateNestedManyWithoutCreatorInput
    responses?: FormResponseCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email?: string | null
    username?: string | null
    first_name?: string | null
    last_name?: string | null
    phone?: string | null
    password?: string | null
    google_id?: string | null
    default_role_id?: number | null
    created_at?: Date | string
    updated_at?: Date | string
    roles?: UserRoleUncheckedCreateNestedManyWithoutUserInput
    groups?: GroupUserUncheckedCreateNestedManyWithoutUserInput
    forms?: FormUncheckedCreateNestedManyWithoutCreatorInput
    responses?: FormResponseUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    email?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    default_role?: RoleUpdateOneWithoutDefaultForUsersNestedInput
    roles?: UserRoleUpdateManyWithoutUserNestedInput
    groups?: GroupUserUpdateManyWithoutUserNestedInput
    forms?: FormUpdateManyWithoutCreatorNestedInput
    responses?: FormResponseUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    default_role_id?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    roles?: UserRoleUncheckedUpdateManyWithoutUserNestedInput
    groups?: GroupUserUncheckedUpdateManyWithoutUserNestedInput
    forms?: FormUncheckedUpdateManyWithoutCreatorNestedInput
    responses?: FormResponseUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    email?: string | null
    username?: string | null
    first_name?: string | null
    last_name?: string | null
    phone?: string | null
    password?: string | null
    google_id?: string | null
    default_role_id?: number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    email?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    default_role_id?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoleCreateInput = {
    name: string
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    policies?: RolePolicyCreateNestedManyWithoutRoleInput
    users?: UserRoleCreateNestedManyWithoutRoleInput
    defaultForUsers?: UserCreateNestedManyWithoutDefault_roleInput
  }

  export type RoleUncheckedCreateInput = {
    id?: number
    name: string
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    policies?: RolePolicyUncheckedCreateNestedManyWithoutRoleInput
    users?: UserRoleUncheckedCreateNestedManyWithoutRoleInput
    defaultForUsers?: UserUncheckedCreateNestedManyWithoutDefault_roleInput
  }

  export type RoleUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    policies?: RolePolicyUpdateManyWithoutRoleNestedInput
    users?: UserRoleUpdateManyWithoutRoleNestedInput
    defaultForUsers?: UserUpdateManyWithoutDefault_roleNestedInput
  }

  export type RoleUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    policies?: RolePolicyUncheckedUpdateManyWithoutRoleNestedInput
    users?: UserRoleUncheckedUpdateManyWithoutRoleNestedInput
    defaultForUsers?: UserUncheckedUpdateManyWithoutDefault_roleNestedInput
  }

  export type RoleCreateManyInput = {
    id?: number
    name: string
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type RoleUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoleUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PolicyCreateInput = {
    name: string
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    roles?: RolePolicyCreateNestedManyWithoutPolicyInput
  }

  export type PolicyUncheckedCreateInput = {
    id?: number
    name: string
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    roles?: RolePolicyUncheckedCreateNestedManyWithoutPolicyInput
  }

  export type PolicyUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    roles?: RolePolicyUpdateManyWithoutPolicyNestedInput
  }

  export type PolicyUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    roles?: RolePolicyUncheckedUpdateManyWithoutPolicyNestedInput
  }

  export type PolicyCreateManyInput = {
    id?: number
    name: string
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type PolicyUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PolicyUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RolePolicyCreateInput = {
    created_at?: Date | string
    updated_at?: Date | string
    role: RoleCreateNestedOneWithoutPoliciesInput
    policy: PolicyCreateNestedOneWithoutRolesInput
  }

  export type RolePolicyUncheckedCreateInput = {
    id?: number
    role_id: number
    policy_id: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type RolePolicyUpdateInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: RoleUpdateOneRequiredWithoutPoliciesNestedInput
    policy?: PolicyUpdateOneRequiredWithoutRolesNestedInput
  }

  export type RolePolicyUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    role_id?: IntFieldUpdateOperationsInput | number
    policy_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RolePolicyCreateManyInput = {
    id?: number
    role_id: number
    policy_id: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type RolePolicyUpdateManyMutationInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RolePolicyUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    role_id?: IntFieldUpdateOperationsInput | number
    policy_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRoleCreateInput = {
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutRolesInput
    role: RoleCreateNestedOneWithoutUsersInput
  }

  export type UserRoleUncheckedCreateInput = {
    id?: number
    user_id: number
    role_id: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type UserRoleUpdateInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutRolesNestedInput
    role?: RoleUpdateOneRequiredWithoutUsersNestedInput
  }

  export type UserRoleUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    role_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRoleCreateManyInput = {
    id?: number
    user_id: number
    role_id: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type UserRoleUpdateManyMutationInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRoleUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    role_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupCreateInput = {
    name: string
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    users?: GroupUserCreateNestedManyWithoutGroupInput
  }

  export type GroupUncheckedCreateInput = {
    id?: number
    name: string
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    users?: GroupUserUncheckedCreateNestedManyWithoutGroupInput
  }

  export type GroupUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: GroupUserUpdateManyWithoutGroupNestedInput
  }

  export type GroupUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: GroupUserUncheckedUpdateManyWithoutGroupNestedInput
  }

  export type GroupCreateManyInput = {
    id?: number
    name: string
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type GroupUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupUserCreateInput = {
    created_at?: Date | string
    updated_at?: Date | string
    group: GroupCreateNestedOneWithoutUsersInput
    user: UserCreateNestedOneWithoutGroupsInput
  }

  export type GroupUserUncheckedCreateInput = {
    id?: number
    group_id: number
    user_id: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type GroupUserUpdateInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    group?: GroupUpdateOneRequiredWithoutUsersNestedInput
    user?: UserUpdateOneRequiredWithoutGroupsNestedInput
  }

  export type GroupUserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    group_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupUserCreateManyInput = {
    id?: number
    group_id: number
    user_id: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type GroupUserUpdateManyMutationInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupUserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    group_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FormCreateInput = {
    name: string
    description?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    creator?: UserCreateNestedOneWithoutFormsInput
    access?: FormAccessCreateNestedManyWithoutFormInput
    fields?: FormFieldCreateNestedManyWithoutFormInput
    responses?: FormResponseCreateNestedManyWithoutFormInput
  }

  export type FormUncheckedCreateInput = {
    id?: number
    name: string
    description?: string | null
    created_by?: number | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    access?: FormAccessUncheckedCreateNestedManyWithoutFormInput
    fields?: FormFieldUncheckedCreateNestedManyWithoutFormInput
    responses?: FormResponseUncheckedCreateNestedManyWithoutFormInput
  }

  export type FormUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: UserUpdateOneWithoutFormsNestedInput
    access?: FormAccessUpdateManyWithoutFormNestedInput
    fields?: FormFieldUpdateManyWithoutFormNestedInput
    responses?: FormResponseUpdateManyWithoutFormNestedInput
  }

  export type FormUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_by?: NullableIntFieldUpdateOperationsInput | number | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    access?: FormAccessUncheckedUpdateManyWithoutFormNestedInput
    fields?: FormFieldUncheckedUpdateManyWithoutFormNestedInput
    responses?: FormResponseUncheckedUpdateManyWithoutFormNestedInput
  }

  export type FormCreateManyInput = {
    id?: number
    name: string
    description?: string | null
    created_by?: number | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type FormUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FormUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_by?: NullableIntFieldUpdateOperationsInput | number | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FormAccessCreateInput = {
    access_type?: $Enums.AccessType
    access_value: string
    expires_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    form: FormCreateNestedOneWithoutAccessInput
  }

  export type FormAccessUncheckedCreateInput = {
    id?: number
    form_id: number
    access_type?: $Enums.AccessType
    access_value: string
    expires_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type FormAccessUpdateInput = {
    access_type?: EnumAccessTypeFieldUpdateOperationsInput | $Enums.AccessType
    access_value?: StringFieldUpdateOperationsInput | string
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    form?: FormUpdateOneRequiredWithoutAccessNestedInput
  }

  export type FormAccessUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    form_id?: IntFieldUpdateOperationsInput | number
    access_type?: EnumAccessTypeFieldUpdateOperationsInput | $Enums.AccessType
    access_value?: StringFieldUpdateOperationsInput | string
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FormAccessCreateManyInput = {
    id?: number
    form_id: number
    access_type?: $Enums.AccessType
    access_value: string
    expires_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type FormAccessUpdateManyMutationInput = {
    access_type?: EnumAccessTypeFieldUpdateOperationsInput | $Enums.AccessType
    access_value?: StringFieldUpdateOperationsInput | string
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FormAccessUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    form_id?: IntFieldUpdateOperationsInput | number
    access_type?: EnumAccessTypeFieldUpdateOperationsInput | $Enums.AccessType
    access_value?: StringFieldUpdateOperationsInput | string
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FormFieldCreateInput = {
    field_key: string
    label: string
    field_type: $Enums.FieldType
    mode?: $Enums.FieldMode
    is_required?: boolean
    field_order?: number
    settings?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    form: FormCreateNestedOneWithoutFieldsInput
    options?: FormFieldOptionCreateNestedManyWithoutFieldInput
    tableSource?: FormFieldTableSourceCreateNestedOneWithoutFieldInput
    values?: FormResponseValueCreateNestedManyWithoutFieldInput
  }

  export type FormFieldUncheckedCreateInput = {
    id?: number
    form_id: number
    field_key: string
    label: string
    field_type: $Enums.FieldType
    mode?: $Enums.FieldMode
    is_required?: boolean
    field_order?: number
    settings?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    options?: FormFieldOptionUncheckedCreateNestedManyWithoutFieldInput
    tableSource?: FormFieldTableSourceUncheckedCreateNestedOneWithoutFieldInput
    values?: FormResponseValueUncheckedCreateNestedManyWithoutFieldInput
  }

  export type FormFieldUpdateInput = {
    field_key?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    field_type?: EnumFieldTypeFieldUpdateOperationsInput | $Enums.FieldType
    mode?: EnumFieldModeFieldUpdateOperationsInput | $Enums.FieldMode
    is_required?: BoolFieldUpdateOperationsInput | boolean
    field_order?: IntFieldUpdateOperationsInput | number
    settings?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    form?: FormUpdateOneRequiredWithoutFieldsNestedInput
    options?: FormFieldOptionUpdateManyWithoutFieldNestedInput
    tableSource?: FormFieldTableSourceUpdateOneWithoutFieldNestedInput
    values?: FormResponseValueUpdateManyWithoutFieldNestedInput
  }

  export type FormFieldUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    form_id?: IntFieldUpdateOperationsInput | number
    field_key?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    field_type?: EnumFieldTypeFieldUpdateOperationsInput | $Enums.FieldType
    mode?: EnumFieldModeFieldUpdateOperationsInput | $Enums.FieldMode
    is_required?: BoolFieldUpdateOperationsInput | boolean
    field_order?: IntFieldUpdateOperationsInput | number
    settings?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    options?: FormFieldOptionUncheckedUpdateManyWithoutFieldNestedInput
    tableSource?: FormFieldTableSourceUncheckedUpdateOneWithoutFieldNestedInput
    values?: FormResponseValueUncheckedUpdateManyWithoutFieldNestedInput
  }

  export type FormFieldCreateManyInput = {
    id?: number
    form_id: number
    field_key: string
    label: string
    field_type: $Enums.FieldType
    mode?: $Enums.FieldMode
    is_required?: boolean
    field_order?: number
    settings?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type FormFieldUpdateManyMutationInput = {
    field_key?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    field_type?: EnumFieldTypeFieldUpdateOperationsInput | $Enums.FieldType
    mode?: EnumFieldModeFieldUpdateOperationsInput | $Enums.FieldMode
    is_required?: BoolFieldUpdateOperationsInput | boolean
    field_order?: IntFieldUpdateOperationsInput | number
    settings?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FormFieldUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    form_id?: IntFieldUpdateOperationsInput | number
    field_key?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    field_type?: EnumFieldTypeFieldUpdateOperationsInput | $Enums.FieldType
    mode?: EnumFieldModeFieldUpdateOperationsInput | $Enums.FieldMode
    is_required?: BoolFieldUpdateOperationsInput | boolean
    field_order?: IntFieldUpdateOperationsInput | number
    settings?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FormFieldOptionCreateInput = {
    value: string
    label?: string | null
    score?: number
    option_order?: number
    created_at?: Date | string
    updated_at?: Date | string
    field: FormFieldCreateNestedOneWithoutOptionsInput
  }

  export type FormFieldOptionUncheckedCreateInput = {
    id?: number
    field_id: number
    value: string
    label?: string | null
    score?: number
    option_order?: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type FormFieldOptionUpdateInput = {
    value?: StringFieldUpdateOperationsInput | string
    label?: NullableStringFieldUpdateOperationsInput | string | null
    score?: IntFieldUpdateOperationsInput | number
    option_order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    field?: FormFieldUpdateOneRequiredWithoutOptionsNestedInput
  }

  export type FormFieldOptionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    field_id?: IntFieldUpdateOperationsInput | number
    value?: StringFieldUpdateOperationsInput | string
    label?: NullableStringFieldUpdateOperationsInput | string | null
    score?: IntFieldUpdateOperationsInput | number
    option_order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FormFieldOptionCreateManyInput = {
    id?: number
    field_id: number
    value: string
    label?: string | null
    score?: number
    option_order?: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type FormFieldOptionUpdateManyMutationInput = {
    value?: StringFieldUpdateOperationsInput | string
    label?: NullableStringFieldUpdateOperationsInput | string | null
    score?: IntFieldUpdateOperationsInput | number
    option_order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FormFieldOptionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    field_id?: IntFieldUpdateOperationsInput | number
    value?: StringFieldUpdateOperationsInput | string
    label?: NullableStringFieldUpdateOperationsInput | string | null
    score?: IntFieldUpdateOperationsInput | number
    option_order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FormFieldTableSourceCreateInput = {
    source_table: string
    source_value_column: string
    source_label_column: string
    created_at?: Date | string
    updated_at?: Date | string
    field: FormFieldCreateNestedOneWithoutTableSourceInput
  }

  export type FormFieldTableSourceUncheckedCreateInput = {
    id?: number
    field_id: number
    source_table: string
    source_value_column: string
    source_label_column: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type FormFieldTableSourceUpdateInput = {
    source_table?: StringFieldUpdateOperationsInput | string
    source_value_column?: StringFieldUpdateOperationsInput | string
    source_label_column?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    field?: FormFieldUpdateOneRequiredWithoutTableSourceNestedInput
  }

  export type FormFieldTableSourceUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    field_id?: IntFieldUpdateOperationsInput | number
    source_table?: StringFieldUpdateOperationsInput | string
    source_value_column?: StringFieldUpdateOperationsInput | string
    source_label_column?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FormFieldTableSourceCreateManyInput = {
    id?: number
    field_id: number
    source_table: string
    source_value_column: string
    source_label_column: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type FormFieldTableSourceUpdateManyMutationInput = {
    source_table?: StringFieldUpdateOperationsInput | string
    source_value_column?: StringFieldUpdateOperationsInput | string
    source_label_column?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FormFieldTableSourceUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    field_id?: IntFieldUpdateOperationsInput | number
    source_table?: StringFieldUpdateOperationsInput | string
    source_value_column?: StringFieldUpdateOperationsInput | string
    source_label_column?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FormResponseCreateInput = {
    total_score?: number
    status?: $Enums.ResponseStatus
    created_at?: Date | string
    updated_at?: Date | string
    form: FormCreateNestedOneWithoutResponsesInput
    user?: UserCreateNestedOneWithoutResponsesInput
    values?: FormResponseValueCreateNestedManyWithoutResponseInput
  }

  export type FormResponseUncheckedCreateInput = {
    id?: number
    form_id: number
    user_id?: number | null
    total_score?: number
    status?: $Enums.ResponseStatus
    created_at?: Date | string
    updated_at?: Date | string
    values?: FormResponseValueUncheckedCreateNestedManyWithoutResponseInput
  }

  export type FormResponseUpdateInput = {
    total_score?: IntFieldUpdateOperationsInput | number
    status?: EnumResponseStatusFieldUpdateOperationsInput | $Enums.ResponseStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    form?: FormUpdateOneRequiredWithoutResponsesNestedInput
    user?: UserUpdateOneWithoutResponsesNestedInput
    values?: FormResponseValueUpdateManyWithoutResponseNestedInput
  }

  export type FormResponseUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    form_id?: IntFieldUpdateOperationsInput | number
    user_id?: NullableIntFieldUpdateOperationsInput | number | null
    total_score?: IntFieldUpdateOperationsInput | number
    status?: EnumResponseStatusFieldUpdateOperationsInput | $Enums.ResponseStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    values?: FormResponseValueUncheckedUpdateManyWithoutResponseNestedInput
  }

  export type FormResponseCreateManyInput = {
    id?: number
    form_id: number
    user_id?: number | null
    total_score?: number
    status?: $Enums.ResponseStatus
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type FormResponseUpdateManyMutationInput = {
    total_score?: IntFieldUpdateOperationsInput | number
    status?: EnumResponseStatusFieldUpdateOperationsInput | $Enums.ResponseStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FormResponseUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    form_id?: IntFieldUpdateOperationsInput | number
    user_id?: NullableIntFieldUpdateOperationsInput | number | null
    total_score?: IntFieldUpdateOperationsInput | number
    status?: EnumResponseStatusFieldUpdateOperationsInput | $Enums.ResponseStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FormResponseValueCreateInput = {
    value?: string | null
    score?: number
    created_at?: Date | string
    updated_at?: Date | string
    response: FormResponseCreateNestedOneWithoutValuesInput
    field: FormFieldCreateNestedOneWithoutValuesInput
  }

  export type FormResponseValueUncheckedCreateInput = {
    id?: number
    response_id: number
    field_id: number
    value?: string | null
    score?: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type FormResponseValueUpdateInput = {
    value?: NullableStringFieldUpdateOperationsInput | string | null
    score?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    response?: FormResponseUpdateOneRequiredWithoutValuesNestedInput
    field?: FormFieldUpdateOneRequiredWithoutValuesNestedInput
  }

  export type FormResponseValueUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    response_id?: IntFieldUpdateOperationsInput | number
    field_id?: IntFieldUpdateOperationsInput | number
    value?: NullableStringFieldUpdateOperationsInput | string | null
    score?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FormResponseValueCreateManyInput = {
    id?: number
    response_id: number
    field_id: number
    value?: string | null
    score?: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type FormResponseValueUpdateManyMutationInput = {
    value?: NullableStringFieldUpdateOperationsInput | string | null
    score?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FormResponseValueUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    response_id?: IntFieldUpdateOperationsInput | number
    field_id?: IntFieldUpdateOperationsInput | number
    value?: NullableStringFieldUpdateOperationsInput | string | null
    score?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type RoleNullableScalarRelationFilter = {
    is?: RoleWhereInput | null
    isNot?: RoleWhereInput | null
  }

  export type UserRoleListRelationFilter = {
    every?: UserRoleWhereInput
    some?: UserRoleWhereInput
    none?: UserRoleWhereInput
  }

  export type GroupUserListRelationFilter = {
    every?: GroupUserWhereInput
    some?: GroupUserWhereInput
    none?: GroupUserWhereInput
  }

  export type FormListRelationFilter = {
    every?: FormWhereInput
    some?: FormWhereInput
    none?: FormWhereInput
  }

  export type FormResponseListRelationFilter = {
    every?: FormResponseWhereInput
    some?: FormResponseWhereInput
    none?: FormResponseWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserRoleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GroupUserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FormOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FormResponseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelevanceInput = {
    fields: UserOrderByRelevanceFieldEnum | UserOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    google_id?: SortOrder
    default_role_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
    default_role_id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    google_id?: SortOrder
    default_role_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    google_id?: SortOrder
    default_role_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
    default_role_id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
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

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type RolePolicyListRelationFilter = {
    every?: RolePolicyWhereInput
    some?: RolePolicyWhereInput
    none?: RolePolicyWhereInput
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type RolePolicyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RoleOrderByRelevanceInput = {
    fields: RoleOrderByRelevanceFieldEnum | RoleOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type RoleCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type RoleAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type RoleMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type RoleMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type RoleSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type PolicyOrderByRelevanceInput = {
    fields: PolicyOrderByRelevanceFieldEnum | PolicyOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PolicyCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type PolicyAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PolicyMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type PolicyMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type PolicySumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type RoleScalarRelationFilter = {
    is?: RoleWhereInput
    isNot?: RoleWhereInput
  }

  export type PolicyScalarRelationFilter = {
    is?: PolicyWhereInput
    isNot?: PolicyWhereInput
  }

  export type RolePolicyRole_idPolicy_idCompoundUniqueInput = {
    role_id: number
    policy_id: number
  }

  export type RolePolicyCountOrderByAggregateInput = {
    id?: SortOrder
    role_id?: SortOrder
    policy_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type RolePolicyAvgOrderByAggregateInput = {
    id?: SortOrder
    role_id?: SortOrder
    policy_id?: SortOrder
  }

  export type RolePolicyMaxOrderByAggregateInput = {
    id?: SortOrder
    role_id?: SortOrder
    policy_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type RolePolicyMinOrderByAggregateInput = {
    id?: SortOrder
    role_id?: SortOrder
    policy_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type RolePolicySumOrderByAggregateInput = {
    id?: SortOrder
    role_id?: SortOrder
    policy_id?: SortOrder
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type UserRoleUser_idRole_idCompoundUniqueInput = {
    user_id: number
    role_id: number
  }

  export type UserRoleCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    role_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UserRoleAvgOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    role_id?: SortOrder
  }

  export type UserRoleMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    role_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UserRoleMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    role_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UserRoleSumOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    role_id?: SortOrder
  }

  export type GroupOrderByRelevanceInput = {
    fields: GroupOrderByRelevanceFieldEnum | GroupOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type GroupCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type GroupAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type GroupMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type GroupMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type GroupSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type GroupScalarRelationFilter = {
    is?: GroupWhereInput
    isNot?: GroupWhereInput
  }

  export type GroupUserGroup_idUser_idCompoundUniqueInput = {
    group_id: number
    user_id: number
  }

  export type GroupUserCountOrderByAggregateInput = {
    id?: SortOrder
    group_id?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type GroupUserAvgOrderByAggregateInput = {
    id?: SortOrder
    group_id?: SortOrder
    user_id?: SortOrder
  }

  export type GroupUserMaxOrderByAggregateInput = {
    id?: SortOrder
    group_id?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type GroupUserMinOrderByAggregateInput = {
    id?: SortOrder
    group_id?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type GroupUserSumOrderByAggregateInput = {
    id?: SortOrder
    group_id?: SortOrder
    user_id?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type FormAccessListRelationFilter = {
    every?: FormAccessWhereInput
    some?: FormAccessWhereInput
    none?: FormAccessWhereInput
  }

  export type FormFieldListRelationFilter = {
    every?: FormFieldWhereInput
    some?: FormFieldWhereInput
    none?: FormFieldWhereInput
  }

  export type FormAccessOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FormFieldOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FormOrderByRelevanceInput = {
    fields: FormOrderByRelevanceFieldEnum | FormOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type FormCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    created_by?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type FormAvgOrderByAggregateInput = {
    id?: SortOrder
    created_by?: SortOrder
  }

  export type FormMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    created_by?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type FormMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    created_by?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type FormSumOrderByAggregateInput = {
    id?: SortOrder
    created_by?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumAccessTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AccessType | EnumAccessTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AccessType[]
    notIn?: $Enums.AccessType[]
    not?: NestedEnumAccessTypeFilter<$PrismaModel> | $Enums.AccessType
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type FormScalarRelationFilter = {
    is?: FormWhereInput
    isNot?: FormWhereInput
  }

  export type FormAccessOrderByRelevanceInput = {
    fields: FormAccessOrderByRelevanceFieldEnum | FormAccessOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type FormAccessCountOrderByAggregateInput = {
    id?: SortOrder
    form_id?: SortOrder
    access_type?: SortOrder
    access_value?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type FormAccessAvgOrderByAggregateInput = {
    id?: SortOrder
    form_id?: SortOrder
  }

  export type FormAccessMaxOrderByAggregateInput = {
    id?: SortOrder
    form_id?: SortOrder
    access_type?: SortOrder
    access_value?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type FormAccessMinOrderByAggregateInput = {
    id?: SortOrder
    form_id?: SortOrder
    access_type?: SortOrder
    access_value?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type FormAccessSumOrderByAggregateInput = {
    id?: SortOrder
    form_id?: SortOrder
  }

  export type EnumAccessTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AccessType | EnumAccessTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AccessType[]
    notIn?: $Enums.AccessType[]
    not?: NestedEnumAccessTypeWithAggregatesFilter<$PrismaModel> | $Enums.AccessType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAccessTypeFilter<$PrismaModel>
    _max?: NestedEnumAccessTypeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumFieldTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.FieldType | EnumFieldTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FieldType[]
    notIn?: $Enums.FieldType[]
    not?: NestedEnumFieldTypeFilter<$PrismaModel> | $Enums.FieldType
  }

  export type EnumFieldModeFilter<$PrismaModel = never> = {
    equals?: $Enums.FieldMode | EnumFieldModeFieldRefInput<$PrismaModel>
    in?: $Enums.FieldMode[]
    notIn?: $Enums.FieldMode[]
    not?: NestedEnumFieldModeFilter<$PrismaModel> | $Enums.FieldMode
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type FormFieldOptionListRelationFilter = {
    every?: FormFieldOptionWhereInput
    some?: FormFieldOptionWhereInput
    none?: FormFieldOptionWhereInput
  }

  export type FormFieldTableSourceNullableScalarRelationFilter = {
    is?: FormFieldTableSourceWhereInput | null
    isNot?: FormFieldTableSourceWhereInput | null
  }

  export type FormResponseValueListRelationFilter = {
    every?: FormResponseValueWhereInput
    some?: FormResponseValueWhereInput
    none?: FormResponseValueWhereInput
  }

  export type FormFieldOptionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FormResponseValueOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FormFieldOrderByRelevanceInput = {
    fields: FormFieldOrderByRelevanceFieldEnum | FormFieldOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type FormFieldCountOrderByAggregateInput = {
    id?: SortOrder
    form_id?: SortOrder
    field_key?: SortOrder
    label?: SortOrder
    field_type?: SortOrder
    mode?: SortOrder
    is_required?: SortOrder
    field_order?: SortOrder
    settings?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type FormFieldAvgOrderByAggregateInput = {
    id?: SortOrder
    form_id?: SortOrder
    field_order?: SortOrder
  }

  export type FormFieldMaxOrderByAggregateInput = {
    id?: SortOrder
    form_id?: SortOrder
    field_key?: SortOrder
    label?: SortOrder
    field_type?: SortOrder
    mode?: SortOrder
    is_required?: SortOrder
    field_order?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type FormFieldMinOrderByAggregateInput = {
    id?: SortOrder
    form_id?: SortOrder
    field_key?: SortOrder
    label?: SortOrder
    field_type?: SortOrder
    mode?: SortOrder
    is_required?: SortOrder
    field_order?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type FormFieldSumOrderByAggregateInput = {
    id?: SortOrder
    form_id?: SortOrder
    field_order?: SortOrder
  }

  export type EnumFieldTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FieldType | EnumFieldTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FieldType[]
    notIn?: $Enums.FieldType[]
    not?: NestedEnumFieldTypeWithAggregatesFilter<$PrismaModel> | $Enums.FieldType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFieldTypeFilter<$PrismaModel>
    _max?: NestedEnumFieldTypeFilter<$PrismaModel>
  }

  export type EnumFieldModeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FieldMode | EnumFieldModeFieldRefInput<$PrismaModel>
    in?: $Enums.FieldMode[]
    notIn?: $Enums.FieldMode[]
    not?: NestedEnumFieldModeWithAggregatesFilter<$PrismaModel> | $Enums.FieldMode
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFieldModeFilter<$PrismaModel>
    _max?: NestedEnumFieldModeFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type FormFieldScalarRelationFilter = {
    is?: FormFieldWhereInput
    isNot?: FormFieldWhereInput
  }

  export type FormFieldOptionOrderByRelevanceInput = {
    fields: FormFieldOptionOrderByRelevanceFieldEnum | FormFieldOptionOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type FormFieldOptionCountOrderByAggregateInput = {
    id?: SortOrder
    field_id?: SortOrder
    value?: SortOrder
    label?: SortOrder
    score?: SortOrder
    option_order?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type FormFieldOptionAvgOrderByAggregateInput = {
    id?: SortOrder
    field_id?: SortOrder
    score?: SortOrder
    option_order?: SortOrder
  }

  export type FormFieldOptionMaxOrderByAggregateInput = {
    id?: SortOrder
    field_id?: SortOrder
    value?: SortOrder
    label?: SortOrder
    score?: SortOrder
    option_order?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type FormFieldOptionMinOrderByAggregateInput = {
    id?: SortOrder
    field_id?: SortOrder
    value?: SortOrder
    label?: SortOrder
    score?: SortOrder
    option_order?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type FormFieldOptionSumOrderByAggregateInput = {
    id?: SortOrder
    field_id?: SortOrder
    score?: SortOrder
    option_order?: SortOrder
  }

  export type FormFieldTableSourceOrderByRelevanceInput = {
    fields: FormFieldTableSourceOrderByRelevanceFieldEnum | FormFieldTableSourceOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type FormFieldTableSourceCountOrderByAggregateInput = {
    id?: SortOrder
    field_id?: SortOrder
    source_table?: SortOrder
    source_value_column?: SortOrder
    source_label_column?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type FormFieldTableSourceAvgOrderByAggregateInput = {
    id?: SortOrder
    field_id?: SortOrder
  }

  export type FormFieldTableSourceMaxOrderByAggregateInput = {
    id?: SortOrder
    field_id?: SortOrder
    source_table?: SortOrder
    source_value_column?: SortOrder
    source_label_column?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type FormFieldTableSourceMinOrderByAggregateInput = {
    id?: SortOrder
    field_id?: SortOrder
    source_table?: SortOrder
    source_value_column?: SortOrder
    source_label_column?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type FormFieldTableSourceSumOrderByAggregateInput = {
    id?: SortOrder
    field_id?: SortOrder
  }

  export type EnumResponseStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ResponseStatus | EnumResponseStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ResponseStatus[]
    notIn?: $Enums.ResponseStatus[]
    not?: NestedEnumResponseStatusFilter<$PrismaModel> | $Enums.ResponseStatus
  }

  export type FormResponseCountOrderByAggregateInput = {
    id?: SortOrder
    form_id?: SortOrder
    user_id?: SortOrder
    total_score?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type FormResponseAvgOrderByAggregateInput = {
    id?: SortOrder
    form_id?: SortOrder
    user_id?: SortOrder
    total_score?: SortOrder
  }

  export type FormResponseMaxOrderByAggregateInput = {
    id?: SortOrder
    form_id?: SortOrder
    user_id?: SortOrder
    total_score?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type FormResponseMinOrderByAggregateInput = {
    id?: SortOrder
    form_id?: SortOrder
    user_id?: SortOrder
    total_score?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type FormResponseSumOrderByAggregateInput = {
    id?: SortOrder
    form_id?: SortOrder
    user_id?: SortOrder
    total_score?: SortOrder
  }

  export type EnumResponseStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ResponseStatus | EnumResponseStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ResponseStatus[]
    notIn?: $Enums.ResponseStatus[]
    not?: NestedEnumResponseStatusWithAggregatesFilter<$PrismaModel> | $Enums.ResponseStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumResponseStatusFilter<$PrismaModel>
    _max?: NestedEnumResponseStatusFilter<$PrismaModel>
  }

  export type FormResponseScalarRelationFilter = {
    is?: FormResponseWhereInput
    isNot?: FormResponseWhereInput
  }

  export type FormResponseValueOrderByRelevanceInput = {
    fields: FormResponseValueOrderByRelevanceFieldEnum | FormResponseValueOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type FormResponseValueCountOrderByAggregateInput = {
    id?: SortOrder
    response_id?: SortOrder
    field_id?: SortOrder
    value?: SortOrder
    score?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type FormResponseValueAvgOrderByAggregateInput = {
    id?: SortOrder
    response_id?: SortOrder
    field_id?: SortOrder
    score?: SortOrder
  }

  export type FormResponseValueMaxOrderByAggregateInput = {
    id?: SortOrder
    response_id?: SortOrder
    field_id?: SortOrder
    value?: SortOrder
    score?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type FormResponseValueMinOrderByAggregateInput = {
    id?: SortOrder
    response_id?: SortOrder
    field_id?: SortOrder
    value?: SortOrder
    score?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type FormResponseValueSumOrderByAggregateInput = {
    id?: SortOrder
    response_id?: SortOrder
    field_id?: SortOrder
    score?: SortOrder
  }

  export type RoleCreateNestedOneWithoutDefaultForUsersInput = {
    create?: XOR<RoleCreateWithoutDefaultForUsersInput, RoleUncheckedCreateWithoutDefaultForUsersInput>
    connectOrCreate?: RoleCreateOrConnectWithoutDefaultForUsersInput
    connect?: RoleWhereUniqueInput
  }

  export type UserRoleCreateNestedManyWithoutUserInput = {
    create?: XOR<UserRoleCreateWithoutUserInput, UserRoleUncheckedCreateWithoutUserInput> | UserRoleCreateWithoutUserInput[] | UserRoleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserRoleCreateOrConnectWithoutUserInput | UserRoleCreateOrConnectWithoutUserInput[]
    createMany?: UserRoleCreateManyUserInputEnvelope
    connect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
  }

  export type GroupUserCreateNestedManyWithoutUserInput = {
    create?: XOR<GroupUserCreateWithoutUserInput, GroupUserUncheckedCreateWithoutUserInput> | GroupUserCreateWithoutUserInput[] | GroupUserUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GroupUserCreateOrConnectWithoutUserInput | GroupUserCreateOrConnectWithoutUserInput[]
    createMany?: GroupUserCreateManyUserInputEnvelope
    connect?: GroupUserWhereUniqueInput | GroupUserWhereUniqueInput[]
  }

  export type FormCreateNestedManyWithoutCreatorInput = {
    create?: XOR<FormCreateWithoutCreatorInput, FormUncheckedCreateWithoutCreatorInput> | FormCreateWithoutCreatorInput[] | FormUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: FormCreateOrConnectWithoutCreatorInput | FormCreateOrConnectWithoutCreatorInput[]
    createMany?: FormCreateManyCreatorInputEnvelope
    connect?: FormWhereUniqueInput | FormWhereUniqueInput[]
  }

  export type FormResponseCreateNestedManyWithoutUserInput = {
    create?: XOR<FormResponseCreateWithoutUserInput, FormResponseUncheckedCreateWithoutUserInput> | FormResponseCreateWithoutUserInput[] | FormResponseUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FormResponseCreateOrConnectWithoutUserInput | FormResponseCreateOrConnectWithoutUserInput[]
    createMany?: FormResponseCreateManyUserInputEnvelope
    connect?: FormResponseWhereUniqueInput | FormResponseWhereUniqueInput[]
  }

  export type UserRoleUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserRoleCreateWithoutUserInput, UserRoleUncheckedCreateWithoutUserInput> | UserRoleCreateWithoutUserInput[] | UserRoleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserRoleCreateOrConnectWithoutUserInput | UserRoleCreateOrConnectWithoutUserInput[]
    createMany?: UserRoleCreateManyUserInputEnvelope
    connect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
  }

  export type GroupUserUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<GroupUserCreateWithoutUserInput, GroupUserUncheckedCreateWithoutUserInput> | GroupUserCreateWithoutUserInput[] | GroupUserUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GroupUserCreateOrConnectWithoutUserInput | GroupUserCreateOrConnectWithoutUserInput[]
    createMany?: GroupUserCreateManyUserInputEnvelope
    connect?: GroupUserWhereUniqueInput | GroupUserWhereUniqueInput[]
  }

  export type FormUncheckedCreateNestedManyWithoutCreatorInput = {
    create?: XOR<FormCreateWithoutCreatorInput, FormUncheckedCreateWithoutCreatorInput> | FormCreateWithoutCreatorInput[] | FormUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: FormCreateOrConnectWithoutCreatorInput | FormCreateOrConnectWithoutCreatorInput[]
    createMany?: FormCreateManyCreatorInputEnvelope
    connect?: FormWhereUniqueInput | FormWhereUniqueInput[]
  }

  export type FormResponseUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<FormResponseCreateWithoutUserInput, FormResponseUncheckedCreateWithoutUserInput> | FormResponseCreateWithoutUserInput[] | FormResponseUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FormResponseCreateOrConnectWithoutUserInput | FormResponseCreateOrConnectWithoutUserInput[]
    createMany?: FormResponseCreateManyUserInputEnvelope
    connect?: FormResponseWhereUniqueInput | FormResponseWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type RoleUpdateOneWithoutDefaultForUsersNestedInput = {
    create?: XOR<RoleCreateWithoutDefaultForUsersInput, RoleUncheckedCreateWithoutDefaultForUsersInput>
    connectOrCreate?: RoleCreateOrConnectWithoutDefaultForUsersInput
    upsert?: RoleUpsertWithoutDefaultForUsersInput
    disconnect?: RoleWhereInput | boolean
    delete?: RoleWhereInput | boolean
    connect?: RoleWhereUniqueInput
    update?: XOR<XOR<RoleUpdateToOneWithWhereWithoutDefaultForUsersInput, RoleUpdateWithoutDefaultForUsersInput>, RoleUncheckedUpdateWithoutDefaultForUsersInput>
  }

  export type UserRoleUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserRoleCreateWithoutUserInput, UserRoleUncheckedCreateWithoutUserInput> | UserRoleCreateWithoutUserInput[] | UserRoleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserRoleCreateOrConnectWithoutUserInput | UserRoleCreateOrConnectWithoutUserInput[]
    upsert?: UserRoleUpsertWithWhereUniqueWithoutUserInput | UserRoleUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserRoleCreateManyUserInputEnvelope
    set?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    disconnect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    delete?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    connect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    update?: UserRoleUpdateWithWhereUniqueWithoutUserInput | UserRoleUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserRoleUpdateManyWithWhereWithoutUserInput | UserRoleUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserRoleScalarWhereInput | UserRoleScalarWhereInput[]
  }

  export type GroupUserUpdateManyWithoutUserNestedInput = {
    create?: XOR<GroupUserCreateWithoutUserInput, GroupUserUncheckedCreateWithoutUserInput> | GroupUserCreateWithoutUserInput[] | GroupUserUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GroupUserCreateOrConnectWithoutUserInput | GroupUserCreateOrConnectWithoutUserInput[]
    upsert?: GroupUserUpsertWithWhereUniqueWithoutUserInput | GroupUserUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: GroupUserCreateManyUserInputEnvelope
    set?: GroupUserWhereUniqueInput | GroupUserWhereUniqueInput[]
    disconnect?: GroupUserWhereUniqueInput | GroupUserWhereUniqueInput[]
    delete?: GroupUserWhereUniqueInput | GroupUserWhereUniqueInput[]
    connect?: GroupUserWhereUniqueInput | GroupUserWhereUniqueInput[]
    update?: GroupUserUpdateWithWhereUniqueWithoutUserInput | GroupUserUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: GroupUserUpdateManyWithWhereWithoutUserInput | GroupUserUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: GroupUserScalarWhereInput | GroupUserScalarWhereInput[]
  }

  export type FormUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<FormCreateWithoutCreatorInput, FormUncheckedCreateWithoutCreatorInput> | FormCreateWithoutCreatorInput[] | FormUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: FormCreateOrConnectWithoutCreatorInput | FormCreateOrConnectWithoutCreatorInput[]
    upsert?: FormUpsertWithWhereUniqueWithoutCreatorInput | FormUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: FormCreateManyCreatorInputEnvelope
    set?: FormWhereUniqueInput | FormWhereUniqueInput[]
    disconnect?: FormWhereUniqueInput | FormWhereUniqueInput[]
    delete?: FormWhereUniqueInput | FormWhereUniqueInput[]
    connect?: FormWhereUniqueInput | FormWhereUniqueInput[]
    update?: FormUpdateWithWhereUniqueWithoutCreatorInput | FormUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: FormUpdateManyWithWhereWithoutCreatorInput | FormUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: FormScalarWhereInput | FormScalarWhereInput[]
  }

  export type FormResponseUpdateManyWithoutUserNestedInput = {
    create?: XOR<FormResponseCreateWithoutUserInput, FormResponseUncheckedCreateWithoutUserInput> | FormResponseCreateWithoutUserInput[] | FormResponseUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FormResponseCreateOrConnectWithoutUserInput | FormResponseCreateOrConnectWithoutUserInput[]
    upsert?: FormResponseUpsertWithWhereUniqueWithoutUserInput | FormResponseUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FormResponseCreateManyUserInputEnvelope
    set?: FormResponseWhereUniqueInput | FormResponseWhereUniqueInput[]
    disconnect?: FormResponseWhereUniqueInput | FormResponseWhereUniqueInput[]
    delete?: FormResponseWhereUniqueInput | FormResponseWhereUniqueInput[]
    connect?: FormResponseWhereUniqueInput | FormResponseWhereUniqueInput[]
    update?: FormResponseUpdateWithWhereUniqueWithoutUserInput | FormResponseUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FormResponseUpdateManyWithWhereWithoutUserInput | FormResponseUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FormResponseScalarWhereInput | FormResponseScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserRoleUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserRoleCreateWithoutUserInput, UserRoleUncheckedCreateWithoutUserInput> | UserRoleCreateWithoutUserInput[] | UserRoleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserRoleCreateOrConnectWithoutUserInput | UserRoleCreateOrConnectWithoutUserInput[]
    upsert?: UserRoleUpsertWithWhereUniqueWithoutUserInput | UserRoleUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserRoleCreateManyUserInputEnvelope
    set?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    disconnect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    delete?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    connect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    update?: UserRoleUpdateWithWhereUniqueWithoutUserInput | UserRoleUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserRoleUpdateManyWithWhereWithoutUserInput | UserRoleUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserRoleScalarWhereInput | UserRoleScalarWhereInput[]
  }

  export type GroupUserUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<GroupUserCreateWithoutUserInput, GroupUserUncheckedCreateWithoutUserInput> | GroupUserCreateWithoutUserInput[] | GroupUserUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GroupUserCreateOrConnectWithoutUserInput | GroupUserCreateOrConnectWithoutUserInput[]
    upsert?: GroupUserUpsertWithWhereUniqueWithoutUserInput | GroupUserUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: GroupUserCreateManyUserInputEnvelope
    set?: GroupUserWhereUniqueInput | GroupUserWhereUniqueInput[]
    disconnect?: GroupUserWhereUniqueInput | GroupUserWhereUniqueInput[]
    delete?: GroupUserWhereUniqueInput | GroupUserWhereUniqueInput[]
    connect?: GroupUserWhereUniqueInput | GroupUserWhereUniqueInput[]
    update?: GroupUserUpdateWithWhereUniqueWithoutUserInput | GroupUserUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: GroupUserUpdateManyWithWhereWithoutUserInput | GroupUserUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: GroupUserScalarWhereInput | GroupUserScalarWhereInput[]
  }

  export type FormUncheckedUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<FormCreateWithoutCreatorInput, FormUncheckedCreateWithoutCreatorInput> | FormCreateWithoutCreatorInput[] | FormUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: FormCreateOrConnectWithoutCreatorInput | FormCreateOrConnectWithoutCreatorInput[]
    upsert?: FormUpsertWithWhereUniqueWithoutCreatorInput | FormUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: FormCreateManyCreatorInputEnvelope
    set?: FormWhereUniqueInput | FormWhereUniqueInput[]
    disconnect?: FormWhereUniqueInput | FormWhereUniqueInput[]
    delete?: FormWhereUniqueInput | FormWhereUniqueInput[]
    connect?: FormWhereUniqueInput | FormWhereUniqueInput[]
    update?: FormUpdateWithWhereUniqueWithoutCreatorInput | FormUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: FormUpdateManyWithWhereWithoutCreatorInput | FormUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: FormScalarWhereInput | FormScalarWhereInput[]
  }

  export type FormResponseUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<FormResponseCreateWithoutUserInput, FormResponseUncheckedCreateWithoutUserInput> | FormResponseCreateWithoutUserInput[] | FormResponseUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FormResponseCreateOrConnectWithoutUserInput | FormResponseCreateOrConnectWithoutUserInput[]
    upsert?: FormResponseUpsertWithWhereUniqueWithoutUserInput | FormResponseUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FormResponseCreateManyUserInputEnvelope
    set?: FormResponseWhereUniqueInput | FormResponseWhereUniqueInput[]
    disconnect?: FormResponseWhereUniqueInput | FormResponseWhereUniqueInput[]
    delete?: FormResponseWhereUniqueInput | FormResponseWhereUniqueInput[]
    connect?: FormResponseWhereUniqueInput | FormResponseWhereUniqueInput[]
    update?: FormResponseUpdateWithWhereUniqueWithoutUserInput | FormResponseUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FormResponseUpdateManyWithWhereWithoutUserInput | FormResponseUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FormResponseScalarWhereInput | FormResponseScalarWhereInput[]
  }

  export type RolePolicyCreateNestedManyWithoutRoleInput = {
    create?: XOR<RolePolicyCreateWithoutRoleInput, RolePolicyUncheckedCreateWithoutRoleInput> | RolePolicyCreateWithoutRoleInput[] | RolePolicyUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: RolePolicyCreateOrConnectWithoutRoleInput | RolePolicyCreateOrConnectWithoutRoleInput[]
    createMany?: RolePolicyCreateManyRoleInputEnvelope
    connect?: RolePolicyWhereUniqueInput | RolePolicyWhereUniqueInput[]
  }

  export type UserRoleCreateNestedManyWithoutRoleInput = {
    create?: XOR<UserRoleCreateWithoutRoleInput, UserRoleUncheckedCreateWithoutRoleInput> | UserRoleCreateWithoutRoleInput[] | UserRoleUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserRoleCreateOrConnectWithoutRoleInput | UserRoleCreateOrConnectWithoutRoleInput[]
    createMany?: UserRoleCreateManyRoleInputEnvelope
    connect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
  }

  export type UserCreateNestedManyWithoutDefault_roleInput = {
    create?: XOR<UserCreateWithoutDefault_roleInput, UserUncheckedCreateWithoutDefault_roleInput> | UserCreateWithoutDefault_roleInput[] | UserUncheckedCreateWithoutDefault_roleInput[]
    connectOrCreate?: UserCreateOrConnectWithoutDefault_roleInput | UserCreateOrConnectWithoutDefault_roleInput[]
    createMany?: UserCreateManyDefault_roleInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type RolePolicyUncheckedCreateNestedManyWithoutRoleInput = {
    create?: XOR<RolePolicyCreateWithoutRoleInput, RolePolicyUncheckedCreateWithoutRoleInput> | RolePolicyCreateWithoutRoleInput[] | RolePolicyUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: RolePolicyCreateOrConnectWithoutRoleInput | RolePolicyCreateOrConnectWithoutRoleInput[]
    createMany?: RolePolicyCreateManyRoleInputEnvelope
    connect?: RolePolicyWhereUniqueInput | RolePolicyWhereUniqueInput[]
  }

  export type UserRoleUncheckedCreateNestedManyWithoutRoleInput = {
    create?: XOR<UserRoleCreateWithoutRoleInput, UserRoleUncheckedCreateWithoutRoleInput> | UserRoleCreateWithoutRoleInput[] | UserRoleUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserRoleCreateOrConnectWithoutRoleInput | UserRoleCreateOrConnectWithoutRoleInput[]
    createMany?: UserRoleCreateManyRoleInputEnvelope
    connect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutDefault_roleInput = {
    create?: XOR<UserCreateWithoutDefault_roleInput, UserUncheckedCreateWithoutDefault_roleInput> | UserCreateWithoutDefault_roleInput[] | UserUncheckedCreateWithoutDefault_roleInput[]
    connectOrCreate?: UserCreateOrConnectWithoutDefault_roleInput | UserCreateOrConnectWithoutDefault_roleInput[]
    createMany?: UserCreateManyDefault_roleInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type RolePolicyUpdateManyWithoutRoleNestedInput = {
    create?: XOR<RolePolicyCreateWithoutRoleInput, RolePolicyUncheckedCreateWithoutRoleInput> | RolePolicyCreateWithoutRoleInput[] | RolePolicyUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: RolePolicyCreateOrConnectWithoutRoleInput | RolePolicyCreateOrConnectWithoutRoleInput[]
    upsert?: RolePolicyUpsertWithWhereUniqueWithoutRoleInput | RolePolicyUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: RolePolicyCreateManyRoleInputEnvelope
    set?: RolePolicyWhereUniqueInput | RolePolicyWhereUniqueInput[]
    disconnect?: RolePolicyWhereUniqueInput | RolePolicyWhereUniqueInput[]
    delete?: RolePolicyWhereUniqueInput | RolePolicyWhereUniqueInput[]
    connect?: RolePolicyWhereUniqueInput | RolePolicyWhereUniqueInput[]
    update?: RolePolicyUpdateWithWhereUniqueWithoutRoleInput | RolePolicyUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: RolePolicyUpdateManyWithWhereWithoutRoleInput | RolePolicyUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: RolePolicyScalarWhereInput | RolePolicyScalarWhereInput[]
  }

  export type UserRoleUpdateManyWithoutRoleNestedInput = {
    create?: XOR<UserRoleCreateWithoutRoleInput, UserRoleUncheckedCreateWithoutRoleInput> | UserRoleCreateWithoutRoleInput[] | UserRoleUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserRoleCreateOrConnectWithoutRoleInput | UserRoleCreateOrConnectWithoutRoleInput[]
    upsert?: UserRoleUpsertWithWhereUniqueWithoutRoleInput | UserRoleUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: UserRoleCreateManyRoleInputEnvelope
    set?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    disconnect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    delete?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    connect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    update?: UserRoleUpdateWithWhereUniqueWithoutRoleInput | UserRoleUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: UserRoleUpdateManyWithWhereWithoutRoleInput | UserRoleUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: UserRoleScalarWhereInput | UserRoleScalarWhereInput[]
  }

  export type UserUpdateManyWithoutDefault_roleNestedInput = {
    create?: XOR<UserCreateWithoutDefault_roleInput, UserUncheckedCreateWithoutDefault_roleInput> | UserCreateWithoutDefault_roleInput[] | UserUncheckedCreateWithoutDefault_roleInput[]
    connectOrCreate?: UserCreateOrConnectWithoutDefault_roleInput | UserCreateOrConnectWithoutDefault_roleInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutDefault_roleInput | UserUpsertWithWhereUniqueWithoutDefault_roleInput[]
    createMany?: UserCreateManyDefault_roleInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutDefault_roleInput | UserUpdateWithWhereUniqueWithoutDefault_roleInput[]
    updateMany?: UserUpdateManyWithWhereWithoutDefault_roleInput | UserUpdateManyWithWhereWithoutDefault_roleInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type RolePolicyUncheckedUpdateManyWithoutRoleNestedInput = {
    create?: XOR<RolePolicyCreateWithoutRoleInput, RolePolicyUncheckedCreateWithoutRoleInput> | RolePolicyCreateWithoutRoleInput[] | RolePolicyUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: RolePolicyCreateOrConnectWithoutRoleInput | RolePolicyCreateOrConnectWithoutRoleInput[]
    upsert?: RolePolicyUpsertWithWhereUniqueWithoutRoleInput | RolePolicyUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: RolePolicyCreateManyRoleInputEnvelope
    set?: RolePolicyWhereUniqueInput | RolePolicyWhereUniqueInput[]
    disconnect?: RolePolicyWhereUniqueInput | RolePolicyWhereUniqueInput[]
    delete?: RolePolicyWhereUniqueInput | RolePolicyWhereUniqueInput[]
    connect?: RolePolicyWhereUniqueInput | RolePolicyWhereUniqueInput[]
    update?: RolePolicyUpdateWithWhereUniqueWithoutRoleInput | RolePolicyUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: RolePolicyUpdateManyWithWhereWithoutRoleInput | RolePolicyUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: RolePolicyScalarWhereInput | RolePolicyScalarWhereInput[]
  }

  export type UserRoleUncheckedUpdateManyWithoutRoleNestedInput = {
    create?: XOR<UserRoleCreateWithoutRoleInput, UserRoleUncheckedCreateWithoutRoleInput> | UserRoleCreateWithoutRoleInput[] | UserRoleUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserRoleCreateOrConnectWithoutRoleInput | UserRoleCreateOrConnectWithoutRoleInput[]
    upsert?: UserRoleUpsertWithWhereUniqueWithoutRoleInput | UserRoleUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: UserRoleCreateManyRoleInputEnvelope
    set?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    disconnect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    delete?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    connect?: UserRoleWhereUniqueInput | UserRoleWhereUniqueInput[]
    update?: UserRoleUpdateWithWhereUniqueWithoutRoleInput | UserRoleUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: UserRoleUpdateManyWithWhereWithoutRoleInput | UserRoleUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: UserRoleScalarWhereInput | UserRoleScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutDefault_roleNestedInput = {
    create?: XOR<UserCreateWithoutDefault_roleInput, UserUncheckedCreateWithoutDefault_roleInput> | UserCreateWithoutDefault_roleInput[] | UserUncheckedCreateWithoutDefault_roleInput[]
    connectOrCreate?: UserCreateOrConnectWithoutDefault_roleInput | UserCreateOrConnectWithoutDefault_roleInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutDefault_roleInput | UserUpsertWithWhereUniqueWithoutDefault_roleInput[]
    createMany?: UserCreateManyDefault_roleInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutDefault_roleInput | UserUpdateWithWhereUniqueWithoutDefault_roleInput[]
    updateMany?: UserUpdateManyWithWhereWithoutDefault_roleInput | UserUpdateManyWithWhereWithoutDefault_roleInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type RolePolicyCreateNestedManyWithoutPolicyInput = {
    create?: XOR<RolePolicyCreateWithoutPolicyInput, RolePolicyUncheckedCreateWithoutPolicyInput> | RolePolicyCreateWithoutPolicyInput[] | RolePolicyUncheckedCreateWithoutPolicyInput[]
    connectOrCreate?: RolePolicyCreateOrConnectWithoutPolicyInput | RolePolicyCreateOrConnectWithoutPolicyInput[]
    createMany?: RolePolicyCreateManyPolicyInputEnvelope
    connect?: RolePolicyWhereUniqueInput | RolePolicyWhereUniqueInput[]
  }

  export type RolePolicyUncheckedCreateNestedManyWithoutPolicyInput = {
    create?: XOR<RolePolicyCreateWithoutPolicyInput, RolePolicyUncheckedCreateWithoutPolicyInput> | RolePolicyCreateWithoutPolicyInput[] | RolePolicyUncheckedCreateWithoutPolicyInput[]
    connectOrCreate?: RolePolicyCreateOrConnectWithoutPolicyInput | RolePolicyCreateOrConnectWithoutPolicyInput[]
    createMany?: RolePolicyCreateManyPolicyInputEnvelope
    connect?: RolePolicyWhereUniqueInput | RolePolicyWhereUniqueInput[]
  }

  export type RolePolicyUpdateManyWithoutPolicyNestedInput = {
    create?: XOR<RolePolicyCreateWithoutPolicyInput, RolePolicyUncheckedCreateWithoutPolicyInput> | RolePolicyCreateWithoutPolicyInput[] | RolePolicyUncheckedCreateWithoutPolicyInput[]
    connectOrCreate?: RolePolicyCreateOrConnectWithoutPolicyInput | RolePolicyCreateOrConnectWithoutPolicyInput[]
    upsert?: RolePolicyUpsertWithWhereUniqueWithoutPolicyInput | RolePolicyUpsertWithWhereUniqueWithoutPolicyInput[]
    createMany?: RolePolicyCreateManyPolicyInputEnvelope
    set?: RolePolicyWhereUniqueInput | RolePolicyWhereUniqueInput[]
    disconnect?: RolePolicyWhereUniqueInput | RolePolicyWhereUniqueInput[]
    delete?: RolePolicyWhereUniqueInput | RolePolicyWhereUniqueInput[]
    connect?: RolePolicyWhereUniqueInput | RolePolicyWhereUniqueInput[]
    update?: RolePolicyUpdateWithWhereUniqueWithoutPolicyInput | RolePolicyUpdateWithWhereUniqueWithoutPolicyInput[]
    updateMany?: RolePolicyUpdateManyWithWhereWithoutPolicyInput | RolePolicyUpdateManyWithWhereWithoutPolicyInput[]
    deleteMany?: RolePolicyScalarWhereInput | RolePolicyScalarWhereInput[]
  }

  export type RolePolicyUncheckedUpdateManyWithoutPolicyNestedInput = {
    create?: XOR<RolePolicyCreateWithoutPolicyInput, RolePolicyUncheckedCreateWithoutPolicyInput> | RolePolicyCreateWithoutPolicyInput[] | RolePolicyUncheckedCreateWithoutPolicyInput[]
    connectOrCreate?: RolePolicyCreateOrConnectWithoutPolicyInput | RolePolicyCreateOrConnectWithoutPolicyInput[]
    upsert?: RolePolicyUpsertWithWhereUniqueWithoutPolicyInput | RolePolicyUpsertWithWhereUniqueWithoutPolicyInput[]
    createMany?: RolePolicyCreateManyPolicyInputEnvelope
    set?: RolePolicyWhereUniqueInput | RolePolicyWhereUniqueInput[]
    disconnect?: RolePolicyWhereUniqueInput | RolePolicyWhereUniqueInput[]
    delete?: RolePolicyWhereUniqueInput | RolePolicyWhereUniqueInput[]
    connect?: RolePolicyWhereUniqueInput | RolePolicyWhereUniqueInput[]
    update?: RolePolicyUpdateWithWhereUniqueWithoutPolicyInput | RolePolicyUpdateWithWhereUniqueWithoutPolicyInput[]
    updateMany?: RolePolicyUpdateManyWithWhereWithoutPolicyInput | RolePolicyUpdateManyWithWhereWithoutPolicyInput[]
    deleteMany?: RolePolicyScalarWhereInput | RolePolicyScalarWhereInput[]
  }

  export type RoleCreateNestedOneWithoutPoliciesInput = {
    create?: XOR<RoleCreateWithoutPoliciesInput, RoleUncheckedCreateWithoutPoliciesInput>
    connectOrCreate?: RoleCreateOrConnectWithoutPoliciesInput
    connect?: RoleWhereUniqueInput
  }

  export type PolicyCreateNestedOneWithoutRolesInput = {
    create?: XOR<PolicyCreateWithoutRolesInput, PolicyUncheckedCreateWithoutRolesInput>
    connectOrCreate?: PolicyCreateOrConnectWithoutRolesInput
    connect?: PolicyWhereUniqueInput
  }

  export type RoleUpdateOneRequiredWithoutPoliciesNestedInput = {
    create?: XOR<RoleCreateWithoutPoliciesInput, RoleUncheckedCreateWithoutPoliciesInput>
    connectOrCreate?: RoleCreateOrConnectWithoutPoliciesInput
    upsert?: RoleUpsertWithoutPoliciesInput
    connect?: RoleWhereUniqueInput
    update?: XOR<XOR<RoleUpdateToOneWithWhereWithoutPoliciesInput, RoleUpdateWithoutPoliciesInput>, RoleUncheckedUpdateWithoutPoliciesInput>
  }

  export type PolicyUpdateOneRequiredWithoutRolesNestedInput = {
    create?: XOR<PolicyCreateWithoutRolesInput, PolicyUncheckedCreateWithoutRolesInput>
    connectOrCreate?: PolicyCreateOrConnectWithoutRolesInput
    upsert?: PolicyUpsertWithoutRolesInput
    connect?: PolicyWhereUniqueInput
    update?: XOR<XOR<PolicyUpdateToOneWithWhereWithoutRolesInput, PolicyUpdateWithoutRolesInput>, PolicyUncheckedUpdateWithoutRolesInput>
  }

  export type UserCreateNestedOneWithoutRolesInput = {
    create?: XOR<UserCreateWithoutRolesInput, UserUncheckedCreateWithoutRolesInput>
    connectOrCreate?: UserCreateOrConnectWithoutRolesInput
    connect?: UserWhereUniqueInput
  }

  export type RoleCreateNestedOneWithoutUsersInput = {
    create?: XOR<RoleCreateWithoutUsersInput, RoleUncheckedCreateWithoutUsersInput>
    connectOrCreate?: RoleCreateOrConnectWithoutUsersInput
    connect?: RoleWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutRolesNestedInput = {
    create?: XOR<UserCreateWithoutRolesInput, UserUncheckedCreateWithoutRolesInput>
    connectOrCreate?: UserCreateOrConnectWithoutRolesInput
    upsert?: UserUpsertWithoutRolesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRolesInput, UserUpdateWithoutRolesInput>, UserUncheckedUpdateWithoutRolesInput>
  }

  export type RoleUpdateOneRequiredWithoutUsersNestedInput = {
    create?: XOR<RoleCreateWithoutUsersInput, RoleUncheckedCreateWithoutUsersInput>
    connectOrCreate?: RoleCreateOrConnectWithoutUsersInput
    upsert?: RoleUpsertWithoutUsersInput
    connect?: RoleWhereUniqueInput
    update?: XOR<XOR<RoleUpdateToOneWithWhereWithoutUsersInput, RoleUpdateWithoutUsersInput>, RoleUncheckedUpdateWithoutUsersInput>
  }

  export type GroupUserCreateNestedManyWithoutGroupInput = {
    create?: XOR<GroupUserCreateWithoutGroupInput, GroupUserUncheckedCreateWithoutGroupInput> | GroupUserCreateWithoutGroupInput[] | GroupUserUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: GroupUserCreateOrConnectWithoutGroupInput | GroupUserCreateOrConnectWithoutGroupInput[]
    createMany?: GroupUserCreateManyGroupInputEnvelope
    connect?: GroupUserWhereUniqueInput | GroupUserWhereUniqueInput[]
  }

  export type GroupUserUncheckedCreateNestedManyWithoutGroupInput = {
    create?: XOR<GroupUserCreateWithoutGroupInput, GroupUserUncheckedCreateWithoutGroupInput> | GroupUserCreateWithoutGroupInput[] | GroupUserUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: GroupUserCreateOrConnectWithoutGroupInput | GroupUserCreateOrConnectWithoutGroupInput[]
    createMany?: GroupUserCreateManyGroupInputEnvelope
    connect?: GroupUserWhereUniqueInput | GroupUserWhereUniqueInput[]
  }

  export type GroupUserUpdateManyWithoutGroupNestedInput = {
    create?: XOR<GroupUserCreateWithoutGroupInput, GroupUserUncheckedCreateWithoutGroupInput> | GroupUserCreateWithoutGroupInput[] | GroupUserUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: GroupUserCreateOrConnectWithoutGroupInput | GroupUserCreateOrConnectWithoutGroupInput[]
    upsert?: GroupUserUpsertWithWhereUniqueWithoutGroupInput | GroupUserUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: GroupUserCreateManyGroupInputEnvelope
    set?: GroupUserWhereUniqueInput | GroupUserWhereUniqueInput[]
    disconnect?: GroupUserWhereUniqueInput | GroupUserWhereUniqueInput[]
    delete?: GroupUserWhereUniqueInput | GroupUserWhereUniqueInput[]
    connect?: GroupUserWhereUniqueInput | GroupUserWhereUniqueInput[]
    update?: GroupUserUpdateWithWhereUniqueWithoutGroupInput | GroupUserUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: GroupUserUpdateManyWithWhereWithoutGroupInput | GroupUserUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: GroupUserScalarWhereInput | GroupUserScalarWhereInput[]
  }

  export type GroupUserUncheckedUpdateManyWithoutGroupNestedInput = {
    create?: XOR<GroupUserCreateWithoutGroupInput, GroupUserUncheckedCreateWithoutGroupInput> | GroupUserCreateWithoutGroupInput[] | GroupUserUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: GroupUserCreateOrConnectWithoutGroupInput | GroupUserCreateOrConnectWithoutGroupInput[]
    upsert?: GroupUserUpsertWithWhereUniqueWithoutGroupInput | GroupUserUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: GroupUserCreateManyGroupInputEnvelope
    set?: GroupUserWhereUniqueInput | GroupUserWhereUniqueInput[]
    disconnect?: GroupUserWhereUniqueInput | GroupUserWhereUniqueInput[]
    delete?: GroupUserWhereUniqueInput | GroupUserWhereUniqueInput[]
    connect?: GroupUserWhereUniqueInput | GroupUserWhereUniqueInput[]
    update?: GroupUserUpdateWithWhereUniqueWithoutGroupInput | GroupUserUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: GroupUserUpdateManyWithWhereWithoutGroupInput | GroupUserUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: GroupUserScalarWhereInput | GroupUserScalarWhereInput[]
  }

  export type GroupCreateNestedOneWithoutUsersInput = {
    create?: XOR<GroupCreateWithoutUsersInput, GroupUncheckedCreateWithoutUsersInput>
    connectOrCreate?: GroupCreateOrConnectWithoutUsersInput
    connect?: GroupWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutGroupsInput = {
    create?: XOR<UserCreateWithoutGroupsInput, UserUncheckedCreateWithoutGroupsInput>
    connectOrCreate?: UserCreateOrConnectWithoutGroupsInput
    connect?: UserWhereUniqueInput
  }

  export type GroupUpdateOneRequiredWithoutUsersNestedInput = {
    create?: XOR<GroupCreateWithoutUsersInput, GroupUncheckedCreateWithoutUsersInput>
    connectOrCreate?: GroupCreateOrConnectWithoutUsersInput
    upsert?: GroupUpsertWithoutUsersInput
    connect?: GroupWhereUniqueInput
    update?: XOR<XOR<GroupUpdateToOneWithWhereWithoutUsersInput, GroupUpdateWithoutUsersInput>, GroupUncheckedUpdateWithoutUsersInput>
  }

  export type UserUpdateOneRequiredWithoutGroupsNestedInput = {
    create?: XOR<UserCreateWithoutGroupsInput, UserUncheckedCreateWithoutGroupsInput>
    connectOrCreate?: UserCreateOrConnectWithoutGroupsInput
    upsert?: UserUpsertWithoutGroupsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutGroupsInput, UserUpdateWithoutGroupsInput>, UserUncheckedUpdateWithoutGroupsInput>
  }

  export type UserCreateNestedOneWithoutFormsInput = {
    create?: XOR<UserCreateWithoutFormsInput, UserUncheckedCreateWithoutFormsInput>
    connectOrCreate?: UserCreateOrConnectWithoutFormsInput
    connect?: UserWhereUniqueInput
  }

  export type FormAccessCreateNestedManyWithoutFormInput = {
    create?: XOR<FormAccessCreateWithoutFormInput, FormAccessUncheckedCreateWithoutFormInput> | FormAccessCreateWithoutFormInput[] | FormAccessUncheckedCreateWithoutFormInput[]
    connectOrCreate?: FormAccessCreateOrConnectWithoutFormInput | FormAccessCreateOrConnectWithoutFormInput[]
    createMany?: FormAccessCreateManyFormInputEnvelope
    connect?: FormAccessWhereUniqueInput | FormAccessWhereUniqueInput[]
  }

  export type FormFieldCreateNestedManyWithoutFormInput = {
    create?: XOR<FormFieldCreateWithoutFormInput, FormFieldUncheckedCreateWithoutFormInput> | FormFieldCreateWithoutFormInput[] | FormFieldUncheckedCreateWithoutFormInput[]
    connectOrCreate?: FormFieldCreateOrConnectWithoutFormInput | FormFieldCreateOrConnectWithoutFormInput[]
    createMany?: FormFieldCreateManyFormInputEnvelope
    connect?: FormFieldWhereUniqueInput | FormFieldWhereUniqueInput[]
  }

  export type FormResponseCreateNestedManyWithoutFormInput = {
    create?: XOR<FormResponseCreateWithoutFormInput, FormResponseUncheckedCreateWithoutFormInput> | FormResponseCreateWithoutFormInput[] | FormResponseUncheckedCreateWithoutFormInput[]
    connectOrCreate?: FormResponseCreateOrConnectWithoutFormInput | FormResponseCreateOrConnectWithoutFormInput[]
    createMany?: FormResponseCreateManyFormInputEnvelope
    connect?: FormResponseWhereUniqueInput | FormResponseWhereUniqueInput[]
  }

  export type FormAccessUncheckedCreateNestedManyWithoutFormInput = {
    create?: XOR<FormAccessCreateWithoutFormInput, FormAccessUncheckedCreateWithoutFormInput> | FormAccessCreateWithoutFormInput[] | FormAccessUncheckedCreateWithoutFormInput[]
    connectOrCreate?: FormAccessCreateOrConnectWithoutFormInput | FormAccessCreateOrConnectWithoutFormInput[]
    createMany?: FormAccessCreateManyFormInputEnvelope
    connect?: FormAccessWhereUniqueInput | FormAccessWhereUniqueInput[]
  }

  export type FormFieldUncheckedCreateNestedManyWithoutFormInput = {
    create?: XOR<FormFieldCreateWithoutFormInput, FormFieldUncheckedCreateWithoutFormInput> | FormFieldCreateWithoutFormInput[] | FormFieldUncheckedCreateWithoutFormInput[]
    connectOrCreate?: FormFieldCreateOrConnectWithoutFormInput | FormFieldCreateOrConnectWithoutFormInput[]
    createMany?: FormFieldCreateManyFormInputEnvelope
    connect?: FormFieldWhereUniqueInput | FormFieldWhereUniqueInput[]
  }

  export type FormResponseUncheckedCreateNestedManyWithoutFormInput = {
    create?: XOR<FormResponseCreateWithoutFormInput, FormResponseUncheckedCreateWithoutFormInput> | FormResponseCreateWithoutFormInput[] | FormResponseUncheckedCreateWithoutFormInput[]
    connectOrCreate?: FormResponseCreateOrConnectWithoutFormInput | FormResponseCreateOrConnectWithoutFormInput[]
    createMany?: FormResponseCreateManyFormInputEnvelope
    connect?: FormResponseWhereUniqueInput | FormResponseWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneWithoutFormsNestedInput = {
    create?: XOR<UserCreateWithoutFormsInput, UserUncheckedCreateWithoutFormsInput>
    connectOrCreate?: UserCreateOrConnectWithoutFormsInput
    upsert?: UserUpsertWithoutFormsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFormsInput, UserUpdateWithoutFormsInput>, UserUncheckedUpdateWithoutFormsInput>
  }

  export type FormAccessUpdateManyWithoutFormNestedInput = {
    create?: XOR<FormAccessCreateWithoutFormInput, FormAccessUncheckedCreateWithoutFormInput> | FormAccessCreateWithoutFormInput[] | FormAccessUncheckedCreateWithoutFormInput[]
    connectOrCreate?: FormAccessCreateOrConnectWithoutFormInput | FormAccessCreateOrConnectWithoutFormInput[]
    upsert?: FormAccessUpsertWithWhereUniqueWithoutFormInput | FormAccessUpsertWithWhereUniqueWithoutFormInput[]
    createMany?: FormAccessCreateManyFormInputEnvelope
    set?: FormAccessWhereUniqueInput | FormAccessWhereUniqueInput[]
    disconnect?: FormAccessWhereUniqueInput | FormAccessWhereUniqueInput[]
    delete?: FormAccessWhereUniqueInput | FormAccessWhereUniqueInput[]
    connect?: FormAccessWhereUniqueInput | FormAccessWhereUniqueInput[]
    update?: FormAccessUpdateWithWhereUniqueWithoutFormInput | FormAccessUpdateWithWhereUniqueWithoutFormInput[]
    updateMany?: FormAccessUpdateManyWithWhereWithoutFormInput | FormAccessUpdateManyWithWhereWithoutFormInput[]
    deleteMany?: FormAccessScalarWhereInput | FormAccessScalarWhereInput[]
  }

  export type FormFieldUpdateManyWithoutFormNestedInput = {
    create?: XOR<FormFieldCreateWithoutFormInput, FormFieldUncheckedCreateWithoutFormInput> | FormFieldCreateWithoutFormInput[] | FormFieldUncheckedCreateWithoutFormInput[]
    connectOrCreate?: FormFieldCreateOrConnectWithoutFormInput | FormFieldCreateOrConnectWithoutFormInput[]
    upsert?: FormFieldUpsertWithWhereUniqueWithoutFormInput | FormFieldUpsertWithWhereUniqueWithoutFormInput[]
    createMany?: FormFieldCreateManyFormInputEnvelope
    set?: FormFieldWhereUniqueInput | FormFieldWhereUniqueInput[]
    disconnect?: FormFieldWhereUniqueInput | FormFieldWhereUniqueInput[]
    delete?: FormFieldWhereUniqueInput | FormFieldWhereUniqueInput[]
    connect?: FormFieldWhereUniqueInput | FormFieldWhereUniqueInput[]
    update?: FormFieldUpdateWithWhereUniqueWithoutFormInput | FormFieldUpdateWithWhereUniqueWithoutFormInput[]
    updateMany?: FormFieldUpdateManyWithWhereWithoutFormInput | FormFieldUpdateManyWithWhereWithoutFormInput[]
    deleteMany?: FormFieldScalarWhereInput | FormFieldScalarWhereInput[]
  }

  export type FormResponseUpdateManyWithoutFormNestedInput = {
    create?: XOR<FormResponseCreateWithoutFormInput, FormResponseUncheckedCreateWithoutFormInput> | FormResponseCreateWithoutFormInput[] | FormResponseUncheckedCreateWithoutFormInput[]
    connectOrCreate?: FormResponseCreateOrConnectWithoutFormInput | FormResponseCreateOrConnectWithoutFormInput[]
    upsert?: FormResponseUpsertWithWhereUniqueWithoutFormInput | FormResponseUpsertWithWhereUniqueWithoutFormInput[]
    createMany?: FormResponseCreateManyFormInputEnvelope
    set?: FormResponseWhereUniqueInput | FormResponseWhereUniqueInput[]
    disconnect?: FormResponseWhereUniqueInput | FormResponseWhereUniqueInput[]
    delete?: FormResponseWhereUniqueInput | FormResponseWhereUniqueInput[]
    connect?: FormResponseWhereUniqueInput | FormResponseWhereUniqueInput[]
    update?: FormResponseUpdateWithWhereUniqueWithoutFormInput | FormResponseUpdateWithWhereUniqueWithoutFormInput[]
    updateMany?: FormResponseUpdateManyWithWhereWithoutFormInput | FormResponseUpdateManyWithWhereWithoutFormInput[]
    deleteMany?: FormResponseScalarWhereInput | FormResponseScalarWhereInput[]
  }

  export type FormAccessUncheckedUpdateManyWithoutFormNestedInput = {
    create?: XOR<FormAccessCreateWithoutFormInput, FormAccessUncheckedCreateWithoutFormInput> | FormAccessCreateWithoutFormInput[] | FormAccessUncheckedCreateWithoutFormInput[]
    connectOrCreate?: FormAccessCreateOrConnectWithoutFormInput | FormAccessCreateOrConnectWithoutFormInput[]
    upsert?: FormAccessUpsertWithWhereUniqueWithoutFormInput | FormAccessUpsertWithWhereUniqueWithoutFormInput[]
    createMany?: FormAccessCreateManyFormInputEnvelope
    set?: FormAccessWhereUniqueInput | FormAccessWhereUniqueInput[]
    disconnect?: FormAccessWhereUniqueInput | FormAccessWhereUniqueInput[]
    delete?: FormAccessWhereUniqueInput | FormAccessWhereUniqueInput[]
    connect?: FormAccessWhereUniqueInput | FormAccessWhereUniqueInput[]
    update?: FormAccessUpdateWithWhereUniqueWithoutFormInput | FormAccessUpdateWithWhereUniqueWithoutFormInput[]
    updateMany?: FormAccessUpdateManyWithWhereWithoutFormInput | FormAccessUpdateManyWithWhereWithoutFormInput[]
    deleteMany?: FormAccessScalarWhereInput | FormAccessScalarWhereInput[]
  }

  export type FormFieldUncheckedUpdateManyWithoutFormNestedInput = {
    create?: XOR<FormFieldCreateWithoutFormInput, FormFieldUncheckedCreateWithoutFormInput> | FormFieldCreateWithoutFormInput[] | FormFieldUncheckedCreateWithoutFormInput[]
    connectOrCreate?: FormFieldCreateOrConnectWithoutFormInput | FormFieldCreateOrConnectWithoutFormInput[]
    upsert?: FormFieldUpsertWithWhereUniqueWithoutFormInput | FormFieldUpsertWithWhereUniqueWithoutFormInput[]
    createMany?: FormFieldCreateManyFormInputEnvelope
    set?: FormFieldWhereUniqueInput | FormFieldWhereUniqueInput[]
    disconnect?: FormFieldWhereUniqueInput | FormFieldWhereUniqueInput[]
    delete?: FormFieldWhereUniqueInput | FormFieldWhereUniqueInput[]
    connect?: FormFieldWhereUniqueInput | FormFieldWhereUniqueInput[]
    update?: FormFieldUpdateWithWhereUniqueWithoutFormInput | FormFieldUpdateWithWhereUniqueWithoutFormInput[]
    updateMany?: FormFieldUpdateManyWithWhereWithoutFormInput | FormFieldUpdateManyWithWhereWithoutFormInput[]
    deleteMany?: FormFieldScalarWhereInput | FormFieldScalarWhereInput[]
  }

  export type FormResponseUncheckedUpdateManyWithoutFormNestedInput = {
    create?: XOR<FormResponseCreateWithoutFormInput, FormResponseUncheckedCreateWithoutFormInput> | FormResponseCreateWithoutFormInput[] | FormResponseUncheckedCreateWithoutFormInput[]
    connectOrCreate?: FormResponseCreateOrConnectWithoutFormInput | FormResponseCreateOrConnectWithoutFormInput[]
    upsert?: FormResponseUpsertWithWhereUniqueWithoutFormInput | FormResponseUpsertWithWhereUniqueWithoutFormInput[]
    createMany?: FormResponseCreateManyFormInputEnvelope
    set?: FormResponseWhereUniqueInput | FormResponseWhereUniqueInput[]
    disconnect?: FormResponseWhereUniqueInput | FormResponseWhereUniqueInput[]
    delete?: FormResponseWhereUniqueInput | FormResponseWhereUniqueInput[]
    connect?: FormResponseWhereUniqueInput | FormResponseWhereUniqueInput[]
    update?: FormResponseUpdateWithWhereUniqueWithoutFormInput | FormResponseUpdateWithWhereUniqueWithoutFormInput[]
    updateMany?: FormResponseUpdateManyWithWhereWithoutFormInput | FormResponseUpdateManyWithWhereWithoutFormInput[]
    deleteMany?: FormResponseScalarWhereInput | FormResponseScalarWhereInput[]
  }

  export type FormCreateNestedOneWithoutAccessInput = {
    create?: XOR<FormCreateWithoutAccessInput, FormUncheckedCreateWithoutAccessInput>
    connectOrCreate?: FormCreateOrConnectWithoutAccessInput
    connect?: FormWhereUniqueInput
  }

  export type EnumAccessTypeFieldUpdateOperationsInput = {
    set?: $Enums.AccessType
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type FormUpdateOneRequiredWithoutAccessNestedInput = {
    create?: XOR<FormCreateWithoutAccessInput, FormUncheckedCreateWithoutAccessInput>
    connectOrCreate?: FormCreateOrConnectWithoutAccessInput
    upsert?: FormUpsertWithoutAccessInput
    connect?: FormWhereUniqueInput
    update?: XOR<XOR<FormUpdateToOneWithWhereWithoutAccessInput, FormUpdateWithoutAccessInput>, FormUncheckedUpdateWithoutAccessInput>
  }

  export type FormCreateNestedOneWithoutFieldsInput = {
    create?: XOR<FormCreateWithoutFieldsInput, FormUncheckedCreateWithoutFieldsInput>
    connectOrCreate?: FormCreateOrConnectWithoutFieldsInput
    connect?: FormWhereUniqueInput
  }

  export type FormFieldOptionCreateNestedManyWithoutFieldInput = {
    create?: XOR<FormFieldOptionCreateWithoutFieldInput, FormFieldOptionUncheckedCreateWithoutFieldInput> | FormFieldOptionCreateWithoutFieldInput[] | FormFieldOptionUncheckedCreateWithoutFieldInput[]
    connectOrCreate?: FormFieldOptionCreateOrConnectWithoutFieldInput | FormFieldOptionCreateOrConnectWithoutFieldInput[]
    createMany?: FormFieldOptionCreateManyFieldInputEnvelope
    connect?: FormFieldOptionWhereUniqueInput | FormFieldOptionWhereUniqueInput[]
  }

  export type FormFieldTableSourceCreateNestedOneWithoutFieldInput = {
    create?: XOR<FormFieldTableSourceCreateWithoutFieldInput, FormFieldTableSourceUncheckedCreateWithoutFieldInput>
    connectOrCreate?: FormFieldTableSourceCreateOrConnectWithoutFieldInput
    connect?: FormFieldTableSourceWhereUniqueInput
  }

  export type FormResponseValueCreateNestedManyWithoutFieldInput = {
    create?: XOR<FormResponseValueCreateWithoutFieldInput, FormResponseValueUncheckedCreateWithoutFieldInput> | FormResponseValueCreateWithoutFieldInput[] | FormResponseValueUncheckedCreateWithoutFieldInput[]
    connectOrCreate?: FormResponseValueCreateOrConnectWithoutFieldInput | FormResponseValueCreateOrConnectWithoutFieldInput[]
    createMany?: FormResponseValueCreateManyFieldInputEnvelope
    connect?: FormResponseValueWhereUniqueInput | FormResponseValueWhereUniqueInput[]
  }

  export type FormFieldOptionUncheckedCreateNestedManyWithoutFieldInput = {
    create?: XOR<FormFieldOptionCreateWithoutFieldInput, FormFieldOptionUncheckedCreateWithoutFieldInput> | FormFieldOptionCreateWithoutFieldInput[] | FormFieldOptionUncheckedCreateWithoutFieldInput[]
    connectOrCreate?: FormFieldOptionCreateOrConnectWithoutFieldInput | FormFieldOptionCreateOrConnectWithoutFieldInput[]
    createMany?: FormFieldOptionCreateManyFieldInputEnvelope
    connect?: FormFieldOptionWhereUniqueInput | FormFieldOptionWhereUniqueInput[]
  }

  export type FormFieldTableSourceUncheckedCreateNestedOneWithoutFieldInput = {
    create?: XOR<FormFieldTableSourceCreateWithoutFieldInput, FormFieldTableSourceUncheckedCreateWithoutFieldInput>
    connectOrCreate?: FormFieldTableSourceCreateOrConnectWithoutFieldInput
    connect?: FormFieldTableSourceWhereUniqueInput
  }

  export type FormResponseValueUncheckedCreateNestedManyWithoutFieldInput = {
    create?: XOR<FormResponseValueCreateWithoutFieldInput, FormResponseValueUncheckedCreateWithoutFieldInput> | FormResponseValueCreateWithoutFieldInput[] | FormResponseValueUncheckedCreateWithoutFieldInput[]
    connectOrCreate?: FormResponseValueCreateOrConnectWithoutFieldInput | FormResponseValueCreateOrConnectWithoutFieldInput[]
    createMany?: FormResponseValueCreateManyFieldInputEnvelope
    connect?: FormResponseValueWhereUniqueInput | FormResponseValueWhereUniqueInput[]
  }

  export type EnumFieldTypeFieldUpdateOperationsInput = {
    set?: $Enums.FieldType
  }

  export type EnumFieldModeFieldUpdateOperationsInput = {
    set?: $Enums.FieldMode
  }

  export type FormUpdateOneRequiredWithoutFieldsNestedInput = {
    create?: XOR<FormCreateWithoutFieldsInput, FormUncheckedCreateWithoutFieldsInput>
    connectOrCreate?: FormCreateOrConnectWithoutFieldsInput
    upsert?: FormUpsertWithoutFieldsInput
    connect?: FormWhereUniqueInput
    update?: XOR<XOR<FormUpdateToOneWithWhereWithoutFieldsInput, FormUpdateWithoutFieldsInput>, FormUncheckedUpdateWithoutFieldsInput>
  }

  export type FormFieldOptionUpdateManyWithoutFieldNestedInput = {
    create?: XOR<FormFieldOptionCreateWithoutFieldInput, FormFieldOptionUncheckedCreateWithoutFieldInput> | FormFieldOptionCreateWithoutFieldInput[] | FormFieldOptionUncheckedCreateWithoutFieldInput[]
    connectOrCreate?: FormFieldOptionCreateOrConnectWithoutFieldInput | FormFieldOptionCreateOrConnectWithoutFieldInput[]
    upsert?: FormFieldOptionUpsertWithWhereUniqueWithoutFieldInput | FormFieldOptionUpsertWithWhereUniqueWithoutFieldInput[]
    createMany?: FormFieldOptionCreateManyFieldInputEnvelope
    set?: FormFieldOptionWhereUniqueInput | FormFieldOptionWhereUniqueInput[]
    disconnect?: FormFieldOptionWhereUniqueInput | FormFieldOptionWhereUniqueInput[]
    delete?: FormFieldOptionWhereUniqueInput | FormFieldOptionWhereUniqueInput[]
    connect?: FormFieldOptionWhereUniqueInput | FormFieldOptionWhereUniqueInput[]
    update?: FormFieldOptionUpdateWithWhereUniqueWithoutFieldInput | FormFieldOptionUpdateWithWhereUniqueWithoutFieldInput[]
    updateMany?: FormFieldOptionUpdateManyWithWhereWithoutFieldInput | FormFieldOptionUpdateManyWithWhereWithoutFieldInput[]
    deleteMany?: FormFieldOptionScalarWhereInput | FormFieldOptionScalarWhereInput[]
  }

  export type FormFieldTableSourceUpdateOneWithoutFieldNestedInput = {
    create?: XOR<FormFieldTableSourceCreateWithoutFieldInput, FormFieldTableSourceUncheckedCreateWithoutFieldInput>
    connectOrCreate?: FormFieldTableSourceCreateOrConnectWithoutFieldInput
    upsert?: FormFieldTableSourceUpsertWithoutFieldInput
    disconnect?: FormFieldTableSourceWhereInput | boolean
    delete?: FormFieldTableSourceWhereInput | boolean
    connect?: FormFieldTableSourceWhereUniqueInput
    update?: XOR<XOR<FormFieldTableSourceUpdateToOneWithWhereWithoutFieldInput, FormFieldTableSourceUpdateWithoutFieldInput>, FormFieldTableSourceUncheckedUpdateWithoutFieldInput>
  }

  export type FormResponseValueUpdateManyWithoutFieldNestedInput = {
    create?: XOR<FormResponseValueCreateWithoutFieldInput, FormResponseValueUncheckedCreateWithoutFieldInput> | FormResponseValueCreateWithoutFieldInput[] | FormResponseValueUncheckedCreateWithoutFieldInput[]
    connectOrCreate?: FormResponseValueCreateOrConnectWithoutFieldInput | FormResponseValueCreateOrConnectWithoutFieldInput[]
    upsert?: FormResponseValueUpsertWithWhereUniqueWithoutFieldInput | FormResponseValueUpsertWithWhereUniqueWithoutFieldInput[]
    createMany?: FormResponseValueCreateManyFieldInputEnvelope
    set?: FormResponseValueWhereUniqueInput | FormResponseValueWhereUniqueInput[]
    disconnect?: FormResponseValueWhereUniqueInput | FormResponseValueWhereUniqueInput[]
    delete?: FormResponseValueWhereUniqueInput | FormResponseValueWhereUniqueInput[]
    connect?: FormResponseValueWhereUniqueInput | FormResponseValueWhereUniqueInput[]
    update?: FormResponseValueUpdateWithWhereUniqueWithoutFieldInput | FormResponseValueUpdateWithWhereUniqueWithoutFieldInput[]
    updateMany?: FormResponseValueUpdateManyWithWhereWithoutFieldInput | FormResponseValueUpdateManyWithWhereWithoutFieldInput[]
    deleteMany?: FormResponseValueScalarWhereInput | FormResponseValueScalarWhereInput[]
  }

  export type FormFieldOptionUncheckedUpdateManyWithoutFieldNestedInput = {
    create?: XOR<FormFieldOptionCreateWithoutFieldInput, FormFieldOptionUncheckedCreateWithoutFieldInput> | FormFieldOptionCreateWithoutFieldInput[] | FormFieldOptionUncheckedCreateWithoutFieldInput[]
    connectOrCreate?: FormFieldOptionCreateOrConnectWithoutFieldInput | FormFieldOptionCreateOrConnectWithoutFieldInput[]
    upsert?: FormFieldOptionUpsertWithWhereUniqueWithoutFieldInput | FormFieldOptionUpsertWithWhereUniqueWithoutFieldInput[]
    createMany?: FormFieldOptionCreateManyFieldInputEnvelope
    set?: FormFieldOptionWhereUniqueInput | FormFieldOptionWhereUniqueInput[]
    disconnect?: FormFieldOptionWhereUniqueInput | FormFieldOptionWhereUniqueInput[]
    delete?: FormFieldOptionWhereUniqueInput | FormFieldOptionWhereUniqueInput[]
    connect?: FormFieldOptionWhereUniqueInput | FormFieldOptionWhereUniqueInput[]
    update?: FormFieldOptionUpdateWithWhereUniqueWithoutFieldInput | FormFieldOptionUpdateWithWhereUniqueWithoutFieldInput[]
    updateMany?: FormFieldOptionUpdateManyWithWhereWithoutFieldInput | FormFieldOptionUpdateManyWithWhereWithoutFieldInput[]
    deleteMany?: FormFieldOptionScalarWhereInput | FormFieldOptionScalarWhereInput[]
  }

  export type FormFieldTableSourceUncheckedUpdateOneWithoutFieldNestedInput = {
    create?: XOR<FormFieldTableSourceCreateWithoutFieldInput, FormFieldTableSourceUncheckedCreateWithoutFieldInput>
    connectOrCreate?: FormFieldTableSourceCreateOrConnectWithoutFieldInput
    upsert?: FormFieldTableSourceUpsertWithoutFieldInput
    disconnect?: FormFieldTableSourceWhereInput | boolean
    delete?: FormFieldTableSourceWhereInput | boolean
    connect?: FormFieldTableSourceWhereUniqueInput
    update?: XOR<XOR<FormFieldTableSourceUpdateToOneWithWhereWithoutFieldInput, FormFieldTableSourceUpdateWithoutFieldInput>, FormFieldTableSourceUncheckedUpdateWithoutFieldInput>
  }

  export type FormResponseValueUncheckedUpdateManyWithoutFieldNestedInput = {
    create?: XOR<FormResponseValueCreateWithoutFieldInput, FormResponseValueUncheckedCreateWithoutFieldInput> | FormResponseValueCreateWithoutFieldInput[] | FormResponseValueUncheckedCreateWithoutFieldInput[]
    connectOrCreate?: FormResponseValueCreateOrConnectWithoutFieldInput | FormResponseValueCreateOrConnectWithoutFieldInput[]
    upsert?: FormResponseValueUpsertWithWhereUniqueWithoutFieldInput | FormResponseValueUpsertWithWhereUniqueWithoutFieldInput[]
    createMany?: FormResponseValueCreateManyFieldInputEnvelope
    set?: FormResponseValueWhereUniqueInput | FormResponseValueWhereUniqueInput[]
    disconnect?: FormResponseValueWhereUniqueInput | FormResponseValueWhereUniqueInput[]
    delete?: FormResponseValueWhereUniqueInput | FormResponseValueWhereUniqueInput[]
    connect?: FormResponseValueWhereUniqueInput | FormResponseValueWhereUniqueInput[]
    update?: FormResponseValueUpdateWithWhereUniqueWithoutFieldInput | FormResponseValueUpdateWithWhereUniqueWithoutFieldInput[]
    updateMany?: FormResponseValueUpdateManyWithWhereWithoutFieldInput | FormResponseValueUpdateManyWithWhereWithoutFieldInput[]
    deleteMany?: FormResponseValueScalarWhereInput | FormResponseValueScalarWhereInput[]
  }

  export type FormFieldCreateNestedOneWithoutOptionsInput = {
    create?: XOR<FormFieldCreateWithoutOptionsInput, FormFieldUncheckedCreateWithoutOptionsInput>
    connectOrCreate?: FormFieldCreateOrConnectWithoutOptionsInput
    connect?: FormFieldWhereUniqueInput
  }

  export type FormFieldUpdateOneRequiredWithoutOptionsNestedInput = {
    create?: XOR<FormFieldCreateWithoutOptionsInput, FormFieldUncheckedCreateWithoutOptionsInput>
    connectOrCreate?: FormFieldCreateOrConnectWithoutOptionsInput
    upsert?: FormFieldUpsertWithoutOptionsInput
    connect?: FormFieldWhereUniqueInput
    update?: XOR<XOR<FormFieldUpdateToOneWithWhereWithoutOptionsInput, FormFieldUpdateWithoutOptionsInput>, FormFieldUncheckedUpdateWithoutOptionsInput>
  }

  export type FormFieldCreateNestedOneWithoutTableSourceInput = {
    create?: XOR<FormFieldCreateWithoutTableSourceInput, FormFieldUncheckedCreateWithoutTableSourceInput>
    connectOrCreate?: FormFieldCreateOrConnectWithoutTableSourceInput
    connect?: FormFieldWhereUniqueInput
  }

  export type FormFieldUpdateOneRequiredWithoutTableSourceNestedInput = {
    create?: XOR<FormFieldCreateWithoutTableSourceInput, FormFieldUncheckedCreateWithoutTableSourceInput>
    connectOrCreate?: FormFieldCreateOrConnectWithoutTableSourceInput
    upsert?: FormFieldUpsertWithoutTableSourceInput
    connect?: FormFieldWhereUniqueInput
    update?: XOR<XOR<FormFieldUpdateToOneWithWhereWithoutTableSourceInput, FormFieldUpdateWithoutTableSourceInput>, FormFieldUncheckedUpdateWithoutTableSourceInput>
  }

  export type FormCreateNestedOneWithoutResponsesInput = {
    create?: XOR<FormCreateWithoutResponsesInput, FormUncheckedCreateWithoutResponsesInput>
    connectOrCreate?: FormCreateOrConnectWithoutResponsesInput
    connect?: FormWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutResponsesInput = {
    create?: XOR<UserCreateWithoutResponsesInput, UserUncheckedCreateWithoutResponsesInput>
    connectOrCreate?: UserCreateOrConnectWithoutResponsesInput
    connect?: UserWhereUniqueInput
  }

  export type FormResponseValueCreateNestedManyWithoutResponseInput = {
    create?: XOR<FormResponseValueCreateWithoutResponseInput, FormResponseValueUncheckedCreateWithoutResponseInput> | FormResponseValueCreateWithoutResponseInput[] | FormResponseValueUncheckedCreateWithoutResponseInput[]
    connectOrCreate?: FormResponseValueCreateOrConnectWithoutResponseInput | FormResponseValueCreateOrConnectWithoutResponseInput[]
    createMany?: FormResponseValueCreateManyResponseInputEnvelope
    connect?: FormResponseValueWhereUniqueInput | FormResponseValueWhereUniqueInput[]
  }

  export type FormResponseValueUncheckedCreateNestedManyWithoutResponseInput = {
    create?: XOR<FormResponseValueCreateWithoutResponseInput, FormResponseValueUncheckedCreateWithoutResponseInput> | FormResponseValueCreateWithoutResponseInput[] | FormResponseValueUncheckedCreateWithoutResponseInput[]
    connectOrCreate?: FormResponseValueCreateOrConnectWithoutResponseInput | FormResponseValueCreateOrConnectWithoutResponseInput[]
    createMany?: FormResponseValueCreateManyResponseInputEnvelope
    connect?: FormResponseValueWhereUniqueInput | FormResponseValueWhereUniqueInput[]
  }

  export type EnumResponseStatusFieldUpdateOperationsInput = {
    set?: $Enums.ResponseStatus
  }

  export type FormUpdateOneRequiredWithoutResponsesNestedInput = {
    create?: XOR<FormCreateWithoutResponsesInput, FormUncheckedCreateWithoutResponsesInput>
    connectOrCreate?: FormCreateOrConnectWithoutResponsesInput
    upsert?: FormUpsertWithoutResponsesInput
    connect?: FormWhereUniqueInput
    update?: XOR<XOR<FormUpdateToOneWithWhereWithoutResponsesInput, FormUpdateWithoutResponsesInput>, FormUncheckedUpdateWithoutResponsesInput>
  }

  export type UserUpdateOneWithoutResponsesNestedInput = {
    create?: XOR<UserCreateWithoutResponsesInput, UserUncheckedCreateWithoutResponsesInput>
    connectOrCreate?: UserCreateOrConnectWithoutResponsesInput
    upsert?: UserUpsertWithoutResponsesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutResponsesInput, UserUpdateWithoutResponsesInput>, UserUncheckedUpdateWithoutResponsesInput>
  }

  export type FormResponseValueUpdateManyWithoutResponseNestedInput = {
    create?: XOR<FormResponseValueCreateWithoutResponseInput, FormResponseValueUncheckedCreateWithoutResponseInput> | FormResponseValueCreateWithoutResponseInput[] | FormResponseValueUncheckedCreateWithoutResponseInput[]
    connectOrCreate?: FormResponseValueCreateOrConnectWithoutResponseInput | FormResponseValueCreateOrConnectWithoutResponseInput[]
    upsert?: FormResponseValueUpsertWithWhereUniqueWithoutResponseInput | FormResponseValueUpsertWithWhereUniqueWithoutResponseInput[]
    createMany?: FormResponseValueCreateManyResponseInputEnvelope
    set?: FormResponseValueWhereUniqueInput | FormResponseValueWhereUniqueInput[]
    disconnect?: FormResponseValueWhereUniqueInput | FormResponseValueWhereUniqueInput[]
    delete?: FormResponseValueWhereUniqueInput | FormResponseValueWhereUniqueInput[]
    connect?: FormResponseValueWhereUniqueInput | FormResponseValueWhereUniqueInput[]
    update?: FormResponseValueUpdateWithWhereUniqueWithoutResponseInput | FormResponseValueUpdateWithWhereUniqueWithoutResponseInput[]
    updateMany?: FormResponseValueUpdateManyWithWhereWithoutResponseInput | FormResponseValueUpdateManyWithWhereWithoutResponseInput[]
    deleteMany?: FormResponseValueScalarWhereInput | FormResponseValueScalarWhereInput[]
  }

  export type FormResponseValueUncheckedUpdateManyWithoutResponseNestedInput = {
    create?: XOR<FormResponseValueCreateWithoutResponseInput, FormResponseValueUncheckedCreateWithoutResponseInput> | FormResponseValueCreateWithoutResponseInput[] | FormResponseValueUncheckedCreateWithoutResponseInput[]
    connectOrCreate?: FormResponseValueCreateOrConnectWithoutResponseInput | FormResponseValueCreateOrConnectWithoutResponseInput[]
    upsert?: FormResponseValueUpsertWithWhereUniqueWithoutResponseInput | FormResponseValueUpsertWithWhereUniqueWithoutResponseInput[]
    createMany?: FormResponseValueCreateManyResponseInputEnvelope
    set?: FormResponseValueWhereUniqueInput | FormResponseValueWhereUniqueInput[]
    disconnect?: FormResponseValueWhereUniqueInput | FormResponseValueWhereUniqueInput[]
    delete?: FormResponseValueWhereUniqueInput | FormResponseValueWhereUniqueInput[]
    connect?: FormResponseValueWhereUniqueInput | FormResponseValueWhereUniqueInput[]
    update?: FormResponseValueUpdateWithWhereUniqueWithoutResponseInput | FormResponseValueUpdateWithWhereUniqueWithoutResponseInput[]
    updateMany?: FormResponseValueUpdateManyWithWhereWithoutResponseInput | FormResponseValueUpdateManyWithWhereWithoutResponseInput[]
    deleteMany?: FormResponseValueScalarWhereInput | FormResponseValueScalarWhereInput[]
  }

  export type FormResponseCreateNestedOneWithoutValuesInput = {
    create?: XOR<FormResponseCreateWithoutValuesInput, FormResponseUncheckedCreateWithoutValuesInput>
    connectOrCreate?: FormResponseCreateOrConnectWithoutValuesInput
    connect?: FormResponseWhereUniqueInput
  }

  export type FormFieldCreateNestedOneWithoutValuesInput = {
    create?: XOR<FormFieldCreateWithoutValuesInput, FormFieldUncheckedCreateWithoutValuesInput>
    connectOrCreate?: FormFieldCreateOrConnectWithoutValuesInput
    connect?: FormFieldWhereUniqueInput
  }

  export type FormResponseUpdateOneRequiredWithoutValuesNestedInput = {
    create?: XOR<FormResponseCreateWithoutValuesInput, FormResponseUncheckedCreateWithoutValuesInput>
    connectOrCreate?: FormResponseCreateOrConnectWithoutValuesInput
    upsert?: FormResponseUpsertWithoutValuesInput
    connect?: FormResponseWhereUniqueInput
    update?: XOR<XOR<FormResponseUpdateToOneWithWhereWithoutValuesInput, FormResponseUpdateWithoutValuesInput>, FormResponseUncheckedUpdateWithoutValuesInput>
  }

  export type FormFieldUpdateOneRequiredWithoutValuesNestedInput = {
    create?: XOR<FormFieldCreateWithoutValuesInput, FormFieldUncheckedCreateWithoutValuesInput>
    connectOrCreate?: FormFieldCreateOrConnectWithoutValuesInput
    upsert?: FormFieldUpsertWithoutValuesInput
    connect?: FormFieldWhereUniqueInput
    update?: XOR<XOR<FormFieldUpdateToOneWithWhereWithoutValuesInput, FormFieldUpdateWithoutValuesInput>, FormFieldUncheckedUpdateWithoutValuesInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
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

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumAccessTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AccessType | EnumAccessTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AccessType[]
    notIn?: $Enums.AccessType[]
    not?: NestedEnumAccessTypeFilter<$PrismaModel> | $Enums.AccessType
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumAccessTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AccessType | EnumAccessTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AccessType[]
    notIn?: $Enums.AccessType[]
    not?: NestedEnumAccessTypeWithAggregatesFilter<$PrismaModel> | $Enums.AccessType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAccessTypeFilter<$PrismaModel>
    _max?: NestedEnumAccessTypeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumFieldTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.FieldType | EnumFieldTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FieldType[]
    notIn?: $Enums.FieldType[]
    not?: NestedEnumFieldTypeFilter<$PrismaModel> | $Enums.FieldType
  }

  export type NestedEnumFieldModeFilter<$PrismaModel = never> = {
    equals?: $Enums.FieldMode | EnumFieldModeFieldRefInput<$PrismaModel>
    in?: $Enums.FieldMode[]
    notIn?: $Enums.FieldMode[]
    not?: NestedEnumFieldModeFilter<$PrismaModel> | $Enums.FieldMode
  }

  export type NestedEnumFieldTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FieldType | EnumFieldTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FieldType[]
    notIn?: $Enums.FieldType[]
    not?: NestedEnumFieldTypeWithAggregatesFilter<$PrismaModel> | $Enums.FieldType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFieldTypeFilter<$PrismaModel>
    _max?: NestedEnumFieldTypeFilter<$PrismaModel>
  }

  export type NestedEnumFieldModeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FieldMode | EnumFieldModeFieldRefInput<$PrismaModel>
    in?: $Enums.FieldMode[]
    notIn?: $Enums.FieldMode[]
    not?: NestedEnumFieldModeWithAggregatesFilter<$PrismaModel> | $Enums.FieldMode
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFieldModeFilter<$PrismaModel>
    _max?: NestedEnumFieldModeFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumResponseStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ResponseStatus | EnumResponseStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ResponseStatus[]
    notIn?: $Enums.ResponseStatus[]
    not?: NestedEnumResponseStatusFilter<$PrismaModel> | $Enums.ResponseStatus
  }

  export type NestedEnumResponseStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ResponseStatus | EnumResponseStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ResponseStatus[]
    notIn?: $Enums.ResponseStatus[]
    not?: NestedEnumResponseStatusWithAggregatesFilter<$PrismaModel> | $Enums.ResponseStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumResponseStatusFilter<$PrismaModel>
    _max?: NestedEnumResponseStatusFilter<$PrismaModel>
  }

  export type RoleCreateWithoutDefaultForUsersInput = {
    name: string
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    policies?: RolePolicyCreateNestedManyWithoutRoleInput
    users?: UserRoleCreateNestedManyWithoutRoleInput
  }

  export type RoleUncheckedCreateWithoutDefaultForUsersInput = {
    id?: number
    name: string
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    policies?: RolePolicyUncheckedCreateNestedManyWithoutRoleInput
    users?: UserRoleUncheckedCreateNestedManyWithoutRoleInput
  }

  export type RoleCreateOrConnectWithoutDefaultForUsersInput = {
    where: RoleWhereUniqueInput
    create: XOR<RoleCreateWithoutDefaultForUsersInput, RoleUncheckedCreateWithoutDefaultForUsersInput>
  }

  export type UserRoleCreateWithoutUserInput = {
    created_at?: Date | string
    updated_at?: Date | string
    role: RoleCreateNestedOneWithoutUsersInput
  }

  export type UserRoleUncheckedCreateWithoutUserInput = {
    id?: number
    role_id: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type UserRoleCreateOrConnectWithoutUserInput = {
    where: UserRoleWhereUniqueInput
    create: XOR<UserRoleCreateWithoutUserInput, UserRoleUncheckedCreateWithoutUserInput>
  }

  export type UserRoleCreateManyUserInputEnvelope = {
    data: UserRoleCreateManyUserInput | UserRoleCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type GroupUserCreateWithoutUserInput = {
    created_at?: Date | string
    updated_at?: Date | string
    group: GroupCreateNestedOneWithoutUsersInput
  }

  export type GroupUserUncheckedCreateWithoutUserInput = {
    id?: number
    group_id: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type GroupUserCreateOrConnectWithoutUserInput = {
    where: GroupUserWhereUniqueInput
    create: XOR<GroupUserCreateWithoutUserInput, GroupUserUncheckedCreateWithoutUserInput>
  }

  export type GroupUserCreateManyUserInputEnvelope = {
    data: GroupUserCreateManyUserInput | GroupUserCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type FormCreateWithoutCreatorInput = {
    name: string
    description?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    access?: FormAccessCreateNestedManyWithoutFormInput
    fields?: FormFieldCreateNestedManyWithoutFormInput
    responses?: FormResponseCreateNestedManyWithoutFormInput
  }

  export type FormUncheckedCreateWithoutCreatorInput = {
    id?: number
    name: string
    description?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    access?: FormAccessUncheckedCreateNestedManyWithoutFormInput
    fields?: FormFieldUncheckedCreateNestedManyWithoutFormInput
    responses?: FormResponseUncheckedCreateNestedManyWithoutFormInput
  }

  export type FormCreateOrConnectWithoutCreatorInput = {
    where: FormWhereUniqueInput
    create: XOR<FormCreateWithoutCreatorInput, FormUncheckedCreateWithoutCreatorInput>
  }

  export type FormCreateManyCreatorInputEnvelope = {
    data: FormCreateManyCreatorInput | FormCreateManyCreatorInput[]
    skipDuplicates?: boolean
  }

  export type FormResponseCreateWithoutUserInput = {
    total_score?: number
    status?: $Enums.ResponseStatus
    created_at?: Date | string
    updated_at?: Date | string
    form: FormCreateNestedOneWithoutResponsesInput
    values?: FormResponseValueCreateNestedManyWithoutResponseInput
  }

  export type FormResponseUncheckedCreateWithoutUserInput = {
    id?: number
    form_id: number
    total_score?: number
    status?: $Enums.ResponseStatus
    created_at?: Date | string
    updated_at?: Date | string
    values?: FormResponseValueUncheckedCreateNestedManyWithoutResponseInput
  }

  export type FormResponseCreateOrConnectWithoutUserInput = {
    where: FormResponseWhereUniqueInput
    create: XOR<FormResponseCreateWithoutUserInput, FormResponseUncheckedCreateWithoutUserInput>
  }

  export type FormResponseCreateManyUserInputEnvelope = {
    data: FormResponseCreateManyUserInput | FormResponseCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type RoleUpsertWithoutDefaultForUsersInput = {
    update: XOR<RoleUpdateWithoutDefaultForUsersInput, RoleUncheckedUpdateWithoutDefaultForUsersInput>
    create: XOR<RoleCreateWithoutDefaultForUsersInput, RoleUncheckedCreateWithoutDefaultForUsersInput>
    where?: RoleWhereInput
  }

  export type RoleUpdateToOneWithWhereWithoutDefaultForUsersInput = {
    where?: RoleWhereInput
    data: XOR<RoleUpdateWithoutDefaultForUsersInput, RoleUncheckedUpdateWithoutDefaultForUsersInput>
  }

  export type RoleUpdateWithoutDefaultForUsersInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    policies?: RolePolicyUpdateManyWithoutRoleNestedInput
    users?: UserRoleUpdateManyWithoutRoleNestedInput
  }

  export type RoleUncheckedUpdateWithoutDefaultForUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    policies?: RolePolicyUncheckedUpdateManyWithoutRoleNestedInput
    users?: UserRoleUncheckedUpdateManyWithoutRoleNestedInput
  }

  export type UserRoleUpsertWithWhereUniqueWithoutUserInput = {
    where: UserRoleWhereUniqueInput
    update: XOR<UserRoleUpdateWithoutUserInput, UserRoleUncheckedUpdateWithoutUserInput>
    create: XOR<UserRoleCreateWithoutUserInput, UserRoleUncheckedCreateWithoutUserInput>
  }

  export type UserRoleUpdateWithWhereUniqueWithoutUserInput = {
    where: UserRoleWhereUniqueInput
    data: XOR<UserRoleUpdateWithoutUserInput, UserRoleUncheckedUpdateWithoutUserInput>
  }

  export type UserRoleUpdateManyWithWhereWithoutUserInput = {
    where: UserRoleScalarWhereInput
    data: XOR<UserRoleUpdateManyMutationInput, UserRoleUncheckedUpdateManyWithoutUserInput>
  }

  export type UserRoleScalarWhereInput = {
    AND?: UserRoleScalarWhereInput | UserRoleScalarWhereInput[]
    OR?: UserRoleScalarWhereInput[]
    NOT?: UserRoleScalarWhereInput | UserRoleScalarWhereInput[]
    id?: IntFilter<"UserRole"> | number
    user_id?: IntFilter<"UserRole"> | number
    role_id?: IntFilter<"UserRole"> | number
    created_at?: DateTimeFilter<"UserRole"> | Date | string
    updated_at?: DateTimeFilter<"UserRole"> | Date | string
  }

  export type GroupUserUpsertWithWhereUniqueWithoutUserInput = {
    where: GroupUserWhereUniqueInput
    update: XOR<GroupUserUpdateWithoutUserInput, GroupUserUncheckedUpdateWithoutUserInput>
    create: XOR<GroupUserCreateWithoutUserInput, GroupUserUncheckedCreateWithoutUserInput>
  }

  export type GroupUserUpdateWithWhereUniqueWithoutUserInput = {
    where: GroupUserWhereUniqueInput
    data: XOR<GroupUserUpdateWithoutUserInput, GroupUserUncheckedUpdateWithoutUserInput>
  }

  export type GroupUserUpdateManyWithWhereWithoutUserInput = {
    where: GroupUserScalarWhereInput
    data: XOR<GroupUserUpdateManyMutationInput, GroupUserUncheckedUpdateManyWithoutUserInput>
  }

  export type GroupUserScalarWhereInput = {
    AND?: GroupUserScalarWhereInput | GroupUserScalarWhereInput[]
    OR?: GroupUserScalarWhereInput[]
    NOT?: GroupUserScalarWhereInput | GroupUserScalarWhereInput[]
    id?: IntFilter<"GroupUser"> | number
    group_id?: IntFilter<"GroupUser"> | number
    user_id?: IntFilter<"GroupUser"> | number
    created_at?: DateTimeFilter<"GroupUser"> | Date | string
    updated_at?: DateTimeFilter<"GroupUser"> | Date | string
  }

  export type FormUpsertWithWhereUniqueWithoutCreatorInput = {
    where: FormWhereUniqueInput
    update: XOR<FormUpdateWithoutCreatorInput, FormUncheckedUpdateWithoutCreatorInput>
    create: XOR<FormCreateWithoutCreatorInput, FormUncheckedCreateWithoutCreatorInput>
  }

  export type FormUpdateWithWhereUniqueWithoutCreatorInput = {
    where: FormWhereUniqueInput
    data: XOR<FormUpdateWithoutCreatorInput, FormUncheckedUpdateWithoutCreatorInput>
  }

  export type FormUpdateManyWithWhereWithoutCreatorInput = {
    where: FormScalarWhereInput
    data: XOR<FormUpdateManyMutationInput, FormUncheckedUpdateManyWithoutCreatorInput>
  }

  export type FormScalarWhereInput = {
    AND?: FormScalarWhereInput | FormScalarWhereInput[]
    OR?: FormScalarWhereInput[]
    NOT?: FormScalarWhereInput | FormScalarWhereInput[]
    id?: IntFilter<"Form"> | number
    name?: StringFilter<"Form"> | string
    description?: StringNullableFilter<"Form"> | string | null
    created_by?: IntNullableFilter<"Form"> | number | null
    is_active?: BoolFilter<"Form"> | boolean
    created_at?: DateTimeFilter<"Form"> | Date | string
    updated_at?: DateTimeFilter<"Form"> | Date | string
  }

  export type FormResponseUpsertWithWhereUniqueWithoutUserInput = {
    where: FormResponseWhereUniqueInput
    update: XOR<FormResponseUpdateWithoutUserInput, FormResponseUncheckedUpdateWithoutUserInput>
    create: XOR<FormResponseCreateWithoutUserInput, FormResponseUncheckedCreateWithoutUserInput>
  }

  export type FormResponseUpdateWithWhereUniqueWithoutUserInput = {
    where: FormResponseWhereUniqueInput
    data: XOR<FormResponseUpdateWithoutUserInput, FormResponseUncheckedUpdateWithoutUserInput>
  }

  export type FormResponseUpdateManyWithWhereWithoutUserInput = {
    where: FormResponseScalarWhereInput
    data: XOR<FormResponseUpdateManyMutationInput, FormResponseUncheckedUpdateManyWithoutUserInput>
  }

  export type FormResponseScalarWhereInput = {
    AND?: FormResponseScalarWhereInput | FormResponseScalarWhereInput[]
    OR?: FormResponseScalarWhereInput[]
    NOT?: FormResponseScalarWhereInput | FormResponseScalarWhereInput[]
    id?: IntFilter<"FormResponse"> | number
    form_id?: IntFilter<"FormResponse"> | number
    user_id?: IntNullableFilter<"FormResponse"> | number | null
    total_score?: IntFilter<"FormResponse"> | number
    status?: EnumResponseStatusFilter<"FormResponse"> | $Enums.ResponseStatus
    created_at?: DateTimeFilter<"FormResponse"> | Date | string
    updated_at?: DateTimeFilter<"FormResponse"> | Date | string
  }

  export type RolePolicyCreateWithoutRoleInput = {
    created_at?: Date | string
    updated_at?: Date | string
    policy: PolicyCreateNestedOneWithoutRolesInput
  }

  export type RolePolicyUncheckedCreateWithoutRoleInput = {
    id?: number
    policy_id: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type RolePolicyCreateOrConnectWithoutRoleInput = {
    where: RolePolicyWhereUniqueInput
    create: XOR<RolePolicyCreateWithoutRoleInput, RolePolicyUncheckedCreateWithoutRoleInput>
  }

  export type RolePolicyCreateManyRoleInputEnvelope = {
    data: RolePolicyCreateManyRoleInput | RolePolicyCreateManyRoleInput[]
    skipDuplicates?: boolean
  }

  export type UserRoleCreateWithoutRoleInput = {
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutRolesInput
  }

  export type UserRoleUncheckedCreateWithoutRoleInput = {
    id?: number
    user_id: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type UserRoleCreateOrConnectWithoutRoleInput = {
    where: UserRoleWhereUniqueInput
    create: XOR<UserRoleCreateWithoutRoleInput, UserRoleUncheckedCreateWithoutRoleInput>
  }

  export type UserRoleCreateManyRoleInputEnvelope = {
    data: UserRoleCreateManyRoleInput | UserRoleCreateManyRoleInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutDefault_roleInput = {
    email?: string | null
    username?: string | null
    first_name?: string | null
    last_name?: string | null
    phone?: string | null
    password?: string | null
    google_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    roles?: UserRoleCreateNestedManyWithoutUserInput
    groups?: GroupUserCreateNestedManyWithoutUserInput
    forms?: FormCreateNestedManyWithoutCreatorInput
    responses?: FormResponseCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutDefault_roleInput = {
    id?: number
    email?: string | null
    username?: string | null
    first_name?: string | null
    last_name?: string | null
    phone?: string | null
    password?: string | null
    google_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    roles?: UserRoleUncheckedCreateNestedManyWithoutUserInput
    groups?: GroupUserUncheckedCreateNestedManyWithoutUserInput
    forms?: FormUncheckedCreateNestedManyWithoutCreatorInput
    responses?: FormResponseUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutDefault_roleInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDefault_roleInput, UserUncheckedCreateWithoutDefault_roleInput>
  }

  export type UserCreateManyDefault_roleInputEnvelope = {
    data: UserCreateManyDefault_roleInput | UserCreateManyDefault_roleInput[]
    skipDuplicates?: boolean
  }

  export type RolePolicyUpsertWithWhereUniqueWithoutRoleInput = {
    where: RolePolicyWhereUniqueInput
    update: XOR<RolePolicyUpdateWithoutRoleInput, RolePolicyUncheckedUpdateWithoutRoleInput>
    create: XOR<RolePolicyCreateWithoutRoleInput, RolePolicyUncheckedCreateWithoutRoleInput>
  }

  export type RolePolicyUpdateWithWhereUniqueWithoutRoleInput = {
    where: RolePolicyWhereUniqueInput
    data: XOR<RolePolicyUpdateWithoutRoleInput, RolePolicyUncheckedUpdateWithoutRoleInput>
  }

  export type RolePolicyUpdateManyWithWhereWithoutRoleInput = {
    where: RolePolicyScalarWhereInput
    data: XOR<RolePolicyUpdateManyMutationInput, RolePolicyUncheckedUpdateManyWithoutRoleInput>
  }

  export type RolePolicyScalarWhereInput = {
    AND?: RolePolicyScalarWhereInput | RolePolicyScalarWhereInput[]
    OR?: RolePolicyScalarWhereInput[]
    NOT?: RolePolicyScalarWhereInput | RolePolicyScalarWhereInput[]
    id?: IntFilter<"RolePolicy"> | number
    role_id?: IntFilter<"RolePolicy"> | number
    policy_id?: IntFilter<"RolePolicy"> | number
    created_at?: DateTimeFilter<"RolePolicy"> | Date | string
    updated_at?: DateTimeFilter<"RolePolicy"> | Date | string
  }

  export type UserRoleUpsertWithWhereUniqueWithoutRoleInput = {
    where: UserRoleWhereUniqueInput
    update: XOR<UserRoleUpdateWithoutRoleInput, UserRoleUncheckedUpdateWithoutRoleInput>
    create: XOR<UserRoleCreateWithoutRoleInput, UserRoleUncheckedCreateWithoutRoleInput>
  }

  export type UserRoleUpdateWithWhereUniqueWithoutRoleInput = {
    where: UserRoleWhereUniqueInput
    data: XOR<UserRoleUpdateWithoutRoleInput, UserRoleUncheckedUpdateWithoutRoleInput>
  }

  export type UserRoleUpdateManyWithWhereWithoutRoleInput = {
    where: UserRoleScalarWhereInput
    data: XOR<UserRoleUpdateManyMutationInput, UserRoleUncheckedUpdateManyWithoutRoleInput>
  }

  export type UserUpsertWithWhereUniqueWithoutDefault_roleInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutDefault_roleInput, UserUncheckedUpdateWithoutDefault_roleInput>
    create: XOR<UserCreateWithoutDefault_roleInput, UserUncheckedCreateWithoutDefault_roleInput>
  }

  export type UserUpdateWithWhereUniqueWithoutDefault_roleInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutDefault_roleInput, UserUncheckedUpdateWithoutDefault_roleInput>
  }

  export type UserUpdateManyWithWhereWithoutDefault_roleInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutDefault_roleInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringNullableFilter<"User"> | string | null
    username?: StringNullableFilter<"User"> | string | null
    first_name?: StringNullableFilter<"User"> | string | null
    last_name?: StringNullableFilter<"User"> | string | null
    phone?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    google_id?: StringNullableFilter<"User"> | string | null
    default_role_id?: IntNullableFilter<"User"> | number | null
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
  }

  export type RolePolicyCreateWithoutPolicyInput = {
    created_at?: Date | string
    updated_at?: Date | string
    role: RoleCreateNestedOneWithoutPoliciesInput
  }

  export type RolePolicyUncheckedCreateWithoutPolicyInput = {
    id?: number
    role_id: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type RolePolicyCreateOrConnectWithoutPolicyInput = {
    where: RolePolicyWhereUniqueInput
    create: XOR<RolePolicyCreateWithoutPolicyInput, RolePolicyUncheckedCreateWithoutPolicyInput>
  }

  export type RolePolicyCreateManyPolicyInputEnvelope = {
    data: RolePolicyCreateManyPolicyInput | RolePolicyCreateManyPolicyInput[]
    skipDuplicates?: boolean
  }

  export type RolePolicyUpsertWithWhereUniqueWithoutPolicyInput = {
    where: RolePolicyWhereUniqueInput
    update: XOR<RolePolicyUpdateWithoutPolicyInput, RolePolicyUncheckedUpdateWithoutPolicyInput>
    create: XOR<RolePolicyCreateWithoutPolicyInput, RolePolicyUncheckedCreateWithoutPolicyInput>
  }

  export type RolePolicyUpdateWithWhereUniqueWithoutPolicyInput = {
    where: RolePolicyWhereUniqueInput
    data: XOR<RolePolicyUpdateWithoutPolicyInput, RolePolicyUncheckedUpdateWithoutPolicyInput>
  }

  export type RolePolicyUpdateManyWithWhereWithoutPolicyInput = {
    where: RolePolicyScalarWhereInput
    data: XOR<RolePolicyUpdateManyMutationInput, RolePolicyUncheckedUpdateManyWithoutPolicyInput>
  }

  export type RoleCreateWithoutPoliciesInput = {
    name: string
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    users?: UserRoleCreateNestedManyWithoutRoleInput
    defaultForUsers?: UserCreateNestedManyWithoutDefault_roleInput
  }

  export type RoleUncheckedCreateWithoutPoliciesInput = {
    id?: number
    name: string
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    users?: UserRoleUncheckedCreateNestedManyWithoutRoleInput
    defaultForUsers?: UserUncheckedCreateNestedManyWithoutDefault_roleInput
  }

  export type RoleCreateOrConnectWithoutPoliciesInput = {
    where: RoleWhereUniqueInput
    create: XOR<RoleCreateWithoutPoliciesInput, RoleUncheckedCreateWithoutPoliciesInput>
  }

  export type PolicyCreateWithoutRolesInput = {
    name: string
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type PolicyUncheckedCreateWithoutRolesInput = {
    id?: number
    name: string
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type PolicyCreateOrConnectWithoutRolesInput = {
    where: PolicyWhereUniqueInput
    create: XOR<PolicyCreateWithoutRolesInput, PolicyUncheckedCreateWithoutRolesInput>
  }

  export type RoleUpsertWithoutPoliciesInput = {
    update: XOR<RoleUpdateWithoutPoliciesInput, RoleUncheckedUpdateWithoutPoliciesInput>
    create: XOR<RoleCreateWithoutPoliciesInput, RoleUncheckedCreateWithoutPoliciesInput>
    where?: RoleWhereInput
  }

  export type RoleUpdateToOneWithWhereWithoutPoliciesInput = {
    where?: RoleWhereInput
    data: XOR<RoleUpdateWithoutPoliciesInput, RoleUncheckedUpdateWithoutPoliciesInput>
  }

  export type RoleUpdateWithoutPoliciesInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserRoleUpdateManyWithoutRoleNestedInput
    defaultForUsers?: UserUpdateManyWithoutDefault_roleNestedInput
  }

  export type RoleUncheckedUpdateWithoutPoliciesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserRoleUncheckedUpdateManyWithoutRoleNestedInput
    defaultForUsers?: UserUncheckedUpdateManyWithoutDefault_roleNestedInput
  }

  export type PolicyUpsertWithoutRolesInput = {
    update: XOR<PolicyUpdateWithoutRolesInput, PolicyUncheckedUpdateWithoutRolesInput>
    create: XOR<PolicyCreateWithoutRolesInput, PolicyUncheckedCreateWithoutRolesInput>
    where?: PolicyWhereInput
  }

  export type PolicyUpdateToOneWithWhereWithoutRolesInput = {
    where?: PolicyWhereInput
    data: XOR<PolicyUpdateWithoutRolesInput, PolicyUncheckedUpdateWithoutRolesInput>
  }

  export type PolicyUpdateWithoutRolesInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PolicyUncheckedUpdateWithoutRolesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutRolesInput = {
    email?: string | null
    username?: string | null
    first_name?: string | null
    last_name?: string | null
    phone?: string | null
    password?: string | null
    google_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    default_role?: RoleCreateNestedOneWithoutDefaultForUsersInput
    groups?: GroupUserCreateNestedManyWithoutUserInput
    forms?: FormCreateNestedManyWithoutCreatorInput
    responses?: FormResponseCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRolesInput = {
    id?: number
    email?: string | null
    username?: string | null
    first_name?: string | null
    last_name?: string | null
    phone?: string | null
    password?: string | null
    google_id?: string | null
    default_role_id?: number | null
    created_at?: Date | string
    updated_at?: Date | string
    groups?: GroupUserUncheckedCreateNestedManyWithoutUserInput
    forms?: FormUncheckedCreateNestedManyWithoutCreatorInput
    responses?: FormResponseUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRolesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRolesInput, UserUncheckedCreateWithoutRolesInput>
  }

  export type RoleCreateWithoutUsersInput = {
    name: string
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    policies?: RolePolicyCreateNestedManyWithoutRoleInput
    defaultForUsers?: UserCreateNestedManyWithoutDefault_roleInput
  }

  export type RoleUncheckedCreateWithoutUsersInput = {
    id?: number
    name: string
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    policies?: RolePolicyUncheckedCreateNestedManyWithoutRoleInput
    defaultForUsers?: UserUncheckedCreateNestedManyWithoutDefault_roleInput
  }

  export type RoleCreateOrConnectWithoutUsersInput = {
    where: RoleWhereUniqueInput
    create: XOR<RoleCreateWithoutUsersInput, RoleUncheckedCreateWithoutUsersInput>
  }

  export type UserUpsertWithoutRolesInput = {
    update: XOR<UserUpdateWithoutRolesInput, UserUncheckedUpdateWithoutRolesInput>
    create: XOR<UserCreateWithoutRolesInput, UserUncheckedCreateWithoutRolesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRolesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRolesInput, UserUncheckedUpdateWithoutRolesInput>
  }

  export type UserUpdateWithoutRolesInput = {
    email?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    default_role?: RoleUpdateOneWithoutDefaultForUsersNestedInput
    groups?: GroupUserUpdateManyWithoutUserNestedInput
    forms?: FormUpdateManyWithoutCreatorNestedInput
    responses?: FormResponseUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRolesInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    default_role_id?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    groups?: GroupUserUncheckedUpdateManyWithoutUserNestedInput
    forms?: FormUncheckedUpdateManyWithoutCreatorNestedInput
    responses?: FormResponseUncheckedUpdateManyWithoutUserNestedInput
  }

  export type RoleUpsertWithoutUsersInput = {
    update: XOR<RoleUpdateWithoutUsersInput, RoleUncheckedUpdateWithoutUsersInput>
    create: XOR<RoleCreateWithoutUsersInput, RoleUncheckedCreateWithoutUsersInput>
    where?: RoleWhereInput
  }

  export type RoleUpdateToOneWithWhereWithoutUsersInput = {
    where?: RoleWhereInput
    data: XOR<RoleUpdateWithoutUsersInput, RoleUncheckedUpdateWithoutUsersInput>
  }

  export type RoleUpdateWithoutUsersInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    policies?: RolePolicyUpdateManyWithoutRoleNestedInput
    defaultForUsers?: UserUpdateManyWithoutDefault_roleNestedInput
  }

  export type RoleUncheckedUpdateWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    policies?: RolePolicyUncheckedUpdateManyWithoutRoleNestedInput
    defaultForUsers?: UserUncheckedUpdateManyWithoutDefault_roleNestedInput
  }

  export type GroupUserCreateWithoutGroupInput = {
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutGroupsInput
  }

  export type GroupUserUncheckedCreateWithoutGroupInput = {
    id?: number
    user_id: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type GroupUserCreateOrConnectWithoutGroupInput = {
    where: GroupUserWhereUniqueInput
    create: XOR<GroupUserCreateWithoutGroupInput, GroupUserUncheckedCreateWithoutGroupInput>
  }

  export type GroupUserCreateManyGroupInputEnvelope = {
    data: GroupUserCreateManyGroupInput | GroupUserCreateManyGroupInput[]
    skipDuplicates?: boolean
  }

  export type GroupUserUpsertWithWhereUniqueWithoutGroupInput = {
    where: GroupUserWhereUniqueInput
    update: XOR<GroupUserUpdateWithoutGroupInput, GroupUserUncheckedUpdateWithoutGroupInput>
    create: XOR<GroupUserCreateWithoutGroupInput, GroupUserUncheckedCreateWithoutGroupInput>
  }

  export type GroupUserUpdateWithWhereUniqueWithoutGroupInput = {
    where: GroupUserWhereUniqueInput
    data: XOR<GroupUserUpdateWithoutGroupInput, GroupUserUncheckedUpdateWithoutGroupInput>
  }

  export type GroupUserUpdateManyWithWhereWithoutGroupInput = {
    where: GroupUserScalarWhereInput
    data: XOR<GroupUserUpdateManyMutationInput, GroupUserUncheckedUpdateManyWithoutGroupInput>
  }

  export type GroupCreateWithoutUsersInput = {
    name: string
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type GroupUncheckedCreateWithoutUsersInput = {
    id?: number
    name: string
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type GroupCreateOrConnectWithoutUsersInput = {
    where: GroupWhereUniqueInput
    create: XOR<GroupCreateWithoutUsersInput, GroupUncheckedCreateWithoutUsersInput>
  }

  export type UserCreateWithoutGroupsInput = {
    email?: string | null
    username?: string | null
    first_name?: string | null
    last_name?: string | null
    phone?: string | null
    password?: string | null
    google_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    default_role?: RoleCreateNestedOneWithoutDefaultForUsersInput
    roles?: UserRoleCreateNestedManyWithoutUserInput
    forms?: FormCreateNestedManyWithoutCreatorInput
    responses?: FormResponseCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutGroupsInput = {
    id?: number
    email?: string | null
    username?: string | null
    first_name?: string | null
    last_name?: string | null
    phone?: string | null
    password?: string | null
    google_id?: string | null
    default_role_id?: number | null
    created_at?: Date | string
    updated_at?: Date | string
    roles?: UserRoleUncheckedCreateNestedManyWithoutUserInput
    forms?: FormUncheckedCreateNestedManyWithoutCreatorInput
    responses?: FormResponseUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutGroupsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutGroupsInput, UserUncheckedCreateWithoutGroupsInput>
  }

  export type GroupUpsertWithoutUsersInput = {
    update: XOR<GroupUpdateWithoutUsersInput, GroupUncheckedUpdateWithoutUsersInput>
    create: XOR<GroupCreateWithoutUsersInput, GroupUncheckedCreateWithoutUsersInput>
    where?: GroupWhereInput
  }

  export type GroupUpdateToOneWithWhereWithoutUsersInput = {
    where?: GroupWhereInput
    data: XOR<GroupUpdateWithoutUsersInput, GroupUncheckedUpdateWithoutUsersInput>
  }

  export type GroupUpdateWithoutUsersInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupUncheckedUpdateWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutGroupsInput = {
    update: XOR<UserUpdateWithoutGroupsInput, UserUncheckedUpdateWithoutGroupsInput>
    create: XOR<UserCreateWithoutGroupsInput, UserUncheckedCreateWithoutGroupsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutGroupsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutGroupsInput, UserUncheckedUpdateWithoutGroupsInput>
  }

  export type UserUpdateWithoutGroupsInput = {
    email?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    default_role?: RoleUpdateOneWithoutDefaultForUsersNestedInput
    roles?: UserRoleUpdateManyWithoutUserNestedInput
    forms?: FormUpdateManyWithoutCreatorNestedInput
    responses?: FormResponseUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutGroupsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    default_role_id?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    roles?: UserRoleUncheckedUpdateManyWithoutUserNestedInput
    forms?: FormUncheckedUpdateManyWithoutCreatorNestedInput
    responses?: FormResponseUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutFormsInput = {
    email?: string | null
    username?: string | null
    first_name?: string | null
    last_name?: string | null
    phone?: string | null
    password?: string | null
    google_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    default_role?: RoleCreateNestedOneWithoutDefaultForUsersInput
    roles?: UserRoleCreateNestedManyWithoutUserInput
    groups?: GroupUserCreateNestedManyWithoutUserInput
    responses?: FormResponseCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFormsInput = {
    id?: number
    email?: string | null
    username?: string | null
    first_name?: string | null
    last_name?: string | null
    phone?: string | null
    password?: string | null
    google_id?: string | null
    default_role_id?: number | null
    created_at?: Date | string
    updated_at?: Date | string
    roles?: UserRoleUncheckedCreateNestedManyWithoutUserInput
    groups?: GroupUserUncheckedCreateNestedManyWithoutUserInput
    responses?: FormResponseUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFormsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFormsInput, UserUncheckedCreateWithoutFormsInput>
  }

  export type FormAccessCreateWithoutFormInput = {
    access_type?: $Enums.AccessType
    access_value: string
    expires_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type FormAccessUncheckedCreateWithoutFormInput = {
    id?: number
    access_type?: $Enums.AccessType
    access_value: string
    expires_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type FormAccessCreateOrConnectWithoutFormInput = {
    where: FormAccessWhereUniqueInput
    create: XOR<FormAccessCreateWithoutFormInput, FormAccessUncheckedCreateWithoutFormInput>
  }

  export type FormAccessCreateManyFormInputEnvelope = {
    data: FormAccessCreateManyFormInput | FormAccessCreateManyFormInput[]
    skipDuplicates?: boolean
  }

  export type FormFieldCreateWithoutFormInput = {
    field_key: string
    label: string
    field_type: $Enums.FieldType
    mode?: $Enums.FieldMode
    is_required?: boolean
    field_order?: number
    settings?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    options?: FormFieldOptionCreateNestedManyWithoutFieldInput
    tableSource?: FormFieldTableSourceCreateNestedOneWithoutFieldInput
    values?: FormResponseValueCreateNestedManyWithoutFieldInput
  }

  export type FormFieldUncheckedCreateWithoutFormInput = {
    id?: number
    field_key: string
    label: string
    field_type: $Enums.FieldType
    mode?: $Enums.FieldMode
    is_required?: boolean
    field_order?: number
    settings?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    options?: FormFieldOptionUncheckedCreateNestedManyWithoutFieldInput
    tableSource?: FormFieldTableSourceUncheckedCreateNestedOneWithoutFieldInput
    values?: FormResponseValueUncheckedCreateNestedManyWithoutFieldInput
  }

  export type FormFieldCreateOrConnectWithoutFormInput = {
    where: FormFieldWhereUniqueInput
    create: XOR<FormFieldCreateWithoutFormInput, FormFieldUncheckedCreateWithoutFormInput>
  }

  export type FormFieldCreateManyFormInputEnvelope = {
    data: FormFieldCreateManyFormInput | FormFieldCreateManyFormInput[]
    skipDuplicates?: boolean
  }

  export type FormResponseCreateWithoutFormInput = {
    total_score?: number
    status?: $Enums.ResponseStatus
    created_at?: Date | string
    updated_at?: Date | string
    user?: UserCreateNestedOneWithoutResponsesInput
    values?: FormResponseValueCreateNestedManyWithoutResponseInput
  }

  export type FormResponseUncheckedCreateWithoutFormInput = {
    id?: number
    user_id?: number | null
    total_score?: number
    status?: $Enums.ResponseStatus
    created_at?: Date | string
    updated_at?: Date | string
    values?: FormResponseValueUncheckedCreateNestedManyWithoutResponseInput
  }

  export type FormResponseCreateOrConnectWithoutFormInput = {
    where: FormResponseWhereUniqueInput
    create: XOR<FormResponseCreateWithoutFormInput, FormResponseUncheckedCreateWithoutFormInput>
  }

  export type FormResponseCreateManyFormInputEnvelope = {
    data: FormResponseCreateManyFormInput | FormResponseCreateManyFormInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutFormsInput = {
    update: XOR<UserUpdateWithoutFormsInput, UserUncheckedUpdateWithoutFormsInput>
    create: XOR<UserCreateWithoutFormsInput, UserUncheckedCreateWithoutFormsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFormsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFormsInput, UserUncheckedUpdateWithoutFormsInput>
  }

  export type UserUpdateWithoutFormsInput = {
    email?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    default_role?: RoleUpdateOneWithoutDefaultForUsersNestedInput
    roles?: UserRoleUpdateManyWithoutUserNestedInput
    groups?: GroupUserUpdateManyWithoutUserNestedInput
    responses?: FormResponseUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFormsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    default_role_id?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    roles?: UserRoleUncheckedUpdateManyWithoutUserNestedInput
    groups?: GroupUserUncheckedUpdateManyWithoutUserNestedInput
    responses?: FormResponseUncheckedUpdateManyWithoutUserNestedInput
  }

  export type FormAccessUpsertWithWhereUniqueWithoutFormInput = {
    where: FormAccessWhereUniqueInput
    update: XOR<FormAccessUpdateWithoutFormInput, FormAccessUncheckedUpdateWithoutFormInput>
    create: XOR<FormAccessCreateWithoutFormInput, FormAccessUncheckedCreateWithoutFormInput>
  }

  export type FormAccessUpdateWithWhereUniqueWithoutFormInput = {
    where: FormAccessWhereUniqueInput
    data: XOR<FormAccessUpdateWithoutFormInput, FormAccessUncheckedUpdateWithoutFormInput>
  }

  export type FormAccessUpdateManyWithWhereWithoutFormInput = {
    where: FormAccessScalarWhereInput
    data: XOR<FormAccessUpdateManyMutationInput, FormAccessUncheckedUpdateManyWithoutFormInput>
  }

  export type FormAccessScalarWhereInput = {
    AND?: FormAccessScalarWhereInput | FormAccessScalarWhereInput[]
    OR?: FormAccessScalarWhereInput[]
    NOT?: FormAccessScalarWhereInput | FormAccessScalarWhereInput[]
    id?: IntFilter<"FormAccess"> | number
    form_id?: IntFilter<"FormAccess"> | number
    access_type?: EnumAccessTypeFilter<"FormAccess"> | $Enums.AccessType
    access_value?: StringFilter<"FormAccess"> | string
    expires_at?: DateTimeNullableFilter<"FormAccess"> | Date | string | null
    created_at?: DateTimeFilter<"FormAccess"> | Date | string
    updated_at?: DateTimeFilter<"FormAccess"> | Date | string
  }

  export type FormFieldUpsertWithWhereUniqueWithoutFormInput = {
    where: FormFieldWhereUniqueInput
    update: XOR<FormFieldUpdateWithoutFormInput, FormFieldUncheckedUpdateWithoutFormInput>
    create: XOR<FormFieldCreateWithoutFormInput, FormFieldUncheckedCreateWithoutFormInput>
  }

  export type FormFieldUpdateWithWhereUniqueWithoutFormInput = {
    where: FormFieldWhereUniqueInput
    data: XOR<FormFieldUpdateWithoutFormInput, FormFieldUncheckedUpdateWithoutFormInput>
  }

  export type FormFieldUpdateManyWithWhereWithoutFormInput = {
    where: FormFieldScalarWhereInput
    data: XOR<FormFieldUpdateManyMutationInput, FormFieldUncheckedUpdateManyWithoutFormInput>
  }

  export type FormFieldScalarWhereInput = {
    AND?: FormFieldScalarWhereInput | FormFieldScalarWhereInput[]
    OR?: FormFieldScalarWhereInput[]
    NOT?: FormFieldScalarWhereInput | FormFieldScalarWhereInput[]
    id?: IntFilter<"FormField"> | number
    form_id?: IntFilter<"FormField"> | number
    field_key?: StringFilter<"FormField"> | string
    label?: StringFilter<"FormField"> | string
    field_type?: EnumFieldTypeFilter<"FormField"> | $Enums.FieldType
    mode?: EnumFieldModeFilter<"FormField"> | $Enums.FieldMode
    is_required?: BoolFilter<"FormField"> | boolean
    field_order?: IntFilter<"FormField"> | number
    settings?: JsonNullableFilter<"FormField">
    created_at?: DateTimeFilter<"FormField"> | Date | string
    updated_at?: DateTimeFilter<"FormField"> | Date | string
  }

  export type FormResponseUpsertWithWhereUniqueWithoutFormInput = {
    where: FormResponseWhereUniqueInput
    update: XOR<FormResponseUpdateWithoutFormInput, FormResponseUncheckedUpdateWithoutFormInput>
    create: XOR<FormResponseCreateWithoutFormInput, FormResponseUncheckedCreateWithoutFormInput>
  }

  export type FormResponseUpdateWithWhereUniqueWithoutFormInput = {
    where: FormResponseWhereUniqueInput
    data: XOR<FormResponseUpdateWithoutFormInput, FormResponseUncheckedUpdateWithoutFormInput>
  }

  export type FormResponseUpdateManyWithWhereWithoutFormInput = {
    where: FormResponseScalarWhereInput
    data: XOR<FormResponseUpdateManyMutationInput, FormResponseUncheckedUpdateManyWithoutFormInput>
  }

  export type FormCreateWithoutAccessInput = {
    name: string
    description?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    creator?: UserCreateNestedOneWithoutFormsInput
    fields?: FormFieldCreateNestedManyWithoutFormInput
    responses?: FormResponseCreateNestedManyWithoutFormInput
  }

  export type FormUncheckedCreateWithoutAccessInput = {
    id?: number
    name: string
    description?: string | null
    created_by?: number | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    fields?: FormFieldUncheckedCreateNestedManyWithoutFormInput
    responses?: FormResponseUncheckedCreateNestedManyWithoutFormInput
  }

  export type FormCreateOrConnectWithoutAccessInput = {
    where: FormWhereUniqueInput
    create: XOR<FormCreateWithoutAccessInput, FormUncheckedCreateWithoutAccessInput>
  }

  export type FormUpsertWithoutAccessInput = {
    update: XOR<FormUpdateWithoutAccessInput, FormUncheckedUpdateWithoutAccessInput>
    create: XOR<FormCreateWithoutAccessInput, FormUncheckedCreateWithoutAccessInput>
    where?: FormWhereInput
  }

  export type FormUpdateToOneWithWhereWithoutAccessInput = {
    where?: FormWhereInput
    data: XOR<FormUpdateWithoutAccessInput, FormUncheckedUpdateWithoutAccessInput>
  }

  export type FormUpdateWithoutAccessInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: UserUpdateOneWithoutFormsNestedInput
    fields?: FormFieldUpdateManyWithoutFormNestedInput
    responses?: FormResponseUpdateManyWithoutFormNestedInput
  }

  export type FormUncheckedUpdateWithoutAccessInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_by?: NullableIntFieldUpdateOperationsInput | number | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    fields?: FormFieldUncheckedUpdateManyWithoutFormNestedInput
    responses?: FormResponseUncheckedUpdateManyWithoutFormNestedInput
  }

  export type FormCreateWithoutFieldsInput = {
    name: string
    description?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    creator?: UserCreateNestedOneWithoutFormsInput
    access?: FormAccessCreateNestedManyWithoutFormInput
    responses?: FormResponseCreateNestedManyWithoutFormInput
  }

  export type FormUncheckedCreateWithoutFieldsInput = {
    id?: number
    name: string
    description?: string | null
    created_by?: number | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    access?: FormAccessUncheckedCreateNestedManyWithoutFormInput
    responses?: FormResponseUncheckedCreateNestedManyWithoutFormInput
  }

  export type FormCreateOrConnectWithoutFieldsInput = {
    where: FormWhereUniqueInput
    create: XOR<FormCreateWithoutFieldsInput, FormUncheckedCreateWithoutFieldsInput>
  }

  export type FormFieldOptionCreateWithoutFieldInput = {
    value: string
    label?: string | null
    score?: number
    option_order?: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type FormFieldOptionUncheckedCreateWithoutFieldInput = {
    id?: number
    value: string
    label?: string | null
    score?: number
    option_order?: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type FormFieldOptionCreateOrConnectWithoutFieldInput = {
    where: FormFieldOptionWhereUniqueInput
    create: XOR<FormFieldOptionCreateWithoutFieldInput, FormFieldOptionUncheckedCreateWithoutFieldInput>
  }

  export type FormFieldOptionCreateManyFieldInputEnvelope = {
    data: FormFieldOptionCreateManyFieldInput | FormFieldOptionCreateManyFieldInput[]
    skipDuplicates?: boolean
  }

  export type FormFieldTableSourceCreateWithoutFieldInput = {
    source_table: string
    source_value_column: string
    source_label_column: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type FormFieldTableSourceUncheckedCreateWithoutFieldInput = {
    id?: number
    source_table: string
    source_value_column: string
    source_label_column: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type FormFieldTableSourceCreateOrConnectWithoutFieldInput = {
    where: FormFieldTableSourceWhereUniqueInput
    create: XOR<FormFieldTableSourceCreateWithoutFieldInput, FormFieldTableSourceUncheckedCreateWithoutFieldInput>
  }

  export type FormResponseValueCreateWithoutFieldInput = {
    value?: string | null
    score?: number
    created_at?: Date | string
    updated_at?: Date | string
    response: FormResponseCreateNestedOneWithoutValuesInput
  }

  export type FormResponseValueUncheckedCreateWithoutFieldInput = {
    id?: number
    response_id: number
    value?: string | null
    score?: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type FormResponseValueCreateOrConnectWithoutFieldInput = {
    where: FormResponseValueWhereUniqueInput
    create: XOR<FormResponseValueCreateWithoutFieldInput, FormResponseValueUncheckedCreateWithoutFieldInput>
  }

  export type FormResponseValueCreateManyFieldInputEnvelope = {
    data: FormResponseValueCreateManyFieldInput | FormResponseValueCreateManyFieldInput[]
    skipDuplicates?: boolean
  }

  export type FormUpsertWithoutFieldsInput = {
    update: XOR<FormUpdateWithoutFieldsInput, FormUncheckedUpdateWithoutFieldsInput>
    create: XOR<FormCreateWithoutFieldsInput, FormUncheckedCreateWithoutFieldsInput>
    where?: FormWhereInput
  }

  export type FormUpdateToOneWithWhereWithoutFieldsInput = {
    where?: FormWhereInput
    data: XOR<FormUpdateWithoutFieldsInput, FormUncheckedUpdateWithoutFieldsInput>
  }

  export type FormUpdateWithoutFieldsInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: UserUpdateOneWithoutFormsNestedInput
    access?: FormAccessUpdateManyWithoutFormNestedInput
    responses?: FormResponseUpdateManyWithoutFormNestedInput
  }

  export type FormUncheckedUpdateWithoutFieldsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_by?: NullableIntFieldUpdateOperationsInput | number | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    access?: FormAccessUncheckedUpdateManyWithoutFormNestedInput
    responses?: FormResponseUncheckedUpdateManyWithoutFormNestedInput
  }

  export type FormFieldOptionUpsertWithWhereUniqueWithoutFieldInput = {
    where: FormFieldOptionWhereUniqueInput
    update: XOR<FormFieldOptionUpdateWithoutFieldInput, FormFieldOptionUncheckedUpdateWithoutFieldInput>
    create: XOR<FormFieldOptionCreateWithoutFieldInput, FormFieldOptionUncheckedCreateWithoutFieldInput>
  }

  export type FormFieldOptionUpdateWithWhereUniqueWithoutFieldInput = {
    where: FormFieldOptionWhereUniqueInput
    data: XOR<FormFieldOptionUpdateWithoutFieldInput, FormFieldOptionUncheckedUpdateWithoutFieldInput>
  }

  export type FormFieldOptionUpdateManyWithWhereWithoutFieldInput = {
    where: FormFieldOptionScalarWhereInput
    data: XOR<FormFieldOptionUpdateManyMutationInput, FormFieldOptionUncheckedUpdateManyWithoutFieldInput>
  }

  export type FormFieldOptionScalarWhereInput = {
    AND?: FormFieldOptionScalarWhereInput | FormFieldOptionScalarWhereInput[]
    OR?: FormFieldOptionScalarWhereInput[]
    NOT?: FormFieldOptionScalarWhereInput | FormFieldOptionScalarWhereInput[]
    id?: IntFilter<"FormFieldOption"> | number
    field_id?: IntFilter<"FormFieldOption"> | number
    value?: StringFilter<"FormFieldOption"> | string
    label?: StringNullableFilter<"FormFieldOption"> | string | null
    score?: IntFilter<"FormFieldOption"> | number
    option_order?: IntFilter<"FormFieldOption"> | number
    created_at?: DateTimeFilter<"FormFieldOption"> | Date | string
    updated_at?: DateTimeFilter<"FormFieldOption"> | Date | string
  }

  export type FormFieldTableSourceUpsertWithoutFieldInput = {
    update: XOR<FormFieldTableSourceUpdateWithoutFieldInput, FormFieldTableSourceUncheckedUpdateWithoutFieldInput>
    create: XOR<FormFieldTableSourceCreateWithoutFieldInput, FormFieldTableSourceUncheckedCreateWithoutFieldInput>
    where?: FormFieldTableSourceWhereInput
  }

  export type FormFieldTableSourceUpdateToOneWithWhereWithoutFieldInput = {
    where?: FormFieldTableSourceWhereInput
    data: XOR<FormFieldTableSourceUpdateWithoutFieldInput, FormFieldTableSourceUncheckedUpdateWithoutFieldInput>
  }

  export type FormFieldTableSourceUpdateWithoutFieldInput = {
    source_table?: StringFieldUpdateOperationsInput | string
    source_value_column?: StringFieldUpdateOperationsInput | string
    source_label_column?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FormFieldTableSourceUncheckedUpdateWithoutFieldInput = {
    id?: IntFieldUpdateOperationsInput | number
    source_table?: StringFieldUpdateOperationsInput | string
    source_value_column?: StringFieldUpdateOperationsInput | string
    source_label_column?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FormResponseValueUpsertWithWhereUniqueWithoutFieldInput = {
    where: FormResponseValueWhereUniqueInput
    update: XOR<FormResponseValueUpdateWithoutFieldInput, FormResponseValueUncheckedUpdateWithoutFieldInput>
    create: XOR<FormResponseValueCreateWithoutFieldInput, FormResponseValueUncheckedCreateWithoutFieldInput>
  }

  export type FormResponseValueUpdateWithWhereUniqueWithoutFieldInput = {
    where: FormResponseValueWhereUniqueInput
    data: XOR<FormResponseValueUpdateWithoutFieldInput, FormResponseValueUncheckedUpdateWithoutFieldInput>
  }

  export type FormResponseValueUpdateManyWithWhereWithoutFieldInput = {
    where: FormResponseValueScalarWhereInput
    data: XOR<FormResponseValueUpdateManyMutationInput, FormResponseValueUncheckedUpdateManyWithoutFieldInput>
  }

  export type FormResponseValueScalarWhereInput = {
    AND?: FormResponseValueScalarWhereInput | FormResponseValueScalarWhereInput[]
    OR?: FormResponseValueScalarWhereInput[]
    NOT?: FormResponseValueScalarWhereInput | FormResponseValueScalarWhereInput[]
    id?: IntFilter<"FormResponseValue"> | number
    response_id?: IntFilter<"FormResponseValue"> | number
    field_id?: IntFilter<"FormResponseValue"> | number
    value?: StringNullableFilter<"FormResponseValue"> | string | null
    score?: IntFilter<"FormResponseValue"> | number
    created_at?: DateTimeFilter<"FormResponseValue"> | Date | string
    updated_at?: DateTimeFilter<"FormResponseValue"> | Date | string
  }

  export type FormFieldCreateWithoutOptionsInput = {
    field_key: string
    label: string
    field_type: $Enums.FieldType
    mode?: $Enums.FieldMode
    is_required?: boolean
    field_order?: number
    settings?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    form: FormCreateNestedOneWithoutFieldsInput
    tableSource?: FormFieldTableSourceCreateNestedOneWithoutFieldInput
    values?: FormResponseValueCreateNestedManyWithoutFieldInput
  }

  export type FormFieldUncheckedCreateWithoutOptionsInput = {
    id?: number
    form_id: number
    field_key: string
    label: string
    field_type: $Enums.FieldType
    mode?: $Enums.FieldMode
    is_required?: boolean
    field_order?: number
    settings?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    tableSource?: FormFieldTableSourceUncheckedCreateNestedOneWithoutFieldInput
    values?: FormResponseValueUncheckedCreateNestedManyWithoutFieldInput
  }

  export type FormFieldCreateOrConnectWithoutOptionsInput = {
    where: FormFieldWhereUniqueInput
    create: XOR<FormFieldCreateWithoutOptionsInput, FormFieldUncheckedCreateWithoutOptionsInput>
  }

  export type FormFieldUpsertWithoutOptionsInput = {
    update: XOR<FormFieldUpdateWithoutOptionsInput, FormFieldUncheckedUpdateWithoutOptionsInput>
    create: XOR<FormFieldCreateWithoutOptionsInput, FormFieldUncheckedCreateWithoutOptionsInput>
    where?: FormFieldWhereInput
  }

  export type FormFieldUpdateToOneWithWhereWithoutOptionsInput = {
    where?: FormFieldWhereInput
    data: XOR<FormFieldUpdateWithoutOptionsInput, FormFieldUncheckedUpdateWithoutOptionsInput>
  }

  export type FormFieldUpdateWithoutOptionsInput = {
    field_key?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    field_type?: EnumFieldTypeFieldUpdateOperationsInput | $Enums.FieldType
    mode?: EnumFieldModeFieldUpdateOperationsInput | $Enums.FieldMode
    is_required?: BoolFieldUpdateOperationsInput | boolean
    field_order?: IntFieldUpdateOperationsInput | number
    settings?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    form?: FormUpdateOneRequiredWithoutFieldsNestedInput
    tableSource?: FormFieldTableSourceUpdateOneWithoutFieldNestedInput
    values?: FormResponseValueUpdateManyWithoutFieldNestedInput
  }

  export type FormFieldUncheckedUpdateWithoutOptionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    form_id?: IntFieldUpdateOperationsInput | number
    field_key?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    field_type?: EnumFieldTypeFieldUpdateOperationsInput | $Enums.FieldType
    mode?: EnumFieldModeFieldUpdateOperationsInput | $Enums.FieldMode
    is_required?: BoolFieldUpdateOperationsInput | boolean
    field_order?: IntFieldUpdateOperationsInput | number
    settings?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tableSource?: FormFieldTableSourceUncheckedUpdateOneWithoutFieldNestedInput
    values?: FormResponseValueUncheckedUpdateManyWithoutFieldNestedInput
  }

  export type FormFieldCreateWithoutTableSourceInput = {
    field_key: string
    label: string
    field_type: $Enums.FieldType
    mode?: $Enums.FieldMode
    is_required?: boolean
    field_order?: number
    settings?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    form: FormCreateNestedOneWithoutFieldsInput
    options?: FormFieldOptionCreateNestedManyWithoutFieldInput
    values?: FormResponseValueCreateNestedManyWithoutFieldInput
  }

  export type FormFieldUncheckedCreateWithoutTableSourceInput = {
    id?: number
    form_id: number
    field_key: string
    label: string
    field_type: $Enums.FieldType
    mode?: $Enums.FieldMode
    is_required?: boolean
    field_order?: number
    settings?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    options?: FormFieldOptionUncheckedCreateNestedManyWithoutFieldInput
    values?: FormResponseValueUncheckedCreateNestedManyWithoutFieldInput
  }

  export type FormFieldCreateOrConnectWithoutTableSourceInput = {
    where: FormFieldWhereUniqueInput
    create: XOR<FormFieldCreateWithoutTableSourceInput, FormFieldUncheckedCreateWithoutTableSourceInput>
  }

  export type FormFieldUpsertWithoutTableSourceInput = {
    update: XOR<FormFieldUpdateWithoutTableSourceInput, FormFieldUncheckedUpdateWithoutTableSourceInput>
    create: XOR<FormFieldCreateWithoutTableSourceInput, FormFieldUncheckedCreateWithoutTableSourceInput>
    where?: FormFieldWhereInput
  }

  export type FormFieldUpdateToOneWithWhereWithoutTableSourceInput = {
    where?: FormFieldWhereInput
    data: XOR<FormFieldUpdateWithoutTableSourceInput, FormFieldUncheckedUpdateWithoutTableSourceInput>
  }

  export type FormFieldUpdateWithoutTableSourceInput = {
    field_key?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    field_type?: EnumFieldTypeFieldUpdateOperationsInput | $Enums.FieldType
    mode?: EnumFieldModeFieldUpdateOperationsInput | $Enums.FieldMode
    is_required?: BoolFieldUpdateOperationsInput | boolean
    field_order?: IntFieldUpdateOperationsInput | number
    settings?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    form?: FormUpdateOneRequiredWithoutFieldsNestedInput
    options?: FormFieldOptionUpdateManyWithoutFieldNestedInput
    values?: FormResponseValueUpdateManyWithoutFieldNestedInput
  }

  export type FormFieldUncheckedUpdateWithoutTableSourceInput = {
    id?: IntFieldUpdateOperationsInput | number
    form_id?: IntFieldUpdateOperationsInput | number
    field_key?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    field_type?: EnumFieldTypeFieldUpdateOperationsInput | $Enums.FieldType
    mode?: EnumFieldModeFieldUpdateOperationsInput | $Enums.FieldMode
    is_required?: BoolFieldUpdateOperationsInput | boolean
    field_order?: IntFieldUpdateOperationsInput | number
    settings?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    options?: FormFieldOptionUncheckedUpdateManyWithoutFieldNestedInput
    values?: FormResponseValueUncheckedUpdateManyWithoutFieldNestedInput
  }

  export type FormCreateWithoutResponsesInput = {
    name: string
    description?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    creator?: UserCreateNestedOneWithoutFormsInput
    access?: FormAccessCreateNestedManyWithoutFormInput
    fields?: FormFieldCreateNestedManyWithoutFormInput
  }

  export type FormUncheckedCreateWithoutResponsesInput = {
    id?: number
    name: string
    description?: string | null
    created_by?: number | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    access?: FormAccessUncheckedCreateNestedManyWithoutFormInput
    fields?: FormFieldUncheckedCreateNestedManyWithoutFormInput
  }

  export type FormCreateOrConnectWithoutResponsesInput = {
    where: FormWhereUniqueInput
    create: XOR<FormCreateWithoutResponsesInput, FormUncheckedCreateWithoutResponsesInput>
  }

  export type UserCreateWithoutResponsesInput = {
    email?: string | null
    username?: string | null
    first_name?: string | null
    last_name?: string | null
    phone?: string | null
    password?: string | null
    google_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    default_role?: RoleCreateNestedOneWithoutDefaultForUsersInput
    roles?: UserRoleCreateNestedManyWithoutUserInput
    groups?: GroupUserCreateNestedManyWithoutUserInput
    forms?: FormCreateNestedManyWithoutCreatorInput
  }

  export type UserUncheckedCreateWithoutResponsesInput = {
    id?: number
    email?: string | null
    username?: string | null
    first_name?: string | null
    last_name?: string | null
    phone?: string | null
    password?: string | null
    google_id?: string | null
    default_role_id?: number | null
    created_at?: Date | string
    updated_at?: Date | string
    roles?: UserRoleUncheckedCreateNestedManyWithoutUserInput
    groups?: GroupUserUncheckedCreateNestedManyWithoutUserInput
    forms?: FormUncheckedCreateNestedManyWithoutCreatorInput
  }

  export type UserCreateOrConnectWithoutResponsesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutResponsesInput, UserUncheckedCreateWithoutResponsesInput>
  }

  export type FormResponseValueCreateWithoutResponseInput = {
    value?: string | null
    score?: number
    created_at?: Date | string
    updated_at?: Date | string
    field: FormFieldCreateNestedOneWithoutValuesInput
  }

  export type FormResponseValueUncheckedCreateWithoutResponseInput = {
    id?: number
    field_id: number
    value?: string | null
    score?: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type FormResponseValueCreateOrConnectWithoutResponseInput = {
    where: FormResponseValueWhereUniqueInput
    create: XOR<FormResponseValueCreateWithoutResponseInput, FormResponseValueUncheckedCreateWithoutResponseInput>
  }

  export type FormResponseValueCreateManyResponseInputEnvelope = {
    data: FormResponseValueCreateManyResponseInput | FormResponseValueCreateManyResponseInput[]
    skipDuplicates?: boolean
  }

  export type FormUpsertWithoutResponsesInput = {
    update: XOR<FormUpdateWithoutResponsesInput, FormUncheckedUpdateWithoutResponsesInput>
    create: XOR<FormCreateWithoutResponsesInput, FormUncheckedCreateWithoutResponsesInput>
    where?: FormWhereInput
  }

  export type FormUpdateToOneWithWhereWithoutResponsesInput = {
    where?: FormWhereInput
    data: XOR<FormUpdateWithoutResponsesInput, FormUncheckedUpdateWithoutResponsesInput>
  }

  export type FormUpdateWithoutResponsesInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: UserUpdateOneWithoutFormsNestedInput
    access?: FormAccessUpdateManyWithoutFormNestedInput
    fields?: FormFieldUpdateManyWithoutFormNestedInput
  }

  export type FormUncheckedUpdateWithoutResponsesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_by?: NullableIntFieldUpdateOperationsInput | number | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    access?: FormAccessUncheckedUpdateManyWithoutFormNestedInput
    fields?: FormFieldUncheckedUpdateManyWithoutFormNestedInput
  }

  export type UserUpsertWithoutResponsesInput = {
    update: XOR<UserUpdateWithoutResponsesInput, UserUncheckedUpdateWithoutResponsesInput>
    create: XOR<UserCreateWithoutResponsesInput, UserUncheckedCreateWithoutResponsesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutResponsesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutResponsesInput, UserUncheckedUpdateWithoutResponsesInput>
  }

  export type UserUpdateWithoutResponsesInput = {
    email?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    default_role?: RoleUpdateOneWithoutDefaultForUsersNestedInput
    roles?: UserRoleUpdateManyWithoutUserNestedInput
    groups?: GroupUserUpdateManyWithoutUserNestedInput
    forms?: FormUpdateManyWithoutCreatorNestedInput
  }

  export type UserUncheckedUpdateWithoutResponsesInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    default_role_id?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    roles?: UserRoleUncheckedUpdateManyWithoutUserNestedInput
    groups?: GroupUserUncheckedUpdateManyWithoutUserNestedInput
    forms?: FormUncheckedUpdateManyWithoutCreatorNestedInput
  }

  export type FormResponseValueUpsertWithWhereUniqueWithoutResponseInput = {
    where: FormResponseValueWhereUniqueInput
    update: XOR<FormResponseValueUpdateWithoutResponseInput, FormResponseValueUncheckedUpdateWithoutResponseInput>
    create: XOR<FormResponseValueCreateWithoutResponseInput, FormResponseValueUncheckedCreateWithoutResponseInput>
  }

  export type FormResponseValueUpdateWithWhereUniqueWithoutResponseInput = {
    where: FormResponseValueWhereUniqueInput
    data: XOR<FormResponseValueUpdateWithoutResponseInput, FormResponseValueUncheckedUpdateWithoutResponseInput>
  }

  export type FormResponseValueUpdateManyWithWhereWithoutResponseInput = {
    where: FormResponseValueScalarWhereInput
    data: XOR<FormResponseValueUpdateManyMutationInput, FormResponseValueUncheckedUpdateManyWithoutResponseInput>
  }

  export type FormResponseCreateWithoutValuesInput = {
    total_score?: number
    status?: $Enums.ResponseStatus
    created_at?: Date | string
    updated_at?: Date | string
    form: FormCreateNestedOneWithoutResponsesInput
    user?: UserCreateNestedOneWithoutResponsesInput
  }

  export type FormResponseUncheckedCreateWithoutValuesInput = {
    id?: number
    form_id: number
    user_id?: number | null
    total_score?: number
    status?: $Enums.ResponseStatus
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type FormResponseCreateOrConnectWithoutValuesInput = {
    where: FormResponseWhereUniqueInput
    create: XOR<FormResponseCreateWithoutValuesInput, FormResponseUncheckedCreateWithoutValuesInput>
  }

  export type FormFieldCreateWithoutValuesInput = {
    field_key: string
    label: string
    field_type: $Enums.FieldType
    mode?: $Enums.FieldMode
    is_required?: boolean
    field_order?: number
    settings?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    form: FormCreateNestedOneWithoutFieldsInput
    options?: FormFieldOptionCreateNestedManyWithoutFieldInput
    tableSource?: FormFieldTableSourceCreateNestedOneWithoutFieldInput
  }

  export type FormFieldUncheckedCreateWithoutValuesInput = {
    id?: number
    form_id: number
    field_key: string
    label: string
    field_type: $Enums.FieldType
    mode?: $Enums.FieldMode
    is_required?: boolean
    field_order?: number
    settings?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    options?: FormFieldOptionUncheckedCreateNestedManyWithoutFieldInput
    tableSource?: FormFieldTableSourceUncheckedCreateNestedOneWithoutFieldInput
  }

  export type FormFieldCreateOrConnectWithoutValuesInput = {
    where: FormFieldWhereUniqueInput
    create: XOR<FormFieldCreateWithoutValuesInput, FormFieldUncheckedCreateWithoutValuesInput>
  }

  export type FormResponseUpsertWithoutValuesInput = {
    update: XOR<FormResponseUpdateWithoutValuesInput, FormResponseUncheckedUpdateWithoutValuesInput>
    create: XOR<FormResponseCreateWithoutValuesInput, FormResponseUncheckedCreateWithoutValuesInput>
    where?: FormResponseWhereInput
  }

  export type FormResponseUpdateToOneWithWhereWithoutValuesInput = {
    where?: FormResponseWhereInput
    data: XOR<FormResponseUpdateWithoutValuesInput, FormResponseUncheckedUpdateWithoutValuesInput>
  }

  export type FormResponseUpdateWithoutValuesInput = {
    total_score?: IntFieldUpdateOperationsInput | number
    status?: EnumResponseStatusFieldUpdateOperationsInput | $Enums.ResponseStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    form?: FormUpdateOneRequiredWithoutResponsesNestedInput
    user?: UserUpdateOneWithoutResponsesNestedInput
  }

  export type FormResponseUncheckedUpdateWithoutValuesInput = {
    id?: IntFieldUpdateOperationsInput | number
    form_id?: IntFieldUpdateOperationsInput | number
    user_id?: NullableIntFieldUpdateOperationsInput | number | null
    total_score?: IntFieldUpdateOperationsInput | number
    status?: EnumResponseStatusFieldUpdateOperationsInput | $Enums.ResponseStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FormFieldUpsertWithoutValuesInput = {
    update: XOR<FormFieldUpdateWithoutValuesInput, FormFieldUncheckedUpdateWithoutValuesInput>
    create: XOR<FormFieldCreateWithoutValuesInput, FormFieldUncheckedCreateWithoutValuesInput>
    where?: FormFieldWhereInput
  }

  export type FormFieldUpdateToOneWithWhereWithoutValuesInput = {
    where?: FormFieldWhereInput
    data: XOR<FormFieldUpdateWithoutValuesInput, FormFieldUncheckedUpdateWithoutValuesInput>
  }

  export type FormFieldUpdateWithoutValuesInput = {
    field_key?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    field_type?: EnumFieldTypeFieldUpdateOperationsInput | $Enums.FieldType
    mode?: EnumFieldModeFieldUpdateOperationsInput | $Enums.FieldMode
    is_required?: BoolFieldUpdateOperationsInput | boolean
    field_order?: IntFieldUpdateOperationsInput | number
    settings?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    form?: FormUpdateOneRequiredWithoutFieldsNestedInput
    options?: FormFieldOptionUpdateManyWithoutFieldNestedInput
    tableSource?: FormFieldTableSourceUpdateOneWithoutFieldNestedInput
  }

  export type FormFieldUncheckedUpdateWithoutValuesInput = {
    id?: IntFieldUpdateOperationsInput | number
    form_id?: IntFieldUpdateOperationsInput | number
    field_key?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    field_type?: EnumFieldTypeFieldUpdateOperationsInput | $Enums.FieldType
    mode?: EnumFieldModeFieldUpdateOperationsInput | $Enums.FieldMode
    is_required?: BoolFieldUpdateOperationsInput | boolean
    field_order?: IntFieldUpdateOperationsInput | number
    settings?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    options?: FormFieldOptionUncheckedUpdateManyWithoutFieldNestedInput
    tableSource?: FormFieldTableSourceUncheckedUpdateOneWithoutFieldNestedInput
  }

  export type UserRoleCreateManyUserInput = {
    id?: number
    role_id: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type GroupUserCreateManyUserInput = {
    id?: number
    group_id: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type FormCreateManyCreatorInput = {
    id?: number
    name: string
    description?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type FormResponseCreateManyUserInput = {
    id?: number
    form_id: number
    total_score?: number
    status?: $Enums.ResponseStatus
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type UserRoleUpdateWithoutUserInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: RoleUpdateOneRequiredWithoutUsersNestedInput
  }

  export type UserRoleUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    role_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRoleUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    role_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupUserUpdateWithoutUserInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    group?: GroupUpdateOneRequiredWithoutUsersNestedInput
  }

  export type GroupUserUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    group_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupUserUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    group_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FormUpdateWithoutCreatorInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    access?: FormAccessUpdateManyWithoutFormNestedInput
    fields?: FormFieldUpdateManyWithoutFormNestedInput
    responses?: FormResponseUpdateManyWithoutFormNestedInput
  }

  export type FormUncheckedUpdateWithoutCreatorInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    access?: FormAccessUncheckedUpdateManyWithoutFormNestedInput
    fields?: FormFieldUncheckedUpdateManyWithoutFormNestedInput
    responses?: FormResponseUncheckedUpdateManyWithoutFormNestedInput
  }

  export type FormUncheckedUpdateManyWithoutCreatorInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FormResponseUpdateWithoutUserInput = {
    total_score?: IntFieldUpdateOperationsInput | number
    status?: EnumResponseStatusFieldUpdateOperationsInput | $Enums.ResponseStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    form?: FormUpdateOneRequiredWithoutResponsesNestedInput
    values?: FormResponseValueUpdateManyWithoutResponseNestedInput
  }

  export type FormResponseUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    form_id?: IntFieldUpdateOperationsInput | number
    total_score?: IntFieldUpdateOperationsInput | number
    status?: EnumResponseStatusFieldUpdateOperationsInput | $Enums.ResponseStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    values?: FormResponseValueUncheckedUpdateManyWithoutResponseNestedInput
  }

  export type FormResponseUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    form_id?: IntFieldUpdateOperationsInput | number
    total_score?: IntFieldUpdateOperationsInput | number
    status?: EnumResponseStatusFieldUpdateOperationsInput | $Enums.ResponseStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RolePolicyCreateManyRoleInput = {
    id?: number
    policy_id: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type UserRoleCreateManyRoleInput = {
    id?: number
    user_id: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type UserCreateManyDefault_roleInput = {
    id?: number
    email?: string | null
    username?: string | null
    first_name?: string | null
    last_name?: string | null
    phone?: string | null
    password?: string | null
    google_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type RolePolicyUpdateWithoutRoleInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    policy?: PolicyUpdateOneRequiredWithoutRolesNestedInput
  }

  export type RolePolicyUncheckedUpdateWithoutRoleInput = {
    id?: IntFieldUpdateOperationsInput | number
    policy_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RolePolicyUncheckedUpdateManyWithoutRoleInput = {
    id?: IntFieldUpdateOperationsInput | number
    policy_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRoleUpdateWithoutRoleInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutRolesNestedInput
  }

  export type UserRoleUncheckedUpdateWithoutRoleInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserRoleUncheckedUpdateManyWithoutRoleInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpdateWithoutDefault_roleInput = {
    email?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    roles?: UserRoleUpdateManyWithoutUserNestedInput
    groups?: GroupUserUpdateManyWithoutUserNestedInput
    forms?: FormUpdateManyWithoutCreatorNestedInput
    responses?: FormResponseUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDefault_roleInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    roles?: UserRoleUncheckedUpdateManyWithoutUserNestedInput
    groups?: GroupUserUncheckedUpdateManyWithoutUserNestedInput
    forms?: FormUncheckedUpdateManyWithoutCreatorNestedInput
    responses?: FormResponseUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutDefault_roleInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    google_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RolePolicyCreateManyPolicyInput = {
    id?: number
    role_id: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type RolePolicyUpdateWithoutPolicyInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: RoleUpdateOneRequiredWithoutPoliciesNestedInput
  }

  export type RolePolicyUncheckedUpdateWithoutPolicyInput = {
    id?: IntFieldUpdateOperationsInput | number
    role_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RolePolicyUncheckedUpdateManyWithoutPolicyInput = {
    id?: IntFieldUpdateOperationsInput | number
    role_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupUserCreateManyGroupInput = {
    id?: number
    user_id: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type GroupUserUpdateWithoutGroupInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutGroupsNestedInput
  }

  export type GroupUserUncheckedUpdateWithoutGroupInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupUserUncheckedUpdateManyWithoutGroupInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FormAccessCreateManyFormInput = {
    id?: number
    access_type?: $Enums.AccessType
    access_value: string
    expires_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type FormFieldCreateManyFormInput = {
    id?: number
    field_key: string
    label: string
    field_type: $Enums.FieldType
    mode?: $Enums.FieldMode
    is_required?: boolean
    field_order?: number
    settings?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type FormResponseCreateManyFormInput = {
    id?: number
    user_id?: number | null
    total_score?: number
    status?: $Enums.ResponseStatus
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type FormAccessUpdateWithoutFormInput = {
    access_type?: EnumAccessTypeFieldUpdateOperationsInput | $Enums.AccessType
    access_value?: StringFieldUpdateOperationsInput | string
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FormAccessUncheckedUpdateWithoutFormInput = {
    id?: IntFieldUpdateOperationsInput | number
    access_type?: EnumAccessTypeFieldUpdateOperationsInput | $Enums.AccessType
    access_value?: StringFieldUpdateOperationsInput | string
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FormAccessUncheckedUpdateManyWithoutFormInput = {
    id?: IntFieldUpdateOperationsInput | number
    access_type?: EnumAccessTypeFieldUpdateOperationsInput | $Enums.AccessType
    access_value?: StringFieldUpdateOperationsInput | string
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FormFieldUpdateWithoutFormInput = {
    field_key?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    field_type?: EnumFieldTypeFieldUpdateOperationsInput | $Enums.FieldType
    mode?: EnumFieldModeFieldUpdateOperationsInput | $Enums.FieldMode
    is_required?: BoolFieldUpdateOperationsInput | boolean
    field_order?: IntFieldUpdateOperationsInput | number
    settings?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    options?: FormFieldOptionUpdateManyWithoutFieldNestedInput
    tableSource?: FormFieldTableSourceUpdateOneWithoutFieldNestedInput
    values?: FormResponseValueUpdateManyWithoutFieldNestedInput
  }

  export type FormFieldUncheckedUpdateWithoutFormInput = {
    id?: IntFieldUpdateOperationsInput | number
    field_key?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    field_type?: EnumFieldTypeFieldUpdateOperationsInput | $Enums.FieldType
    mode?: EnumFieldModeFieldUpdateOperationsInput | $Enums.FieldMode
    is_required?: BoolFieldUpdateOperationsInput | boolean
    field_order?: IntFieldUpdateOperationsInput | number
    settings?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    options?: FormFieldOptionUncheckedUpdateManyWithoutFieldNestedInput
    tableSource?: FormFieldTableSourceUncheckedUpdateOneWithoutFieldNestedInput
    values?: FormResponseValueUncheckedUpdateManyWithoutFieldNestedInput
  }

  export type FormFieldUncheckedUpdateManyWithoutFormInput = {
    id?: IntFieldUpdateOperationsInput | number
    field_key?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    field_type?: EnumFieldTypeFieldUpdateOperationsInput | $Enums.FieldType
    mode?: EnumFieldModeFieldUpdateOperationsInput | $Enums.FieldMode
    is_required?: BoolFieldUpdateOperationsInput | boolean
    field_order?: IntFieldUpdateOperationsInput | number
    settings?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FormResponseUpdateWithoutFormInput = {
    total_score?: IntFieldUpdateOperationsInput | number
    status?: EnumResponseStatusFieldUpdateOperationsInput | $Enums.ResponseStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutResponsesNestedInput
    values?: FormResponseValueUpdateManyWithoutResponseNestedInput
  }

  export type FormResponseUncheckedUpdateWithoutFormInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: NullableIntFieldUpdateOperationsInput | number | null
    total_score?: IntFieldUpdateOperationsInput | number
    status?: EnumResponseStatusFieldUpdateOperationsInput | $Enums.ResponseStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    values?: FormResponseValueUncheckedUpdateManyWithoutResponseNestedInput
  }

  export type FormResponseUncheckedUpdateManyWithoutFormInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: NullableIntFieldUpdateOperationsInput | number | null
    total_score?: IntFieldUpdateOperationsInput | number
    status?: EnumResponseStatusFieldUpdateOperationsInput | $Enums.ResponseStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FormFieldOptionCreateManyFieldInput = {
    id?: number
    value: string
    label?: string | null
    score?: number
    option_order?: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type FormResponseValueCreateManyFieldInput = {
    id?: number
    response_id: number
    value?: string | null
    score?: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type FormFieldOptionUpdateWithoutFieldInput = {
    value?: StringFieldUpdateOperationsInput | string
    label?: NullableStringFieldUpdateOperationsInput | string | null
    score?: IntFieldUpdateOperationsInput | number
    option_order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FormFieldOptionUncheckedUpdateWithoutFieldInput = {
    id?: IntFieldUpdateOperationsInput | number
    value?: StringFieldUpdateOperationsInput | string
    label?: NullableStringFieldUpdateOperationsInput | string | null
    score?: IntFieldUpdateOperationsInput | number
    option_order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FormFieldOptionUncheckedUpdateManyWithoutFieldInput = {
    id?: IntFieldUpdateOperationsInput | number
    value?: StringFieldUpdateOperationsInput | string
    label?: NullableStringFieldUpdateOperationsInput | string | null
    score?: IntFieldUpdateOperationsInput | number
    option_order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FormResponseValueUpdateWithoutFieldInput = {
    value?: NullableStringFieldUpdateOperationsInput | string | null
    score?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    response?: FormResponseUpdateOneRequiredWithoutValuesNestedInput
  }

  export type FormResponseValueUncheckedUpdateWithoutFieldInput = {
    id?: IntFieldUpdateOperationsInput | number
    response_id?: IntFieldUpdateOperationsInput | number
    value?: NullableStringFieldUpdateOperationsInput | string | null
    score?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FormResponseValueUncheckedUpdateManyWithoutFieldInput = {
    id?: IntFieldUpdateOperationsInput | number
    response_id?: IntFieldUpdateOperationsInput | number
    value?: NullableStringFieldUpdateOperationsInput | string | null
    score?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FormResponseValueCreateManyResponseInput = {
    id?: number
    field_id: number
    value?: string | null
    score?: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type FormResponseValueUpdateWithoutResponseInput = {
    value?: NullableStringFieldUpdateOperationsInput | string | null
    score?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    field?: FormFieldUpdateOneRequiredWithoutValuesNestedInput
  }

  export type FormResponseValueUncheckedUpdateWithoutResponseInput = {
    id?: IntFieldUpdateOperationsInput | number
    field_id?: IntFieldUpdateOperationsInput | number
    value?: NullableStringFieldUpdateOperationsInput | string | null
    score?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FormResponseValueUncheckedUpdateManyWithoutResponseInput = {
    id?: IntFieldUpdateOperationsInput | number
    field_id?: IntFieldUpdateOperationsInput | number
    value?: NullableStringFieldUpdateOperationsInput | string | null
    score?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
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