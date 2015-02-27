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


React.render(
  React.createElement(MainTitle, null),
  document.getElementById('page')
);
