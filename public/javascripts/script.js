var myApp = angular.module("myApp",["firebase"]);
myApp.controller("chatController", ["$scope", "$firebaseArray",
	function($scope, $firebaseArray) {
    var ref = firebase.database().ref().child("messages");
		$scope.chats = $firebaseArray(ref);
		$scope.update = function(user) {
				var newmessage = {from:user.name || "anonymous",body:user.chat};
				console.log(newmessage);
				$scope.chats.$add(newmessage);
				user.chat = "";
		}
	} 
]);
