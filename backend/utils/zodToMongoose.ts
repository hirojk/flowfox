/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose'

export const zodToMongooseSchema = (zodSchema: any): Record<string, any> => {
  const getZodDef = (zodSchema: any) => zodSchema.def

  const isZodEffects = (def: any) => {
    return def.typeName === 'ZodEffects' || def.type === 'effects'
  }

  const isZodObject = (def: any) => {
    return def.typeName === 'ZodObject' || def.type === 'object'
  }

  const extractShape = (def: any) => {
    let shape = typeof def.shape === 'function' ? def.shape() : def.shape

    if (!shape) {
      const descriptor = Object.getOwnPropertyDescriptor(def, 'shape')
      if (descriptor?.get) shape = descriptor.get.call(def)
    }

    return shape
  }

  const def = getZodDef(zodSchema)
  if (!def) return {}

  if (isZodEffects(def)) return zodToMongooseSchema(def.schema)
  if (!isZodObject(def)) return {}

  const shape = extractShape(def)
  if (!shape || typeof shape !== 'object') return {}

  const mongooseSchema: any = {}
  for (const [key, value] of Object.entries(shape)) {
    mongooseSchema[key] = zodToMongooseField(value)
  }

  return mongooseSchema
}

export const zodToMongooseField = (zodType: any): any => {
  const def = zodType._def || zodType.def
  const typeName = def?.typeName || def?.type
  const isRequired = !zodType.isOptional?.()

  const resolveDefaultValue = () => (typeof def.defaultValue === 'function' ? def.defaultValue() : def.defaultValue)

  const resolveArrayElement = () => {
    const elementType = def.items || def.element || def.type
    if (!elementType) return []

    const elementDef = elementType._def || elementType.def
    const elementTypeName = elementDef?.typeName || elementDef?.type
    const isObject = elementTypeName === 'ZodObject' || elementTypeName === 'object'

    return isObject ? [zodToMongooseSchema(elementType)] : [zodToMongooseField(elementType)]
  }

  switch (typeName) {
    case 'ZodString':
    case 'string':
      return { type: String, required: isRequired }

    case 'ZodNumber':
    case 'number':
      return { type: Number, required: isRequired }

    case 'ZodBoolean':
    case 'boolean': {
      const config: any = { type: Boolean, required: isRequired }
      if (def.defaultValue !== undefined) config.default = resolveDefaultValue()
      return config
    }

    case 'ZodDate':
    case 'date':
      return { type: Date, required: isRequired }

    case 'ZodEnum':
    case 'enum':
      return { type: String, enum: def.values, required: isRequired }

    case 'ZodArray':
    case 'array':
      return resolveArrayElement()

    case 'ZodOptional':
    case 'optional':
      return zodToMongooseField(def.innerType)

    case 'ZodDefault':
    case 'default': {
      const field = zodToMongooseField(def.innerType)
      field.default = resolveDefaultValue()
      field.required = false
      return field
    }

    case 'ZodEffects':
    case 'effects':
      return zodToMongooseField(def.schema)

    default:
      return { type: mongoose.Schema.Types.Mixed }
  }
}
