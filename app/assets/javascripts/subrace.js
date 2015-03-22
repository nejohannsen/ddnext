var FullPage = React.createClass({displayName: "FullPage",
  getInitialState: function() {
    return {
      url: this.props.url,
      races: this.props.races,
      subrace: this.props.subrace,
      editFormVisable: false
    };
  },
  addFeature: function(featureData) {
    /*Not sure how I am going to do this yet*/
  },
  removeFeature: function(feature) {
    /*Not sure how I am going to do this yet*/
  },
  updatesubraceLocal: function(attr, value) {
    var subrace = this.state.subrace
    subrace[attr] = value
    this.setState({subrace: subrace})
  },
  updatesubraceServer: function(character) {
    var jsonSendData = JSON.stringify(this.state.subrace)
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'PATCH',
      data: {subrace: jsonSendData},
      success: function(data) {
        this.setState({subrace: data["subrace"]});
      }.bind(this),
      error: function(xhr, status, err) {
       /* console.error(this.props.url, status, err.toString());*/
      }.bind(this)
    });
  },
  loadsubraceFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({subrace: data.subraced});
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
            subrace: this.state.subrace, 
            races: this.state.races, 
            addFeature: this.addClassToCharacter, 
            removeFeature: this.removeFeature, 
            changeFormState: this.changeFormState, 
            updatesubraceLocal: this.updatesubraceLocal, 
            updatesubraceServer: this.updatesubraceServer}
          )
        ) : (
          React.createElement(ShowForm, {
            subrace: this.state.subrace, 
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
       React.createElement("h1", null, this.props.subrace.title), React.createElement("span", null, this.props.subrace.race_title), 
       React.createElement("p", null, this.props.subrace.description)
      )
    );
  }
});

var RaceNode = React.createClass({displayName: "RaceNode",
  render: function() {
    return (
      React.createElement("option", {value: this.props.id}, this.props.title)
    );
  }
});

var EditForm = React.createClass({displayName: "EditForm",
  handelClick: function(e) {
    e.preventDefault()
    /* need to update server to handel this */
    this.props.updatesubraceServer()
    this.props.changeFormState(e)
  },
  handelChange: function(e) {
    e.preventDefault()
    this.props.updatesubraceLocal(e.target.getAttribute('name'), e.target.value)
  },
  render: function() {
    var raceOptionNodes = this.props.races.map(function (race) {
      return (
        React.createElement(RaceNode, {
          id: race.id, 
          title: race.title, 
          subrace: this.props.subrace}
        )
      );
    }, this);

    return (
      React.createElement("div", {className: "edit_main_content"}, 
        React.createElement("form", null, 
          React.createElement("label", null, "Race"), 
          React.createElement("select", {name: "race_id", onChange: this.handelChange, value: this.props.subrace.race_id}, 
            raceOptionNodes
          ), 
          React.createElement("label", null, "subrace Title:"), 
          React.createElement("input", {type: "text", value: this.props.subrace.title, name: "title", onChange: this.handelChange}), 
          React.createElement("br", null), 
          React.createElement("label", null, "Description"), 
          React.createElement("textarea", {value: this.props.subrace.description, name: "description", onChange: this.handelChange}), 
          React.createElement("input", {value: "Done", type: "submit", onClick: this.handelClick})
        )
      )
    );
  }
});



$( document ).ready(function() {
  React.render( 
    React.createElement(FullPage, {
      subrace: baked.subrace, 
      races: baked.races, 
      url: baked.url}
    ),
    document.getElementById('page')
  );
});
