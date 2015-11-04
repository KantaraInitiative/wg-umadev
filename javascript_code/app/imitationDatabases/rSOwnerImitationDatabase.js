/**
 * Created by kfgonzal on 11/2/2015.
 */


// Mimic DB functionality for resource sets until figure out actual storage, such as MongoDB
// I really am just aiming to have something ready to go once I am able to test against an AS
app.factory('rSOwnerImitationDatabase', function(){

    // Acting as DB holding all owners
    var allOwners = [];

    var addRSOwner = function(rsOwner){
        allOwners.push(rsOwner);
    };

    var getRSOwnerById = function(client_id){
        for(var i = 0; i < allOwners.length; i++){
            if(allOwners[i].id === client_id){
                // return the resourceOwner for this client_id....
                // maybe protected clients would be stored completely separate and so searching by PAT is sufficient for ID
                return allOwners[i];
            }
        }
    };

    return {
        getRSOwnerById: getRSOwnerById,
        addRSOwner: addRSOwner
    };
});