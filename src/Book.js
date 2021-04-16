import React,{Component} from 'react';


class Book extends Component {
    componentDidMount() {

    }

    categories = [{value:'currentlyReading',text:'Currently Reading'},{value:'wantToRead',text:'Want to Read'},{value:'read',text:'Read'},{value:'none',text:'None'}];

    render() {
        return( 
            <div className="book">
                <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${this.props.book.imageLinks.thumbnail}")` }}></div>
                <div className="book-shelf-changer">
                    <select onChange={(event) => this.props.moveToShelf(this.props.book,event)}>
                        <option value="move" disabled>Move to...</option>
                        {this.categories.map(category => (
                            this.props.book.shelf === category.value) ? 
                            <option value={category.value} selected>{category.text}</option> :
                            <option value={category.value}>{category.text}</option>
                        )}
                    </select>
                </div>
                </div>
                <div className="book-title">{this.props.book.title}</div>
                <div className="book-authors">{this.props.book.authors.map(author => <p key={author}>{author}</p> )}</div>
            </div>
        )
    }
}

export default Book;