import React, { Component } from 'react'
import PropTypes from 'prop-types'
import noImage from './no_image.jpg'

class Book extends Component{

  static propTypes = {
    bookData: PropTypes.object.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
  }

  shelfs = [
    {name : "Currently Reading" , value: 'currentlyReading'},
    {name : "Want to Read" , value: 'wantToRead' },
    {name : "Read" , value: 'read' }
   ]


  render(){

    const { bookData, onUpdateShelf } = this.props

    return(

      <li key={bookData.id}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover"
            style={{ width: 128, height: 193,
            backgroundImage: `url("${

              bookData.imageLinks ? bookData.imageLinks.thumbnail :noImage

            }")`  }}>

            </div>
            <div className="book-shelf-changer">
              <select
              value={bookData.shelf}
              onChange={(event)=> onUpdateShelf(bookData, event.target.value)}>
                <option value="none" disabled>Move to...</option>
                <option value="none">None</option>
                { this.shelfs.map(shelf =>

                  <option key={shelf.value}
                     value={shelf.value}>{shelf.name}</option>


                )}


              </select>
            </div>
          </div>
          <div className="book-title">{bookData.title}</div>
          <div className="book-authors">{bookData.authors}</div>
        </div>
      </li>
    )

  }

}


export default Book
