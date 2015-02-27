var MainTitle = React.createClass({displayName: "MainTitle",
  render: function() {
    return (
      React.createElement("div", {className: "main_title"}, 
        React.createElement(LeftTitleBox, null)
      )
    );
  }
});

var LeftTitleBox = React.createClass({displayName: "LeftTitleBox",
  render: function() {
    return (
      React.createElement("div", {className: "left_title_box"}, 
        React.createElement("div", {className: "vaule"}, 
          "Rat"
        ), 
        React.createElement("div", {className: "label"}, 
          "Name"
        )
      )
    );
  }
});


var RightTitleBox = React.createClass({displayName: "RightTitleBox",
  render: function() {
    return (
      React.createElement("div", {className: "right_title_box"}, 
        React.createElement("div", {className: "field"}, 
          React.createElement("div", {className: "value"}, 
            "Rogue 4"
          ), 
          React.createElement("div", {className: "label"}, 
            "Class and Level"
          )
        ), 
        React.createElement("div", {className: "field"}, 
          React.createElement("div", {className: "value"}, 
            "Background"
          ), 
          React.createElement("div", {className: "label"}, 
            "Backgorund"
          )
        ), 
        React.createElement("div", {className: "field"}, 
          React.createElement("div", {className: "value"}, 
            "Nick"
          ), 
          React.createElement("div", {className: "label"}, 
            "Player Name"
          )
        ), 
        React.createElement("div", {className: "field"}, 
          React.createElement("div", {className: "value"}, 
            "Harpers"
          ), 
          React.createElement("div", {className: "label"}, 
            "Faction"
          )
        ), 
        React.createElement("div", {className: "field"}, 
          React.createElement("div", {className: "value"}, 
            "Hill Dwarf"
          ), 
          React.createElement("div", {className: "label"}, 
            "Race"
          )
        ), 
        React.createElement("div", {className: "field"}, 
          React.createElement("div", {className: "value"}, 
            "Alignment"
          ), 
          React.createElement("div", {className: "label"}, 
            "Alignment"
          )
        )
      )
    );
  }
});

React.render(
  React.createElement(MainTitle, null),
  document.getElementById('page')
);
