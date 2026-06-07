import baseTokens from '../styles/tokens.json'
import componentTokens from '../styles/tokens.component.json'
import themeTokens from '../styles/tokens.theme.json'

type TokenValue = { value: string }
type TokenNode = TokenValue | { [key: string]: TokenNode }

function deepMerge(target: Record<string, TokenNode>, source: Record<string, TokenNode>): Record<string, TokenNode> {
  const result = { ...target }

  for (const [key, value] of Object.entries(source)) {
    if (
      key in result &&
      typeof result[key] === 'object' &&
      !('value' in result[key]) &&
      typeof value === 'object' &&
      !('value' in value)
    ) {
      result[key] = deepMerge(result[key] as Record<string, TokenNode>, value as Record<string, TokenNode>)
    } else {
      result[key] = value
    }
  }

  return result
}

const tokensJson = deepMerge(
  deepMerge(baseTokens as Record<string, TokenNode>, componentTokens as Record<string, TokenNode>),
  themeTokens as Record<string, TokenNode>,
)

function isTokenValue(val: TokenNode): val is TokenValue {
  return 'value' in val && typeof (val as TokenValue).value === 'string'
}

function flattenTokens(obj: Record<string, TokenNode>, prefix = ''): Record<string, string> {
  const result: Record<string, string> = {}

  for (const [key, val] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}-${key}` : key

    if (isTokenValue(val)) {
      result[newKey] = val.value
    } else {
      Object.assign(result, flattenTokens(val as Record<string, TokenNode>, newKey))
    }
  }

  return result
}

function resolveReferences(tokens: Record<string, string>): Record<string, string> {
  const resolved: Record<string, string> = { ...tokens }
  const maxIterations = 50

  for (let i = 0; i < maxIterations; i++) {
    let hasUnresolved = false

    for (const [key, value] of Object.entries(resolved)) {
      resolved[key] = value.replace(/\{([^}]+)\}/g, (original, ref: string) => {
        const refKey = ref.split('.').join('-')
        const refValue = resolved[refKey]

        if (refValue && refValue !== original && !refValue.includes('{')) {
          return refValue
        }

        if (refValue && refValue !== original) {
          hasUnresolved = true
        }
        return original
      })
    }

    if (!hasUnresolved) break
  }

  return resolved
}

function tokensToScss(tokens: Record<string, string>): string {
  return Object.entries(tokens)
    .map(([key, value]) => `$${key}: ${value};`)
    .join('\n')
}

export function buildFlatTokens(designTokens?: Record<string, TokenNode>): Record<string, string> {
  const tokens = designTokens || tokensJson
  const flat = flattenTokens(tokens)
  return resolveReferences(flat)
}

export function buildScssTokens(designTokens?: Record<string, TokenNode>): string {
  const tokens = designTokens || tokensJson
  const flat = flattenTokens(tokens)
  const resolved = resolveReferences(flat)
  return tokensToScss(resolved)
}

export const tokens = buildFlatTokens(tokensJson as Record<string, TokenNode>)
