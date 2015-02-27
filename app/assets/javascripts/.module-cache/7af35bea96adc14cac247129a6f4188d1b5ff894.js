var MainTitle = React.createClass({displayName: "MainTitle",
    getInitialState: function() {
        return { edit: false };
    },
    render: function() {
        return (
            React.createElement("div", {class: "main_title", ref: "mainStat"}, 
              React.createElement("div", {className: "temp"}), 
              React.createElement("div", {className: "temp"})
            )
        );
    }
});


React.render(
  React.createElement(MainTitle, null),
  document.getElementById('page')
);
