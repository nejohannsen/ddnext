var FullPage = React.createClass({displayName: "FullPage",
  getInitialState: function() {
    return {
      url: this.props.url,
      subraces: this.props.subraces,
      race: this.props.race,
      editFormVisable: false
    };
  },
  addFeature: function(featureData) {
    /*Add feature to array of features*/
    /*May not need ajax here. Just add to race and pass up?*/
    /*$.ajax({
      url: this.props.url + "/add_feature",
      dataType: 'json',
      type: 'PATCH',
      data: featureData,
      success: function(data) {
        this.setState({race: data["race"]});
      }.bind(this),
      error: function(xhr, status, err) {
       /* console.error(this.props.url, status, err.toString());
      }.bind(this)
    });*/
  },
  removeFeature: function(feature) {
    /*Not sure how I am going to do this yet*/
  },
  updateRaceLocal: function(attr, value) {
    var race = this.state.race
    race[attr] = value
    this.setState({race: race})
  },
  updateRaceServer: function(character) {
    var jsonSendData = JSON.stringify(this.state.race)
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'PATCH',
      data: {race: jsonSendData},
      success: function(data) {
        this.setState({race: data["race"]});
      }.bind(this),
      error: function(xhr, status, err) {
       /* console.error(this.props.url, status, err.toString());*/
      }.bind(this)
    });
  },
  loadRaceFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({race: data.raced});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  changeFormState: function() {
    this.setState({editFormVisable: !this.state.editFormVisable})
  },
  render: function() {
    return (
      React.createElement("div", {id: "FullPage"}, 

        this.state.editFormVisable ? (
          React.createElement(EditForm, {
            race: this.state.race, 
            addFeature: this.addClassToCharacter, 
            removeFeature: this.removeFeature, 
            changeFormState: this.changeFormState, 
            updateRaceLocal: this.updateRaceLocal, 
            updateRaceServer: this.updateRaceServer}
          )
        ) : (
          React.createElement(ShowForm, {
            race: this.state.race, 
            changeFormState: this.changeFormState}
          )
        )

      )
    );
  }
});

var ShowForm = React.createClass({displayName: "ShowForm",
  handelClick: function(e) {
    this.props.changeFormState(e)
  },
  render: function() {
    return (
      React.createElement("div", {className: "main_content", onClick: this.handelClick}, 
       React.createElement("h1", null, this.props.race.title), 
       React.createElement("p", null, this.props.race.description)
      )
    );
  }
});

var EditForm = React.createClass({displayName: "EditForm",
  handelClick: function(e) {
    e.preventDefault()
    /* need to update server to handel this */
    this.props.updateRaceServer()
    this.props.changeFormState(e)
  },
  handelChange: function(e) {
    e.preventDefault()
    this.props.updateRaceLocal(e.target.getAttribute('name'), e.target.value)
  },
  render: function() {
    return (
      React.createElement("div", {className: "edit_main_content"}, 
        React.createElement("form", null, 
          React.createElement("label", null, "Race Title:"), 
          React.createElement("input", {type: "text", value: this.props.race.title, name: "title", onChange: this.handelChange}), 
          React.createElement("br", null), 
          React.createElement("label", null, "Description"), 
          React.createElement("textarea", {value: this.props.race.description, name: "description", onChange: this.handelChange}), 
          React.createElement("input", {value: "Done", type: "submit", onClick: this.handelClick})
        )
      )
    );
  }
});



$( document ).ready(function() {
  React.render(
    React.createElement(FullPage, {
      race: baked.race, 
      subraces: baked.subraces, 
      url: baked.url}
    ),
    document.getElementById('page')
  );
});
