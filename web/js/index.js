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
				url: '../api/file/search?keyword=' + self.keyword(),
				success: function(jsonData) {
					self.searchResults(jsonData);
					console.log(self.searchResults());
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