var FullPage = React.createClass({
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
      <div id="FullPage">
        <MainTitle
          addClassToCharacter={this.addClassToCharacter}
          character={this.state.character}
          changeStateOfPopupForm={this.changeStateOfPopupForm}
        />
        <MainPage
          character={this.state.character}
        />

        {this.state.form_visable["class_and_level"] ? (
          <AddClassesForm 
            character={this.state.character}
            addClassToCharacter={this.addClassToCharacter} 
            avaliable_classes={this.state.avaliable_classes} 
            changeStateOfPopupForm={this.changeStateOfPopupForm}
            removeClassLevel={this.removeClassLevel}

          />
        ) : (null)}

	      {this.state.form_visable['base_stats'] ? (
	        <BaseStatsForm
	          character={this.state.character}
	          changeStateOfPopupForm={this.changeStateOfPopupForm}
	          updateCharacterLocal={this.updateCharacterLocal}
	          updateCharacterServer={this.updateCharacterServer}
          />
	      ) : (null)}

        {this.state.form_visable['races'] ? (
	        <RacesForm
	          character={this.state.character}
            races={this.state.races}
	          changeStateOfPopupForm={this.changeStateOfPopupForm}
	          updateCharacterLocal={this.updateCharacterLocal}
	          updateCharacterServer={this.updateCharacterServer}
          />
	      ) : (null)}

      </div>
    );
  }
});

var MainTitle = React.createClass({
  render: function() {
    return (
      <div className="main_title">
        <LeftTitleBox 
	        character={this.props.character}
	        changeStateOfPopupForm={this.props.changeStateOfPopupForm}
	        updateCharacter={this.props.updateCharacter}
	      />
        <RightTitleBox 
	        character={this.props.character} 
	        changeStateOfPopupForm={this.props.changeStateOfPopupForm}
	        updateCharacter={this.props.updateCharacter}
        />
      </div>
    );
  }
});

var LeftTitleBox = React.createClass({
  handleClick: function(e) {
    this.props.changeStateOfPopupForm(e.target.getAttribute('value'))
  },
  render: function() {
    return (
      <div value="base_stats" className="left_title_box" onClick={this.handleClick}>
        <div value="base_stats" className="value" >{this.props.character.name}</div>
        <div value="base_stats" className="label">Name</div>
      </div>
    );
  }
});

var RightTitleBox = React.createClass({
  handlePopupForm: function(e) {
    this.props.changeStateOfPopupForm(e.target.getAttribute('value'))
  },
  render: function() {
    return (
      <div className="right_title_box">
        <div value="class_and_level" className="field" onClick={this.handlePopupForm}>
          <div value="class_and_level" className="value">{this.props.character.classes_and_levels}</div>
          <div value="class_and_level" className="label">Class and Level</div>
        </div>
        <div value="base_stats" onClick={this.handlePopupForm} className="field">
          <div value="base_stats" className="value">Background</div>
          <div cvalue="base_stats" lassName="label">Backgorund</div>
        </div>
        <div value="base_stats" onClick={this.handlePopupForm} className="field">
          <div value="base_stats" className="value">{this.props.character.player}</div>
          <div value="base_stats" className="label">Player Name</div>
        </div>
        <div value="base_stats" onClick={this.handlePopupForm} className="field">
          <div value="base_stats" className="value">{this.props.character.faction}</div>
          <div value="base_stats" className="label">Faction</div>
        </div>
        <div value="race" onClick={this.handlePopupForm} className="field">
          <div value="races" className="value">{this.props.character.race}</div>
          <div value="races" className="label">Race</div>
        </div>
        <div value="base_stats" onClick={this.handlePopupForm} className="field">
          <div value="base_stats" className="value">{this.props.character.alignment}</div>
          <div value="base_stats" className="label">Alignment</div>
        </div>
        <div value="base_stats" onClick={this.handlePopupForm} className="field">
          <div value="base_stats" className="value">{this.props.character.experince_points}</div>
          <div value="base_stats" className="label">Experince</div>
        </div>
        <div value="base_stats" onClick={this.handlePopupForm} className="field">
          <div value="base_stats" className="value">{this.props.character.dci}</div>
          <div value="base_stats" className="label">DCI Number</div>
        </div>
      </div>
    );
  }
});

var AbilityList = React.createClass({
  render: function() {
    return (
      <div className="ability" >
        <div className="title">
          {this.props.title.toUpperCase()}
        </div>
        <div className="value">
          {this.props.score}
        </div>
        <div className="bonus">
          <div className="text">
            {this.props.bonus}
          </div>
        </div>
      </div>
    );
  }
});

var Abilities = React.createClass({
  render: function() {
    var abilityNodes = this.props.character.abilities.data.map(function (ability) {
      return (
        <AbilityList
          title={ability.title}
          score={ability.score}
          bonus={ability.bonus}
        />
      );
    }, this )
    return (
      <div className="abilities">
        {abilityNodes}
      </div>
    );
  }
});

var MainPage = React.createClass({
  render: function() {
    return (
      <div className="main_page">
        <div className="column">
          <div className="abilities_and_stuff">
            <Abilities
              character={this.props.character}
            />
          </div>
        </div>
      </div>
    );
  }
});



var ClassOptions = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    this.props.addClassToCharacter({title: e.target.getAttribute('value') });
  },
  render: function() {
    return (
      <form className="addClassForm" onSubmit={this.handleSubmit} value={this.props.title} >
        <h2>{this.props.title}</h2>
        <input type="submit" value="Add" />
      </form>
    );
  }
});

var ClassAndLevelList = React.createClass({
  handelClick: function(e) {
    e.preventDefault();
    this.props.removeClassLevel({level: e.target.getAttribute('value')})
  },
  render: function() {
    return (
      <div>
        <li>Took a level in {this.props.title} at character level {this.props.level}</li>
        <a href="" onClick={this.handelClick} value={this.props.level ? this.props.level : "0"}>Remove</a>
      </div>
    );
  }
});

var AddClassesForm = React.createClass({
  handelClick: function() {
    this.props.changeStateOfPopupForm('class_and_level')
  },
  render: function() {
      var characterClassNodes = this.props.character.character_classes.map(function (cclass) {
        return (
          <ClassAndLevelList 
            id={cclass.id} 
            title={cclass.title} 
            level={cclass.level} 
            removeClassLevel={this.props.removeClassLevel}
          />
        );
      }, this)
    var optionNodes = this.props.avaliable_classes.map(function (gclass) {
      return (
        <ClassOptions 
          id={gclass.id}
          title={gclass.title}
          addClassToCharacter={this.props.addClassToCharacter}
        />
      );
    }, this );

    return (
      <div id="class_and_level" className='popup_form'>
        <input type='submit' value='done' onClick={this.handelClick} />
        <div className='pct70'>
          { (this.props.character.level > this.props.character.character_classes.length) ? (optionNodes) : (<h2>Can not level until you up your experince</h2>)}
        </div>
        <div className='pct30'>
          <ul>
            {characterClassNodes}
          </ul>
        </div>
      </div>
    );
  }
});

var BaseStatsForm = React.createClass({
  handelChange: function(e) {
    this.props.updateCharacterLocal(e.target.getAttribute('name'), e.target.value)
  },
  handelClick: function(e) {
    this.props.updateCharacterServer()
    this.props.changeStateOfPopupForm('base_stats')
  },
  render: function() {
    return (
      <div id='character_base_stats' className='popup_form'>
        <input name="close_and_submit" type="submit" onClick={this.handelClick} />
        <form>
          <label name='name'>Character Name</label>
          <input name='name' type='text' value={this.props.character.name} onChange={this.handelChange} />
          <br />
          <label name='player'>Player Name</label>
          <input name='player' type='text' value={this.props.character.player} onChange={this.handelChange} />
          <br />
          <label name='dci'>DCI Number</label>
          <input name='dci' type='text' value={this.props.character.dci} onChange={this.handelChange} />
          <br />
          <label name='experince_points'>Experince</label>
          <input name='experince_points' type='text' value={this.props.character.experince_points} onChange={this.handelChange} />
          <br />

          <label name='alignment'>Alignment</label>
          <select name='alignment' type='text' value={this.props.character.alignment} onChange={this.handelChange}>
            <option value="Lawfull Good">Lawfull Good</option>
            <option value="Neutral Good">Neutral Good</option>
            <option value="Chaotic Good">Chaotic Good</option>
            <option value="Lawfull Neutral">Lawfull Neutral</option>
            <option value="Neutral">True Neutral</option>
            <option value="Chaotic Neutral">Chaotic Neutral</option>
          </select>
          <br />
          <label name='faction'>Faction</label>
          <select name='faction' value={this.props.character.faction} onChange={this.handelChange}>
            <option value="Harpers">Harpers</option>
            <option value="Order of the Gauntlet">Order of the Gauntlet</option>
            <option value="Lords’ Alliance">Lords’ Alliance</option>
            <option value="Zhentarim">Zhentarim</option>
            <option value="Emerald Enclave">Emerald Enclave</option>
          </select>
        </form>
      </div>
    );
  }
});

var SubRaceList = React.createClass({
  handelClick: function(e) {
    this.props.updateCharacterLocal("race", e.target.value);
    this.props.updateCharacterServer();
  },
  render: function() {
    return (
      <div className="sub_race" >
        <input onClick={this.handelClick} id={this.props.title.replace(/ /g,"_").toLowerCase()} type="radio" value={this.props.title} name='sub_race_option' />
        <label htmlFor={this.props.title.replace(/ /g,"_").toLowerCase()}>{this.props.title}</label>
      </div>
    );
  }
});

var RaceList = React.createClass({
  render: function() {
    var subRaceNodes = this.props.sub_races.map(function(sub) {
      return (
        <div>
          <SubRaceList
            title={sub.title}
            description={sub.description}
            updateCharacterLocal={this.props.updateCharacterLocal}
            updateCharacterServer={this.props.updateCharacterServer}
          />
        </div>
      );
    }, this);

    return (
      <div>
        <h2>{this.props.title}</h2>
        <div className>
          {subRaceNodes}
        </div>
      </div>
    );
  }
});

var RacesForm = React.createClass({
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
        <RaceList 
          title={race.title}
          description={race.description}
          sub_races={race.sub}
          updateCharacterLocal={this.props.updateCharacterLocal}
          updateCharacterServer={this.props.updateCharacterServer}
        />
      );
    }, this )

    return (
      <div id='race_form' className='popup_form'>
        <input name="close_and_submit" type="submit" onClick={this.handelClick} />
        <div className="pct50">
          {raceNodes}
        </div>
        <div className="pct50">
          <h2>{this.props.character.race_info.race.title}</h2>
          {this.props.character.race_info.race.description}
          <h2>{this.props.character.race_info.subrace.title}</h2>
          {this.props.character.race_info.subrace.description}
        </div>
      </div>
    );
  }
});



$( document ).ready(function() {
  var url = "http://localhost:5000/characters/" + baked.character.id
  React.render(
    <FullPage 
      character={baked.character} 
      avaliable_classes={baked.avaliable_classes} 
      races={baked.races}
      url={baked.url}
    />,
    document.getElementById('page')
  );
});

