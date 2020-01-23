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

let startObjs = [
  {rank: 1, title: 'The Phantom Menace'},
  {rank: 2, title: 'Attack of the Clones'},
  {rank: 3, title: 'Revenge of the Sith'},
  {rank: 4, title: 'A New Hope'},
  {rank: 5, title: 'Empire Strikes Back'},
  {rank: 6, title: 'Return of the Jedi'}
]

class MovieRanker extends Component {
  state = {
    items: startObjs
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
    console.log('props?', this.state)
    return (
      <div className="movie-list">
        <main>
          <h3>Franchise Title</h3>
          <ul>
            {this.state.items.map((item, idx) => (
              <li key={item.rank} onDragOver={() => this.onDragOver(idx)}>
                <div
                  className="drag"
                  draggable
                  onDragStart={e => this.onDragStart(e, idx)}
                  onDragEnd={this.onDragEnd}
                >
                  <span className="content">{item.title}</span>
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
