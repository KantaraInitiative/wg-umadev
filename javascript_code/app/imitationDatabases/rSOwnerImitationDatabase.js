/**
 * Created by K-Gonzalez on 11/2/2015.
 */


// Mimic DB functionality for resource sets until figure out actual storage, such as MongoDB
// I really am just aiming to have something ready to go once I am able to test against an AS
app.factory('rSOwnerImitationDatabase', function(ResourceSetOwner){
    // TODO: Actual data would be retrieved from a DB by key of logged in client_id
    // or just all users depending on if automatically protecting all server's resources

    var RSOwner1 = ResourceSetOwner.create();
    RSOwner1.setId('1234');
    RSOwner1.setName('Tommy Shelby');

    // Fake resource Owner
    // Actual data would be in a DB
    var RSOwner2 = ResourceSetOwner.createFromJSON({
        'id': '56789',
        'name': 'Daenerys Targaryen',
        'PAT': ''
    });

    // Acting as DB holding all owners
    var allOwners = [];

    var addRSOwner = function(rsOwner){
        allOwners.push(rsOwner);
    };

    // Add owners to fake "DB"
    addRSOwner(RSOwner1);
    addRSOwner(RSOwner2);

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