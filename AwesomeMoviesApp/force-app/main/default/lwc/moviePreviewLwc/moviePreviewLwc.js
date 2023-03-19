import { LightningElement, wire } from 'lwc';
import { subscribe, unsubscribe, MessageContext } from 'lightning/messageService';
import movieSelected from '@salesforce/messageChannel/MovieSelected__c';

export default class MoviePreviewLwc extends LightningElement {

    //todo: refactor star generation with a better way
    
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
                this.generateStars(message.movie);
                console.log(stars);
            });
    }

    disconnectedCallback() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    generateStars(movie) {
        this.stars = [];
        for (let i = 1; i < 6; i++) {
           
          const isActive = (i <= movie.Rating__c);
          let starStyle = this.styleStar(isActive);
          const star = {
            id: i,
            isActive,
            starStyle
          }
          this.stars.push(star);
        }
    } 
    
    styleStar(isActive) { 
        return isActive ? 'active-star' : 'inactive-star';
    }

    handleMoviesSelection(movie) {
        this.movie = movie;
    }
}