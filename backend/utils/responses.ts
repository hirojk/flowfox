import { Response } from 'express'
import { APP_ENV } from '@flowfox/shared'

export function successResponse(res: Response, message?: string, data?: any): void {
  res.status(200).json({
    success: true,
    message: message,
    data,
  })
}

export function createdResponse(res: Response, message?: string, data?: any): void {
  res.status(201).json({
    success: true,
    message: message,
    data,
  })
}

export function badRequestResponse(res: Response, message: string): void {
  res.status(400).json({
    success: false,
    error: message,
  })
}

export function notAuthenticatedResponse(res: Response, message: string): void {
  res.status(401).json({
    success: false,
    error: message,
  })
}

export function forbiddenResponse(res: Response, message: string): void {
  res.status(403).json({
    success: false,
    error: message,
  })
}

export function notFoundResponse(res: Response, message: string): void {
  res.status(404).json({
    success: false,
    error: message,
  })
}

export function serverFailureResponse(res: Response, message: string): void {
  res.status(500).json({
    success: false,
    error: process.env.APP_ENV === APP_ENV.DEVELOPMENT ? message : undefined,
  })
}

export function serviceUnavailableResponse(res: Response, message: string): void {
  res.status(503).json({
    success: false,
    error: process.env.APP_ENV === APP_ENV.DEVELOPMENT ? message : undefined,
  })
}
