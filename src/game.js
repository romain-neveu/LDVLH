import React from 'react';
import Book from './book.js';
import story from './books/ronin_malgre_vous.json';
import BookEditor from './book_editor.js';

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			action: 'play'
		};
	};


	render() {
        let action, edit;
        if (this.state.action === 'edit') {
            action = <BookEditor book={story} />;
            edit = '';
        }
        else {
            action = <Book book={story} />;
            edit = <button onClick={() => this.setState({action: 'edit'})}>Ecrire le livre</button>;
        }
		return (
		    <div className="Game">
                {action}
                {edit}
			</div>
	 	);
	}
}

export default Game;
