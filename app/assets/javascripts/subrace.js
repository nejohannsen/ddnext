var FullPage = React.createClass({displayName: "FullPage",
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
      React.createElement("div", {id: "FullPage"}, 

        this.state.editFormVisable ? (
          React.createElement("div", null, 
            React.createElement(EditForm, {
              subrace: this.state.subrace, 
              races: this.state.races, 
              changeFormState: this.changeFormState, 
              updatesubraceLocal: this.updatesubraceLocal, 
              updatesubraceServer: this.updatesubraceServer}
            ), 
            React.createElement(FeatureForm, {
              subrace: this.state.subrace, 
              addFeature: this.addFeatureServer, 
              removeFeatureServer: this.removeFeatureServer, 
              updateFeatureServer: this.updateFeatureServer}
            )
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
    var eachFeature = this.props.subrace.to_add_features.map(function(feature) {
      return (
          React.createElement(ShowSingelFeature, {
            feature: feature}
          )
      );
    }, this);

    return (
      React.createElement("div", {className: "main_content", onClick: this.handelClick}, 
       React.createElement("h1", null, this.props.subrace.title), 
       React.createElement("p", null, this.props.subrace.description), 
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

var SingelFeature = React.createClass({displayName: "SingelFeature",
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
          React.createElement("input", {type: "text", name: "type", value: this.props.feature.type, onChange: this.handelChange}), 
          React.createElement("br", null), 
          React.createElement("label", null, "What area is the feature to be applyed to"), 
          React.createElement("input", {type: "text", name: "category", value: this.props.feature.category, onChange: this.handelChange}), 
          React.createElement("br", null), 
          React.createElement("label", null, "What stat should the featues value be aplyed to"), 
          React.createElement("input", {type: "text", name: "subcategory", value: this.props.feature.subcategory, onChange: this.handelChange}), 
          React.createElement("br", null), 
          React.createElement("label", null, "Value to be applyed."), 
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
    var eachFeature = this.props.subrace.to_add_features.map(function(feature) {
      return (
        React.createElement("div", null, 
          React.createElement(SingelFeature, {
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
