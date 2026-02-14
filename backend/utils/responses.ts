import { Response } from 'express'

export function successResponse(res: Response, message?: string, data?: any): void {
  res.status(200).json({
    message: message || 'Success',
    data,
  })
}

export function createdResponse(res: Response, message?: string, data?: any): void {
  res.status(201).json({
    message: message || 'Created',
    data,
  })
}

export function badRequestResponse(condition: any, res: Response, message: string): void {
  if (!condition) {
    res.status(400).json({
      error: message,
    })
    return
  }
}

export function notFoundResponse(condition: any, res: Response, message: string): void {
  if (!condition) {
    res.status(404).json({
      error: message,
    })
    return
  }
}

export function errorResponse(res: Response, message: string): void {
  res.status(500).json({
    success: false,
    error: message,
  })
}
