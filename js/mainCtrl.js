angular.module('mainCtrl', []).controller('MainController', function ($scope, $location) {

    var vm = this;

    vm.cart = [];
    vm.removed = [];
    vm.result = [];
    vm.total = 0;

    vm.startSearch = function () {
        if (vm.searchProcessing)
            return;
        $('input[name="searchbox"]').blur();
        vm.searchProcessing = true;
        vm.result = [];
        $.ajax('https://itunes.apple.com/search', {
            type: 'get',
            crossDomain: true,
            dataType: 'jsonp',
            data: {
                term: vm.searchTerm,
                entity: 'musicTrack',
                attribute: 'songTerm'
            },
            success: function (data) {
                vm.searchProcessing = false;
                vm.result = data.results;
                $scope.$apply()
            },
            error: function (xhr, ajaxOptions, thrownError) {
                vm.searchProcessing = false;
                alert('server not responding');
            }
        });
    }

    vm.addToCart = function (song) {
        vm.total += Math.round(song.trackPrice * 100) / 100;
        vm.total = Math.round(vm.total * 100) / 100;
        vm.cart.push(song);
        var index1 = vm.result.indexOf(song);
        if (index1 > -1)
            vm.result.splice(index1, 1);
        
        var index2 = vm.removed.indexOf(song);
        if (index2 > -1)
            vm.removed.splice(index2, 1);
    }

    vm.removeFromCart = function (song) {
        vm.total -= Math.round(song.trackPrice * 100) / 100;
        vm.total = Math.round(vm.total * 100) / 100;
        vm.removed.push(song);
        var index = vm.cart.indexOf(song);
        vm.cart.splice(index, 1);
    }

})