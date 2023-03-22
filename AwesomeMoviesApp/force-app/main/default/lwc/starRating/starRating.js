import { LightningElement,api } from 'lwc';

export default class StarRating extends LightningElement {
   _rating;
   stars = [];
   @api
    get rating() { return this._rating}
    set rating(value) { 
        this._rating = value;
        this.generateStars();
    }
   
    
    connectedCallback() {
        this.generateStars();
    }
   
    generateStars() {
        this.stars = [];
        for (let i = 1; i < 6; i++) {
           
          const isActive = (i <= this.rating);
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

}