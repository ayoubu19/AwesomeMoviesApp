public with sharing class ActorController {

    @AuraEnabled(cacheable=true scope='global')
    public static Actor__c[] getActors() {
        return[
            SELECT id , Name FROM Actor__c  WITH SECURITY_ENFORCED ORDER BY Name
        ];
    }
}