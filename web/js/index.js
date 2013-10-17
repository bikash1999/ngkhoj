function SearchViewModel() {
	var self = this;
	self.keyword = ko.observable('');
	self.searchResults = ko.observableArray([]);

	self.doSearch = function() {

		if (self.keyword() === '') {
			self.searchResults([]);
		} else {
			$.ajax({
				type: 'GET',
				dataType: "json",
				url: '../api/file/search',
				success: function(jsonData) {
					self.searchResults(jsonData);
				},
				error: function(xhr, desc, err) {
					console.log('Error on GET EvoApi Components' + err);
				}
			});
		};
	};

}

var vm = new SearchViewModel();
ko.applyBindings(vm);