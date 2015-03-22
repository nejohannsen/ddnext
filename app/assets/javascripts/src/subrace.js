var FullPage = React.createClass({
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
      <div id="FullPage">

        {this.state.editFormVisable ? (
          <EditForm 
            subrace={this.state.subrace}
            races={this.state.races}
            addFeature={this.addClassToCharacter} 
            removeFeature={this.removeFeature} 
            changeFormState={this.changeFormState}
            updatesubraceLocal={this.updatesubraceLocal}
            updatesubraceServer={this.updatesubraceServer}
          />
        ) : (
          <ShowForm 
            subrace={this.state.subrace}
            changeFormState={this.changeFormState}
          />
        )}

      </div>
    );
  }
});

var ShowForm = React.createClass({
  handelClick: function(e) {
    this.props.changeFormState(e)
  },
  render: function() {
    return (
      <div className="main_content" onClick={this.handelClick}>
       <h1>{this.props.subrace.title}</h1><span>{this.props.subrace.race_title}</span>
       <p>{this.props.subrace.description}</p>
      </div>
    );
  }
});

var RaceNode = React.createClass({
  render: function() {
    return (
      <option value={this.props.id}>{this.props.title}</option>
    );
  }
});

var EditForm = React.createClass({
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
        <RaceNode
          id={race.id}
          title={race.title}
          subrace={this.props.subrace}
        />
      );
    }, this);

    return (
      <div className="edit_main_content">
        <form>
          <label>Race</label>
          <select name="race_id" onChange={this.handelChange} value={this.props.subrace.race_id}>
            {raceOptionNodes}
          </select>
          <label>subrace Title:</label>
          <input type="text" value={this.props.subrace.title} name="title" onChange={this.handelChange} />
          <br />
          <label>Description</label>
          <textarea value={this.props.subrace.description} name="description" onChange={this.handelChange} />
          <input value="Done" type="submit" onClick={this.handelClick} />
        </form>
      </div>
    );
  }
});



$( document ).ready(function() {
  React.render( 
    <FullPage 
      subrace={baked.subrace} 
      races={baked.races}
      url={baked.url}
    />,
    document.getElementById('page')
  );
});
