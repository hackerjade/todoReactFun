var items = [];

var notifyComponents = function() {
  $(ListStore).trigger('storeHasChanged');
};

var findItemById = function(id) {
  return items.filter(function(item) {
    return item.id === id;
  })[0];
},

ListStore = {

  getItems: function() {
    return items;
  },

  loadItems: function() {
    var listItems = $.ajax({
      type: 'GET',
      url: 'https://listalous.herokuapp.com/lists/jaaaaade!',
      success: function(list) {
        items = list.items;
        notifyComponents();
      }
    });
  },
  addItem: function(itemDescription) {
    var newItem = { description: itemDescription, completed: false };
    var newListItem = $.ajax({
      type: 'POST',
      url: 'https://listalous.herokuapp.com/lists/jaaaaade!/items',
      data: newItem
    });

    newListItem.done(function(listItem) {
      items.push(listItem);
      notifyComponents();
    });
  },
  toggleCompleteness: function(itemId) {
    var item = findItemById(itemId);
    var completionState = item.completed;
    $.ajax({
      type: 'PUT',
      url: 'https://listalous.herokuapp.com/lists/jaaaaade!/items/' + itemId,
      data: { completed: !completionState },
      success: function (updatedItem) {
        item.completed = updatedItem.completed;
        notifyComponents();
      }
    });
  }
};
