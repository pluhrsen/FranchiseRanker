import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchFranchises} from '../store/franchise'
import {Link} from 'react-router-dom'

class Franchises extends Component {
  componentDidMount() {
    this.props.fetchFranchises()
    console.log('props?', this.props)
  }
  render() {
    const franchises = this.props.franchises
    return (
      <div id="franchise-page">
        {/* <div>Franchises</div> */}
        {franchises.map(franchise => {
          return (
            <div key={franchise.id} id="franchise-link">
              <Link to={`/franchises/${franchise.id}`}>
                <img src={franchise.imageUrl} />
              </Link>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapState = state => {
  return {
    franchises: state.franchises
  }
}

const mapDispatch = dispatch => {
  return {
    fetchFranchises: () => dispatch(fetchFranchises())
  }
}
export default connect(mapState, mapDispatch)(Franchises)
