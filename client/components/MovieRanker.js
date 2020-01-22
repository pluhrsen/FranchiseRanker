import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchMovieFranchise} from '../store/movie'

let startItems = [
  'The Phantom Menace',
  'Attack of the Clones',
  'Revenge of the Sith',
  'A New Hope',
  'Empire Strikes Back',
  'Return of the Jedi',
  'The Force Awakens',
  'The Last Jedi',
  'The Rise of Skywalker'
]

class MovieRanker extends Component {
  state = {
    items: startItems
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

    this.setState({items})
  }

  onDragEnd = () => {
    this.draggedIdx = null
  }
  componentDidMount() {
    this.props.fetchMovieFranchise(this.props.location.pathname.slice(12))
  }
  render() {
    return (
      <div className="movie-list">
        <main>
          <h3>Franchise Title</h3>
          <ul>
            {this.state.items.map((item, idx) => (
              <li key={item} onDragOver={() => this.onDragOver(idx)}>
                <div
                  className="drag"
                  draggable
                  onDragStart={e => this.onDragStart(e, idx)}
                  onDragEnd={this.onDragEnd}
                >
                  <span className="content">{item}</span>
                </div>
              </li>
            ))}
          </ul>
        </main>
      </div>
    )
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
