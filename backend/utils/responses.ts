import { Response } from 'express'

export function successResponse(res: Response, message?: string, data?: any): void {
  res.status(200).json({
    message: message,
    data,
  })
}

export function createdResponse(res: Response, message?: string, data?: any): void {
  res.status(201).json({
    message: message,
    data,
  })
}

export function badRequestResponse(res: Response, message: string): void {
  res.status(400).json({
    error: message,
  })
}

export function notFoundResponse(res: Response, message: string): void {
  res.status(404).json({
    error: message,
  })
}

export function errorResponse(res: Response, message: string): void {
  res.status(500).json({
    error: message,
  })
}
