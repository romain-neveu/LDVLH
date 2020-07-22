import React from 'react';

class Book extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			number: 1
		};
	};

	find_paragraph(number) {
		let parag = this.props.book.paragraphs[0]
		this.props.book.paragraphs.forEach(p => {
			if (p.number === number) {
				parag = p;
			}
		});
		return parag;
	}
	render() {
		const parag = this.find_paragraph(this.state.number);

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
