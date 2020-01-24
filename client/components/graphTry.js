// import React, {Component} from 'react'
// import {connect} from 'react-redux'
// import * as d3 from 'd3'
// import {fetchMovieFranchise} from '../store/movie'
// import {fetchSingleFranchise} from '../store/singleFranchise'

// const initials = function(str) {
//   let result = ''
//   for (let i = 0; i < str.length; i++) {
//     if (i === 0 || str[i - 1] === ' ') {
//       result += str[i]
//     }
//   }
//   return result.toUpperCase()
// }

// function compare(a, b) {
//   const rankA = a.rank
//   const rankB = b.rank

//   let comparison = 0
//   if (rankA > rankB) {
//     comparison = 1
//   } else if (rankA < rankB) {
//     comparison = -1
//   }
//   return comparison
// }

// class MovieGraph extends Component {
//   constructor(props) {
//     super(props)
//     this.createBarChart = this.createBarChart.bind(this)
//   }
//   componentDidMount() {
//     const locationId = this.props.location.pathname.slice(12, -6)
//     this.props.fetchMovieFranchise(locationId)
//     this.props.fetchSingleFranchise(locationId)
//     this.createBarChart()
//   }
//   componentDidUpdate() {
//     this.createBarChart()
//   }
//   createBarChart() {
//     ///data for the chart that gets sorted///
//     let data = []
//     const movies = this.props.movies
//     if (this.props.movies) {
//       movies.map(movie => {
//         data.push({
//           title: initials(movie.title),
//           value: movie.rtRanking
//           // rank: movie.rank
//         })
//       })
//       // data.sort(compare)
//     }

//     //helper variables for the graph///
//     const margin = 55
//     const width = 650 - 2 * margin
//     const height = 400 - 2 * margin

//     const svg = d3.select('svg')
//     const chart = svg
//       .append('g')
//       .attr('transform', `translate(${margin}, ${margin})`)

//     ////creating Y axis label
//     const yScale = d3
//       .scaleLinear()
//       .domain([0, 100])
//       .range([height, 0])

//     ///adding label to Y Axis///
//     chart.append('g').call(d3.axisLeft(yScale))

//     ///creating X axis label///
//     const xScale = d3
//       .scaleBand()
//       .range([0, width])
//       .domain(data.map(s => s.title))
//       .padding(0.2)

//     ///adding label to X Axis///
//     chart
//       .append('g')
//       .attr('transform', `translate(0, ${height})`)
//       .call(d3.axisBottom(xScale))

//     ///creates the bars for the chart///
//     chart
//       .selectAll()
//       .data(data)
//       .enter()
//       .append('rect')
//       .style('fill', '#fe9922')
//       .attr('x', s => xScale(s.title))
//       .attr('y', s => yScale(s.value))
//       .attr('height', s => height - yScale(s.value))
//       .attr('width', xScale.bandwidth())

//     ///adds the horizontal lines to the graph///
//     chart
//       .append('g')
//       .attr('class', 'grid')
//       .call(
//         d3
//           .axisLeft()
//           .scale(yScale)
//           .tickSize(-width, 0, 0)
//           .tickFormat('')
//       )
//     ///axis labels//
//     svg
//       .append('text')
//       .attr('x', -(height / 2) - margin)
//       .attr('y', margin / 2.4)
//       .attr('transform', 'rotate(-90)')
//       .attr('text-anchor', 'middle')
//       .text('Rotten Tomato Rating (%)')

//     svg
//       .append('text')
//       .attr('x', width / 2 + margin)
//       .attr('y', 395)
//       .attr('text-anchor', 'middle')
//       .text('Your Ranking VS Rotten Tomatoes')
//   }
//   render() {
//     const franchise = this.props.franchise
//     return (
//       <div id="graph-page">
//         <main>
//           <img src={franchise.imageUrl} />
//           <svg width={650} height={400} id="graph" />
//           <label id="graph-label" />
//         </main>
//       </div>
//     )
//   }
// }

// const mapState = state => {
//   return {
//     movies: state.movies,
//     franchise: state.franchise
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     fetchMovieFranchise: id => dispatch(fetchMovieFranchise(id)),
//     fetchSingleFranchise: id => dispatch(fetchSingleFranchise(id))
//   }
// }
// export default connect(mapState, mapDispatch)(MovieGraph)
