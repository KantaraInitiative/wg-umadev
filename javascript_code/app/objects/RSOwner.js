/**
 * Created by kfgonzal on 10/6/2015.
 */
// Not sure on this
// Struggling with best way to relate PAT to RO

// have a ProtectedRSO object with the PAT retrieved after successful PAT request?
// Up to RS really if they decide to tie it in with existing users or create a new protected user
// Have to think about scalability and performance

var RSO = angular.module('RSOwnerModule', []);

RSO.factory('RSOwner', function(){

    var RSOwner = function(id, name){
        this.id = id;
        this.name = name;
        this.PAT = ""; // if PAT is "", then not protected
    };

    RSOwner.prototype.setPAT = function(PAT){
        this.PAT = PAT;
    };

    RSOwner.prototype.getPAT = function(){
        // For all RO this RS has protected, get PAT with key id
        return this.PAT;
    };

    return RSOwner;
});
