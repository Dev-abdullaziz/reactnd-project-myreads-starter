import React,{Component} from 'react';
import * as BooksAPI from './BooksAPI'

class Book extends Component{
    state = {
       book:{},
    }
    
    shelves = [{value:'currentlyReading',text:'Currently Reading'},{value:'wantToRead',text:'Want to Read'},{value:'read',text:'Read'},{value:'none',text:'None'}]

    componentDidMount() {
        BooksAPI.get(this.props.book).then(data => this.setState({book: {...data},currentShelf:data.shelf})) 
    }



    render() {
        return( 
            <div className="book">
                <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${this.state.book.imageLinks? this.state.book.imageLinks.thumbnail: ''}")` }}></div>
                <div className="book-shelf-changer">
                    <select onChange={(event) => this.props.moveToShelf(this.state.book,event)} >
                        <option value="move" disabled>Move to...</option>
                        {this.shelves.map(shelf => 
                            (shelf.value === this.state.book.shelf ? 
                            <option key={shelf.value} value={shelf.value} selected>{shelf.text}</option> :
                            <option key={shelf.value} value={shelf.value}>{shelf.text}</option>)
                        )}
                        {/* <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option> */}
                    </select>
                </div>
                </div>
                <div className="book-title">{this.state.book.title}</div>
                <div className="book-authors">{this.state.book.authors ? this.state.book.authors.map(author => <p key={author}>{author}</p> ):''}</div>
            </div>
        )
    }
}

export default Book;