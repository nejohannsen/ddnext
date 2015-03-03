var FullPage = React.createClass({displayName: "FullPage",
  getInitialState: function() {
    return {data: this.props.data, character: this.props.data.character};
  },
  addClassToCharacter: function(gclass) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'PATCH',
      data: gclass,
      success: function(character) {
        this.setState({character: character});
      }.bind(this),
      error: function(xhr, status, err) {
        /*console.error(this.props.url, status, err.toString());*/
      }.bind(this)
    });
  },
  loadCharacterFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(character) {
        this.setState({character: character});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return (
      React.createElement("div", {id: "FullPage"}, 
        React.createElement(MainTitle, {addClassToCharacter: this.addClassToCharacter, character: this.state.character}), 
        React.createElement(MainPage, null), 
        React.createElement(AddClassesForm, {addClassToCharacter: this.addClassToCharacter, data: this.state.data})
      )
    );
  }
});

var MainTitle = React.createClass({displayName: "MainTitle",
  render: function() {
    return (
      React.createElement("div", {className: "main_title"}, 
        React.createElement(LeftTitleBox, {character: this.props.character}), 
        React.createElement(RightTitleBox, {character: this.props.character})
      )
    );
  }
});

var LeftTitleBox = React.createClass({displayName: "LeftTitleBox",
  render: function() {
    return (
      React.createElement("div", {className: "left_title_box"}, 
        React.createElement("div", {className: "vaule"}, this.props.character.name), 
        React.createElement("div", {className: "label"}, "Name")
      )
    );
  }
});

var RightTitleBox = React.createClass({displayName: "RightTitleBox",
  render: function() {
    return (
      React.createElement("div", {className: "right_title_box"}, 
        React.createElement("div", {className: "field"}, 
          React.createElement("div", {className: "value"}, this.props.character.classes_and_levels), 
          React.createElement("div", {className: "label"}, "Class and Level")
        ), 
        React.createElement("div", {className: "field"}, 
          React.createElement("div", {className: "value"}, "Background"), 
          React.createElement("div", {className: "label"}, "Backgorund")
        ), 
        React.createElement("div", {className: "field"}, 
          React.createElement("div", {className: "value"}, "Nick"), 
          React.createElement("div", {className: "label"}, "Player Name")
        ), 
        React.createElement("div", {className: "field"}, 
          React.createElement("div", {className: "value"}, "Harpers"), 
          React.createElement("div", {className: "label"}, "Faction")
        ), 
        React.createElement("div", {className: "field"}, 
          React.createElement("div", {className: "value"}, "Hill Dwarf"), 
          React.createElement("div", {className: "label"}, "Race")
        ), 
        React.createElement("div", {className: "field"}, 
          React.createElement("div", {className: "value"}, "Alignment"), 
          React.createElement("div", {className: "label"}, "Alignment")
        ), 
        React.createElement("div", {className: "field"}, 
          React.createElement("div", {className: "value"}, "2700"), 
          React.createElement("div", {className: "label"}, "Experince")
        ), 
        React.createElement("div", {className: "field"}, 
          React.createElement("div", {className: "value"}, "4u7985748957435"), 
          React.createElement("div", {className: "label"}, "DCI Number")
        )
      )
    );
  }
});

var MainPage = React.createClass({displayName: "MainPage",
  render: function() {
    return (
      React.createElement("div", {className: "main_page"})
    );
  }
});

var ClassOptions = React.createClass({displayName: "ClassOptions",
  render: function() {
    return (
      React.createElement("option", {value: this.props.id}, this.props.title)
    );
  }
});

var AddClassesForm = React.createClass({displayName: "AddClassesForm",
  handleSubmit: function(e) {
    e.preventDefault();
    var selectValue = this.refs.selectedClass.getDOMNode().value
    this.props.addClassToCharacter({character_class: {game_class: selectValue}});
  },
  render: function() {
    var optionNodes = this.props.data.avaliable_classes.map(function (gclass) {
      return (
        React.createElement(ClassOptions, {id: gclass.id, title: gclass.title})
      );
    });
    return (
      React.createElement("div", {className: "popup_form"}, 
        React.createElement("form", {id: "addClassForm", onSubmit: this.handleSubmit}, 
          React.createElement("label", null, "Class"), 
          React.createElement("select", {ref: "selectedClass"}, 
            optionNodes
          ), 
          React.createElement("input", {type: "submit", value: "Submit"})
        )
      )
    );
  }
});



$( document ).ready(function() {
  var url = "http://localhost:3000/characters/" + baked.character.id
  React.render(
    React.createElement(FullPage, {data: baked, url: url}),
    document.getElementById('page')
  );
});

