var MainTitle = React.createClass({
    getInitialState: function() {
        return { edit: false };
    },
    render: function() {
        return (
            <div className="main_title" ref="mainStat" >
              <LeftTitleBox />
              <RightTitleBox />
            </div>
        );
    }
});

var LeftTitleBox = React.createClass({
  render function() {
    return (
      <div className="left_title_box">
        <div className="name_box">
          <div className="value"><span>Rat</span></div>
          <div className="label">Character Name</div>
        </div>
      </div>
    );
  }
});

var RightTitleBox = React.createClass({
  render function() {
    return (
      <div className="left_right_box">
        <div className="class_and_level field">
          <div className="value">Rogue 4</div>
          <div className="label">Class</div>
        </div>
        <div className="player_name field">
          <div className="value">Nick</div>
          <div className="label">Player Name</div>
        </div>
        <div className="background field">
          <div className="value">Crimnal</div>
          <div className="label">Background</div>
        </div>
        <div className="race field">
          <div className="value">Human</div>
          <div className="label">Race</div>
        </div>
        <div className="alignment field">
          <div className="value">Chaotic Good</div>
          <div className="label">Alignment</div>
        </div>
        <div className="experince_point field">
          <div className="value">2700</div>
          <div className="label">Experince</div>
        </div>
      </div>
    );
  }
});

React.createElement(MainTitle, null,
  document.getElementById('page')
);

