public with sharing class MovieActorTriggerHelper {
    public static void updateMovieMaleAndFemalePercentage(List<MovieActor__c> newMovieActors){
        // business logic
        Integer malePourcentage = 0;
        Integer feMalePourcentage = 0;
        
         for(MovieActor__c movieActor : newMovieActors) {

            Actor__c actor = [SELECT Gender__c , Number_of_movies__c FROM Actor__c WHERE Actor__c.Id = :movieActor.Actor__c ];

            if(actor.Gender__c.equalsIgnoreCase('male')){
                malePourcentage++;
            }else{
                feMalePourcentage++;
            }

            actor.Number_of_movies__c ++;
            update actor;
        } 

        Movie__c movie  = [SELECT MaleActorsPercentage__c, FeMaleActorsPercentage__c FROM Movie__c WHERE Movie__c.Id =: newMovieActors.get(0).Movie__c];
       
        movie.MaleActorsPercentage__c = (malePourcentage / malePourcentage + feMalePourcentage)*100;
        movie.FeMaleActorsPercentage__c =(feMalePourcentage / malePourcentage + feMalePourcentage)*100;
        
        update movie;
    }
}