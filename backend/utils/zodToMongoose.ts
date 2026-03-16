import mongoose from 'mongoose'

export function zodToMongooseSchema(zodSchema: any) {
  const def = zodSchema.def

  if (!def) {
    return {}
  }

  // Handle ZodEffects
  if (def.typeName === 'ZodEffects' || def.type === 'effects') {
    return zodToMongooseSchema(def.schema)
  }

  // Nur ZodObject akzeptieren
  if (def.typeName !== 'ZodObject' && def.type !== 'object') {
    return {}
  }

  // ⭐ Shape extrahieren (kann Getter sein!)
  let shape = def.shape

  // Wenn es ein Getter ist, aufrufen
  if (typeof shape === 'function') {
    shape = shape()
  }

  // Oder Property Descriptor
  if (!shape && def.shape) {
    const descriptor = Object.getOwnPropertyDescriptor(def, 'shape')
    if (descriptor && descriptor.get) {
      shape = descriptor.get.call(def)
    }
  }

  if (!shape || typeof shape !== 'object') {
    return {}
  }

  const mongooseSchema: any = {}

  for (const [key, value] of Object.entries(shape)) {
    mongooseSchema[key] = zodToMongooseField(value)
  }

  return mongooseSchema
}

export function zodToMongooseField(zodType: any): any {
  const def = zodType._def || zodType.def
  const typeName = def?.typeName || def?.type

  // String
  if (typeName === 'ZodString' || typeName === 'string') {
    return { type: String, required: !zodType.isOptional?.() }
  }

  // Number
  if (typeName === 'ZodNumber' || typeName === 'number') {
    return { type: Number, required: !zodType.isOptional?.() }
  }

  // Boolean
  if (typeName === 'ZodBoolean' || typeName === 'boolean') {
    const config: any = { type: Boolean, required: !zodType.isOptional?.() }
    if (def.defaultValue !== undefined) {
      config.default = typeof def.defaultValue === 'function' ? def.defaultValue() : def.defaultValue
    }
    return config
  }

  // Date
  if (typeName === 'ZodDate' || typeName === 'date') {
    return { type: Date, required: !zodType.isOptional?.() }
  }

  // Enum
  if (typeName === 'ZodEnum' || typeName === 'enum') {
    return {
      type: String,
      enum: def.values,
      required: !zodType.isOptional?.(),
    }
  }

  // Array
  if (typeName === 'ZodArray' || typeName === 'array') {
    const elementType = def.type || def.element

    if (!elementType) {
      return []
    }

    const elementDef = elementType._def || elementType.def
    const elementTypeName = elementDef?.typeName || elementDef?.type

    if (elementTypeName === 'ZodObject' || elementTypeName === 'object') {
      return [zodToMongooseSchema(elementType)]
    }

    return [zodToMongooseField(elementType)]
  }

  // Optional
  if (typeName === 'ZodOptional' || typeName === 'optional') {
    return zodToMongooseField(def.innerType)
  }

  // Default
  if (typeName === 'ZodDefault' || typeName === 'default') {
    const field = zodToMongooseField(def.innerType)
    const defaultValue = typeof def.defaultValue === 'function' ? def.defaultValue() : def.defaultValue
    field.default = defaultValue
    field.required = false
    return field
  }

  // Effects (coerce, transform)
  if (typeName === 'ZodEffects' || typeName === 'effects') {
    return zodToMongooseField(def.schema)
  }

  return { type: mongoose.Schema.Types.Mixed }
}
