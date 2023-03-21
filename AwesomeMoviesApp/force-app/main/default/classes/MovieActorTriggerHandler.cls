public with sharing class MovieActorTriggerHandler extends TriggerHandler {
    List<MovieActor__c> newMovieActorList;
    List<MovieActor__c> oldMovieActorList;
    Map<Id, MovieActor__c> oldMovieActorMap;
    Map<Id, MovieActor__c> newMovieActorMap;
    
    public MovieActorTriggerHandler() {
        //contructor
       oldMovieActorList = (List<MovieActor__c>) Trigger.old;
       newMovieActorList = (List<MovieActor__c>) Trigger.new;
       oldMovieActorMap = (Map<Id, MovieActor__c>) Trigger.oldMap;
       newMovieActorMap = (Map<Id, MovieActor__c>) Trigger.newMap;

    }

    public override void beforeInsert() {
        system.debug('MovieActorTriggerHandler : beforeInsert');
        				
    }
    public override void beforeUpdate() {
        				
    }
    public override void beforeDelete() {
        				
    }
    public override void afterInsert() {
        system.debug('MovieActorTriggerHandler : afterInsert');
        MovieActorTriggerHelper.updateMovieMaleAndFemalePercentage(newMovieActorList);
        				
    }
    public override void afterUpdate() {
        				
    }
    public override void afterDelete() {
        				
    }
    public override void afterUndelete() {
        				
    }
}