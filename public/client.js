/*global $*/

$(function() {
  $.get('/cities', appendToList);
    
  $('form').on('submit', function(event){
    event.preventDefault();
    var form = $(this);
    var cityData = form.serialize(); //url-encoded form data
    
    $.ajax({
      type: 'POST', url: '/cities', data: cityData
    }).done(function(city){
        appendToList([city]);
        form.trigger('reset');
    });
  });
  
  $('#cities-list').on('change', function(){
    var city = $('#cities-list').val();
    
    $.get(`/cities/${city}`, city, updateState);
  })
  
  function updateState(state){
    var city = $('#cities-list').val();
    var content = `<a href="#" data-block="${city}"><img src="deleteIcon.jpg" style="height:20px;width:20px;"></a><a href="/cities/${city}">${city}</a>`; 
    $('#state').append(content);
    
  };  
    
  function appendToList(cities) { 
    var list = [];
    var content, city;
    for(var i in cities){
      city = cities[i];
      city.id = i;
      content = `<a href="/cities/${city}">${city}</a><a href="#" data-block="${city}"><img src="deleteIcon.jpg"></a>`; 
        list.push($('<option>', {html: content}));
    }
    $('#cities-list').append(list);
  }
  
  $('#cities-list').on('click', 'a[data-city]', function(event){
    // Add confirmation to delete
    if (!confirm) {
        return false;
    }
    
    var target = $(event.currentTarget);
    
    $.ajax({
      type: 'DELETE',
      url: `/cities/${target.data('city')}`
    }).done(function(){
      console.log('delete call!')
      target.parent('option').remove();
    })
  });
  
});