import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchMovieFranchise} from '../store/movie'

class MovieRanker extends Component {
  componentDidMount() {
    this.props.fetchMovieFranchise(this.props.location.pathname.slice(12))
    console.log('props?', this.props)
  }
  render() {
    return <div>Movies List goes here</div>
  }
}

const mapState = state => {
  return {
    movies: state.movies
  }
}

const mapDispatch = dispatch => {
  return {
    fetchMovieFranchise: id => dispatch(fetchMovieFranchise(id))
  }
}
export default connect(mapState, mapDispatch)(MovieRanker)
