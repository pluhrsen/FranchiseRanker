import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchMovieFranchise, updateMovieRanks} from '../store/movie'
import {fetchSingleFranchise} from '../store/singleFranchise'

let startObjs = [
  {rank: 2, id: 2, title: 'A New Hope'},
  {rank: 1, id: 1, title: 'Empire Strikes Back'},
  {rank: 3, id: 3, title: 'Return of the Jedi'}
]

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
    // items[index].rank = index + 1

    ///ex rank: 2 so need to update every instance 2index (3rd item) to length//
    for (let i = 0; i < items.length; i++) {
      if (items[i].rank !== i + 1) {
        items[i].rank = i + 1
      }
    }

    const franchiseId = this.props.location.pathname.slice(12)

    this.props.updateMovieRanks({list: items, franchiseId})

    this.setState({items})
  }

  onDragEnd = () => {
    this.draggedIdx = null
  }
  componentDidMount() {
    this.props.fetchMovieFranchise(this.props.location.pathname.slice(12))
    this.props.fetchSingleFranchise(this.props.location.pathname.slice(12))
    // if (this.props.movies) {
    //   this.props.movies.map(movie => {
    //     movieArr.push(movie)
    //   })
    // }
    // this.setState({movies: movieArr})
    // this.setState((state, props) => ({
    //   items: this.props.movies
    // }))
    // this.setState({items: this.props.movies})
  }
  componentDidUpdate() {
    if (this.props.movies && this.state.items !== this.props.movies) {
      let newItems = this.props.movies
      newItems.sort(compare)
      this.setState({items: newItems})
    }
  }
  render() {
    console.log('render?', this)
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
