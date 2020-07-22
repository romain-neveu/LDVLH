import React from 'react';

class BookEditor extends React.Component {
	constructor(props) {
		super(props);
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

	find_path_to_death(parag) {
		let path_to_death = {shortest: 0, longest: 0};
		if(!this.is_death(parag)) {
			let links_paths_to_death = [];
			parag.links.forEach(link => {
				links_paths_to_death.push(this.find_path_to_death(this.find_paragraph(link.number)));				
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

        function render_paragraph(parag) {

            const lines = parag.text.map((line) => 
	            <p>{line}</p>
            );
            const links = parag.links.map((link) => 
                <a href={"#p" + link.number}>{link.text}, rendez-vous au paragraphe {link.number}</a>
            );

        return (
                <section id={"p" + parag.number}>
                    <h3>Paragraphe {parag.number}</h3>
                    <div>{lines}</div>
	                <nav>{links}</nav>
                </section>
            )
        };

        const paragraphs = this.props.book.paragraphs.map((parag) => 
            render_paragraph(parag)
        );

        const path_to_death = () => {
			let death = this.find_path_to_death(this.props.book.paragraphs[0]);
			if (death.longest === 0) {
				return <i>Fin</i>
			}
			else {
				return <i>Fin: entre {death.shortest} et {death.longest} choix</i>
			}
		};

		return (
		    <div className="BookEditor">
                <h1>Editeur de livre - Le livre dont vous êtes l'auteur</h1>
                <ul>{paragraphs}</ul>
                <div>{path_to_death()}</div>
                <textarea>{JSON.stringify(this.props.book, null, 2)}</textarea>
			</div>
	 	);
	}

}

export default BookEditor;
