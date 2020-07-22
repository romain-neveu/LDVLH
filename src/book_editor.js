import React from 'react';

class BookEditor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			number: 1
		};
    };
    render() {
 		return (
		    <div className="BookEditor">
                <h1>Editeur de livre - {this.props.book.title}</h1>
			</div>
	 	);
	}

}

export default BookEditor;
