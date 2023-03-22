global  class MovieBatch implements Database.Batchable<SObject>, Schedulable {

    global Database.QueryLocator start(Database.BatchableContext BC) {
        String query = 'SELECT Release_date__c, IsReleased__c FROM Movie__C WHERE IsReleased__c = null OR IsReleased__c = false';
        return Database.getQueryLocator(query);
    }
     
    global void execute(Database.BatchableContext BC, List<Movie__c> movies) {
        for(Movie__c movie : movies) {
            movie.IsReleased__c = (movie.Release_date__c <= Date.today());
        }
        try {
           update movies;
        } catch(Exception e) {
            System.debug('error while updating movies ' + e);
        }
    }   
    global void finish(Database.BatchableContext BC) {
        System.debug('bacth finished');
    }

    global void execute(SchedulableContext sc){
        MovieBatch mb = new MovieBatch();
        Database.executeBatch(mb);
    }

}