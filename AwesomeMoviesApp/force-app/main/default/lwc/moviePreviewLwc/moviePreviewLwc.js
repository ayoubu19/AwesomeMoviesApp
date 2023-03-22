import { LightningElement, wire } from 'lwc';
import { subscribe, unsubscribe, MessageContext } from 'lightning/messageService';
import movieSelected from '@salesforce/messageChannel/MovieSelected__c';

export default class MoviePreviewLwc extends LightningElement {

    subscription = null;
    movie = null;
    stars = [];
    
    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        this.subscription = subscribe(
            this.messageContext,
            movieSelected,
            (message) => {
                this.handleMoviesSelection(message.movie);
                //this.generateStars(message.movie);
            });
    }

    disconnectedCallback() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

   handleMoviesSelection(movie) {
        this.movie = movie;
    }
}