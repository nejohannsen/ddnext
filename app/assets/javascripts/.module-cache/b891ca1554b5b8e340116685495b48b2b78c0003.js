var MainTitle = React.createClass({displayName: "MainTitle",
  render: function() {
    return (
      React.createElement("h1", null, " Hello World ")
    );
  }
});

React.render(
  React.createElement(MainTitle, null),
  document.getElementById('page')
);
