import mongoose from 'mongoose';

enum TypeFlags {
  String = 1,
  Number = 1 << 1,
  Boolean = 1 << 2,
  Date = 1 << 3,
  Literal = 1 << 4,
  Array = 1 << 5,
  Map = 1 << 6,
  Object = 1 << 7,
  Frozen = 1 << 8,
  Optional = 1 << 9,
  Reference = 1 << 10,
  Identifier = 1 << 11,
  Late = 1 << 12,
  Refinement = 1 << 13,
  Union = 1 << 14,
  Null = 1 << 15,
  Undefined = 1 << 16,
  Integer = 1 << 17,
  Custom = 1 << 18,
  SnapshotProcessor = 1 << 19
}

type MapSchemaTypes = {
  String: string;
  Number: number;
  Boolean: boolean;
  Date: Date;
}

type MapSchema<T extends Record<string, keyof MapSchemaTypes>> = {
  -readonly [K in keyof T]: MapSchemaTypes[T[K]];
}

const asSchema = <T extends Record<string, keyof MapSchemaTypes>>(t: T): T => t;

export default class Zangoose extends mongoose.Mongoose {
  constructor(
    options?: mongoose.MongooseOptions
  ) {
    super(options);
  }

  createModel = <T extends Record<string, keyof MapSchemaTypes>>(schemaOpts: { definition: T, options?: mongoose.SchemaOptions | undefined }, modelOpts: { name: string, collection?: string | undefined, }): [mongoose.Schema<MapSchema<typeof definition>>, mongoose.Model<MapSchema<typeof definition>>] => {
    const { definition, options } = schemaOpts;
    const { name, collection } = modelOpts;

    const s = new this.Schema(definition, options);
    return [s, this.model(name, s, collection)]
  }
}

const swag = new Zangoose();
