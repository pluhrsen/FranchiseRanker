import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchMovieFranchise, updateMovieRanks} from '../store/movie'

let startObjs = [
  {rank: 2, id: 2, title: 'A New Hope'},
  {rank: 1, id: 1, title: 'Empire Strikes Back'},
  {rank: 3, id: 3, title: 'Return of the Jedi'}
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
    // items[index].rank = index + 1

    ///ex rank: 2 so need to update every instance 2index (3rd item) to length//
    let newRank = index + 1
    for (let i = 0; i < items.length; i++) {
      if (items[i].rank !== i + 1) {
        items[i].rank = i + 1
      }
    }

    // if (newRank <= items[index].rank) {
    //   items[index].rank = newRank
    //   for (let i = newRank; i < items.length; i++) {
    //     items[i].rank = i + 1
    //   }
    // } else {
    //   items[index].rank = newRank
    //   for (let j = index; j >= 0; j--) {
    //     items[j].rank = j - 1
    //   }
    // }
    this.props.updateMovieRanks({list: items})

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
    fetchMovieFranchise: id => dispatch(fetchMovieFranchise(id)),
    updateMovieRanks: info => dispatch(updateMovieRanks(info))
  }
}
export default connect(mapState, mapDispatch)(MovieRanker)
