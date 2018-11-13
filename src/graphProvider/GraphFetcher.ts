import * as axios from 'axios'
const nc = require('node-cache')
import { INode } from '../domain/model'

export class GraphFetcher {

  private readonly cache: any
  private readonly CACHE_KEY = 'graph'

  constructor(private graphUrl: string) {
    if (process.env.CACHE_TTL_SECONDS) {
      const cacheTTLSeconds = Number(process.env.CACHE_TTL_SECONDS)
      this.cache = new nc({ stdTTL: cacheTTLSeconds })
    } else {
      this.cache = new nc()
    }
  }

  async fetchGraph(): Promise<INode> {
    if (this.isProduction()) {
      let cachedResponse = this.cache.get(this.CACHE_KEY)
      if (cachedResponse) {
        console.log('using cached graph')
        return cachedResponse as INode
      }
    }

    console.log('fetching graph via url ' + this.graphUrl)
    try {
      let response = await axios.default.get(this.graphUrl)
      let graph = response.data
      if (this.isProduction()) {
        console.log('caching graph')
        this.cache.set(this.CACHE_KEY, graph)
      }
      return graph
    } catch (error) {
      console.log('error: ' + error)
    }

    return null
  }

  private isProduction() {
    return process.env.NODE_ENV && process.env.NODE_ENV === 'production'
  }
}
