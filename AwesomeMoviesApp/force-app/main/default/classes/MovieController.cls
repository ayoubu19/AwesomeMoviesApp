public with sharing class MovieController {
    
    @AuraEnabled(Cacheable=true scope='global')
    public static Movie__c[] getMovies() {
        return [
            SELECT Name, Category__c, Description__c, Release_date__c, FemaleActorsPercentage__c,
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
}