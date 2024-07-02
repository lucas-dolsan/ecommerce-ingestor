import express, { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import multer from 'multer';
import path from 'path';
import cors from 'cors'


function auth() {
  return async (req: Request | any, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).send('Access denied');
      }
  
      const token = authHeader.split(' ')[1];
      const authServiceUrl = process.env.AUTH_SERVICE_URL;

      const response = await axios.post(`${authServiceUrl}/auth/verify`, { token });
      
      console.log('auth middleware:', `${authServiceUrl}/auth/verify`, { token })

      if (response.status === 200) {
        req.user = response.data;
        next();
      } else {
        res.status(401).send('Invalid token');
      }
    } catch (error) {
      console.error('Error authenticating token:', error);
      res.status(401).send('Invalid token');
    }
  }
}

function fileUpload() {
  const upload = multer({ dest: path.join('/app/data') });
  return upload.single('file');
}

function jsonParser() {
  return express.json()
}

function enableCors() {
  return cors();
}

export default {
  auth,
  fileUpload,
  jsonParser,
  enableCors
}