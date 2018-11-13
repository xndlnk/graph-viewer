import { GraphFetcher } from './GraphFetcher'
import { Node, INode } from '../domain/model'

export interface GraphProvider {
  loadGraph(): Promise<Node>
}

export interface Options {
  useLast?: boolean
}

export class GraphProviderWithFallback implements GraphProvider {

  private lastFetchedGraph: INode = null
  private lastFetchedTimestamp: Date = null

  constructor(private options: Options, private graphFetcher: GraphFetcher) {}

  async loadGraph(): Promise<Node> {
    let rawGraph: INode = null

    if (this.options.useLast) {
      console.log('using last fetched graph from memory')
      rawGraph = this.lastFetchedGraph
    }

    if (!rawGraph) {
      rawGraph = await this.graphFetcher.fetchGraph()
      if (rawGraph) {
        this.lastFetchedGraph = rawGraph
        this.lastFetchedTimestamp = new Date()
      }
    }

    return Node.ofRawNode(rawGraph)
  }

  getMessageForFallbackToLastFetchedGraph(currentUrl: string) {
    if (!this.lastFetchedGraph) {
      return 'could not fetch the current system :/'
    }

    const url = currentUrl.lastIndexOf('?useLast=1') > 0 ? currentUrl : currentUrl + '?useLast=1'
    const time = this.lastFetchedTimestamp.toJSON()
    return 'could not fetch the current graph. '
      + 'the last successful fetch occured at time ' + time + '. '
      + 'you can view this last fetch via the following url: '
          + `<a href="${url}">${url}</a>`
  }

}
