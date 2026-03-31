import { Response } from 'express'
import { APP_ENV_VALUES } from '@flowfox/shared'

const isDevelopment = process.env.APP_ENV === APP_ENV_VALUES.DEVELOPMENT

export const successResponse = (res: Response, message?: string, data?: any): void => {
  res.status(200).json({
    success: true,
    message: message,
    data,
  })
}

export const createdResponse = (res: Response, message?: string, data?: any): void => {
  res.status(201).json({
    success: true,
    message: message,
    data,
  })
}

export const badRequestResponse = (res: Response, message: string): void => {
  res.status(400).json({
    success: false,
    error: message,
  })
}

export const notAuthenticatedResponse = (res: Response, message: string): void => {
  res.status(401).json({
    success: false,
    error: message,
  })
}

export const forbiddenResponse = (res: Response, message: string): void => {
  res.status(403).json({
    success: false,
    error: message,
  })
}

export const notFoundResponse = (res: Response, message: string): void => {
  res.status(404).json({
    success: false,
    error: message,
  })
}

export const serverFailureResponse = (res: Response, message: string): void => {
  res.status(500).json({
    success: false,
    error: isDevelopment ? message : undefined,
  })
}

export const serviceUnavailableResponse = (res: Response, message: string): void => {
  res.status(503).json({
    success: false,
    error: isDevelopment ? message : undefined,
  })
}
