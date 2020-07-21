import React from 'react';

class Book extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			number: 1
		};
	};

	render() {
		const parag = this.props.book.paragraphs[this.state.number];

	    const lines = parag.text.map((line) => 
	        <p>{line}</p>
	    );
	    const links = parag.links.map((link) => 
	        <a onClick={() => this.setState({number: link.number})}>{link.text}, rendez-vous au paragraphe {link.number}</a>
	    );
	    const paragraph = 
		  <section>
	        <h2>Paragraphe {this.state.number}</h2>
	        <div>{lines}</div>
	        <nav>{links}</nav>
	      </section>
		;
		return (
		    <div className="Book">
		      <h1>{this.props.book.title}</h1>
		      {paragraph}
			</div>
	 	);
	}
}

export default Book;
