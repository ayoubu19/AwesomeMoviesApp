import LightningModal from 'lightning/modal';
import { wire } from 'lwc';
import getActors from '@salesforce/apex/ActorController.getActors';
import { track } from 'lwc';
import createMovie from '@salesforce/apex/MovieController.createMovie';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CreateMovieModal extends LightningModal {

    actors = [];
    actorsOptions = [];
    @track selectedActors = [];
    @track selectedActorIds = [];
    selectedActor = "";

    movie = { name: '', releaseDate: '' , category: 'Comedy', description: '', poster: '', rating: '3' };

    categories = [
        { label: 'Action', value: 'Action' },
        { label: 'Adventure', value: 'Adventure' },
        { label: 'Drama ', value: 'Drama' },
        { label: 'Comedy', value: 'Comedy' },
        { label: 'Horror', value: 'Horror' },
    ]

    ratings = [
        { label: 'Very Bad', value: '0' },
        { label: 'Bad', value: '1' },
        { label: 'Normal', value: '2' },
        { label: 'Good', value: '3' },
        { label: 'Very Good', value:'4' },
        { label: 'Excellent', value: '5' },
    ]

    @wire(getActors)
    wiredActors({ data, error }) {
        console.log(data);
        if (data) {
            this.actorsOptions = data.map(actor => ({
                label: actor.Name,
                value: actor.Name,
            }));
            this.actors = data.map(actor => ({
                name: actor.Name,
                id: actor.Id
            }));
        } else if (error) {
            console.error(error);
        }
    }

    handleActorChange(event) {
        this.selectedActor = event.detail.value;
        if (!this.selectedActors.includes(this.selectedActor)) {
            this.selectedActors = [...this.selectedActors, this.selectedActor];
        }

        //todo refactore it outside in a method + use map
        this.actors.forEach(actor => {
            if (actor.name === this.selectedActor) {
                if (!this.selectedActorIds.includes(actor.id)) {
                    this.selectedActorIds = [...this.selectedActorIds, actor.id];
                    console.log(actor.id);
                }
            }
        });
        this.selectedActor = {};
    }

    handleNameChange(event) {
        this.movie.name = event.target.value;
    }

    handleCategoryChange(event) {
        this.movie.category = event.target.value;
    }

    handlePosterChange(event) {
        this.movie.poster = event.target.value;
    }

    handleDesciptionChange(event) {
        this.movie.description = event.target.value;
    }

    handleReleaseDateChange(event) {
        this.movie.releaseDate = event.detail.value;
    }

    handleRatingChange(event) {
        console.log(event.target.value);
        this.movie.rating = event.target.value;
    }

    handlePillRemove(event) {
        const indexToRemove = this.selectedActors.indexOf(event.detail.name);
        if (indexToRemove > -1) {
            this.selectedActors.splice(indexToRemove, 1);
            this.selectedActorIds.splice(indexToRemove, 1);
        }
    }

    handleCreateMovie() {
        const newMovie = {
            Name: this.movie.name,
            Release_date__c: this.movie.releaseDate,
            Category__c: this.movie.category,
            Poster__c: this.movie.poster,
            Rating__c: this.movie.rating,
        };

        createMovie({ newMovie: newMovie, actorIds: this.selectedActorIds })
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Movie created successfully',
                        variant: 'success'
                    })
                );
                this.close(newMovie);
            })
            .catch(error => {
                console.error(error);
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });
    }

    handleCancel(){
        this.close();
    }

}