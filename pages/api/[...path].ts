// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import httpProxy from 'http-proxy'

// type Data = {
//   name: string
// }

// Disable parser, nextjs server will stream body without body parsing
export const config = {
  api: {
    bodyParser: false,
  },
}

const proxy = httpProxy.createProxyServer()

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  // wrap promise to solve issue: 'API resolved without sending a response for /api/...'
  return new Promise((resolve) => {
    // clean up cookies
    req.headers.cookie = ''

    proxy.web(req, res, {
      target: process.env.API_URL,
      changeOrigin: true,
      selfHandleResponse: false,
    })

    proxy.once('proxyRes', () => {
      resolve(true)
    })
  })

  // GET http://localhost:3001/api/students <- WORKED !
}
