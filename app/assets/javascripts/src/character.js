var FullPage = React.createClass({
  getInitialState: function() {
    return {
      url: this.props.url, 
      character: this.props.character, 
      avaliable_classes: this.props.avaliable_classes, 
      character_classes: this.props.character_classes,
      form_visable: {class_and_level: false}
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
      <div id="FullPage">
        <MainTitle
          addClassToCharacter={this.addClassToCharacter}
          character={this.state.character}
          changeStateOfPopupForm={this.changeStateOfPopupForm}
        />
        <MainPage />

        {this.state.form_visable["class_and_level"] ? (
          <AddClassesForm 
            addClassToCharacter={this.addClassToCharacter} 
            avaliable_classes={this.state.avaliable_classes} 
            character_classes={this.state.character_classes} 
            changeStateOfPopupForm={this.changeStateOfPopupForm}
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
        <LeftTitleBox character={this.props.character} />
        <RightTitleBox character={this.props.character} changeStateOfPopupForm={this.props.changeStateOfPopupForm} />
      </div>
    );
  }
});

var LeftTitleBox = React.createClass({
  render: function() {
    return (
      <div className="left_title_box">
        <div className="vaule">{this.props.character.name}</div>
        <div className="label">Name</div>
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
        <div className="field">
          <div className="value">Background</div>
          <div className="label">Backgorund</div>
        </div>
        <div className="field">
          <div className="value">Nick</div>
          <div className="label">Player Name</div>
        </div>
        <div className="field">
          <div className="value">Harpers</div>
          <div className="label">Faction</div>
        </div>
        <div className="field">
          <div className="value">Hill Dwarf</div>
          <div className="label">Race</div>
        </div>
        <div className="field">
          <div className="value">Alignment</div>
          <div className="label">Alignment</div>
        </div>
        <div className="field">
          <div className="value">2700</div>
          <div className="label">Experince</div>
        </div>
        <div className="field">
          <div className="value">4u7985748957435</div>
          <div className="label">DCI Number</div>
        </div>
      </div>
    );
  }
});

var MainPage = React.createClass({
  render: function() {
    return (
      <div className="main_page"></div>
    );
  }
});

var ClassOptions = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    this.props.addClassToCharacter({character_class: {game_class: e.target.getAttribute('value') }});
  },
  render: function() {
    return (
      <form className="addClassForm" onSubmit={this.handleSubmit} value={this.props.id} >
        <h2>{this.props.title}</h2>
        <input type="submit" value="Add" />
      </form>
    );
  }
});

var ClassAndLevelList = React.createClass({
  render: function() {
    return (
      <li>Took a level in {this.props.title} at character level {this.props.level}</li>
    );
  }
});

var AddClassesForm = React.createClass({
  handelClick: function() {
    this.props.changeStateOfPopupForm('class_and_level')
  },
  render: function() {
    var props = this.props;
    var characterClassNodes = this.props.character_classes.map(function (cclass) {
      return (
        <ClassAndLevelList id={cclass.id} class_id={cclass.game_class_id} title={cclass.gclass_title} level={cclass.character_level} />
      );
    })

    var optionNodes = this.props.avaliable_classes.map(function (gclass) {
      return (
        <ClassOptions id={gclass.id} title={gclass.title}  addClassToCharacter={this.props.addClassToCharacter} />
      );
    }, this );

    return (
      <div id="class_and_level" className='popup_form'>
        <input type='submit' value='done' onClick={this.handelClick} />
        <div className='pct70'>
          {optionNodes}
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

$( document ).ready(function() {
  React.render(
    <FullPage character={baked.character} avaliable_classes={baked.avaliable_classes} character_classes={baked.character_classes} url={baked.url} />,
    document.getElementById('page')
  );
});

