import { LightningElement , api} from 'lwc';

export default class MovieTile extends LightningElement {
    @api movie;

    stars = [];

    handleClick() {
        const selectedEvent = new CustomEvent('selected', {
            detail: this.movie
        });
        this.dispatchEvent(selectedEvent);
    }

}