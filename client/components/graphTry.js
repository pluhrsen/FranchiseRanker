// import React, {Component} from 'react'
// import {connect} from 'react-redux'
// import * as d3 from 'd3'
// import {fetchMovieFranchise} from '../store/movie'
// import {fetchSingleFranchise} from '../store/singleFranchise'

// let size = [400, 400]

// const initials = function(str) {
//   let result = ''
//   for (let i = 0; i < str.length; i++) {
//     if (i === 0 || str[i - 1] === ' ') {
//       result += str[i]
//     }
//   }
//   return result.toUpperCase()
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
//     let movieRating = []
//     let titles = []
//     let data = []
//     const movies = this.props.movies
//     if (this.props.movies) {
//       movies.map(movie => {
//         movieRating.push(movie.rtRanking)
//         // titles.push(initials(movie.title))
//         titles.push(movie.title)
//         data.push({title: movie.title, value: movie.rtRanking})
//       })
//     }
//     // let movieRating = {data: movieArr, yAxisAttribute: "value", xAxisAttribute: "title"}
//     console.log('props?', movieRating)
//     const node = this.node
//     // const dataMax = max(movieRating)
//     d3.select('label')
//       .selectAll('text')
//       .data(titles)
//       .enter()
//       .append('text')
//       .text(d => d)
//       .attr('x', (d, i) => i * 70)
//       .attr('y', (d, i) => 10 * d)

//     const yScale = d3
//       .scaleLinear()
//       .domain([0, 100])
//       .range([0, size[1]])
//     d3.select(node)
//       .selectAll('rect')
//       .data(movieRating)
//       .enter()
//       .append('rect')

//     d3.select(node)
//       .selectAll('rect')
//       .data(movieRating)
//       .exit()
//       .remove()

//     d3.select(node)
//       .selectAll('rect')
//       .data(movieRating)
//       .style('fill', '#fe9922')
//       .attr('x', (d, i) => i * 25)
//       .attr('y', d => size[1] - yScale(d))
//       .attr('height', d => yScale(d))
//       .attr('width', 20)
//   }
//   render() {
//     const franchise = this.props.franchise
//     return (
//       <div id="graph-page">
//         <main>
//           <img src={franchise.imageUrl} />
//           <svg
//             ref={node => (this.node = node)}
//             width={650}
//             height={400}
//             id="graph"
//           ></svg>
//           <label id="graph-label"></label>
//         </main>
//       </div>
//     )
//   }
// }

// // return <div>Graph go HERE</div>

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
