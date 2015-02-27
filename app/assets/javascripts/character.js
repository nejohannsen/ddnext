var FullPage = React.createClass({displayName: "FullPage",
  render: function() {
    return (
      React.createElement("div", {id: "page"}, 
        React.createElement(MainTitle, null), 
        React.createElement(MainPage, null)
      )
    );
  }
});

var MainTitle = React.createClass({displayName: "MainTitle",
  render: function() {
    return (
      React.createElement("div", {className: "main_title"}, 
        React.createElement(LeftTitleBox, null), 
        React.createElement(RightTitleBox, null)
      )
    );
  }
});

var LeftTitleBox = React.createClass({displayName: "LeftTitleBox",
  render: function() {
    return (
      React.createElement("div", {className: "left_title_box"}, 
        React.createElement("div", {className: "vaule"}, "Rat"), 
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
          React.createElement("div", {className: "value"}, "Rogue 4"), 
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

React.render(
  React.createElement(FullPage, null),
  document.getElementById('body')
);
