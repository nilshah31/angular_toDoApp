module.exports = [
    '$window',
    function($window) {
        this.isUserAlreadyLoggedIn = function () {            
            return new Promise(function(resolve,reject){
                var user = JSON.parse($window.localStorage.getItem('user'));
                user ? resolve(true):reject(false)
            })
        }
        this.setUser = function(authToken){
            var user_ob = {
                'auth_token': authToken
            }
            $window.localStorage.setItem('user', JSON.stringify(user_ob));
        }
        this.getAuthToken = function(){
            return(JSON.parse($window.localStorage.getItem('user')).auth_token);
        } 
        this.removeAuthToken = function(){
            $window.localStorage.setItem('user', null);
        }
    }
];

    