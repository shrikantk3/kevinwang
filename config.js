var kevin = angular.module("kApp",['ngRoute']);
kevin.controller('kvinCtrl', function($scope){
$scope.mynane= "Shrikant";
});

kevin.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "template/home.template",
        controller:'homeCtrl'
    })
    .otherwise({
        templateUrl : "template/error.template"
    });
    
});

kevin.controller('homeCtrl', function($scope, $http){
    $scope.title="Todo List";
    $scope.option=[{id:0, name:'Pending'},{id:1,name:'Done'}]
    $scope.popToggle = false;
    $scope.todo={
        title:'',
        completed:''
    };
    // $http.get('https://jsonplaceholder.typicode.com/todos').then(function(response){
        $http.get('user.json').then(function(response){
        $scope.data=  response.data;
    });


    //checked all toggle in Tabble
    $scope.checkUncheckAll = function () {
        if ($scope.checkall) {
         $scope.checkall = true;
        } else {
         $scope.checkall = false;
        }
        angular.forEach($scope.data, function (checked) {
         checked.checked = $scope.checkall;
        });
       };
     
       $scope.updateCheckall = function($index,checked){
                
         var userTotal = $scope.data.length;
         var count = 0;
         angular.forEach($scope.data, function (item) {
            if(item.checked){
              count++;
            }
         });
     
         if(userTotal == count){
            $scope.checkall = true;
         }else{
            $scope.checkall = false;
         }
       };
     //ends

    //  add user in data json
    $scope.adduser = function(){

        $scope.data.push({
            'userId':$scope.data.length + 1,
            'id':$scope.data.length + 1,
            'title': $scope.todo.title,
            'completed':$scope.todo.completed
        });
        $scope.popToggle = false;
    }
    $scope.changedValue = function(item){       
        // alert(item);
      }

      //delete
      $scope.delete=function(e){
          $scope.data.splice(e, 1);
      }

});