// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import httpProxy from 'http-proxy'
import Cookies from 'cookies'

type Data = {
  message: string
}

// Disable parser, nextjs server will stream body without body parsing
export const config = {
  api: {
    bodyParser: false,
  },
}

const proxy = httpProxy.createProxyServer()

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only support POST method' })
  }

  const cookies = new Cookies(req, res)
  cookies.set('access_token')

  res.status(200).json({ message: 'Goodbye, buddy.' })
}
