var MainTitle = React.createClass({displayName: "MainTitle",
    getInitialState: function() {
        return { edit: false };
    },
    render: function() {
        return (
            React.createElement("div", {className: "main_title", ref: "mainStat"}, 
              React.createElement("div", {className: "temp"}, "Temp"), 
              React.createElement("div", {className: "temp"}, "Temp2")
            )
        );
    }
});



React.createElement(MainTitle, null,
  document.getElementById('page')
);

