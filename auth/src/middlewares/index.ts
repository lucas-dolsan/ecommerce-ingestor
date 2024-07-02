import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cors from 'cors'

function jsonParser() {
  return express.json()
}

function enableCors() {
  return cors();
}

export default {
  jsonParser,
  enableCors
}