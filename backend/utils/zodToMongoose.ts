import mongoose from 'mongoose'

export function zodToMongooseField(zodType: any): any {
  const typeName = zodType._def?.typeName

  // String
  if (typeName === 'ZodString') {
    return { type: String, required: !zodType.isOptional() }
  }

  // Number
  if (typeName === 'ZodNumber') {
    return { type: Number, required: !zodType.isOptional() }
  }

  // Boolean
  if (typeName === 'ZodBoolean') {
    const config: any = { type: Boolean, required: !zodType.isOptional() }
    if (zodType._def.defaultValue) {
      config.default = zodType._def.defaultValue()
    }
    return config
  }

  // Date
  if (typeName === 'ZodDate') {
    return { type: Date, required: !zodType.isOptional() }
  }

  // Enum
  if (typeName === 'ZodEnum') {
    const config: any = {
      type: String,
      enum: zodType._def.values,
      required: !zodType.isOptional(),
    }
    return config
  }

  // Array
  if (typeName === 'ZodArray') {
    const elementType = zodType._def.type
    if (elementType._def.typeName === 'ZodObject') {
      // Nested object array
      return [zodToMongooseSchema(elementType)]
    }
    return [zodToMongooseField(elementType)]
  }

  // Optional
  if (typeName === 'ZodOptional') {
    return zodToMongooseField(zodType._def.innerType)
  }

  // Default
  if (typeName === 'ZodDefault') {
    const field = zodToMongooseField(zodType._def.innerType)
    field.default = zodType._def.defaultValue()
    return field
  }

  // Effects (coerce, transform, etc.)
  if (typeName === 'ZodEffects') {
    return zodToMongooseField(zodType._def.schema)
  }

  return mongoose.Schema.Types.Mixed
}

export function zodToMongooseSchema(zodSchema: any) {
  // Wenn es ein ZodEffects ist, unwrap es
  if (zodSchema._def.typeName === 'ZodEffects') {
    return zodToMongooseSchema(zodSchema._def.schema)
  }

  // Wenn es kein ZodObject ist, zurückgeben
  if (zodSchema._def.typeName !== 'ZodObject') {
    return {}
  }

  const shape = zodSchema._def.shape()
  const mongooseSchema: any = {}

  for (const [key, value] of Object.entries(shape)) {
    mongooseSchema[key] = zodToMongooseField(value)
  }

  return mongooseSchema
}
