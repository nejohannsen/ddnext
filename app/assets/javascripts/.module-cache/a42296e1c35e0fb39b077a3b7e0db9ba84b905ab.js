var MainTitle = React.createClass({displayName: "MainTitle",
    getInitialState: function() {
        return { edit: false };
    },
    render: function() {
        return (
            React.createElement("div", {className: "main_title", ref: "mainStat"}, 
              React.createElement(LeftTitleBox, null), 
              React.createElement(RightTitleBox, null)
            )
        );
    }
});



React.createElement(MainTitle, null,
  document.getElementById('page')
);

