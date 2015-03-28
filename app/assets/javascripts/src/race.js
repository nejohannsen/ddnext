var FullPage = React.createClass({
  getInitialState: function() {
    return {
      url: this.props.url,
      subraces: this.props.subraces,
      race: this.props.race,
      editFormVisable: false
    };
  },
  updateFeatureServer: function(feature) {
    var jsonSendData = JSON.stringify(feature)
    var url = this.props.url + "/update_feature"
    $.ajax({
      url: url,
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
  addFeatureServer: function() {
    var url = this.props.url + "/add_feature"
    $.ajax({
      url: url,
      dataType: 'json',
      type: 'PATCH',
      success: function(data) {
        this.setState({race: data["race"]});
      }.bind(this),
      error: function(xhr, status, err) {
       /* console.error(this.props.url, status, err.toString());*/
      }.bind(this)
    });
  },
  removeFeatureServer: function(feature) {
    var jsonSendData = JSON.stringify(feature)
    var url = this.props.url + "/remove_feature"
    $.ajax({
      url: url,
      dataType: 'json',
      type: 'PATCH',
      data: {race: jsonSendData},
      success: function(data) {
        this.setState({subrace: data["race"]});
      }.bind(this),
      error: function(xhr, status, err) {
       /* console.error(this.props.url, status, err.toString());*/
      }.bind(this)
    });
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
      <div id="FullPage">

        {this.state.editFormVisable ? (
          <div>
            <EditForm 
              race={this.state.race}
              changeFormState={this.changeFormState}
              updateRaceLocal={this.updateRaceLocal}
              updateRaceServer={this.updateRaceServer}
            />
            <FeatureForm
                race={this.state.race}
                addFeature={this.addFeatureServer}
                removeFeatureServer={this.removeFeatureServer}
                updateFeatureServer={this.updateFeatureServer}
            />
          </div>
        ) : (
          <ShowForm 
            race={this.state.race}
            changeFormState={this.changeFormState}
          />
        )}

      </div>
    );
  }
});

var ShowSingelFeature = React.createClass({
  render: function() {
    return (
      <tr>
        <td>{this.props.feature.title}</td>
        <td>{this.props.feature.type}</td>
        <td>{this.props.feature.category}</td>
        <td>{this.props.feature.subcategory}</td>
        <td>{this.props.feature.value}</td>
      </tr>
    );
  }
});


var ShowForm = React.createClass({
  handelClick: function(e) {
    this.props.changeFormState(e)
  },
  render: function() {
    var eachFeature = this.props.race.to_add_features.map(function(feature) {
      return (
          <ShowSingelFeature
            feature = {feature}
          />
      );
    }, this);

    return (
      <div className="main_content" onClick={this.handelClick}>
       <h1>{this.props.race.title}</h1>
       <p>{this.props.race.description}</p>
       <table>
         <tr>
           <th>Title</th>
           <th>Type</th>
           <th>Category</th>
           <th>Subcategory</th>
           <th>Value</th>
         </tr>
         {eachFeature}
        </table>
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

var EditSingelFeature = React.createClass({
  handelChange: function(e) {
    if (this.props.feature[e.target.name] != e.target.value) {
      feature = this.props.feature
      feature[e.target.name] = e.target.value
      this.props.updateFeatureServer(feature)
    }
  },
  handelClick: function(e) {
    e.preventDefault()
    this.props.removeFeatureServer(this.props.feature)
  },
  render: function() {
    return (
      <div className="feature">
        <form>
          <br />
          <label>Type of Feature</label>
          <input type="text" name="title" value={this.props.feature.title} onChange={this.handelChange} />
          <br />
          <label>Type of Feature</label>
          <input type="text" name="type" value={this.props.feature.type} onChange={this.handelChange} />
          <br />
          <label>What area is the feature to be applyed to</label>
          <input type="text" name="category" value={this.props.feature.category} onChange={this.handelChange} />
          <br />
          <label>What stat should the featues value be aplyed to</label>
          <input type="text" name="subcategory" value={this.props.feature.subcategory} onChange={this.handelChange} />
          <br />
          <label>value to be applyed.</label>
          <input type="text" name="value" value={this.props.feature.value} onChange={this.handelChange} />
          <br />
          <input type='submit' onClick={this.handelClick} value="Remove Feature" />
        </form>
      </div>
    );
  }
});

var FeatureForm = React.createClass({
  handelClick: function(e) {
    this.props.addFeature()
  },
  render: function() {
    var eachFeature = this.props.race.to_add_features.map(function(feature) {
      return (
        <div>
          <EditSingelFeature
            feature = {feature}
            updateFeatureServer={this.props.updateFeatureServer}
            removeFeatureServer={this.props.removeFeatureServer}
          />
        </div>
      );
    }, this);
    return (
      <div>
        {eachFeature}
        <input type='submit' onClick={this.handelClick} value="Add Feature" /> 
      </div>
    );
  }
});


var EditForm = React.createClass({
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
      <div className="edit_main_content">
        <form>
          <label>Race Title:</label>
          <input type="text" value={this.props.race.title} name="title" onChange={this.handelChange} />
          <br />
          <label>Description</label>
          <textarea value={this.props.race.description} name="description" onChange={this.handelChange} />
          <input value="Done" type="submit" onClick={this.handelClick} />
        </form>
      </div>
    );
  }
});



$( document ).ready(function() {
  var url = "http://localhost:5000/races/" + baked.race.id
  React.render(
    <FullPage 
      race={baked.race} 
      subraces={baked.subraces}
      url={baked.url}
    />,
    document.getElementById('page')
  );
});
