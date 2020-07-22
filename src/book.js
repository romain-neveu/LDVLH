import React from 'react';

class Book extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			number: 1
		};
	};

	find_path_to_death(parag) {
		let path_to_death = {shortest: 0, longest: 0};
		if(!this.is_death(parag)) {
			let links_paths_to_death = [];
			parag.links.forEach(link => {
				links_paths_to_death.push(this.find_path_to_death(this.props.book.paragraphs[link.number]));				
			});
			path_to_death.shortest = 1 + Math.min(...links_paths_to_death.map((path) => path.shortest));
			path_to_death.longest = 1 + Math.max(...links_paths_to_death.map((path) => path.longest));
		}
		return path_to_death;
	}

	is_death(parag) {
		return this.has_no_link(parag) || this.has_link_to_start(parag);
	}

	has_no_link(parag) {
		return !parag.links.length;
	}

	has_link_to_start(parag) {
		let has_link_to_start = false;
		parag.links.forEach(link => {
			if(link.number === 1) {
				has_link_to_start = true;
			}
		});
		return has_link_to_start;
	}

	render() {
		const parag = this.props.book.paragraphs[this.state.number];

	    const lines = parag.text.map((line) => 
	        <p>{line}</p>
	    );
	    const links = parag.links.map((link) => 
	        <a onClick={() => this.setState({number: link.number})}>{link.text}, rendez-vous au paragraphe {link.number}</a>
		);

		const path_to_death = () => {
			let death = this.find_path_to_death(parag);
			if (death.longest === 0) {
				return <i>Fin</i>
			}
			else {
				return <i>Fin: entre {death.shortest} et {death.longest} choix</i>
			}
		};

	    const paragraph = 
		  <section>
	        <h2>Paragraphe {this.state.number}</h2>
	        <div>{lines}</div>
	        <nav>{links}</nav>
			<div>{path_to_death()}</div>
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
