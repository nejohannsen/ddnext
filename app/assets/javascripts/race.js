var FullPage = React.createClass({displayName: "FullPage",
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
      React.createElement("div", {id: "FullPage"}, 

        this.state.editFormVisable ? (
          React.createElement("div", null, 
            React.createElement(EditForm, {
              race: this.state.race, 
              changeFormState: this.changeFormState, 
              updateRaceLocal: this.updateRaceLocal, 
              updateRaceServer: this.updateRaceServer}
            ), 
            React.createElement(FeatureForm, {
                race: this.state.race, 
                addFeature: this.addFeatureServer, 
                removeFeatureServer: this.removeFeatureServer, 
                updateFeatureServer: this.updateFeatureServer}
            )
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

var ShowSingelFeature = React.createClass({displayName: "ShowSingelFeature",
  render: function() {
    return (
      React.createElement("tr", null, 
        React.createElement("td", null, this.props.feature.title), 
        React.createElement("td", null, this.props.feature.type), 
        React.createElement("td", null, this.props.feature.category), 
        React.createElement("td", null, this.props.feature.subcategory), 
        React.createElement("td", null, this.props.feature.value)
      )
    );
  }
});


var ShowForm = React.createClass({displayName: "ShowForm",
  handelClick: function(e) {
    this.props.changeFormState(e)
  },
  render: function() {
    var eachFeature = this.props.race.to_add_features.map(function(feature) {
      return (
          React.createElement(ShowSingelFeature, {
            feature: feature}
          )
      );
    }, this);

    return (
      React.createElement("div", {className: "main_content", onClick: this.handelClick}, 
       React.createElement("h1", null, this.props.race.title), 
       React.createElement("p", null, this.props.race.description), 
       React.createElement("table", null, 
         React.createElement("tr", null, 
           React.createElement("th", null, "Title"), 
           React.createElement("th", null, "Type"), 
           React.createElement("th", null, "Category"), 
           React.createElement("th", null, "Subcategory"), 
           React.createElement("th", null, "Value")
         ), 
         eachFeature
        )
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

var EditSingelFeature = React.createClass({displayName: "EditSingelFeature",
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
      React.createElement("div", {className: "feature"}, 
        React.createElement("form", null, 
          React.createElement("br", null), 
          React.createElement("label", null, "Type of Feature"), 
          React.createElement("input", {type: "text", name: "title", value: this.props.feature.title, onChange: this.handelChange}), 
          React.createElement("br", null), 
          React.createElement("label", null, "Type of Feature"), 
          React.createElement("input", {type: "text", name: "type", value: this.props.feature.type, onChange: this.handelChange}), 
          React.createElement("br", null), 
          React.createElement("label", null, "What area is the feature to be applyed to"), 
          React.createElement("input", {type: "text", name: "category", value: this.props.feature.category, onChange: this.handelChange}), 
          React.createElement("br", null), 
          React.createElement("label", null, "What stat should the featues value be aplyed to"), 
          React.createElement("input", {type: "text", name: "subcategory", value: this.props.feature.subcategory, onChange: this.handelChange}), 
          React.createElement("br", null), 
          React.createElement("label", null, "value to be applyed."), 
          React.createElement("input", {type: "text", name: "value", value: this.props.feature.value, onChange: this.handelChange}), 
          React.createElement("br", null), 
          React.createElement("input", {type: "submit", onClick: this.handelClick, value: "Remove Feature"})
        )
      )
    );
  }
});

var FeatureForm = React.createClass({displayName: "FeatureForm",
  handelClick: function(e) {
    this.props.addFeature()
  },
  render: function() {
    var eachFeature = this.props.race.to_add_features.map(function(feature) {
      return (
        React.createElement("div", null, 
          React.createElement(EditSingelFeature, {
            feature: feature, 
            updateFeatureServer: this.props.updateFeatureServer, 
            removeFeatureServer: this.props.removeFeatureServer}
          )
        )
      );
    }, this);
    return (
      React.createElement("div", null, 
        eachFeature, 
        React.createElement("input", {type: "submit", onClick: this.handelClick, value: "Add Feature"})
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
  var url = "http://localhost:5000/races/" + baked.race.id
  React.render(
    React.createElement(FullPage, {
      race: baked.race, 
      subraces: baked.subraces, 
      url: baked.url}
    ),
    document.getElementById('page')
  );
});
