var FullPage = React.createClass({displayName: "FullPage",
  getInitialState: function() {
    return {
      url: this.props.url, 
      character: this.props.character, 
      avaliable_classes: this.props.avaliable_classes, 
      character_classes: this.props.character_classes,
      form_visable: {class_and_level: false, base_stats: false}
    };
  },
  addClassToCharacter: function(gclass) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'PATCH',
      data: gclass,
      success: function(data) {
        this.setState({character: data["character"]});
        this.setState({character_classes: data["character_classes"]});
      }.bind(this),
      error: function(xhr, status, err) {
        /*console.error(this.props.url, status, err.toString());*/
      }.bind(this)
    });
  },
  updateCharacterLocal: function(attr, value) {
    var character = this.state.character
    character[attr] = value
    this.setState({character: character})
  },
  updateCharacterServer: function(character) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',        
      type: 'PATCH',
      data: {'character': this.state.character},
      success: function(data) {
        this.setState({character: data["character"]});
      }.bind(this),
      error: function(xhr, status, err) {
       /* console.error(this.props.url, status, err.toString());*/
      }.bind(this)             
    });                        
  },
  changeStateOfPopupForm: function(formName) {
    var formVisable = this.state.form_visable
    formVisable[formName] = !formVisable[formName]
    this.setState({form_visable: formVisable})
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
        React.createElement(MainTitle, {
          addClassToCharacter: this.addClassToCharacter, 
          character: this.state.character, 
          changeStateOfPopupForm: this.changeStateOfPopupForm}
        ), 
        React.createElement(MainPage, null), 

        this.state.form_visable["class_and_level"] ? (
          React.createElement(AddClassesForm, {
            addClassToCharacter: this.addClassToCharacter, 
            avaliable_classes: this.state.avaliable_classes, 
            character_classes: this.state.character_classes, 
            changeStateOfPopupForm: this.changeStateOfPopupForm}
          )
        ) : (null), 

	this.state.form_visable['base_stats'] ? (
	  React.createElement(BaseStatsForm, {
	    character: this.state.character, 
	    changeStateOfPopupForm: this.changeStateOfPopupForm, 
	    updateCharacterLocal: this.updateCharacterLocal, 
	    updateCharacterServer: this.updateCharacterServer}
          )
	) : (null)
      )
    );
  }
});

var MainTitle = React.createClass({displayName: "MainTitle",
  render: function() {
    return (
      React.createElement("div", {className: "main_title"}, 
        React.createElement(LeftTitleBox, {
	  character: this.props.character, 
	  changeStateOfPopupForm: this.props.changeStateOfPopupForm, 
	  updateCharacter: this.props.updateCharacter}
	), 
        React.createElement(RightTitleBox, {
	  character: this.props.character, 
	  changeStateOfPopupForm: this.props.changeStateOfPopupForm, 
	  updateCharacter: this.props.updateCharacter}
        )
      )
    );
  }
});

var LeftTitleBox = React.createClass({displayName: "LeftTitleBox",
  handleClick: function(e) {
    this.props.changeStateOfPopupForm(e.target.getAttribute('value'))
  },
  render: function() {
    return (
      React.createElement("div", {value: "base_stats", className: "left_title_box"}, 
        React.createElement("div", {value: "base_stats", className: "value", onClick: this.handleClick}, this.props.character.name), 
        React.createElement("div", {value: "base_stats", className: "label", onClick: this.handleClick}, "Name")
      )
    );
  }
});

var RightTitleBox = React.createClass({displayName: "RightTitleBox",
  handlePopupForm: function(e) {
    this.props.changeStateOfPopupForm(e.target.getAttribute('value'))
  },
  render: function() {
    return (
      React.createElement("div", {className: "right_title_box"}, 
        React.createElement("div", {value: "class_and_level", className: "field", onClick: this.handlePopupForm}, 
          React.createElement("div", {value: "class_and_level", className: "value"}, this.props.character.classes_and_levels), 
          React.createElement("div", {value: "class_and_level", className: "label"}, "Class and Level")
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
  handleSubmit: function(e) {
    e.preventDefault();
    this.props.addClassToCharacter({character_class: {game_class: e.target.getAttribute('value') }});
  },
  render: function() {
    return (
      React.createElement("form", {className: "addClassForm", onSubmit: this.handleSubmit, value: this.props.id}, 
        React.createElement("h2", null, this.props.title), 
        React.createElement("input", {type: "submit", value: "Add"})
      )
    );
  }
});

var ClassAndLevelList = React.createClass({displayName: "ClassAndLevelList",
  render: function() {
    return (
      React.createElement("li", null, "Took a level in ", this.props.title, " at character level ", this.props.level)
    );
  }
});

var AddClassesForm = React.createClass({displayName: "AddClassesForm",
  handelClick: function() {
    this.props.changeStateOfPopupForm('class_and_level')
  },
  render: function() {
    var characterClassNodes = this.props.character_classes.map(function (cclass) {
      return (
        React.createElement(ClassAndLevelList, {id: cclass.id, class_id: cclass.game_class_id, title: cclass.gclass_title, level: cclass.character_level})
      );
    })

    var optionNodes = this.props.avaliable_classes.map(function (gclass) {
      return (
        React.createElement(ClassOptions, {id: gclass.id, title: gclass.title, addClassToCharacter: this.props.addClassToCharacter})
      );
    }, this );

    return (
      React.createElement("div", {id: "class_and_level", className: "popup_form"}, 
        React.createElement("input", {type: "submit", value: "done", onClick: this.handelClick}), 
        React.createElement("div", {className: "pct70"}, 
          optionNodes
        ), 
        React.createElement("div", {className: "pct30"}, 
          React.createElement("ul", null, 
            characterClassNodes
          )
        )
      )
    );
  }
});

var BaseStatsForm = React.createClass({displayName: "BaseStatsForm",
  handelChange: function(e) {
    this.props.updateCharacterLocal(e.target.getAttribute('name'), e.target.value)
  },
  handelClick: function(e) {
    this.props.updateCharacterServer()
    this.props.changeStateOfPopupForm('base_stats')
  },
  render: function() {
    return (
      React.createElement("div", {id: "character_base_stats", className: "popup_form"}, 
        React.createElement("input", {name: "close_and_submit", type: "submit", onClick: this.handelClick}), 
        React.createElement("form", null, 
          React.createElement("label", {name: "name"}, "Character Name"), 
          React.createElement("input", {name: "name", type: "text", value: this.props.character.name, onChange: this.handelChange})
        )
      )
    );
  }
});
     	

$( document ).ready(function() {
  var url = "http://localhost:5000/characters/" + baked.character.id
  React.render(
    React.createElement(FullPage, {character: baked.character, avaliable_classes: baked.avaliable_classes, character_classes: baked.character_classes, url: baked.url}),
    document.getElementById('page')
  );
});

