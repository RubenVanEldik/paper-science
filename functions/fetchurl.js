import fetch from 'node-fetch'
import { parse } from 'node-html-parser'
import validUrl from 'valid-url'

// Retrieve all valid scraping domains from the .env file
const DOMAINS = Object
  .keys(process.env)
  .filter(key => key.match(/^SCRAPING_URL\d+$/))
  .map(key => process.env[key])
  .filter(url => validUrl.isUri(url))
  .sort(() => 0.5 - Math.random()) // Shuffle the array with domains so all domains get used evenly (not perfect shuffle, but fine for this application)

exports.handler = async ({ httpMethod, queryStringParameters }) => {
  if (httpMethod !== 'GET') {
    // Only allow GET
    return {
      statusCode: 405,
      body: 'Method Not Allowed'
    }
  } else if (!queryStringParameters.query) {
    // Check if there is a query parameter
    return {
      statusCode: 400,
      body: 'Bad Request'
    }
  }

  // Loop over all scraping domains
  for (const domain of DOMAINS) {
    try {
      // Fetch the page
      const res = await fetch(`${domain}/${encodeURIComponent(queryStringParameters.query)}`)
      const body = await res.text()

      // Find the src of the PDF
      const root = parse(body)
      const article = root?.querySelector('#article')
      const iframe = article?.querySelector('iframe')
      const src = iframe?.getAttribute('src')

      // Return the src of the PDF if it is a valid URL
      if (src && validUrl.isUri(src)) {
        return {
          statusCode: 200,
          body: src
        }
      }
    } catch (err) {
      console.warn(err)
    }
  }
  return {
    statusCode: 404,
    body: 'Not Found'
  }
}
