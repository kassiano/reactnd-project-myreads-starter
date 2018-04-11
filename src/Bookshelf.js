
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Book from './Book'
import { BeatLoader } from 'react-spinners'

class Bookshelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired,
    shelfName: PropTypes.string.isRequired
  }


  render(){
    const { books, onUpdateShelf, shelfName, loadingBooks  } = this.props

    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfName}</h2>
        <div className="bookshelf-books">
          <div className='sweet-loading'>
            <BeatLoader
              color={'#60ac5d'}
              loading={loadingBooks}
              />
          </div>
          <ol className="books-grid">


              {books.map( (book) => (

                <Book
                  bookData={book}
                  onUpdateShelf={ onUpdateShelf }
                  key={book.id}
                   />

              ))}


          </ol>
        </div>
      </div>

    )

  }

}


export default Bookshelf
