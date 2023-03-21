public with sharing class MovieController {
    
    @AuraEnabled(Cacheable=true scope='global')
    public static Movie__c[] getMovies() {
        return [
            SELECT id ,Name, Category__c, Description__c, Release_date__c, FemaleActorsPercentage__c,
            MaleActorsPercentage__c, IsReleased__c, Rating__c,Poster__c From Movie__C 
            WITH SECURITY_ENFORCED ORDER BY Name
        ];
    }

    @AuraEnabled(cacheable=true scope='global')
    public static Movie__c[] searchMovies(String searchTerm) {
        
        searchTerm = searchTerm.trim();
        if (searchTerm == '') {
            return  getMovies();
        }
        // Prepare query paramters
        searchTerm = '%' + searchTerm + '%';
        // Execute search query
        return [
            SELECT Name, Category__c, Description__c, Release_date__c, FemaleActorsPercentage__c,
            MaleActorsPercentage__c, IsReleased__c, Rating__c,Poster__c From Movie__C 
            WHERE Name LIKE :searchTerm
            WITH SECURITY_ENFORCED
            ORDER BY Name
        ];
    }

    @AuraEnabled
    public static void createMovie(Movie__c newMovie,  List<String> actorIds) {
        try {
            System.debug(Logginglevel.INFO,'before inserting movie ');
            insert newMovie;
            System.debug(Logginglevel.INFO,'after inserting movie ');
            
            if(actorIds.size() > 0){
                List<MovieActor__c> movieActors = new List<MovieActor__c>();
                for (String actorId : actorIds) {
                    movieActors.add(new MovieActor__c(
                        Movie__c = newMovie.Id,
                        Actor__c = actorId
                    ));
                }
                System.debug(Logginglevel.INFO,'before inserting movieactor ');
                insert movieActors;
                System.debug(Logginglevel.INFO,'after inserting movie actor');
    
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}