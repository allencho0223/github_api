// Acknowledgement
// https://blog.teamtreehouse.com/code-a-simple-github-api-webapp-using-jquery-ajax

$(function(){
    $('#search').on('click', function(e){
      e.preventDefault();
      
      // Get username from input box
      var username = $('#userAccount').val();

      // Set the URIs
      var requri = 'https://api.github.com/users/' + username;
      var repouri = 'https://api.github.com/users/' + username + '/repos';
      
      requestJSON(requri, function(json) {
        if(json.message == "Not Found" || username == '') {
          $('#apiData').html("<h2 class=\"subheadingFont\">No User Info Found</h2>");
        } else {
          // else we have a user and we display their info
          var name = json.name;
          var login = json.login;
          var avatar = json.avatar_url;
          var profileurl = json.html_url;
          var location = json.location;
          var followers = json.followers;
          var following = json.following;
          var reposnum = json.public_repos;
          var bio = json.bio;
          
          if(name == undefined) {
            name = login;
          }

          // Display user details on the page
          var outhtml = '</br>' + 
                        '<div class="container">' +
                          '<div class="row">' +
                            '<div class="col-lg-4">' +
                              '<a href="' + profileurl + '" target="_blank">' +
                                '<img src="' + avatar + '" width="260" height="260" alt="' + login + '">' +
                              '</a>' +
                            '</div>' +
                            '<div class="col-lg-8">' + 
                              '<p class="subheadingFont">' + name + '</br><a href="' + profileurl + 'target="_blank">' + login + '</a></p>' +
                              '<span class="pFont">' + bio + '</span>' +
                            '</div>' + 
                          '</div>' + // end of first row
                          '<div class="row">' + 
                            '<div class="col-lg-4">' + 
                              '<span class="pFont">Location</span>' +
                            '</div>' +
                            '<div class="col-lg-8"><span class="pFont">' + location +
                            '</span></div>' +
                          '</div>' + // end of second row
                          '<div class="row">' + 
                            '<div class="col-lg-4">' + 
                              '<span class="pFont">Follower</span>' +
                            '</div>' +
                            '<div class="col-lg-8"><span class="pFont">' + followers +
                            '</span></div>' +
                          '</div>' + //end of third row
                          '<div class="row">' + 
                            '<div class="col-lg-4">' + 
                              '<span class="pFont">Following</span>' +
                            '</div>' +
                            '<div class="col-lg-8"><span class="pFont">' + following +
                            '</span></div>' +
                          '</div>' + //end of fourth row
                          '<div class="row">' + 
                            '<div class="col-lg-4">' + 
                              '<span class="pFont">Repositories</span>' +
                            '</div>' +
                            '<div class="col-lg-8"><span class="pFont">' + reposnum +
                            '</span></div>' +
                          '</div>'; // end of fifth row
          
          // Get repositories                
          var repositories;
          $.getJSON(repouri, function(json){
            repositories = json;   
            outputPageContent();                
          });          
          
          // Display repo details
          function outputPageContent() {
            if(repositories.length == 0) {
              outhtml = outhtml + '<h2 class="subheadingFont">No repos!</h2></div>';
            } else {
              outhtml = outhtml + '</br><div class="row">';
              $.each(repositories, function(index) {
                outhtml = outhtml + '<div class="col-lg-6 repoBorder" style="height: 150px">' + 
                                      '<a href="' + repositories[index].html_url + '" target="_blank" style="font-size: 20px">' + repositories[index].name + '</a>' +
                                      '</br><span class="descFont">' + repositories[index].description + '</span></br></br>' + 
                                      '<span class="descFont">' + repositories[index].language + '</span>' +
                                    '</div>';
              });
              outhtml = outhtml + '</div>'; 
            }
            $('#apiData').html(outhtml);
          } // end outputPageContent()
        } // end else statement
      }); // end requestJSON Ajax call
    }); // end click event handler
    
    function requestJSON(url, callback) {
      $.ajax({
        url: url,
        complete: function(xhr) {
          callback.call(null, xhr.responseJSON);
        }
      });
    }
  });