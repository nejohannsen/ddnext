var FullPage = React.createClass({displayName: "FullPage",
  getInitialState: function() {
    return {
      url: this.props.url,
      races: this.props.races,
      character: this.props.character,
      avaliable_classes: this.props.avaliable_classes,
      form_visable: {class_and_level: false, base_stats: false, races:false}
    };
  },
  addClassToCharacter: function(title) {
    cclass = this.state.character.character_classes
    cclass.push({'title': title, level: cclass.length + 1})
    this.updateCharacterLocal("character_classes", cclass)
    $.ajax({
      url: this.props.url + "/add_class_level",
      dataType: 'json',
      type: 'PATCH',
      data: title,
      success: function(data) {
        this.setState({character: data["character"]});
      }.bind(this),
      error: function(xhr, status, err) {
       /* console.error(this.props.url, status, err.toString());*/
      }.bind(this)
    });
  },
  updateCharacterLocal: function(attr, value) {
    var character = this.state.character
    character[attr] = value
    this.setState({character: character})

  },
  updateCharacterServer: function(character) {
    var jsonSendData = JSON.stringify(this.state.character)
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'PATCH',
      data: {character: jsonSendData},
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
      success: function(data) {
        this.setState({character: data.character});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  removeClassLevel: function(level) {
    url = this.props.url + '/remove_class_level'
    $.ajax({
      url: url,
      dataType: 'json',
      type: 'PATCH',
      data: level,
      success: function(data) {
        this.setState({character: data["character"]});
      }.bind(this),
      error: function(xhr, status, err) {
       /* console.error(this.props.url, status, err.toString());*/
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
        React.createElement(MainPage, {
          character: this.state.character}
        ), 

        this.state.form_visable["class_and_level"] ? (
          React.createElement(AddClassesForm, {
            character: this.state.character, 
            addClassToCharacter: this.addClassToCharacter, 
            avaliable_classes: this.state.avaliable_classes, 
            changeStateOfPopupForm: this.changeStateOfPopupForm, 
            removeClassLevel: this.removeClassLevel}

          )
        ) : (null), 

	      this.state.form_visable['base_stats'] ? (
	        React.createElement(BaseStatsForm, {
	          character: this.state.character, 
	          changeStateOfPopupForm: this.changeStateOfPopupForm, 
	          updateCharacterLocal: this.updateCharacterLocal, 
	          updateCharacterServer: this.updateCharacterServer}
          )
	      ) : (null), 

        this.state.form_visable['races'] ? (
	        React.createElement(RacesForm, {
	          character: this.state.character, 
            races: this.state.races, 
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
      React.createElement("div", {value: "base_stats", className: "left_title_box", onClick: this.handleClick}, 
        React.createElement("div", {value: "base_stats", className: "value"}, this.props.character.name), 
        React.createElement("div", {value: "base_stats", className: "label"}, "Name")
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
        React.createElement("div", {value: "base_stats", onClick: this.handlePopupForm, className: "field"}, 
          React.createElement("div", {value: "base_stats", className: "value"}, "Background"), 
          React.createElement("div", {cvalue: "base_stats", lassName: "label"}, "Backgorund")
        ), 
        React.createElement("div", {value: "base_stats", onClick: this.handlePopupForm, className: "field"}, 
          React.createElement("div", {value: "base_stats", className: "value"}, this.props.character.player), 
          React.createElement("div", {value: "base_stats", className: "label"}, "Player Name")
        ), 
        React.createElement("div", {value: "base_stats", onClick: this.handlePopupForm, className: "field"}, 
          React.createElement("div", {value: "base_stats", className: "value"}, this.props.character.faction), 
          React.createElement("div", {value: "base_stats", className: "label"}, "Faction")
        ), 
        React.createElement("div", {value: "race", onClick: this.handlePopupForm, className: "field"}, 
          React.createElement("div", {value: "races", className: "value"}, this.props.character.race), 
          React.createElement("div", {value: "races", className: "label"}, "Race")
        ), 
        React.createElement("div", {value: "base_stats", onClick: this.handlePopupForm, className: "field"}, 
          React.createElement("div", {value: "base_stats", className: "value"}, this.props.character.alignment), 
          React.createElement("div", {value: "base_stats", className: "label"}, "Alignment")
        ), 
        React.createElement("div", {value: "base_stats", onClick: this.handlePopupForm, className: "field"}, 
          React.createElement("div", {value: "base_stats", className: "value"}, this.props.character.experince_points), 
          React.createElement("div", {value: "base_stats", className: "label"}, "Experince")
        ), 
        React.createElement("div", {value: "base_stats", onClick: this.handlePopupForm, className: "field"}, 
          React.createElement("div", {value: "base_stats", className: "value"}, this.props.character.dci), 
          React.createElement("div", {value: "base_stats", className: "label"}, "DCI Number")
        )
      )
    );
  }
});

var AbilityList = React.createClass({displayName: "AbilityList",
  render: function() {
    return (
      React.createElement("div", {className: "ability"}, 
        React.createElement("div", {className: "title"}, 
          this.props.title.toUpperCase()
        ), 
        React.createElement("div", {className: "value"}, 
          this.props.score
        ), 
        React.createElement("div", {className: "bonus"}, 
          React.createElement("div", {className: "text"}, 
            this.props.bonus
          )
        )
      )
    );
  }
});



var Abilities = React.createClass({displayName: "Abilities",
  render: function() {
    var abilityNodes = Object.keys(this.props.character.abilities).map(function (key, i) {
      if (key != "meta" && key != "id") {
        return (
          React.createElement(AbilityList, {
            title: key, 
            score: this.props.character.abilities[key].score, 
            bonus: this.props.character.abilities[key].bonus}
          )
        );
      };
    }, this )
    return (
      React.createElement("div", {className: "abilities"}, 
        abilityNodes
      )
    );
  }
});

var MainPage = React.createClass({displayName: "MainPage",
  render: function() {
    return (
      React.createElement("div", {className: "main_page"}, 
        React.createElement("div", {className: "column"}, 
          React.createElement("div", {className: "abilities_and_stuff"}, 
            React.createElement(Abilities, {
              character: this.props.character}
            )
          )
        )
      )
    );
  }
});



var ClassOptions = React.createClass({displayName: "ClassOptions",
  handleSubmit: function(e) {
    e.preventDefault();
    this.props.addClassToCharacter({title: e.target.getAttribute('value') });
  },
  render: function() {
    return (
      React.createElement("form", {className: "addClassForm", onSubmit: this.handleSubmit, value: this.props.title}, 
        React.createElement("h2", null, this.props.title), 
        React.createElement("input", {type: "submit", value: "Add"})
      )
    );
  }
});

var ClassAndLevelList = React.createClass({displayName: "ClassAndLevelList",
  handelClick: function(e) {
    e.preventDefault();
    this.props.removeClassLevel({level: e.target.getAttribute('value')})
  },
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement("li", null, "Took a level in ", this.props.title, " at character level ", this.props.level), 
        React.createElement("a", {href: "", onClick: this.handelClick, value: this.props.level ? this.props.level : "0"}, "Remove")
      )
    );
  }
});

var AddClassesForm = React.createClass({displayName: "AddClassesForm",
  handelClick: function() {
    this.props.changeStateOfPopupForm('class_and_level')
  },
  render: function() {
      var characterClassNodes = this.props.character.character_classes.map(function (cclass) {
        return (
          React.createElement(ClassAndLevelList, {
            id: cclass.id, 
            title: cclass.title, 
            level: cclass.level, 
            removeClassLevel: this.props.removeClassLevel}
          )
        );
      }, this)
    var optionNodes = this.props.avaliable_classes.map(function (gclass) {
      return (
        React.createElement(ClassOptions, {
          id: gclass.id, 
          title: gclass.title, 
          addClassToCharacter: this.props.addClassToCharacter}
        )
      );
    }, this );

    return (
      React.createElement("div", {id: "class_and_level", className: "popup_form"}, 
        React.createElement("input", {type: "submit", value: "done", onClick: this.handelClick}), 
        React.createElement("div", {className: "pct70"}, 
           (this.props.character.level > this.props.character.character_classes.length) ? (optionNodes) : (React.createElement("h2", null, "Can not level until you up your experince"))
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
          React.createElement("input", {name: "name", type: "text", value: this.props.character.name, onChange: this.handelChange}), 
          React.createElement("br", null), 
          React.createElement("label", {name: "player"}, "Player Name"), 
          React.createElement("input", {name: "player", type: "text", value: this.props.character.player, onChange: this.handelChange}), 
          React.createElement("br", null), 
          React.createElement("label", {name: "dci"}, "DCI Number"), 
          React.createElement("input", {name: "dci", type: "text", value: this.props.character.dci, onChange: this.handelChange}), 
          React.createElement("br", null), 
          React.createElement("label", {name: "experince_points"}, "Experince"), 
          React.createElement("input", {name: "experince_points", type: "text", value: this.props.character.experince_points, onChange: this.handelChange}), 
          React.createElement("br", null), 

          React.createElement("label", {name: "alignment"}, "Alignment"), 
          React.createElement("select", {name: "alignment", type: "text", value: this.props.character.alignment, onChange: this.handelChange}, 
            React.createElement("option", {value: "Lawfull Good"}, "Lawfull Good"), 
            React.createElement("option", {value: "Neutral Good"}, "Neutral Good"), 
            React.createElement("option", {value: "Chaotic Good"}, "Chaotic Good"), 
            React.createElement("option", {value: "Lawfull Neutral"}, "Lawfull Neutral"), 
            React.createElement("option", {value: "Neutral"}, "True Neutral"), 
            React.createElement("option", {value: "Chaotic Neutral"}, "Chaotic Neutral")
          ), 
          React.createElement("br", null), 
          React.createElement("label", {name: "faction"}, "Faction"), 
          React.createElement("select", {name: "faction", value: this.props.character.faction, onChange: this.handelChange}, 
            React.createElement("option", {value: "Harpers"}, "Harpers"), 
            React.createElement("option", {value: "Order of the Gauntlet"}, "Order of the Gauntlet"), 
            React.createElement("option", {value: "Lords’ Alliance"}, "Lords’ Alliance"), 
            React.createElement("option", {value: "Zhentarim"}, "Zhentarim"), 
            React.createElement("option", {value: "Emerald Enclave"}, "Emerald Enclave")
          )
        )
      )
    );
  }
});

var SubRaceList = React.createClass({displayName: "SubRaceList",
  handelClick: function(e) {
    this.props.updateCharacterLocal("race", e.target.value);
    this.props.updateCharacterServer();
  },
  render: function() {
    return (
      React.createElement("div", {className: "sub_race"}, 
        React.createElement("input", {onClick: this.handelClick, id: this.props.title.replace(/ /g,"_").toLowerCase(), type: "radio", value: this.props.title, name: "sub_race_option"}), 
        React.createElement("label", {htmlFor: this.props.title.replace(/ /g,"_").toLowerCase()}, this.props.title)
      )
    );
  }
});

var RaceList = React.createClass({displayName: "RaceList",
  render: function() {
    var subRaceNodes = this.props.sub_races.map(function(sub) {
      return (
        React.createElement("div", null, 
          React.createElement(SubRaceList, {
            title: sub.title, 
            description: sub.description, 
            updateCharacterLocal: this.props.updateCharacterLocal, 
            updateCharacterServer: this.props.updateCharacterServer}
          )
        )
      );
    }, this);

    return (
      React.createElement("div", null, 
        React.createElement("h2", null, this.props.title), 
        React.createElement("div", {className: true}, 
          subRaceNodes
        )
      )
    );
  }
});

var RacesForm = React.createClass({displayName: "RacesForm",
  getInitialState: function() {
    return {
      races: this.props.races,
      character: this.props.character,
      avaliable_classes: this.props.avaliable_classes,
      form_visable: {class_and_level: false, base_stats: false, races:false}
    };
  },
  getSelectedRace: function() {

  },
  updateSelectedRace: function(data) {
    this.setState({selected_race_info: data})
  },
  handelChange: function(e) {
    this.props.updateCharacterLocal(e.target.getAttribute('name'), e.target.value)
  },
  handelClick: function(e) {
    this.props.updateCharacterServer()
    this.props.changeStateOfPopupForm('races')
  },
  render: function() {
    var raceNodes = this.props.races.map(function (race) {
      return (
        React.createElement(RaceList, {
          title: race.title, 
          description: race.description, 
          sub_races: race.sub, 
          updateCharacterLocal: this.props.updateCharacterLocal, 
          updateCharacterServer: this.props.updateCharacterServer}
        )
      );
    }, this )

    return (
      React.createElement("div", {id: "race_form", className: "popup_form"}, 
        React.createElement("input", {name: "close_and_submit", type: "submit", onClick: this.handelClick}), 
        React.createElement("div", {className: "pct50"}, 
          raceNodes
        ), 
        React.createElement("div", {className: "pct50"}, 
          React.createElement("h2", null, this.props.character.race_info.race.title), 
          this.props.character.race_info.race.description, 
          React.createElement("h2", null, this.props.character.race_info.subrace.title), 
          this.props.character.race_info.subrace.description
        )
      )
    );
  }
});



$( document ).ready(function() {
  React.render(
    React.createElement(FullPage, {
      character: baked.character, 
      avaliable_classes: baked.avaliable_classes, 
      races: baked.races, 
      url: baked.url}
    ),
    document.getElementById('page')
  );
});

