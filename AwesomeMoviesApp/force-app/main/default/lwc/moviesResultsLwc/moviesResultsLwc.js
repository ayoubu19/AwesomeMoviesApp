import { LightningElement, wire } from 'lwc';
import searchMovies from '@salesforce/apex/MovieController.searchMovies';
import { publish,MessageContext } from 'lightning/messageService';
import movieSelected from '@salesforce/messageChannel/MovieSelected__c';

export default class MoviesResultsLwc extends LightningElement {
    searchTerm = '';     
    
    // Load the list of available movies.
    @wire(searchMovies, { searchTerm: '$searchTerm' })
    movies;

	//load Context for lightning messaging service
	@wire(MessageContext)
    messageContext;

    handleSearchTermChange(event) {
        console.log(this.movies);
        // Debouncing this method: do not update the reactive property as
		// long as this function is being called within a delay of 300 ms.
		// This is to avoid a very large number of Apex method calls.
		window.clearTimeout(this.delayTimeout);
		const searchTerm = event.target.value;
		// eslint-disable-next-line @lwc/lwc/no-async-operation
		this.delayTimeout = setTimeout(() => {
			this.searchTerm = searchTerm;
		}, 300);
    }

    get hasResults() {
		return (this.movies.data.length > 0);
	}

	//Publish ProductSelected message
    handleMovieSelected(event) {  
        publish(this.messageContext, movieSelected, {
            movie: event.detail
        }); 
    }
}