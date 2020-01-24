import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as d3 from 'd3'
import {fetchMovieFranchise} from '../store/movie'
import {fetchSingleFranchise} from '../store/singleFranchise'

let size = [400, 400]

const initials = function(str) {
  let result = ''
  for (let i = 0; i < str.length; i++) {
    if (i === 0 || str[i - 1] === ' ') {
      result += str[i]
    }
  }
  return result.toUpperCase()
}

function compare(a, b) {
  const rankA = a.rank
  const rankB = b.rank

  let comparison = 0
  if (rankA > rankB) {
    comparison = 1
  } else if (rankA < rankB) {
    comparison = -1
  }
  return comparison
}

class MovieGraph extends Component {
  constructor(props) {
    super(props)
    this.createBarChart = this.createBarChart.bind(this)
  }
  componentDidMount() {
    const locationId = this.props.location.pathname.slice(12, -6)
    this.props.fetchMovieFranchise(locationId)
    this.props.fetchSingleFranchise(locationId)
    this.createBarChart()
  }
  componentDidUpdate() {
    this.createBarChart()
  }
  createBarChart() {
    let movieRating = []
    let titles = []
    let data = []
    const movies = this.props.movies
    if (this.props.movies) {
      movies.map(movie => {
        movieRating.push(movie.rtRanking)
        // titles.push(initials(movie.title))
        titles.push(movie.title)
        data.push({
          title: initials(movie.title),
          value: movie.rtRanking,
          rank: movie.rank
        })
      })
      data.sort(compare)
    }
    // let movieRating = {data: movieArr, yAxisAttribute: "value", xAxisAttribute: "title"}
    console.log('props?', movieRating)
    const node = this.node
    // const dataMax = max(movieRating)

    const margin = 55
    const width = 650 - 2 * margin
    const height = 400 - 2 * margin

    const svg = d3.select('svg')

    const chart = svg
      .append('g')
      .attr('transform', `translate(${margin}, ${margin})`)

    // d3.select('label')
    //   .selectAll('text')
    //   .data(titles)
    //   .enter()
    //   .append('text')
    //   .text(d => d)
    //   .attr('x', (d, i) => i * 70)
    //   .attr('y', (d, i) => 10 * d)

    const yScale = d3
      .scaleLinear()
      .domain([0, 100])
      .range([height, 0])

    // d3.select('g').call(d3.axisLeft(yScale))

    chart.append('g').call(d3.axisLeft(yScale))

    const xScale = d3
      .scaleBand()
      .range([0, width])
      .domain(data.map(s => s.title))
      .padding(0.2)

    chart
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale))

    chart
      .selectAll()
      .data(data)
      .enter()
      .append('rect')
      .attr('x', s => xScale(s.title))
      .attr('y', s => yScale(s.value))
      .attr('height', s => height - yScale(s.value))
      .attr('width', xScale.bandwidth())
  }
  render() {
    const franchise = this.props.franchise
    return (
      <div id="graph-page">
        <main>
          <img src={franchise.imageUrl} />
          <svg
            ref={node => (this.node = node)}
            width={650}
            height={400}
            id="graph"
          />
          <label id="graph-label" />
        </main>
      </div>
    )
  }
}

// return <div>Graph go HERE</div>

const mapState = state => {
  return {
    movies: state.movies,
    franchise: state.franchise
  }
}

const mapDispatch = dispatch => {
  return {
    fetchMovieFranchise: id => dispatch(fetchMovieFranchise(id)),
    fetchSingleFranchise: id => dispatch(fetchSingleFranchise(id))
  }
}
export default connect(mapState, mapDispatch)(MovieGraph)
