import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchMovieFranchise, updateMovieRanks} from '../store/movie'
import {fetchSingleFranchise} from '../store/singleFranchise'

class MovieRanker extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    items: []
  }

  onDragStart = (e, index) => {
    this.draggedItem = this.state.items[index]
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/html', e.target.parentNode)
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20)
  }

  onDragOver = index => {
    const draggedOverItem = this.state.items[index]

    // if the item is dragged over itself, ignore
    if (this.draggedItem === draggedOverItem) {
      return
    }

    // filter out the currently dragged item
    let items = this.state.items.filter(item => item !== this.draggedItem)

    // add the dragged item after the dragged over item
    items.splice(index, 0, this.draggedItem)

    ///reset the rank for all values based on their new order and set local state//
    for (let i = 0; i < items.length; i++) {
      items[i].rank = i + 1
    }

    this.setState({items})
  }

  onDragEnd = () => {
    this.draggedIdx = null

    let items = this.state.items
    const franchiseId = this.props.location.pathname.slice(12)
    this.props.updateMovieRanks({list: items, franchiseId})
  }
  componentDidMount() {
    this.props.fetchMovieFranchise(this.props.location.pathname.slice(12))
    this.props.fetchSingleFranchise(this.props.location.pathname.slice(12))
  }
  componentDidUpdate() {
    if (this.props.movies && this.state.items !== this.props.movies) {
      let newItems = this.props.movies
      newItems.sort(compare)
      this.setState({items: newItems})
    }
  }
  render() {
    const franchise = this.props.franchise
    return (
      <div id="movie-list-page">
        <div className="movie-list">
          <main>
            <h3>{franchise.title}</h3>
            <ul>
              {this.state.items.map((item, idx) => (
                <li key={item.id} onDragOver={() => this.onDragOver(idx)}>
                  <div
                    className="drag"
                    draggable
                    onDragStart={e => this.onDragStart(e, idx)}
                    onDragEnd={this.onDragEnd}
                  >
                    <span className="content">
                      {item.rank} {item.title}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <div>
              <Link to={`/franchises/${franchise.id}/graph`}>Go to Graph</Link>
            </div>
            <div>
              <div>Uh Oh...they made another one</div>
              <button>Add Movie to List</button>
            </div>
          </main>
        </div>
      </div>
    )
  }
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

const mapState = state => {
  return {
    movies: state.movies,
    franchise: state.franchise
  }
}

const mapDispatch = dispatch => {
  return {
    fetchMovieFranchise: id => dispatch(fetchMovieFranchise(id)),
    updateMovieRanks: info => dispatch(updateMovieRanks(info)),
    fetchSingleFranchise: id => dispatch(fetchSingleFranchise(id))
  }
}
export default connect(mapState, mapDispatch)(MovieRanker)
