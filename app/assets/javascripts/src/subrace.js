var FullPage = React.createClass({
  getInitialState: function() {
    return {
      url: this.props.url,
      races: this.props.races,
      subrace: this.props.subrace,
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
      data: {subrace: jsonSendData},
      success: function(data) {
        this.setState({subrace: data["subrace"]});
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
        this.setState({subrace: data["subrace"]});
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
      data: {subrace: jsonSendData},
      success: function(data) {
        this.setState({subrace: data["subrace"]});
      }.bind(this),
      error: function(xhr, status, err) {
       /* console.error(this.props.url, status, err.toString());*/
      }.bind(this)
    });
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
          <div>
            <EditForm 
              subrace={this.state.subrace}
              races={this.state.races}
              changeFormState={this.changeFormState}
              updatesubraceLocal={this.updatesubraceLocal}
              updatesubraceServer={this.updatesubraceServer}
            />
            <FeatureForm
              subrace={this.state.subrace}
              addFeature={this.addFeatureServer}
              removeFeatureServer={this.removeFeatureServer}
              updateFeatureServer={this.updateFeatureServer}
            />
          </div>
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
    var eachFeature = this.props.subrace.to_add_features.map(function(feature) {
      return (
          <ShowSingelFeature
            feature = {feature}
          />
      );
    }, this);

    return (
      <div className="main_content" onClick={this.handelClick}>
       <h1>{this.props.subrace.title}</h1>
       <p>{this.props.subrace.description}</p>
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

var SingelFeature = React.createClass({
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
          <input type="text" name="type" value={this.props.feature.type} onChange={this.handelChange} />
          <br />
          <label>What area is the feature to be applyed to</label>
          <input type="text" name="category" value={this.props.feature.category} onChange={this.handelChange} />
          <br />
          <label>What stat should the featues value be aplyed to</label>
          <input type="text" name="subcategory" value={this.props.feature.subcategory} onChange={this.handelChange} />
          <br />
          <label>Value to be applyed.</label>
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
    var eachFeature = this.props.subrace.to_add_features.map(function(feature) {
      return (
        <div>
          <SingelFeature
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
