import { Hono } from 'hono/quick'
import { cors } from 'hono/cors'
import { compress } from 'hono/compress'
import { csrf } from 'hono/csrf'
import { timeout } from 'hono/timeout'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import {
  trimTrailingSlash,
} from 'hono/trailing-slash'
import { bodyLimit } from 'hono/body-limit'
import { secureHeaders } from 'hono/secure-headers'

const app = new Hono({ strict: true })


app.use(cors())
app.use(compress())
app.use(csrf())
app.use(timeout(2000))
app.use(logger())
app.use(prettyJSON())
app.use(secureHeaders())
app.use(trimTrailingSlash())


app.get('/', (c) => {
  return c.html('Hello fastly!')
})
app.get('/uma', (c) => c.text('xica!'))
app.get('/two', (c) => {
  return c.json({ message: 'car!' })
})
app.get('/about/me', (c) => c.text('Without Trailing Slash'))


app.fire()
